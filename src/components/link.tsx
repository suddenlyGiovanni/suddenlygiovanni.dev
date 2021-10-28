import { GatsbyLinkProps, Link as GatsbyLink } from 'gatsby'
import * as React from 'react'

export const Link: React.FC<GatsbyLinkProps<unknown>> = ({
  children,
  to,
  ...props
}) => {
  const internal = /^\/(?!\/)/.test(to)

  if (internal) {
    return (
      <>
        {/* @ts-ignore */}
        <GatsbyLink to={to} {...props}>
          {children}
        </GatsbyLink>
      </>
    )
  }
  return (
    <a href={to} {...props}>
      {children}
    </a>
  )
}
