import { graphql, useStaticQuery } from 'gatsby'

import type { Education, Resume, Work } from '../types/resume'

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
      education {
        area
        courses
        endDate
        gpa
        institution
        location
        startDate
        studyType
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
      meta {
        canonical
        lastModified
        version
      }
    }
  }
`

type QueryEducation = GatsbyTypes.Maybe<
  Pick<
    GatsbyTypes.ResumeJsonEducation,
    | 'url'
    | 'area'
    | 'courses'
    | 'endDate'
    | 'gpa'
    | 'institution'
    | 'startDate'
    | 'studyType'
  >
>
const mapEducation = (queryEducation: QueryEducation): Education =>
  ({
    ...queryEducation,
    endDate: new Date(queryEducation?.endDate),
    startDate: new Date(queryEducation?.startDate),
  } as Education) // TODO: remove type casting

type QueryWork = GatsbyTypes.Maybe<
  Pick<
    GatsbyTypes.ResumeJsonWork,
    | 'name'
    | 'summary'
    | 'url'
    | 'endDate'
    | 'startDate'
    | 'description'
    | 'highlights'
    | 'location'
    | 'position'
  >
>

const mapWork = (queryWork: QueryWork): Work => {
  return {
    ...queryWork,
    endDate: new Date(queryWork?.endDate),
    startDate: new Date(queryWork?.startDate),
  } as Work // TODO: remove type casting
}

export function useResume(): Resume {
  const { resumeJson } = useStaticQuery<GatsbyTypes.ResumeQuery>(resumeQuery)
  const resume: Resume = {
    basics: resumeJson?.basics,
    education: resumeJson?.education?.map(mapEducation),
    interests: resumeJson?.interests,
    languages: resumeJson?.languages,
    meta: resumeJson?.meta && {
      ...resumeJson.meta,
      lastModified: new Date(resumeJson.meta.lastModified),
    },
    skills: resumeJson?.skills || [],
    work: resumeJson?.work?.map(mapWork) || [],
  } as Resume // TODO: remove this temporary casting!

  return resume
}
