import { ITSConfigFn } from 'gatsby-plugin-ts-config'

import { onCreateNode } from './on-create-node'
import { createPages } from './create-pages'

/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */
const gatsbyNode: ITSConfigFn<'node'> = () => ({
  createPages,
  onCreateNode,
})
export default gatsbyNode
