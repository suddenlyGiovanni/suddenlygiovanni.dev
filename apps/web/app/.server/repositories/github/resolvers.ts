import { Schema } from '@effect/schema'
import { Console, Effect, Option, RequestResolver } from 'effect'

import { getResumeFile } from '~/.server/repositories/github/queries.ts'
import { parseYml } from '~/.server/schemas/parse-yml.ts'
import { Resume as ResumeSchema } from '~/.server/schemas/resume'
import { Meta } from '~/.server/schemas/resume/meta.ts'
import { OctokitService, RequestError } from '~/services/octokit.ts'

import * as Model from './model.ts'
import type * as RequestModel from './request-model'

export const GetResumeResolver = RequestResolver.fromEffect(
	// @ts-expect-error - TS doesn't like the type of the request parameter
	(request: RequestModel.GetResume) => {
		const repo = 'resume'
		const owner = 'suddenlyGiovanni'

		return Effect.gen(function* (_) {
			const { resumeFile, packageFile } = yield* _(
				Effect.all(
					{
						resumeFile: getResumeFile(owner, repo, 'resume.yml'),
						packageFile: getResumeFile(owner, repo, 'package.json'),
					},
					{ concurrency: 2 },
				),
			)

			const resume = yield* _(Schema.decode(parseYml(ResumeSchema))(resumeFile.decodedContent))
			const packageJson = yield* _(
				Schema.decode(Schema.parseJson(Schema.Struct({ version: Schema.String })))(
					packageFile.decodedContent,
				),
			)

			const meta = yield* _(
				Schema.decode(Meta)({
					...(Option.isSome(resumeFile.lastModified)
						? { lastModified: resumeFile.lastModified.value }
						: {}),
					...(Option.isSome(resumeFile.canonical) ? { canonical: resumeFile.canonical.value } : {}),
					version: packageJson.version,
				}),
			)

			return { meta, resume }
		}).pipe(Effect.withLogSpan('getResume'))
	},
).pipe(RequestResolver.contextFromServices(OctokitService))

export const GetResumeFileResolver = RequestResolver.fromEffect(
	// @ts-expect-error - TS doesn't like the type of the request parameter
	(request: RequestModel.GetResumeFile) => {
		return Effect.gen(function* (_) {
			const { octokit } = yield* _(OctokitService)
			const { path, repo, owner } = request

			const octokitResponse = yield* _(
				Effect.tryPromise({
					try: () => octokit.rest.repos.getContent({ owner, repo, path }),
					catch: error => {
						/**
						 * The getContent request to the GitHub API fails. This could be due to a number of reasons
						 * such as network issues, incorrect repository details, or the file not existing in the repository.
						 *
						 * ~if the error is due to network issues, we could retry the request after a delay~
						 * retry capabilities ara already backed in the octokit lib.
						 *
						 * According to the docs, only 200 status code will not throw an error
						 */
						if (error instanceof RequestError) {
							// handle Octokit error
							// error.message; // Oops
							// error.status; // 500
							// error.request; // { method, url, headers, body }
							// error.response; // { url, status, headers, data }

							return error
						}
						throw error
					},
				}),
			)

			yield* _(Console.debug(octokitResponse))

			const {
				content,
				encoding,
				_links: { html: maybeCanonical },
			} = yield* _(
				Effect.succeed(octokitResponse).pipe(
					Effect.flatMap(({ data }) => {
						/**
						 * the api returns data in different formats depending on the parameters passed to the getContent request.
						 * We have asked for a single file, not a directory, therefore we expect a single object to be returned.
						 * We need to type guard the data to ensure it is the correct type.
						 *
						 * If the data differs from our expectations, we should throw an error.
						 * This could be due to the file not existing, or the path being incorrect.
						 * Not recoverable at runtime, strategy:
						 * - fail
						 * - notify
						 */
						return typeof data === 'object' && !Array.isArray(data)
							? Effect.succeed(data)
							: Effect.fail(
									new Model.ResumeFileInvalidDataError({
										message: `Expected an object, but got: ${typeof data}`,
									}),
								)
					}),

					Effect.flatMap(data => {
						/**
						 * The data returned from the getContent request not being an object or being an array,
						 * or not having the correct type, name, or path. These are issues with the data returned
						 * from the API and the program should fail if it cannot process the data.
						 * Strategy:
						 * - fail
						 * - notify
						 */
						return data.type === 'file' && data.name === path && data.path === path
							? Effect.succeed(data)
							: Effect.fail(
									new Model.ResumeFileInvalidDataError({
										message: `Expected a file matching the correct path and name; got ${data.type}`,
									}),
								)
					}),
				),
			)

			const decodedContent = yield* _(
				Effect.try({
					try: () => Buffer.from(content, 'base64').toString('utf8'),
					catch: _error =>
						new Model.ResumeFileDecodingError({
							message: 'failed to parse data content',
							encoding: encoding,
						}),
				}),
			)

			return {
				decodedContent,
				canonical: Option.fromNullable(maybeCanonical),
				lastModified: Option.fromNullable(octokitResponse.headers['last-modified']),
			}
		}).pipe(Effect.withLogSpan('getResumeFile'))
	},
)
