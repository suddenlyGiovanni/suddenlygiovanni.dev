import type { Interest } from '../../types/resume'
import { Section } from './section'
import { SubSection } from './sub-section'

interface Props {
  readonly interests: ReadonlyArray<Interest>
}

export const SectionInterests: React.VFC<Props> = ({ interests }) => (
  <Section title={'Interests'}>
    {interests.map(({ name, keywords }) => (
      <SubSection key={0} heading={name || ''} keywords={keywords || []} />
    ))}
  </Section>
)
