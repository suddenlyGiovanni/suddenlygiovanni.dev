import { css } from '@emotion/core'
import { Link } from 'gatsby'
import React, { FC } from 'react'

import { DateAndReadingTime } from './date-and-reading-time'

type Props = {
  id: string
  slug: string
  author: string
  title: string
  description: string
  date: Date
  timeToRead: number
}

export const PostPreview: FC<Props> = ({
  id,
  slug,
  author,
  title,
  description,
  date,
  timeToRead,
}) => (
  <article>
    <header>
      <h2
        css={css`
          margin-top: unset;
        `}
      >
        <Link
          css={css`
            color: unset;
            text-decoration: none;

            box-shadow: none;
            &:visited {
              color: unset;
            }
          `}
          to={slug}
        >
          {title}
        </Link>
      </h2>
      <DateAndReadingTime date={date} timeToRead={timeToRead} />
    </header>

    <section>
      <p>{description}</p>
    </section>
  </article>
)
