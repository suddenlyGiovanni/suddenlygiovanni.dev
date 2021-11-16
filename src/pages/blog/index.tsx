import { PageProps } from 'gatsby'
import * as React from 'react'

import { PostPreview } from '../../components'
import { usePostsPreview } from '../../hooks'

const IndexPage: React.FC<PageProps> = () => {
  const posts = usePostsPreview()
  return (
    <>
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
    </>
  )
}

export default IndexPage
