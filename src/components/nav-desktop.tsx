import * as React from 'react'
import styled, { StyledComponent } from 'styled-components'

import Breakpoints from '../lib/breakpoints'
import { linksMap } from '../lib/links-map'
import { NavLink } from './nav-link'

const UnorderedListStyled: StyledComponent<'ul', any, {}, never> = styled.ul`
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

  @media (max-width: ${Breakpoints.maxSM}px) {
    display: none;
  }
`
const linksEntries = [...linksMap.entries()]

export const NavDesktop: React.VFC = () => {
  return (
    <UnorderedListStyled>
      {linksEntries.map(([key, { description, title, urlPathFragment }]) => (
        <li key={key}>
          <NavLink
            to={urlPathFragment}
            aria-label={description}
            activeClassName="current-page"
            {...(key === 'reading-journal'
              ? { $disabled: true }
              : { activeClassName: 'current-page' })}
          >
            {title.toUpperCase()}
          </NavLink>
        </li>
      ))}
    </UnorderedListStyled>
  )
}
