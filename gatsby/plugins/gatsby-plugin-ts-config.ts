import type { IPluginRefObject } from 'gatsby'
import type { TsConfigPluginOptions } from 'gatsby-plugin-ts-config/dist/types/internal'

export const makeGatsbyPluginTsConfig = (
  options: TsConfigPluginOptions = {}
): IPluginRefObject =>
  ({
    resolve: 'gatsby-plugin-ts-config',
    options,
  } as IPluginRefObject)
