import { PageProps } from 'gatsby'
import * as React from 'react'

import config, { routesMap } from '../../../config'
import { PostPreview, SEOBase } from '../../components'
import { usePostsPreview } from '../../hooks'

const IndexPage: React.FC<PageProps> = () => {
  const posts = usePostsPreview()
  return (
    <>
      <SEOBase
        title={config.siteTitle}
        titleTemplate="Blog"
        description={config.siteDescription}
        url={config.siteUrl + routesMap.getRoute('blog').url}
      />

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
