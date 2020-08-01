/* eslint-disable react/jsx-props-no-spreading */
import { Link as GatsbyLink, GatsbyLinkProps } from 'gatsby'
import React, { FC } from 'react'

type Props<TState = unknown> = GatsbyLinkProps<TState>

export const Link: FC<Props> = ({ children, to, ...props }) => {
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
