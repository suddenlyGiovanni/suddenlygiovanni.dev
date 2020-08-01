/* eslint-disable react/jsx-props-no-spreading */
import React, { FC } from 'react'

type Props = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLHeadingElement>,
  HTMLHeadingElement
>

export const SmallTitle: FC<Props> = ({ children, ...props }) => (
  <h3 {...props}>{children}</h3>
)
