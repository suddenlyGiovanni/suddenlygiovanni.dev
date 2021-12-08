import type {
  MusicAlbumRecord,
  PropertyMusicAlbum,
} from './open-graph-music-album'
import type {
  MusicPlaylistRecord,
  PropertyMusicPlaylist,
} from './open-graph-music-playlist'
import type {
  PropertyMusicRadioStation,
  RadioStationRecord,
} from './open-graph-music-radio-station'
import type {
  MusicSongRecord,
  PropertyMusicSong,
} from './open-graph-music-song'
import type { BaseOrExtended } from './open-graph'

export type music<T extends string = ''> = BaseOrExtended<'music', T>

export type PropertyMusic =
  | PropertyMusicSong
  | PropertyMusicAlbum
  | PropertyMusicPlaylist
  | PropertyMusicRadioStation

export type MusicRecord =
  | MusicSongRecord
  | MusicAlbumRecord
  | MusicPlaylistRecord
  | RadioStationRecord
