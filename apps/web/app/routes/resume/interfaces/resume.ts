import * as S from '@effect/schema/Schema'

import { Award } from './award.ts'
import { Basics } from './basics.ts'
import { Education } from './education.ts'
import { Interest } from './interest.ts'
import { Language } from './language.ts'
import { Meta } from './meta.ts'
import { Project } from './project.ts'
import { Publication } from './publication.ts'
import { Reference } from './reference.ts'
import { Skill } from './skill.ts'
import { Volunteer } from './volunteer.ts'
import { Work } from './work.ts'

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
