import * as S from '@effect/schema/Schema'

const UrlString: S.Schema<string> = S.string.pipe(
	S.filter(value => {
		try {
			new URL(value)
			return true
		} catch (_) {
			return false
		}
	}),
	S.description('URL (as per RFC 3986)'),
	S.examples(['http://facebook.example.com']),
)

export interface Resume {
	/**
	 * link to the version of the schema that can validate the resume
	 */
	$schema?: string
	/**
	 * Specify any awards you have received throughout your professional career
	 */
	awards?: Award[]
	basics?: Basics
	education?: Education[]
	interests?: Interest[]
	/**
	 * List any other languages you speak
	 */
	languages?: Language[]
	/**
	 * The schema version and any other tooling configuration lives here
	 */
	meta?: Meta
	/**
	 * Specify career projects
	 */
	projects?: Project[]
	/**
	 * Specify your publications through your career
	 */
	publications?: Publication[]
	/**
	 * List references you have received
	 */
	references?: Reference[]
	/**
	 * List out your professional skill-set
	 */
	skills?: Skill[]
	volunteer?: Volunteer[]
	work?: Work[]
}

export interface Award {
	/**
	 * e.g. Time Magazine
	 */
	awarder?: string
	date?: string
	/**
	 * e.g. Received for my work with Quantum Physics
	 */
	summary?: string
	/**
	 * e.g. One of the 100 greatest minds of the century
	 */
	title?: string
}

export interface Basics {
	/**
	 * e.g. `thomas@gmail.com`
	 */
	email?: string
	/**
	 * URL (as per RFC 3986) to a image in JPEG or PNG format
	 */
	image?: string
	/**
	 * e.g. Web Developer
	 */
	label?: string
	location?: Location
	name?: string
	/**
	 * Phone numbers are stored as strings so use any format you like, e.g. 712-117-2923
	 */
	phone?: string
	/**
	 * Specify any number of social networks that you participate in
	 */
	profiles?: Profile[]
	/**
	 * Write a short 2-3 sentence biography about yourself
	 */
	summary?: string
	/**
	 * URL (as per RFC 3986) to your website, e.g. personal homepage
	 */
	url?: string
}

export const Location = S.struct({
	/**
	 * To add multiple address lines, use
	 * . For example, 1234 Glücklichkeit Straße
	 * Hinterhaus 5. Etage li.
	 */
	address: S.optional(
		S.string.pipe(
			S.trimmed(),
			S.nonEmpty(),
			S.description('Address line'),
			S.examples(['1234 Glücklichkeit Straße Hinterhaus 5. Etage li']),
		),
		{ exact: true },
	),

	city: S.optional(
		S.string.pipe(
			S.trimmed(),
			S.nonEmpty(),
			S.description('City'),
			S.examples(['Berlin', 'New York', 'San Francisco']),
		),
		{ exact: true },
	),

	/**
	 * code as per ISO-3166-1 ALPHA-2, e.g. US, AU, IN
	 */
	countryCode: S.optional(
		S.string.pipe(
			S.trimmed(),
			S.length(2),
			S.description('code as per ISO-3166-1 ALPHA-2'),
			S.examples(['US', 'AU', 'IN']),
		),
		{ exact: true },
	),

	/**
	 * european postal code
	 * e.g. 12209
	 */
	postalCode: S.optional(
		S.string.pipe(
			S.trimmed(),
			S.nonEmpty(),
			S.description('european postal code'),
			S.examples(['12209']),
		),
		{ exact: true },
	),

	/**
	 * The general region where you live. Can be a US state, or a province, for instance.
	 */
	region: S.optional(
		S.string.pipe(
			S.trimmed(),
			S.nonEmpty(),
			S.description('The general region where you live. Can be a US state, or a province'),
			S.examples(['California', 'Quebec']),
		),
		{ exact: true },
	),
})

export type Location = S.Schema.To<typeof Location>

const Profile = S.struct({
	/**
	 * e.g. Facebook or Twitter
	 */
	network: S.optional(S.string.pipe(S.trimmed(), S.nonEmpty()), {
		exact: true,
		annotations: {
			title: 'network',
			description: 'The name of the social network',
			examples: ['Facebook', 'Twitter'],
		},
	}),

	/**
	 * e.g. http://twitter.example.com/neutralthoughts
	 */
	url: S.optional(UrlString, {
		exact: true,
		annotations: {
			title: 'url',
			description: 'The URL of the profile on the social network',
			examples: ['http://twitter.example.com/neutralthoughts'],
		},
	}),
	/**
	 * e.g. neutralthoughts
	 */
	username: S.optional(S.string.pipe(S.trimmed(), S.nonEmpty()), {
		exact: true,
		annotations: {
			title: 'username',
			description: 'The username of the profile on the social network',
			examples: ['neutralthoughts'],
		},
	}),
})
export type Profile = S.Schema.To<typeof Profile>

