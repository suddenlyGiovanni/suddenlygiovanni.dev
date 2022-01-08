import React from 'react'

import type { Route } from '@lib/routes-map'
import { NavLink } from './nav-link'

interface Props
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLUListElement>,
    HTMLUListElement
  > {
  routeEntries: ReadonlyArray<Route>
  onNavItemClick?: React.MouseEventHandler<HTMLAnchorElement>
}

export const NavItems: React.VFC<Props> = ({
  routeEntries,
  onNavItemClick,
  ...props
}) => (
  <ul {...props}>
    {routeEntries.map(({ uri, description, title, url, disabled }) => (
      <li key={uri}>
        <NavLink
          to={url}
          aria-label={description}
          // @ts-ignore
          activeClassName="current-page"
          onClick={onNavItemClick}
          {...(disabled
            ? {
                $disabled: true,
                activeClassName: undefined,
                style: { pointerEvents: 'none' },
                'aria-disabled': true,
              }
            : {})}
        >
          {title.toUpperCase()}
        </NavLink>
      </li>
    ))}
  </ul>
)
