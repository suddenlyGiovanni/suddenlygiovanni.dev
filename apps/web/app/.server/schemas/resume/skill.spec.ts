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

	const required = {
		keywords: skillInput.keywords,
		name: skillInput.name,
	}

	describe('decode', () => {
		const parse = S.decodeUnknownSync(Skill)

		test('handle missing partial properties', () => {
			expect(() => parse({ ...required })).not.toThrow()
		})

		test('name', () => {
			expect(() => parse({ ...required, name: '' })).toThrow()
			expect(() => parse({ ...required, name: ' ' })).toThrow()
			expect(() => parse({ ...required, name: 'Baking' })).not.toThrow()
		})

		test('keywords', () => {
			expect(() => parse({ ...required, keywords: [] })).not.toThrow()
			expect(() => parse({ ...required, keywords: [''] })).toThrow()
			expect(() => parse({ ...required, keywords: [' '] })).toThrow()
			expect(() => parse({ ...required, keywords: ['foo', 'bar', 'baz'] })).not.toThrow()
		})

		test('level', () => {
			expect(() => parse({ ...required, level: '' })).toThrow()
			expect(() => parse({ ...required, level: ' ' })).toThrow()
			expect(() => parse({ ...required, level: 'Jesus' })).not.toThrow()
		})
	})
})
