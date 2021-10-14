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

export const makeGatsbyTransformerJsonPluginConfig = (
  options: GatsbyTransformerJsonOptions = {}
): IPluginRefObject => ({
  resolve: 'gatsby-transformer-json',
  options,
})
