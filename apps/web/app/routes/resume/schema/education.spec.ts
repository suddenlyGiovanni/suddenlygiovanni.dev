// biome-ignore lint/nursery/noNamespaceImport: this is how we import from schema
import * as S from '@effect/schema/Schema'
import { describe, expect, test } from 'vitest'
import { Education } from './education.ts'

describe('Education', () => {
	const educationInput = {
		area: 'Computer Science',
		courses: ['Computer Science', 'Data Structures'],
		endDate: '2020-01-01',
		score: '3.67/4.0',
		institution: 'Massachusetts Institute of Technology',
		startDate: '1970-01-01T00:00:00',
		studyType: 'Bachelor',
		url: 'https://mit.com',
		location: 'Cambridge, MA',
	} satisfies S.Schema.Encoded<typeof Education>

	describe('decode', () => {
		const parse = S.decodeUnknownSync(Education)

		test('handle all missing property', () => {
			const input: unknown = {}
			expect(() => parse(input)).not.toThrow()
		})

		test('area', () => {
			expect(() => parse({ area: '' })).toThrow()
			expect(() => parse({ area: '  ' })).toThrow()
			expect(() => parse({ area: educationInput.area })).not.toThrow()
		})

		test('courses', () => {
			expect(() => parse({ courses: [] })).not.toThrow()
			expect(() => parse({ courses: [''] })).toThrow()
			expect(() => parse({ courses: ['  '] })).toThrow()
			expect(() => parse({ courses: educationInput.courses })).not.toThrow()
		})

		test('endDate', () => {
			expect(() => parse({ endDate: '' })).toThrow()
			expect(() => parse({ endDate: '  ' })).toThrow()
			expect(() => parse({ endDate: educationInput.endDate })).not.toThrow()
		})

		test('score', () => {
			expect(() => parse({ score: '' })).toThrow()
			expect(() => parse({ score: '  ' })).toThrow()
			expect(() => parse({ score: educationInput.score })).not.toThrow()
		})

		test('institution', () => {
			expect(() => parse({ institution: '' })).toThrow()
			expect(() => parse({ institution: '  ' })).toThrow()
			expect(() => parse({ institution: educationInput.institution })).not.toThrow()
		})

		test('startDate', () => {
			expect(() => parse({ startDate: '' })).toThrow()
			expect(() => parse({ startDate: '  ' })).toThrow()
			expect(() => parse({ startDate: educationInput.startDate })).not.toThrow()
		})

		test('studyType', () => {
			expect(() => parse({ studyType: '' })).toThrow()
			expect(() => parse({ studyType: '  ' })).toThrow()
			expect(() => parse({ studyType: educationInput.studyType })).not.toThrow()
		})

		test('url', () => {
			expect(() => parse({ url: '' })).toThrow()
			expect(() => parse({ url: '  ' })).toThrow()
			expect(() => parse({ url: educationInput.url })).not.toThrow()
		})

		test('location', () => {
			expect(() => parse({ location: '' })).toThrow()
			expect(() => parse({ location: '  ' })).toThrow()
			expect(() => parse({ location: educationInput.location })).not.toThrow()
		})
	})
})