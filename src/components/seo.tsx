import React from 'react'
import { Helmet } from 'react-helmet'

import { useSiteMetadata } from '../hooks/use-sitemetadata'

type Props = {
  description?: string
  lang?: string
  meta?: Record<string, unknown>[]
  title?: string
}

export function SEO({
  title,
  description,
  lang = 'en',
  meta = [],
}: Props): JSX.Element {
  const metadata = useSiteMetadata()
  const metaDescription = description || metadata.description
  const metaTitle = title ?? metadata.title
  return (
    <Helmet
      htmlAttributes={{ lang }}
      title={metaTitle}
      titleTemplate={`%s | ${metaTitle}`}
      meta={[
        {
          content: metaDescription,
          name: `description`,
        },
        {
          content: metaTitle,
          property: `og:title`,
        },
        {
          content: metaDescription,
          property: `og:description`,
        },
        {
          content: `website`,
          property: `og:type`,
        },
        {
          content: `summary`,
          name: `twitter:card`,
        },
        {
          content: metadata.author,
          name: `twitter:creator`,
        },
        {
          content: metaTitle,
          name: `twitter:title`,
        },
        {
          content: metaDescription,
          name: `twitter:description`,
        },
      ].concat(
        /*  @ts-ignore */
        meta
      )}
    />
  )
}
