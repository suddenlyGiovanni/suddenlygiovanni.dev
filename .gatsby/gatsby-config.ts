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

// 'gatsby-plugin-webpack-bundle-analyzer'
type GatsbyPluginWebpackBundleAnalyzerConfig = IMergePluginOptions<
  'gatsby-plugin-webpack-bundle-analyzer',
  {
    production: boolean
    disable: boolean
    generateStatsFile: boolean
    analyzerMode: string
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
  | GatsbyPluginWebpackBundleAnalyzerConfig
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
        codegen: false, // TODO: enable!!
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
    {
      resolve: `gatsby-plugin-typography`,
      options: {
        pathToConfigModule: `./src/lib/typography`,
      },
    },
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
    {
      options: {
        background_color: config.backgroundColor,
        description: config.siteDescription,
        display: 'minimal-ui',
        icon: 'images/gatsby-icon.png', // This path is relative to the root of the site.
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
          default: require.resolve('../src/components/layout.tsx'),
        },
        gatsbyRemarkPlugins: [{ resolve: 'gatsby-remark-images' }],
        plugins: [{ resolve: 'gatsby-remark-images' }],
      },
      resolve: 'gatsby-plugin-mdx',
    },
    {
      options: {
        name: 'images',
        path: 'images',
      },
      resolve: 'gatsby-source-filesystem',
    },
    {
      options: {
        name: 'content',
        path: 'content',
      },
      resolve: 'gatsby-source-filesystem',
    },
    {
      resolve: 'gatsby-plugin-webpack-bundle-analyzer',
      options: {
        production: true,
        disable: !process.env.ANALYZE_BUNDLE_SIZE,
        generateStatsFile: true,
        analyzerMode: 'static',
      },
    },
  ],
})

export default gatsbyConfig
