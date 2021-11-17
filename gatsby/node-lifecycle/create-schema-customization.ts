import type { Actions, GatsbyNode } from 'gatsby'

function createNavItemTypes(createTypes: Actions['createTypes']) {
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
  }
