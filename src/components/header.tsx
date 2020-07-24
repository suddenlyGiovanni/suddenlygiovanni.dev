/* eslint-disable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access, sort-keys */
import styled from '@emotion/styled'
import React from 'react'

import { bpMaxSM } from '../lib/breakpoints'

import { Container } from './container'
import { MobileNav } from './mobile-nav'
import { NavLink } from './nav-link'
import { SuddenlyGiovanni } from './suddenly-giovanni'

export const Header = (): JSX.Element => (
  <HeaderComp>
    <Container maxWidth={720} noVerticalPadding>
      <Nav>
        <SuddenlyGiovanni to="/" ariaLabel="go to homepage" />

        <NavLinksContainer>
          <MobileNav />
          <NavLink to="/" aria-label="go to homepage">
            Blog
          </NavLink>

          {/* faking a disabled NavLink until ready to add this section */}
          <ReadingJournalLink aria-label="go to reading journal">
            Reading journal
          </ReadingJournalLink>

          <NavLink to="/about" aria-label="go to about">
            About
          </NavLink>
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

const ReadingJournalLink = styled('span')({
  background: 'transparent',
  borderRadius: '3px',
  marginTop: 'unset',
  padding: '8px 10px',
  ':hover': {
    cursor: 'not-allowed',
  },

  /* stylelint-disable-line */ [bpMaxSM]: {
    display: 'none',
  },
})
