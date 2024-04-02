import { _makeOpenGraphVideoBase, type OpenGraphVideoBase } from './open-graph-video-base.ts'
import type { MetaBase, og, PropertyVideoMovie, Types } from './open-graph.ts'
import type { BasicRecord, OgType, OptionalRecord } from './open-graph-base.ts'
import type { video } from './open-graph-video.ts'
import type { ValueOf } from './utils/types.ts'

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

interface VideoMovieMetaBase<Property extends IPropertyVideoMovie, Content extends Types.Type>
  extends MetaBase<Property, Content> {}

export interface OgTypeVideoMovie extends MetaBase<og<'type'>, Types.Enum<video<'movie'>>> {}

/**
 * Actors in the movie.
 * profile array
 */
interface OgVideoMovieActor extends VideoMovieMetaBase<og<video<'actor'>>, Types.URL> {}

/**
 * The role they played.
 * string
 */
interface OgVideoMovieActorRole extends VideoMovieMetaBase<og<video<'actor:role'>>, Types.String> {}

/**
 * Directors of the movie.
 * profile array
 */
interface OgVideoMovieDirector extends VideoMovieMetaBase<og<video<'director'>>, Types.URL> {}

/**
 * Writers of the movie.
 * profile array
 */
interface OgVideoMovieWriter extends VideoMovieMetaBase<og<video<'writer'>>, Types.URL> {}

/**
 * The movie's length in seconds.
 * integer >=1
 */
interface OgVideoMovieDuration extends VideoMovieMetaBase<og<video<'duration'>>, Types.Integer> {}

/**
 * The date the movie was released.
 * datetime
 */
interface OgVideoMovieReleaseDate
  extends VideoMovieMetaBase<og<video<'release_date'>>, Types.DateTime> {}

/**
 * Tag words associated with this movie.
 * string array
 */
interface OgVideoMovieTag extends VideoMovieMetaBase<og<video<'tag'>>, Types.String> {}

interface OpenGraphVideoMovie extends OpenGraphVideoBase {
  ogType: Types.Enum<'video.movie'>
}

export function makeOpenGraphVideoMovie(openGraphVideoMovie: OpenGraphVideoMovie) {
  return _makeOpenGraphVideoBase(openGraphVideoMovie)
}
