/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

import { Actions, Reporter, GatsbyNode } from 'gatsby'
import { ITSConfigFn } from 'gatsby-plugin-ts-config'
import { CreatePagesDataQuery } from '../typings/graphql-types'

type CreatePages = Pick<GatsbyNode, 'createPages'>['createPages']
type CreatePage = Pick<Actions, 'createPage'>['createPage']
type CreateRedirect = Pick<Actions, 'createRedirect'>['createRedirect']

function createPosts(
  createPage: CreatePage,
  createRedirect: CreateRedirect,
  edges: Data['edges']
): void {
  edges.forEach(({ node }, i) => {
    const prev = i === 0 ? null : edges[i - 1].node
    const next = i === edges.length - 1 ? null : edges[i + 1].node
    const pagePath = node.frontmatter.slug

    if (node.frontmatter.redirects) {
      node.frontmatter.redirects.forEach((fromPath) => {
        createRedirect({
          fromPath: fromPath,
          toPath: pagePath,
          redirectInBrowser: true,
          isPermanent: true,
        })
      })
    }

    createPage({
      path: pagePath,
      component: require.resolve(`../src/templates/post.tsx`),
      context: {
        id: node.id,
        prev,
        next,
      },
    })
  })
}

type Data = Pick<CreatePagesDataQuery, 'blog'>['blog']
function createBlogPages(
  data: Data,
  actions: Actions,
  reporter: Reporter
): void {
  if (data.edges.length <= 0) {
    reporter.error('There are no posts!')
  } else {
    const { edges } = data
    const { createPage, createRedirect } = actions
    createPosts(createPage, createRedirect, edges)
  }
}

const createPages: CreatePages = async ({ actions, graphql, reporter }) => {
  const { data, errors } = await graphql<CreatePagesDataQuery>(`
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
          frontmatter: { published: { ne: false } }
          fileAbsolutePath: { regex: "//content/blog//" }
        }
        sort: { fields: frontmatter___date, order: DESC }
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

const gatsbyNode: ITSConfigFn<'node'> = () => ({ createPages })
export default gatsbyNode
