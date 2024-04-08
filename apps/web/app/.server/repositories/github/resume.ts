import { env } from 'node:process'
import { Schema } from '@effect/schema'
import type { ParseError } from '@effect/schema/ParseResult'
import { Data, Effect, pipe } from 'effect'
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

export function getResume(): Effect.Effect<
	{
		meta: MetaType
		resume: ResumeType
	},
	RequestError | InvalidDataError | DecodingError | ParseError,
	never
> {
	const path = 'resume.json'
	const repo = 'resume'
	const owner = 'suddenlyGiovanni'

	return pipe(
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

		Effect.tap(octokitResponse => Effect.log(octokitResponse)),

		Effect.tap(octokitResponse =>
			Effect.log(`last-modified ${octokitResponse.headers['last-modified']}`),
		),

		Effect.flatMap(({ data, headers }) => {
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
				? Effect.succeed({ data, headers })
				: Effect.fail(
						new InvalidDataError({ message: `Expected an object, but got: ${typeof data}` }),
					)
		}),

		Effect.flatMap(({ data, headers }) => {
			/**
			 * The data returned from the getContent request not being an object or being an array,
			 * or not having the correct type, name, or path. These are issues with the data returned
			 * from the API and the program should fail if it cannot process the data.
			 * Strategy:
			 * - fail
			 * - notify
			 */
			return data.type === 'file' && data.name === path && data.path === path
				? Effect.succeed({ data, headers })
				: Effect.fail(
						new InvalidDataError({
							message: `Expected a file matching the correct path and name; got ${data.type}`,
						}),
					)
		}),

		Effect.flatMap(({ data, headers }) => {
			switch (data.encoding) {
				case 'base64': {
					/**
					 * The content of the file cannot be correctly decoded from base64
					 * This could be due to the file being corrupted, or the encoding being incorrect.
					 * Strategy:
					 * - fail
					 * - notify
					 */
					return Effect.try({
						try: () => Buffer.from(data.content, 'base64').toString('utf8'),
						catch: _error =>
							new DecodingError({
								message: 'failed to parse data content',
								encoding: data.encoding,
							}),
					}).pipe(Effect.zip(Effect.sync(() => headers['last-modified'])))
				}
				default:
					return Effect.fail(
						new DecodingError({
							message: 'missing strategy to decode encoded content',
							encoding: data.encoding,
						}),
					)
			}
		}),

		Effect.flatMap(([maybeContentString, lastModified]) => {
			/**
			 * The content may not be valid JSON, and/or may not conform to the schema
			 * This signals a problem with the data returned from the API, and the program should fail if it cannot process the data.
			 * Strategy:
			 * - fail
			 * - notify
			 */

			return Effect.all([
				Schema.decode(Schema.parseJson(ResumeSchema))(maybeContentString),
				Schema.decode(Meta)({
					...(lastModified ? { lastModified } : {}),
				}),
			])
		}),

		Effect.map(([resume, meta]) => ({
			resume,
			meta,
		})),

		Effect.withLogSpan('getResume'),
	)
}
