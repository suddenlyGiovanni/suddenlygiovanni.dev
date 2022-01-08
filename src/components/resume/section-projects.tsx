import type { Project } from '@typings/resume'

import { Dump } from '../dump'
import { Section } from './section'

interface Props {
  readonly projects: ReadonlyArray<Project>
}

export const SectionProjects: React.VFC<Props> = ({ projects }) => (
  <Section title={'Projects'}>
    {projects.map((project) => (
      <Dump>{project}</Dump>
    ))}
  </Section>
)
