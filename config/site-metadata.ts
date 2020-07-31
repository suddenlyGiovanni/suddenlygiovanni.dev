/* eslint-disable sort-keys */
import type { GatsbyConfig } from 'gatsby'

import { config } from './website'

type SiteMetadata = GatsbyConfig['siteMetadata']

export const siteMetadata: SiteMetadata = {
  siteUrl: config.siteUrl,
  title: config.siteTitle,
  description: config.siteDescription,
  twitterHandle: config.twitterHandle,
  keywords: [
    'Software Engineer',
    'Blog',
    'Strongly Typed',
    'Functional Programming',
    'FP',
  ],
  canonicalUrl: config.siteUrl,
  image: config.siteLogo,
  author: {
    name: config.author,
    minibio: config.minibio,
  },
  social: {
    twitter: config.twitter,
    twitterHandle: config.twitterHandle,
  },
}
