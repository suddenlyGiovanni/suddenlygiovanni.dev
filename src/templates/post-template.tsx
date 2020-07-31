/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { css } from '@emotion/core'
import { PageProps, graphql } from 'gatsby'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import React from 'react'

import { PostByIdQuery, PostDetailsFragment } from '../../typings/graphql-types'
import { Dump, Layout, ReadLink } from '../components'

// this graphql query will be called by gatsby-node at build time and its content will be injected
// in the PageProps at the data label
// remember to export it!
export const postByIdQuery = graphql`
  query PostById($id: String!) {
    post: mdx(id: { eq: $id }) {
      frontmatter {
        title
        slug
        date
        author
        description
        categories
        keywords
        banner
        bannerCredit
        published
        unlisted
        redirects
        image {
          id
        }
      }
      body
    }
  }
`

// this page context comes from the injected context of Gatsby's createPage
type PageContextType = {
  id: string
  slug: string
  previous: PostDetailsFragment
  next: PostDetailsFragment
}

type Props = PageProps<PostByIdQuery, PageContextType>
export default function PostTemplate({
  data,
  pageContext,
}: Props): JSX.Element {
  const { post } = data
  const { previous, next } = pageContext

  const title = post?.frontmatter?.title || ''
  const author = post?.frontmatter?.author || ''
  const body = post?.body || ''

  return (
    <Layout>
      <h1>{title}</h1>
      <p
        css={css`
          font-size: 0.75rem;
        `}
      >
        posted by {author} {post?.frontmatter?.date}
      </p>
      <MDXRenderer>{body}</MDXRenderer>
      {/* <Dump previous={previous} /> */}
      {/* <Dump next={next} /> */}

      <div
        css={css`
          display: flex;
          flex-direction: row;
          align-items: flex-end;
          justify-content: space-between;
          width: 100%;
        `}
      >
        {previous && (
          <span
            css={css`
              display: flex;
              flex-direction: column;
              align-items: flex-end;
            `}
          >
            &larr; previous post
            <ReadLink to={`/${previous.frontmatter?.slug || ''}`}>
              {previous.frontmatter?.title || 'previous'}
            </ReadLink>
          </span>
        )}

        <ReadLink to="/">back to all posts</ReadLink>

        {next && (
          <span
            css={css`
              display: flex;
              flex-direction: column;
            `}
          >
            next post &rarr;
            <ReadLink to={`/${next.frontmatter?.slug || ''}`}>
              {next.frontmatter?.title || 'next'}
            </ReadLink>
          </span>
        )}
      </div>
    </Layout>
  )
}
