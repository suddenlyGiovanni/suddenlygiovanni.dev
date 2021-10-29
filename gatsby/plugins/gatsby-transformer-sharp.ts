import type { IPluginRefObject, IPluginRefOptions } from 'gatsby'

interface PluginOptionsSchema extends IPluginRefOptions {
  checkSupportedExtensions?: boolean
}

/**
 * # Factory function to correctly configure `gatsby-transformer-sharp`
 *
 * Creates ImageSharp nodes from image types that are supported by the
 * `Sharp image processing library` and provides fields in their GraphQL types
 * for processing your images in a variety of ways including resizing, cropping,
 * and creating responsive images.
 *
 * @see https://www.gatsbyjs.com/plugins/gatsby-transformer-sharp/?=gatsby-transformer-sharp
 */
export const makeGatsbyTransformerSharpPluginConfig = (
  options: PluginOptionsSchema = {}
): IPluginRefObject => ({
  resolve: 'gatsby-transformer-sharp',
  options,
})
