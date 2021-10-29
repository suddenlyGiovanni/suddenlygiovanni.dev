import type { IPluginRefObject } from 'gatsby'
import type { PluginOptions } from 'gatsby-plugin-typegen/types'

/**
 * # Factory function to correctly configure `gatsby-plugin-typegen`
 *
 * Watch your queries and automatically generates TypeScript/Flow definitions out-of-box.
 * Features:
 * - Schema extraction
 * - Plugin documents extraction
 * - Generates type definitions using graphql-codegen
 * - Auto-fixing <StaticQuery> and useStaticQuery() in code with generated type name.
 * - Integrates GatsbyJS project with GraphQL & TypeScript ecosystem.
 * - Provides type definitions for the schema customization.
 * - Provides utility types for gatsby-node.js.
 *
 * @see https://www.gatsbyjs.com/plugins/gatsby-plugin-typegen/?=gatsby-plugin-typegen
 */
export const makeGatsbyPluginTypegenConfig = (
  options: PluginOptions = {}
): IPluginRefObject => ({
  resolve: 'gatsby-plugin-typegen',
  options,
})
