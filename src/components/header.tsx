/* eslint-disable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access, sort-keys */
import styled from '@emotion/styled'
import React from 'react'

import { bpMaxSM } from '../lib/breakpoints'

import { Container } from './container'
import { NavDesktop } from './nav-desktop'
import { NavMobile } from './nav-mobile'
import { SuddenlyGiovanni } from './suddenly-giovanni'

export const Header = (): JSX.Element => (
  <HeaderComp>
    <Container maxWidth={720} noVerticalPadding>
      <Nav>
        <SuddenlyGiovanni to="/" ariaLabel="go to homepage" />
        <NavLinksContainer>
          <NavMobile />
          <NavDesktop />
        </NavLinksContainer>
      </Nav>
    </Container>
  </HeaderComp>
)

const HeaderComp = styled('header')`
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

const Nav = styled('nav')`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`

const NavLinksContainer = styled('div')`
  display: flex;
  align-items: center;
  justify-content: space-between;

  .mobile-nav {
    display: none;

    visibility: hidden;
    ${bpMaxSM} {
      display: block;

      visibility: visible;
    }
  }
`
