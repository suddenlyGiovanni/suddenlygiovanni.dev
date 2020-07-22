/* eslint-disable react/jsx-props-no-spreading */
import { css } from '@emotion/core'
import { GatsbyLinkProps, Link } from 'gatsby'
import React, { FC } from 'react'

export const HeaderLink: FC<GatsbyLinkProps<unknown>> = ({
  children,
  ...props
}) => (
  <>
    {/*
      // @ts-ignore */}
    <Link
      activeClassName="current-page"
      css={css`
        color: inherit;
        text-decoration: none;

        background: transparent;

        &:hover,
        &:focus {
          color: white;

          background: rgba(40, 28, 77, 0.3);
        }
        &.current-page {
          background: rgba(40, 28, 77, 0.3);
        }
      `}
      {...props}
    >
      {children}
    </Link>
  </>
)
