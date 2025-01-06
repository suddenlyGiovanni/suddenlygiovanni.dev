import { TrimmedNonEmpty, UrlString } from '@suddenlygiovanni/schema-resume'
import { Schema } from 'effect'

export class Meta extends Schema.Class<Meta>('Meta')({
	canonical: Schema.optionalWith(UrlString, { exact: true }),

	lastModified: Schema.optionalWith(Schema.Date, { exact: true }).annotations({
		jsonSchema: {
			format: 'date-time',
			type: 'string',
		},
	}),

	version: Schema.optionalWith(TrimmedNonEmpty, { exact: true }).annotations({
		title: 'version',
		description: 'A version field which follows semver - e.g. v1.0.0',
		examples: ['v1.0.0'],
	}),
}) {
	static decode = Schema.decode(this)

	static encode = Schema.encode(this)
}
