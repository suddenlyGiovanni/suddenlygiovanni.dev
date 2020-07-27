import React from 'react'

import type { Work } from '../../../typings/resume'

type Props = {
  works: Work[]
}

export function ProfessionalExperience({ works }: Props): JSX.Element {
  return (
    <section>
      <h6>PROFESSIONAL EXPERIENCE</h6>
      {works.map((work) => (
        <pre>{JSON.stringify(work, null, 2)}</pre>
      ))}
    </section>
  )
}
