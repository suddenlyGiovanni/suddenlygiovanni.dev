import React from 'react'
import { Helmet } from 'react-helmet'

import { MetaOpenGraphProtocol, Types } from '../../lib/open-graph-protocol'

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
    <MetaOpenGraphProtocol property="og:type" content={Types.Enum(type)} />
    <MetaOpenGraphProtocol
      property="og:locale"
      content={Types.String(locale)}
    />
    <MetaOpenGraphProtocol property="og:url" content={Types.URL(url)} />
    <MetaOpenGraphProtocol property="og:title" content={Types.String(title)} />
    <MetaOpenGraphProtocol
      property="og:description"
      content={Types.String(desc)}
    />
    <MetaOpenGraphProtocol property="og:image" content={Types.URL(image)} />
    <MetaOpenGraphProtocol
      property="og:image:alt"
      content={Types.String(desc)}
    />
  </Helmet>
)