export interface Education {
	/**
	 * e.g. Arts
	 */
	area?: string
	/**
	 * List notable courses/subjects
	 */
	courses?: string[]
	endDate?: Date
	/**
	 * grade point average, e.g. 3.67/4.0
	 */
	gpa?: string
	/**
	 * e.g. Massachusetts Institute of Technology
	 */
	institution?: string
	startDate?: Date
	/**
	 * e.g. Bachelor
	 */
	studyType?: string
	/**
	 * e.g. http://facebook.example.com
	 */
	url?: string
	location?: string
}

export interface Interest {
	keywords?: string[]
	/**
	 * e.g. Philosophy
	 */
	name?: string
}

export interface Language {
	/**
	 * e.g. Fluent, Beginner
	 */
	fluency?: string
	/**
	 * e.g. English, Spanish
	 */
	language?: string
}

/**
 * The schema version and any other tooling configuration lives here
 */
export interface Meta {
	/**
	 * URL (as per RFC 3986) to latest version of this document
	 */
	canonical?: string
	/**
	 * Using ISO 8601 with YYYY-MM-DDThh:mm:ss
	 */
	lastModified?: Date
	/**
	 * A version field which follows semver - e.g. v1.0.0
	 */
	version?: string
}

export interface Project {
	/**
	 * Short summary of project. e.g. Collated works of 2017.
	 */
	description?: string
	endDate?: Date
	/**
	 * Specify the relevant company/entity affiliations e.g. 'greenpeace', 'corporationXYZ'
	 */
	entity?: string
	/**
	 * Specify multiple features
	 */
	highlights?: string[]
	/**
	 * Specify special elements involved
	 */
	keywords?: string[]
	/**
	 * e.g. The World Wide Web
	 */
	name?: string
	/**
	 * Specify your role on this project or in company
	 */
	roles?: string[]
	startDate?: Date
	/**
	 * e.g. 'volunteering', 'presentation', 'talk', 'application', 'conference'
	 */
	type?: string
	/**
	 * e.g. http://www.computer.org/csdl/mags/co/1996/10/rx069-abs.html
	 */
	url?: string
}

export interface Publication {
	/**
	 * e.g. The World Wide Web
	 */
	name?: string
	/**
	 * e.g. IEEE, Computer Magazine
	 */
	publisher?: string
	releaseDate?: Date
	/**
	 * Short summary of publication. e.g. Discussion of the World Wide Web, HTTP, HTML.
	 */
	summary?: string
	/**
	 * e.g. http://www.computer.org.example.com/csdl/mags/co/1996/10/rx069-abs.html
	 */
	url?: string
}

export interface Reference {
	/**
	 * e.g. Timothy Cook
	 */
	name?: string
	/**
	 * e.g. Joe blogs was a great employee, who turned up to work at least once a week. He
	 * exceeded my expectations when it came to doing nothing.
	 */
	reference?: string
}

export interface Skill {
	/**
	 * List some keywords pertaining to this skill
	 */
	keywords?: string[]
	/**
	 * e.g. Master
	 */
	level?: string
	/**
	 * e.g. Web Development
	 */
	name?: string
}

export interface Volunteer {
	endDate?: Date
	/**
	 * Specify accomplishments and achievements
	 */
	highlights?: string[]
	/**
	 * e.g. Facebook
	 */
	organization?: string
	/**
	 * e.g. Software Engineer
	 */
	position?: string
	startDate?: Date
	/**
	 * Give an overview of your responsibilities at the company
	 */
	summary?: string
	/**
	 * e.g. http://facebook.example.com
	 */
	url?: string
}

export interface Work {
	/**
	 * e.g. Social Media Company
	 */
	description?: string
	endDate?: Date
	/**
	 * Specify multiple accomplishments
	 */
	highlights?: string[]
	/**
	 * e.g. Menlo Park, CA
	 */
	location?: string
	/**
	 * e.g. Facebook
	 */
	name?: string
	/**
	 * e.g. Software Engineer
	 */
	position?: string
	startDate?: Date
	/**
	 * Give an overview of your responsibilities at the company
	 */
	summary?: string
	/**
	 * e.g. http://facebook.example.com
	 */
	url?: string

	contact?: {
		/**
		 * ideally name and role
		 * eg. Mark Zuckerberg (CTO)
		 */
		name: string
		email?: string
		/**
		 * Phone numbers are stored as strings so use any format you like, e.g. 712-117-2923
		 */
		phone?: string
	}
}
