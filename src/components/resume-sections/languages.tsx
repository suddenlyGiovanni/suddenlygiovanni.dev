import { css } from '@emotion/core'
import React from 'react'

import type { Language } from '../../../typings/resume'

type Props = {
  languages: Language[]
}

export function Languages({ languages }: Props): JSX.Element {
  return (
    <section>
      <h2>Languages</h2>
      <dl>
        {languages.map(({ fluency, language }) => (
          <div
            key={language}
            css={css`
              display: flex;
              align-items: center;
              justify-content: flex-start;
              dt,
              dd {
                margin-bottom: unset;
              }
              dd {
                margin-left: 1em;
              }
            `}
          >
            <dt>{language}</dt>
            <dd>{fluency}</dd>
          </div>
        ))}
      </dl>
    </section>
  )
}
