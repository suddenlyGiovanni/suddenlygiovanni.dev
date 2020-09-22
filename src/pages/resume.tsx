import { css } from '@emotion/core'
import { Link, PageProps } from 'gatsby'
import React, { FC } from 'react'

import { Layout, ReadLink, SEO } from '../components/index'
import {
  Awards,
  Contacts,
  Educations,
  Experience,
  Interests,
  Languages,
  Projects,
  Publications,
  References,
  Skills,
  Volunteer,
} from '../components/resume-sections'
import { useResume, useResumePdfURL } from '../hooks'
import { formatDateLocaleLong } from '../lib/helpers'

const ResumePage: FC<PageProps> = () => {
  const resume = useResume()
  const resumePdfURL = useResumePdfURL()

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
    <Layout customSEO>
      <SEO description="Giovanni Ravalico's Résumé" titleTemplate="Résumé" />
      <article>
        <header>
          <hgroup
            css={css`
              text-align: center;
              h1,
              h2 {
                margin: 0 auto;
                padding-bottom: unset;

                border-bottom: unset;
              }
            `}
          >
            {/* NAME */}
            <h1>{basics?.name || 'name'}</h1>

            {/* ROLE */}
            <h2
              css={css`
                color: var();
              `}
            >
              {basics?.label || 'title'}
            </h2>
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

          <p>
            click on this link to download the pdf version of my resume{' '}
            <span role="img" aria-label="pdf">
              📜
            </span>{' '}
            <a href={resumePdfURL} download>
              giovanni-ravalico-resume.pdf
            </a>
          </p>
        </header>

        {skills && <Skills skills={skills} />}

        {work && <Experience works={work} />}

        {education && <Educations educations={education} />}

        {interests && <Interests interests={interests} />}

        {languages && <Languages languages={languages} />}

        {projects && <Projects projects={projects} />}

        {awards && <Awards awards={awards} />}

        {volunteer && <Volunteer volunteers={volunteer} />}

        {publications && <Publications publications={publications} />}

        {references && <References references={references} />}

        <div
          css={css`
            display: flex;
            align-items: center;
            justify-content: space-between;
          `}
        >
          <ReadLink to="/about-me">&larr; back to my About Me</ReadLink>
          <small>
            {meta?.lastModified && (
              <span>
                last modified: {formatDateLocaleLong(meta.lastModified)}
              </span>
            )}
            <span
              css={css`
                margin-left: 1em;
              `}
            >
              version: {meta?.version}
            </span>
          </small>
        </div>
      </article>
    </Layout>
  )
}

export default ResumePage
