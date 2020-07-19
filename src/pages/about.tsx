import { Link, PageProps } from 'gatsby'
import React, { FC } from 'react'

import { Layout } from '../components'

const About: FC<PageProps> = () => (
  <Layout>
    <h1>About Me</h1>
    <p>This is my personal website</p>
    <Link to="/">&larr; back to home</Link>
  </Layout>
)

export default About
