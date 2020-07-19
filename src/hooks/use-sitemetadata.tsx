import { graphql, useStaticQuery } from 'gatsby'

import { GetSiteMetadataQuery } from '../../typings/graphql-types'

const getSiteMetadata = graphql`
  query GetSiteMetadata {
    site {
      siteMetadata {
        title
        description
        author
        miniBio
        twitterHandle
        twitter
      }
    }
  }
`

export const useSiteMetadata = (): {
  author: string
  description: string
  miniBio: string
  title: string
  twitter: string
  twitterHandle: string
} => {
  const data = useStaticQuery<GetSiteMetadataQuery>(getSiteMetadata)

  return {
    author: data.site?.siteMetadata?.author || 'fallback author',
    description: data.site?.siteMetadata?.description || 'fallback description',
    miniBio: data.site?.siteMetadata?.miniBio || 'fallback minibio',
    title: data.site?.siteMetadata?.title || 'fallback title',
    twitter: data.site?.siteMetadata?.twitter || 'fallback twitter',
    twitterHandle:
      data.site?.siteMetadata?.twitterHandle || 'fallback twitter handle',
  }
}
