import { withMetaConfig } from 'gatsby-ts'

import { config, siteMetadata } from './config'
import * as Plugins from './gatsby/plugins'

const gatsbySourceFilesystemBlog =
  Plugins.makeGatsbySourceFilesystemPluginConfig({
    path: 'content/blog',
    name: 'blog',
  })
const gatsbySourceFilesystemAssets =
  Plugins.makeGatsbySourceFilesystemPluginConfig({
    path: 'content/assets',
    name: 'assets',
  })
const gatsbySourceFilesystemResume =
  Plugins.makeGatsbySourceFilesystemPluginConfig({
    path: 'content/resume',
    name: 'resume',
  })

const gatsbyPluginManifest = Plugins.makeGatsbyManifestPluginConfig({
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

const gatsbyPluginStyledComponents =
  Plugins.makeGatsbyStyleComponentsPluginConfig({
    fileName: true,
    displayName: true,
    disableVendorPrefixes: true,
    minify: false,
    transpileTemplateLiterals: false,
  })

const gatsbyTransformerJson = Plugins.makeGatsbyTransformerJsonPluginConfig()
const gatsbyPluginSharp = Plugins.makeGatsbySharpPluginConfig()
const gatsbyTransformerSharp = Plugins.makeGatsbyTransformerSharpPluginConfig()
const gatsbyPluginImage = Plugins.makeGatsbyPluginImageConfig()
const gatsbyPluginReactHelmet = Plugins.makeGatsbyPluginReactHelmetConfig()
const gatsbyPluginTypescript = Plugins.makeGatsbyPluginTypescriptConfig()
const gatsbyPluginTypegen = Plugins.makeGatsbyPluginTypegenConfig({
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
const gatsbyRemarkImages = Plugins.makeGatsbyRemarkImagesConfig({
  maxWidth: 1200,
  linkImagesToOriginal: false,
  withWebp: true,
  tracedSVG: true,
})

const gatsbyPluginMdx = Plugins.makeGatsbyPluginMdxConfig({
  // defaultLayouts: {
  //   default: require.resolve('./src/layouts/layout.tsx'),
  // },
  gatsbyRemarkPlugins: [gatsbyRemarkImages],
  plugins: [{ resolve: 'gatsby-remark-images' }],
})

const gatsbyPluginTypography = Plugins.makeGatsbyPluginTypographyConfig({
  pathToConfigModule: 'src/lib/typography',
})

export default withMetaConfig(({ loadPlugins }) => {
  const plugins = loadPlugins([
    // 1. Transformers
    gatsbyTransformerJson,
    gatsbyTransformerSharp,

    // 2. Plugins
    gatsbyPluginStyledComponents,
    gatsbyPluginReactHelmet,
    gatsbyPluginImage,
    gatsbySourceFilesystemBlog,
    gatsbySourceFilesystemAssets,
    gatsbySourceFilesystemResume,
    gatsbyPluginSharp,
    gatsbyPluginManifest,
    gatsbyPluginMdx,
    gatsbyPluginTypography,

    gatsbyPluginTypescript,
    gatsbyPluginTypegen,

    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,

    // 3. Local plugins
  ])

  return {
    jsxRuntime: 'automatic',
    siteMetadata,
    plugins,
  }
})
