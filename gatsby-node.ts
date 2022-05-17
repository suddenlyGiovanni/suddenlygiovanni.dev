import type { GatsbyNode } from 'gatsby'
import * as NodeLifecycle from './gatsby/node-lifecycle'

/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/node-apis/
 */

export const createSchemaCustomization: GatsbyNode['createSchemaCustomization'] =
  NodeLifecycle.createSchemaCustomization
export const createPages: GatsbyNode['createPages'] = NodeLifecycle.createPages
export const onCreateNode: GatsbyNode['onCreateNode'] =
  NodeLifecycle.onCreateNode
