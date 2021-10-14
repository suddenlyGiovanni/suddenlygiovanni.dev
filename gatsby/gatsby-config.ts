import type { GatsbyConfig } from 'gatsby'

import { makeGatsbyStyleComponentsPluginConfig } from './gatsby-plugin-styled-components'
import { config } from '../config/website'
import { makeGatsbySourceFilesystemPluginConfig } from './gatsby-source-filesystem'
import { makeGatsbyManifestPluginConfig } from './gatsby-plugin-manifest'

// #region 'gatsby-source-filesystem'
const gatsbySourceFilesystemBlog = makeGatsbySourceFilesystemPluginConfig({
  path: 'content/blog',
  name: 'blog',
})
const gatsbySourceFilesystemAssets = makeGatsbySourceFilesystemPluginConfig({
  path: 'content/assets',
  name: 'assets',
})
const gatsbySourceFilesystemResume = makeGatsbySourceFilesystemPluginConfig({
  path: 'content/resume',
  name: 'resume',
})
// #endregion 'gatsby-source-filesystem's

const gatsbyPluginManifest = makeGatsbyManifestPluginConfig({
  background_color: config.backgroundColor,
  description: config.siteDescription,
  display: 'minimal-ui',
  icon: 'content/assets/suddenly_giovanni-icon-white.svg',
  lang: config.siteLanguage,
  name: config.siteTitle,
  short_name: config.siteTitleShort,
  start_url: config.pathPrefix,
  theme_color: config.themeColor,
})

const gatsbyPluginStyledComponents = makeGatsbyStyleComponentsPluginConfig()

const gatsbyConfig = (): GatsbyConfig => {
  return {
    siteMetadata: {
      title: ``,
      description: ``,
      author: ``,
      siteUrl: `https://gatsbystarterdefaultsource.gatsbyjs.io/`,
    },
    plugins: [
      `gatsby-plugin-ts-config`,
      `gatsby-plugin-react-helmet`,
      `gatsby-plugin-image`,
      `gatsby-transformer-sharp`,
      `gatsby-plugin-sharp`,
      gatsbyPluginStyledComponents,
      gatsbySourceFilesystemBlog,
      gatsbySourceFilesystemAssets,
      gatsbySourceFilesystemResume,
      gatsbyPluginManifest,

      // this (optional) plugin enables Progressive Web App + Offline functionality
      // To learn more, visit: https://gatsby.dev/offline
      // `gatsby-plugin-offline`,
    ],
  }
}

export default gatsbyConfig
