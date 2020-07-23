/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

import { SourceNodesArgs } from 'gatsby'
import { ITSConfigFn } from 'gatsby-plugin-ts-config'
import { GetPostsSlugQuery } from '../typings/graphql-types'

const gatsbyNode: ITSConfigFn<'node'> = () => ({
  createPages: async ({ actions, graphql, reporter }) => {
    const result = await graphql<GetPostsSlugQuery>(`
      query GetPostsSlug {
        allMdx {
          nodes {
            frontmatter {
              slug
            }
          }
        }
      }
    `)

    if (result.errors) {
      reporter.panic('fail to create posts', result.errors)
    }

    const posts = result.data?.allMdx?.nodes

    posts.forEach((post) => {
      actions.createPage({
        path: post.frontmatter.slug,
        component: require.resolve('../src/templates/post.tsx'),
        context: {
          slug: post.frontmatter.slug,
        },
      })
    })
  },
})


export default gatsbyNode
