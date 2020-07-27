import React from 'react'

import type { Reference } from '../../../typings/resume'

type Props = {
  references: Reference[]
}

export function References({ references }: Props): JSX.Element {
  return (
    <section>
      <h6>REFERENCES</h6>
      {references.map((reference) => (
        <pre>{JSON.stringify(reference, null, 2)}</pre>
      ))}
    </section>
  )
}
