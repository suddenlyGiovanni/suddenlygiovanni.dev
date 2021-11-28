import { Helmet } from 'react-helmet'

import { MetaOpenGraph } from './meta.open-graph'

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
    <MetaOpenGraph property="og:type" content={type} />
    <MetaOpenGraph property="og:locale" content={locale} />
    <MetaOpenGraph property="og:url" content={url} />
    <MetaOpenGraph property="og:title" content={title} />
    <MetaOpenGraph property="og:description" content={desc} />
    <MetaOpenGraph property="og:image" content={image} />
    <MetaOpenGraph property="og:image:alt" content={desc} />
  </Helmet>
)
