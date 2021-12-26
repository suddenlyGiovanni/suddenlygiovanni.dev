import { type BaseOf, type Brand, make } from 'ts-brand'
import type { ValueOf } from '@suddenlygiovanni/open-graph-protocol-utils'

import type { ArticleRecord } from './open-graph-article'
import type { BasicRecord, OptionalRecord } from './open-graph-base'
import type { BookRecord } from './open-graph-book'
import type { MusicAlbumRecord } from './open-graph-music-album'
import type { MusicPlaylistRecord } from './open-graph-music-playlist'
import type { RadioStationRecord } from './open-graph-music-radio-station'
import type { MusicSongRecord } from './open-graph-music-song'
import type { ProfileRecord } from './open-graph-profile'
import {
  type IPropertyTwitter,
  makeTwitterCardMeta,
  type TwitterCardMeta,
  type TwitterRecord,
} from './open-graph-twitter'
import type { VideoEpisodeRecord } from './open-graph-video-episode'
import type { VideoMovieRecord } from './open-graph-video-movie'
import type { VideoOtherRecord } from './open-graph-video-other'
import type { VideoTvShowRecord } from './open-graph-video-tvshow'
import type { WebsiteRecord } from './open-graph-website'

export namespace Types {
  /**
   * A Boolean represents a true or false value
   * @example
   * 'true', 'false', '1', '0'
   */
  export type Boolean = Brand<true | false | 1 | 0, 'Boolean'>
  export const Boolean = make<Boolean>()

  type Year = number
  type Month = number
  type Day = number
  type Hours = number
  type Minutes = number

  /**
   * A DateTime represents a temporal value composed of a date (year, month, day) and an optional time component (hours, minutes)
   * We support absolute ISO 8061 timestamps with the timezone defaulting to UTC.
   * The format we are expecting is YYYY-MM-DDThh:mm:ssZ. Z is used to express different time zones, and represents an offset from UTC. Examples:
   *
   * @example
   * January 26th, 2011 = 2011-01-26
   * January 26th, 2011 at 7:15pm = 2011-01-26T19:15
   * January 26th, 2001 at 7:15pm Pacific Standard Time = 2011-01-26T19:15-8:00
   */
  export type DateTime = Brand<
    | `${Year}-${Month}-${Day}`
    | `${Year}-${Month}-${Day}T${Hours}:${Minutes}`
    | `${Year}-${Month}-${Day}T${Hours}:${Minutes}${'+' | '-'}${Hours}:${Minutes}`,
    'DateTime'
  >
  /**
   * converts a `${Year}-${Month}-${Day}` | `${Year}-${Month}-${Day}T${Hours}:${Minutes}` to a OpenGraph `DateTime`
   * @example
   * const instanceOfDateTime:Types.DateTime = Types.DateTime(`${2001}-${09}-${11}`)
   */
  export const DateTime = make<DateTime>()

  /**
   * A 64-bit signed floating point number
   * All literals that conform to the following formats:
   *
   * @example
   * 1.234
   * -1.234
   * 1.2e3
   * -1.2e3
   * 7E-10
   */
  export type Float = Brand<number, 'Float'>

  /**
   * converts a number to a OpenGraph `Float`
   * @example
   * const instanceOfFloat:Types.Float = Types.Float(0.001)
   */
  export const Float = make<Float>()

  /**
   * A 32-bit signed integer. In many languages integers over 32-bits become floats, so we limit Open Graph protocol for easy multi-language use.
   * All literals that conform to the following formats:
   * @example
   * 1234
   * -123
   */
  export type Integer = Brand<number, 'Integer'>

  /**
   * converts a number to a OpenGraph `Integer`
   * @example
   * const instanceOfInteger:Types.Integer = Types.Integer(49)
   */
  export const Integer = make<Integer>()

  /**
   * A sequence of Unicode characters
   * All literals composed of Unicode characters with no escape characters
   */
  export type String<T extends string = string> = Brand<T, 'String'>

  /**
   * converts a string to a OpenGraph `String`
   * @example
   * const instanceOfString:Types.String = Types.String('this is definitely a string')
   */
  export const String = <T extends string = string>(underlying: T) => {
    return make<String<T>>()(underlying as BaseOf<String<T>>)
  }

