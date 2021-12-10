import { insertLazilyIf, isArray } from '@lib/array'
import type { ValueOf } from '@lib/types'

import { makeOpenGraphMeta, MetaBase, type og, Types } from './open-graph'
import {
  type BasicRecord,
  makeOpenGraphBase,
  type OpenGraphBaseWithOptional,
  type OptionalRecord,
  type Type,
} from './open-graph-base'
import type { music } from './open-graph-music'

export type PropertyMusicAlbum = ValueOf<typeof PropertyMusicAlbum>
export const PropertyMusicAlbum = {
  OG_MUSIC_SONG: 'og:music:song',
  OG_MUSIC_SONG_DISC: 'og:music:song:disc',
  OG_MUSIC_SONG_TRACK: 'og:music:song:track',
  OG_MUSIC_RELEASE_DATE: 'og:music:release_date',
  OG_MUSIC_MUSICIAN: 'og:music:musician',
} as const

export type MusicAlbumRecord =
  | Exclude<BasicRecord, Type>
  | TypeMusicAlbum
  | OptionalRecord
  | MusicAlbumSong
  | MusicAlbumSongDisc
  | MusicAlbumSongTrack
  | MusicAlbumMusician
  | MusicAlbumReleaseDate

interface MusicAlbumMetaBase<
  Property extends PropertyMusicAlbum,
  Content extends Types.Type
> extends MetaBase<Property, Content> {}

interface TypeMusicAlbum
  extends MetaBase<og<'type'>, Types.Enum<music<'album'>>> {}

/**
 * The song on this album.
 * music.song
 * @link MusicSongRecord
 */
interface MusicAlbumSong
  extends MusicAlbumMetaBase<og<music<'song'>>, Types.URL> {}

/**
 * The same as music:album:disc but in reverse.
 * integer >=1
 * @link MusicSongAlbumDisc
 */
interface MusicAlbumSongDisc
  extends MusicAlbumMetaBase<og<music<'song:disc'>>, Types.Integer> {}

/**
 * The same as music:album:track but in reverse.
 * integer >=1
 * @link MusicSongAlbumTrack
 */
interface MusicAlbumSongTrack
  extends MusicAlbumMetaBase<og<music<'song:track'>>, Types.Integer> {}

/**
 * The musician that made this song.
 * profile
 */
interface MusicAlbumMusician
  extends MusicAlbumMetaBase<og<music<'musician'>>, Types.URL> {}

/**
 * The date the album was released.
 * datetime
 */
interface MusicAlbumReleaseDate
  extends MusicAlbumMetaBase<og<music<'release_date'>>, Types.DateTime> {}

interface OpenGraphMusicAlbum extends OpenGraphBaseWithOptional {
  /**
   * The type of your object, e.g., "video.movie".
   * Depending on the type you specify, other properties may also be required.
   */
  ogType: Types.Enum<'music.album'>

  /** A song on this album.
   * This is a URL of a page with og type music.song.
   * Multiple music:song tags
   */
  ogMusicSong: Types.URL | readonly Types.URL[]

  /**
   * The disc number this song is on within this album [defaults to ‘1’]
   */
  ogMusicSongDisc?: Types.Integer

  /**
   * The track number of this song on this album [relative to the disc number]
   */
  ogMusicSongTrack?: Types.Integer

  /**
   * The artist of this album.
   * This is a URL of a page with og type profile.
   * Multiple music:musician tags can be specified.
   */
  ogMusicMusician?: Types.URL | readonly Types.URL[]

  /**
   * The date this album was first released, expressed in ISO 8061 format.
   */
  ogMusicReleaseData?: Types.DateTime
}

export function makeOpenGraphMusicAlbum(
  openGraphMusicAlbum: OpenGraphMusicAlbum
) {
  return [
    // BASIC_METADATA!
    ...makeOpenGraphBase(openGraphMusicAlbum),

    // SONG?
    ...insertLazilyIf(openGraphMusicAlbum.ogMusicSong, (ogMusicSong) => {
      return isArray(ogMusicSong)
        ? ogMusicSong.map(makeOpenGraphMeta(PropertyMusicAlbum.OG_MUSIC_SONG))
        : makeOpenGraphMeta(PropertyMusicAlbum.OG_MUSIC_SONG, ogMusicSong)
    }).flat(),

    // DISC?
    ...insertLazilyIf(openGraphMusicAlbum.ogMusicSongDisc, (ogMusicSongDisc) =>
      makeOpenGraphMeta(
        PropertyMusicAlbum.OG_MUSIC_SONG_DISC,
        Types.Integer(Math.round(ogMusicSongDisc))
      )
    ),

    // TRACK?
    ...insertLazilyIf(
      openGraphMusicAlbum.ogMusicSongTrack,
      (ogMusicSongTrack) =>
        makeOpenGraphMeta(
          PropertyMusicAlbum.OG_MUSIC_SONG_TRACK,
          Types.Integer(Math.round(ogMusicSongTrack))
        )
    ),

    // MUSICIAN?
    ...insertLazilyIf(openGraphMusicAlbum.ogMusicMusician, (ogMusicMusician) =>
      isArray(ogMusicMusician)
        ? ogMusicMusician.map(
            makeOpenGraphMeta(PropertyMusicAlbum.OG_MUSIC_MUSICIAN)
          )
        : makeOpenGraphMeta(
            PropertyMusicAlbum.OG_MUSIC_MUSICIAN,
            ogMusicMusician
          )
    ).flat(),

    // RELEASE_DATE?
    ...insertLazilyIf(
      openGraphMusicAlbum.ogMusicReleaseData,
      makeOpenGraphMeta(PropertyMusicAlbum.OG_MUSIC_RELEASE_DATE)
    ),
  ]
}
