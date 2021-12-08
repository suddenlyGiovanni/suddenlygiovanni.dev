import { insertLazilyIf, isArray } from '@lib/array'

import { makeOpenGraphMeta, type og, Types } from './open-graph'
import {
  makeOpenGraphBase,
  type MetaBase,
  type OpenGraphBaseWithOptional,
} from './open-graph-base'
import type { music } from './open-graph-music'

export type PropertyMusicSong =
  | music<'duration'>
  | music<'album'>
  | music<'album:disc'>
  | music<'album:track'>
  | music<'musician'>

interface MusicSongMetaBase<
  Property extends og<PropertyMusicSong>,
  Content extends Types.Type
> extends MetaBase<Property, Content> {}

interface TypeMusicSong
  extends MetaBase<og<'type'>, Types.Enum<music<'song'>>> {}

/**
 * The song's length in seconds.
 * integer >=1
 */
interface MusicSongDuration
  extends MusicSongMetaBase<og<music<'duration'>>, Types.Integer> {}

/**
 * The album this song is from.
 * music.album array
 */
interface MusicSongAlbum
  extends MusicSongMetaBase<og<music<'album'>>, Types.URL> {}

/**
 * Which disc of the album this song is on.
 * integer >=1
 */
export interface MusicSongAlbumDisc
  extends MusicSongMetaBase<og<music<'album:disc'>>, Types.Integer> {}

/**
 * Which track this song is.
 * integer >=1
 */
export interface MusicSongAlbumTrack
  extends MusicSongMetaBase<og<music<'album:track'>>, Types.Integer> {}

/**
 * The musician that made this song.
 * profile array
 * @link ProfileMetadata
 */
interface MusicSongMusician
  extends MusicSongMetaBase<og<music<'musician'>>, Types.String> {}

export type MusicSongRecord =
  | TypeMusicSong
  | MusicSongDuration
  | MusicSongAlbum
  | MusicSongAlbumDisc
  | MusicSongAlbumTrack
  | MusicSongMusician

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
    ...insertLazilyIf(openGraphMusicSong.ogMusicDuration, (ogMusicDuration) =>
      makeOpenGraphMeta({
        property: 'og:music:duration',
        content: Types.Integer(Math.round(ogMusicDuration)),
      })
    ),

    // ALBUM?
    ...insertLazilyIf(openGraphMusicSong.ogMusicAlbum, (ogMusicAlbum) =>
      isArray(ogMusicAlbum)
        ? ogMusicAlbum.map(makeOpenGraphMeta('og:music:album'))
        : makeOpenGraphMeta({
            property: 'og:music:album',
            content: ogMusicAlbum,
          })
    ).flat(),

    // DISC?
    ...insertLazilyIf(openGraphMusicSong.ogMusicAlbumDisc, (ogMusicAlbumDisc) =>
      makeOpenGraphMeta({
        property: 'og:music:album:disc',
        content: Types.Integer(Math.round(ogMusicAlbumDisc)),
      })
    ),

    // TRACK?
    ...insertLazilyIf(
      openGraphMusicSong.ogMusicAlbumTrack,
      (ogMusicAlbumTrack) =>
        makeOpenGraphMeta({
          property: 'og:music:album:track',
          content: Types.Integer(Math.round(ogMusicAlbumTrack)),
        })
    ),

    // MUSICIAN?
    ...insertLazilyIf(openGraphMusicSong.ogMusicMusician, (ogMusicMusician) =>
      isArray(ogMusicMusician)
        ? ogMusicMusician.map(makeOpenGraphMeta('og:music:musician'))
        : makeOpenGraphMeta({
            property: 'og:music:musician',
            content: ogMusicMusician,
          })
    ).flat(),
  ]
}
