import styled from '@emotion/styled'
import { Link } from 'gatsby'

export const NavLink = styled(Link)<{ fontWeight?: string }>`
  color: #222;
  font-size: 1rem;
  font-weight: ${({ fontWeight }) => fontWeight || 'normal'};
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
