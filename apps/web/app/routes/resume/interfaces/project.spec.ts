import * as S from '@effect/schema/Schema'
import { expect, test, describe } from 'vitest'

import { Project } from './project.ts'

describe('Project', () => {
	const projectInput: S.Schema.To<typeof Project> = {
		description: 'Collated works of 2017',
		endDate: '2017-12-01T00:00:00.000Z',
		entity: 'greenpeace',
		highlights: ['Feature 1', 'Feature 2'],
		keywords: ['special', 'elements'],
		name: 'The World Wide Web',
		roles: ['Software Engineer Lead'],
		startDate: '1970-01-01T00:00:00.000Z',
		type: 'talk',
		url: 'http://example.com/project',
	} satisfies S.Schema.To<typeof Project>

	describe('decode', () => {
		const parse = S.decodeUnknownSync(Project)
		test('handle all missing property', () => {
			const input: unknown = {}
			expect(() => parse(input)).not.toThrow()
		})

		test('description', () => {
			expect(() => parse({ description: '' })).toThrow()
			expect(() => parse({ description: '  ' })).toThrow()
			expect(() => parse({ description: projectInput.description })).not.toThrow()
		})

		test('endDate', () => {
			expect(() => parse({ endDate: '' })).toThrow()
			expect(() => parse({ endDate: '  ' })).toThrow()
			expect(() => parse({ endDate: projectInput.endDate })).not.toThrow()
		})

		test('entity', () => {
			expect(() => parse({ entity: '' })).toThrow()
			expect(() => parse({ entity: '  ' })).toThrow()
			expect(() => parse({ entity: projectInput.entity })).not.toThrow()
		})

		test('highlights', () => {
			expect(() => parse({ highlights: '' })).toThrow()
			expect(() => parse({ highlights: '  ' })).toThrow()
			expect(() => parse({ highlights: projectInput.highlights })).not.toThrow()
		})

		test('keywords', () => {
			expect(() => parse({ keywords: '' })).toThrow()
			expect(() => parse({ keywords: '  ' })).toThrow()
			expect(() => parse({ keywords: projectInput.keywords })).not.toThrow()
		})

		test('name', () => {
			expect(() => parse({ name: '' })).toThrow()
			expect(() => parse({ name: '  ' })).toThrow()
			expect(() => parse({ name: projectInput.name })).not.toThrow()
		})

		test('roles', () => {
			expect(() => parse({ roles: '' })).toThrow()
			expect(() => parse({ roles: '  ' })).toThrow()
			expect(() => parse({ roles: projectInput.roles })).not.toThrow()
		})

		test('startDate', () => {
			expect(() => parse({ startDate: '' })).toThrow()
			expect(() => parse({ startDate: '  ' })).toThrow()
			expect(() => parse({ startDate: projectInput.startDate })).not.toThrow()
		})

		test('type', () => {
			expect(() => parse({ type: '' })).toThrow()
			expect(() => parse({ type: '  ' })).toThrow()
			expect(() => parse({ type: projectInput.type })).not.toThrow()
		})

		test('url', () => {
			expect(() => parse({ url: '' })).toThrow()
			expect(() => parse({ url: '  ' })).toThrow()
			expect(() => parse({ url: projectInput.url })).not.toThrow()
		})
	})
})
