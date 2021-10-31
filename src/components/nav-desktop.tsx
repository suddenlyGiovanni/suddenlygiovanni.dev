import * as React from 'react'
import styled, { StyledComponent } from 'styled-components'

import * as Responsive from '../lib/responsive'
import { linksEntries } from '../lib/links-map'
import { NavLink } from './nav-link'

const NavListDesktop: StyledComponent<'ul', any, {}, never> = styled.ul`
  display: none;

  @media ${Responsive.Queries.tabletAndUp} {
    display: flex;
    flex-direction: row;
    margin: unset;
    padding: unset;

    list-style: unset;

    margin-block-start: unset;
    margin-block-end: unset;
    padding-inline-start: unset;
  }
`

const NavListItemDesktop = styled.li`
  display: block;
  margin-right: 0.5rem;
  margin-bottom: unset;
  padding-left: unset;

  text-align: unset;

  &:last-of-type {
    margin-right: 0;
  }
`

export const NavDesktop: React.VFC = () => {
  return (
    <NavListDesktop>
      {linksEntries.map(([key, { description, title, urlPathFragment }]) => (
        <NavListItemDesktop key={key} tabIndex={-1}>
          <NavLink
            to={urlPathFragment}
            aria-label={description}
            // @ts-ignore
            activeClassName="current-page"
            {...(key === 'reading-journal'
              ? { $disabled: true, activeClassName: undefined }
              : {})}
          >
            {title.toUpperCase()}
          </NavLink>
        </NavListItemDesktop>
      ))}
    </NavListDesktop>
  )
}
