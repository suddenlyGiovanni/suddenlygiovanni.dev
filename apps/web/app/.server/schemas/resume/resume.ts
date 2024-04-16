import * as S from '@effect/schema/Schema'

import { Award } from './award.ts'
import { Basics } from './basics.ts'
import { Certificate } from './certificates.ts'
import { Education } from './education.ts'
import { Interest } from './interest.ts'
import { Language } from './language.ts'
import { Project } from './project.ts'
import { Publication } from './publication.ts'
import { Reference } from './reference.ts'
import { Skill } from './skill.ts'
import { Volunteer } from './volunteer.ts'
import { Work } from './work.ts'

export const Resume = S.struct({
	$schema: S.string.annotations({
		title: '$schema',
		description: 'link to the version of the schema that can validate the resume',
		examples: ['http://jsonresume.org/schema'],
	}),

	awards: S.optional(
		S.array(Award).annotations({
			title: 'awards',
			description: 'Specify any awards you have received throughout your professional career',
		}),
		{ exact: true },
	),

	basics: Basics,

	certificates: S.optional(
		S.array(Certificate).annotations({
			title: 'certificates',
			description: 'Specify any certificates you have received throughout your professional career',
		}),
		{ exact: true },
	),

	education: S.array(Education),

	interests: S.optional(S.array(Interest), { exact: true }),

	languages: S.optional(
		S.array(Language).annotations({
			title: 'languages',
			description: 'List any other languages you speak',
		}),
		{ exact: true },
	),

	projects: S.optional(
		S.array(Project).annotations({
			title: 'projects',
			description: 'Specify career projects',
		}),
		{ exact: true },
	),

	publications: S.optional(
		S.array(Publication).annotations({
			title: 'publications',
			description: 'Specify your publications through your career',
		}),
		{ exact: true },
	),

	references: S.optional(
		S.array(Reference).annotations({
			title: 'references',
			description: 'List references you have received',
		}),
		{ exact: true },
	),

	skills: S.array(Skill).annotations({
		title: 'skills',
		description: 'List out your professional skill-set',
	}),

	volunteer: S.optional(S.array(Volunteer), { exact: true }),

	work: S.array(Work),
})

export type Resume = S.Schema.Encoded<typeof Resume>
export type ResumeType = S.Schema.Type<typeof Resume>
