/* eslint-disable sort-keys */
export const config = {
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
