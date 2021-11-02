import { graphql } from 'gatsby'

export const CreatePagesData = graphql`
  fragment BlogPostDetails on Mdx {
    fileAbsolutePath
    id
    fields {
      slug
    }
    excerpt(pruneLength: 250)
    frontmatter {
      slug
      title
      author
      date
      description
      banner
      bannerCredit
      published
      unlisted
      redirects
    }
    parent {
      ... on File {
        name
        sourceInstanceName
      }
    }
  }

  query CreatePagesData {
    allMdx(
      filter: {
        frontmatter: { published: { eq: true } }
        fileAbsolutePath: { regex: "//content/blog//" }
      }
      sort: { fields: [frontmatter___date], order: DESC }
    ) {
      blogPosts: edges {
        blogPost: node {
          ...BlogPostDetails
        }
        next {
          id
          fileAbsolutePath
          fields {
            slug
          }
        }
        previous {
          id
          fileAbsolutePath
          fields {
            slug
          }
        }
      }
    }
  }
`
