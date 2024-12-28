import { JSONSchema } from 'effect'
import { describe, expect, test } from 'vitest'
import { expectEffectFailure, expectEffectSuccess } from '~/schemas/test-utils.ts'
import { Meta } from './meta.ts'

describe('Meta', () => {
	const metaInput = {
		canonical: 'https://example.com',
		lastModified: 'Thu, 02 May 2024 18:33:23 GMT',
		version: 'v6.9',
	}

	describe('decode', () => {
		test('handle all missing property', async () => {
			await expectEffectSuccess(Meta.decode({}), {})
		})

		test('canonical', async () => {
			await expectEffectFailure(
				Meta.decode({ canonical: '' }),
				`(Meta (Encoded side) <-> Meta)
└─ Encoded side transformation failure
   └─ Meta (Encoded side)
      └─ ["canonical"]
         └─ Invalid URL string; got: ''`,
			)

			await expectEffectFailure(
				Meta.decode({ canonical: '  ' }),
				`(Meta (Encoded side) <-> Meta)
└─ Encoded side transformation failure
   └─ Meta (Encoded side)
      └─ ["canonical"]
         └─ Invalid URL string; got: '  '`,
			)

			await expectEffectSuccess(Meta.decode({ canonical: metaInput.canonical }), {
				canonical: 'https://example.com',
			})
		})

		test('lastModified', async () => {
			await expectEffectFailure(
				Meta.decode({ lastModified: '' }),
				`(Meta (Encoded side) <-> Meta)
└─ Encoded side transformation failure
   └─ Meta (Encoded side)
      └─ ["lastModified"]
         └─ Date
            └─ Predicate refinement failure
               └─ Expected a valid Date, actual Invalid Date`,
			)
			await expectEffectFailure(
				Meta.decode({ lastModified: '  ' }),
				`(Meta (Encoded side) <-> Meta)
└─ Encoded side transformation failure
   └─ Meta (Encoded side)
      └─ ["lastModified"]
         └─ Date
            └─ Predicate refinement failure
               └─ Expected a valid Date, actual Invalid Date`,
			)

			await expectEffectSuccess(Meta.decode({ lastModified: metaInput.lastModified }), {
				lastModified: new Date('2024-05-02T18:33:23.000Z'),
			})
		})

		test('version', async () => {
			await expectEffectFailure(
				Meta.decode({ version: '' }),
				`(Meta (Encoded side) <-> Meta)
└─ Encoded side transformation failure
   └─ Meta (Encoded side)
      └─ ["version"]
         └─ expected a non-empty string with no leading or trailing whitespace, got ""`,
			)

			await expectEffectFailure(
				Meta.decode({ version: '  ' }),
				`(Meta (Encoded side) <-> Meta)
└─ Encoded side transformation failure
   └─ Meta (Encoded side)
      └─ ["version"]
         └─ expected a non-empty string with no leading or trailing whitespace, got "  "`,
			)

			await expectEffectSuccess(Meta.decode({ version: metaInput.version }), {
				version: 'v6.9',
			})
		})
	})

	test('JSONSchema', async () => {
		await expect(JSON.stringify(JSONSchema.make(Meta), null, '\t')).toMatchFileSnapshot(
			'meta-schema.snapshot.json',
		)
	})
})
