import * as S from '@effect/schema/Schema'

import { Email } from './email.ts'
import { Profile } from './interface.ts'
import { Location } from './location.ts'
import { UrlString } from './url-string.ts'

export const Basics = S.struct({
	email: S.optional(Email, {
		exact: true,
		annotations: {
			title: 'email',
			description: 'Email address',
			examples: ['thomas@gmail.com'],
		},
	}),

	image: S.optional(UrlString, {
		exact: true,
		annotations: {
			title: 'image',
			description: 'URL to a image in JPEG or PNG format (as per RFC 3986)',
		},
	}),

	label: S.optional(S.string.pipe(S.trimmed(), S.nonEmpty()), {
		exact: true,
		annotations: {
			title: 'label',
			description: 'Label',
			examples: ['Web Developer'],
		},
	}),

	location: S.optional(Location, { exact: true }),

	name: S.optional(S.string.pipe(S.trimmed(), S.nonEmpty()), {
		exact: true,
		annotations: {
			title: 'name',
			description: 'Your full name',
			examples: ['Thomas Anderson'],
		},
	}),

	phone: S.optional(S.string, {
		exact: true,
		annotations: {
			title: 'phone',
			description: 'Phone number',
			examples: ['+4907121172923'],
		},
	}),

	profiles: S.optional(S.array(Profile), {
		exact: true,
		annotations: {
			title: 'profiles',
			description: 'Social network profiles',
		},
	}),

	summary: S.optional(S.string.pipe(S.trimmed(), S.nonEmpty()), {
		exact: true,
		annotations: {
			title: 'summary',
			description: 'Write a short 2-3 sentence biography about yourself',
			examples: ['Web Developer with a passion for web-based applications'],
		},
	}),

	url: S.optional(UrlString, {
		exact: true,
		annotations: {
			title: 'url',
			description: 'URL to your website',
			examples: ['http://thomasanderson.com'],
		},
	}),
})

export interface Basics extends S.Schema.To<typeof Basics> {}
