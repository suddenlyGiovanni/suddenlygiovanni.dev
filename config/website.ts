export default {
  siteTitle: 'suddenlyGiovanni', // Navigation and Site Title
  siteTitleAlt: 'The personal website of Giovanni Ravalico', // Alternative Site title for SEO
  siteTitleShort: 'suddenlyGiovanni', // short_name for manifest
  siteUrl: process.env.ROOT_URL || 'https://suddenlygiovanni.dev', // Domain of your site. No trailing slash!
  lang: 'en', // Language Tag on <html> element
  pathPrefix: '/',
  siteLogo: 'images/logo.png', // Used for SEO and manifest, path to your image you placed in the 'static' folder
  siteDescription: 'description',
  minibio: `bio`,
  author: 'Giovanni Ravalico', // Author for schemaORGJSONLD

  userTwitter: '@suddenlyGio', // Twitter Username

  // Manifest and Progress color
  themeColor: '#fff',
  backgroundColor: '#fff',

  // Social component
  twitter: 'https://twitter.com/suddenlyGio/',
  twitterHandle: '@suddenlyGio',
  github: 'https://github.com/suddenlyGiovanni/',
  linkedin: 'https://www.linkedin.com/in/giovanni-ravalico/',
} as const
