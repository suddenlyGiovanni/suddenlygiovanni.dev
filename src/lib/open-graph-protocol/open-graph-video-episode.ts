import { insertLazilyIf } from '@lib/array'
import {
  _makeOpenGraphVideoBase,
  OpenGraphVideoBase,
} from '@lib/open-graph-protocol/open-graph-video-base'
import type { ValueOf } from '@lib/types'

import { makeOpenGraphMeta, MetaBase, type og, type Types } from './open-graph'
import type { BasicRecord, OptionalRecord, Type } from './open-graph-base'
import { type video } from './open-graph-video'

export type PropertyVideoEpisode = ValueOf<typeof PropertyVideoEpisode>
export const PropertyVideoEpisode = {
  OG_VIDEO_ACTOR: 'og:video:actor',
  OG_VIDEO_ACTOR_ROLE: 'og:video:actor:role',
  OG_VIDEO_DIRECTOR: 'og:video:director',
  OG_VIDEO_WRITER: 'og:video:writer',
  OG_VIDEO_DURATION: 'og:video:duration',
  OG_VIDEO_RELEASE_DATE: 'og:video:release_date',
  OG_VIDEO_TAG: 'og:video:tag',
  OG_VIDEO_SERIES: 'og:video:series',
} as const

export type VideoEpisodeRecord =
  | Exclude<BasicRecord, Type>
  | TypeVideoEpisode
  | OptionalRecord
  | VideoEpisodeActor
  | VideoEpisodeActorRole
  | VideoEpisodeDirector
  | VideoEpisodeWriter
  | VideoEpisodeDuration
  | VideoEpisodeReleaseDate
  | VideoEpisodeTag
  | VideoEpisodeSeries

interface VideoEpisodeMetaBase<
  Property extends PropertyVideoEpisode,
  Content extends Types.Type
> extends MetaBase<Property, Content> {}

interface TypeVideoEpisode
  extends MetaBase<og<'type'>, Types.Enum<video<'episode'>>> {}

/**
 * Actors in the episode.
 * profile array
 */
interface VideoEpisodeActor
  extends VideoEpisodeMetaBase<og<video<'actor'>>, Types.String> {}

/**
 * The role they played.
 * string
 */
interface VideoEpisodeActorRole
  extends VideoEpisodeMetaBase<og<video<'actor:role'>>, Types.String> {}

/**
 * Directors of the Episode.
 * profile array
 */
interface VideoEpisodeDirector
  extends VideoEpisodeMetaBase<og<video<'director'>>, Types.String> {}

/**
 * Writers of the episode.
 * profile array
 */
interface VideoEpisodeWriter
  extends VideoEpisodeMetaBase<og<video<'writer'>>, Types.String> {}

/**
 * The episode's length in seconds.
 * integer >=1
 */
interface VideoEpisodeDuration
  extends VideoEpisodeMetaBase<og<video<'duration'>>, Types.Integer> {}

/**
 * The date the episode was released.
 * datetime
 */
interface VideoEpisodeReleaseDate
  extends VideoEpisodeMetaBase<og<video<'release_date'>>, Types.DateTime> {}

/**
 * Tag words associated with this movie.
 * string array
 */
interface VideoEpisodeTag
  extends VideoEpisodeMetaBase<og<video<'tag'>>, Types.String> {}

/**
 * Which series this episode belongs to.
 * video.tv_show
 */
interface VideoEpisodeSeries
  extends VideoEpisodeMetaBase<og<video<'series'>>, Types.URL> {}

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
      makeOpenGraphMeta(PropertyVideoEpisode.OG_VIDEO_SERIES)
    ),
  ]
}
