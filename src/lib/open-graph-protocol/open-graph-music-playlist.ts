import { insertLazilyIf, isArray } from '@lib/array'

import { makeOpenGraphMeta, type og, Types } from './open-graph'
import {
  makeOpenGraphBase,
  type MetaBase,
  type OpenGraphBaseWithOptional,
} from './open-graph-base'
import type { music } from './open-graph-music'

export type PropertyMusicPlaylist =
  | music<'song'>
  | music<'song:disc'>
  | music<'song:track'>
  | music<'creator'>

interface MusicPlaylistMetaBase<
  Property extends og<PropertyMusicPlaylist>,
  Content extends Types.Type
> extends MetaBase<Property, Content> {}

interface TypeMusicPlaylist
  extends MetaBase<og<'type'>, Types.Enum<music<'playlist'>>> {}

/**
 * The song on this playlist.
 * music.song
 * @link MusicSongRecord
 */
interface MusicPlaylistSong
  extends MusicPlaylistMetaBase<og<music<'song'>>, Types.URL> {}

/**
 * The same as music:album:disc but in reverse.
 * integer >=1
 * @link MusicSongAlbumDisc
 */
interface MusicPlaylistSongDisc
  extends MusicPlaylistMetaBase<og<music<'song:disc'>>, Types.Integer> {}

/**
 * The same as music:album:track but in reverse.
 * integer >=1
 * @link MusicSongAlbumTrack
 */
interface MusicPlaylistSongTrack
  extends MusicPlaylistMetaBase<og<music<'song:track'>>, Types.Integer> {}

/**
 * The creator of this playlist.
 * profile
 * @link ProfileMetadata
 */
interface MusicPlaylistCreator
  extends MusicPlaylistMetaBase<og<music<'creator'>>, Types.URL> {}

export type MusicPlaylistRecord =
  | TypeMusicPlaylist
  | MusicPlaylistSong
  | MusicPlaylistSongDisc
  | MusicPlaylistSongTrack
  | MusicPlaylistCreator

interface OpenGraphMusicPlaylist extends OpenGraphBaseWithOptional {
  /** 'music.playlist' */
  ogType: Types.Enum<'music.playlist'>

  /**
   * A song on this playlist.
   * This is a URL of a page with og type music.song.
   * Multiple music:song tags can be specified.
   */
  ogMusicSong?: Types.URL | readonly Types.URL[]

  /** The track number of this song on this playlist. */
  ogMusicSongTrack?: Types.Integer

  /**
   * The creator of this playlist.
   * This is the canonical URL of a page with og type profile.
   * Multiple music:creator tags can be specified.
   */
  ogMusicCreator?: Types.URL | readonly Types.URL[]
}

export function makeOpenGraphMusicPlaylist(
  openGraphMusicPlaylist: OpenGraphMusicPlaylist
) {
  return [
    // BASIC_METADATA!
    ...makeOpenGraphBase(openGraphMusicPlaylist),

    // MUSIC_SONG?
    ...insertLazilyIf(openGraphMusicPlaylist.ogMusicSong, (ogMusicSong) =>
      isArray(ogMusicSong)
        ? ogMusicSong.map(makeOpenGraphMeta('og:music:song'))
        : makeOpenGraphMeta({
            property: 'og:music:song',
            content: ogMusicSong,
          })
    ).flat(),

    // MUSIC_SONG_TRACK?
    ...insertLazilyIf(
      openGraphMusicPlaylist.ogMusicSongTrack,
      makeOpenGraphMeta('og:music:song:track')
    ),

    // MUSIC_CREATOR?
    ...insertLazilyIf(openGraphMusicPlaylist.ogMusicCreator, (ogMusicCreator) =>
      isArray(ogMusicCreator)
        ? ogMusicCreator.map(makeOpenGraphMeta('og:music:creator'))
        : makeOpenGraphMeta({
            property: 'og:music:creator',
            content: ogMusicCreator,
          })
    ).flat(),
  ]
}
