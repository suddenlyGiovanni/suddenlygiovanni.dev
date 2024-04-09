import { env } from 'node:process'
import { Schema } from '@effect/schema'
import type { ParseError } from '@effect/schema/ParseResult'
import { Console, Data, Effect, Option, pipe } from 'effect'
import { Octokit, RequestError } from 'octokit'
import { Meta, type MetaType } from '~/.server/schemas/resume/meta.ts'
import { Resume as ResumeSchema, type ResumeType } from '~/.server/schemas/resume/resume.ts'

/**
 * Could throw if GITHUB_TOKEN is invalid or expired;
 * Not recoverable at runtime, strategy:
 * - fail
 * - notify
 *
 * @remarks
 * what is it?
 * a github api client singleton?
 * or just an object with a method? in-any case it needs to moved to a separate
 * file... but where?
 */
const octokit = new Octokit({ auth: env.GITHUB_TOKEN })

/**
 * This error can be thrown when the GITHUB_TOKEN is not set in the environment variables.
 */
class AuthenticationError extends Data.TaggedError('AuthenticationError')<{
	readonly message?: string
}> {}

/**
 * This error can be thrown when the getContent request to the GitHub API fails due to network
 * issues.
 */
class NetworkError extends Data.TaggedError('NetworkError')<{ readonly message?: string }> {}

/**
 * This error can be thrown when the status code of the response from the getContent request is
 * not 200.
 */
class ApiResponseError extends Data.TaggedError('ApiResponseError')<{
	readonly message?: string
}> {}

/**
 * This error can be thrown when the data returned from the getContent request is not an object or
 * is an array, or does not have the correct type, name, or path.
 */
class InvalidDataError extends Data.TaggedError('InvalidDataError')<{
	readonly message?: string
}> {}

/**
 * This error can be thrown when the content of the file cannot be correctly decoded from base64 or
 * cannot be parsed by the decode function.
 */
class DecodingError extends Data.TaggedError('DecodingError')<{
	readonly message?: string
	readonly encoding?: string
}> {}

function getResumeFile({
	owner,
	repo,
	path,
}: {
	readonly owner: string
	readonly repo: string
	readonly path: string
}) {
	return Effect.gen(function* (_) {
		const octokitResponse = yield* _(
			Effect.tryPromise({
				try: () =>
					octokit.rest.repos.getContent({
						owner: owner,
						repo: repo,
						path: path,
					}),
				catch: error => {
					/**
					 * The getContent request to the GitHub API fails. This could be due to a number of reasons
					 * such as network issues, incorrect repository details, or the file not existing in the repository.
					 *
					 * ~if the error is due to network issues, we could retry the request after a delay~
					 * retray capabilities ara alredy backed in the octokit lib.
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
								new InvalidDataError({ message: `Expected an object, but got: ${typeof data}` }),
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
								new InvalidDataError({
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
					new DecodingError({
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
}

export function getResume(): Effect.Effect<
	{
		meta: MetaType
		resume: ResumeType
	},
	RequestError | InvalidDataError | DecodingError | ParseError,
	never
> {
	const repo = 'resume'
	const owner = 'suddenlyGiovanni'

	return Effect.gen(function* (_) {
		const { resumeFile, packageFile } = yield* _(
			Effect.all(
				{
					resumeFile: getResumeFile({ owner, repo, path: 'resume.json' }),
					packageFile: getResumeFile({ owner, repo, path: 'package.json' }),
				},
				{ concurrency: 2 },
			),
		)

		const resume = yield* _(
			Schema.decode(Schema.parseJson(ResumeSchema))(resumeFile.decodedContent),
		)
		const packageJson = yield* _(
			Schema.decode(Schema.parseJson(Schema.struct({ version: Schema.string })))(
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
}
