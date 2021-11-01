import { PageProps } from 'gatsby'
import * as React from 'react'

import { PostPreview } from '../../components'
import { usePostsPreview } from '../../hooks'
import { Layout } from '../../layouts'

const IndexPage: React.FC<PageProps> = () => {
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
