import { PageProps } from 'gatsby'
import * as React from 'react'

import { SEO } from '../components'
import { Layout } from '../layouts'

const NotFoundPage: React.VFC<PageProps> = () => (
  <Layout>
    <SEO title="404: Not found" />
    <h1>NOT FOUND</h1>
    <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
  </Layout>
)

export default NotFoundPage
