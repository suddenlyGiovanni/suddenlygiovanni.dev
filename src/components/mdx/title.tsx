import * as React from 'react'

type Props = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLHeadingElement>,
  HTMLHeadingElement
>

export const Title: React.FC<Props> = ({ children, ...props }) => (
  <h1 {...props}>{children}</h1>
)
