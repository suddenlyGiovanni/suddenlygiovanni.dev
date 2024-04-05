import { env } from 'node:process'
import { Schema } from '@effect/schema'
import { Octokit } from 'octokit'

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

const schema = Schema.parseJson(ResumeSchema)
const decode = Schema.decodeUnknownSync(schema)

export function getResume(): Promise<ResumeType> {
	const path = 'resume.json'
	const repo = 'resume'
	const owner = 'suddenlyGiovanni'

	return octokit.rest.repos
		.getContent({
			owner: owner,
			repo: repo,
			path: path,
		})
		.catch(_error => {
			/**
			 * The getContent request to the GitHub API fails. This could be due to a number of reasons
			 * such as network issues, incorrect repository details, or the file not existing in the repository.
			 *
			 * if the error is due to network issues, we could retry the request the request after a delay
			 */
			throw new NetworkError(_error instanceof Error ? _error.message : undefined)
		})
		.then(octokitResponse => {
			/**
			 * If the status code of the response from the getContent request is not 200,
			 * it means that the request was not successful.
			 * Depending on the status code, we could handle the error differently.
			 */
			if (octokitResponse.status === 200) {
				return octokitResponse
			}
			throw new ApiResponseError(`octokitResponse status: ${octokitResponse.status}`)
		})
		.then(({ data }) => data)
		.then(data => {
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
			if (typeof data === 'object' && Array.isArray(data) === false) {
				return data
			}
			throw new InvalidDataError(`Expected an object, but got: ${typeof data}`)
		})
		.then(data => {
			/**
			 * The data returned from the getContent request not being an object or being an array,
			 * or not having the correct type, name, or path. These are issues with the data returned
			 * from the API and the program should fail if it cannot process the data.
			 * Strategy:
			 * - fail
			 * - notify
			 */
			if (data.type === 'file' && data.name === path && data.path === path) {
				return data
			}
			throw new InvalidDataError(`Expected a file matching the correct path and name; got ${data.type}`) // not the correct return type
		})
		.then(({ content }) => content)
		.then(base64encodedContent => {
			/**
			 * The content of the file cannot be correctly decoded from base64
			 * This could be due to the file being corrupted, or the encoding being incorrect.
			 * Strategy:
			 * - fail
			 * - notify
			 */
			return Buffer.from(base64encodedContent, 'base64').toString('utf8')
		})
		.then(contentString => {
			/**
			 * The content may not be valid JSON, and/or may not conform to the schema
			 * This signals a problem with the data returned from the API, and the program should fail if it cannot process the data.
			 * Strategy:
			 * - fail
			 * - notify
			 */
			return decode(contentString)
		})
}


/**
 * This error can be thrown when the GITHUB_TOKEN is not set in the environment variables.
 */
class AuthenticationError extends Error {
	constructor(message?: string) {
		super(message);
		this.name = 'AuthenticationError';
	}
}

/**
 * This error can be thrown when the getContent request to the GitHub API fails due to network
 * issues.
 */
class NetworkError extends Error {
	constructor(message?: string) {
		super(message);
		this.name = 'NetworkError';
	}
}

/**
 * This error can be thrown when the status code of the response from the getContent request is
 * not 200.
 */
class ApiResponseError extends Error {
	constructor(message?: string) {
		super(message);
		this.name = 'ApiResponseError';
	}
}

/**
 * This error can be thrown when the data returned from the getContent request is not an object or
 * is an array, or does not have the correct type, name, or path.
 */
class InvalidDataError extends Error {
	constructor(message?: string) {
		super(message);
		this.name = 'InvalidDataError';
	}
}

/**
 * This error can be thrown when the content of the file cannot be correctly decoded from base64 or
 * cannot be parsed by the decode function.
 */
class DecodingError extends Error {
	constructor(message?: string) {
		super(message);
		this.name = 'DecodingError';
	}
}
