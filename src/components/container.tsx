/* eslint-disable no-magic-numbers */
import { css } from '@emotion/core'
import React, { FC } from 'react'

import { bpMaxSM } from '../lib/breakpoints'

type Props = {
  maxWidth?: number
  noHorizontalPadding?: boolean
  noVerticalPadding?: boolean
} & React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>
export const Container: FC<Props> = ({
  maxWidth = 720,
  noHorizontalPadding = false,
  noVerticalPadding = false,
  children,
  ...restProps
}) => {
  const fullMaxWidth = Number.isNaN(Number(maxWidth))
    ? maxWidth
    : `${maxWidth + (noHorizontalPadding ? 0 : 80)}px`
  return (
    <div
      css={css`
        width: 100%;
        max-width: ${fullMaxWidth};
        margin: 0 auto;
        padding: ${noVerticalPadding ? 0 : '40'}px
          ${noHorizontalPadding ? 0 : '40'}px;
        ${bpMaxSM} {
          padding: ${noVerticalPadding ? 0 : '20'}px
            ${noHorizontalPadding ? 0 : '20'}px;
        }
      `}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...restProps}
    >
      {children}
    </div>
  )
}
