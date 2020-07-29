/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { graphql, useStaticQuery } from 'gatsby'

import { ResumeQuery } from '../../typings/graphql-types'
import { Education, Resume, Work } from '../../typings/resume'

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

type QueryEducation = import('/Users/webdev/Projects/personal/suddenlygiovanni/typings/graphql-types').Maybe<
  Pick<
    import('/Users/webdev/Projects/personal/suddenlygiovanni/typings/graphql-types').ResumeJsonEducation,
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
const mapEducation = (ed: QueryEducation): Education =>
  ({
    ...ed,
    endDate: new Date(ed?.endDate),
    startDate: new Date(ed?.startDate),
  } as Education) // TODO: remove type casting

type QueryWork = import('/Users/webdev/Projects/personal/suddenlygiovanni/typings/graphql-types').Maybe<
  Pick<
    import('/Users/webdev/Projects/personal/suddenlygiovanni/typings/graphql-types').ResumeJsonWork,
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

const mapWork = (w: QueryWork): Work => {
  return {
    ...w,
    endDate: new Date(w?.endDate),
    startDate: new Date(w?.startDate),
  } as Work // TODO: remove type casting
}
export const useResume = (): Resume => {
  const { resumeJson } = useStaticQuery<ResumeQuery>(resumeQuery)
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
