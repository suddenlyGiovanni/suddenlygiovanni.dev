import styled, { StyledComponent } from 'styled-components'
import * as React from 'react'

import { Container } from '../container'
import { NavDesktop } from '../nav-desktop'
import NavMobile from '../nav-mobile'
// import { SuddenlyGiovanni } from '../suddenly-giovanni'

const HeaderStyled: StyledComponent<'header', any, {}, never> = styled.header`
  z-index: 10;

  display: flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 1rem 0;

  background: none;
  border-bottom: thin solid black;
`

const NavStyled: StyledComponent<'nav', any, {}, never> = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`

const Header: React.VFC = () => (
  <HeaderStyled>
    <Container $maxWidth={720} $noVerticalPadding>
      <NavStyled>
        {/*<SuddenlyGiovanni />*/}
        <NavMobile />
        <NavDesktop />
      </NavStyled>
    </Container>
  </HeaderStyled>
)

export default Header
