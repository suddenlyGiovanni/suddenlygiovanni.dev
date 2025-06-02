import {
	type MetaBase,
	makeOpenGraphMeta,
	type OpenGraphMeta,
	type og,
	type PropertyMusicPlaylist,
} from './open-graph.ts'
import {
	type BasicRecord,
	makeOpenGraphBase,
	type OgType,
	type OpenGraphBaseWithOptional,
	type OptionalRecord,
} from './open-graph-base.ts'
import type { music } from './open-graph-music.ts'
import type * as Types from './types.ts'
import { insertIf, isArray, type ValueOf } from './utils/index.ts'

export type IPropertyMusicPlaylist = ValueOf<typeof PropertyMusicPlaylist>

export type MusicPlaylistRecord =
	| Exclude<BasicRecord, OgType>
	| OgTypeMusicPlaylist
	| OptionalRecord
	| OgMusicPlaylistSong
	| OgMusicPlaylistSongDisc
	| OgMusicPlaylistSongTrack
	| OgMusicPlaylistCreator

type MusicPlaylistMetaBase<Property extends IPropertyMusicPlaylist, Content extends Types.Type> = MetaBase<
	Property,
	Content
>

type OgTypeMusicPlaylist = MetaBase<og<'type'>, Types.Enum<music<'playlist'>>>

/**
 * The song on this playlist.
 * music.song
 * @link MusicSongRecord
 */
type OgMusicPlaylistSong = MusicPlaylistMetaBase<og<music<'song'>>, Types.URL>

/**
 * The same as music:album:disc but in reverse.
 * integer >=1
 * @link MusicSongAlbumDisc
 */
type OgMusicPlaylistSongDisc = MusicPlaylistMetaBase<og<music<'song:disc'>>, Types.Integer>

/**
 * The same as music:album:track but in reverse.
 * integer >=1
 * @link MusicSongAlbumTrack
 */
type OgMusicPlaylistSongTrack = MusicPlaylistMetaBase<og<music<'song:track'>>, Types.Integer>

/**
 * The creator of this playlist.
 * profile
 */
type OgMusicPlaylistCreator = MusicPlaylistMetaBase<og<music<'creator'>>, Types.URL>

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

export function makeOpenGraphMusicPlaylist(openGraphMusicPlaylist: OpenGraphMusicPlaylist): readonly OpenGraphMeta[] {
	return [
		// BASIC_METADATA!
		...makeOpenGraphBase(openGraphMusicPlaylist),

		// MUSIC_SONG?
		...insertIf(openGraphMusicPlaylist.ogMusicSong, ogMusicSong =>
			isArray(ogMusicSong)
				? ogMusicSong.map(makeOpenGraphMeta('og:music:song'))
				: makeOpenGraphMeta('og:music:song', ogMusicSong),
		).flat(),

		// MUSIC_SONG_TRACK?
		...insertIf(openGraphMusicPlaylist.ogMusicSongTrack, makeOpenGraphMeta('og:music:song:track')),

		// MUSIC_CREATOR?
		...insertIf(openGraphMusicPlaylist.ogMusicCreator, ogMusicCreator =>
			isArray(ogMusicCreator)
				? ogMusicCreator.map(makeOpenGraphMeta('og:music:creator'))
				: makeOpenGraphMeta('og:music:creator', ogMusicCreator),
		).flat(),
	]
}
