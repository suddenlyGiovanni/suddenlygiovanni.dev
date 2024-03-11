import * as S from '@effect/schema/Schema'

import { Award } from './award.ts'
import { Basics } from './basics.ts'
import { Education } from './education.ts'
import { Email } from './email.ts'
import { ISODateString } from './iso-date-string.ts'
import { UrlString } from './url-string.ts'

export const Interest = S.struct({
	keywords: S.optional(S.array(S.string.pipe(S.trimmed(), S.nonEmpty())), {
		exact: true,
		annotations: {
			title: 'keywords',
			description: 'List some keywords pertaining to this interest',
			examples: ['philosophy', 'distributed systems'],
		},
	}),

	name: S.optional(S.string.pipe(S.trimmed(), S.nonEmpty()), {
		exact: true,
		annotations: {
			title: 'name',
			description: 'Interest name',
			examples: ['Philosophy'],
		},
	}),
})
export interface Interest extends S.Schema.To<typeof Interest> {}

export const Language = S.struct({
	fluency: S.optional(S.string.pipe(S.trimmed(), S.nonEmpty()), {
		exact: true,
		annotations: {
			title: 'fluency',
			description: 'e.g. Fluent, Beginner',
			examples: ['Fluent', 'Beginner', 'Intermediate', 'Advanced', 'Native'],
		},
	}),
	language: S.optional(S.string.pipe(S.trimmed(), S.nonEmpty()), {
		exact: true,
		annotations: {
			title: 'language',
			description: 'e.g. English, Spanish',
			examples: ['English', 'Spanish'],
		},
	}),
})
export interface Language extends S.Schema.To<typeof Language> {}

const Meta = S.struct({
	/**
	 * URL (as per RFC 3986) to latest version of this document
	 */
	canonical: S.optional(UrlString, {
		exact: true,
		annotations: {
			title: 'canonical',
			description: 'URL (as per RFC 3986) to latest version of this document',
		},
	}),

	lastModified: S.optional(ISODateString, {
		annotations: {
			title: 'lastModified',
			description: 'Using ISO 8601 with YYYY-MM-DDThh:mm:ss',
			examples: ['2012-04-05', '2012-04-05T10:00:00.000Z'],
		},
	}),

	version: S.optional(S.string, {
		exact: true,
		annotations: {
			title: 'version',
			description: 'A version field which follows semver - e.g. v1.0.0',
			examples: ['v1.0.0'],
		},
	}),
})

/**
 * The schema version and any other tooling configuration lives here
 */
export interface Meta extends S.Schema.To<typeof Meta> {}

const Project = S.partial(
	S.struct({
		description: S.string.pipe(
			S.trimmed(),
			S.nonEmpty(),
			S.description('Short summary of project'),
			S.examples(['Collated works of 2017']),
		),

		endDate: ISODateString,

		entity: S.string.pipe(
			S.trimmed(),
			S.nonEmpty(),
			S.description('Specify the relevant company/entity affiliations'),
			S.examples(['greenpeace', 'corporationXYZ']),
		),

		highlights: S.array(S.string.pipe(S.trimmed(), S.nonEmpty())).pipe(
			S.title('highlights'),
			S.description('Specify multiple features'),
			S.examples(['Feature 1']),
		),

		keywords: S.array(S.string.pipe(S.trimmed(), S.nonEmpty())).pipe(
			S.title('keywords'),
			S.description('Specify special elements involved'),
			S.examples(['special', 'elements']),
		),

		name: S.string.pipe(
			S.trimmed(),
			S.nonEmpty(),
			S.description('Name of the project'),
			S.examples(['The World Wide Web']),
		),

		roles: S.array(S.string.pipe(S.trimmed(), S.nonEmpty())).pipe(
			S.title('roles'),
			S.description('Specify your role on this project or in company'),
			S.examples(['Software Engineer Lead']),
		),

		startDate: ISODateString,

		type: S.string.pipe(
			S.trimmed(),
			S.nonEmpty(),
			S.title('type'),
			S.description('Type of project'),
			S.examples(['volunteering', 'presentation', 'talk', 'application', 'conference']),
		),

		url: UrlString.pipe(
			S.title('url'),
			S.description('URL (as per RFC 3986)'),
			S.examples(['http://www.computer.org.csdl/mags/co/1996/10/rx069-abs.html']),
		),
	}),
)

