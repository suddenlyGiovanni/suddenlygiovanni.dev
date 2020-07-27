import React from 'react'

import type { Project } from '../../../typings/resume'

type Props = {
  projects: Project[]
}

export function Projects({ projects }: Props): JSX.Element {
  return (
    <section>
      <h6>PROJECTS</h6>
      {projects.map((project) => (
        <pre>{JSON.stringify(project, null, 2)}</pre>
      ))}
    </section>
  )
}
