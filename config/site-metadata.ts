/* eslint-disable sort-keys */
import type { GatsbyConfig } from 'gatsby'

import { config } from './website'

type SiteMetadata = GatsbyConfig['siteMetadata']

export const siteMetadata: SiteMetadata = {
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
