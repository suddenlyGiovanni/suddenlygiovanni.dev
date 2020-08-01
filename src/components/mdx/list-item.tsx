/* eslint-disable react/jsx-props-no-spreading */
import React, { FC } from 'react'

type Props = React.DetailedHTMLProps<
  React.LiHTMLAttributes<HTMLLIElement>,
  HTMLLIElement
>
export const ListItem: FC<Props> = ({ children, ...props }) => (
  <li {...props}>{children}</li>
)
