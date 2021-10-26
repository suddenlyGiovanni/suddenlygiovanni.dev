import styled, { StyledComponent } from 'styled-components'
import React from 'react'

import Breakpoints from '../../lib/breakpoints'

import { Container } from '../container'
import { GitHub, LinkedIn, Twitter } from '../social'

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

  ${Breakpoints.mediaQuerySmallDevices} {
    padding-bottom: 1rem;
  }
`

interface Props {
  maxWidth?: number
}

export const Footer = ({ maxWidth = 720 }: Props): JSX.Element => {
  const copyrightYear = new Date().getFullYear() // TODO: use the build year time
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
