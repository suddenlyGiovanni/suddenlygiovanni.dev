import * as React from 'react'

interface Props {
  readonly title: string
}

export const Section: React.FC<Props> = ({ children, title }) => (
  <section>
    <h2>{title}</h2>
    {children}
  </section>
)
