import { Link } from 'gatsby'
import styled, { StyledComponent } from 'styled-components'

export const NavLink: StyledComponent<
  typeof Link,
  any,
  { $disabled: boolean },
  '$disabled'
> = styled(Link).attrs(({ $disabled }: { $disabled?: boolean }) => ({
  $disabled: $disabled ?? false,
}))`
  padding: 0.25rem;

  color: inherit;
  text-decoration: ${({ $disabled }) =>
    $disabled ? ('line-through' as const) : ('none' as const)};

  cursor: ${({ $disabled }) =>
    $disabled ? ('default' as const) : ('not-allowed' as const)};

  &:hover {
    text-decoration: ${({ $disabled }) =>
      $disabled ? ('line-through' as const) : ('none' as const)};

    cursor: ${({ $disabled }) => ($disabled ? 'default' : 'not-allowed')};
  }

  &:hover,
  &:active {
    text-decoration: none;
  }

  &.current-page {
    border-bottom: 2px solid #222;
  }
`
