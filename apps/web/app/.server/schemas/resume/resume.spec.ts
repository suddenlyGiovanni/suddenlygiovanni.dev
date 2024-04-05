import { ParseError } from '@effect/schema/ParseResult'
import * as Schema from '@effect/schema/Schema'
import * as Either from 'effect/Either'
import { describe, expect, it } from 'vitest'

import resumeAssetUrl from '@suddenly-giovanni/resume/resume.json?raw'

import type { Basics } from './basics.ts'
import { type Resume as ResumeEncoded, Resume as ResumeSchema } from './resume.ts'

describe('Resume', () => {
	const basics: Basics = {
		name: 'Thomas Anderson',
		label: 'Software Engineer',
		email: 'thomas@gmail.com',
		summary: 'Web Developer with a passion for web-based applications',
		location: {
			city: 'Berlin',
			countryCode: 'DE',
		},
		profiles: [],
	}
	const $schema = 'http://jsonresume.org/schema'
	const skills: ResumeEncoded['skills'] = []
	const work: ResumeEncoded['work'] = []
	const education: ResumeEncoded['education'] = []

	describe('decode', () => {
		const schema = Schema.parseJson(ResumeSchema)

		it('should not throw for a valid JSON resume string', () => {
			const parse = Schema.decodeUnknownEither(schema, { errors: 'all' })
			const mockResult = parse(
				JSON.stringify(
					{ $schema: 'http://jsonresume.org/schema', basics, skills, work, education },
					null,
					2,
				),
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
				expect(resume.awards).toBeUndefined()
				expect(resume.certificates).toBeUndefined()
				expect(resume.education).toBeUndefined()
				expect(resume.interests).toBeUndefined()
				expect(resume.languages).toBeUndefined()
				expect(resume.meta).toBeUndefined()
				expect(resume.projects).toBeUndefined()
				expect(resume.publications).toBeUndefined()
				expect(resume.references).toBeUndefined()
				expect(resume.skills).toBeUndefined()
				expect(resume.volunteer).toBeUndefined()
				expect(resume.work).toBeUndefined()
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
				expect(resume.awards).toBeDefined()
				expect(resume.certificates).toBeDefined()
				expect(resume.education).toBeDefined()
				expect(resume.interests).toBeDefined()
				expect(resume.languages).toBeDefined()
				expect(resume.meta).toBeDefined()
				expect(resume.projects).toBeDefined()
				expect(resume.publications).toBeDefined()
				expect(resume.references).toBeDefined()
				expect(resume.skills).toBeDefined()
				expect(resume.volunteer).toBeDefined()
				expect(resume.work).toBeDefined()
			})
		})

		it('production resume should be valid', () => {
			const parse = Schema.decodeUnknownEither(schema, { errors: 'all' })
			const resume = parse(resumeAssetUrl)
			expect(Either.isRight(resume)).toBe(true)
			Either.map(resume, r => {
				expect(r.$schema).toBeDefined()
				expect(r.basics).toBeDefined()
				expect(r.awards).toBeDefined()
				// expect(r.certificates).toBeDefined()
				expect(r.education).toBeDefined()
				expect(r.interests).toBeDefined()
				expect(r.languages).toBeDefined()
				expect(r.meta).toBeDefined()
				expect(r.projects).toBeDefined()
				expect(r.publications).toBeDefined()
				expect(r.references).toBeDefined()
				expect(r.skills).toBeDefined()
				expect(r.volunteer).toBeDefined()
				expect(r.work).toBeDefined()
			})
		})
	})
})
