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
	} satisfies S.Schema.Encoded<typeof Work>

	const required: S.Schema.Encoded<typeof Work> = {
		name: workInput.name,
		position: workInput.position,
		description: workInput.description,
		highlights: workInput.highlights,
		startDate: workInput.startDate,
	}

	describe('decode', () => {
		const parse = S.decodeUnknownSync(Work)

		test('handle missing partial properties', () => {
			expect(() => parse({ ...required })).not.toThrow()
		})

		test('description', () => {
			expect(() => parse({ ...required, description: '' })).toThrow()
			expect(() => parse({ ...required, description: ' ' })).toThrow()
			expect(() =>
				parse({ ...required, description: 'Educational Software Company' }),
			).not.toThrow()
		})

		test('endDate', () => {
			expect(() => parse({ ...required, endDate: '' })).toThrow()
			expect(() => parse({ ...required, endDate: ' ' })).toThrow()
			expect(() => parse({ ...required, endDate: workInput.endDate })).not.toThrow()
		})

		test('highlights', () => {
			expect(() => parse({ ...required, highlights: [] })).not.toThrow()
			expect(() => parse({ ...required, highlights: [''] })).toThrow()
			expect(() => parse({ ...required, highlights: [' ', ''] })).toThrow()
			expect(() => parse({ ...required, highlights: workInput.highlights })).not.toThrow()
		})

		test('location', () => {
			expect(() => parse({ ...required, location: '' })).toThrow()
			expect(() => parse({ ...required, location: ' ' })).toThrow()
			expect(() => parse({ ...required, location: workInput.location })).not.toThrow()
		})

		test('name', () => {
			expect(() => parse({ ...required, name: '' })).toThrow()
			expect(() => parse({ ...required, name: ' ' })).toThrow()
			expect(() => parse({ ...required, name: workInput.name })).not.toThrow()
		})

		test('position', () => {
			expect(() => parse({ ...required, position: '' })).toThrow()
			expect(() => parse({ ...required, position: ' ' })).toThrow()
			expect(() => parse({ ...required, position: workInput.position })).not.toThrow()
		})

		test('startDate', () => {
			expect(() => parse({ ...required, startDate: '' })).toThrow()
			expect(() => parse({ ...required, startDate: ' ' })).toThrow()
			expect(() => parse({ ...required, startDate: workInput.startDate })).not.toThrow()
		})

		test('summary', () => {
			expect(() => parse({ ...required, summary: '' })).toThrow()
			expect(() => parse({ ...required, summary: ' ' })).toThrow()
			expect(() => parse({ ...required, summary: workInput.summary })).not.toThrow()
		})

		test('url', () => {
			expect(() => parse({ ...required, url: '' })).toThrow()
			expect(() => parse({ ...required, url: ' ' })).toThrow()
			expect(() => parse({ ...required, url: workInput.url })).not.toThrow()
		})

		test('contact', () => {
			expect(() => parse({ ...required, contact: { name: workInput.contact.name } })).not.toThrow()
			expect(() => parse({ ...required, contact: { ...workInput.contact, phone: '' } })).toThrow()
			expect(() => parse({ ...required, contact: { ...workInput.contact, phone: ' ' } })).toThrow()
			expect(() =>
				parse({ ...required, contact: { ...workInput.contact, phone: workInput.contact.phone } }),
			).not.toThrow()
			expect(() => parse({ ...required, contact: { ...workInput.contact, email: '' } })).toThrow()
			expect(() => parse({ ...required, contact: { ...workInput.contact, email: ' ' } })).toThrow()
			expect(() =>
				parse({ ...required, contact: { ...workInput.contact, email: workInput.contact.email } }),
			).not.toThrow()
		})
	})
})
