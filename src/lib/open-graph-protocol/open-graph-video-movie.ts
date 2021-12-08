import { og, Types } from './open-graph'
import type { MetaBase } from './open-graph-base'
import {
  _makeOpenGraphVideoBase,
  type OpenGraphVideoBase,
  type video,
} from './open-graph-video'

interface VideoMovieType
  extends MetaBase<og<'type'>, Types.Enum<video<'movie'>>> {}

export type PropertyVideoMovie =
  | video<'actor'>
  | video<'actor:role'>
  | video<'director'>
  | video<'writer'>
  | video<'duration'>
  | video<'release_date'>
  | video<'tag'>

interface VideoMovieMetadataBase<
  Property extends og<PropertyVideoMovie>,
  Content extends Types.Type
> extends MetaBase<Property, Content> {}

/**
 * Actors in the movie.
 * profile array
 * @link ProfileMetadata
 */
interface VideoMovieActor
  extends VideoMovieMetadataBase<og<video<'actor'>>, Types.URL> {}

/**
 * The role they played.
 * string
 */
interface VideoMovieActorRole
  extends VideoMovieMetadataBase<og<video<'actor:role'>>, Types.String> {}

/**
 * Directors of the movie.
 * profile array
 */
interface VideoMovieDirector
  extends VideoMovieMetadataBase<og<video<'director'>>, Types.URL> {}

/**
 * Writers of the movie.
 * profile array
 */
interface VideoMovieWriter
  extends VideoMovieMetadataBase<og<video<'writer'>>, Types.URL> {}

/**
 * The movie's length in seconds.
 * integer >=1
 */
interface VideoMovieDuration
  extends VideoMovieMetadataBase<og<video<'duration'>>, Types.Integer> {}

/**
 * The date the movie was released.
 * datetime
 */
interface VideoMovieReleaseDate
  extends VideoMovieMetadataBase<og<video<'release_date'>>, Types.DateTime> {}

/**
 * Tag words associated with this movie.
 * string array
 */
interface VideoMovieTag
  extends VideoMovieMetadataBase<og<video<'tag'>>, Types.String> {}

export type VideoMovieRecord =
  | VideoMovieType
  | VideoMovieActor
  | VideoMovieActorRole
  | VideoMovieDirector
  | VideoMovieWriter
  | VideoMovieDuration
  | VideoMovieReleaseDate
  | VideoMovieTag

interface OpenGraphVideoMovie extends OpenGraphVideoBase {
  ogType: Types.Enum<'video.movie'>
}

export function makeOpenGraphVideoMovie(
  openGraphVideoMovie: OpenGraphVideoMovie
) {
  return _makeOpenGraphVideoBase(openGraphVideoMovie)
}
