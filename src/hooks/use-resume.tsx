import { graphql, useStaticQuery } from 'gatsby'

import type { SocialNetworks } from '../components/index'
import type * as R from '../types/resume'

function mapToEducation(
  education:
    | Pick<
        GatsbyTypes.ResumeJsonEducation,
        | 'area'
        | 'courses'
        | 'endDate'
        | 'gpa'
        | 'institution'
        | 'location'
        | 'startDate'
        | 'studyType'
        | 'url'
      >
    | undefined
): Readonly<R.Education> {
  return {
    /**
     * e.g. Arts
     */
    area: education?.area,
    /**
     * List notable courses/subjects
     */
    courses: education?.courses as string[] | undefined,
    endDate: education?.endDate ? new Date(education.endDate) : undefined,
    /**
     * grade point average, e.g. 3.67/4.0
     */
    gpa: education?.gpa,
    /**
     * e.g. Massachusetts Institute of Technology
     */
    institution: education?.institution,
    startDate: education?.startDate ? new Date(education.startDate) : undefined,
    /**
     * e.g. Bachelor
     */
    studyType: education?.studyType,
    /**
     * e.g. http://facebook.example.com
     */
    url: education?.url,
    location: education?.location,
  }
}

function mapToInterest(
  interest:
    | Pick<GatsbyTypes.ResumeJsonInterests, 'keywords' | 'name'>
    | undefined
): Readonly<R.Interest> {
  return {
    keywords: interest?.keywords as string[] | undefined,
    name: interest?.name,
  }
}

function mapToLanguage(
  language:
    | Pick<GatsbyTypes.ResumeJsonLanguages, 'fluency' | 'language'>
    | undefined
): Readonly<R.Language> {
  return {
    language: language?.language,
    fluency: language?.fluency,
  }
}

function mapToSkill(
  skill:
    | Pick<GatsbyTypes.ResumeJsonSkills, 'keywords' | 'level' | 'name'>
    | undefined
): Readonly<R.Skill> {
  return {
    name: skill?.name,
    level: skill?.level,
    keywords: skill?.keywords as string[] | undefined,
  }
}

function mapToWork(
  work:
    | Pick<
        GatsbyTypes.ResumeJsonWork,
        | 'description'
        | 'endDate'
        | 'highlights'
        | 'location'
        | 'name'
        | 'position'
        | 'startDate'
        | 'summary'
        | 'url'
        | 'contact'
      >
    | undefined
): Readonly<R.Work> {
  return {
    /**
     * e.g. Social Media Company
     */
    description: work?.description,
    endDate: work?.endDate ? new Date(work.endDate) : undefined,
    /**
     * Specify multiple accomplishments
     */
    highlights: work?.highlights as string[] | undefined,
    /**
     * e.g. Menlo Park, CA
     */
    location: work?.location,
    /**
     * e.g. Facebook
     */
    name: work?.name,
    /**
     * e.g. Software Engineer
     */
    position: work?.position,
    startDate: work?.startDate ? new Date(work.startDate) : undefined,
    /**
     * Give an overview of your responsibilities at the company
     */
    summary: work?.summary,
    /**
     * e.g. http://facebook.example.com
     */
    url: work?.url,

    contact: work?.contact as undefined | R.Work['contact'],
  }
}

function mapToLocation(
  location:
    | GatsbyTypes.Maybe<
        Pick<
          GatsbyTypes.ResumeJsonBasicsLocation,
          'address' | 'city' | 'countryCode' | 'postalCode' | 'region'
        >
      >
    | undefined
): Readonly<R.Location> {
  return {
    /**
     * To add multiple address lines, use
     * . For example, 1234 Glücklichkeit Straße
     * Hinterhaus 5. Etage li.
     */
    address: location?.address,
    city: location?.city,
    /**
     * code as per ISO-3166-1 ALPHA-2, e.g. US, AU, IN
     */
    countryCode: location?.countryCode,
    postalCode: location?.postalCode,
    /**
     * The general region where you live. Can be a US state, or a province, for instance.
     */
    region: location?.region,
  }
}

