export const config = {
  author: 'Giovanni Ravalico', // Author for schemaORGJSONLD
  backgroundColor: '#fff',
  github: 'https://github.com/suddenlyGiovanni/',
  lang: 'en', // Language Tag on <html> element
  linkedin: 'https://www.linkedin.com/in/giovanni-ravalico/',
  minibio: `bio`,
  pathPrefix: '/',
  siteDescription:
    'This is my personal blog where I write about my coding journey',
  siteLogo: 'content/assets/giovanni_ravalico-profile_bw.jpg', // Used for SEO and manifest, path to your image you placed in the 'static' folder
  siteTitle: 'suddenlyGiovanni', // Navigation and Site Title
  siteTitleAlt: 'The personal website of Giovanni Ravalico', // Alternative Site title for SEO
  siteTitleShort: 'suddenlyGiovanni', // short_name for manifest
  siteUrl: process.env.ROOT_URL || 'https://suddenlygiovanni.dev', // Domain of your site. No trailing slash!
  themeColor: '#fff', // Manifest and Progress color
  twitter: 'https://twitter.com/suddenlyGio/',
  twitterHandle: '@suddenlyGio',
  userTwitter: '@suddenlyGio', // Twitter Username
} as const
