import styled from '@emotion/styled'
// import { Link } from 'gatsby'

import { bpMaxSM } from '../lib/breakpoints'

import { HeaderLink } from './header-link'

// export const NavLink = styled(Link)<{ fontWeight?: string }>`
//   margin: 0 0.5rem 0 0;
//   padding: 0.25rem;

//   color: #222;
//   font-weight: ${({ fontweight }) => fontweight || 'normal'};
//   font-size: 1rem;
//   line-height: 1;
//   text-decoration: none;

//   &.current-page {
//     border-bottom: 2px solid #222;
//   }

//   &:last-of-type {
//     margin-right: 0;
//   }
// `

export const NavLink = styled(HeaderLink)({
  background: 'transparent',
  borderRadius: '3px',
  marginTop: 'unset',
  padding: '8px 10px',
  // media query
  /* stylelint-disable-line */ [bpMaxSM]: {
    display: 'none',
  },
})
