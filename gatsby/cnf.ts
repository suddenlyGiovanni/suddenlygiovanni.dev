import { GatsbyPlugin } from 'gatsby-plugin-ts-config'

import { config } from '../config/website'
import { siteMetadata } from '../config/site-metadata'

// #region 'gatsby-source-filesystem'
// const gatsbySourceFilesystemBlog: GatsbySourceFilesystemConfig = {
//   resolve: 'gatsby-source-filesystem',
//   options: {
//     path: 'content/blog',
//     name: 'blog',
//   },
// }
// const gatsbySourceFilesystemAssets: GatsbySourceFilesystemConfig = {
//   resolve: 'gatsby-source-filesystem',
//   options: {
//     path: 'content/assets',
//     name: 'assets',
//   },
// }
// const gatsbySourceFilesystemResume: GatsbySourceFilesystemConfig = {
//   resolve: `gatsby-source-filesystem`,
//   options: {
//     path: 'content/resume',
//     name: 'resume',
//   },
// }
// #endregion 'gatsby-source-filesystem's

// #region  'gatsby-plugin-graphql-codegen'
type GatsbyPluginGraphqlCodegenConfig = GatsbyPlugin<
  'gatsby-plugin-graphql-codegen',
  {
    codegen: boolean
    documentPaths: string[]
    fileName: string
  }
>
const gatsbyPluginGraphqlCodegen: GatsbyPluginGraphqlCodegenConfig = {
  resolve: `gatsby-plugin-graphql-codegen`,
  options: {
    codegen: true, // TODO: disable this for production builds!!
    documentPaths: [
      './src/**/*.{ts,tsx}',
      './node_modules/gatsby-*/**/*.js',
      './.gatsby/**/*.ts',
    ],
    fileName: `typings/graphql-types.d.ts`,
  },
}
// #endregion 'gatsby-plugin-graphql-codegen's

// #region "gatsby-plugin-typography"

type GatsbyPluginTypographyConfig = GatsbyPlugin<
  'gatsby-plugin-typography',
  {
    pathToConfigModule: string
  }
>
const gatsbyPluginTypography: GatsbyPluginTypographyConfig = {
  resolve: `gatsby-plugin-typography`,
  options: {
    pathToConfigModule: `./src/lib/typography`,
  },
}
// #endregion "gatsby-plugin-typography"

// #region 'gatsby-plugin-manifest'
// type GatsbyPluginManifestConfig = GatsbyPlugin<
//   'gatsby-plugin-manifest',
//   {
//     background_color: string
//     description: string
//     display: string
//     icon?: string
//     lang: string
//     name: string
//     short_name: string
//     start_url: string
//     theme_color: string
//     icons?: {
//       src: string
//       sizes: string
//       type: string
//     }[]
//     icon_options?: {
//       // For all the options available, please see:
//       // https://developer.mozilla.org/en-US/docs/Web/Manifest
//       // https://w3c.github.io/manifest/#purpose-member
//       purpose: string
//     }
//     cache_busting_mode?: 'query' | 'none' | 'name'
//     crossOrigin?: 'use-credentials' | 'anonymous'
//   }
// >
// const gatsbyPluginManifest: GatsbyPluginManifestConfig = {
//   resolve: 'gatsby-plugin-manifest',
//   options: {
//     background_color: config.backgroundColor,
//     description: config.siteDescription,
//     display: 'minimal-ui',
//     icon: 'content/assets/suddenly_giovanni-icon-white.svg', // This path is relative to the root of the site.
//     lang: config.siteLanguage,
//     name: config.siteTitle,
//     short_name: config.siteTitleShort,
//     start_url: config.pathPrefix,
//     theme_color: config.themeColor,
//   },
// }
// #endregion 'gatsby-plugin-manifest'

