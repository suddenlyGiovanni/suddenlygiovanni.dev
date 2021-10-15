import type { TSConfigFn } from 'gatsby-plugin-ts-config'

/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/node-apis/
 */

// You can delete this file if you're not using it

const gatsbyNode: TSConfigFn<'node'> = (publicOpts, props) => {
  return {
    // createPages,
  }
}

export default gatsbyNode
