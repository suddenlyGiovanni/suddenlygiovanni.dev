import { graphql, useStaticQuery } from 'gatsby'

type Post = {
  author: string
  excerpt: string
  slug: string
  title: string
}
export const usePosts = (): Post[] => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const {
    allMdx: { nodes: posts },
  } = useStaticQuery<GatsbyTypes.GetPostsQuery>(graphql`
    query GetPosts {
      allMdx {
        nodes {
          frontmatter {
            title
            slug
            author
          }
          excerpt
        }
      }
    }
  `)

  return posts.map((post) => ({
    author: post?.frontmatter?.author || '',
    excerpt: post?.excerpt || '',
    slug: post?.frontmatter?.slug || '',
    title: post?.frontmatter?.title || '',
  }))
}
