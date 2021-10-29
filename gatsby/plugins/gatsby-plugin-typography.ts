import type { IPluginRefObject, IPluginRefOptions } from 'gatsby'

interface PluginOptionsSchema extends IPluginRefOptions {
  pathToConfigModule?: string
}

/**
 * # Factory function to correctly configure `gatsby-plugin-typography`
 *
 * A Gatsby plugin for utilizing the Typography library with minimal configuration.
 * See it in action in the [Tutorial (source)](https://github.com/gatsbyjs/gatsby/tree/master/packages/gatsby-plugin-typography)
 *
 * @see https://www.gatsbyjs.com/plugins/gatsby-plugin-typography/?=gatsby-plugin-typography
 */
export const makeGatsbyPluginTypographyConfig = (
  options: PluginOptionsSchema = {}
): IPluginRefObject => ({
  resolve: 'gatsby-plugin-typography',
  options,
})
