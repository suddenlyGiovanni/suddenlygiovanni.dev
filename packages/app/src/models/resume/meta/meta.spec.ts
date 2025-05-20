import { describe, expect, it, test } from '@effect/vitest'
import { Effect, Exit, JSONSchema } from 'effect'

import {
	expectDecodeUnknownFailure,
	expectDecodeUnknownSuccess,
	expectEncodeFailure,
	expectEncodeSuccess,
} from '#root/src/schemas/test-utils.ts'

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
			await expectDecodeUnknownFailure(
				Meta,
				{
					canonical: '',
					version: metaInput.version,
				},
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

			await expectDecodeUnknownFailure(
				Meta,
				{
					canonical: '  ',
					version: metaInput.version,
				},
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

			await expectDecodeUnknownSuccess(
				Meta,
				{
					canonical: metaInput.canonical,
					version: metaInput.version,
				},
				{
					canonical: 'https://example.com',
					version: metaInput.version,
				},
			)
		})
	})

	test('lastModified', async () => {
		await expectDecodeUnknownFailure(
			Meta,
			{
				lastModified: '',
				version: metaInput.version,
			},
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

		await expectDecodeUnknownFailure(
			Meta,
			{ lastModified: '  ', version: metaInput.version },
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

		await expectDecodeUnknownSuccess(
			Meta,
			{
				lastModified: metaInput.lastModified,
				version: metaInput.version,
			},
			{
				lastModified: new Date('2024-05-02T18:33:23.000Z'),
				version: metaInput.version,
			},
		)
	})

	test('version', async () => {
		await expectDecodeUnknownFailure(
			Meta,
			{ version: '' },
			`(Meta (Encoded side) <-> Meta)
└─ Encoded side transformation failure
   └─ Meta (Encoded side)
      └─ Encoded side transformation failure
         └─ Struct (Encoded side)
            └─ ["version"]
               └─ expected a non-empty string with no leading or trailing whitespace, got ""`,
		)

		await expectDecodeUnknownFailure(
			Meta,
			{ version: '  ' },
			`(Meta (Encoded side) <-> Meta)
└─ Encoded side transformation failure
   └─ Meta (Encoded side)
      └─ Encoded side transformation failure
         └─ Struct (Encoded side)
            └─ ["version"]
               └─ expected a non-empty string with no leading or trailing whitespace, got "  "`,
		)

		await expectDecodeUnknownSuccess(
			Meta,
			{ version: metaInput.version },
			{
				version: '6.9.0',
			},
		)
	})

	describe('encode', () => {
		it('encodes minimal Meta with only version', async () => {
			const input = { version: metaInput.version }
			await expectEncodeSuccess(Meta, input, { version: metaInput.version })
		})

		it('encodes full Meta with canonical and lastModified', async () => {
			await expectEncodeSuccess(
				Meta,
				{
					canonical: metaInput.canonical,
					lastModified: new Date(metaInput.lastModified),
					version: metaInput.version,
				},
				{
					canonical: metaInput.canonical,
					lastModified: '2024-05-02T18:33:23.000Z',
					version: metaInput.version,
				},
			)
		})

		it('fails to encode invalid canonical URLs', async () => {
			await expectEncodeFailure(
				Meta,
				{ version: metaInput.version, canonical: '' },
				`(Meta (Encoded side) <-> Meta)
└─ Type side transformation failure
   └─ Meta (Type side)
      └─ ["canonical"]
         └─ UrlString | undefined
            ├─ Invalid URL string; got: ''
            └─ Expected undefined, actual ""`,
			)
		})

		it('fails to encode invalid lastModified dates', async () => {
			await expectEncodeFailure(
				Meta,
				{ version: metaInput.version, lastModified: new Date('invalid-date') },
				`(Meta (Encoded side) <-> Meta)
└─ Type side transformation failure
   └─ Meta (Type side)
      └─ ["lastModified"]
         └─ Date | undefined
            ├─ Date
            │  └─ Predicate refinement failure
            │     └─ Expected a valid Date, actual Invalid Date
            └─ Expected undefined, actual Invalid Date`,
			)
		})

		it('fails to encode invalid version strings', async () =>
			await expectEncodeFailure(
				Meta,
				{ version: '  ' },
				`(Meta (Encoded side) <-> Meta)
└─ Type side transformation failure
   └─ Meta (Type side)
      └─ ["version"]
         └─ expected a non-empty string with no leading or trailing whitespace, got "  "`,
			))
	})

	test('JSONSchema', async () => {
		await expect(JSON.stringify(JSONSchema.make(Meta), null, '\t')).toMatchFileSnapshot(
			'meta-schema.snapshot.json',
		)
	})
})
