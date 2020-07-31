import { GatsbyNode } from 'gatsby'
import { createFilePath } from 'gatsby-source-filesystem'

import { config } from '../config/website'

export const onCreateNode: GatsbyNode['onCreateNode'] = (...args): void => {
  const [createNodeArgs, ...rest] = args
  if (createNodeArgs.node.internal.type === 'Mdx') {
    onCreateMdxNode(...args)
  }
}

const onCreateMdxNode: GatsbyNode['onCreateNode'] = ({
  node,
  actions,
  getNode,
}): void => {
  const parentNode = getNode(node.parent)
  const { createNodeField } = actions
  const slug =
    node.frontmatter.slug ||
    createFilePath({ node, getNode, basePath: 'content/blog' })

  createNodeField({ name: 'id', node, value: node.id })

  createNodeField({
    name: 'published',
    node,
    value: node.frontmatter.published,
  })

  createNodeField({ name: 'title', node, value: node.frontmatter.title })

  createNodeField({
    name: 'author',
    node,
    value: node.frontmatter.author || config.author,
  })

  createNodeField({
    name: 'description',
    node,
    value: node.frontmatter.description,
  })

  createNodeField({ name: 'slug', node, value: slug })

  createNodeField({ name: 'date', node, value: node.frontmatter.date })

  createNodeField({
    name: 'categories',
    node,
    value: node.frontmatter.categories || [],
  })

  createNodeField({
    name: 'keywords',
    node,
    value: node.frontmatter.keywords || [],
  })

  createNodeField({
    name: 'redirects',
    node,
    value: node.frontmatter.redirects,
  })

  createNodeField({
    name: 'editLink',
    node,
    value: `https://github.com/suddenlyGiovanni/suddenlygiovanni.dev/edit/master${node.fileAbsolutePath.replace(
      __dirname,
      ''
    )}`,
  })

  createNodeField({
    name: 'historyLink',
    node,
    value: `https://github.com/kentcdodds/kentcdodds.com/commits/master${node.fileAbsolutePath.replace(
      __dirname,
      ''
    )}`,
  })
}
