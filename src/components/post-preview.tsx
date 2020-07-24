import { css } from '@emotion/core'
import { Link } from 'gatsby'
import React, { FC } from 'react'

import { formatReadingTime } from '../lib/helpers'

type Props = {
  post: {
    id: string
    slug: string
    author: string
    title: string
    description: string
    date: string
    timeToRead: number
  }
}

export const PostPreview: FC<Props> = ({ post }) => (
  <article>
    <header>
      <h2
        css={css`
          margin-bottom: 0.5rem;
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
      <small>
        {post.date}
        {` • ${formatReadingTime(post.timeToRead)}`}
      </small>
    </header>

    <section>
      <p>{post.description}</p>
    </section>
  </article>
)
