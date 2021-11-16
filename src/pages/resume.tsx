import { PageProps } from 'gatsby'
import * as React from 'react'

import { Resume, SEO } from '../components'
import * as hooks from '../hooks'

const ResumePage: React.VFC<PageProps> = (_) => {
  const resume = hooks.useResume()
  const resumePdfURL = hooks.useResumePdfURL()

  const {
    awards,
    basics,
    education,
    interests,
    languages,
    meta,
    projects,
    publications,
    references,
    skills,
    volunteer,
    work,
  } = resume

  return (
    <>
      <SEO description="Giovanni Ravalico's Résumé" titleTemplate="Résumé" />
      <article>
        <Resume.SectionHeader
          name={basics?.name}
          roleTitle={basics?.label}
          summary={basics?.summary}
          resumePdfURL={resumePdfURL}
        >
          {basics && <Resume.SectionContacts basics={basics} />}
        </Resume.SectionHeader>

        {skills && <Resume.SectionSkills skills={skills} />}

        {work && <Resume.SectionExperience works={work} />}

        {education && <Resume.SectionEducation educations={education} />}

        {interests && <Resume.SectionInterests interests={interests} />}

        {languages && <Resume.SectionLanguages languages={languages} />}

        {projects && <Resume.SectionProjects projects={projects} />}

        {awards && <Resume.SectionAwards awards={awards} />}

        {volunteer && <Resume.SectionVolunteer volunteers={volunteer} />}

        {publications && (
          <Resume.SectionPublications publications={publications} />
        )}

        {references && <Resume.SectionReferences references={references} />}

        <Resume.SectionFooter
          lastModified={meta?.lastModified}
          resumeVersion={meta?.version}
        />
      </article>
    </>
  )
}

export default ResumePage
