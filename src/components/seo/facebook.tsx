import * as React from 'react'
import { Helmet } from 'react-helmet'

interface Props {
  url: string
  type: string
  title: string
  desc: string
  image: string
  locale: string
}

export const Facebook: React.VFC<Props> = ({
  url,
  type,
  title,
  desc,
  image,
  locale,
}) => (
  <Helmet>
    <meta property="og:locale" content={locale} />
    <meta property="og:url" content={url} />
    <meta property="og:type" content={type} />
    <meta property="og:title" content={title} />
    <meta property="og:description" content={desc} />
    <meta property="og:image" content={image} />
    <meta property="og:image:alt" content={desc} />
  </Helmet>
)
