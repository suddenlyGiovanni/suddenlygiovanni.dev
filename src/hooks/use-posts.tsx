import { graphql, useStaticQuery } from 'gatsby'
import { FluidObject } from 'gatsby-image'


import {
  GetPostsQuery,
  GatsbyImageSharpFluid_WithWebpFragment as ImageSharpFluid,
} from '../../typings/graphql-types'

export type Post = {
  author: string
  excerpt: string
  slug: string
  title: string
  image: FluidObject | undefined
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
          image {
            sharp: childImageSharp {
              fluid(
                maxWidth: 100
                maxHeight: 100
                duotone: { shadow: "#663399", highlight: "#ddbbff" }
              ) {
                ...GatsbyImageSharpFluid_withWebp
              }
            }
          }
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
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
    image: post?.frontmatter?.image?.sharp?.fluid || undefined,
    slug: post?.frontmatter?.slug || '',
    title: post?.frontmatter?.title || '',
  }))
}
