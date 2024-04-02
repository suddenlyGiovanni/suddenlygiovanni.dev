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
	PropertyMusicAlbum,
	Types,
	makeOpenGraphMeta,
	type og,
} from './open-graph.ts'
import { insertIf } from './utils/array.ts'
import { isArray } from './utils/type-guards.ts'
import type { ValueOf } from './utils/types.ts'

export type IPropertyMusicAlbum = ValueOf<typeof PropertyMusicAlbum>

export type MusicAlbumRecord =
	| Exclude<BasicRecord, OgType>
	| OgTypeMusicAlbum
	| OptionalRecord
	| OgMusicAlbumSong
	| OgMusicAlbumSongDisc
	| OgMusicAlbumSongTrack
	| OgMusicAlbumMusician
	| OgMusicAlbumReleaseDate

interface MusicAlbumMetaBase<Property extends IPropertyMusicAlbum, Content extends Types.Type>
	extends MetaBase<Property, Content> {}

interface OgTypeMusicAlbum extends MetaBase<og<'type'>, Types.Enum<music<'album'>>> {}

/**
 * The song on this album.
 * music.song
 * @link MusicSongRecord
 */
interface OgMusicAlbumSong extends MusicAlbumMetaBase<og<music<'song'>>, Types.URL> {}

/**
 * The same as music:album:disc but in reverse.
 * integer >=1
 * @link MusicSongAlbumDisc
 */
interface OgMusicAlbumSongDisc extends MusicAlbumMetaBase<og<music<'song:disc'>>, Types.Integer> {}

/**
 * The same as music:album:track but in reverse.
 * integer >=1
 * @link MusicSongAlbumTrack
 */
interface OgMusicAlbumSongTrack
	extends MusicAlbumMetaBase<og<music<'song:track'>>, Types.Integer> {}

/**
 * The musician that made this song.
 * profile
 */
interface OgMusicAlbumMusician extends MusicAlbumMetaBase<og<music<'musician'>>, Types.URL> {}

/**
 * The date the album was released.
 * datetime
 */
interface OgMusicAlbumReleaseDate
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

export function makeOpenGraphMusicAlbum(openGraphMusicAlbum: OpenGraphMusicAlbum) {
	return [
		// BASIC_METADATA!
		...makeOpenGraphBase(openGraphMusicAlbum),

		// SONG?
		...insertIf(openGraphMusicAlbum.ogMusicSong, ogMusicSong => {
			return isArray(ogMusicSong)
				? ogMusicSong.map(makeOpenGraphMeta(PropertyMusicAlbum.OG_MUSIC_SONG))
				: makeOpenGraphMeta(PropertyMusicAlbum.OG_MUSIC_SONG, ogMusicSong)
		}).flat(),

		// DISC?
		...insertIf(openGraphMusicAlbum.ogMusicSongDisc, ogMusicSongDisc =>
			makeOpenGraphMeta(
				PropertyMusicAlbum.OG_MUSIC_SONG_DISC,
				Types.Integer(Math.round(ogMusicSongDisc)),
			),
		),

		// TRACK?
		...insertIf(openGraphMusicAlbum.ogMusicSongTrack, ogMusicSongTrack =>
			makeOpenGraphMeta(
				PropertyMusicAlbum.OG_MUSIC_SONG_TRACK,
				Types.Integer(Math.round(ogMusicSongTrack)),
			),
		),

		// MUSICIAN?
		...insertIf(openGraphMusicAlbum.ogMusicMusician, ogMusicMusician =>
			isArray(ogMusicMusician)
				? ogMusicMusician.map(makeOpenGraphMeta(PropertyMusicAlbum.OG_MUSIC_MUSICIAN))
				: makeOpenGraphMeta(PropertyMusicAlbum.OG_MUSIC_MUSICIAN, ogMusicMusician),
		).flat(),

		// RELEASE_DATE?
		...insertIf(
			openGraphMusicAlbum.ogMusicReleaseData,
			makeOpenGraphMeta(PropertyMusicAlbum.OG_MUSIC_RELEASE_DATE),
		),
	]
}
