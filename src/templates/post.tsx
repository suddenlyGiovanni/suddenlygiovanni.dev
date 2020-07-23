/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { css } from '@emotion/core'
import { PageProps, graphql } from 'gatsby'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import React, { FC } from 'react'

import { PostDetailsFragment, PostQuery } from '../../typings/graphql-types'
import { Layout, ReadLink } from '../components'

// this graphql query will be called by gatsby-node at build time and its content will be injected
// in the PageProps at the data label
// remember to export it!
export const postQuery = graphql`
  query Post($id: String!) {
    post: mdx(id: { eq: $id }) {
      frontmatter {
        title
        author
        slug
      }
      body
    }
  }
`

// this page context comes from the injected context of Gatsby's createPage
type PageContextType = {
  id: string
  prev: Nullable<PostDetailsFragment>
  next: Nullable<PostDetailsFragment>
}

type Props = PageProps<PostQuery, PageContextType>

const PostTemplate: FC<Props> = ({ data: { post } }) => {
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
        posted by {author}
      </p>
      <MDXRenderer>{body}</MDXRenderer>

      <ReadLink to="/">&larr; back to all posts</ReadLink>
    </Layout>
  )
}

export default PostTemplate
