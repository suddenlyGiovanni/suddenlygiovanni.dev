import type { IPluginRefObject, IPluginRefOptions } from 'gatsby'

export const makeGatsbyPluginReactHelmetConfig = (
  options: IPluginRefOptions = {}
): IPluginRefObject => ({
  resolve: 'gatsby-plugin-react-helmet',
  options,
})
