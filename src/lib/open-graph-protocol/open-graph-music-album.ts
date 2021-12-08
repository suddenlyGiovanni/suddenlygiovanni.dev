import { insertLazilyIf, isArray } from '@lib/array'

import { makeOpenGraphMeta, type og, Types } from './open-graph'
import {
  makeOpenGraphBase,
  type MetaBase,
  type OpenGraphBaseWithOptional,
} from './open-graph-base'
import type { music } from './open-graph-music'

export type PropertyMusicAlbum =
  | music<'song'>
  | music<'song:disc'>
  | music<'song:track'>
  | music<'musician'>
  | music<'release_date'>

interface MusicAlbumMetaBase<
  Property extends og<PropertyMusicAlbum>,
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
 * @link ProfileMetadata
 */
interface MusicAlbumMusician
  extends MusicAlbumMetaBase<og<music<'musician'>>, Types.URL> {}

/**
 * The date the album was released.
 * datetime
 */
interface MusicAlbumReleaseDate
  extends MusicAlbumMetaBase<og<music<'release_date'>>, Types.DateTime> {}

export type MusicAlbumRecord =
  | TypeMusicAlbum
  | MusicAlbumSong
  | MusicAlbumSongDisc
  | MusicAlbumSongTrack
  | MusicAlbumMusician
  | MusicAlbumReleaseDate

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
        ? ogMusicSong.map(makeOpenGraphMeta('og:music:song'))
        : makeOpenGraphMeta({
            property: 'og:music:song',
            content: ogMusicSong,
          })
    }).flat(),

    // DISC?
    ...insertLazilyIf(openGraphMusicAlbum.ogMusicSongDisc, (ogMusicSongDisc) =>
      makeOpenGraphMeta({
        property: 'og:music:song:disc',
        content: Types.Integer(Math.round(ogMusicSongDisc)),
      })
    ),

    // TRACK?
    ...insertLazilyIf(
      openGraphMusicAlbum.ogMusicSongTrack,
      (ogMusicSongTrack) =>
        makeOpenGraphMeta({
          property: 'og:music:song:track',
          content: Types.Integer(Math.round(ogMusicSongTrack)),
        })
    ),

    // MUSICIAN?
    ...insertLazilyIf(openGraphMusicAlbum.ogMusicMusician, (ogMusicMusician) =>
      isArray(ogMusicMusician)
        ? ogMusicMusician.map(makeOpenGraphMeta('og:music:musician'))
        : makeOpenGraphMeta({
            property: 'og:music:musician',
            content: ogMusicMusician,
          })
    ).flat(),

    // RELEASE_DATE?
    ...insertLazilyIf(
      openGraphMusicAlbum.ogMusicReleaseData,
      makeOpenGraphMeta('og:music:release_date')
    ),
  ]
}
