import { PageProps } from 'gatsby'
import React, { FC } from 'react'

import { Layout, PostPreview } from '../components'
import { usePostsPreview } from '../hooks'

const IndexPage: FC<PageProps> = () => {
  const posts = usePostsPreview()
  return (
    <Layout>
      {posts.map(
        ({ id, slug, author, title, description, date, timeToRead }) => (
          <PostPreview
            key={id}
            id={id}
            slug={slug}
            author={author}
            title={title}
            description={description}
            date={date}
            timeToRead={timeToRead}
          />
        )
      )}
    </Layout>
  )
}

export default IndexPage
