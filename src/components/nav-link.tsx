import styled from '@emotion/styled'
import { Link } from 'gatsby'

export const NavLink = styled(Link)`
  padding: 0.25rem;

  color: inherit;
  text-decoration: none;

  &:hover,
  &:active {
    text-decoration: none;
  }

  &.current-page {
    border-bottom: 2px solid #222;
  }

`
