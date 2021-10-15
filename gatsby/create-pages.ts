import type { GatsbyNode } from 'gatsby'
import { createBlogPages } from './create-blog-pages'

export const createPages: GatsbyNode['createPages'] = async (
  { actions, graphql, reporter },
  options,
  callback
) => {
  const result = await graphql(`
    fragment PostDetails on Mdx {
      fileAbsolutePath
      id
      parent {
        ... on File {
          name
          sourceInstanceName
        }
      }
      excerpt(pruneLength: 250)
      frontmatter {
        slug
        title
        author
        date
        description
        banner
        bannerCredit
        published
        unlisted
        redirects
      }
    }

    query CreatePagesData {
      blog: allMdx(
        filter: { frontmatter: { published: { eq: true } } }
        sort: { fields: [frontmatter___date], order: DESC }
      ) {
        edges {
          node {
            ...PostDetails
          }
        }
      }
    }
  `)

  if (result.errors) {
    reporter.panic('fail to retrieve CreatePageData', result.errors)
  }
  // get the blog post
  const blog = (result.data as any).blog

  // createBlogPages(blog, actions, reporter)
}
