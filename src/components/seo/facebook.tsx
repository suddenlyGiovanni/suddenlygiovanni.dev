import {
  MetaOpenGraph,
  Types,
} from '@suddenlygiovanni/open-graph-protocol-react'

import React from 'react'
import { Helmet } from 'react-helmet'

interface Props {
  url: string
  type: 'article' | 'website'
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
    <MetaOpenGraph
      openGraph={{
        property: 'og:type',
        content: Types.Enum(type),
      }}
    />
    <MetaOpenGraph
      openGraph={{
        property: 'og:locale',
        content: Types.String(locale),
      }}
    />
    <MetaOpenGraph
      openGraph={{
        property: 'og:url',
        content: Types.URL(url),
      }}
    />
    <MetaOpenGraph
      openGraph={{
        property: 'og:title',
        content: Types.String(title),
      }}
    />
    <MetaOpenGraph
      openGraph={{
        property: 'og:description',
        content: Types.String(desc),
      }}
    />
    <MetaOpenGraph
      openGraph={{
        property: 'og:image',
        content: Types.URL(image),
      }}
    />
    <MetaOpenGraph
      openGraph={{
        property: 'og:image:alt',
        content: Types.String(desc),
      }}
    />
  </Helmet>
)
