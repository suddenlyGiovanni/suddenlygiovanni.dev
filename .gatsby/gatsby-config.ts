import { ITSConfigFn, IMergePluginOptions } from 'gatsby-plugin-ts-config'
import config from '../config/website'
import { FileSystemConfig } from 'gatsby-source-filesystem'

// 'gatsby-source-filesystem'
type GatsbySourceFilesystemConfig = IMergePluginOptions<
  'gatsby-source-filesystem',
  FileSystemConfig
>
// 'gatsby-plugin-mdx'
type GatsbyPluginMdxConfig = IMergePluginOptions<
  'gatsby-plugin-mdx',
  { defaultLayouts?: { default: string } }
>

// 'gatsby-plugin-manifest'
type GatsbyPluginManifestConfig = IMergePluginOptions<
  'gatsby-plugin-manifest',
  {
    name: string
    short_name: string
    start_url: string
    background_color: string
    theme_color: string
    display: string
    icon?: string
    icons?: {
      src: string
      sizes: string
      type: string
    }[]
    icon_options?: {
      // For all the options available, please see:
      // https://developer.mozilla.org/en-US/docs/Web/Manifest
      // https://w3c.github.io/manifest/#purpose-member
      purpose: string
    }
    cache_busting_mode: 'query' | 'none' | 'name'
    crossOrigin?: 'use-credentials' | 'anonymous'
  }
>

// 'gatsby-plugin-sharp'
type GatsbyPluginSharpConfig = IMergePluginOptions<'gatsby-plugin-sharp'>

// 'gatsby-transformer-sharp'
type GatsbyTransformerSharpConfig = IMergePluginOptions<
  'gatsby-transformer-sharp'
>

// 'gatsby-plugin-react-helmet'
type GatsbyPluginReactHelmetConfig = IMergePluginOptions<
  'gatsby-plugin-react-helmet'
>

// 'gatsby-plugin-emotion'
type GatsbyPluginEmotionConfig = IMergePluginOptions<'gatsby-plugin-emotion'>

// 'gatsby-plugin-graphql-codegen'
type GatsbyPluginGraphqlCodegenConfig = IMergePluginOptions<
  'gatsby-plugin-graphql-codegen',
  {
    documentPaths: string[]
    fileName: string
  }
>

type GatsbyConfig = ITSConfigFn<
  'config',
  | GatsbySourceFilesystemConfig
  | GatsbyPluginMdxConfig
  | GatsbyPluginManifestConfig
  | GatsbyPluginSharpConfig
  | GatsbyTransformerSharpConfig
  | GatsbyPluginReactHelmetConfig
  | GatsbyPluginEmotionConfig
  | GatsbyPluginGraphqlCodegenConfig
>

const siteMetadata = {
  author: config.author,
  description: config.siteDescription,
  miniBio: config.minibio,
  title: config.siteTitle,
  twitter: config.twitter,
  twitterHandle: config.twitterHandle,
} as const

const gatsbyConfig: GatsbyConfig = () => ({
  siteMetadata,
  plugins: [
    {
      options: {
        documentPaths: [
          './src/**/*.{ts,tsx}',
          './node_modules/gatsby-*/**/*.js',
          './.gatsby/gatsby-node.ts',
        ],
        fileName: `typings/graphql-types.d.ts`,
      },
      resolve: `gatsby-plugin-graphql-codegen`,
    },
    'gatsby-plugin-emotion',
    'gatsby-plugin-react-helmet',
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
    {
      options: {
        background_color: config.backgroundColor,
        description: config.siteDescription,
        display: 'minimal-ui',
        icon: 'src/images/gatsby-icon.png', // This path is relative to the root of the site.
        lang: config.lang,
        name: config.siteTitle,
        short_name: config.siteTitleShort,
        start_url: config.pathPrefix,
        theme_color: config.themeColor,
      },
      resolve: 'gatsby-plugin-manifest',
    },
    {
      options: {
        defaultLayouts: {
          default: require.resolve('../src/components/layout/layout.tsx'),
        },
      },
      resolve: 'gatsby-plugin-mdx',
    },
    {
      options: {
        name: 'images',
        path: `${__dirname}/../src/images`,
      },
      resolve: 'gatsby-source-filesystem',
    },
    {
      options: {
        name: 'posts',
        path: `${__dirname}/../content/`,
      },
      resolve: 'gatsby-source-filesystem',
    },
  ],
})

export default gatsbyConfig

// export default {
//   plugins: [
//     {
//       options: {
//         documentPaths: [
//           './src/**/*.{ts,tsx}',
//           './node_modules/gatsby-*/**/*.js',
//           './gatsby-node.js',
//         ],
//         fileName: `typings/graphql-types.d.ts`,
//       },
//       resolve: `gatsby-plugin-graphql-codegen`,
//     },
//     'gatsby-plugin-emotion',
//     'gatsby-plugin-react-helmet',
//     'gatsby-transformer-sharp',
//     'gatsby-plugin-sharp',
//     {
//       options: {
//         background_color: config.backgroundColor,
//         description: config.siteDescription,
//         display: 'minimal-ui',
//         icon: 'src/images/gatsby-icon.png', // This path is relative to the root of the site.
//         lang: config.lang,
//         name: config.siteTitle,
//         short_name: config.siteTitleShort,
//         start_url: config.pathPrefix,
//         theme_color: config.themeColor,
//       },
//       resolve: 'gatsby-plugin-manifest',
//     },
//     // this (optional) plugin enables Progressive Web App + Offline functionality
//     // To learn more, visit: https://gatsby.dev/offline
//     // 'gatsby-plugin-offline',
//     {
//       options: {
//         defaultLayouts: {
//           default: require.resolve('./src/components/layout/layout.tsx'),
//         },
//       },
//       resolve: 'gatsby-plugin-mdx',
//     },
//     {
//       options: {
//         name: 'images',
//         path: `${__dirname}/src/images`,
//       },
//       resolve: 'gatsby-source-filesystem',
//     },
//     {
//       options: {
//         name: 'posts',
//         path: `${__dirname}/content/`,
//       },
//       resolve: 'gatsby-source-filesystem',
//     },
//   ],
//   siteMetadata: siteMetadata,
// }