  /**
   * A sequence of Unicode characters that identify an Internet resource.
   * All valid URLs that utilize the `https://` or `https://` protocols
   */
  export type URL = Brand<string, 'URL'>

  /**
   * converts a string to a OpenGraph `URL`
   * @example
   * const instanceOfURL:Types.URL = Types.URL('https://duckduckgo.com')
   */
  export const URL = make<URL>()

  /**
   * A type consisting of bounded set of constant string values (enumeration members).
   * A string value that is a member of the enumeration
   */
  export type Enum<T extends string = string> = Brand<T, 'Enum'>

  /**
   * converts a union of string to a OpenGraph `Enum`
   * @example
   * const instanceOfEnum:Types.Enum<'foo' | 'bar'> = Types.Enum<'foo', 'bar'>('foo')
   */
  export const Enum = <T extends string = string>(underlying: T) =>
    make<Enum<T>>()(underlying as BaseOf<Enum<T>>)

  /**
   * The Disjoint union type of all the possible Open Graph Protocol types
   * @internal
   */
  export type Type = Boolean | DateTime | Float | Integer | String | URL | Enum
}

export const OGType = {
  WEBSITE: 'website',
  MUSIC_SONG: 'music.song',
  MUSIC_ALBUM: 'music.album',
  MUSIC_PLAYLIST: 'music.playlist',
  MUSIC_RADIO_STATION: 'music.radio_station',
  VIDEO_MOVIE: 'video.movie',
  VIDEO_EPISODE: 'video.episode',
  VIDEO_TV_SHOW: 'video.tv_show',
  VIDEO_OTHER: 'video.other',
  ARTICLE: 'article',
  BOOK: 'book',
  PROFILE: 'profile',
} as const
export type IOGType = ValueOf<typeof OGType>

/**
 * a small subset of all the common MIME types
 */
export type MIME =
  | 'application/x-executable'
  | 'application/graphql'
  | 'application/javascript'
  | 'application/json'
  | 'application/ld+json'
  | 'application/feed+json'
  | 'application/msword'
  | 'application/pdf'
  | 'application/sql'
  | 'application/vnd.api+json'
  | 'application/vnd.ms-excel'
  | 'application/vnd.ms-powerpoint'
  | 'application/vnd.oasis.opendocument.text'
  | 'application/vnd.openxmlformats-officedocument.presentationml.presentation'
  | 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
  | 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  | 'application/x-www-form-urlencoded'
  | 'application/xml'
  | 'application/zip'
  | 'application/zstd'
  | 'application/macbinary'
  | 'audio/mpeg'
  | 'audio/ogg'
  | 'image/apng'
  | 'image/avif'
  | 'image/flif'
  | 'image/gif'
  | 'image/jpeg '
  | 'image/jxl'
  | 'image/png'
  | 'image/svg+xml'
  | 'image/webp'
  | 'image/x-mng'
  | 'multipart/form-data'
  | 'text/css'
  | 'text/csv'
  | 'text/html'
  | 'text/php'
  | 'text/plain'
  | 'text/xml'

export type MIMEContent = Types.Enum<MIME>

export type og<T extends string> = `og:${T}`

export type BaseOrExtended<Base extends string, Extended extends string = ''> = Extended extends ''
  ? Base
  : `${Base}:${Extended}`

