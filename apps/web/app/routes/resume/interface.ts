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
	S.examples(['https://facebook.example.com']),
)

const ISODateString = S.pattern(
	/^[0-9]{4}-((0[13578]|1[02])-(0[1-9]|[12][0-9]|3[01])|(0[469]|11)-(0[1-9]|[12][0-9]|30)|(02)-(0[1-9]|[12][0-9]))T(0[0-9]|1[0-9]|2[0-3]):(0[0-9]|[1-5][0-9]):(0[0-9]|[1-5][0-9])\.[0-9]{3}Z$/,
	{
		title: 'date',
		description: 'Using ISO 8601',
		examples: ['2012-04-05', '2012-04-05T10:00:00.000Z'],
	},
)

const Email = S.pattern(
	/^(?!\.)(?!.*\.\.)([A-Z0-9_+-.]*)[A-Z0-9_+-]@([A-Z0-9][A-Z0-9-]*\.)+[A-Z]{2,}$/i,
	{
		title: 'email',
		description: 'Email address',
		examples: ['foop@bar.baz'],
	},
)

const Award = S.struct({
	awarder: S.optional(S.string.pipe(S.trimmed(), S.nonEmpty()), {
		exact: true,
		annotations: {
			title: 'awarder',
			description: 'The name of the award given',
			examples: ['Time Magazine'],
		},
	}),

	date: S.optional(ISODateString, {
		exact: true,
		annotations: {
			title: 'date',
			description: 'Date of the award',
			examples: ['2012-04-05', '2012-04-05T10:00:00.000Z'],
		},
	}),

	summary: S.optional(S.string.pipe(S.trimmed(), S.nonEmpty()), {
		exact: true,
		annotations: {
			title: 'summary',
			description: 'A brief summary of the award',
			examples: ['Received for my work with Quantum Physics'],
		},
	}),

	title: S.optional(S.string, {
		exact: true,
		annotations: {
			title: 'title',
			description: 'Title of the award',
			examples: ['One of the 100 greatest minds of the century'],
		},
	}),
})

export interface Award extends S.Schema.To<typeof Award> {}

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

export const Location = S.struct({
	address: S.optional(S.string.pipe(S.trimmed(), S.nonEmpty()), {
		exact: true,
		annotations: {
			title: 'address',
			description: 'Address line',
			examples: ['1234 Glücklichkeit Straße Hinterhaus 5. Etage li.'],
		},
	}),

	city: S.optional(S.string.pipe(S.trimmed(), S.nonEmpty()), {
		exact: true,
		annotations: {
			title: 'city',
			description: 'City',
			examples: ['Berlin', 'New York', 'San Francisco'],
		},
	}),

	countryCode: S.optional(S.string.pipe(S.trimmed(), S.length(2)), {
		exact: true,
		annotations: {
			title: 'countryCode',
			description: 'Country code as per ISO-3166-1 ALPHA-2',
			examples: ['US', 'AU', 'IN'],
		},
	}),

	postalCode: S.optional(S.string.pipe(S.trimmed(), S.nonEmpty()), {
		exact: true,
		annotations: {
			title: 'postalCode',
			description: 'European postal code',
			examples: ['12209'],
		},
	}),

	region: S.optional(S.string.pipe(S.trimmed(), S.nonEmpty()), {
		exact: true,
		annotations: {
			title: 'region',
			description: 'The general region where you live. Can be a US state, or a province',
			examples: ['California', 'Quebec'],
		},
	}),
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

const Basics = S.struct({
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

const Education = S.struct({
	/**
	 * e.g. Arts
	 */
	area: S.optional(S.string, {
		exact: true,
		annotations: {
			title: 'area',
			description: 'e.g. Arts',
			examples: ['Arts'],
		},
	}),

	courses: S.optional(S.array(S.string), {
		exact: true,
		annotations: { title: 'courses', description: 'List notable courses/subjects' },
	}),

	endDate: S.optional(ISODateString),

	gpa: S.optional(S.string, {
		exact: true,
		annotations: {
			title: 'gpa',
			description: 'grade point average, e.g. 3.67/4.0',
			examples: ['3.67/4.0'],
		},
	}),

	institution: S.optional(S.string, {
		annotations: {
			title: 'institution',
			description: 'e.g. Massachusetts Institute of Technology',
			examples: ['Massachusetts Institute of Technology'],
		},
	}),

	startDate: S.optional(ISODateString),

	/**
	 * e.g. Bachelor
	 */
	studyType: S.optional(S.string, {
		exact: true,
		annotations: {
			title: 'studyType',
			description: 'tuYpe of study',
			examples: ['Bachelor'],
		},
	}),

	/**
	 * e.g. http://facebook.example.com
	 */
	url: S.optional(UrlString, {
		exact: true,
		annotations: {
			title: 'url',
			description: 'URL (as per RFC 3986)',
		},
	}),
	location: S.optional(S.string),
})

export interface Education extends S.Schema.To<typeof Education> {
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

const Interest = S.struct({
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

const Language = S.struct({
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
