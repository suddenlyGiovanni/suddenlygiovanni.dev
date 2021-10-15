import type { IPluginRefObject } from 'gatsby'
import type { PluginOptions } from 'gatsby-plugin-typegen/types'

export const makeGatsbyPluginTypegenConfig = (
  options: PluginOptions = {}
): IPluginRefObject => ({
  resolve: 'gatsby-plugin-typegen',
  options,
})
