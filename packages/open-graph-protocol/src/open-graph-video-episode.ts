import { insertLazilyIf, type ValueOf } from '@suddenlygiovanni/open-graph-protocol-utils'

import { _makeOpenGraphVideoBase, type OpenGraphVideoBase } from './open-graph-video-base'
import {
  makeOpenGraphMeta,
  type MetaBase,
  type og,
  PropertyVideoEpisode,
  type Types,
} from './open-graph'
import type { BasicRecord, OgType, OptionalRecord } from './open-graph-base'
import { type video } from './open-graph-video'

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

interface VideoEpisodeMetaBase<Property extends IPropertyVideoEpisode, Content extends Types.Type>
  extends MetaBase<Property, Content> {}

interface OgTypeVideoEpisode extends MetaBase<og<'type'>, Types.Enum<video<'episode'>>> {}

/**
 * Actors in the episode.
 * profile array
 */
interface OgVideoEpisodeActor extends VideoEpisodeMetaBase<og<video<'actor'>>, Types.String> {}

/**
 * The role they played.
 * string
 */
interface OgVideoEpisodeActorRole
  extends VideoEpisodeMetaBase<og<video<'actor:role'>>, Types.String> {}

/**
 * Directors of the Episode.
 * profile array
 */
interface OgVideoEpisodeDirector
  extends VideoEpisodeMetaBase<og<video<'director'>>, Types.String> {}

/**
 * Writers of the episode.
 * profile array
 */
interface OgVideoEpisodeWriter extends VideoEpisodeMetaBase<og<video<'writer'>>, Types.String> {}

/**
 * The episode's length in seconds.
 * integer >=1
 */
interface OgVideoEpisodeDuration
  extends VideoEpisodeMetaBase<og<video<'duration'>>, Types.Integer> {}

/**
 * The date the episode was released.
 * datetime
 */
interface OgVideoEpisodeReleaseDate
  extends VideoEpisodeMetaBase<og<video<'release_date'>>, Types.DateTime> {}

/**
 * Tag words associated with this movie.
 * string array
 */
interface OgVideoEpisodeTag extends VideoEpisodeMetaBase<og<video<'tag'>>, Types.String> {}

/**
 * Which series this episode belongs to.
 * video.tv_show
 */
interface OgVideoEpisodeSeries extends VideoEpisodeMetaBase<og<video<'series'>>, Types.URL> {}

interface OpenGraphVideoEpisode extends OpenGraphVideoBase {
  ogType: Types.Enum<'video.episode'>

  /**
   * Which series this episode belongs to.
   * video.tv_show
   */
  ogVideoSeries?: Types.URL
}

export function makeOpenGraphVideoEpisode(openGraphVideoEpisode: OpenGraphVideoEpisode) {
  return [
    // BASE_METADATA! + VIDEO_MOVIE_METADATA?
    ..._makeOpenGraphVideoBase(openGraphVideoEpisode),

    // VIDEO_SERIES?
    ...insertLazilyIf(
      openGraphVideoEpisode.ogVideoSeries,
      makeOpenGraphMeta(PropertyVideoEpisode.OG_VIDEO_SERIES)
    ),
  ]
}
