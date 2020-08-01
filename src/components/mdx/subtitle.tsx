/* eslint-disable react/jsx-props-no-spreading */
import React, { FC } from 'react'

type Props = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLHeadingElement>,
  HTMLHeadingElement
>

export const Subtitle: FC<Props> = ({ children, ...props }) => (
  <h2 {...props}>{children}</h2>
)
