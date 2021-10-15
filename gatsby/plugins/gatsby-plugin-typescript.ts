import type { IPluginRefObject, IPluginRefOptions } from 'gatsby'

interface PluginOptionsSchema extends IPluginRefOptions {
  /**
   * Enables jsx parsing
   * @default false
   */
  isTSX?: boolean

  /**
   * Replace the function used when compiling JSX expressions.
   * @default 'React'
   */
  jsxPragma?: string

  /**
   * Replace the function used when compiling JSX fragment expressions.
   */
  jsxPragmaFrag?: string

  /**
   * Indicates that every file should be parsed as TS or TSX.
   * WHEN `isTSX` is set to `true` THEN `allExtensions` has to be set to `true`
   * @default false
   */
  allExtensions?: boolean

  /**
   * Enables compilation of TypeScript namespaces.
   */
  allowNamespaces?: boolean

  /**
   * When enabled, type-only class fields are only removed if they are prefixed with the declare modifier.
   */
  allowDeclareFields?: boolean

  /**
   * When set to true, the transform will only remove type-only imports (introduced in TypeScript 3.8).
   * This should only be used if you are using TypeScript >= 3.8.
   */
  onlyRemoveTypeImports?: boolean
}

export const makeGatsbyPluginTypescriptConfig = (
  options: PluginOptionsSchema = {}
): IPluginRefObject => ({
  resolve: 'gatsby-plugin-typescript',
  options,
})
