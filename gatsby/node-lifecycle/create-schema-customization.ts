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

function createSiteSiteMetadata(createTypes: Actions['createTypes']): void {
  /*
    Explicitly define the siteMetadata {} object;
    This way those will always be defined even if removed from gatsby-config.js
  */
  const typeDefs = `
    type Route @dontInfer {

      # The unique identifier for the route
      uri: String!

      # Just the URL Path segment eg. \`/todos\` \`/blog\`
      url: String!

      # The human readable name to display
      title: String!

      # A description for the route
      description: String!

      # Defines if the route should be not reachable
      disabled: Boolean!

      # Defines if the Route should be hidden
      hidden: Boolean!
    }

    #type SiteSiteMetadata @dontInfer {
    #  routes: [Route!]!
    #}

    type Author @dontInfer {

      # Name of the Author
      name: String!

      # A short summary of the Author
      summary: String!
    }

    type Social @dontInfer {
      # Twitter handle
      twitter: String!

      # GitHub handle
      github: String!

      # LinkedIn handle
      linkedin: String!
    }

    type SiteSiteMetadata @dontInfer {
      # The site Author
      author: Author!

      # Navigation and Site Title
      title: String!

      # Alternative Site title for SEO
      titleAlt: String!

      # Additional Tile parts for base case
      titleTemplate: String!

      # Domain of your site. No trailing slash!
      url: String!

      # Description of the content of the Site
      description: String!

      # Used for SEO and manifest, path to your image you placed in the 'static' folder
      image: String!

      # A text description of the image conveying the essential nature of an image to users who are visually impaired. Maximum 420 characters.
      imageAlt: String!

      language: String!

      locale: String!

      # The list of all static defined routes
      routes: [Route!]!

      # A list of meaningful keywords capturing the essence of the site content
      keywords: [String!]!

      social: Social!
    }
  `

  createTypes(typeDefs)
}

export const createSchemaCustomization: GatsbyNode['createSchemaCustomization'] =
  ({ actions }) => {
    const { createTypes } = actions
    createSiteSiteMetadata(createTypes)
    createMarkdownRemark(createTypes)
  }
