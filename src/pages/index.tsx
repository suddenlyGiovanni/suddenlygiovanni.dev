import { Link } from 'gatsby'
import React from 'react'

import { Layout, PostPreview } from '../components'
import { usePosts } from '../hooks/use-posts'

const IndexPage = (): JSX.Element => {
  const posts = usePosts()
  return (
    <Layout>
      <h1>Home</h1>
      <p>Hello fellow developers</p>
      <Link to="/about">Learn about me &rarr;</Link>
      <h2>Read my blog</h2>
      {posts.map((post) => (
        <PostPreview key={post.slug} post={post} />
      ))}
    </Layout>
  )
}

export default IndexPage
