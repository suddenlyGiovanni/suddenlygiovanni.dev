import * as S from '@effect/schema/Schema'
import { TrimmedNonEmpty, UrlString } from '@suddenlygiovanni/resume/schema-primitive'

export class Meta extends S.Class<Meta>('Meta')({
	canonical: S.optional(UrlString, { exact: true }),

	lastModified: S.optional(
		S.Date.annotations({
			jsonSchema: {
				format: 'date-time',
				type: 'string',
			},
		}),
		{ exact: true },
	),

	version: S.optional(
		TrimmedNonEmpty.annotations({
			title: 'version',
			description: 'A version field which follows semver - e.g. v1.0.0',
			examples: ['v1.0.0'],
		}),
		{ exact: true },
	),
}) {
	static decode = S.decode(this)

	static encode = S.encode(this)
}
