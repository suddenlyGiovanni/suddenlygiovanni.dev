import type { Education } from '@typings/resume'

import { Section } from './section'
import { SectionItem } from './section-item'

interface Props {
  readonly educations: ReadonlyArray<Education>
}

export const SectionEducation: React.VFC<Props> = ({ educations }) => (
  <Section title={'Education'}>
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
        <SectionItem
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
  </Section>
)
