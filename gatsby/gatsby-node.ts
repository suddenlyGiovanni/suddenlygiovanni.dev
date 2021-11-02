import type { TSConfigFn } from 'gatsby-plugin-ts-config'
import { onCreateNode, createPages } from './node-lifecycle'

/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/node-apis/
 */

const gatsbyNode: TSConfigFn<'node'> = (..._) => {
  return { createPages, onCreateNode }
}

export default gatsbyNode
