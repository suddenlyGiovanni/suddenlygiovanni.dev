/* eslint-disable react/jsx-props-no-spreading */
import React, { FC } from 'react'

type Props = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLParagraphElement>,
  HTMLParagraphElement
>

export const Paragraph: FC<Props> = ({ children, ...props }) => (
  <p {...props}>{children}</p>
)
