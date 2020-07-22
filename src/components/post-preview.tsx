import { css } from '@emotion/core'
import { Link } from 'gatsby'
import React, { FC } from 'react'


type Props = {
  post: {
    author: string
    excerpt: string
    slug: string
    title: string
    date?: string
  }
}

export const PostPreview: FC<Props> = ({ post }) => (
  <article key={post.slug}>
    <header>
      <h3
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
      </h3>
      <small>
        {post?.date ||
          new Date().toLocaleString('en-US', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
          })}{' '}
        • 🍺 1 min read
      </small>
    </header>

    <section>
      <p>{post.excerpt}</p>
    </section>
  </article>
)
