import { graphql, useStaticQuery } from 'gatsby'

const siteMetadataQuery = graphql`
  query SiteMetadata {
    site {
      buildTime(formatString: "YYYY-MM-DD")
      #      siteMetadata {
      #        defaultTitle: siteTitle
      #        titleTemplate: siteTitleTemplate
      #        defaultDescription: siteDescription
      #        siteUrl
      #        defaultImage: siteImage
      #        keywords
      #        siteLocale
      #        siteLanguage
      #        social {
      #          twitter
      #        }
      #        author {
      #          name
      #        }
      #      }
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
  const { site } =
    useStaticQuery<GatsbyTypes.SiteMetadataQuery>(siteMetadataQuery)
  return {
    buildTime: site?.buildTime,
    ...site?.siteMetadata,
  } as unknown as SEO
}
