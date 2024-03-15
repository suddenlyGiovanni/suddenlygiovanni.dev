// biome-ignore lint/nursery/noNamespaceImport: this is how we import from schema
import * as S from '@effect/schema/Schema'
import { describe, expect, test } from 'vitest'
import { Skill } from './skill.ts'

describe('Skill', () => {
	const skillInput = {
		keywords: ['Rust', 'Java', 'Scala'],
		level: 'Wizard',
		name: 'Web Development',
	} satisfies S.Schema.Type<typeof Skill>

	describe('decode', () => {
		const parse = S.decodeUnknownSync(Skill)

		test('handle missing partial properties', () => {
			expect(() => parse({ name: skillInput.name })).not.toThrow()
		})

		test('keywords', () => {
			expect(() => parse({ name: skillInput.name, keywords: [] })).not.toThrow()
			expect(() => parse({ name: skillInput.name, keywords: [''] })).toThrow()
			expect(() => parse({ name: skillInput.name, keywords: [' '] })).toThrow()
			expect(() => parse({ name: skillInput.name, keywords: skillInput.keywords })).not.toThrow()
		})

		test('level', () => {
			expect(() => parse({ name: skillInput.name, level: '' })).toThrow()
			expect(() => parse({ name: skillInput.name, level: ' ' })).toThrow()
			expect(() => parse({ name: skillInput.name, level: skillInput.level })).not.toThrow()
		})

		test('name', () => {
			expect(() => parse({ name: '' })).toThrow()
			expect(() => parse({ name: ' ' })).toThrow()
			expect(() => parse({ name: skillInput.name })).not.toThrow()
		})
	})
})