export const PropertyImage = {
  OG_IMAGE: 'og:image',
  OG_IMAGE_URL: 'og:image:url',
  OG_IMAGE_SECURE_URL: 'og:image:secure_url',
  OG_IMAGE_TYPE: 'og:image:type',
  OG_IMAGE_WIDTH: 'og:image:width',
  OG_IMAGE_HEIGHT: 'og:image:height',
  OG_IMAGE_ALT: 'og:image:alt',
} as const
export const PropertyAudio = {
  OG_AUDIO: 'og:audio',
  OG_AUDIO_SECURE_URL: 'og:audio:secure_url',
  OG_AUDIO_TYPE: 'og:audio:type',
} as const
export const PropertyVideo = {
  OG_VIDEO: 'og:video',
  OG_VIDEO_ALT: 'og:video:alt',
  OG_VIDEO_HEIGHT: 'og:video:height',
  OG_VIDEO_TYPE: 'og:video:type',
  OG_VIDEO_URL: 'og:video:url',
  OG_VIDEO_WIDTH: 'og:video:width',
  OG_VIDEO_SECURE_URL: 'og:video:secure_url',
} as const
export const PropertyArticle = {
  OG_ARTICLE_PUBLISHED_TIME: 'og:article:published_time',
  OG_ARTICLE_MODIFIED_TIME: 'og:article:modified_time',
  OG_ARTICLE_EXPIRATION_TIME: 'og:article:expiration_time',
  OG_ARTICLE_AUTHOR: 'og:article:author',
  OG_ARTICLE_SECTION: 'og:article:section',
  OG_ARTICLE_TAG: 'og:article:tag',
} as const
export const PropertyBook = {
  OG_BOOK_AUTHOR: 'og:book:author',
  OG_BOOK_ISBN: 'og:book:isbn',
  OG_BOOK_RELEASE_DATE: 'og:book:release_date',
  OG_BOOK_TAG: 'og:book:tag',
} as const
export const PropertyMusicAlbum = {
  OG_MUSIC_SONG: 'og:music:song',
  OG_MUSIC_SONG_DISC: 'og:music:song:disc',
  OG_MUSIC_SONG_TRACK: 'og:music:song:track',
  OG_MUSIC_RELEASE_DATE: 'og:music:release_date',
  OG_MUSIC_MUSICIAN: 'og:music:musician',
} as const
export const PropertyMusicPlaylist = {
  OG_MUSIC_SONG: 'og:music:song',
  OG_MUSIC_SONG_DISC: 'og:music:song:disc',
  OG_MUSIC_SONG_TRACK: 'og:music:song:track',
  OG_MUSIC_CREATOR: 'og:music:creator',
} as const
export const PropertyMusicRadioStation = {
  OG_MUSIC_CREATOR: 'og:music:creator',
} as const
export const PropertyMusicSong = {
  OG_MUSIC_DURATION: 'og:music:duration',
  OG_MUSIC_ALBUM: 'og:music:album',
  OG_MUSIC_ALBUM_DISC: 'og:music:album:disc',
  OG_MUSIC_ALBUM_TRACK: 'og:music:album:track',
  OG_MUSIC_MUSICIAN: 'og:music:musician',
} as const
export const PropertyVideoMovie = {
  OG_VIDEO_ACTOR: 'og:video:actor',
  OG_VIDEO_ACTOR_ROLE: 'og:video:actor:role',
  OG_VIDEO_DIRECTOR: 'og:video:director',
  OG_VIDEO_WRITER: 'og:video:writer',
  OG_VIDEO_DURATION: 'og:video:duration',
  OG_VIDEO_RELEASE_DATE: 'og:video:release_date',
  OG_VIDEO_TAG: 'og:video:tag',
} as const
export const PropertyVideoEpisode = {
  OG_VIDEO_ACTOR: 'og:video:actor',
  OG_VIDEO_ACTOR_ROLE: 'og:video:actor:role',
  OG_VIDEO_DIRECTOR: 'og:video:director',
  OG_VIDEO_WRITER: 'og:video:writer',
  OG_VIDEO_DURATION: 'og:video:duration',
  OG_VIDEO_RELEASE_DATE: 'og:video:release_date',
  OG_VIDEO_TAG: 'og:video:tag',
  OG_VIDEO_SERIES: 'og:video:series',
} as const
export const PropertyVideoOther = {
  OG_VIDEO_ACTOR: 'og:video:actor',
  OG_VIDEO_ACTOR_ROLE: 'og:video:actor:role',
  OG_VIDEO_DIRECTOR: 'og:video:director',
  OG_VIDEO_WRITER: 'og:video:writer',
  OG_VIDEO_DURATION: 'og:video:duration',
  OG_VIDEO_RELEASE_DATE: 'og:video:release_date',
  OG_VIDEO_TAG: 'og:video:tag',
} as const
export const PropertyVideoTvShow = {
  OG_VIDEO_ACTOR: 'og:video:actor',
  OG_VIDEO_ACTOR_ROLE: 'og:video:actor:role',
  OG_VIDEO_DIRECTOR: 'og:video:director',
  OG_VIDEO_WRITER: 'og:video:writer',
  OG_VIDEO_DURATION: 'og:video:duration',
  OG_VIDEO_RELEASE_DATE: 'og:video:release_date',
  OG_VIDEO_TAG: 'og:video:tag',
} as const
export const PropertyProfile = {
  OG_PROFILE_FIRST_NAME: 'og:profile:first_name',
  OG_PROFILE_LAST_NAME: 'og:profile:last_name',
  OG_PROFILE_USERNAME: 'og:profile:username',
  OG_PROFILE_GENDER: 'og:profile:gender',
} as const
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
export const PropertyVideoBase = {
  ...PropertyVideoEpisode,
  ...PropertyVideoMovie,
  ...PropertyVideoOther,
  ...PropertyVideoTvShow,
} as const

