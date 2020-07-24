import { css } from '@emotion/core'
import React from 'react'

import { maxSM } from '../lib/breakpoints'

import { NavLink } from './nav-link'

export const NavDesktop = (): JSX.Element => (
  <ul
    css={css`
      display: flex;
      flex-direction: row;
      margin: unset;
      padding: unset;

      list-style: unset;

      counter-reset: unset;
      margin-block-start: unset;
      margin-block-end: unset;
      padding-inline-start: unset;

      & > li {
        display: block;
        margin-right: 0.5rem;
        margin-bottom: unset;
        padding-left: unset;

        text-align: unset;

        &:last-of-type {
          margin-right: 0;
        }
      }
      @media (max-width: ${maxSM}px) {
        display: none;
      }
    `}
  >
    <li>
      <NavLink
        to="/"
        aria-label="go to homepage"
        activeClassName="current-page"
      >
        Blog
      </NavLink>
    </li>

    <li>
      <NavLink
        to="/"
        aria-label="go to reading journal"
        css={css`
          cursor: not-allowed;
        `}
      >
        Reading journal
      </NavLink>
    </li>

    <li>
      <NavLink
        to="/about"
        aria-label="go to about"
        activeClassName="current-page"
      >
        About
      </NavLink>
    </li>
  </ul>
)
