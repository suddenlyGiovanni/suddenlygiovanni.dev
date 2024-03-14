import * as S from '@effect/schema/Schema'
import resumeAssetUrl from '@suddenly-giovanni/resume/resume.json?raw'
import { describe, expect, test } from 'vitest'
import { Resume as ResumeSchema } from './resume.ts'

describe('Resume', () => {
	describe('decode', () => {
		const schema = S.parseJson(ResumeSchema)
		const parse = S.decodeUnknownSync(schema, { errors: 'all' })

		test('should decode the resume', () => {
			expect(() => parse(resumeAssetUrl)).not.throw()
		})
	})
})
