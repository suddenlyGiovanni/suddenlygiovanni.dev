import type { IPluginRefObject } from 'gatsby'

type GatsbyPluginStyleComponentsConfigOptions = {
  /**
   * This option enhances the attached CSS class name on each component with richer
   * output to help identify your components in the DOM without React DevTools.
   * In your page source you'll see: `<button class="Button-asdf123 asdf123" />`
   *  instead of just `<button class="asdf123" />`
   *  @default true
   */
  displayName?: boolean

  /**
   * Prefix the displayName of a component with the filename.
   * @default true
   */
  fileName?: boolean

  /**
   * Remove the whitespace from the CSS.
   * @default true
   */
  minify?: boolean

  /**
   * The namespace will ensure that your class names will be unique;
   * this setting is handy when you are working with micro frontends where class name collision can occur.
   * @default ""
   */
  namespace?: string

  /**
   * Transpile tagged template literals into optimized code.
   * @default true
   */
  transpileTemplateLiterals?: boolean

  /**
   * Top level import paths allowed to identify library
   * @default []
   */
  topLevelImportPaths?: string[]

  /**
   * By default minifiers cannot properly perform dead code elimination on
   * styled components because they are assumed to have side effects.
   * This enables "pure annotations" to tell the compiler that they do not have side effects.
   * @default false
   */
  pure?: boolean

  /**
   * Disables vendor prefixing
   * @default false
   */

  disableVendorPrefixes?: boolean

  cssProp?: boolean
}

/**
 * # Factory function to correctly configure `gatsby-plugin-styled-components`
 *
 * A Gatsby plugin for styled-components with built-in server-side rendering support.
 *
 * @see https://www.gatsbyjs.com/plugins/gatsby-plugin-styled-components/?=gatsby-plugin-styled-components
 */
export const makeGatsbyStyleComponentsPluginConfig = (
  options: GatsbyPluginStyleComponentsConfigOptions = {}
): IPluginRefObject => ({
  resolve: 'gatsby-plugin-styled-components',
  options,
})
