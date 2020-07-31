/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { graphql, useStaticQuery } from 'gatsby'

import { PostsPreviewsQuery } from '../../typings/graphql-types'
import { convertStringToDate } from '../lib/helpers'

type PostPreviewData = {
  id: string
  slug: string
  author: string
  title: string
  description: string
  date: Date
  timeToRead: number
}

const postsPreviewsQuery = graphql`
  fragment PostPreviewData on Mdx {
    id
    frontmatter {
      slug
      author
      title
      description
      date
    }
    excerpt(pruneLength: 250)
    timeToRead
    fields {
      slug
    }
  }

  query PostsPreviews {
    allMdx(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: {
        frontmatter: { published: { ne: false }, unlisted: { ne: false } }
      }
    ) {
      posts: nodes {
        ...PostPreviewData
      }
    }
  }
`
export const usePostsPreview = (): PostPreviewData[] => {
  const {
    allMdx: { posts },
  } = useStaticQuery<PostsPreviewsQuery>(postsPreviewsQuery)

  if (posts.length === 0) return []
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  return posts.map(({ frontmatter, timeToRead, id }) => ({
    author: frontmatter?.author || '',
    date: convertStringToDate(frontmatter?.date || ''),
    description: frontmatter?.description || '',
    id: id || '',
    slug: frontmatter?.slug || '',
    timeToRead: timeToRead || 0,
    title: frontmatter?.title || '',
  }))
}
