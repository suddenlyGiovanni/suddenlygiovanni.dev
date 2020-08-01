/* eslint-disable react/jsx-props-no-spreading */
import React, { FC } from 'react'

type Props = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLPreElement>,
  HTMLPreElement
>

export const Pre: FC<Props> = ({ children, ...props }) => (
  <pre {...props}>{children}</pre>
)
