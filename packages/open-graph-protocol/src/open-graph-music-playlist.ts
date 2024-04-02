import {
	type BasicRecord,
	type OgType,
	type OpenGraphBaseWithOptional,
	type OptionalRecord,
	makeOpenGraphBase,
} from './open-graph-base.ts'
import type { music } from './open-graph-music.ts'
import {
	type MetaBase,
	type PropertyMusicPlaylist,
	type Types,
	makeOpenGraphMeta,
	type og,
} from './open-graph.ts'
import { insertIf } from './utils/array.ts'
import { isArray } from './utils/type-guards.ts'
import type { ValueOf } from './utils/types.ts'

export type IPropertyMusicPlaylist = ValueOf<typeof PropertyMusicPlaylist>

export type MusicPlaylistRecord =
	| Exclude<BasicRecord, OgType>
	| OgTypeMusicPlaylist
	| OptionalRecord
	| OgMusicPlaylistSong
	| OgMusicPlaylistSongDisc
	| OgMusicPlaylistSongTrack
	| OgMusicPlaylistCreator

interface MusicPlaylistMetaBase<Property extends IPropertyMusicPlaylist, Content extends Types.Type>
	extends MetaBase<Property, Content> {}

interface OgTypeMusicPlaylist extends MetaBase<og<'type'>, Types.Enum<music<'playlist'>>> {}

/**
 * The song on this playlist.
 * music.song
 * @link MusicSongRecord
 */
interface OgMusicPlaylistSong extends MusicPlaylistMetaBase<og<music<'song'>>, Types.URL> {}

/**
 * The same as music:album:disc but in reverse.
 * integer >=1
 * @link MusicSongAlbumDisc
 */
interface OgMusicPlaylistSongDisc
	extends MusicPlaylistMetaBase<og<music<'song:disc'>>, Types.Integer> {}

/**
 * The same as music:album:track but in reverse.
 * integer >=1
 * @link MusicSongAlbumTrack
 */
interface OgMusicPlaylistSongTrack
	extends MusicPlaylistMetaBase<og<music<'song:track'>>, Types.Integer> {}

/**
 * The creator of this playlist.
 * profile
 */
interface OgMusicPlaylistCreator extends MusicPlaylistMetaBase<og<music<'creator'>>, Types.URL> {}

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

export function makeOpenGraphMusicPlaylist(openGraphMusicPlaylist: OpenGraphMusicPlaylist) {
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