function mapToProfile(
  profile:
    | Pick<GatsbyTypes.ResumeJsonBasicsProfiles, 'network' | 'url' | 'username'>
    | undefined
): Readonly<R.Profile> {
  return {
    /**
     * e.g. Facebook or Twitter
     */
    network: profile?.network as SocialNetworks,
    /**
     * e.g. http://twitter.example.com/neutralthoughts
     */
    url: profile?.url,
    /**
     * e.g. neutralthoughts
     */
    username: profile?.username,
  }
}

function mapToBasics(
  basics:
    | GatsbyTypes.Maybe<
        Pick<
          GatsbyTypes.ResumeJsonBasics,
          'email' | 'image' | 'label' | 'name' | 'phone' | 'summary' | 'url'
        > & {
          readonly profiles: GatsbyTypes.Maybe<
            ReadonlyArray<
              GatsbyTypes.Maybe<
                Pick<
                  GatsbyTypes.ResumeJsonBasicsProfiles,
                  'network' | 'url' | 'username'
                >
              >
            >
          >
          readonly location: GatsbyTypes.Maybe<
            Pick<
              GatsbyTypes.ResumeJsonBasicsLocation,
              'address' | 'city' | 'countryCode' | 'postalCode' | 'region'
            >
          >
        }
      >
    | undefined
): Readonly<R.Basics> {
  return {
    /**
     * e.g. thomas@gmail.com
     */
    email: basics?.email,
    /**
     * URL (as per RFC 3986) to a image in JPEG or PNG format
     */
    image: basics?.image,
    /**
     * e.g. Web Developer
     */
    label: basics?.label,
    location: mapToLocation(basics?.location), // Location
    name: basics?.name,
    /**
     * Phone numbers are stored as strings so use any format you like, e.g. 712-117-2923
     */
    phone: basics?.phone,
    /**
     * Specify any number of social networks that you participate in
     */
    profiles: basics?.profiles?.map(mapToProfile),
    /**
     * Write a short 2-3 sentence biography about yourself
     */
    summary: basics?.summary,
    /**
     * URL (as per RFC 3986) to your website, e.g. personal homepage
     */
    url: basics?.url,
  }
}

function mapToMeta(
  meta:
    | GatsbyTypes.Maybe<
        Pick<
          GatsbyTypes.ResumeJsonMeta,
          'canonical' | 'lastModified' | 'version'
        >
      >
    | undefined
): Readonly<R.Meta> {
  return {
    /**
     * URL (as per RFC 3986) to latest version of this document
     */
    canonical: meta?.canonical,
    /**
     * Using ISO 8601 with YYYY-MM-DDThh:mm:ss
     */
    lastModified: meta?.lastModified ? new Date(meta.lastModified) : undefined,
    /**
     * A version field which follows semver - e.g. v1.0.0
     */
    version: meta?.version,
  }
}

function mapToResume(
  resumeJson: GatsbyTypes.ResumeQuery['resumeJson']
): Readonly<R.Resume> {
  return {
    /**
     * Specify any awards you have received throughout your professional career
     */
    awards: undefined,
    basics: mapToBasics(resumeJson?.basics),
    education: resumeJson?.education?.map(mapToEducation),
    interests: resumeJson?.interests?.map(mapToInterest),
    /**
     * List any other languages you speak
     */
    languages: resumeJson?.languages?.map(mapToLanguage),
    /**
     * The schema version and any other tooling configuration lives here
     */
    meta: mapToMeta(resumeJson?.meta),
    /**
     * Specify career projects
     */
    projects: undefined,
    /**
     * Specify your publications through your career
     */
    publications: undefined,
    /**
     * List references you have received
     */
    references: undefined,
    /**
     * List out your professional skill-set
     */
    skills: resumeJson?.skills?.map(mapToSkill),
    volunteer: undefined,
    work: resumeJson?.work?.map(mapToWork),
  }
}

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
        contact {
          name
          email
        }
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

export function useResume(): R.Resume {
  const { resumeJson } = useStaticQuery<GatsbyTypes.ResumeQuery>(resumeQuery)
  return mapToResume(resumeJson)
}
