import React from 'react'

import type { Award } from '../../../typings/resume'

type Props = {
  awards: Award[]
}

export function Awards({ awards }: Props): JSX.Element {
  return (
    <section>
      <h6>AWARDS</h6>
      {awards.map((award) => (
        <pre>{JSON.stringify(award, null, 2)}</pre>
      ))}
    </section>
  )
}
