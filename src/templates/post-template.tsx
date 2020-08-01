/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { css } from '@emotion/core'
import { PageProps, graphql } from 'gatsby'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import React from 'react'

import { PostByIdQuery, PostDetailsFragment } from '../../typings/graphql-types'
import { Layout, ReadLink } from '../components'

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

      <nav>
        <ul
          css={css`
            display: flex;
            flex-flow: row wrap;
            align-items: flex-end;
            justify-content: space-between;
            width: 100%;
            margin: 0;
            padding: 0;

            list-style: none;
            & > li {
              margin-bottom: unset;
              padding-left: unset;
            }
          `}
        >
          {previous && (
            <li>
              <span
                css={css`
                  display: flex;
                  flex-direction: column;
                  align-items: flex-end;
                `}
              >
                &larr; previous post
                <ReadLink
                  to={`/${previous.frontmatter?.slug || ''}`}
                  rel="prev"
                >
                  {previous.frontmatter?.title || 'previous'}
                </ReadLink>
              </span>
            </li>
          )}
          <li>
            <ReadLink to="/">back to all posts</ReadLink>
          </li>
          {next && (
            <li>
              <span
                css={css`
                  display: flex;
                  flex-direction: column;
                `}
              >
                next post &rarr;
                <ReadLink to={`/${next.frontmatter?.slug || ''}`} rel="next">
                  {next.frontmatter?.title || 'next'}
                </ReadLink>
              </span>
            </li>
          )}
        </ul>
      </nav>
    </Layout>
  )
}
