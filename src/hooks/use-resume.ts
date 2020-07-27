/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { graphql, useStaticQuery } from 'gatsby'

import { ResumeQuery } from '../../typings/graphql-types'
import { Resume } from '../../typings/resume'

const resumeQuery = graphql`
  query Resume {
    resumeJson {
      basics {
        email
        image
        label
        name
        phone
        summary
        url
        profiles {
          network
          url
          username
        }
        location {
          address
          city
          countryCode
          postalCode
          region
        }
      }
      work {
        description
        endDate(formatString: "MM, YYYY")
        highlights
        location
        name
        position
        startDate(formatString: "MM, YYYY")
        summary
        url
      }
      volunteer {
        endDate(formatString: "MM, YYYY")
        highlights
        organization
        position
        startDate(formatString: "MM, YYYY")
        summary
        url
      }
      education {
        area
        courses
        endDate(formatString: "MM, YYYY")
        gpa
        institution
        startDate(formatString: "MM, YYYY")
        studyType
        url
      }
      projects {
        description
        endDate
        endDate
        entity
        highlights
        keywords
        name
        roles
        startDate
        type
        url
      }
      awards {
        awarder
        date(formatString: "MM/YYYY")
        summary
        title
      }
      publications {
        name
        publisher
        releaseDate(formatString: "MM/YYYY")
        summary
        url
      }
      skills {
        keywords
        level
        name
      }
      languages {
        fluency
        language
      }
      interests {
        keywords
        name
      }
      references {
        name
        reference
      }
      meta {
        canonical
        lastModified
        version
      }
    }
  }
`

export const useResume = (): Resume => {
  const { resumeJson } = useStaticQuery<ResumeQuery>(resumeQuery)
  const resume: Resume = {
    awards: resumeJson?.awards,
    basics: resumeJson?.basics,
    education: resumeJson?.education,
    interests: resumeJson?.interests,
    languages: resumeJson?.languages,
    meta: resumeJson?.meta,
    projects: resumeJson?.projects || [],
    publications: resumeJson?.publications || [],
    references: resumeJson?.references || [],
    skills: resumeJson?.skills || [],
    volunteer: resumeJson?.volunteer || [],
    work: resumeJson?.work || [],
  } as Resume // TODO: remove this temporary casting!
  return resume
}
