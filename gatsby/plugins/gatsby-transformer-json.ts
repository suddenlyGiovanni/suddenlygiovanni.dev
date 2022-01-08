import type { IPluginRefObject, IPluginRefOptions } from 'gatsby'

interface GatsbyTransformerJsonOptions extends IPluginRefOptions {
  typeName?:
    | string
    | ((args: {
        /**
         * graphql node
         */
        node: {}

        /**
         * a single object (either an item from an array or the whole json content)
         */
        object: {}

        /**
         * true if object is part of an array
         */
        isArray: boolean
      }) => unknown)
}

/**
 * # Factory function to correctly configure `gatsby-transformer-json`
 *
 * Parses raw JSON strings into JavaScript objects e.g. from JSON files.
 * Supports arrays of objects and single objects.
 *
 * @see https://www.gatsbyjs.com/plugins/gatsby-transformer-json/?=gatsby-transformer-json
 */
export const makeGatsbyTransformerJsonPluginConfig = (
  options: GatsbyTransformerJsonOptions = {}
): IPluginRefObject => ({
  resolve: 'gatsby-transformer-json',
  options,
})
