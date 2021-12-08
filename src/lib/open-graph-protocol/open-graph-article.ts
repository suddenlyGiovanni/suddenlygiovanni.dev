import { insertLazilyIf, isArray } from '@lib/array'

import {
  type BaseOrExtended,
  makeOpenGraphMeta,
  type og,
  Types,
} from './open-graph'
import {
  makeOpenGraphBase,
  type MetaBase,
  type OpenGraphBaseWithOptional,
} from './open-graph-base'

export type article<T extends string = ''> = BaseOrExtended<'article', T>

export type PropertyArticle =
  | article<'published_time'>
  | article<'modified_time'>
  | article<'expiration_time'>
  | article<'author'>
  | article<'section'>
  | article<'tag'>

interface ArticleMetaBase<
  Property extends og<PropertyArticle>,
  Content extends Types.Type
> extends MetaBase<Property, Content> {}

/**
 * This object represents an article on a website. It is the preferred type for blog posts and news stories.
 */
interface TypeArticle extends MetaBase<og<'type'>, Types.Enum<article>> {}

/**
 * When the article was first published.
 */
interface ArticlePublishedTime
  extends ArticleMetaBase<og<article<'published_time'>>, Types.DateTime> {}

/**
 * When the article was last changed.
 */
interface ArticleModifiedTime
  extends ArticleMetaBase<og<article<'modified_time'>>, Types.DateTime> {}

/**
 * When the article is out of date after.
 */
interface ArticleExpirationTime
  extends ArticleMetaBase<og<article<'expiration_time'>>, Types.DateTime> {}

/**
 * Writers of the article.
 * array of profile
 */
interface ArticleAuthor
  extends ArticleMetaBase<og<article<'author'>>, Types.URL> {}

/**
 * A high-level section name. E.g. Technology
 */
interface ArticleSection
  extends ArticleMetaBase<og<article<'section'>>, Types.String> {}

/**
 * Tag words associated with this article
 * array of article:tag
 */
interface ArticleTag
  extends ArticleMetaBase<og<article<'tag'>>, Types.String> {}

export type ArticleRecord =
  | TypeArticle
  | ArticlePublishedTime
  | ArticleModifiedTime
  | ArticleExpirationTime
  | ArticleAuthor
  | ArticleSection
  | ArticleTag

interface OpenGraphArticle extends OpenGraphBaseWithOptional {
  ogType: Types.Enum<'article'>

  /** When the article was first published. */
  ogArticlePublishedTime?: Types.DateTime

  /** When the article was last changed. */
  ogArticleModifiedTime?: Types.DateTime

  /** When the article is out of date after. */
  ogArticleExpirationTime?: Types.DateTime

  /**
   * Writers of the article.
   * array of profile
   */
  ogArticleAuthor?: Types.URL | readonly Types.URL[]

  /**
   * A high-level section name.
   * E.g. Technology
   */
  ogArticleSection?: Types.String

  /**
   * Tag words associated with this article
   * array of article:tag
   */
  ogArticleTag?: Types.String | readonly Types.String[]
}

export function makeOpenGraphArticle(openGraphArticle: OpenGraphArticle) {
  return [
    // BASIC_METADATA!
    ...makeOpenGraphBase(openGraphArticle),

    // PUBLISHED_TIME?
    ...insertLazilyIf(
      openGraphArticle.ogArticlePublishedTime,
      makeOpenGraphMeta('og:article:published_time')
    ),

    // MODIFIED_TIME?
    ...insertLazilyIf(
      openGraphArticle.ogArticleModifiedTime,
      makeOpenGraphMeta('og:article:modified_time')
    ),

    // EXPIRATION_TIME?
    ...insertLazilyIf(
      openGraphArticle.ogArticleExpirationTime,
      makeOpenGraphMeta('og:article:expiration_time')
    ),

    // AUTHOR?
    ...insertLazilyIf(openGraphArticle.ogArticleAuthor, (ogArticleAuthor) =>
      isArray(ogArticleAuthor)
        ? ogArticleAuthor.map(makeOpenGraphMeta('og:article:author'))
        : makeOpenGraphMeta({
            property: 'og:article:author',
            content: ogArticleAuthor,
          })
    ).flat(),

    // SECTION?
    ...insertLazilyIf(
      openGraphArticle.ogArticleSection,
      makeOpenGraphMeta('og:article:section')
    ),

    // TAG?
    ...insertLazilyIf(openGraphArticle.ogArticleTag, (ogArticleTag) =>
      isArray(ogArticleTag)
        ? ogArticleTag.map(makeOpenGraphMeta('og:article:tag'))
        : makeOpenGraphMeta({
            property: 'og:article:tag',
            content: ogArticleTag,
          })
    ).flat(),
  ]
}
