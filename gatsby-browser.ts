import type { GatsbyBrowser } from 'gatsby'

import { RootWrapper } from './src/layouts'

/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/browser-apis/
 */

export const wrapPageElement: GatsbyBrowser['wrapPageElement'] = RootWrapper
