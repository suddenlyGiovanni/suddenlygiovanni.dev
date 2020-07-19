// @ts-check
// eslint-disable-next-line @typescript-eslint/no-var-requires
const config = require('./config/website.js')

module.exports = {
  plugins: [
    {
      options: {
        documentPaths: [
          './src/**/*.{ts,tsx}',
          './node_modules/gatsby-*/**/*.js',
          './gatsby-node.js',
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
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // 'gatsby-plugin-offline',
    {
      options: {
        defaultLayouts: {
          default: require.resolve('./src/components/layout/layout.tsx'),
        },
      },
      resolve: 'gatsby-plugin-mdx',
    },
    {
      options: {
        name: 'images',
        path: `${__dirname}/src/images`,
      },
      resolve: 'gatsby-source-filesystem',
    },
    {
      options: {
        name: 'posts',
        path: `${__dirname}/content/`,
      },
      resolve: 'gatsby-source-filesystem',
    },
  ],
  siteMetadata: {
    author: config.author,
    description: config.siteDescription,
    miniBio: config.minibio,
    title: config.siteTitle,
    twitter: config.twitter,
    twitterHandle: config.twitterHandle,
  },
}
