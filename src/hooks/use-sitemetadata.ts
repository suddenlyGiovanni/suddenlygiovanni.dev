/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { graphql, useStaticQuery } from 'gatsby'

import { SiteMetadataQuery } from '../../typings/graphql-types'

const siteMetadataQuery = graphql`
  query SiteMetadata {
    site {
      buildTime(formatString: "YYYY-MM-DD")
      siteMetadata {
        defaultTitle: siteTitle
        titleTemplate: siteTitleTemplate
        defaultDescription: siteDescription
        siteUrl
        defaultImage: siteImage
        keywords
        siteLocale
        siteLanguage
        social {
          twitterHandle
        }
        author {
          name
        }
      }
    }
  }
`

interface SEO {
  buildTime: string
  defaultTitle: string
  titleTemplate: string
  defaultDescription: string
  siteUrl: string
  defaultImage: string
  keywords: string[]
  defaultLocale: string
  defaultLanguage: string
  social: {
    twitterHandle: string
  }
  author: {
    name: string
  }
}

export const useSiteMetadata = (): SEO => {
  const { site } = useStaticQuery<SiteMetadataQuery>(siteMetadataQuery)
  return ({
    buildTime: site?.buildTime,
    ...site?.siteMetadata,
  } as unknown) as SEO
}
