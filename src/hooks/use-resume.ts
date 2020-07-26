/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { graphql, useStaticQuery } from 'gatsby'

import { ResumeQuery } from '../../typings/graphql-types'
import { Resume } from '../../typings/resume'

const resumeQuery = graphql`
  query Resume {
    resumeJson {
      id
      basics {
        name
        label
        picture
        email
        phone
        website
        summary
      }
      work {
        company
        position
        website
        startDate
        endDate
        summary
        highlights
      }
      volunteer {
        organization
        position
        website
        startDate
        endDate
        summary
        highlights
      }
      education {
        institution
        area
        studyType
        startDate
        endDate
        gpa
        courses
      }
      awards {
        title
        date
        awarder
        summary
      }
      publications {
        name
        publisher
        releaseDate
        website
        summary
      }
      skills {
        name
        level
        keywords
      }
      languages {
        language
        fluency
      }
      interests {
        name
        keywords
      }
      references {
        name
        reference
      }
    }
  }
`

export const useResume = (): Resume => {
  const { resumeJson } = useStaticQuery<ResumeQuery>(resumeQuery)
  const resume: Resume = {
    basics: resumeJson?.basics,
    education: resumeJson?.education,
    interests: resumeJson?.interests,
    languages: resumeJson?.languages,
    // projects: resumeJson?.projects || [],
    publications: resumeJson?.publications || [],
    references: resumeJson?.references || [],
    skills: resumeJson?.skills || [],
    volunteer: resumeJson?.volunteer || [],
    work: resumeJson?.work || [],
  } as Resume // TODO: remove this temporary casting!
  return resume
}