export interface Project extends S.Schema.To<typeof Project> {}

const Publication = S.struct({
	name: S.optional(S.string, {
		exact: true,
		annotations: {
			title: 'name',
			description: 'The name of the publication',
			examples: ['The World Wide Web'],
		},
	}),

	publisher: S.optional(S.string, {
		exact: true,
		annotations: {
			title: 'publisher',
			description: 'The publisher of the publication',
			examples: ['IEEE', 'Computer Magazine'],
		},
	}),

	releaseDate: S.optional(ISODateString, {
		exact: true,
		annotations: {
			title: 'releaseDate',
			description: 'Using ISO 8601 with YYYY-MM-DDThh:mm:ss',
			examples: ['2012-04-05', '2012-04-05T10:00:00.000Z'],
		},
	}),

	summary: S.optional(S.string, {
		exact: true,
		annotations: {
			title: 'summary',
			description: 'Short summary of publication',
			examples: ['Discussion of the World Wide Web, HTTP, HTML'],
		},
	}),

	url: S.optional(UrlString, {
		exact: true,
		annotations: {
			title: 'url',
			description: 'URL (as per RFC 3986)',
			examples: ['http://www.computer.org.example.com/csdl/mags/co/1996/10/rx069-abs.html'],
		},
	}),
})

export interface Publication extends S.Schema.To<typeof Publication> {}

const Reference = S.struct({
	name: S.string.pipe(
		S.trimmed(),
		S.nonEmpty(),
		S.title('name'),
		S.description('The name of the reference'),
		S.examples(['Timothy Cook']),
	),

	reference: S.optional(
		S.string.pipe(
			S.trimmed(),
			S.nonEmpty(),
			S.title('reference'),
			S.description('The reference text'),
			S.examples([
				'Joe blogs was a great employee, who turned up to work at least once a week. He exceeded my expectations when it came to doing nothing.',
			]),
		),
		{ exact: true },
	),
})

export interface Reference extends S.Schema.To<typeof Reference> {}

const Skill = S.struct({
	keywords: S.optional(
		S.array(S.string.pipe(S.trimmed(), S.nonEmpty())).pipe(
			S.title('keywords'),
			S.description('List some keywords pertaining to this skill'),
			S.examples(['Rust', 'Java']),
		),
		{ exact: true },
	),

	level: S.optional(
		S.string.pipe(
			S.trimmed(),
			S.nonEmpty(),
			S.title('level'),
			S.description('Level of expertise'),
			S.examples(['Master', 'Intermediate']),
		),
		{ exact: true },
	),

	name: S.string.pipe(
		S.trimmed(),
		S.nonEmpty(),
		S.title('name'),
		S.description('Name of the skill'),
		S.examples(['Web Development']),
	),
})

export interface Skill extends S.Schema.To<typeof Skill> {}

const Volunteer = S.struct({
	endDate: ISODateString,

	highlights: S.optional(
		S.array(S.string.pipe(S.trimmed(), S.nonEmpty())).pipe(
			S.title('highlights'),
			S.description('Specify accomplishments and achievements'),
			S.examples(['Saved the world']),
		),
		{ exact: true },
	),

	organization: S.optional(
		S.string.pipe(
			S.trimmed(),
			S.nonEmpty(),
			S.title('organization'),
			S.description('Organization'),
			S.examples(['Facebook']),
		),
		{ exact: true },
	),

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

	startDate: ISODateString,

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
})

export interface Volunteer extends S.Schema.To<typeof Volunteer> {}

const Work = S.struct({
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

const Resume = S.struct({
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
