import type { IPluginRefObject, IPluginRefOptions } from 'gatsby'

interface PluginOptionsSchema extends IPluginRefOptions {}

/**
 * # Factory function to correctly configure `gatsby-plugin-image`
 *
 * Adding responsive images to your site while maintaining high performance scores can be difficult to do manually.
 * The Gatsby Image plugin handles the hard parts of producing images in multiple sizes and formats for you!
 * For full documentation on all configuration options, see [the Gatsby Image Plugin reference guide](https://www.gatsbyjs.com/docs/reference/built-in-components/gatsby-plugin-image/)
 *
 * @see https://www.gatsbyjs.com/plugins/gatsby-plugin-image/?=gatsby-plugin-image
 */
export const makeGatsbyPluginImageConfig = (
  options: PluginOptionsSchema = {}
): IPluginRefObject => ({
  resolve: 'gatsby-plugin-image',
  options,
})
