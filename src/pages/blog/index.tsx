import { PostPreview, SEO } from '@components/index'
import config from '@config/index'
import { usePostsPreview } from '@hooks/index'

import { PageProps } from 'gatsby'
import * as React from 'react'

const IndexPage: React.FC<PageProps> = () => {
  const posts = usePostsPreview()
  return (
    <>
      <SEO titleTemplate="Blog" description={config.siteDescription} />

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
