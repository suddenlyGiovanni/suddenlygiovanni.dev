import React from 'react'

import type { Work } from '../../../typings/resume'

import { Template } from './template'

type Props = {
  works: Work[]
}

export function Experience({ works }: Props): JSX.Element {
  return (
    <section>
      <h2>Experience</h2>
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
          <Template
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
    </section>
  )
}
