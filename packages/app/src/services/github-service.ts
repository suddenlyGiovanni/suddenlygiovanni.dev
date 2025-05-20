import { Buffer } from 'node:buffer'

import type { components } from '@octokit/openapi-types'
import { Effect, Option, pipe, Schema, Struct } from 'effect'

import { Octokit } from '#root/src/services/octokit.ts'
import type * as Types from '#root/types/index.ts'

/**
 * This error can be thrown when the data returned from the getContent request is not an object or
 * is an array, or does not have the correct type, name, or path.
 */
export class InvalidDataError extends Schema.TaggedError<InvalidDataError>()('InvalidDataError', {
	message: Schema.String,
}) {}

/**
 * This error can be thrown when the content of the file cannot be correctly decoded from base64 or
 * cannot be parsed by the decode function.
 */

export class DecodingError extends Schema.TaggedError<DecodingError>()('DecodingError', {
	cause: Schema.Defect,
	encoding: Schema.String,
	message: Schema.String,
}) {}

export class GithubService extends Effect.Service<GithubService>()('app/services/GithubService', {
	dependencies: [Octokit.Default],

	effect: Effect.gen(function* () {
		const octokit = yield* Octokit

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
		const getFileContent = Effect.fn('GithubService.getFileContent')(
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
					const octokitResponse = yield* octokit.getContent({
						owner: owner,
						path: path,
						ref: Option.fromNullable(ref),
						repo: repo,
					})

					const data: components['schemas']['content-file'] = yield* pipe(
						octokitResponse,
						Struct.get('data'),
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

						Effect.liftPredicate(
							(data): data is Types.Array.NonArray<typeof data> => !Array.isArray(data),
							() =>
								new InvalidDataError({
									message: `Expected an object, but got an Array of data`,
								}),
						),

						/**
						 * The data returned from the getContent request not being an object or being an array,
						 * or not having the correct type, name, or path. These are issues with the data returned
						 * from the API and the program should fail if it cannot process the data.
						 * Strategy:
						 * - fail
						 * - notify
						 */

						Effect.flatMap(
							Effect.liftPredicate(
								data => data.type === 'file',
								data =>
									new InvalidDataError({
										message: `Expected a file matching the correct path and name; got "${data.type}"`,
									}),
							),
						),

						Effect.flatMap(
							Effect.liftPredicate(
								data => data.path === path,
								data =>
									new InvalidDataError({
										message: `Expected a file matching the correct path "${path}"; got "${data.path}"`,
									}),
							),
						),
					)

					const canonical: string | null = pipe(data, Struct.get('_links'), Struct.get('html'))

					const decodedContent: string = yield* pipe(
						data,
						Struct.pick('content', 'encoding'),
						({ content, encoding }) =>
							Effect.try({
								catch: cause =>
									new DecodingError({
										cause,
										encoding,
										message: 'failed to parse data content',
									}),
								try: () => Buffer.from(content, encoding as BufferEncoding).toString('utf8'),
							}),
					)

					const lastModified: string | undefined = pipe(
						octokitResponse,
						Struct.get('headers'),
						Struct.get('last-modified'),
					)

					return {
						canonical,
						decodedContent,
						lastModified,
					}
				}),
		)

		return { getFileContent }
	}),
}) {}
