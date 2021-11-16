import type { GatsbySSR } from 'gatsby'

import { RootWrapper } from './src/layouts'

/**
 * Implement Gatsby's SSR (Server Side Rendering) APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/ssr-apis/
 */

// You can delete this file if you're not using it
export const wrapPageElement: GatsbySSR['wrapPageElement'] = RootWrapper
