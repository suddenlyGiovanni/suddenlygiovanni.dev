import * as React from 'react'

import type { Work } from '../../types/resume'
import { Section } from './section'
import { SectionItem } from './section-item'

interface Props {
  readonly works: ReadonlyArray<Work>
}

export const SectionExperience: React.VFC<Props> = ({ works }) => (
  <Section title={'Experience'}>
    {works.map(
      ({
        description,
        endDate,
        highlights,
        location,
        name,
        position,
        startDate,
        summary,
        url,
      }) => (
        <SectionItem
          key={`${String(name)} - ${String(position)}`}
          heading1={position || ''}
          heading1AriaLabel="job title"
          heading2={name || ''}
          heading2AriaLabel="company"
          heading2Link={url}
          startDate={startDate}
          endDate={endDate}
          location={location}
          description={description}
          summary={summary || ''}
          highlights={highlights || []}
        />
      )
    )}
  </Section>
)
