import * as React from 'react'
import styled, { StyledComponent } from 'styled-components'

import {
  Container,
  NavDesktop,
  NavMobile,
  SuddenlyGiovanni,
} from '../components'
import { linksEntries } from '../lib/links-map'

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

export const Header: React.VFC = () => (
  <HeaderStyled>
    <Container $maxWidth={720} $noVerticalPadding>
      <NavStyled>
        <SuddenlyGiovanni />
        <NavMobile linksEntries={linksEntries} />
        <NavDesktop linksEntries={linksEntries} />
      </NavStyled>
    </Container>
  </HeaderStyled>
)