// #region  'gatsby-remark-images
// type GatsbyRemarkImagesConfig = GatsbyPlugin<
//   'gatsby-remark-images',
//   {
//     maxWidth: number // 650
//     linkImagesToOriginal?: boolean // true
//     showCaptions?: boolean // false
//     markdownCaptions?: boolean // false
//     sizeByPixelDensity?: boolean // false
//     wrapperStyle?: string | ((imageInfo: unknown) => string)
//     backgroundColor?: 'white' | 'transparent' | 'none' // 'white'
//     quality?: number // 50
//     withWebp?: boolean // false
//     withAvif?: boolean // false
//     tracedSVG?: boolean // false
//     loading?: 'lazy' | 'eager' | 'auto' // 'lazy'
//     decoding?: 'async' | 'sync' | 'auto' // 'async'
//     disableBgImageOnAlpha?: boolean // false
//     disableBgImage?: boolean // false
//     srcSetBreakpoints?: number[]
//   }
// >
// const gatsbyRemarkImages: GatsbyRemarkImagesConfig = {
//   resolve: 'gatsby-remark-images',
//   options: {
//     maxWidth: 1200,
//     linkImagesToOriginal: false,
//     withWebp: true,
//     tracedSVG: true,
//   },
// }
// #endregion 'gatsby-remark-images'

// #region 'gatsby-plugin-mdx'
type GatsbyPluginMdxConfig = GatsbyPlugin<
  'gatsby-plugin-mdx',
  {
    defaultLayouts?: { default: string }
    gatsbyRemarkPlugins?: GatsbyPlugin[]
    plugins?: { resolve: string }[]
  }
>

// const gatsbyPluginMdx: GatsbyPluginMdxConfig = {
//   resolve: 'gatsby-plugin-mdx',
//   options: {
//     defaultLayouts: {
//       default: require.resolve('../src/components/layouts/layout.tsx'),
//     },
//     gatsbyRemarkPlugins: [gatsbyRemarkImages],
//     plugins: [{ resolve: 'gatsby-remark-images' }],
//   },
// }
// #endregion "gatsby-plugin-mdx"

// #region 'gatsby-plugin-sharp'
// type GatsbyPluginSharpConfig = GatsbyPlugin<'gatsby-plugin-sharp'>
// const gatsbyPluginSharp: GatsbyPluginSharpConfig = 'gatsby-plugin-sharp'
// #endregion 'gatsby-plugin-sharp'

// #region 'gatsby-transformer-sharp'
// type GatsbyTransformerSharpConfig = GatsbyPlugin<'gatsby-transformer-sharp'>
// const gatsbyTransformerSharp: GatsbyTransformerSharpConfig =
//   'gatsby-transformer-sharp'
// #endregion 'gatsby-transformer-sharp'

// #region 'gatsby-plugin-react-helmet'
// type GatsbyPluginReactHelmetConfig = GatsbyPlugin<'gatsby-plugin-react-helmet'>
// const gatsbyPluginReactHelmet: GatsbyPluginReactHelmetConfig =
//   'gatsby-plugin-react-helmet'
// #endregion 'gatsby-plugin-react-helmet'

// #region 'gatsby-plugin-emotion'
// type GatsbyPluginEmotionConfig = GatsbyPlugin<'gatsby-plugin-emotion'>
// const gatsbyPluginEmotion: GatsbyPluginEmotionConfig = 'gatsby-plugin-emotion'
// // #endregion 'gatsby-plugin-emotion

const gatsbyConfig = () => ({
  siteMetadata,
  plugins: [
    // gatsbyTransformerSharp,
    // 'gatsby-transformer-json',
    // gatsbyPluginSharp,
    // gatsbyPluginEmotion,
    // gatsbyPluginReactHelmet,
    // gatsbySourceFilesystemBlog,
    // gatsbySourceFilesystemAssets,
    // gatsbySourceFilesystemResume,
    gatsbyPluginGraphqlCodegen,
    gatsbyPluginTypography,
    // gatsbyPluginManifest,
    // gatsbyPluginMdx,
  ],
})

export default gatsbyConfig
