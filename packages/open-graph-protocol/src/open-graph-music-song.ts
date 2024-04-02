import {
  type BasicRecord,
  type OgType,
  type OpenGraphBaseWithOptional,
  type OptionalRecord,
  makeOpenGraphBase,
} from './open-graph-base.ts'
import type { music } from './open-graph-music.ts'
import { type MetaBase, PropertyMusicSong, Types, makeOpenGraphMeta, type og } from './open-graph.ts'
import { insertIf } from './utils/array.ts'
import { isArray } from './utils/type-guards.ts'
import type { ValueOf } from './utils/types.ts'

export type IPropertyMusicSong = ValueOf<typeof PropertyMusicSong>

export type MusicSongRecord =
  | Exclude<BasicRecord, OgType>
  | OgTypeMusicSong
  | OptionalRecord
  | OgMusicSongDuration
  | OgMusicSongAlbum
  | OgMusicSongAlbumDisc
  | OgMusicSongAlbumTrack
  | OgMusicSongMusician

interface MusicSongMetaBase<Property extends IPropertyMusicSong, Content extends Types.Type>
  extends MetaBase<Property, Content> {}

interface OgTypeMusicSong extends MetaBase<og<'type'>, Types.Enum<music<'song'>>> {}

/**
 * The song's length in seconds.
 * integer >=1
 */
interface OgMusicSongDuration extends MusicSongMetaBase<og<music<'duration'>>, Types.Integer> {}

/**
 * The album this song is from.
 * music.album array
 */
interface OgMusicSongAlbum extends MusicSongMetaBase<og<music<'album'>>, Types.URL> {}

/**
 * Which disc of the album this song is on.
 * integer >=1
 */
export interface OgMusicSongAlbumDisc
  extends MusicSongMetaBase<og<music<'album:disc'>>, Types.Integer> {}

/**
 * Which track this song is.
 * integer >=1
 */
export interface OgMusicSongAlbumTrack
  extends MusicSongMetaBase<og<music<'album:track'>>, Types.Integer> {}

/**
 * The musician that made this song.
 * profile array
 */
interface OgMusicSongMusician extends MusicSongMetaBase<og<music<'musician'>>, Types.String> {}

interface OpenGraphMusicSong extends OpenGraphBaseWithOptional {
  /**
   * The type of your object, e.g., "video.movie".
   * Depending on the type you specify, other properties may also be required.
   */
  ogType: Types.Enum<'music.song'>

  /** The song's length in seconds. integer >=1 */
  ogMusicDuration?: Types.Integer

  /** The album this song is from. music.album array */
  ogMusicAlbum?: Types.URL | Types.URL[]

  /** Which disc of the album this song is on. integer >=1 */
  ogMusicAlbumDisc?: Types.Integer

  /** Which track this song is. integer >=1 */
  ogMusicAlbumTrack?: Types.Integer

  /** The musician that made this song. profile array */
  ogMusicMusician?: Types.URL | Types.URL[]
}

export function makeOpenGraphMusicSong(openGraphMusicSong: OpenGraphMusicSong) {
  return [
    // BASIC_METADATA!
    ...makeOpenGraphBase(openGraphMusicSong),

    // DURATION?
    ...insertIf(openGraphMusicSong.ogMusicDuration, (ogMusicDuration) =>
      makeOpenGraphMeta(
        PropertyMusicSong.OG_MUSIC_DURATION,
        Types.Integer(Math.round(ogMusicDuration))
      )
    ),

    // ALBUM?
    ...insertIf(openGraphMusicSong.ogMusicAlbum, (ogMusicAlbum) =>
      isArray(ogMusicAlbum)
        ? ogMusicAlbum.map(makeOpenGraphMeta(PropertyMusicSong.OG_MUSIC_ALBUM))
        : makeOpenGraphMeta(PropertyMusicSong.OG_MUSIC_ALBUM, ogMusicAlbum)
    ).flat(),

    // DISC?
    ...insertIf(openGraphMusicSong.ogMusicAlbumDisc, (ogMusicAlbumDisc) =>
      makeOpenGraphMeta(
        PropertyMusicSong.OG_MUSIC_ALBUM_DISC,
        Types.Integer(Math.round(ogMusicAlbumDisc))
      )
    ),

    // TRACK?
    ...insertIf(openGraphMusicSong.ogMusicAlbumTrack, (ogMusicAlbumTrack) =>
      makeOpenGraphMeta(
        PropertyMusicSong.OG_MUSIC_ALBUM_TRACK,
        Types.Integer(Math.round(ogMusicAlbumTrack))
      )
    ),

    // MUSICIAN?
    ...insertIf(openGraphMusicSong.ogMusicMusician, (ogMusicMusician) =>
      isArray(ogMusicMusician)
        ? ogMusicMusician.map(makeOpenGraphMeta(PropertyMusicSong.OG_MUSIC_MUSICIAN))
        : makeOpenGraphMeta(PropertyMusicSong.OG_MUSIC_MUSICIAN, ogMusicMusician)
    ).flat(),
  ]
}
