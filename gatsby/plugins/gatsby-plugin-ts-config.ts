import type { IPluginRefObject } from 'gatsby'
import type { TsConfigPluginOptions } from 'gatsby-plugin-ts-config/dist/types/internal'

/**
 * # Factory function to correctly configure `gatsby-plugin-ts-config`
 *
 * This plugin will allow you to write your gatsby-* configuration files in Typescript.
 *
 * @see https://www.gatsbyjs.com/plugins/gatsby-plugin-ts-config/?=gatsby-plugin-ts-config
 */
export const makeGatsbyPluginTsConfig = (
  options: TsConfigPluginOptions = {}
): IPluginRefObject =>
  ({
    resolve: 'gatsby-plugin-ts-config',
    options,
  } as IPluginRefObject)
