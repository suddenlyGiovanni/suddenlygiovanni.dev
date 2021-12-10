import { insertLazilyIf, isArray } from '@lib/array'
import type { ValueOf } from '@lib/types'

import {
  makeOpenGraphMeta,
  type MetaBase,
  type og,
  type OGType,
  Types,
} from './open-graph'
import {
  type AudioRecord,
  makeOpenGraphAudio,
  type OpenGraphAudio,
  PropertyAudio,
} from './open-graph-audio'
import {
  type Image,
  type ImageRecord,
  makeOpenGraphImage,
  type OpenGraphImage,
  PropertyImage,
} from './open-graph-image'
import {
  makeOpenGraphVideo,
  type OpenGraphVideo,
  PropertyVideo,
  type VideoRecord,
} from './open-graph-video'

export type DelimiterContent = Types.Enum<'' | 'a' | 'an' | 'the' | 'auto'>

export type PropertyBasic = ValueOf<typeof PropertyBasic>

export const PropertyBasic = {
  OG_TITLE: 'og:title',
  OG_TYPE: 'og:type',
  OG_URL: 'og:url',
  OG_DESCRIPTION: 'og:description',
  OG_DETERMINER: 'og:determiner',
  OG_LOCALE: 'og:locale',
  OG_LOCALE_ALTERNATE: 'og:locale:alternate',
  OG_SITE_NAME: 'og:site_name',
  ...PropertyVideo,
  ...PropertyAudio,
  ...PropertyImage,
} as const

/**
 * As an example, the following is the Open Graph protocol markup for The Rock on IMDB:
 * @example
 * ```html
 * <html prefix="og: https://ogp.me/">
 * <head>
 * <title>The Rock (1996)</title>
 * <meta property="og:title" content="The Rock" />
 * <meta property="og:type" content="video.movie" />
 * <meta property="og:url" content="https://www.imdb.com/title/tt0117500/" />
 * <meta property="og:image" content="https://ia.media-imdb.com/images/rock.jpg" />
 * ...
 * </head>
 * ...
 * </html>
 * ```
 */
export type BasicRecord = Title | Type | Image | Url

/**
 * The following properties are optional for any object and are generally recommended
 * For example (line-break solely for display purposes)
 * @example
 * ```html
 * <meta property="og:audio" content="https://example.com/bond/theme.mp3" />
 * <meta property="og:description"
 *   content="Sean Connery found fame and fortune as the
 *            suave, sophisticated British agent, James Bond." />
 * <meta property="og:determiner" content="the" />
 * <meta property="og:locale" content="en_GB" />
 * <meta property="og:locale:alternate" content="fr_FR" />
 * <meta property="og:locale:alternate" content="es_ES" />
 * <meta property="og:site_name" content="IMDb" />
 * <meta property="og:video" content="https://example.com/bond/trailer.swf" />
 * ```
 */
export type OptionalRecord =
  | AudioRecord
  | Description
  | Determiner
  | Locale
  | LocaleAlternate
  | SiteName
  | VideoRecord
  | ImageRecord

/**
 * The title of your object as it should appear within the graph, e.g., "The Rock".
 */
interface Title extends MetaBase<og<'title'>, Types.String> {}

/**
 * The type of your object, e.g., "video.movie".
 * Depending on the type you specify, other properties may also be required.
 */
export interface Type extends MetaBase<og<'type'>, Types.Enum<OGType>> {}

/**
 * The canonical URL of your object that will be used as its permanent ID in the graph, e.g., "https://www.imdb.com/title/tt0117500/".
 */
interface Url extends MetaBase<og<'url'>, Types.URL> {}

/**
 * A one to two sentence description of your object.
 */
interface Description extends MetaBase<og<'description'>, Types.String> {}

/**
 * The word that appears before this object's title in a sentence.
 * An enum of (a, an, the, "", auto).
 * If auto is chosen, the consumer of your data should chose between "a" or "an".
 * Default is "" (blank).
 */
interface Determiner extends MetaBase<og<'determiner'>, DelimiterContent> {}

/**
 * The locale these tags are marked up in. Of the format language_TERRITORY.
 * Default is en_US.
 */
interface Locale extends MetaBase<og<'locale'>, Types.String> {}

/**
 * An array of other locales this page is available in.
 */
interface LocaleAlternate
  extends MetaBase<og<'locale:alternate'>, Types.String> {}

