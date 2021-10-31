import * as React from 'react'

import type { Reference } from '../../types/resume'
import { Dump } from '../dump'
import { Section } from './section'

interface Props {
  readonly references: ReadonlyArray<Reference>
}

export const SectionReferences: React.VFC<Props> = ({ references }) => (
  <Section title={'References'}>
    {references.map((reference) => (
      <Dump>{reference}</Dump>
    ))}
  </Section>
)