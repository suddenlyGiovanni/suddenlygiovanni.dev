import { type MetaBase, makeOpenGraphMeta, type OpenGraphMeta, type og, PropertyMusicAlbum } from './open-graph.ts'
import {
	type BasicRecord,
	makeOpenGraphBase,
	type OgType,
	type OpenGraphBaseWithOptional,
	type OptionalRecord,
} from './open-graph-base.ts'
import type { music } from './open-graph-music.ts'
import * as Types from './types.ts'
import { insertIf, isArray, type ValueOf } from './utils/index.ts'

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

type MusicAlbumMetaBase<Property extends IPropertyMusicAlbum, Content extends Types.Type> = MetaBase<Property, Content>

type OgTypeMusicAlbum = MetaBase<og<'type'>, Types.Enum<music<'album'>>>

/**
 * The song on this album.
 * music.song
 * @link MusicSongRecord
 */
type OgMusicAlbumSong = MusicAlbumMetaBase<og<music<'song'>>, Types.URL>

/**
 * The same as music:album:disc but in reverse.
 * integer >=1
 * @link MusicSongAlbumDisc
 */
type OgMusicAlbumSongDisc = MusicAlbumMetaBase<og<music<'song:disc'>>, Types.Integer>

/**
 * The same as music:album:track but in reverse.
 * integer >=1
 * @link MusicSongAlbumTrack
 */
type OgMusicAlbumSongTrack = MusicAlbumMetaBase<og<music<'song:track'>>, Types.Integer>

/**
 * The musician that made this song.
 * profile
 */
type OgMusicAlbumMusician = MusicAlbumMetaBase<og<music<'musician'>>, Types.URL>

/**
 * The date the album was released.
 * datetime
 */
type OgMusicAlbumReleaseDate = MusicAlbumMetaBase<og<music<'release_date'>>, Types.DateTime>

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

export function makeOpenGraphMusicAlbum(openGraphMusicAlbum: OpenGraphMusicAlbum): readonly OpenGraphMeta[] {
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
			makeOpenGraphMeta(PropertyMusicAlbum.OG_MUSIC_SONG_DISC, Types.Integer(Math.round(ogMusicSongDisc))),
		),

		// TRACK?
		...insertIf(openGraphMusicAlbum.ogMusicSongTrack, ogMusicSongTrack =>
			makeOpenGraphMeta(PropertyMusicAlbum.OG_MUSIC_SONG_TRACK, Types.Integer(Math.round(ogMusicSongTrack))),
		),

		// MUSICIAN?
		...insertIf(openGraphMusicAlbum.ogMusicMusician, ogMusicMusician =>
			isArray(ogMusicMusician)
				? ogMusicMusician.map(makeOpenGraphMeta(PropertyMusicAlbum.OG_MUSIC_MUSICIAN))
				: makeOpenGraphMeta(PropertyMusicAlbum.OG_MUSIC_MUSICIAN, ogMusicMusician),
		).flat(),

		// RELEASE_DATE?
		...insertIf(openGraphMusicAlbum.ogMusicReleaseData, makeOpenGraphMeta(PropertyMusicAlbum.OG_MUSIC_RELEASE_DATE)),
	]
}
