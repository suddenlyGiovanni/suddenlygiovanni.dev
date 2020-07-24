import { PageProps } from 'gatsby'
import React, { FC } from 'react'

import { Layout, PostPreview } from '../components'
import { usePostsPreview } from '../hooks'

const IndexPage: FC<PageProps> = () => {
  const posts = usePostsPreview()
  return (
    <Layout>
      <h1>Blog</h1>
      {posts.map((post) => (
        <PostPreview key={post.id} post={post} />
      ))}
    </Layout>
  )
}

export default IndexPage
