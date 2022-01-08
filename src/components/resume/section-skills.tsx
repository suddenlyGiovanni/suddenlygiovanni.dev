import type { Skill } from '@typings/resume'

import { Section } from './section'
import { SubSection } from './sub-section'

interface Props {
  readonly skills: ReadonlyArray<Skill>
}

export const SectionSkills: React.VFC<Props> = ({ skills }) => (
  <Section title={'SkillsSection'}>
    {skills.map(({ name, keywords }) => (
      <SubSection key={name} heading={name || ''} keywords={keywords || []} />
    ))}
  </Section>
)
