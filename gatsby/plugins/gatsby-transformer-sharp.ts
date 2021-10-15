import type { IPluginRefObject, IPluginRefOptions } from 'gatsby'

interface PluginOptionsSchema extends IPluginRefOptions {
  checkSupportedExtensions?: boolean
}

export const makeGatsbyTransformerSharpPluginConfig = (
  options: PluginOptionsSchema = {}
): IPluginRefObject => ({
  resolve: 'gatsby-transformer-sharp',
  options,
})
