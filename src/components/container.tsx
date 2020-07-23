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
  return (
    <div
      css={css`
        width: 100%;
        max-width: ${maxWidth + (noHorizontalPadding ? 0 : 80)}px;
        margin: 0 auto;
        padding-top: ${noVerticalPadding ? 0 : '40'}px;
        padding-right: ${noHorizontalPadding ? 0 : '40'}px;
        padding-bottom: ${noVerticalPadding ? 0 : '40'}px;
        padding-left: ${noHorizontalPadding ? 0 : '40'}px;

        ${bpMaxSM} {
          padding-top: ${noVerticalPadding ? 0 : '20'}px;
          padding-right: ${noHorizontalPadding ? 0 : '20'}px;
          padding-bottom: ${noVerticalPadding ? 0 : '20'}px;
          padding-left: ${noHorizontalPadding ? 0 : '20'}px;
        }
      `}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...restProps}
    >
      {children}
    </div>
  )
}
