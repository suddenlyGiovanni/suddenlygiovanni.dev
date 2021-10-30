import { Link } from 'gatsby'
import * as React from 'react'
import styled from 'styled-components'

import { linksMap } from '../../lib/links-map'

const ResumePageHeader = styled.header``
const NameHeadingStyled = styled.h1``
const RoleHeadingStyled = styled.h2`
  color: var();
`

const ResumePageHeaderGroupStyled = styled.hgroup`
  text-align: center;

  h1,
  h2 {
    margin: 0 auto;
    padding-bottom: unset;

    border-bottom: unset;
  }
`

interface Props {
  readonly name?: string
  readonly roleTitle?: string
  readonly summary?: string
  readonly children?: React.ReactNode
  readonly resumePdfURL: string
}

export const SectionHeader: React.VFC<Props> = ({
  name = 'Placeholder Name',
  roleTitle = 'Placeholder Role title',
  summary = 'Placeholder Summary',
  children,
  resumePdfURL,
}) => {
  return (
    <ResumePageHeader>
      <ResumePageHeaderGroupStyled>
        {/* NAME */}
        <NameHeadingStyled>{name}</NameHeadingStyled>

        {/* ROLE */}
        <RoleHeadingStyled>{roleTitle}</RoleHeadingStyled>
      </ResumePageHeaderGroupStyled>

      {/* SUMMARY */}
      <p>{summary}</p>

      <p>
        <em>
          If you consider me for a role, read through{' '}
          <Link to={linksMap.get('motivations')!.urlPathFragment}>
            {' '}
            my motivations
          </Link>{' '}
          first.
        </em>
      </p>
      {children}

      <p>
        click on this link to download the pdf version of my resume{' '}
        <span role="img" aria-label="pdf">
          📜
        </span>{' '}
        <a href={resumePdfURL} download>
          giovanni-ravalico-resume.pdf
        </a>
      </p>
    </ResumePageHeader>
  )
}
