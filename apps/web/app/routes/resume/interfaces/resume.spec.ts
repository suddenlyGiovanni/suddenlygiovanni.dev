import resumeAssetUrl from '@suddenly-giovanni/resume/resume.json?raw'
import { ParseError } from '@effect/schema/ParseResult'
import * as Schema from '@effect/schema/Schema'
import * as Either from 'effect/Either'
import * as Option from 'effect/Option'

import { describe, expect, test, it } from 'vitest'
import { Resume as ResumeSchema } from './resume.ts'

describe('Resume', () => {
	const basics = {
		/* basics data */
		name: 'Thomas Anderson',
	}
	const $schema = 'http://jsonresume.org/schema'

	describe('decode', () => {
		const schema = Schema.parseJson(ResumeSchema)

		it('should not throw for a valid JSON resume string', () => {
			const parse = Schema.decodeUnknownEither(schema, { errors: 'all' })
			const mockResult = parse(
				JSON.stringify({ $schema: 'http://jsonresume.org/schema', basics }, null, 2),
			)
			// Either.mapLeft(mockResult, console.error)
			expect(Either.isRight(mockResult)).toBe(true)
		})

		it('should throw for invalid JSON resume string', () => {
			const parse = Schema.decodeUnknownEither(schema, { errors: 'all' })
			const mockResult = parse(
				JSON.stringify({ $schema: 'http://jsonresume.org/schema', base: {} }, null, 2),
			)
			expect(Either.isLeft(mockResult)).toBe(true)
			Either.mapLeft(mockResult, parseError => {
				expect(parseError).toBeInstanceOf(ParseError)
			})
		})

		it('should return a valid resume object where missing property are marked as options', () => {
			const parse = Schema.decodeUnknownEither(schema, { errors: 'all' })
			const mockResult = parse(JSON.stringify({ $schema, basics }, null, 2))
			Either.map(mockResult, resume => {
				expect(resume.$schema).toBeDefined()
				expect(resume.basics).toBeDefined()

				expect(Option.isOption(resume.awards)).toBe(true)
				expect(Option.isNone(resume.awards)).toBe(true)

				expect(Option.isOption(resume.certificates)).toBe(true)
				expect(Option.isNone(resume.certificates)).toBe(true)

				expect(Option.isOption(resume.education)).toBe(true)
				expect(Option.isNone(resume.education)).toBe(true)

				expect(Option.isOption(resume.interests)).toBe(true)
				expect(Option.isNone(resume.interests)).toBe(true)

				expect(Option.isOption(resume.languages)).toBe(true)
				expect(Option.isNone(resume.languages)).toBe(true)

				expect(Option.isOption(resume.meta)).toBe(true)
				expect(Option.isNone(resume.meta)).toBe(true)

				expect(Option.isOption(resume.projects)).toBe(true)
				expect(Option.isNone(resume.projects)).toBe(true)

				expect(Option.isOption(resume.publications)).toBe(true)
				expect(Option.isNone(resume.publications)).toBe(true)

				expect(Option.isOption(resume.references)).toBe(true)
				expect(Option.isNone(resume.references)).toBe(true)

				expect(Option.isOption(resume.skills)).toBe(true)
				expect(Option.isNone(resume.skills)).toBe(true)

				expect(Option.isOption(resume.volunteer)).toBe(true)
				expect(Option.isNone(resume.volunteer)).toBe(true)

				expect(Option.isOption(resume.work)).toBe(true)
				expect(Option.isNone(resume.work)).toBe(true)
			})
		})

		it('should return a valid resume with all properties', () => {
			const parse = Schema.decodeUnknownEither(schema, { errors: 'all' })
			const mockResult = parse(
				JSON.stringify(
					{
						$schema: 'http://jsonresume.org/schema',
						basics,
						awards: [],
						certificates: [],
						education: [],
						interests: [],
						languages: [],
						meta: {},
						projects: [],
						publications: [],
						references: [],
						skills: [],
						volunteer: [],
						work: [],
					},
					null,
					2,
				),
			)

			Either.map(mockResult, resume => {
				expect(resume.$schema).toBeDefined()
				expect(resume.basics).toBeDefined()
				expect(Option.isSome(resume.awards)).toBe(true)
				expect(Option.isSome(resume.certificates)).toBe(true)
				expect(Option.isSome(resume.education)).toBe(true)
				expect(Option.isSome(resume.interests)).toBe(true)
				expect(Option.isSome(resume.languages)).toBe(true)
				expect(Option.isSome(resume.meta)).toBe(true)
				expect(Option.isSome(resume.projects)).toBe(true)
				expect(Option.isSome(resume.publications)).toBe(true)
				expect(Option.isSome(resume.references)).toBe(true)
				expect(Option.isSome(resume.skills)).toBe(true)
				expect(Option.isSome(resume.volunteer)).toBe(true)
				expect(Option.isSome(resume.work)).toBe(true)
			})
		})

		it('production resume should be valid', () => {
			const parse = Schema.decodeUnknownEither(schema, { errors: 'all' })
			const resume = parse(resumeAssetUrl)
			expect(Either.isRight(resume)).toBe(true)
		})
	})
})
