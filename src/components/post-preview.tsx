import { css } from '@emotion/core'
import { Link } from 'gatsby'
import Image, { FluidObject } from 'gatsby-image'
import React, { FC } from 'react'

import { ReadLink } from './read-link'

type Props = {
  post: {
    author: string
    excerpt: string
    slug: string
    title: string
    image: FluidObject | undefined
  }
}

export const PostPreview: FC<Props> = ({ post }) => (
  <article
    css={css`
      display: flex;
      border-bottom: 1px solid #ddd;
      margin-top: 0;
      padding-bottom: 1rem;

      ::first-of-type {
        margin-top: 1rem;
      }
    `}
  >
    <Link
      to={post.slug}
      css={css`
        margin: 1rem 1rem 0 0;
        width: 100px;
      `}
    >
      <Image
        fluid={post.image || undefined}
        css={css`
          * {
            margin-top: 0;
          }
        `}
        alt={post.title}
      />
    </Link>
    <div>
      <h3>
        <Link to={post.slug}>{post.title}</Link>
      </h3>
      <p>{post.excerpt}</p>
      <ReadLink to={post.slug}>read this post &rarr;</ReadLink>
    </div>
  </article>
)
