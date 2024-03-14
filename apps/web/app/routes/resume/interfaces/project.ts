// biome-ignore lint/nursery/noNamespaceImport: this is how we import from schema
import * as S from '@effect/schema/Schema'

import { ISODateString } from './iso-date-string.ts'
import { UrlString } from './url-string.ts'

export const Project = S.partial(
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

export interface Project extends S.Schema.Type<typeof Project> {}
