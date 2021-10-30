import * as React from 'react'
import { FaExternalLinkAlt } from 'react-icons/fa'
import styled from 'styled-components'

import { formatDateLocaleShort } from '../../lib/dates'

const DescriptionDetailsHighlights: React.VFC<{
  highlights: ReadonlyArray<string>
}> = ({ highlights }) => (
  <dd>
    <ul aria-label="highlights">
      {highlights?.map((highlight, i) => (
        <li key={`${i}${highlight[0]}`}>{highlight}</li>
      ))}
    </ul>
  </dd>
)
const DescriptionDetailsHighlightsStyled = styled(DescriptionDetailsHighlights)`
  dd {
    ul {
      margin-bottom: unset;
      margin-left: unset;
      list-style-type: none;

      li {
        padding-left: unset;
      }
    }
  }
`

const DescriptionDetailsSummary: React.VFC<{ readonly summary: string }> = ({
  summary,
}) => <dd>{summary}</dd>

const Heading1 = styled.h3`
  margin-top: unset;
  margin-bottom: unset;

  font-weight: bold;
  font-size: 1rem;
  line-height: unset;
`

const Heading2 = styled.span`
  color: var(--body-color) !important;
  font-weight: 550 !important;
  font-size: 1rem !important;
  font-style: unset !important;
`

const Heading2LinkAnchor = styled.a`
  margin-left: 0.5rem;
`

const TimeStartDate = styled.time`
  margin-right: 0.5rem;
`

const TimeEndDate = styled.time`
  margin-left: 0.5rem;
`

const DateAndLocationWrapperSpan = styled.span`
  justify-content: space-between;
`

const LocationSpan = styled.span``
const DescriptionSpan = styled.span``

const DescriptionTermStyled = styled.dt`
  display: flex;
  flex-direction: column;
  width: 100%;

  span {
    display: flex;
    flex-direction: row;
    align-items: center;

    color: var(--text-muted);

    font-weight: normal;
    font-size: 0.9rem;
    font-style: italic;
  }
`

const DescriptionTerm: React.VFC<{
  readonly heading1: string
  readonly heading1AriaLabel: string
  readonly heading2: string
  readonly heading2AriaLabel: string
  readonly heading2Link?: string
  readonly startDate?: Date
  readonly endDate?: Date
  readonly location?: string
  readonly description?: string
}> = ({
  heading1AriaLabel,
  heading1,
  heading2,
  heading2AriaLabel,
  heading2Link,
  startDate,
  endDate,
  location,
  description,
}) => (
  <DescriptionTermStyled>
    <Heading1 aria-label={heading1AriaLabel}>{heading1}</Heading1>

    <Heading2 aria-label={heading2AriaLabel}>
      {heading2}
      {heading2Link && (
        <Heading2LinkAnchor
          href={heading2Link}
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaExternalLinkAlt
            aria-label={`link to ${heading2} ${heading2AriaLabel}`}
          />
        </Heading2LinkAnchor>
      )}
    </Heading2>

    <DateAndLocationWrapperSpan>
      {startDate && (
        <span aria-label="start date / end date">
          <TimeStartDate dateTime={startDate?.toISOString()}>
            {formatDateLocaleShort(startDate)}
          </TimeStartDate>
          {endDate && (
            <>
              -
              <TimeEndDate dateTime={endDate.toISOString()}>
                {formatDateLocaleShort(endDate)}
              </TimeEndDate>
            </>
          )}
        </span>
      )}

      {location && (
        <LocationSpan aria-label="location">{location}</LocationSpan>
      )}
    </DateAndLocationWrapperSpan>

    {description && (
      <DescriptionSpan aria-label="description">{description}</DescriptionSpan>
    )}
  </DescriptionTermStyled>
)

interface Props {
  readonly heading1: string
  readonly heading1AriaLabel: string
  readonly heading2: string
  readonly heading2AriaLabel: string
  readonly heading2Link?: string
  readonly startDate?: Date
  readonly endDate?: Date
  readonly location?: string
  readonly description?: string
  readonly summary: string
  readonly highlights: ReadonlyArray<string>
}

export const SectionItem: React.VFC<Props> = ({
  heading1,
  heading1AriaLabel,
  heading2,
  heading2AriaLabel,
  heading2Link,
  startDate,
  endDate,
  location,
  description,
  summary,
  highlights,
}) => (
  <dl>
    <DescriptionTerm
      heading1={heading1}
      heading1AriaLabel={heading1AriaLabel}
      heading2={heading2}
      heading2Link={heading2Link}
      heading2AriaLabel={heading2AriaLabel}
      startDate={startDate}
      endDate={endDate}
      location={location}
      description={description}
    />
    <DescriptionDetailsSummary summary={summary} />
    <DescriptionDetailsHighlightsStyled highlights={highlights} />
  </dl>
)
