/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it

exports.createPages = async ({ actions, graphql, reporter }) => {
  const result = await graphql(`
    query {
      allMdx {
        nodes {
          frontmatter {
            slug
          }
        }
      }
    }
  `)

  if (result.errors) {
    reporter.panic('fail to create posts', result.console.error)
  }

  const posts = result.data.allMdx.nodes

  posts.forEach((post) => {
    actions.createPage({
      path: post.frontmatter.slug,
      component: require.resolve('./src/templates/post.tsx'),
      context: {
        slug: post.frontmatter.slug,
      },
    })
  })
}
