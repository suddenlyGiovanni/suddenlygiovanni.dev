/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { graphql, useStaticQuery } from 'gatsby'

import { SiteMetadataQuery } from '../../typings/graphql-types'

const siteMetadataQuery = graphql`
  query SiteMetadata {
    site {
      siteMetadata {
        siteUrl
        title
        description
        keywords
        twitterHandle
        canonicalUrl
        image
        social {
          twitter
          twitterHandle
        }
        author {
          name
          minibio
        }
      }
    }
  }
`

interface SiteMetadata {
  siteUrl: string
  title: string
  description: string
  keywords: string[]
  twitterHandle: string
  canonicalUrl: string
  image: string
  social: {
    twitter: string
    twitterHandle: string
  }
  author: {
    name: string
    minibio: string
  }
}

export const useSiteMetadata = (): SiteMetadata => {
  const { site } = useStaticQuery<SiteMetadataQuery>(siteMetadataQuery)
  return site?.siteMetadata as SiteMetadata
}
