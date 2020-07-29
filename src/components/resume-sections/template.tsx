import { css } from '@emotion/core'
import React from 'react'
import { FaExternalLinkAlt } from 'react-icons/fa'

import { formatDateLocaleShort } from '../../lib/helpers'



type Props = {
  heading1: string
  heading1AriaLabel: string
  heading2: string
  heading2AriaLabel: string
  heading2Link?: string
  startDate?: Date
  endDate?: Date
  location?: string
  description?: string
  summary: string
  highlights: string[]
}

export function Template({
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
}: Props): JSX.Element {
  return (
    <dl>
      <dt
        css={css`
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
        `}
      >
        {/* HEADING 1 */}
        <h3
          aria-label={heading1AriaLabel}
          css={css`
            margin-top: unset;
            margin-bottom: unset;

            font-weight: bold;
            font-size: 1rem;
            line-height: unset;
          `}
        >
          {heading1}
        </h3>

        {/* HEADING 2 */}
        <span
          aria-label={heading2AriaLabel}
          css={css`
            color: var(--body-color) !important;
            font-weight: 550 !important;
            font-size: 1rem !important;
            font-style: unset !important;
          `}
        >
          {heading2}
          {heading2Link && (
            <a
              href={heading2Link}
              target="_blank"
              rel="noopener noreferrer"
              css={css`
                margin-left: 0.5rem;
              `}
            >
              <FaExternalLinkAlt
                aria-label={`link to ${heading2} ${heading2AriaLabel}`}
              />
            </a>
          )}
        </span>
        <span
          css={css`
            justify-content: space-between;
          `}
        >
          {/* START DATE / END DATE */}
          {startDate && (
            <span aria-label="start date / end date">
              <time
                dateTime={startDate?.toISOString()}
                css={css`
                  margin-right: 0.5rem;
                `}
              >
                {formatDateLocaleShort(startDate)}
              </time>
              {endDate && (
                <>
                  -
                  <time
                    dateTime={endDate.toISOString()}
                    css={css`
                      margin-left: 0.5rem;
                    `}
                  >
                    {formatDateLocaleShort(endDate)}
                  </time>
                </>
              )}
            </span>
          )}

          {/* LOCATION */}
          {location && <span aria-label="location">{location}</span>}
        </span>

        {/* DESCRIPTION */}
        {description && <span aria-label="description">{description}</span>}
      </dt>

      {/* SUMMARY */}
      <dd>{summary}</dd>

      {/* HIGHLIGHTS */}
      <dd>
        <ul
          css={css`
            margin-bottom: unset;
            margin-left: unset;

            list-style-type: none;
            li {
              padding-left: unset;
            }
          `}
          aria-label="highlights"
        >
          {highlights?.map((highlight, i) => (
            <li key={`${i}${highlight[0]}`}>{highlight}</li>
          ))}
        </ul>
      </dd>
    </dl>
  )
}
