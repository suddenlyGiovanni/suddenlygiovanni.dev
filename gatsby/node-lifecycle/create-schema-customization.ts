import type { Actions, GatsbyNode } from 'gatsby'

function createMarkdownRemark(_createTypes: Actions['createTypes']): void {
  /*
   TODO: explicitly define the Markdown frontmatter
   This way the "MarkdownRemark" queries will return `null` even when no
   blog posts are stored inside "content/blog" instead of returning an error
  */
  `
   type MarkdownRemark implements Node {
      frontmatter: Frontmatter
      fields: Fields
    }

   type Frontmatter {
      title: String
      description: String
      date: Date @dateformat
    }
    type Fields {
      slug: String
    }
  `
  return void 0
}

function createNavItemTypes(createTypes: Actions['createTypes']): void {
  /*
    TODO: Explicitly define the siteMetadata {} object;
    This way those will always be defined even if removed from gatsby-config.js
  */
  const typeDefs = `
      type SiteSiteMetadata {
        routes: [Route!]!
      }

      type Route @dontInfer {
        uri: String!
        url: String!
        title: String!
        description: String!
        disabled: Boolean!
        hidden: Boolean!
      }
    `

  createTypes(typeDefs)
}

export const createSchemaCustomization: GatsbyNode['createSchemaCustomization'] =
  ({ actions }) => {
    const { createTypes } = actions
    createNavItemTypes(createTypes)
    createMarkdownRemark(createTypes)
  }
