interface Route<
	Uri extends string = string,
	Url extends `/${string}` = `/${string}`,
	Title extends string = string,
	Description extends string = string,
	Disabled extends boolean = boolean,
	Hidden extends boolean = boolean,
> {
	/** unique route identifier */
	readonly uri: Uri

	/** Route Url */
	readonly url: Url

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
		description: 'Go to about me page',
		disabled: false,
		hidden: false,
		title: 'about me',
		uri: 'about-me',
		url: '/',
	},
	motivations: {
		description: 'Go to my motivations',
		disabled: false,
		hidden: true,
		title: 'motivations',
		uri: 'motivations',
		url: '/motivations',
	},

	'reading-journal': {
		description: 'Go to reading journal page',
		disabled: true,
		hidden: false,
		title: 'reading journal',
		uri: 'reading-journal',
		url: '/reading-journal',
	},

	resume: {
		description: 'Go to resume page',
		disabled: false,
		hidden: false,
		title: 'résumé',
		uri: 'resume',
		url: '/resume',
	},

	'second-brain': {
		description: 'Go to second brain page',
		disabled: true,
		hidden: false,
		title: 'second brain',
		uri: 'second-brain',
		url: '/second-brain',
	},
} as const satisfies Readonly<Record<string, Route>>
