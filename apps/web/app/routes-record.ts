interface Route<
	URI extends string = string,
	URL extends `/${string}` = `/${string}`,
	Title extends string = string,
	Description extends string = string,
	Disabled extends boolean = boolean,
	Hidden extends boolean = boolean,
> {
	/** unique route identifier */
	readonly uri: URI

	/** Route Url */
	readonly url: URL

	/** The human-readable route name */
	readonly title: Title

	/** Route description */
	readonly description: Description

	/** Determine if the route should be not reachable */
	readonly disabled: Disabled

	/** Determine if the route should not be rendered/shown */
	readonly hidden: Hidden
}

export const routesRecord = {
	'about-me': {
		uri: 'about-me',
		url: '/',
		title: 'about me',
		description: 'Go to about me page',
		disabled: false,
		hidden: false,
	},
	'brain-dump': {
		uri: 'brain-dump',
		url: '/brain-dump',
		title: 'brain dump',
		description: 'Go to brain dump page',
		disabled: true,
		hidden: false,
	},

	'reading-journal': {
		uri: 'reading-journal',
		url: '/reading-journal',
		title: 'reading journal',
		description: 'Go to reading journal page',
		disabled: true,
		hidden: false,
	},

	resume: {
		uri: 'resume',
		url: '/resume',
		title: 'résumé',
		description: 'Go to resume page',
		disabled: false,
		hidden: false,
	},

	motivations: {
		uri: 'motivations',
		url: '/motivations',
		title: 'motivations',
		description: 'Go to my motivations',
		disabled: false,
		hidden: true,
	},
} as const satisfies Readonly<Record<string, Route>>
