import type { IPluginRefObject, IPluginRefOptions } from 'gatsby'

interface PluginOptionsSchema extends IPluginRefOptions {
  /**
   * The headers object represents a JS version of the Netlify _headers file format.
   * You should pass in an object with string keys (representing the paths) and an array of strings for each header.
   * headers is a specific type used by Netlify: https://www.gatsbyjs.com/plugins/gatsby-plugin-netlify/#headers
   * Add more Netlify headers to specific pages
   * @example
   * ```json
   * {
   *   headers: {
   *     "/*": [
   *       "Basic-Auth: someuser:somepassword anotheruser:anotherpassword",
   *     ],
   *     "/my-page": [
   *       // matching headers (by type) are replaced by Netlify with more specific routes
   *       "Basic-Auth: differentuser:differentpassword",
   *     ],
   *   }
   * }
   * ```
   */

  headers?: Record<string, string[]>

  /**
   * Add more headers to all the pages
   */
  allPageHeaders?: string[]

  /**
   * When set to false, turns off the default security headers
   */
  mergeSecurityHeaders?: boolean

  /**
   * When set to false, turns off the default gatsby js headers
   */
  mergeLinkHeaders?: boolean

  /**
   * When set to false, turns off the default caching headers
   */
  mergeCachingHeaders?: boolean

  /**
   * Transform function for manipulating headers under each path (e.g.sorting), etc.
   * This should return an object of type: { key: Array<string> }
   */
  transformHeaders?: (value: string, key: string) => readonly string[]

  /**
   * When set to false, turns off automatic creation of redirect rules for client only paths
   */
  generateMatchPathRewrites?: boolean
}

/**
 * # Factory function to correctly configure `gatsby-plugin-netlify`
 * @see https://www.gatsbyjs.com/plugins/gatsby-plugin-image/?=gatsby-plugin-image
 */
export const makeGatsbyPluginNetlify = (
  options: PluginOptionsSchema = {}
): IPluginRefObject => ({
  resolve: 'gatsby-plugin-netlify',
  options,
})
