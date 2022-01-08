import type { IPluginRefObject } from 'gatsby'
import type { FileSystemConfig } from 'gatsby-source-filesystem'

/**
 * # Factory function to correctly configure `gatsby-source-filesystem`
 *
 * A Gatsby source plugin for sourcing data into your Gatsby application from your local filesystem.
 * The plugin creates File nodes from files.
 * The various “transformer” plugins can transform File nodes into various other types of data e.g. gatsby-transformer-json transforms JSON files into JSON data nodes and gatsby-transformer-remark transforms markdown files into MarkdownRemark nodes from which you can query an HTML representation of the markdown.
 *
 * @see https://www.gatsbyjs.com/plugins/gatsby-source-filesystem/?=gatsby-source-filesystem
 */
export const makeGatsbySourceFilesystemPluginConfig = (
  options: FileSystemConfig['options']
): IPluginRefObject =>
  ({
    resolve: 'gatsby-source-filesystem',
    options,
  } as unknown as IPluginRefObject)
