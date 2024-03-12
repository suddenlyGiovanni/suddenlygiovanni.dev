import * as S from '@effect/schema/Schema'

import { Volunteer } from './volunteer.ts'
import { Award } from './award.ts'
import { Basics } from './basics.ts'
import { Education } from './education.ts'
import { Email } from './email.ts'
import { Interest } from './interest.ts'
import { ISODateString } from './iso-date-string.ts'
import { Language } from './language.ts'
import { Meta } from './meta.ts'
import { Project } from './project.ts'
import { Publication } from './publication.ts'
import { Reference } from './reference.ts'
import { Skill } from './skill.ts'
import { UrlString } from './url-string.ts'

export const Work = S.struct({
	description: S.optional(
		S.string.pipe(
			S.trimmed(),
			S.nonEmpty(),
			S.title('description'),
			S.description('A short description of the company'),
			S.examples(['Social Media Company', 'Educational Software Company']),
		),
		{ exact: true },
	),

	endDate: S.optional(ISODateString),

	highlights: S.optional(
		S.array(S.string.pipe(S.trimmed(), S.nonEmpty())).pipe(
			S.title('highlights'),
			S.description('Specify multiple accomplishments'),
			S.examples(['Started the company', 'Wrote a new algorithm']),
		),
		{ exact: true },
	),

	location: S.optional(
		S.string.pipe(
			S.trimmed(),
			S.nonEmpty(),
			S.title('location'),
			S.description('Location of the company'),
			S.examples(['Menlo Park, CA']),
		),
		{ exact: true },
	),

	name: S.optional(
		S.string.pipe(
			S.trimmed(),
			S.nonEmpty(),
			S.title('name'),
			S.description('Name of the company'),
			S.examples(['Facebook']),
		),
		{ exact: true },
	),

	/**
	 * e.g. Software Engineer
	 */
	position: S.optional(
		S.string.pipe(
			S.trimmed(),
			S.nonEmpty(),
			S.title('position'),
			S.description('The title of your position at the company'),
			S.examples(['Software Engineer']),
		),
		{ exact: true },
	),

	startDate: S.optional(ISODateString),

	summary: S.optional(
		S.string.pipe(
			S.trimmed(),
			S.nonEmpty(),
			S.title('summary'),
			S.description('Give an overview of your responsibilities at the company'),
			S.examples(['My day-to-day activities involved designing and building web applications...']),
		),
		{ exact: true },
	),

	url: S.optional(
		UrlString.pipe(
			S.title('url'),
			S.description('URL (as per RFC 3986) of the company'),
			S.examples(['https://facebook.example.com']),
		),
		{ exact: true },
	),

	contact: S.optional(
		S.struct({
			name: S.string.pipe(
				S.trimmed(),
				S.nonEmpty(),
				S.title('name'),
				S.description('The name and role of the contact person'),
				S.examples(['Mark Zuckerberg (CTO)']),
			),

			email: S.optional(Email, { exact: true }),

			phone: S.optional(
				S.string.pipe(
					S.trimmed(),
					S.nonEmpty(),
					S.title('phone'),
					S.description('Phone number'),
					S.examples(['712-117-2923']),
				),
				{ exact: true },
			),
		}),
		{ exact: true },
	),
})

export interface Work extends S.Schema.To<typeof Work> {}

export const Resume = S.struct({
	$schema: S.string.pipe(
		S.trimmed(),
		S.nonEmpty(),
		S.title('$schema'),
		S.description('link to the version of the schema that can validate the resume'),
		S.examples(['http://jsonresume.org/schema']),
	),

	awards: S.optional(
		S.array(Award).pipe(
			S.title('awards'),
			S.description('Specify any awards you have received throughout your professional career'),
		),
		{ exact: true },
	),

	basics: S.optional(Basics, { exact: true }),

	education: S.optional(S.array(Education), { exact: true }),

	interests: S.optional(S.array(Interest), { exact: true }),

	languages: S.optional(
		S.array(Language).pipe(
			S.title('languages'),
			S.description('List any other languages you speak'),
		),
		{ exact: true },
	),

	meta: S.optional(
		Meta.pipe(
			S.title('meta'),
			S.description('The schema version and any other tooling configuration lives here'),
		),
		{ exact: true },
	),

	projects: S.optional(
		S.array(Project).pipe(S.title('projects'), S.description('Specify career projects')),
		{ exact: true },
	),

	publications: S.optional(
		S.array(Publication).pipe(
			S.title('publications'),
			S.description('Specify your publications through your career'),
		),
		{ exact: true },
	),

	references: S.optional(
		S.array(Reference).pipe(
			S.title('references'),
			S.description('List references you have received'),
		),
		{ exact: true },
	),

	skills: S.optional(
		S.array(Skill).pipe(S.title('skills'), S.description('List out your professional skill-set')),
		{ exact: true },
	),

	volunteer: S.optional(S.array(Volunteer), { exact: true }),

	work: S.optional(S.array(Work), { exact: true }),
})

export interface Resume extends S.Schema.To<typeof Resume> {}
