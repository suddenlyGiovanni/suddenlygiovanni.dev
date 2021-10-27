import * as React from 'react'

type Props = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLHeadingElement>,
  HTMLHeadingElement
>

export const SmallTitle: React.FC<Props> = ({ children, ...props }) => (
  <h3 {...props}>{children}</h3>
)
