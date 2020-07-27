import React from 'react'

import type { Interest } from '../../../typings/resume'

type Props = {
  interests: Interest[]
}

export function Interests({ interests }: Props): JSX.Element {
  return (
    <section>
      <h6>INTERESTS</h6>
      {interests.map((interest) => (
        <pre>{JSON.stringify(interest, null, 2)}</pre>
      ))}
    </section>
  )
}
