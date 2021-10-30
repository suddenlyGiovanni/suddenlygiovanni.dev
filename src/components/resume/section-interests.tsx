import * as React from 'react'

import type { Interest } from '../../types/resume'

import { SubSection } from './sub-section'
import { Section } from './section'

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
