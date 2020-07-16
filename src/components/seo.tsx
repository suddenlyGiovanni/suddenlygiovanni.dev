/**
 * SEO component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import { graphql, useStaticQuery } from 'gatsby'
import React from 'react'
import { Helmet } from 'react-helmet'

type Props = {
  title: string
  description?: string
  lang?: string
  meta?: Record<string, unknown>[]
}

function SEO({
  title,
  description = '',
  lang = 'en',
  meta = [],
}: Props): JSX.Element {
  const { site } = useStaticQuery<GatsbyTypes.GetSiteMetadataQuery>(
    graphql`
      query GetSiteMetadata {
        site {
          siteMetadata {
            title
            description
            author
          }
        }
      }
    `
  )

  const metaDescription = description || site?.siteMetadata?.description

  return (
    <Helmet
      htmlAttributes={{
        lang,
      }}
      title={title}
      titleTemplate={`%s | ${site?.siteMetadata?.title ?? ''}`}
      meta={[
        {
          name: `description`,
          content: metaDescription,
        },
        {
          property: `og:title`,
          content: title,
        },
        {
          property: `og:description`,
          content: metaDescription,
        },
        {
          property: `og:type`,
          content: `website`,
        },
        {
          name: `twitter:card`,
          content: `summary`,
        },
        {
          name: `twitter:creator`,
          content: site?.siteMetadata?.author,
        },
        {
          name: `twitter:title`,
          content: title,
        },
        {
          name: `twitter:description`,
          content: metaDescription,
        },
      ].concat(
        /*  @ts-ignore */
        meta
      )}
    />
  )
}

export default SEO
