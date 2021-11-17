import styled from 'styled-components'
import { navItems } from '../../config/nav-items'

import { Container } from './container'
import { NavDesktop } from './nav-desktop'
import { NavMobile } from './nav-mobile'
import { SuddenlyGiovanni } from './suddenly-giovanni'

const HeaderStyled = styled.header`
  z-index: 10;

  display: flex;
  align-items: center;
  flex-shrink: 0;
  justify-content: space-between;
  width: 100%;
  padding: 1rem 0;

  border-bottom: thin solid black;
  background: none;
`

const Nav = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`

export const Header: React.VFC = () => (
  <HeaderStyled>
    <Container $maxWidth={720} $noVerticalPadding>
      <Nav>
        <SuddenlyGiovanni />
        <NavMobile linksEntries={navItems} />
        <NavDesktop linksEntries={navItems} />
      </Nav>
    </Container>
  </HeaderStyled>
)
