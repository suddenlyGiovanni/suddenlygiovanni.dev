import { insertLazilyIf } from '@lib/array'

import { makeOpenGraphMeta, og, Types } from './open-graph'
import { type MetaBase } from './open-graph-base'
import {
  _makeOpenGraphVideoBase,
  type OpenGraphVideoBase,
  type video,
} from './open-graph-video'

export type PropertyVideoEpisode =
  | video<'actor'>
  | video<'actor:role'>
  | video<'director'>
  | video<'writer'>
  | video<'duration'>
  | video<'release_date'>
  | video<'tag'>
  | video<'series'>

interface VideoEpisodeMetadataBase<
  Property extends og<PropertyVideoEpisode>,
  Content extends Types.Type
> extends MetaBase<Property, Content> {}

interface VideoEpisodeType
  extends MetaBase<og<'type'>, Types.Enum<video<'episode'>>> {}
/**
 * Actors in the episode.
 * profile array
 * @link ProfileMetadata
 */
interface VideoEpisodeActor
  extends VideoEpisodeMetadataBase<og<video<'actor'>>, Types.String> {}

/**
 * The role they played.
 * string
 */
interface VideoEpisodeActorRole
  extends VideoEpisodeMetadataBase<og<video<'actor:role'>>, Types.String> {}

/**
 * Directors of the Episode.
 * profile array
 * @link ProfileMetadata
 */
interface VideoEpisodeDirector
  extends VideoEpisodeMetadataBase<og<video<'director'>>, Types.String> {}

/**
 * Writers of the episode.
 * profile array
 * @link ProfileMetadata
 */
interface VideoEpisodeWriter
  extends VideoEpisodeMetadataBase<og<video<'writer'>>, Types.String> {}

/**
 * The episode's length in seconds.
 * integer >=1
 */
interface VideoEpisodeDuration
  extends VideoEpisodeMetadataBase<og<video<'duration'>>, Types.Integer> {}

/**
 * The date the episode was released.
 * datetime
 */
interface VideoEpisodeReleaseDate
  extends VideoEpisodeMetadataBase<og<video<'release_date'>>, Types.DateTime> {}

/**
 * Tag words associated with this movie.
 * string array
 */
interface VideoEpisodeTag
  extends VideoEpisodeMetadataBase<og<video<'tag'>>, Types.String> {}

/**
 * Which series this episode belongs to.
 * video.tv_show
 */
interface VideoEpisodeSeries
  extends VideoEpisodeMetadataBase<og<video<'series'>>, Types.URL> {}

export type VideoEpisodeRecord =
  | VideoEpisodeType
  | VideoEpisodeActor
  | VideoEpisodeActorRole
  | VideoEpisodeDirector
  | VideoEpisodeWriter
  | VideoEpisodeDuration
  | VideoEpisodeReleaseDate
  | VideoEpisodeTag
  | VideoEpisodeSeries

interface OpenGraphVideoEpisode extends OpenGraphVideoBase {
  ogType: Types.Enum<'video.episode'>

  /**
   * Which series this episode belongs to.
   * video.tv_show
   */
  ogVideoSeries?: Types.URL
}

export function makeOpenGraphVideoEpisode(
  openGraphVideoEpisode: OpenGraphVideoEpisode
) {
  return [
    // BASE_METADATA! + VIDEO_MOVIE_METADATA?
    ..._makeOpenGraphVideoBase(openGraphVideoEpisode),

    // VIDEO_SERIES?
    ...insertLazilyIf(
      openGraphVideoEpisode.ogVideoSeries,
      makeOpenGraphMeta('og:video:series')
    ),
  ]
}
