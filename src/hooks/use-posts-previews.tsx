import { graphql, useStaticQuery } from 'gatsby'
import * as DateString from '@lib/date-string-yyyymmdd'

interface PostPreviewData {
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

export function usePostsPreview(): ReadonlyArray<PostPreviewData> {
  const {
    allMdx: { posts },
  } = useStaticQuery<GatsbyTypes.PostsPreviewsQuery>(postsPreviewsQuery)

  if (posts.length === 0) return []

  return posts.map(({ frontmatter, timeToRead, id }) => ({
    author: frontmatter?.author || '',
    date: DateString.toDate(DateString.fromString(frontmatter?.date || '')),
    description: frontmatter?.description || '',
    id: id || '',
    slug: frontmatter?.slug || '',
    timeToRead: timeToRead || 0,
    title: frontmatter?.title || '',
  }))
}
