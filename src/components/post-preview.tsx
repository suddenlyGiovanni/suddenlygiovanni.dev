import { css } from '@emotion/core'
import { Link } from 'gatsby'
import React, { FC } from 'react'

import { ReadLink } from '.'

type Props = {
  post: {
    author: string
    excerpt: string
    slug: string
    title: string
  }
}

export const PostPreview: FC<Props> = ({ post }) => (
  <article
    css={css`
      border-bottom: 1px solid #ddd;
      margin-top: 0.7rem;
      padding-bottom: 1rem;

      ::first-of-type {
        margin-top: 1rem;
      }
    `}
  >
    <h3>
      <Link to={post.slug}>{post.title}</Link>
    </h3>
    <p>{post.excerpt}</p>
    <ReadLink to={post.slug}>read this post &rarr;</ReadLink>
  </article>
)
