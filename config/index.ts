import type { GatsbyConfig } from 'gatsby'

import { navItems } from './nav-items'

const config = {
  author: 'Giovanni Ravalico', // Author for schemaORGJSONLD
  siteLanguage: 'en-US',
  siteLocale: 'en_us',
  siteTitleTemplate: 'Engineering Blog',
  minibio: `bio`,
  pathPrefix: '/',
  siteDescription:
    "suddenlyGiovanni's personal engineering blog. A Place where I experiment with software and write about my coding journey",
  image: 'content/assets/giovanni_ravalico-profile_bw.jpg', // Used for SEO and manifest, path to your image you placed in the 'static' folder
  siteTitle: 'suddenlyGiovanni', // Navigation and Site Title
  siteTitleAlt: 'The personal website of Giovanni Ravalico', // Alternative Site title for SEO
  siteTitleShort: 'suddenlyGiovanni', // short_name for manifest
  siteUrl: process.env.ROOT_URL || 'https://suddenlyGiovanni.dev', // Domain of your site. No trailing slash!
  themeColor: '#fff', // Manifest and Progress color
  backgroundColor: '#fff',
  keywords: [
    'Software Engineer',
    'Blog',
    'Strongly Typed',
    'Functional Programming',
    'FP',
  ],
  twitter: 'https://twitter.com/suddenlyGio/',
  twitterHandle: '@suddenlyGio',
  userTwitter: '@suddenlyGio', // Twitter Username
  github: 'https://github.com/suddenlyGiovanni/',
  linkedin: 'https://www.linkedin.com/in/giovanni-ravalico/',
} as const

export const siteMetadata: GatsbyConfig['siteMetadata'] = {
  navItems, // TODO: move navItems in this module
  siteTitle: config.siteTitle,
  siteTitleTemplate: config.siteTitleTemplate,
  siteDescription: config.siteDescription,
  siteUrl: config.siteUrl,
  siteImage: config.image,
  siteLanguage: config.siteLanguage,
  siteLocale: config.siteLocale,
  keywords: config.keywords,
  author: {
    name: config.author,
  },
  social: {
    twitterHandle: config.twitterHandle,
  },
}

export default config
