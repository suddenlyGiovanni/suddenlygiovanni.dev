// biome-ignore lint/nursery/noNamespaceImport: this is how we import from schema
import * as S from '@effect/schema/Schema'
import { describe, expect, test } from 'vitest'
import { Work } from './work.ts'

describe('Work', () => {
	const workInput = {
		description: 'Social Media Company',
		endDate: '1970-01-01T00:00:00.000Z',
		highlights: ['Founded the company', 'Wrote a new algorithm'],
		location: 'Menlo Park, CA',
		name: 'Facebook',
		position: 'Software Engineer',
		startDate: '1969-01-01T00:00:00.000Z',
		summary: 'My day-to-day activities involved designing and building web applications...',
		url: 'https://facebook.example.com',
		contact: {
			phone: '+353861234567',
			email: 'zuckerberg@mark.cto',
			name: 'Mark Zuckerberg (CTO)',
		},
	} satisfies S.Schema.Type<typeof Work>

	describe('decode', () => {
		const parse = S.decodeUnknownSync(Work)

		test('handle missing partial properties', () => {
			expect(() => parse({})).not.toThrow()
		})

		test('description', () => {
			expect(() => parse({ description: '' })).toThrow()
			expect(() => parse({ description: ' ' })).toThrow()
			expect(() => parse({ description: workInput.description })).not.toThrow()
		})

		test('endDate', () => {
			expect(() => parse({ endDate: '' })).toThrow()
			expect(() => parse({ endDate: ' ' })).toThrow()
			expect(() => parse({ endDate: workInput.endDate })).not.toThrow()
		})

		test('highlights', () => {
			expect(() => parse({ highlights: [] })).not.toThrow()
			expect(() => parse({ highlights: [''] })).toThrow()
			expect(() => parse({ highlights: [' ', ''] })).toThrow()
			expect(() => parse({ highlights: workInput.highlights })).not.toThrow()
		})

		test('location', () => {
			expect(() => parse({ location: '' })).toThrow()
			expect(() => parse({ location: ' ' })).toThrow()
			expect(() => parse({ location: workInput.location })).not.toThrow()
		})

		test('name', () => {
			expect(() => parse({ name: '' })).toThrow()
			expect(() => parse({ name: ' ' })).toThrow()
			expect(() => parse({ name: workInput.name })).not.toThrow()
		})

		test('position', () => {
			expect(() => parse({ position: '' })).toThrow()
			expect(() => parse({ position: ' ' })).toThrow()
			expect(() => parse({ position: workInput.position })).not.toThrow()
		})

		test('startDate', () => {
			expect(() => parse({ startDate: '' })).toThrow()
			expect(() => parse({ startDate: ' ' })).toThrow()
			expect(() => parse({ startDate: workInput.startDate })).not.toThrow()
		})

		test('summary', () => {
			expect(() => parse({ summary: '' })).toThrow()
			expect(() => parse({ summary: ' ' })).toThrow()
			expect(() => parse({ summary: workInput.summary })).not.toThrow()
		})

		test('url', () => {
			expect(() => parse({ url: '' })).toThrow()
			expect(() => parse({ url: ' ' })).toThrow()
			expect(() => parse({ url: workInput.url })).not.toThrow()
		})

		test('contact', () => {
			expect(() => parse({ contact: { name: workInput.contact.name } })).not.toThrow()
			expect(() => parse({ contact: { ...workInput.contact, phone: '' } })).toThrow()
			expect(() => parse({ contact: { ...workInput.contact, phone: ' ' } })).toThrow()
			expect(() =>
				parse({ contact: { ...workInput.contact, phone: workInput.contact.phone } }),
			).not.toThrow()
			expect(() => parse({ contact: { ...workInput.contact, email: '' } })).toThrow()
			expect(() => parse({ contact: { ...workInput.contact, email: ' ' } })).toThrow()
			expect(() =>
				parse({ contact: { ...workInput.contact, email: workInput.contact.email } }),
			).not.toThrow()
		})
	})
})
