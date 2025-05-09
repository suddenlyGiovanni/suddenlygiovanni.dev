import { Resume } from '@suddenly-giovanni/schema-resume'
import { Data, Effect, Option, Schema } from 'effect'
import type { ParseError } from 'effect/ParseResult'

import { Meta } from '#root/src/models/resume/meta/meta.ts'
import { parseYml } from '#root/src/schemas/parse-yml.ts'
import { Octokit, type OctokitError } from '#root/src/services/octokit.ts'

/**
 * Could throw if GITHUB_TOKEN is invalid or expired;
 * Not recoverable at runtime, strategy:
 * - fail
 * - notify
 *
 * @remarks
 * what is it?
 * a github api src singleton?
 * or just an object with a method? in-any case it needs to moved to a separate
 * file... but where?
 */

// const octokit = new Octokit({ auth: env.GITHUB_TOKEN })

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

class Package extends Schema.Class<Package>('Package')({
	version: Schema.TemplateLiteral(Schema.Number, '.', Schema.Number, '.', Schema.Number),
}) {
	static decode = Schema.decode(this)
}

const decodeResume = Schema.decode(parseYml(Resume))
const decodePackageJson = Schema.decode(Schema.parseJson(Package))

export class ResumeRepository extends Effect.Service<ResumeRepository>()(
	'app/services/ResumeRepository',
	{
		effect: Effect.gen(function* () {
			/**
			 * Retrieves and decodes a file from a GitHub repository.
			 *
			 * This function uses the Octokit GitHub API src to fetch the content of a specified file. It verifies that the response represents a file matching the expected path and decodes its Base64-encoded content into a UTF-8 string. Additionally, it extracts metadata such as the canonical URL and the last modified date from the response headers, if available.
			 *
			 * @param owner - The owner of the repository.
			 * @param repo - The name of the repository.
			 * @param path - The file path within the repository.
			 * @param ref - An optional branch, tag, or commit SHA to retrieve the file from.
			 *
			 * @returns An object containing:
			 *   - decodedContent: The file content decoded to a UTF-8 string.
			 *   - canonical: The canonical URL of the file, if available.
			 *   - lastModified: The last modified timestamp from the API response headers, if available.
			 *
			 * @remarks
			 * The function may fail with a RequestError if the API request fails, an InvalidDataError if the response data
			 * does not match the expected format, or a DecodingError if decoding the file content fails.
			 */
			const getResumeFile = Effect.fn('ResumeRepository.getResumeFile')(
				({
					owner,
					repo,
					path,
					ref,
				}: {
					/**
					 * The owner of a resource.
					 */
					readonly owner: string

					/**
					 * Repository variable.
					 */
					readonly repo: string

					/**
					 * The path variable represents a string that stores a file path.
					 */
					readonly path: string

					/**
					 * the branch, tag, or commit sha to get the file from
					 */
					readonly ref?: string
				}) =>
					Effect.gen(function* () {
						const octokit = yield* Octokit

						const octokitResponse = yield* octokit.use((client, signal) =>
							client.rest.repos.getContent({
								owner: owner,
								path: path,
								repo: repo,
								...(ref ? { ref } : {}),
								request: {
									signal,
								},
							}),
						)

						// yield* Console.debug(octokitResponse)

						const {
							content,
							encoding,
							_links: { html: maybeCanonical },
						} = yield* Effect.succeed(octokitResponse).pipe(
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
											new InvalidDataError({
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
								return data.type === 'file' && data.path === path
									? Effect.succeed(data)
									: Effect.fail(
											new InvalidDataError({
												message: `Expected a file matching the correct path and name; got "${data.type}"`,
											}),
										)
							}),
						)

						const decodedContent = yield* Effect.try({
							catch: (_error): DecodingError =>
								new DecodingError({
									encoding: encoding,
									message: 'failed to parse data content',
								}),
							try: (): string => Buffer.from(content, 'base64').toString('utf8'),
						})

						return {
							canonical: Option.fromNullable(maybeCanonical),
							decodedContent,
							lastModified: Option.fromNullable(octokitResponse.headers['last-modified']),
						}
					}),
			)

			/**
			 * Retrieves and decodes resume data and associated metadata from a GitHub repository.
			 *
			 * This function concurrently fetches the resume YAML file and the Deno package JSON file from a fixed repository.
			 * It decodes the resume content and package information, then constructs metadata from available last modified dates,
			 * canonical URLs, and version details from the package file. The function returns an effect that resolves to an object
			 * containing both the decoded resume and the constructed metadata. The default Git reference used is "main".
			 *
			 * @param ref - The Git reference (branch, tag, etc.) to use when fetching the files. Defaults to "main".
			 * @returns An effect that resolves to an object with the decoded resume and its metadata.
			 */
			const getResume = Effect.fn('ResumeRepository.getResume')(
				(
					ref = 'main',
				): Effect.Effect<
					{
						meta: typeof Meta.Type
						resume: typeof Resume.Type
					},
					DecodingError | InvalidDataError | ParseError | OctokitError,
					Octokit
				> => {
					const repo = 'resume'
					const owner = 'suddenlyGiovanni'

					return Effect.gen(function* () {
						const [resumeFile, denoFile] = yield* Effect.all(
							[
								getResumeFile({ owner, path: 'packages/resume/src/resume.yml', ref, repo }),
								getResumeFile({ owner, path: 'packages/resume/deno.json', ref, repo }),
							],
							{ concurrency: 2 },
						)

						const resume: typeof Resume.Type = yield* decodeResume(resumeFile.decodedContent)
						const denoJson: typeof Package.Type = yield* decodePackageJson(denoFile.decodedContent)

						const meta: typeof Meta.Type = yield* Meta.decode({
							...(Option.isSome(resumeFile.lastModified)
								? { lastModified: resumeFile.lastModified.value }
								: {}),
							...(Option.isSome(resumeFile.canonical)
								? { canonical: resumeFile.canonical.value }
								: {}),
							version: denoJson.version,
						})

						return { meta, resume } as const
					})
				},
			)

			return { getResume } as const
		}),
	},
) {}
