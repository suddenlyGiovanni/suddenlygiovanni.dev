import { Link } from 'gatsby'
import styled, { StyledComponent } from 'styled-components'

export const NavLink: StyledComponent<
  typeof Link,
  any,
  { $disabled: boolean },
  '$disabled'
> = styled(Link).attrs(({ $disabled }: { $disabled?: boolean }) => ({
  $disabled: Boolean($disabled),
}))`
  padding: 0.25rem;

  color: inherit;
  text-decoration: ${
    ({ $disabled }) =>
      $disabled
        ? ('line-through' as const) //
        : ('unset' as const) //
  };

  cursor: ${
    ({ $disabled }) =>
      $disabled
        ? ('not-allowed' as const) //
        : ('revert' as const) //
  };

  &.current-page {
    border-bottom: 2px solid #222;
  }

  &:hover.current-page {
    text-decoration: none;
  }

  &:hover {
    cursor: ${
      ({ $disabled }) =>
        $disabled
          ? ('not-allowed' as const) //
          : ('revert' as const) //
    };

    text-decoration: ${
      ({ $disabled }) =>
        $disabled
          ? ('line-through' as const) //
          : ('revert' as const) //
    };
  }
`
