import { PageProps } from 'gatsby'
import React, { FC } from 'react'

import { Layout, ReadLink } from '../components/index'
import { useResume } from '../hooks'

const ResumePage: FC<PageProps> = () => {
  const resume = useResume()
  return (
    <Layout>
      <h1>Résumé</h1>
      <span>content coming soon!</span>

      <pre>{JSON.stringify(resume, null, 2)}</pre>
      <ReadLink to="/">&larr; back to my Blog</ReadLink>
    </Layout>
  )
}

export default ResumePage
