import type { BasicRecord, OgType, OptionalRecord } from './open-graph-base.ts'
import { type OpenGraphVideoBase, _makeOpenGraphVideoBase } from './open-graph-video-base.ts'
import type { video } from './open-graph-video.ts'
import {
	type MetaBase,
	type OpenGraphMeta,
	PropertyVideoEpisode,
	type Types,
	makeOpenGraphMeta,
	type og,
} from './open-graph.ts'
import { insertIf } from './utils/array.ts'
import type { ValueOf } from './utils/types.ts'

export type IPropertyVideoEpisode = ValueOf<typeof PropertyVideoEpisode>

export type VideoEpisodeRecord =
	| Exclude<BasicRecord, OgType>
	| OgTypeVideoEpisode
	| OptionalRecord
	| OgVideoEpisodeActor
	| OgVideoEpisodeActorRole
	| OgVideoEpisodeDirector
	| OgVideoEpisodeWriter
	| OgVideoEpisodeDuration
	| OgVideoEpisodeReleaseDate
	| OgVideoEpisodeTag
	| OgVideoEpisodeSeries

type VideoEpisodeMetaBase<
	Property extends IPropertyVideoEpisode,
	Content extends Types.Type,
> = MetaBase<Property, Content>

type OgTypeVideoEpisode = MetaBase<og<'type'>, Types.Enum<video<'episode'>>>

/**
 * Actors in the episode.
 * profile array
 */
type OgVideoEpisodeActor = VideoEpisodeMetaBase<og<video<'actor'>>, Types.String>

/**
 * The role they played.
 * string
 */
type OgVideoEpisodeActorRole = VideoEpisodeMetaBase<og<video<'actor:role'>>, Types.String>

/**
 * Directors of the Episode.
 * profile array
 */
type OgVideoEpisodeDirector = VideoEpisodeMetaBase<og<video<'director'>>, Types.String>

/**
 * Writers of the episode.
 * profile array
 */
type OgVideoEpisodeWriter = VideoEpisodeMetaBase<og<video<'writer'>>, Types.String>

/**
 * The episode's length in seconds.
 * integer >=1
 */
type OgVideoEpisodeDuration = VideoEpisodeMetaBase<og<video<'duration'>>, Types.Integer>

/**
 * The date the episode was released.
 * datetime
 */
type OgVideoEpisodeReleaseDate = VideoEpisodeMetaBase<og<video<'release_date'>>, Types.DateTime>

/**
 * Tag words associated with this movie.
 * string array
 */
type OgVideoEpisodeTag = VideoEpisodeMetaBase<og<video<'tag'>>, Types.String>

/**
 * Which series this episode belongs to.
 * video.tv_show
 */
type OgVideoEpisodeSeries = VideoEpisodeMetaBase<og<video<'series'>>, Types.URL>

interface OpenGraphVideoEpisode extends OpenGraphVideoBase {
	ogType: Types.Enum<'video.episode'>

	/**
	 * Which series this episode belongs to.
	 * video.tv_show
	 */
	ogVideoSeries?: Types.URL
}

export function makeOpenGraphVideoEpisode(
	openGraphVideoEpisode: OpenGraphVideoEpisode,
): readonly OpenGraphMeta[] {
	return [
		// BASE_METADATA! + VIDEO_MOVIE_METADATA?
		..._makeOpenGraphVideoBase(openGraphVideoEpisode),

		// VIDEO_SERIES?
		...insertIf(
			openGraphVideoEpisode.ogVideoSeries,
			makeOpenGraphMeta(PropertyVideoEpisode.OG_VIDEO_SERIES),
		),
	]
}
