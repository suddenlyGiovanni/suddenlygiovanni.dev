import * as React from 'react'

import * as L from '../lib/links-map'
import { NavLink } from './nav-link'

interface Props
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLUListElement>,
    HTMLUListElement
  > {
  linksEntries: ReadonlyArray<
    [
      L.MapKeys,
      L.Blog | L.ReadingJournal | L.AboutMe | L.Resume | L.Motivations
    ]
  >
}

export const NavItems: React.VFC<Props> = ({ linksEntries, ...props }) => (
  <ul {...props}>
    {linksEntries.map(([key, { description, title, urlPathFragment }]) => (
      <li key={key}>
        <NavLink
          to={urlPathFragment}
          aria-label={description}
          // @ts-ignore
          activeClassName="current-page"
          {...(key === 'reading-journal'
            ? {
                $disabled: true,
                activeClassName: undefined,
                style: { pointerEvents: 'none' },
                'aria-disabled': true,
                onClick: (e) => {
                  e.preventDefault()
                },
              }
            : {})}
        >
          {title.toUpperCase()}
        </NavLink>
      </li>
    ))}
  </ul>
)
