import type { GatsbyNode, Node } from 'gatsby'
import { createFilePath } from 'gatsby-source-filesystem'
import { config } from '../config/website'

interface Frontmatter {
  slug: string
  published: boolean
  title: string
  author: string
  description: string
  date: string
  categories: string[]
  redirects: string
}

interface NodeWithFrontmatter extends Node {
  frontmatter: Partial<Frontmatter>
}

const onCreateMdxNode: GatsbyNode['onCreateNode'] = ({
  node,
  actions,
  getNode,
}): void => {
  const { frontmatter } = node as NodeWithFrontmatter
  const parentNode = getNode(node.parent)
  const { createNodeField } = actions

  const slug =
    frontmatter?.slug ||
    createFilePath({
      node,
      getNode,
      basePath: 'content/blog',
    })
  createNodeField({ name: 'slug', node, value: slug })
  createNodeField({ name: 'id', node, value: node.id })
  createNodeField({
    name: 'published',
    node,
    value: frontmatter?.published || false,
  })
  createNodeField({
    name: 'title',
    node,
    value: frontmatter.title || 'Missing `frontmatter title`',
  })
  createNodeField({
    name: 'author',
    node,
    value: frontmatter.author || config.author,
  })
  createNodeField({
    name: 'description',
    node,
    value: frontmatter.description || 'Missing `frontmatter description`',
  })
  createNodeField({
    name: 'date',
    node,
    value: frontmatter.date || new Date('1986-02-13').toISOString(),
  })
  createNodeField({
    name: 'categories',
    node,
    value: frontmatter.categories || [],
  })
  createNodeField({
    name: 'redirects',
    node,
    value: frontmatter.redirects,
  })
  createNodeField({
    name: 'editLink',
    node,
    value: `https://github.com/suddenlyGiovanni/suddenlygiovanni.dev/edit/master${(
      node.fileAbsolutePath as string
    ).replace(__dirname, '')}`,
  })
  createNodeField({
    name: 'historyLink',
    node,
    value: `https://github.com/suddenlyGiovanni/suddenlygiovanni.dev/commits/master${(
      node.fileAbsolutePath as string
    ).replace(__dirname, '')}`,
  })
}

export const onCreateNode: GatsbyNode['onCreateNode'] = (...args): void => {
  const [createNodeArgs, ...rest] = args

  if (createNodeArgs.node.internal.type === 'Mdx') {
    onCreateMdxNode(...args)
  }
}
