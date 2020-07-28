import { css } from '@emotion/core'
import { Link, PageProps } from 'gatsby'
import React, { FC } from 'react'

import { Layout, ReadLink } from '../components/index'
import {
  Awards,
  Contacts,
  Educations,
  Interests,
  Languages,
  ProfessionalExperience,
  ProgrammingLanguages,
  Projects,
  Publications,
  References,
  Skills,
  TechnicalSkills,
  Volunteer,
} from '../components/resume-sections'
import { useResume } from '../hooks'
import { formatDate } from '../lib/helpers'

const ResumePage: FC<PageProps> = () => {
  const resume = useResume()
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
    <Layout>
      <h1>Résumé</h1>

      <article>
        <header>
          <hgroup
            css={css`
              & > h1,
              & h2 {
                border-bottom: unset;
              }
            `}
          >
            {/* NAME */}
            <h1>{basics?.name || 'name'}</h1>

            {/* ROLE */}
            <h2>{basics?.label || 'title'}</h2>
          </hgroup>

          {/* SUMMARY */}
          <p>{basics?.summary || 'summary'}</p>

          <p>
            <em>
              If you consider me for a role, read through{' '}
              <Link to="/motivations"> my motivations</Link> first.
            </em>
          </p>
          {basics && <Contacts basics={basics} />}

          <pre>{JSON.stringify(basics, null, 2)}</pre>
        </header>

        {skills && <Skills skills={skills} />}

        <TechnicalSkills />

        <ProgrammingLanguages />

        {work && <ProfessionalExperience works={work} />}

        {education && <Educations educations={education} />}

        {interests && <Interests interests={interests} />}

        {languages && <Languages languages={languages} />}

        {projects && <Projects projects={projects} />}

        {awards && <Awards awards={awards} />}

        {volunteer && <Volunteer volunteers={volunteer} />}

        {publications && <Publications publications={publications} />}

        {references && <References references={references} />}

        <small>
          {meta?.lastModified && (
            <p>last modified: {formatDate(meta.lastModified)}</p>
          )}
          <p>version: {meta?.version}</p>
        </small>

        <ReadLink to="/">&larr; back to my Blog</ReadLink>
      </article>
    </Layout>
  )
}

export default ResumePage
