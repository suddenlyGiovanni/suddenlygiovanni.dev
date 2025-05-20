import { describe, expect, it, test } from '@effect/vitest'
import { Effect, Exit, JSONSchema } from 'effect'

import { expectEffectFailure, expectEffectSuccess } from '#root/src/schemas/test-utils.ts'

import { Meta } from './meta.ts'

describe('Meta', () => {
	const metaInput = {
		canonical: 'https://example.com',
		lastModified: 'Thu, 02 May 2024 18:33:23 GMT',
		version: '6.9.0',
	}

	describe('decode', () => {
		it.effect('handle all missing property', () =>
			Effect.gen(function* () {
				const result = yield* Effect.exit(Meta.decode({ version: '0.0.0' }))
				expect(result).toStrictEqual(Exit.succeed({ version: '0.0.0' }))
			}),
		)

		test('canonical', async () => {
			await expectEffectFailure(
				Meta.decode({ canonical: '', version: metaInput.version }),
				`(Meta (Encoded side) <-> Meta)
└─ Encoded side transformation failure
   └─ Meta (Encoded side)
      └─ Encoded side transformation failure
         └─ Struct (Encoded side)
            └─ ["canonical"]
               └─ UrlString | null | undefined
                  ├─ Invalid URL string; got: ''
                  ├─ Expected null, actual ""
                  └─ Expected undefined, actual ""`,
			)

			await expectEffectFailure(
				Meta.decode({ canonical: '  ', version: metaInput.version }),
				`(Meta (Encoded side) <-> Meta)
└─ Encoded side transformation failure
   └─ Meta (Encoded side)
      └─ Encoded side transformation failure
         └─ Struct (Encoded side)
            └─ ["canonical"]
               └─ UrlString | null | undefined
                  ├─ Invalid URL string; got: '  '
                  ├─ Expected null, actual "  "
                  └─ Expected undefined, actual "  "`,
			)

			await expectEffectSuccess(
				Meta.decode({ canonical: metaInput.canonical, version: metaInput.version }),
				{
					canonical: 'https://example.com',
					version: metaInput.version,
				},
			)
		})
	})

	test('lastModified', async () => {
		await expectEffectFailure(
			Meta.decode({ lastModified: '', version: metaInput.version }),
			`(Meta (Encoded side) <-> Meta)
└─ Encoded side transformation failure
   └─ Meta (Encoded side)
      └─ Encoded side transformation failure
         └─ Struct (Encoded side)
            └─ ["lastModified"]
               └─ Date | undefined
                  ├─ Date
                  │  └─ Predicate refinement failure
                  │     └─ Expected a valid Date, actual Invalid Date
                  └─ Expected undefined, actual ""`,
		)
		await expectEffectFailure(
			Meta.decode({ lastModified: '  ', version: metaInput.version }),
			`(Meta (Encoded side) <-> Meta)
└─ Encoded side transformation failure
   └─ Meta (Encoded side)
      └─ Encoded side transformation failure
         └─ Struct (Encoded side)
            └─ ["lastModified"]
               └─ Date | undefined
                  ├─ Date
                  │  └─ Predicate refinement failure
                  │     └─ Expected a valid Date, actual Invalid Date
                  └─ Expected undefined, actual "  "`,
		)

		await expectEffectSuccess(
			Meta.decode({ lastModified: metaInput.lastModified, version: metaInput.version }),
			{
				lastModified: new Date('2024-05-02T18:33:23.000Z'),
				version: metaInput.version,
			},
		)
	})

	test('version', async () => {
		await expectEffectFailure(
			Meta.decode({ version: '' }),
			`(Meta (Encoded side) <-> Meta)
└─ Encoded side transformation failure
   └─ Meta (Encoded side)
      └─ Encoded side transformation failure
         └─ Struct (Encoded side)
            └─ ["version"]
               └─ expected a non-empty string with no leading or trailing whitespace, got ""`,
		)

		await expectEffectFailure(
			Meta.decode({ version: '  ' }),
			`(Meta (Encoded side) <-> Meta)
└─ Encoded side transformation failure
   └─ Meta (Encoded side)
      └─ Encoded side transformation failure
         └─ Struct (Encoded side)
            └─ ["version"]
               └─ expected a non-empty string with no leading or trailing whitespace, got "  "`,
		)

		await expectEffectSuccess(Meta.decode({ version: metaInput.version }), {
			version: '6.9.0',
		})
	})

	test('JSONSchema', async () => {
		await expect(JSON.stringify(JSONSchema.make(Meta), null, '\t')).toMatchFileSnapshot(
			'meta-schema.snapshot.json',
		)
	})
})
