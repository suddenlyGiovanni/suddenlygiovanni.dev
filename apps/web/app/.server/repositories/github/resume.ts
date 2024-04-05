import { env } from 'node:process'
import { Schema } from '@effect/schema'
import { Octokit } from 'octokit'

import { Resume as ResumeSchema, type ResumeType } from '~/.server/schemas/resume/resume.ts'

// what is it? a github api client singleton? or just an object with a method? in-any case it needs to moved to a separate file... but where?
const octokit = new Octokit({ auth: env.GITHUB_TOKEN })

const schema = Schema.parseJson(ResumeSchema)
const decode = Schema.decodeUnknownSync(schema)

export function getResume(): Promise<ResumeType> {
	// need to clean the response type or throw an error for now...
	const path = 'resume.json'
	const repo = 'resume'
	const owner = 'suddenlyGiovanni'
	return octokit.rest.repos
		.getContent({
			owner: owner,
			repo: repo,
			path: path,
		})
		.catch(error => {
			console.error(error)
			throw new Error()
		})
		.then(octokitResponse => {
			// check the status code of the response
			if (octokitResponse.status === 200) {
				return octokitResponse
			}
			throw new Error()
		})
		.then(successResponseDataType => {
			return successResponseDataType.data
		})
		.then(data => {
			if (typeof data === 'object' && Array.isArray(data) === false) {
				return data
			}
			throw new Error() // not the correct typeof data
		})
		.then(data => {
			if (data.type === 'file' && data.name === path && data.path === path) {
				return data
			}
			throw new Error() // not the correct return type
		})
		.then(({ content }) => content)
		.then(base64encodedContent => Buffer.from(base64encodedContent, 'base64').toString('utf8'))
		.then(contentString => decode(contentString))
}
