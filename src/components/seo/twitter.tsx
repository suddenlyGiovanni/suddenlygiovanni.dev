import { Helmet } from 'react-helmet'
import { MetaOpenGraph } from './meta.open-graph'

interface Props {
  username: string
  title: string
  desc: string
  image: string
  type?: string
}

export const Twitter: React.VFC<Props> = ({
  type = 'summary_large_image',
  username,
  title,
  desc,
  image,
}) => (
  <Helmet>
    {username && (
      <MetaOpenGraph property="twitter:creator" content={username} />
    )}
    <MetaOpenGraph property="twitter:card" content={type} />
    <MetaOpenGraph property="twitter:title" content={title} />
    <MetaOpenGraph property="twitter:description" content={desc} />
    <MetaOpenGraph property="twitter:image" content={image} />
    <MetaOpenGraph property="twitter:image:alt" content={desc} />
  </Helmet>
)
