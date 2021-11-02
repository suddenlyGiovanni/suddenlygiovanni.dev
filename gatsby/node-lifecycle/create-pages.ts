import type { Actions, GatsbyNode } from 'gatsby'

export const createPages: GatsbyNode['createPages'] = async ({
  graphql,
  actions,
  reporter,
}) => {
  const result = await graphql<GatsbyTypes.CreatePagesDataQuery>(`
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
  `)

  if (result.errors) {
    reporter.panic('failed to retrieve data', result.errors)
  } else {
    if (result.data!.allMdx.blogPosts.length < 1) {
      reporter.error('There are no blog post to build')
    } else {
      result.data!.allMdx.blogPosts.forEach((blogPost, i, blogPosts) =>
        createBlogPost(blogPost, i, blogPosts, actions)
      )
    }
  }
}

function createBlogPost(
  { blogPost }: GatsbyTypes.CreatePagesDataQuery['allMdx']['blogPosts'][0],
  i: number,
  blogPosts: GatsbyTypes.CreatePagesDataQuery['allMdx']['blogPosts'],
  actions: Actions
): void {
  const blogPostTemplate = require.resolve(
    '../../src/templates/blog-post-template.tsx'
  )
  // the first element is going to be the latest one
  // the last element is going to be the oldest one
  const previous =
    i === blogPosts.length - 1
      ? null //
      : blogPosts[i + 1].blogPost // previous node

  const next =
    i === 0
      ? null //
      : blogPosts[i - 1].blogPost // next node

  const pagePath = `blog/${blogPost!.frontmatter!.slug}`

  if (blogPost!.frontmatter!.redirects) {
    blogPost!.frontmatter!.redirects.forEach((fromPath) => {
      actions.createRedirect({
        fromPath: fromPath!,
        toPath: pagePath!,
        redirectInBrowser: true,
        isPermanent: true,
      })
    })
  }
  actions.createPage({
    path: pagePath!,
    component: blogPostTemplate,
    context: {
      id: blogPost.id,
      slug: blogPost!.fields!.slug,
      previous,
      next,
    },
  })
}
