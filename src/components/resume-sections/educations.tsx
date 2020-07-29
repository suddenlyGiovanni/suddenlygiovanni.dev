import React from 'react'

import type { Education } from '../../../typings/resume'

import { Template } from './template'

type Props = {
  educations: Education[]
}

export function Educations({ educations }: Props): JSX.Element {
  return (
    <section>
      <h2>Education</h2>
      {educations.map(
        ({
          area,
          courses,
          endDate,
          startDate,
          institution,
          studyType,
          url,
          location,
        }) => (
          <Template
            key={institution}
            heading1={area || ''}
            heading1AriaLabel="area of education"
            heading2={institution || ''}
            heading2AriaLabel="institution"
            heading2Link={url}
            location={location}
            startDate={startDate}
            endDate={endDate}
            description={studyType}
            summary=""
            highlights={courses || []}
          />
        )
      )}
      <pre>{JSON.stringify(educations[0], null, 2)}</pre>
    </section>
  )
}
