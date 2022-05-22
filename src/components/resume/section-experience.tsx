import * as React from 'react'

import type { Work } from '../../types/resume'
import { Section } from './section'
import { SectionItem } from './section-item'

interface Props {
  readonly works: ReadonlyArray<Work>
}

function DescriptionContact({
  contact,
  ...ddProps
}: React.ComponentProps<'dt'> & {
  contact: NonNullable<Work['contact']>
}) {
  return (
    <>
      <dt {...ddProps}>Contacts:</dt>
      <dd>
        <address
          style={{
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'baseline',
          }}
        >
          <span>{contact.name}</span>
          {contact.email && (
            <a href={`mailto:${contact.email}`}>{contact.email}</a>
          )}
          {contact.phone && (
            <a href={`tel:${contact.phone}`}>{contact.phone}</a>
          )}
        </address>
      </dd>
    </>
  )
}

export const SectionExperience: React.VFC<Props> = ({ works }) => (
  <Section title={'Experience'}>
    {works.map(
      (
        {
          description,
          endDate,
          highlights,
          location,
          name,
          position,
          startDate,
          summary,
          url,
          contact,
        },
        idx
      ) => (
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
        >
          {contact && (
            <DescriptionContact
              key={`${idx} - ${String(name)} - ${String(position)} -${
                contact.name
              } `}
              contact={contact}
            />
          )}
        </SectionItem>
      )
    )}
  </Section>
)
