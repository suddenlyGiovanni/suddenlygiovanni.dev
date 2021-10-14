import type { GatsbyConfig } from 'gatsby'

import { config } from '../config/website'
import { siteMetadata } from '../config/site-metadata'
import { makeGatsbyStyleComponentsPluginConfig } from './gatsby-plugin-styled-components'
import { makeGatsbySourceFilesystemPluginConfig } from './gatsby-source-filesystem'
import { makeGatsbyManifestPluginConfig } from './gatsby-plugin-manifest'
import { makeGatsbyTransformerJsonPluginConfig } from './gatsby-transformer-json'
import { makeGatsbySharpPluginConfig } from './gatsby-plugin-sharp'
import { makeGatsbyTransformerSharpPluginConfig } from './gatsby-transformer-sharp'
import { makeGatsbyPluginImageConfig } from './gatsby-plugin-image'

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

const gatsbyTransformerJson = makeGatsbyTransformerJsonPluginConfig()

const gatsbyPluginSharp = makeGatsbySharpPluginConfig()
const gatsbyTransformerSharp = makeGatsbyTransformerSharpPluginConfig()
const gatsbyPluginImage = makeGatsbyPluginImageConfig()

const gatsbyConfig = (): GatsbyConfig => {
  return {
    siteMetadata,
    plugins: [
      `gatsby-plugin-ts-config`,
      `gatsby-plugin-react-helmet`,
      gatsbyPluginImage,
      gatsbyTransformerSharp,
      gatsbyPluginSharp,
      gatsbyTransformerJson,
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
