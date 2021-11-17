import styled from 'styled-components'
import { navItemsMap } from '../../../config/nav-items'

import { formatDateLocaleLong } from '../../lib/dates'
import { ReadLink } from '../read-link'

const Version = styled.span`
  margin-left: 1em;
`
const ResumeVersion: React.VFC<{ readonly version: string }> = ({
  version,
}) => <Version>{`version: ${version}`}</Version>

const LastModified: React.VFC<{
  lastModified: Date
}> = ({ lastModified }) => (
  <span>last modified: {formatDateLocaleLong(lastModified)}</span>
)

const Footer = styled.footer`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

interface Props {
  readonly lastModified?: Date
  readonly resumeVersion?: string
}

export const SectionFooter: React.VFC<Props> = ({
  lastModified,
  resumeVersion,
}) => (
  <Footer>
    <ReadLink to={navItemsMap.get('about-me')!.urlPathFragment}>
      &larr; back to my About Me
    </ReadLink>
    <small>
      {lastModified && <LastModified lastModified={lastModified} />}
      {resumeVersion && <ResumeVersion version={resumeVersion} />}
    </small>
  </Footer>
)
