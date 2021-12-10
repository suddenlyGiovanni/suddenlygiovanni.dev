import type { ValueOf } from '@seo-utilities/utils'

import { _makeOpenGraphVideoBase, OpenGraphVideoBase } from './open-graph-video-base'
import type { MetaBase, og, Types } from './open-graph'
import type { BasicRecord, OptionalRecord, OgType } from './open-graph-base'
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

interface VideoMovieMetaBase<Property extends PropertyVideoMovie, Content extends Types.Type>
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
