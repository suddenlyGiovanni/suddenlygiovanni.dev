import type { FileSystemConfig } from 'gatsby-source-filesystem'
import type { IPluginRefObject } from 'gatsby'

export const makeGatsbySourceFilesystemPluginConfig = (
  options: FileSystemConfig['options']
): IPluginRefObject =>
  ({
    resolve: 'gatsby-source-filesystem',
    options,
  } as unknown as IPluginRefObject)
