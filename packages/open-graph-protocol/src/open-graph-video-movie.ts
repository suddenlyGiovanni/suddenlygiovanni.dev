import type { MetaBase, OpenGraphMeta, og, PropertyVideoMovie } from './open-graph.ts'
import type { BasicRecord, OgType, OptionalRecord } from './open-graph-base.ts'
import type { video } from './open-graph-video.ts'
import { _makeOpenGraphVideoBase, type OpenGraphVideoBase } from './open-graph-video-base.ts'
import type * as Types from './types.ts'
import type { ValueOf } from './utils/index.ts'

export type IPropertyVideoMovie = ValueOf<typeof PropertyVideoMovie>

export type VideoMovieRecord =
	| Exclude<BasicRecord, OgType>
	| OgTypeVideoMovie
	| OptionalRecord
	| OgVideoMovieActor
	| OgVideoMovieActorRole
	| OgVideoMovieDirector
	| OgVideoMovieWriter
	| OgVideoMovieDuration
	| OgVideoMovieReleaseDate
	| OgVideoMovieTag

type VideoMovieMetaBase<Property extends IPropertyVideoMovie, Content extends Types.Type> = MetaBase<Property, Content>

export type OgTypeVideoMovie = MetaBase<og<'type'>, Types.Enum<video<'movie'>>>

/**
 * Actors in the movie.
 * profile array
 */
type OgVideoMovieActor = VideoMovieMetaBase<og<video<'actor'>>, Types.URL>

/**
 * The role they played.
 * string
 */
type OgVideoMovieActorRole = VideoMovieMetaBase<og<video<'actor:role'>>, Types.String>

/**
 * Directors of the movie.
 * profile array
 */
type OgVideoMovieDirector = VideoMovieMetaBase<og<video<'director'>>, Types.URL>

/**
 * Writers of the movie.
 * profile array
 */
type OgVideoMovieWriter = VideoMovieMetaBase<og<video<'writer'>>, Types.URL>

/**
 * The movie's length in seconds.
 * integer >=1
 */
type OgVideoMovieDuration = VideoMovieMetaBase<og<video<'duration'>>, Types.Integer>

/**
 * The date the movie was released.
 * datetime
 */
type OgVideoMovieReleaseDate = VideoMovieMetaBase<og<video<'release_date'>>, Types.DateTime>

/**
 * Tag words associated with this movie.
 * string array
 */
type OgVideoMovieTag = VideoMovieMetaBase<og<video<'tag'>>, Types.String>

interface OpenGraphVideoMovie extends OpenGraphVideoBase {
	ogType: Types.Enum<'video.movie'>
}

export function makeOpenGraphVideoMovie(openGraphVideoMovie: OpenGraphVideoMovie): readonly OpenGraphMeta[] {
	return _makeOpenGraphVideoBase(openGraphVideoMovie)
}
