import { insertIf, isArray, type ValueOf } from '@suddenlygiovanni/open-graph-protocol-utils'

import {
  type BaseOrExtended,
  makeOpenGraphMeta,
  type MetaBase,
  type og,
  PropertyArticle,
  Types,
} from './open-graph'
import {
  type BasicRecord,
  makeOpenGraphBase,
  type OgType,
  type OpenGraphBaseWithOptional,
  type OptionalRecord,
} from './open-graph-base'

type article<T extends string = ''> = BaseOrExtended<'article', T>

export type IPropertyArticle = ValueOf<typeof PropertyArticle>

export type ArticleRecord =
  | Exclude<BasicRecord, OgType>
  | OgTypeArticle
  | OptionalRecord
  | OgArticlePublishedTime
  | OgArticleModifiedTime
  | OgArticleExpirationTime
  | OgArticleAuthor
  | OgArticleSection
  | OgArticleTag

interface ArticleMetaBase<Property extends IPropertyArticle, Content extends Types.Type>
  extends MetaBase<Property, Content> {}

/**
 * This object represents an article on a website. It is the preferred type for blog posts and news stories.
 */
interface OgTypeArticle extends MetaBase<og<'type'>, Types.Enum<article>> {}

/**
 * When the article was first published.
 */
interface OgArticlePublishedTime
  extends ArticleMetaBase<og<article<'published_time'>>, Types.DateTime> {}

/**
 * When the article was last changed.
 */
interface OgArticleModifiedTime
  extends ArticleMetaBase<og<article<'modified_time'>>, Types.DateTime> {}

/**
 * When the article is out of date after.
 */
interface OgArticleExpirationTime
  extends ArticleMetaBase<og<article<'expiration_time'>>, Types.DateTime> {}

/**
 * Writers of the article.
 * array of profile
 */
interface OgArticleAuthor extends ArticleMetaBase<og<article<'author'>>, Types.URL> {}

/**
 * A high-level section name. E.g. Technology
 */
interface OgArticleSection extends ArticleMetaBase<og<article<'section'>>, Types.String> {}

/**
 * Tag words associated with this article
 * array of article:tag
 */
interface OgArticleTag extends ArticleMetaBase<og<article<'tag'>>, Types.String> {}

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
    ...insertIf(
      openGraphArticle.ogArticlePublishedTime,
      makeOpenGraphMeta(PropertyArticle.OG_ARTICLE_PUBLISHED_TIME)
    ),

    // MODIFIED_TIME?
    ...insertIf(
      openGraphArticle.ogArticleModifiedTime,
      makeOpenGraphMeta(PropertyArticle.OG_ARTICLE_MODIFIED_TIME)
    ),

    // EXPIRATION_TIME?
    ...insertIf(
      openGraphArticle.ogArticleExpirationTime,
      makeOpenGraphMeta(PropertyArticle.OG_ARTICLE_EXPIRATION_TIME)
    ),

    // AUTHOR?
    ...insertIf(openGraphArticle.ogArticleAuthor, (ogArticleAuthor) =>
      isArray(ogArticleAuthor)
        ? ogArticleAuthor.map(makeOpenGraphMeta(PropertyArticle.OG_ARTICLE_AUTHOR))
        : makeOpenGraphMeta(PropertyArticle.OG_ARTICLE_AUTHOR, ogArticleAuthor)
    ).flat(),

    // SECTION?
    ...insertIf(
      openGraphArticle.ogArticleSection,
      makeOpenGraphMeta(PropertyArticle.OG_ARTICLE_SECTION)
    ),

    // TAG?
    ...insertIf(openGraphArticle.ogArticleTag, (ogArticleTag) =>
      isArray(ogArticleTag)
        ? ogArticleTag.map(makeOpenGraphMeta(PropertyArticle.OG_ARTICLE_TAG))
        : makeOpenGraphMeta(PropertyArticle.OG_ARTICLE_TAG, ogArticleTag)
    ).flat(),
  ]
}
