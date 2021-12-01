import { Helmet } from 'react-helmet'
import MetaOpenGraphProtocol, { Types } from './meta.open-graph-protocol'

interface Props {
  username: string
  title: string
  desc: string
  image: string
  type?: 'summary_large_image' | 'summary' | 'app'
}

export const Twitter: React.VFC<Props> = ({
  type = 'summary_large_image' as const,
  username,
  title,
  desc,
  image,
}) => (
  <Helmet>
    {username && (
      <MetaOpenGraphProtocol
        property="twitter:creator"
        content={Types.String(username)}
      />
    )}
    <MetaOpenGraphProtocol
      property="twitter:card"
      content={Types.Enum('summary_large_image', 'summary', 'app')(type)}
    />
    <MetaOpenGraphProtocol
      property="twitter:title"
      content={Types.String(title)}
    />
    <MetaOpenGraphProtocol
      property="twitter:description"
      content={Types.String(desc)}
    />
    <MetaOpenGraphProtocol
      property="twitter:image"
      content={Types.URL(image)}
    />
    <MetaOpenGraphProtocol
      property="twitter:image:alt"
      content={Types.String(desc)}
    />
  </Helmet>
)
