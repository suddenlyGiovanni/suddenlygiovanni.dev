import React from 'react'

import type { Interest } from '../../../typings/resume'

import { TemplateList } from './template-list'

type Props = {
  interests: Interest[]
}

export function Interests({ interests }: Props): JSX.Element {
  return (
    <section>
      <h2>Interests</h2>
      {interests.map(({ name, keywords }) => (
        <TemplateList
          key={0}
          heading={name || ''}
          stringList={keywords || []}
        />
      ))}
    </section>
  )
}
