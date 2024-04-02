import {
	type BasicRecord,
	type OgType,
	type OpenGraphBaseWithOptional,
	type OptionalRecord,
	makeOpenGraphBase,
} from './open-graph-base.ts'
import { type OpenGraphProfile, makeOpenGraphProfile } from './open-graph-profile.ts'
import {
	type BaseOrExtended,
	type MetaBase,
	type OpenGraphMeta,
	PropertyArticle,
	makeOpenGraphMeta,
	type og,
} from './open-graph.ts'
import type * as Types from './types.ts'
import { insertIf } from './utils/array.ts'
import { isArray } from './utils/type-guards.ts'
import type { ValueOf } from './utils/types.ts'

type Article<T extends string = ''> = BaseOrExtended<'article', T>

export type IPropertyArticle = ValueOf<typeof PropertyArticle>

/**
 * @public
 */
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

type ArticleMetaBase<Property extends IPropertyArticle, Content extends Types.Type> = MetaBase<
	Property,
	Content
>

/**
 * This object represents an article on a website. It is the preferred type for blog posts and news stories.
 */
type OgTypeArticle = MetaBase<og<'type'>, Types.Enum<Article>>

/**
 * When the article was first published.
 */
type OgArticlePublishedTime = ArticleMetaBase<og<Article<'published_time'>>, Types.DateTime>

/**
 * When the article was last changed.
 */
type OgArticleModifiedTime = ArticleMetaBase<og<Article<'modified_time'>>, Types.DateTime>

/**
 * When the article is out of date after.
 */
type OgArticleExpirationTime = ArticleMetaBase<og<Article<'expiration_time'>>, Types.DateTime>

/**
 * Writers of the article.
 * array of profile
 */
type OgArticleAuthor = ArticleMetaBase<og<Article<'author'>>, Types.URL>

/**
 * A high-level section name. E.g. Technology
 */
type OgArticleSection = ArticleMetaBase<og<Article<'section'>>, Types.String>

/**
 * Tag words associated with this article
 * array of article:tag
 */
type OgArticleTag = ArticleMetaBase<og<Article<'tag'>>, Types.String>

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
	 * either a profile url or a OpenGraphProfile object or an array of OpenGraphProfile
	 */
	ogArticleAuthor?: Types.URL | OpenGraphProfile | readonly OpenGraphProfile[]

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

/**
 * factory function to construct `Open Graph Protocol Article` {@see https://ogp.me/#type_article}
 * @param openGraphArticle - an object fulfilling the contract defined by {@link OpenGraphArticle} interface.
 * @returns a correctly form array of {@link OpenGraphMeta} objects.
 * @public
 */
export function makeOpenGraphArticle(openGraphArticle: OpenGraphArticle): readonly OpenGraphMeta[] {
	return [
		// BASIC_METADATA!
		...makeOpenGraphBase(openGraphArticle),

		// PUBLISHED_TIME?
		...insertIf(
			openGraphArticle.ogArticlePublishedTime,
			makeOpenGraphMeta(PropertyArticle.OG_ARTICLE_PUBLISHED_TIME),
		),

		// MODIFIED_TIME?
		...insertIf(
			openGraphArticle.ogArticleModifiedTime,
			makeOpenGraphMeta(PropertyArticle.OG_ARTICLE_MODIFIED_TIME),
		),

		// EXPIRATION_TIME?
		...insertIf(
			openGraphArticle.ogArticleExpirationTime,
			makeOpenGraphMeta(PropertyArticle.OG_ARTICLE_EXPIRATION_TIME),
		),

		// AUTHOR?
		...insertIf(openGraphArticle.ogArticleAuthor, ogArticleAuthor => {
			if (typeof ogArticleAuthor === 'string') {
				return makeOpenGraphMeta(PropertyArticle.OG_ARTICLE_AUTHOR, ogArticleAuthor)
			}
			if (isArray(ogArticleAuthor)) {
				return ogArticleAuthor.map(makeOpenGraphProfile)
			}
			return makeOpenGraphProfile(ogArticleAuthor)
		}).flat(2),

		// SECTION?
		...insertIf(
			openGraphArticle.ogArticleSection,
			makeOpenGraphMeta(PropertyArticle.OG_ARTICLE_SECTION),
		),

		// TAG?
		...insertIf(openGraphArticle.ogArticleTag, ogArticleTag =>
			isArray(ogArticleTag)
				? ogArticleTag.map(makeOpenGraphMeta(PropertyArticle.OG_ARTICLE_TAG))
				: makeOpenGraphMeta(PropertyArticle.OG_ARTICLE_TAG, ogArticleTag),
		).flat(),
	]
}
