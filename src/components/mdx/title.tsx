/* eslint-disable react/jsx-props-no-spreading */
import React, { FC } from 'react'

type Props = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLHeadingElement>,
  HTMLHeadingElement
>

export const Title: FC<Props> = ({ children, ...props }) => (
  <h1 {...props}>{children}</h1>
)
