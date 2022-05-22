import type { GatsbyConfig } from 'gatsby'

import config, { routesMap } from './config'
import * as Plugins from './gatsby/plugins'

const gatsbyPluginNetlify = Plugins.makeGatsbyPluginNetlify()

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
  background_color: config.manifestBackgroundColor,
  description: config.siteDescription,
  display: 'minimal-ui',
  icon: 'content/assets/suddenly_giovanni-icon-white.svg',
  lang: config.siteLanguage,
  name: config.siteTitle,
  short_name: config.siteTitleShort,
  start_url: config.manifestPathPrefix,
  theme_color: config.manifestThemeColor,
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

const siteMetadata: Readonly<GatsbyTypes.SiteSiteMetadata> = {
  /**
   * The site Author
   */
  author: {
    /**
     * Name of the Author
     */
    name: config.author,
    /**
     * A short summary of the Author
     */
    summary: config.minibio,
  },

  /**
   * Navigation and Site Title
   */
  title: config.siteTitle,

  /**
   * Alternative Site title for SEO
   */
  titleAlt: config.siteTitleAlt,

  /**
   * Additional Tile parts for base case
   */
  titleTemplate: config.siteTitleTemplate,

  /**
   * Domain of your site. No trailing slash!
   */
  url: config.siteUrl,

  /**
   * Description of the content of the Site
   */
  description: config.siteDescription,

  /**
   * Used for SEO and manifest, path to your image you placed in the 'static' folder
   */
  image: config.siteImage,

  /**
   * A text description of the image conveying the essential nature of an image to users who are visually impaired. Maximum 420 characters.
   */
  imageAlt: config.siteImageAlt,

  language: config.siteLanguage,

  locale: config.siteLocale,

  /**
   * The list of all static defined routes
   */
  routes: routesMap.getRoutes(),

  /**
   * A list of meaningful keywords capturing the essence of the site content
   */
  keywords: config.siteKeywords,

  social: {
    twitter: config.twitter.handle,
    github: config.github.user,
    linkedin: config.linkedin.user,
  },
} as const

const gatsbyConfig: GatsbyConfig = {
  jsxRuntime: 'automatic',
  siteMetadata,
  plugins: [
    gatsbyPluginNetlify,

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
  ],
}

export default gatsbyConfig
