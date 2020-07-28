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
        endDate
        highlights
        location
        name
        position
        startDate
        summary
        url
      }
      volunteer {
        endDate
        highlights
        organization
        position
        startDate
        summary
        url
      }
      education {
        area
        courses
        endDate
        gpa
        institution
        startDate
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
        date
        summary
        title
      }
      publications {
        name
        publisher
        releaseDate
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
    awards: resumeJson?.awards?.map((award) => ({
      ...award,
      date: new Date(award?.date),
    })),
    basics: resumeJson?.basics,
    education: resumeJson?.education?.map((ed) => ({
      ...ed,
      endDate: new Date(ed?.endDate),
      startDate: new Date(ed?.startDate),
    })),
    interests: resumeJson?.interests,
    languages: resumeJson?.languages,
    meta: resumeJson?.meta && {
      ...resumeJson.meta,
      lastModified: new Date(resumeJson.meta.lastModified),
    },
    projects:
      resumeJson?.projects?.map((pr) => ({
        ...pr,
        endDate: new Date(pr?.endDate),
        startDate: new Date(pr?.startDate),
      })) || [],
    publications:
      resumeJson?.publications?.map((pub) => ({
        ...pub,
        releaseDate: new Date(pub?.releaseDate),
      })) || [],
    references: resumeJson?.references || [],
    skills: resumeJson?.skills || [],
    volunteer:
      resumeJson?.volunteer?.map((vol) => ({
        ...vol,
        endDate: new Date(vol?.endDate),
        startDate: new Date(vol?.startDate),
      })) || [],
    work:
      resumeJson?.work?.map((w) => {
        return {
          ...w,
          endDate: new Date(w?.endDate),
          startDate: new Date(w?.startDate),
        }
      }) || [],
  } as Resume // TODO: remove this temporary casting!
  return resume
}
