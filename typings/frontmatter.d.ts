export type PostCategory = 'test' | 'none'
export type PostKeyword = 'typescript' | 'none'

/** date in the string format 'DD-MM-YYYY' */
export type Date = string

export interface PostFrontmatter {
  /** the title of the blog post */
  title: string

  /** the identifier of the blog post */
  slug: string

  /** the date of when the bog post was written */
  date: Date

  /** the author of the bog post */
  author: string

  /** the description of the content of the blog post */
  description: string

  /** a list of categories to which the post belongs to */
  categories: PostCategory[]

  /** a list of keyword use to quickly identify the content of the blog post */
  keywords: PostKeyword[]

  /** the banner image to display in the post-preview.tsx */
  banner: string

  /** the banner image owner */
  bannerCredit: string

  /** a boolean value identifying if the blog post should be published */
  published: boolean
  unlisted: boolean
  redirects: string[]
}