/**
 * If your object is part of a larger website, the name which should be displayed for the overall site.
 * e.g., "IMDb".
 */
interface SiteName extends MetaBase<og<'site_name'>, Types.String> {}

/**
 * To turn your web pages into graph objects, you need to add basic metadata to your page.
 * We've based the initial version of the protocol on RDFa which means that you'll place additional `<meta>` tags in the `<head>` of your web page.
 * The four required properties for every page are:
 */
interface OpenGraphBase {
  /**
   * The title of your object as it should appear within the graph,
   * e.g., “The Rock”.
   */
  ogTitle: Types.String

  /**
   * The type of your object, e.g., "video.movie".
   * Depending on the type you specify, other properties may also be required.
   */
  ogType: Types.Enum<OGType>

  /**
   * An image URL which should represent your object within the graph.
   */
  ogImage: Types.URL | OpenGraphImage | readonly OpenGraphImage[]

  /**
   * The canonical URL of your object that will be used as its permanent ID in the graph, e.g., "https://www.imdb.com/title/tt0117500/".
   */
  ogUrl: Types.URL
}

/**
 * The following properties are optional for any object and are generally recommended:
 */
export interface OpenGraphBaseWithOptional extends OpenGraphBase {
  /** A URL to an audio file to accompany this object. */
  ogAudio?: Types.URL | OpenGraphAudio | readonly OpenGraphAudio[]

  /** A one to two sentence description of your object. */
  ogDescription?: Types.String

  /**
   * The word that appears before this object's title in a sentence. An enum of (a, an, the, "", auto). If auto is chosen, the consumer of your data should chose between "a" or "an". Default is "" (blank)
   */
  ogDeterminer?: DelimiterContent

  /**
   * The locale these tags are marked up in.
   * Of the format language_TERRITORY.
   * Default is en_US.
   */
  ogLocale?: Types.String

  /**
   * An array of other locales this page is available in.
   */
  ogLocaleAlternate?: Types.String | Types.String[]

  /**
   * If your object is part of a larger website, the name which should be displayed for the overall site.
   * A human-readable name for your site, e.g., "IMDb".
   */
  ogSiteName?: Types.String

  /**
   * A URL to a video file that complements this object.
   */
  ogVideo?: Types.URL | OpenGraphVideo | readonly OpenGraphVideo[]
}

export function makeOpenGraphBase({
  ogTitle,
  ogType,
  ogImage,
  ogUrl,
  ...optionalMetadata
}: OpenGraphBaseWithOptional) {
  return [
    // TITLE!
    makeOpenGraphMeta(PropertyBasic.OG_TITLE, ogTitle),

    // TYPE!
    makeOpenGraphMeta(PropertyBasic.OG_TYPE, ogType),

    // IMAGE!
    ...makeOpenGraphImage(ogImage),

    // URL!
    makeOpenGraphMeta(PropertyBasic.OG_URL, ogUrl),

    // AUDIO?
    ...insertLazilyIf(optionalMetadata.ogAudio, makeOpenGraphAudio).flat(),

    // DESCRIPTION?
    ...insertLazilyIf(
      optionalMetadata.ogDescription,
      makeOpenGraphMeta(PropertyBasic.OG_DESCRIPTION)
    ),

    // DETERMINER?
    ...insertLazilyIf(
      optionalMetadata.ogDeterminer,
      makeOpenGraphMeta(PropertyBasic.OG_DETERMINER)
    ),

    // LOCALE?
    ...insertLazilyIf(
      optionalMetadata.ogLocale,
      makeOpenGraphMeta(PropertyBasic.OG_LOCALE)
    ),

    // LOCALE_ALTERNATE?
    ...insertLazilyIf(optionalMetadata.ogLocaleAlternate, (ogLocaleAlternate) =>
      isArray(ogLocaleAlternate)
        ? ogLocaleAlternate.map(
            makeOpenGraphMeta(PropertyBasic.OG_LOCALE_ALTERNATE)
          )
        : makeOpenGraphMeta(
            PropertyBasic.OG_LOCALE_ALTERNATE,
            ogLocaleAlternate
          )
    ).flat(),

    // SITE_NAME?
    ...insertLazilyIf(
      optionalMetadata.ogSiteName,
      makeOpenGraphMeta(PropertyBasic.OG_SITE_NAME)
    ),

    // VIDEO?
    ...insertLazilyIf(optionalMetadata.ogVideo, makeOpenGraphVideo).flat(),
  ]
}
