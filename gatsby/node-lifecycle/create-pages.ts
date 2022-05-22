import path from 'path'
import type { Actions, GatsbyNode } from 'gatsby'

type BlogPosts = GatsbyTypes.CreatePagesDataQuery['allMdx']['blogPosts']

function makeGetBlogPage(
  actions: Actions
): ({ blogPost }: BlogPosts[0], index: number, blogPosts: BlogPosts) => void {
  return function getBlogPage({ blogPost }, index, blogPosts) {
    const blogPostTemplate = path.resolve(
      './src/templates/blog-post-template.tsx'
    )

    const _previous =
      index === blogPosts.length - 1
        ? null //
        : blogPosts[index + 1].blogPost // previous node

    const _next =
      index === 0
        ? null //
        : blogPosts[index - 1].blogPost // next node

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
      path: pagePath,
      component: blogPostTemplate,
      context: {
        id: blogPost.id,
        slug: blogPost!.fields!.slug,
        previous: _previous,
        next: _next,
      },
    })
  }
}

export const createPages: GatsbyNode['createPages'] = async ({
  graphql,
  actions,
  reporter,
}) => {
  const result = await graphql<GatsbyTypes.CreatePagesDataQuery>(
    // language=GraphQL
    `
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
  )

  if (result.errors) {
    reporter.panic('failed to retrieve data', result.errors)
  } else {
    if (result.data!.allMdx.blogPosts.length < 1) {
      reporter.error('There are no blog post to build')
    } else {
      result?.data?.allMdx.blogPosts.forEach(makeGetBlogPage(actions))
    }
  }
}
