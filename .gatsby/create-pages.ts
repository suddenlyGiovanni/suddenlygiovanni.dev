import type { GatsbyNode } from 'gatsby'

import { CreatePagesDataQuery } from '../typings/graphql-types'

import { createBlogPages } from './create-blog-pages'

export type CreatePages = GatsbyNode['createPages']

export const createPages: CreatePages = async ({
  actions,
  graphql,
  reporter,
}) => {
  const { data, errors } = await graphql<CreatePagesDataQuery>(`
    fragment PostDetails on Mdx {
      fileAbsolutePath
      id
      fields {
        slug
      }
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
        filter: {
          frontmatter: { published: { eq: true } }
          fileAbsolutePath: { regex: "//content/blog//" }
        }
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

  if (errors) {
    reporter.panic('fail to retrieve data', errors)
  }

  const { blog } = data

  createBlogPages(blog, actions, reporter)
}
