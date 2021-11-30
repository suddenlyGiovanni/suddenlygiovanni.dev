import { PageProps } from 'gatsby'
import config from '../../config/config'

import { SEOBase } from '../components'

const NotFoundPage: React.VFC<PageProps> = () => (
  <>
    <SEOBase title="404: Not found" url={config.siteUrl} />
    <h1>NOT FOUND</h1>
    <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
  </>
)

export default NotFoundPage
