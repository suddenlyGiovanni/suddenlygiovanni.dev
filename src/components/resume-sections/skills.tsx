import React from 'react'

import type { Skill } from '../../../typings/resume'

import { TemplateList } from './template-list'

type Props = {
  skills: Skill[]
}

export function Skills({ skills }: Props): JSX.Element {
  return (
    <section>
      <h2>SKILLS</h2>
      {skills.map(({ name, keywords }) => (
        <TemplateList
          key={name}
          heading={name || ''}
          stringList={keywords || []}
        />
      ))}
    </section>
  )
}
