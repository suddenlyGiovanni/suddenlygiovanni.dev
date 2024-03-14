// biome-ignore lint/nursery/noNamespaceImport: this is how we import from schema
import * as S from '@effect/schema/Schema'
import { Phone } from '~/routes/resume/interfaces/phone.ts'

import { Email } from './email.ts'
import { Location } from './location.ts'
import { Profile } from './profile.ts'
import { UrlString } from './url-string.ts'

export const Basics = S.struct({
	email: S.optional(
		Email.annotations({
			title: 'email',
			description: 'Email address',
			examples: ['thomas@gmail.com'],
		}),
		{ exact: true },
	),

	image: S.optional(
		UrlString.annotations({
			title: 'image',
			description: 'URL to a image in JPEG or PNG format (as per RFC 3986)',
		}),
		{ exact: true },
	),

	label: S.optional(
		S.compose(S.Trim, S.NonEmpty).annotations({
			title: 'label',
			description: 'Label',
			examples: ['Web Developer'],
		}),
		{ exact: true },
	),

	location: S.optional(Location, { exact: true }),

	name: S.optional(
		S.compose(S.Trim, S.NonEmpty).annotations({
			title: 'name',
			description: 'Your full name',
			examples: ['Thomas Anderson'],
		}),
		{ exact: true },
	),

	phone: S.optional(
		Phone.annotations({
			title: 'phone',
			description:
				'Phone numbers are stored as strings so use any format you like, as long as it is a valid phone number. E.164 format is recommended.',
			examples: ['712-117-2923'],
		}),
		{ exact: true },
	),

	profiles: S.optional(
		S.array(Profile).annotations({
			title: 'profiles',
			description: 'Specify any number of social networks that you participate in',
		}),
		{
			exact: true,
		},
	),

	summary: S.optional(
		S.compose(S.Trim, S.NonEmpty).annotations({
			title: 'summary',
			description: 'Write a short 2-3 sentence biography about yourself',
			examples: ['Web Developer with a passion for web-based applications'],
		}),
		{
			exact: true,
		},
	),

	url: S.optional(
		UrlString.annotations({
			title: 'url',
			description: 'URL (as per RFC 3986) to your website, e.g. personal homepage',
			examples: ['http://thomasanderson.com'],
		}),
		{
			exact: true,
		},
	),
})

export interface Basics extends S.Schema.Encoded<typeof Basics> {}
