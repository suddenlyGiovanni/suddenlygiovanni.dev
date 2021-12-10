import type { ValueOf } from '@lib/types'
import { type BaseOf, type Brand, make } from '@lib/brand'

import { type ArticleRecord, PropertyArticle } from './open-graph-article'
import { PropertyAudio } from './open-graph-audio'
import {
  type BasicRecord,
  type OptionalRecord,
  PropertyBasic,
} from './open-graph-base'
import { type BookRecord, PropertyBook } from './open-graph-book'
import { PropertyImage } from './open-graph-image'
import {
  type MusicAlbumRecord,
  PropertyMusicAlbum,
} from './open-graph-music-album'
import {
  type MusicPlaylistRecord,
  PropertyMusicPlaylist,
} from './open-graph-music-playlist'
import {
  PropertyMusicRadioStation,
  type RadioStationRecord,
} from './open-graph-music-radio-station'
import {
  type MusicSongRecord,
  PropertyMusicSong,
} from './open-graph-music-song'
import { type ProfileRecord, PropertyProfile } from './open-graph-profile'
import {
  makeTwitterCardMeta,
  PropertyTwitter,
  type TwitterCardMeta,
  type TwitterRecord,
} from './open-graph-twitter'
import { PropertyVideo } from './open-graph-video'
import {
  PropertyVideoEpisode,
  type VideoEpisodeRecord,
} from './open-graph-video-episode'
import {
  PropertyVideoMovie,
  type VideoMovieRecord,
} from './open-graph-video-movie'
import {
  PropertyVideoOther,
  type VideoOtherRecord,
} from './open-graph-video-other'
import {
  PropertyVideoTvShow,
  type VideoTvShowRecord,
} from './open-graph-video-tvshow'
import type { WebsiteRecord } from './open-graph-website'

/**
 * The
 */
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
    | `${Year}-${Month}-${Day}T${Hours}:${Minutes}${
        | '+'
        | '-'}${Hours}:${Minutes}`,
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
export type OGType = ValueOf<typeof OGType>

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

export type BaseOrExtended<
  Base extends string,
  Extended extends string = ''
> = Extended extends '' ? Base : `${Base}:${Extended}`

type PropertyOpenGraph =
  | PropertyArticle
  | PropertyBasic
  | PropertyBook
  | PropertyMusicAlbum
  | PropertyMusicPlaylist
  | PropertyMusicRadioStation
  | PropertyMusicSong
  | PropertyProfile
  | PropertyVideo
  | PropertyVideoEpisode
  | PropertyVideoMovie
  | PropertyVideoOther
  | PropertyVideoTvShow

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
  Property extends PropertyOpenGraph | PropertyTwitter = PropertyOpenGraph,
  Content extends Types.Type = Types.Type
> {
  property: Property
  content: Content
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
 * @link https://developer.twitter.com/en/docs/twitter-for-websites/cards/overview/markup
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
  function isTwitterRecord(
    openGraph: OpenGraphRecord | TwitterRecord
  ): openGraph is TwitterRecord {
    return openGraph.property.includes('twitter', 0)
  }

  return isTwitterRecord(openGraph)
    ? makeTwitterCardMeta(openGraph.property, openGraph.content)
    : makeOpenGraphMeta(openGraph.property, openGraph.content)
}
