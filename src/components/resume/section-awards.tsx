import type { Award } from '../../types/resume'

import { Dump } from '../dump'
import { Section } from './section'

interface Props {
  readonly awards: ReadonlyArray<Award>
}

export const SectionAwards: React.VFC<Props> = ({ awards }) => (
  <Section title={'Awards'}>
    {awards.map((award) => (
      <Dump>{award}</Dump>
    ))}
  </Section>
)
