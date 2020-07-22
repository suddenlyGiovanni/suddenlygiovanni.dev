import { css } from '@emotion/core'
import { PageProps, graphql } from 'gatsby'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import React, { FC } from 'react'

import { GetPostDataQuery } from '../../typings/graphql-types'
import { Layout, ReadLink } from '../components'

// this graphql query will be called by gatsby-node at build time and its content will be injected
// in the PageProps at the data label
// remember to export it!
export const query = graphql`
  query GetPostData($slug: String!) {
    mdx(frontmatter: { slug: { eq: $slug } }) {
      frontmatter {
        title
        slug
        author
      }
      body
    }
  }
`

type PageContextType = {
  slug: string
}

type DataType = GetPostDataQuery // TODO: add the correct datatype
type Props = PageProps<DataType, PageContextType>

const PostTemplate: FC<Props> = ({ data: { mdx: post } }) => {
  return (
    <Layout>
      {!post ? (
        <>
          <h1>No post found!</h1>
        </>
      ) : (
        <>
          <h1>{post?.frontmatter?.title}</h1>
          <p
            css={css`
              font-size: 0.75rem;
            `}
          >
            posted by {post?.frontmatter?.author}
          </p>
          <MDXRenderer>{post.body}</MDXRenderer>
        </>
      )}
      <ReadLink to="/">&larr; back to all posts</ReadLink>
    </Layout>
  )
}

export default PostTemplate
