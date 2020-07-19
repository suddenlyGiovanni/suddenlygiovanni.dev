import { graphql, useStaticQuery } from 'gatsby'

import { GetPostsQuery } from '../../typings/graphql-types'

export type Post = {
  author: string
  excerpt: string
  slug: string
  title: string
}

export type Posts = Post[]

const getPostsQuery = graphql`
  query GetPosts {
    allMdx {
      posts: nodes {
        frontmatter {
          title
          slug
          author
        }
        excerpt
      }
    }
  }
`
export const usePosts = (): Post[] => {
  const {
    allMdx: { posts },
  } = useStaticQuery<GetPostsQuery>(getPostsQuery)

  return posts.map((post) => ({
    author: post?.frontmatter?.author || '',
    excerpt: post?.excerpt || '',
    slug: post?.frontmatter?.slug || '',
    title: post?.frontmatter?.title || '',
  }))
}
