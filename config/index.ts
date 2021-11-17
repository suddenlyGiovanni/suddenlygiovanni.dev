import type { GatsbyConfig } from 'gatsby'

import conf from './config'
import { Route, RoutesMap } from './routes-map'

export interface BlogRoute
  extends Route<'blog', '/blog', 'blog', 'Go to blog page', false, false> {}

export interface ReadingJournalRoute
  extends Route<
    'reading-journal',
    '/reading-journal',
    'reading journal',
    'Go to reading journal page',
    true,
    false
  > {}

export interface AboutMeRoute
  extends Route<
    'about-me',
    '/',
    'about me',
    'Go to about me page',
    false,
    false
  > {}

export interface ResumeRoute
  extends Route<
    'resume',
    '/resume',
    'résumé',
    'Go to resume page',
    false,
    false
  > {}

export interface MotivationsRoute
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

export const siteMetadata: GatsbyConfig['siteMetadata'] = {
  routes: routesMap.getRoutes(),
  siteTitle: conf.siteTitle,
  siteTitleTemplate: conf.siteTitleTemplate,
  siteDescription: conf.siteDescription,
  siteUrl: conf.siteUrl,
  siteImage: conf.image,
  siteLanguage: conf.siteLanguage,
  siteLocale: conf.siteLocale,
  keywords: conf.keywords,
  author: {
    name: conf.author,
  },
  social: {
    twitterHandle: conf.twitterHandle,
  },
}

export * from './routes-map'
export * as config from './config'
