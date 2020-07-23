import { PageProps } from 'gatsby'
import React, { FC } from 'react'

import { Layout, PostPreview } from '../components'
import { usePosts } from '../hooks/use-posts'

const IndexPage: FC<PageProps> = () => {
  const posts = usePosts()
  return (
    <Layout>
      <h1>Blog</h1>
      {posts.map((post) => (
        <PostPreview key={post.slug} post={post} />
      ))}
    </Layout>
  )
}

export default IndexPage
