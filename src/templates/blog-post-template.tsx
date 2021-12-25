import { ReadLink, SEO } from '@components/index'
import config, { routesMap } from '@config/index'
import { useSiteMetadata } from '@hooks/use-sitemetadata'

import {
  makeOpenGraphArticle,
  Types,
} from '@suddenlygiovanni/open-graph-protocol'

import { graphql, PageProps } from 'gatsby'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import * as React from 'react'
import styled from 'styled-components'

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
  const siteMetadata = useSiteMetadata()
  const { post } = data
  const { previous, next } = pageContext
  if (!post) {
    return null
  }
  const title = post.fields?.title || ''
  const author = post.fields?.author || ''
  const body = post?.body || ''
  const description = post?.fields?.description || 'nothing'
  const datePublished = new Date(
    post.fields?.date!
  ).toISOString() as Types.DateTime
  const slug = post?.fields?.slug || ''

  return (
    <>
      <SEO
        titleTemplate={title}
        meta={makeOpenGraphArticle({
          ogType: Types.Enum('article'),
          ogTitle: Types.String(title),
          ogUrl: Types.URL(
            siteMetadata.url + routesMap.getRoute('blog').url + '/' + slug
          ), // FIXME: the url of the article,
          ogImage: Types.URL(siteMetadata.url + siteMetadata.image), // FIXME: article url or OpenGraphImage
          ogDescription: Types.String(description),
          ogDeterminer: Types.Enum('auto'),
          ogLocale: Types.String(config.siteUrl),
          ogSiteName: Types.String(siteMetadata.url),
          ogArticlePublishedTime: Types.DateTime(datePublished),
          // ogArticleAuthor: Types.URL('') // FIXME: og... the api for this field should enable to provide a profile obj.
          // ogArticleSection
          // ogArticleTag
        })}
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
            <ReadLink to={routesMap.getRoute('blog').url}>
              back to all posts
            </ReadLink>
          </li>
          {next && (
            <li>
              <NextPost>
                next post &rarr;
                <ReadLink
                  to={`${routesMap.getRoute('blog').url}/${
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
    </>
  )
}

export default PostTemplate
