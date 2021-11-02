import { graphql, PageProps } from 'gatsby'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import * as React from 'react'
import styled from 'styled-components'

import { ReadLink, SEO } from '../components'
import { Layout } from '../layouts'
import { linksMap } from '../lib/links-map'

/**
 * this graphql query will be called by gatsby-node at build time and its
 * content will be injected in the PageProps at the data label.
 * remember to export it!
 */
export const postByIdQuery = graphql`
  query PostById($id: String!) {
    post: mdx(id: { eq: $id }) {
      fields {
        id
        published
        title
        author
        description
        slug
        date(formatString: "YYYY-MM-DD")
        categories
        #        keywords
        redirects
        editLink
        historyLink
      }
      frontmatter {
        unlisted
      }
      body
    }
  }
`

const PostedBy = styled.p`
  font-size: 0.75rem;
`

const UlStyled = styled.ul`
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
`

const PreviousPost = styled.span`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`

const NextPost = styled.span`
  display: flex;
  flex-direction: column;
`

// this page context comes from the injected context of Gatsby's createPage
interface PageContextType {
  id: string
  slug: string
  previous: GatsbyTypes.BlogPostDetailsFragment
  next: GatsbyTypes.BlogPostDetailsFragment
}

type Props = PageProps<GatsbyTypes.PostByIdQuery, PageContextType>
const PostTemplate: React.VFC<Props> = ({ data, pageContext }) => {
  const { post } = data
  const { previous, next } = pageContext
  if (!post) {
    return null
  }
  const title = post.fields?.title || ''
  const author = post.fields?.author || ''
  const body = post?.body || ''

  return (
    <Layout customSEO>
      <SEO
        titleTemplate={title}
        description={post.fields?.description || 'nothing'}
        datePublished={new Date(post.fields?.date!).toISOString()}
        dateModified={new Date(Date.now()).toISOString()}
        article
      />
      <h1>{title}</h1>
      <PostedBy>
        posted by {author} {post.fields?.date}
      </PostedBy>
      <MDXRenderer>{body}</MDXRenderer>

      <nav>
        <UlStyled>
          {previous && (
            <li>
              <PreviousPost>
                &larr; previous post
                <ReadLink
                  to={`/${previous.frontmatter?.slug || ''}`}
                  rel="prev"
                >
                  {previous.frontmatter?.title || 'previous'}
                </ReadLink>
              </PreviousPost>
            </li>
          )}
          <li>
            <ReadLink to={linksMap.get('blog')!.urlPathFragment}>
              back to all posts
            </ReadLink>
          </li>
          {next && (
            <li>
              <NextPost>
                next post &rarr;
                <ReadLink
                  to={`${linksMap.get('blog')!.urlPathFragment}/${
                    next.frontmatter?.slug || ''
                  }`}
                  rel="next"
                >
                  {next.frontmatter?.title || 'next'}
                </ReadLink>
              </NextPost>
            </li>
          )}
        </UlStyled>
      </nav>
    </Layout>
  )
}

export default PostTemplate
