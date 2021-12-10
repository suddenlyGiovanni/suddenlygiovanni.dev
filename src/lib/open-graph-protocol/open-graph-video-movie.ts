import {
  _makeOpenGraphVideoBase,
  OpenGraphVideoBase,
} from '@lib/open-graph-protocol/open-graph-video-base'
import { ValueOf } from '@lib/types'
import type { MetaBase, og, Types } from './open-graph'
import type { BasicRecord, OptionalRecord, Type } from './open-graph-base'
import { type video } from './open-graph-video'

export type PropertyVideoMovie = ValueOf<typeof PropertyVideoMovie>
export const PropertyVideoMovie = {
  OG_VIDEO_ACTOR: 'og:video:actor',
  OG_VIDEO_ACTOR_ROLE: 'og:video:actor:role',
  OG_VIDEO_DIRECTOR: 'og:video:director',
  OG_VIDEO_WRITER: 'og:video:writer',
  OG_VIDEO_DURATION: 'og:video:duration',
  OG_VIDEO_RELEASE_DATE: 'og:video:release_date',
  OG_VIDEO_TAG: 'og:video:tag',
} as const

export type VideoMovieRecord =
  | Exclude<BasicRecord, Type>
  | TypeVideoMovie
  | OptionalRecord
  | VideoMovieActor
  | VideoMovieActorRole
  | VideoMovieDirector
  | VideoMovieWriter
  | VideoMovieDuration
  | VideoMovieReleaseDate
  | VideoMovieTag

interface VideoMovieMetaBase<
  Property extends PropertyVideoMovie,
  Content extends Types.Type
> extends MetaBase<Property, Content> {}

export interface TypeVideoMovie
  extends MetaBase<og<'type'>, Types.Enum<video<'movie'>>> {}

/**
 * Actors in the movie.
 * profile array
 */
interface VideoMovieActor
  extends VideoMovieMetaBase<og<video<'actor'>>, Types.URL> {}

/**
 * The role they played.
 * string
 */
interface VideoMovieActorRole
  extends VideoMovieMetaBase<og<video<'actor:role'>>, Types.String> {}

/**
 * Directors of the movie.
 * profile array
 */
interface VideoMovieDirector
  extends VideoMovieMetaBase<og<video<'director'>>, Types.URL> {}

/**
 * Writers of the movie.
 * profile array
 */
interface VideoMovieWriter
  extends VideoMovieMetaBase<og<video<'writer'>>, Types.URL> {}

/**
 * The movie's length in seconds.
 * integer >=1
 */
interface VideoMovieDuration
  extends VideoMovieMetaBase<og<video<'duration'>>, Types.Integer> {}

/**
 * The date the movie was released.
 * datetime
 */
interface VideoMovieReleaseDate
  extends VideoMovieMetaBase<og<video<'release_date'>>, Types.DateTime> {}

/**
 * Tag words associated with this movie.
 * string array
 */
interface VideoMovieTag
  extends VideoMovieMetaBase<og<video<'tag'>>, Types.String> {}

interface OpenGraphVideoMovie extends OpenGraphVideoBase {
  ogType: Types.Enum<'video.movie'>
}

export function makeOpenGraphVideoMovie(
  openGraphVideoMovie: OpenGraphVideoMovie
) {
  return _makeOpenGraphVideoBase(openGraphVideoMovie)
}
