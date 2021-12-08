import type { PluginOptions } from 'gatsby-plugin-tsconfig-paths/dist/types'
import type { IPluginRefObject, IPluginRefOptions } from 'gatsby'

export const makeGatsbyPluginTsconfigPaths = (
  options?: PluginOptions
): IPluginRefObject => ({
  resolve: 'gatsby-plugin-tsconfig-paths',
  ...(options ? { options: options as unknown as IPluginRefOptions } : {}),
})
