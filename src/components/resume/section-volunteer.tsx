import * as React from 'react'

import type { Volunteer as IVolunteer } from '../../types/resume'
import { Dump } from '../dump'
import { Section } from './section'

interface Props {
  readonly volunteers: ReadonlyArray<IVolunteer>
}

export const SectionVolunteer: React.VFC<Props> = ({ volunteers }) => (
  <Section title={'Volunteer'}>
    {volunteers.map((volunteer) => (
      <Dump>{volunteer}</Dump>
    ))}
  </Section>
)