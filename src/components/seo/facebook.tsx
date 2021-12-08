import { MetaOpenGraphProtocol, Types } from '@lib/open-graph-protocol'

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
    <MetaOpenGraphProtocol
      openGraph={{
        property: 'og:type',
        content: Types.Enum(type),
      }}
    />
    <MetaOpenGraphProtocol
      openGraph={{
        property: 'og:locale',
        content: Types.String(locale),
      }}
    />
    <MetaOpenGraphProtocol
      openGraph={{
        property: 'og:url',
        content: Types.URL(url),
      }}
    />
    <MetaOpenGraphProtocol
      openGraph={{
        property: 'og:title',
        content: Types.String(title),
      }}
    />
    <MetaOpenGraphProtocol
      openGraph={{
        property: 'og:description',
        content: Types.String(desc),
      }}
    />
    <MetaOpenGraphProtocol
      openGraph={{
        property: 'og:image',
        content: Types.URL(image),
      }}
    />
    <MetaOpenGraphProtocol
      openGraph={{
        property: 'og:image:alt',
        content: Types.String(desc),
      }}
    />
  </Helmet>
)
