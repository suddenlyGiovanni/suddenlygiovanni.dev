import { css } from '@emotion/core'
import { PageProps } from 'gatsby'
import React, { FC } from 'react'

import { Layout, PostPreview } from '../components'
import { usePosts } from '../hooks/use-posts'

const IndexPage: FC<PageProps> = () => {
  const posts = usePosts()
  return (
    <Layout>
      <h2
        css={css`
          border-bottom: unset;
        `}
      >
        Blog
      </h2>
      {posts.map((post) => (
        <PostPreview key={post.slug} post={post} />
      ))}
    </Layout>
  )
}

export default IndexPage
