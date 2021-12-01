import { Route, RoutesMap } from '../src/lib/routes-map'

interface BlogRoute
  extends Route<'blog', '/blog', 'blog', 'Go to blog page', false, false> {}

interface ReadingJournalRoute
  extends Route<
    'reading-journal',
    '/reading-journal',
    'reading journal',
    'Go to reading journal page',
    true,
    false
  > {}

interface AboutMeRoute
  extends Route<
    'about-me',
    '/',
    'about me',
    'Go to about me page',
    false,
    false
  > {}

interface ResumeRoute
  extends Route<
    'resume',
    '/resume',
    'résumé',
    'Go to resume page',
    false,
    false
  > {}

interface MotivationsRoute
  extends Route<
    'motivations',
    '/motivations',
    'motivations',
    'Go to my motivations',
    false,
    true
  > {}

type Routes =
  | AboutMeRoute
  | BlogRoute
  | ReadingJournalRoute
  | ResumeRoute
  | MotivationsRoute

export const routesMap = RoutesMap.int<Routes>([
  {
    uri: 'about-me',
    url: '/',
    title: 'about me',
    description: 'Go to about me page',
    disabled: false,
    hidden: false,
  },

  {
    uri: 'blog',
    url: '/blog',
    title: 'blog',
    description: 'Go to blog page',
    disabled: false,
    hidden: false,
  },

  {
    uri: 'reading-journal',
    url: '/reading-journal',
    title: 'reading journal',
    description: 'Go to reading journal page',
    disabled: true,
    hidden: false,
  },
  {
    uri: 'resume',
    url: '/resume',
    title: 'résumé',
    description: 'Go to resume page',
    disabled: false,
    hidden: false,
  },

  {
    uri: 'motivations',
    url: '/motivations',
    title: 'motivations',
    description: 'Go to my motivations',
    disabled: false,
    hidden: true,
  },
])

export default {
  author: 'Giovanni Ravalico', // Author for schemaORGJSONLD
  publisher: 'suddenlyGiovanni',
  generator: 'GatsbyJS',
  siteLanguage: 'en-US',
  siteLocale: 'en_us',
  siteTitleTemplate: 'Engineering Blog',
  minibio: `bio`,
  manifestPathPrefix: '/',
  siteDescription:
    "suddenlyGiovanni's personal engineering blog. A Place where I experiment with software and write about my coding journey",
  siteImage: 'content/assets/giovanni_ravalico-profile_bw.jpg', // Used for SEO and manifest, path to your image you placed in the 'static' folder
  siteTitle: 'suddenlyGiovanni', // Navigation and Site Title
  siteTitleAlt: 'The personal website of Giovanni Ravalico', // Alternative Site title for SEO
  siteTitleShort: 'suddenlyGiovanni', // short_name for manifest
  siteUrl: process.env.ROOT_URL || 'https://suddenlyGiovanni.dev', // Domain of your site. No trailing slash!
  manifestThemeColor: '#fff', // Manifest and Progress color
  manifestBackgroundColor: '#fff',
  siteKeywords: [
    'Software Engineer',
    'Blog',
    'Strongly Typed',
    'Functional Programming',
    'FP',
  ],
  twitter: {
    url: 'https://twitter.com/',
    handle: '@suddenlyGio',
    user: '@suddenlyGio',
  },
  github: {
    url: 'https://github.com/',
    user: 'suddenlyGiovanni',
  },
  linkedin: {
    url: 'https://www.linkedin.com/in/',
    user: 'giovanni-ravalico/',
  },
} as const
