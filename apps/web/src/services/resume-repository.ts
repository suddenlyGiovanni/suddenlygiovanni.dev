import { Resume } from '@suddenly-giovanni/schema-resume'
import { Console, Data, Effect, Layer, Option, Schema } from 'effect'
import type { ParseError } from 'effect/ParseResult'

import { Meta } from '~/models/resume/meta/meta.ts'
import { parseYml } from '~/schemas/parse-yml.ts'
import { OctokitService, RequestError } from '~/services/octokit.ts'

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

// const octokit = new Octokit({ auth: env.GITHUB_TOKEN })

/**
 * This error can be thrown when the GITHUB_TOKEN is not set in the environment variables.
 */

// biome-ignore lint/correctness/noUnusedVariables: <explanation>
class AuthenticationError extends Data.TaggedError('AuthenticationError')<{
	readonly message?: string
}> {}

/**
 * This error can be thrown when the getContent request to the GitHub API fails due to network
 * issues.
 */

// biome-ignore lint/correctness/noUnusedVariables: <explanation>
class NetworkError extends Data.TaggedError('NetworkError')<{ readonly message?: string }> {}

/**
 * This error can be thrown when the status code of the response from the getContent request is
 * not 200.
 */

// biome-ignore lint/correctness/noUnusedVariables: <explanation>
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

// biome-ignore lint/nursery/useExplicitType: <explanation>
function getResumeFile({
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
}) {
	return Effect.gen(function* () {
		const { octokit } = yield* OctokitService

		const octokitResponse = yield* Effect.tryPromise({
			// biome-ignore lint/nursery/useExplicitType: <explanation>
			try: () =>
				octokit.rest.repos.getContent({
					owner: owner,
					repo: repo,
					path: path,
					...(ref ? { ref } : {}),
				}),
			catch: (error: unknown): RequestError => {
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
		})

		yield* Console.debug(octokitResponse)

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
			try: (): string => Buffer.from(content, 'base64').toString('utf8'),
			catch: (_error): DecodingError =>
				new DecodingError({
					message: 'failed to parse data content',
					encoding: encoding,
				}),
		})

		return {
			decodedContent,
			canonical: Option.fromNullable(maybeCanonical),
			lastModified: Option.fromNullable(octokitResponse.headers['last-modified']),
		}
	}).pipe(Effect.withLogSpan('getResumeFile'))
}

class Package extends Schema.Class<Package>('Package')({
	version: Schema.TemplateLiteral(Schema.Number, '.', Schema.Number, '.', Schema.Number),
}) {
	static decode = Schema.decode(this)
}

const decodeResume = Schema.decode(parseYml(Resume))
const decodePackageJson = Schema.decode(Schema.parseJson(Package))

function getResume(
	ref = 'main',
): Effect.Effect<
	{ meta: typeof Meta.Type; resume: typeof Resume.Type },
	DecodingError | RequestError | InvalidDataError | ParseError,
	OctokitService
> {
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
			...(Option.isSome(resumeFile.canonical) ? { canonical: resumeFile.canonical.value } : {}),
			version: denoJson.version,
		})

		return { meta, resume }
	}).pipe(Effect.withLogSpan('getResume'))
}

const makeResumeRepository = Effect.sync(() => {
	return { getResume }
})

export class ResumeRepository extends Effect.Tag('@services/ResumeRepository')<
	ResumeRepository,
	Effect.Effect.Success<typeof makeResumeRepository>
>() {
	// biome-ignore lint/style/useNamingConvention: <explanation>
	static Live = Layer.effect(this, makeResumeRepository)
}
