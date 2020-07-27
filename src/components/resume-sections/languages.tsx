import React from 'react'

import type { Language } from '../../../typings/resume'

type Props = {
  languages: Language[]
}

export function Languages({ languages }: Props): JSX.Element {
  return (
    <section>
      <h6>LANGUAGES</h6>
      {languages.map((language) => (
        <pre>{JSON.stringify(languages, null, 2)}</pre>
      ))}
    </section>
  )
}
