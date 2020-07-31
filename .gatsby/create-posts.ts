import type { Actions } from 'gatsby'
import { CreatePagesDataQuery } from '../typings/graphql-types'

type CreatePage = Actions['createPage']
type CreateRedirect = Actions['createRedirect']

type Edges = CreatePagesDataQuery['blog']['edges']

export function createPosts(
  createPage: CreatePage,
  createRedirect: CreateRedirect,
  edges: Edges
): void {
  const blogPostTemplate = require.resolve(`../src/templates/post-template.tsx`)
  // Attention we are iterating forward on list that has been sorted DESC by date
  edges.forEach(({ node }, i) => {
    // the first element is going to be the latest one
    // the last element is going to be the oldest one
    const previous =
      i === edges.length - 1
        ? null //
        : edges[i + 1].node // previous node

    const next =
      i === 0
        ? null //
        : edges[i - 1].node // next node

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
      component: blogPostTemplate,
      context: {
        id: node.id,
        slug: node.fields.slug,
        previous,
        next,
      },
    })
  })
}
