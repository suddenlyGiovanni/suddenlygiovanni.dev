import styled from 'styled-components'

import * as Responsive from '@lib/responsive'
import { NavItems } from './nav-items'

export const NavDesktop = styled(NavItems)`
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

  li {
    display: block;
    margin-right: 0.5rem;
    margin-bottom: unset;
    padding-left: unset;

    text-align: unset;

    &:last-of-type {
      margin-right: 0;
    }
  }
`
