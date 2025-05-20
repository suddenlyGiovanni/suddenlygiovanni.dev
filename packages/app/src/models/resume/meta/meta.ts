import { TrimmedNonEmpty, UrlString } from '@suddenly-giovanni/schema-resume'
import { Schema } from 'effect'

export class Meta extends Schema.Class<Meta>('Meta')({
	canonical: Schema.optionalWith(UrlString, {
		nullable: true,
	}),

	lastModified: Schema.optional(Schema.Date).annotations({
		jsonSchema: { format: 'date-time', type: 'string' },
	}),

	version: TrimmedNonEmpty.annotations({
		description: 'A version field which follows semver - e.g. v1.0.0',
		title: 'version',
	}),
}) {
	static decode = Schema.decode(this)

	static encode = Schema.encode(this)
}
