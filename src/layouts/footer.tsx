import * as React from 'react'
import styled, { StyledComponent } from 'styled-components'

import { Container, GitHub, LinkedIn, Twitter } from '../components'
import * as Responsive from '../lib/responsive'

const FooterStyled = styled.footer`
  position: relative;

  flex-shrink: 0;
  width: 100%;

  border-top: thin solid black;
`

const AddressStyled: StyledComponent<
  'address',
  any,
  {},
  never
> = styled.address`
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-width: 120px;
  margin-top: 1rem;
`

const CopyrightStyled = styled.p`
  flex: 1 auto;
  margin-top: 1rem;
  margin-bottom: 0;
`

const ContainerStyled = styled(Container)`
  display: flex;
  flex-flow: row wrap;
  align-content: space-between;
  padding-bottom: 1rem;

  @query ${Responsive.Queries.mobile} {
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
    <FooterStyled>
      <ContainerStyled $maxWidth={maxWidth} $noVerticalPadding>
        <CopyrightStyled>© {copyrightYear} Giovanni Ravalico</CopyrightStyled>
        <AddressStyled>
          <Twitter color="black" />
          <GitHub color="black" />
          <LinkedIn color="black" />
        </AddressStyled>
      </ContainerStyled>
    </FooterStyled>
  )
}
