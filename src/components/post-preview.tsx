import { css } from '@emotion/core'
import { Link } from 'gatsby'
import React, { FC } from 'react'

import { DateAndReadingTime } from './date-and-reading-time'

type Props = {
  post: {
    id: string
    slug: string
    author: string
    title: string
    description: string
    date: Date
    timeToRead: number
  }
}

export const PostPreview: FC<Props> = ({ post }) => (
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
          to={post.slug}
        >
          {post.title}
        </Link>
      </h2>
      <DateAndReadingTime date={post.date} timeToRead={post.timeToRead} />
    </header>

    <section>
      <p>{post.description}</p>
    </section>
  </article>
)
