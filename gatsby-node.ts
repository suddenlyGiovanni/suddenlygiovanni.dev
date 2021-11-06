import { withMetaNode } from 'gatsby-ts'

import { createPages, onCreateNode } from './gatsby/node-lifecycle'

/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/node-apis/
 */

export default withMetaNode((..._) => {
  return { createPages, onCreateNode }
})
