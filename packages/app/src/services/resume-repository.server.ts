import { Resume } from '@suddenly-giovanni/schema-resume'
import { Effect, Option, pipe, Schema, Struct } from 'effect'
import type { ParseError } from 'effect/ParseResult'

import { Meta } from '#root/src/models/resume/meta/meta.ts'
import { parseYml } from '#root/src/schemas/parse-yml.ts'

import {
	type DecodingError,
	GithubService,
	type InvalidDataError,
} from './github-service.server.ts'
import type { OctokitError } from './octokit.server.ts'

class Package extends Schema.Class<Package>('Package')({
	version: Schema.TemplateLiteral(Schema.Number, '.', Schema.Number, '.', Schema.Number),
}) {
	static decode = Schema.decode(this)
}

export class ResumeRepository extends Effect.Service<ResumeRepository>()(
	'app/services/ResumeRepository',
	{
		dependencies: [GithubService.Default],
		effect: Effect.gen(function* () {
			const githubService = yield* GithubService
			const repo = 'resume'
			const owner = 'suddenlyGiovanni'

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
			const getResumeWithMeta: (
				this: ResumeRepository,
				ref?: string,
			) => Effect.Effect<
				{ meta: typeof Meta.Type; resume: typeof Resume.Type },
				DecodingError | InvalidDataError | ParseError | OctokitError,
				never
			> = Effect.fn('ResumeRepository.getResume')(ref => {
				const refOption = Option.fromNullable(ref).pipe(Option.orElse(() => Option.some('main')))

				const resumeYml = pipe(
					githubService.getFileContent({
						owner,
						path: 'packages/resume/src/resume.yml',
						refOption,
						repo,
					}),
					Effect.flatMap(({ decodedContent, lastModified, canonical }) =>
						pipe(
							decodedContent,
							Schema.decode(parseYml(Resume)),
							Effect.map(resume => ({ canonical, lastModified, resume })),
						),
					),
				)

				const version = pipe(
					githubService.getFileContent({
						owner,
						path: 'packages/resume/deno.json',
						refOption,
						repo,
					}),
					Effect.map(Struct.get('decodedContent')),
					Effect.flatMap(Schema.decode(Schema.parseJson(Package))),
					Effect.map(Struct.get('version')),
				)

				return pipe(
					Effect.all({ resumeYml, version }, { concurrency: 2 }),

					Effect.flatMap(({ resumeYml: { resume, lastModified, canonical }, version }) =>
						pipe(
							{ canonical, lastModified, version },
							Meta.decode,
							Effect.map(meta => ({ meta, resume })),
						),
					),
				)
			})

			return { getResumeWithMeta } as const
		}),
	},
) {}
