import type {
  IPluginRefObject,
  IPluginRefOptions,
  Node,
  PluginRef,
} from 'gatsby'

type AnyFunction = (...args: any[]) => unknown

interface PluginOptionsSchema extends IPluginRefOptions {
  /**
   * Configure the file extensions that gatsby-plugin-mdx will process
   * @default [".mdx"]
   */
  extensions?: string[]

  /**
   * Set the layout components for MDX source types
   * @default {}
   */
  defaultLayouts?: Record<string | 'default', string>

  /**
   * Use Gatsby-specific remark plugins
   * @default []
   */
  gatsbyRemarkPlugins?: Array<PluginRef>

  /**
   * Enable fast parsing mode? This may break certain implied transformation dependencies. Disable if you have problems
   * @default false
   */
  lessBabel?: boolean

  /**
   * Specify remark plugins
   * To pass options, use a 2-element array with the
   * configuration in an object in the second element
   * @default []
   */
  remarkPlugins?: Array<AnyFunction | {} | [AnyFunction, {}]>

  /**
   * Specify rehype plugins
   * To pass options, use a 2-element array with the
   * configuration in an object in the second element
   * @default []
   */
  rehypePlugins?: Array<AnyFunction | {} | [AnyFunction, {}]>

  plugins?: Array<PluginRef>

  /**
   * Determine which media types are processed by MDX
   * @default ["text/markdown", "text/x-markdown"]
   */
  mediaTypes?: string[]

  /**
   * Disable MDX transformation for nodes where this function returns true
   * @default (node: Node) => false
   */
  shouldBlockNodeFromTransformation?: (node: Node) => boolean

  /**
   * This is a legacy option that used to define root directory of the project.
   * It was needed to generate a cache directory location.
   * It currently has no effect.
   * @default process.cwd()
   * @deprecated
   */
  root?: string

  /**
   * Use CommonMark
   * @default false
   */
  commonmark?: boolean
}

/**
 * # Factory function to correctly configure `gatsby-plugin-mdx`
 *
 * This is the official integration for using MDX with Gatsby.
 *
 * ## What’s MDX?
 * MDX is markdown for the component era. It lets you write JSX embedded inside markdown. It’s a great combination because it allows you to use markdown’s often terse syntax (such as # heading) for the little things and JSX for more advanced components.
 *
 * ## Why MDX?
 * Before MDX, some of the benefits of writing Markdown were lost when integrating with JSX. Implementations were often template string-based which required lots of escaping and cumbersome syntax.
 * MDX seeks to make writing with Markdown and JSX simpler while being more expressive. Writing is fun again when you combine components, that can even be dynamic or load data, with the simplicity of Markdown for long-form content.
 *
 * @see https://www.gatsbyjs.com/plugins/gatsby-plugin-mdx/?=gatsby-plugin-mdx
 */
export const makeGatsbyPluginMdxConfig = (
  options: PluginOptionsSchema = {}
): IPluginRefObject => ({
  resolve: 'gatsby-plugin-mdx',
  options,
})
