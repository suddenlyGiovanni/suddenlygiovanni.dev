import { Link } from 'gatsby'
import React from 'react'

import { Layout } from '../components'

const IndexPage = (): JSX.Element => (
  <Layout>
    <h1>Home</h1>
    <p>Hello fellow developers</p>
    <Link to="/about">Learn about me &rarr;</Link>
  </Layout>
)

export default IndexPage
