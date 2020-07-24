/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { graphql, useStaticQuery } from 'gatsby'

import { PostsPreviewDataQuery } from '../../typings/graphql-types'

type PostPreviewData = {
  id: string
  slug: string
  author: string
  title: string
  description: string
  date: string
  timeToRead: number
}

const getPostsQuery = graphql`
  fragment PostPreviewData on Mdx {
    id
    frontmatter {
      slug
      author
      title
      description
      date
    }
    timeToRead
  }

  query PostsPreviewData {
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
  } = useStaticQuery<PostsPreviewDataQuery>(getPostsQuery)

  if (posts.length === 0) return []
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  return posts.map(({ frontmatter, timeToRead, id }) => ({
    author: frontmatter?.author || '',
    date: frontmatter?.date || '',
    description: frontmatter?.description || '',
    id: id || '',
    slug: frontmatter?.slug || '',
    timeToRead: timeToRead || 0,
    title: frontmatter?.title || '',
  }))
}
