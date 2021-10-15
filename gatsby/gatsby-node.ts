import type { TSConfigFn } from 'gatsby-plugin-ts-config'
import { onCreateNode } from './on-create-node'

/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/node-apis/
 */

const gatsbyNode: TSConfigFn<'node'> = (publicOpts, props) => {
  return {
    // createPages,
    onCreateNode: onCreateNode,
  }
}

export default gatsbyNode
