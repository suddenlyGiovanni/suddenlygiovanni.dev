import React from 'react'

import type { Publication } from '../../../typings/resume'

type Props = {
  publications: Publication[]
}

export function Publications({ publications }: Props): JSX.Element {
  return (
    <section>
      <h6>PUBLICATIONS</h6>
      {publications.map((publication) => (
        <pre>{JSON.stringify(publication, null, 2)}</pre>
      ))}
    </section>
  )
}
