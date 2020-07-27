import React from 'react'

import type { Skill } from '../../../typings/resume'

type Props = {
  skills: Skill[]
}

export function Skills({ skills }: Props): JSX.Element {
  return (
    <section>
      <h6>SKILLS</h6>
      {skills.map((skill) => (
        <pre>{JSON.stringify(skill, null, 2)}</pre>
      ))}
    </section>
  )
}
