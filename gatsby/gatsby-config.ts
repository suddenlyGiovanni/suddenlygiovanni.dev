import type { GatsbyConfig } from 'gatsby'
import type { TSConfigFn } from 'gatsby-plugin-ts-config'
import { siteMetadata } from '../config/site-metadata'

import { config } from '../config/website'
import {
  makeGatsbyManifestPluginConfig,
  makeGatsbyPluginImageConfig,
  makeGatsbyPluginMdxConfig,
  makeGatsbyPluginReactHelmetConfig,
  makeGatsbyPluginTsConfig,
  makeGatsbyPluginTypegenConfig,
  makeGatsbyPluginTypescriptConfig,
  makeGatsbyPluginTypographyConfig,
  makeGatsbyRemarkImagesConfig,
  makeGatsbySharpPluginConfig,
  makeGatsbySourceFilesystemPluginConfig,
  makeGatsbyStyleComponentsPluginConfig,
  makeGatsbyTransformerJsonPluginConfig,
  makeGatsbyTransformerSharpPluginConfig,
} from './plugins'

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
const gatsbyPluginTypegen = makeGatsbyPluginTypegenConfig({
  language: 'typescript',
  outputPath: 'src/types/gatsby-types.ts',
  autoFix: true,
  emitSchema: {
    'src/__generated__/gatsby-schema.graphql': true,
    'src/__generated__/gatsby-introspection.json': true,
  },
  emitPluginDocuments: {
    'src/__generated__/gatsby-plugin-documents.graphql': true,
    'src/__generated__/gatsby-plugin-documents.gql': true,
    'src/__generated__/gatsby-plugin-documents.json': true,
  },
})
const gatsbyRemarkImages = makeGatsbyRemarkImagesConfig({
  maxWidth: 1200,
  linkImagesToOriginal: false,
  withWebp: true,
  tracedSVG: true,
})

const gatsbyPluginMdx = makeGatsbyPluginMdxConfig({
  defaultLayouts: {
    default: require.resolve('../src/layouts/layout.tsx'),
  },
  gatsbyRemarkPlugins: [gatsbyRemarkImages],
  plugins: [{ resolve: 'gatsby-remark-images' }],
})

const gatsbyPluginTypography = makeGatsbyPluginTypographyConfig({
  pathToConfigModule: 'src/lib/typography',
})

const gatsbyConfig: TSConfigFn<'config'> = (): GatsbyConfig => {
  return {
    siteMetadata,
    plugins: [
      // 1. Transformers
      gatsbyTransformerJson,
      gatsbyTransformerSharp,

      // 2. Plugins
      gatsbyPluginReactHelmet,
      gatsbyPluginImage,
      gatsbySourceFilesystemBlog,
      gatsbySourceFilesystemAssets,
      gatsbySourceFilesystemResume,
      gatsbyPluginStyledComponents,
      gatsbyPluginSharp,
      gatsbyPluginManifest,
      gatsbyPluginMdx,
      gatsbyPluginTypography,

      gatsbyPluginTypescript,
      gatsbyPluginTsConfig,
      gatsbyPluginTypegen,

      // this (optional) plugin enables Progressive Web App + Offline functionality
      // To learn more, visit: https://gatsby.dev/offline
      // `gatsby-plugin-offline`,

      // 3. Local plugins
    ],
  }
}

export default gatsbyConfig
