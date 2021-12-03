import { graphql, useStaticQuery } from 'gatsby'

const siteMetadataQuery = graphql`
  fragment RouteFragment on Route {
    uri
    url
    title
    description
    disabled
    hidden
  }

  fragment SiteMetadataFragment on SiteSiteMetadata {
    title
    description
    author {
      name
      summary
    }
    titleAlt
    titleTemplate
    url
    image
    language
    locale
    keywords
    social {
      github
      linkedin
      linkedin
    }
    routes {
      ...RouteFragment
    }
  }

  query SiteSiteMetadata {
    site {
      buildTime(formatString: "YYYY-MM-DD")
      siteMetadata {
        ...SiteMetadataFragment
      }
    }
  }
`

export const useSiteMetadata = () => {
  const { site } =
    useStaticQuery<GatsbyTypes.SiteSiteMetadataQuery>(siteMetadataQuery)
  return {
    buildTime: site?.buildTime,
    ...(site?.siteMetadata as NonNullable<GatsbyTypes.SiteSiteMetadata>),
  } as const
}
