import styled, { StyledComponent } from 'styled-components'

import * as Responsive from '../lib/responsive'
import { Container } from './container'
import { GitHub, LinkedIn, Twitter } from './social'

const Footer_ = styled.footer`
  position: relative;

  flex-shrink: 0;
  width: 100%;

  border-top: thin solid black;
`

const Address: StyledComponent<'address', any, {}, never> = styled.address`
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-width: 120px;
  margin-top: 1rem;
`

const Copyright = styled.p`
  flex: 1 auto;
  margin-top: 1rem;
  margin-bottom: 0;
`

const ContainerFoo = styled(Container)`
  display: flex;
  flex-flow: row wrap;
  align-content: space-between;
  padding-bottom: 1rem;

  @media ${Responsive.Queries.mobile} {
    padding-bottom: 1rem;
  }
`

function getCopyrightYear(date: Date): string {
  // TODO: use the build year time
  return String(date.getFullYear())
}

interface Props {
  maxWidth?: number
}

export const Footer: React.VFC<Props> = ({ maxWidth = 720 }) => {
  const copyrightYear = getCopyrightYear(new Date())
  return (
    <Footer_>
      <ContainerFoo $maxWidth={maxWidth} $noVerticalPadding>
        <Copyright>© {copyrightYear} Giovanni Ravalico</Copyright>
        <Address>
          <Twitter color="black" />
          <GitHub color="black" />
          <LinkedIn color="black" />
        </Address>
      </ContainerFoo>
    </Footer_>
  )
}
