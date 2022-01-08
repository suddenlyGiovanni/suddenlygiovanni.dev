import { routesMap } from '@config/index'

import { Link } from 'gatsby'
import styled from 'styled-components'

const Header = styled.header``
const NameHeading = styled.h1``
const RoleHeading = styled.h2`
  color: var();
`

const HeaderGroup = styled.hgroup`
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
    <Header>
      <HeaderGroup>
        {/* NAME */}
        <NameHeading>{name}</NameHeading>

        {/* ROLE */}
        <RoleHeading>{roleTitle}</RoleHeading>
      </HeaderGroup>

      {/* SUMMARY */}
      <p>{summary}</p>

      <p>
        <em>
          If you consider me for a role, read through{' '}
          <Link to={routesMap.getRoute('motivations').url}>
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
    </Header>
  )
}
