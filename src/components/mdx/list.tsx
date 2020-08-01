/* eslint-disable react/jsx-props-no-spreading */
import React, { FC } from 'react'

type Props = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLUListElement>,
  HTMLUListElement
>

export const List: FC<Props> = ({ children, ...props }) => (
  <ul {...props}>{children}</ul>
)