export const PropertyOpenGraph = {
  ...PropertyArticle,
  ...PropertyAudio,
  ...PropertyBasic,
  ...PropertyBook,
  ...PropertyImage,
  ...PropertyMusicAlbum,
  ...PropertyMusicPlaylist,
  ...PropertyMusicRadioStation,
  ...PropertyMusicSong,
  ...PropertyProfile,
  ...PropertyVideo,
  ...PropertyVideoEpisode,
  ...PropertyVideoMovie,
  ...PropertyVideoOther,
  ...PropertyVideoTvShow,
} as const

type PropertyOpenGraph = ValueOf<typeof PropertyOpenGraph>

export type OpenGraphRecord =
  | ArticleRecord
  | BasicRecord
  | BookRecord
  | MusicAlbumRecord
  | MusicPlaylistRecord
  | MusicSongRecord
  | OptionalRecord
  | ProfileRecord
  | RadioStationRecord
  | VideoEpisodeRecord
  | VideoMovieRecord
  | VideoOtherRecord
  | VideoTvShowRecord
  | WebsiteRecord

export interface MetaBase<
  Property extends PropertyOpenGraph | IPropertyTwitter = PropertyOpenGraph,
  Content extends Types.Type = Types.Type
> {
  readonly property: Property
  readonly content: Content
}

export interface OpenGraphMeta {
  readonly property: OpenGraphRecord['property']
  readonly content: string
}

/**
 * A polymorphic factory function to produce an OpenGraph record
 * with correct attribute.
 * Can be used by providing a OpenGraphMetadata object or by partially applying
 * the `property` first and the `content` last
 * returns a OpenGraphMeta
 * @see {@link https://developer.twitter.com/en/docs/twitter-for-websites/cards/overview/markup}
 */
export function makeOpenGraphMeta<
  OGRecord extends OpenGraphRecord,
  Property extends OGRecord['property'],
  Content extends OGRecord['content']
>(property: Property): (content: Content) => OpenGraphMeta

export function makeOpenGraphMeta<
  OGRecord extends OpenGraphRecord,
  Property extends OGRecord['property'],
  Content extends OGRecord['content']
>(property: Property, content: Content): OpenGraphMeta

export function makeOpenGraphMeta<
  OGRecord extends OpenGraphRecord,
  Property extends OGRecord['property'],
  Content extends OGRecord['content']
>(
  ...args: [property: Property, content: Content] | [property: Property]
): ((content: Content) => OpenGraphMeta) | OpenGraphMeta {
  if (args.length === 2) {
    const [property, content] = args
    return {
      property,
      content: String(content),
    }
  } else {
    const [property] = args
    return (content: Content): OpenGraphMeta => ({
      property,
      content: String(content),
    })
  }
}

/**
 * A utility fn to produce the correct attributes for the open graph protocol meta tags
 * It also supports Twitter's custom schema
 *
 * @link https://ogp.me/#types
 * @param openGraph
 */
export function makeOpenGraphMetaAttributesRecord(
  openGraph: OpenGraphRecord | TwitterRecord
): TwitterCardMeta | OpenGraphMeta {
  /** TwitterRecord type guard */
  function isTwitterRecord(openGraph: OpenGraphRecord | TwitterRecord): openGraph is TwitterRecord {
    return openGraph.property.includes('twitter', 0)
  }

  return isTwitterRecord(openGraph)
    ? makeTwitterCardMeta(openGraph.property, openGraph.content)
    : makeOpenGraphMeta(openGraph.property, openGraph.content)
}
