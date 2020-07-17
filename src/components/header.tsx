import { css } from '@emotion/core'
import styled from '@emotion/styled'
import { GatsbyLinkProps, Link } from 'gatsby'
import React, { FC } from 'react'

type Props = {
  siteTitle?: string
}

const NavLink = styled(Link)<
  GatsbyLinkProps<unknown> & { fontWeight?: string }
>`
  color: #222;
  font-size: 1rem;
  font-weight: ${(props) => props.fontWeight || 'normal'};
  line-height: 1;
  margin: 0 0.5rem 0 0;
  padding: 0.25rem;
  text-decoration: none;
  &.current-page {
    border-bottom: 2px solid #222;
  }
  &:last-of-type {
    margin-right: 0;
  }
`

export const Header: React.FC<Props> = ({ siteTitle = '' }) => (
  <header
    css={css`
      background: #eee;
      border-bottom: 1px solid #ddd;
      display: flex;
      justify-content: space-between;
      padding: 0.5rem calc((100vw - 550px - 0.5rem) / 2);
    `}
  >
    {/* Site name */}
    <NavLink to="/" fontWeight="bold">
      Suddenly Giovanni
    </NavLink>

    <nav
      css={css`
        margin-top: 0;
      `}
    >
      <NavLink to="/" activeClassName="current-page">
        Home
      </NavLink>
      <NavLink to="/about" activeClassName="current-page">
        About
      </NavLink>
    </nav>
  </header>
)
