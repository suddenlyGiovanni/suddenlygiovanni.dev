import { css } from '@emotion/core'
import { Link, PageProps } from 'gatsby'
import React, { FC } from 'react'

import { Basics } from '../../typings/resume'

import { Contacts, Layout, ReadLink } from '../components/index'
import { useResume } from '../hooks'

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

          <Contacts
            basics={basics as Basics /* TODO: Remove this type casting */}
          />
        </header>

        {/* SKILLS */}
        {/* PROGRAMMING LANGUAGES */}
        {/* TECHNICAL SKILLS */}
        {/* PROFESSIONAL EXPERIENCE */}
        {/* EDUCATION */}
        {/* INTERESTS */}
        {/* LANGUAGES */}
        {/* PROJECTS */}
        <pre>{JSON.stringify(resume, null, 2)}</pre>
        <ReadLink to="/">&larr; back to my Blog</ReadLink>
      </article>
    </Layout>
  )
}

export default ResumePage
