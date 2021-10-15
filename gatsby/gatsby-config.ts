import type { GatsbyConfig } from 'gatsby'

import { config } from '../config/website'
import { siteMetadata } from '../config/site-metadata'
import { makeGatsbyStyleComponentsPluginConfig } from './gatsby-plugin-styled-components'
import { makeGatsbyPluginTypescriptConfig } from './gatsby-plugin-typescript'
import { makeGatsbyPluginTypographyConfig } from './gatsby-plugin-typography'
import { makeGatsbySourceFilesystemPluginConfig } from './gatsby-source-filesystem'
import { makeGatsbyManifestPluginConfig } from './gatsby-plugin-manifest'
import { makeGatsbyTransformerJsonPluginConfig } from './gatsby-transformer-json'
import { makeGatsbySharpPluginConfig } from './gatsby-plugin-sharp'
import { makeGatsbyTransformerSharpPluginConfig } from './gatsby-transformer-sharp'
import { makeGatsbyPluginImageConfig } from './gatsby-plugin-image'
import { makeGatsbyPluginReactHelmetConfig } from './gatsby-plugin-react-helmet'
import { makeGatsbyPluginTsConfig } from './gatsby-plugin-ts-config'
import { makeGatsbyPluginMdxConfig } from './gatsby-plugin-mdx'
import { makeGatsbyRemarkImagesConfig } from './gatsby-remark-images'

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
const gatsbyPluginReactHelmet = makeGatsbyPluginReactHelmetConfig()
const gatsbyPluginTypescript = makeGatsbyPluginTypescriptConfig()
const gatsbyPluginTsConfig = makeGatsbyPluginTsConfig()
const gatsbyRemarkImages = makeGatsbyRemarkImagesConfig({
  maxWidth: 1200,
  linkImagesToOriginal: false,
  withWebp: true,
  tracedSVG: true,
})

const gatsbyPluginMdx = makeGatsbyPluginMdxConfig({
  // defaultLayouts: { default: require.resolve('../src/components/layouts/layout.tsx')},
  gatsbyRemarkPlugins: [gatsbyRemarkImages],
  plugins: [{ resolve: 'gatsby-remark-images' }],
})

const gatsbyPluginTypography = makeGatsbyPluginTypographyConfig({
  // pathToConfigModule: 'src/utils/typography',
})

const gatsbyConfig = (): GatsbyConfig => {
  return {
    siteMetadata,
    plugins: [
      'gatsby-plugin-graphql-config',
      gatsbyPluginTypescript,
      gatsbyPluginTsConfig,
      gatsbyPluginReactHelmet,
      gatsbyPluginMdx,
      gatsbyPluginImage,
      gatsbyTransformerSharp,
      gatsbyPluginSharp,
      gatsbyTransformerJson,
      gatsbyPluginStyledComponents,
      gatsbySourceFilesystemBlog,
      gatsbySourceFilesystemAssets,
      gatsbySourceFilesystemResume,
      gatsbyPluginManifest,
      gatsbyPluginTypography,

      // this (optional) plugin enables Progressive Web App + Offline functionality
      // To learn more, visit: https://gatsby.dev/offline
      // `gatsby-plugin-offline`,
    ],
  }
}

export default gatsbyConfig
