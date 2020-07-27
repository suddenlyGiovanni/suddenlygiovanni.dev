import React from 'react'

import type { Education } from '../../../typings/resume'

type Props = {
  educations: Education[]
}

export function Educations({ educations }: Props): JSX.Element {
  return (
    <section>
      <h6>EDUCATION</h6>
      {educations.map((education) => (
        <pre>{JSON.stringify(education, null, 2)}</pre>
      ))}
    </section>
  )
}
