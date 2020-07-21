import { css } from '@emotion/core'
import React, { FC } from 'react'

import { NavLink } from './nav-link'
import { SuddenlyGiovanni } from './suddenly-giovanni'

export const Header: FC = () => {
  return (
    <header
      css={css`
        display: flex;
        justify-content: space-between;
        align-items: center;

        padding: 0.5rem calc((100vw - 550px - 0.5rem) / 2);

        background: #fff;
        border-bottom: 1px dashed;
      `}
    >
      {/* Site name */}
      <NavLink to="/" fontWeight="bold">
        <SuddenlyGiovanni />
      </NavLink>

      <nav
        css={css`
          margin-top: 0;
        `}
      >
        <NavLink to="/" activeClassName="current-page">
          Blog
        </NavLink>
        <NavLink to="/">Reading journal</NavLink>
        <NavLink to="/about" activeClassName="current-page">
          About
        </NavLink>
      </nav>
    </header>
  )
}
