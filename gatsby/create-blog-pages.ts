import type { Actions, Reporter } from 'gatsby'

export const createBlogPages = (
  blog: any,
  actions: Actions,
  reporter: Reporter
): void => {
  if (blog.edges.lenght <= 0) {
    reporter.error('There are no post to create!!!')
  } else {
    // do stuff!!!!
  }
}
