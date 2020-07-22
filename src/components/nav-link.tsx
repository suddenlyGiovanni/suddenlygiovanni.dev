import styled from '@emotion/styled'
import { Link } from 'gatsby'

export const NavLink = styled(Link)<{ fontWeight?: string }>`
  margin: 0 0.5rem 0 0;
  padding: 0.25rem;

  color: #222;
  font-weight: ${({ fontweight }) => fontweight || 'normal'};
  font-size: 1rem;
  line-height: 1;
  text-decoration: none;

  &.current-page {
    border-bottom: 2px solid #222;
  }

  &:last-of-type {
    margin-right: 0;
  }
`
