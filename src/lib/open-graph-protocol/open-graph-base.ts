import { insertLazilyIf, isArray } from '@lib/array'

import {
  type BaseOrExtended,
  makeOpenGraphMeta,
  type og,
  type PropertyOpenGraph,
  Types,
} from './open-graph'
import {
  type audio,
  type Audio,
  type AudioKeys,
  makeOpenGraphAudio,
  type OpenGraphAudio,
} from './open-graph-audio'
import {
  type image,
  type Image,
  type ImageKeys,
  makeOpenGraphImage,
  type OpenGraphImage,
} from './open-graph-image'

import type { PropertyTwitter } from './open-graph-twitter'
import {
  makeOpenGraphVideo,
  type OpenGraphVideo,
  type OptionalVideoMetadata,
  type video,
  type VideoKeys,
} from './open-graph-video'
import type { TypeWebsite } from './open-graph-website'

export type PropertyBasic =
  | 'title'
  | 'type'
  | (image | image<ImageKeys>)
  | 'url'
  | (audio | audio<AudioKeys>)
  | 'description'
  | 'determiner'
  | (locale | locale<'alternate'>)
  | 'site_name'
  | (video | video<VideoKeys>)

export type TypeContent = Types.Enum<
  | 'website'
  | 'music.song'
  | 'music.album'
  | 'music.playlist'
  | 'music.radio_station'
  | 'video.movie'
  | 'video.episode'
  | 'video.tv_show'
  | 'video.other'
  | 'article'
  | 'book'
  | 'profile'
>

export interface MetaBase<
  Property extends PropertyOpenGraph | PropertyTwitter = PropertyOpenGraph,
  Content extends Types.Type = Types.Type
> {
  property: Property
  content: Content
}

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
  ogType: TypeContent

  /**
   * An image URL which should represent your object within the graph.
   */
  ogImage: Types.URL | OpenGraphImage | readonly OpenGraphImage[]

  /**
   * The canonical URL of your object that will be used as its permanent ID in the graph, e.g., "https://www.imdb.com/title/tt0117500/".
   */
  ogUrl: Types.URL
}

type DelimiterContent = Types.Enum<'' | 'a' | 'an' | 'the' | 'auto'>

/**
 * The title of your object as it should appear within the graph, e.g., "The Rock".
 */
interface Title extends MetaBase<og<'title'>, Types.String> {}

/**
 * The type of your object, e.g., "video.movie".
 * Depending on the type you specify, other properties may also be required.
 */
interface Type extends MetaBase<og<'type'>, TypeContent> {}

/**
 * The canonical URL of your object that will be used as its permanent ID in the graph, e.g., "https://www.imdb.com/title/tt0117500/".
 */
interface Url extends MetaBase<og<'url'>, Types.URL> {}

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

export type locale<T extends string = ''> = BaseOrExtended<'locale', T>

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
 * If your object is part of a larger website, the name which should be displayed for the overall site. e.g., "IMDb".
 */
interface SiteName extends MetaBase<og<'site_name'>, Types.String> {}

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
  | Audio
  | Description
  | Determiner
  | Locale
  | LocaleAlternate
  | SiteName
  | OptionalVideoMetadata
  | TypeWebsite

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
    makeOpenGraphMeta({ property: 'og:title', content: ogTitle }),

    // TYPE!
    makeOpenGraphMeta({ property: 'og:type', content: ogType }),

    // IMAGE!
    ...makeOpenGraphImage(ogImage),

    // URL!
    makeOpenGraphMeta({ property: 'og:url', content: ogUrl }),

    // AUDIO?
    ...insertLazilyIf(optionalMetadata.ogAudio, makeOpenGraphAudio).flat(),

    // DESCRIPTION?
    ...insertLazilyIf(
      optionalMetadata.ogDescription,
      makeOpenGraphMeta('og:description')
    ),

    // DETERMINER?
    ...insertLazilyIf(
      optionalMetadata.ogDeterminer,
      makeOpenGraphMeta('og:determiner')
    ),

    // LOCALE?
    ...insertLazilyIf(
      optionalMetadata.ogLocale,
      makeOpenGraphMeta('og:locale')
    ),

    // LOCALE_ALTERNATE?
    ...insertLazilyIf(optionalMetadata.ogLocaleAlternate, (ogLocaleAlternate) =>
      isArray(ogLocaleAlternate)
        ? ogLocaleAlternate.map(makeOpenGraphMeta('og:locale:alternate'))
        : makeOpenGraphMeta({
            property: 'og:locale:alternate',
            content: ogLocaleAlternate,
          })
    ).flat(),

    // SITE_NAME?
    ...insertLazilyIf(
      optionalMetadata.ogSiteName,
      makeOpenGraphMeta('og:site_name')
    ),

    // VIDEO?
    ...insertLazilyIf(optionalMetadata.ogVideo, makeOpenGraphVideo).flat(),
  ]
}
