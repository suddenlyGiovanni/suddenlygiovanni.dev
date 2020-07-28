import { css } from '@emotion/core'
import React from 'react'
import { FaExternalLinkAlt } from 'react-icons/fa'

import type { Work } from '../../../typings/resume'

type Props = {
  works: Work[]
}

export function ProfessionalExperience({ works }: Props): JSX.Element {
  function formatDate(date: Date): string {
    return date.toLocaleDateString('en-US', {
      month: 'short',
      year: 'numeric',
    })
  }

  return (
    <section>
      <h2>Professional experience</h2>
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
          <dl
            css={css`
              border: solid thin;
            `}
          >
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
              {/* POSITION eg CEO/President */}
              <h3
                aria-label="job title"
                css={css`
                  margin-top: unset;
                  margin-bottom: unset;

                  font-weight: bold;
                  font-size: 1rem;
                  line-height: unset;
                `}
              >
                {position}
              </h3>
              {/* NAME eg Facebook */}
              <span
                aria-label="company"
                css={css`
                  & {
                    color: var(--body-color) !important;
                    font-size: 1rem !important;
                    font-style: unset !important;
                  }
                `}
              >
                {name}
                <a
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  css={css`
                    margin-left: 0.5rem;
                  `}
                >
                  <FaExternalLinkAlt />
                </a>
              </span>
              <span
                css={css`
                  justify-content: space-between;
                `}
              >
                {/* START DATE / END DATE */}
                <span aria-label="start date / end date">
                  <time
                    dateTime={startDate?.toISOString()}
                    css={css`
                      margin-right: 0.5rem;
                    `}
                  >
                    {startDate && formatDate(startDate)}
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
                        {formatDate(endDate)}
                      </time>
                    </>
                  )}
                </span>
                {/* LOCATION */}
                <span aria-label="company location">{location}</span>
              </span>

              {/* DESCRIPTION */}
              {description && (
                <span aria-label="company description">{description}</span>
              )}
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
                    /* margin-bottom: unset; */
                    padding-left: unset;
                  }
                `}
              >
                {highlights?.map((highlight) => (
                  <li>{highlight}</li>
                ))}
              </ul>
            </dd>
          </dl>
        )
      )}
    </section>
  )
}
