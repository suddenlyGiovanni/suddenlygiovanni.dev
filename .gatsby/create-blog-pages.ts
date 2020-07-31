import { Actions, Reporter } from 'gatsby'
import { CreatePagesDataQuery } from '../typings/graphql-types'
import { createPosts } from './create-posts'

type Blog = CreatePagesDataQuery['blog']

export function createBlogPages(
  blog: Blog,
  actions: Actions,
  reporter: Reporter
): void {
  if (blog.edges.length <= 0) {
    reporter.error('There are no posts!')
  } else {
    const { edges } = blog
    const { createPage, createRedirect } = actions
    createPosts(createPage, createRedirect, edges)
  }
}
