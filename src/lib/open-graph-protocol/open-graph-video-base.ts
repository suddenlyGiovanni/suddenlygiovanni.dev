import { insertLazilyIf, isArray } from '@lib/array'

import { makeOpenGraphMeta, Types } from './open-graph'
import { makeOpenGraphBase, OpenGraphBaseWithOptional } from './open-graph-base'
import { PropertyVideoEpisode } from './open-graph-video-episode'
import { PropertyVideoMovie } from './open-graph-video-movie'
import { PropertyVideoOther } from './open-graph-video-other'
import { PropertyVideoTvShow } from './open-graph-video-tvshow'

const PropertyVideoBase = {
  ...PropertyVideoEpisode,
  ...PropertyVideoMovie,
  ...PropertyVideoOther,
  ...PropertyVideoTvShow,
} as const

export interface OpenGraphVideoBase extends OpenGraphBaseWithOptional {
  ogType: Types.Enum<
    'video.movie' | 'video.episode' | 'video.tv_show' | 'video.other'
  >

  /** Actors in the movie/episode/tv-show/other and the role they played. */
  ogVideoActorAndRole?:
    | { actor: Types.URL; role?: Types.String }
    | readonly { actor: Types.URL; role?: Types.String }[]

  /**
   * Directors of the movie/episode/tv-show/other.
   * profile array
   */
  ogVideoDirector?: Types.URL | readonly Types.URL[]

  /**
   * Writers of the movie/episode/tv-show/other.
   * profile array
   */
  ogVideoWriter?: Types.URL | readonly Types.URL[]

  /**
   * The movie/episode/tv-show/other's length in seconds.
   * integer >=1
   */
  ogVideoDuration?: Types.Integer

  /**
   * The date the movie/episode/tv-show/other was released.
   * datetime
   */
  ogVideoReleaseDate?: Types.DateTime

  /**
   * Tag words associated with this movie/episode/tv-show/other.
   * string array
   */
  ogVideoTag?: Types.String | readonly Types.String[]
}

export function _makeOpenGraphVideoBase(
  openGraphVideoBase: OpenGraphVideoBase
) {
  return [
    // BASIC_METADATA!
    ...makeOpenGraphBase(openGraphVideoBase),

    ...insertLazilyIf(
      openGraphVideoBase.ogVideoActorAndRole,
      (ogVideoActorAndRole) =>
        isArray(ogVideoActorAndRole)
          ? ogVideoActorAndRole.map(({ actor, role }) => [
              makeOpenGraphMeta(PropertyVideoBase.OG_VIDEO_ACTOR, actor),
              ...insertLazilyIf(
                role,
                makeOpenGraphMeta(PropertyVideoBase.OG_VIDEO_ACTOR_ROLE)
              ),
            ])
          : [
              makeOpenGraphMeta(
                PropertyVideoBase.OG_VIDEO_ACTOR,
                ogVideoActorAndRole.actor
              ),
              ...insertLazilyIf(
                ogVideoActorAndRole.role,
                makeOpenGraphMeta(PropertyVideoBase.OG_VIDEO_ACTOR_ROLE)
              ),
            ]
    ).flat(2),

    // DIRECTORS?
    ...insertLazilyIf(openGraphVideoBase.ogVideoDirector, (ogVideoDirector) =>
      isArray(ogVideoDirector)
        ? ogVideoDirector.map(
            makeOpenGraphMeta(PropertyVideoBase.OG_VIDEO_DIRECTOR)
          )
        : makeOpenGraphMeta(
            PropertyVideoBase.OG_VIDEO_DIRECTOR,
            ogVideoDirector
          )
    ).flat(),

    // WRITER?
    ...insertLazilyIf(openGraphVideoBase.ogVideoWriter, (ogVideoWriter) =>
      isArray(ogVideoWriter)
        ? ogVideoWriter.map(
            makeOpenGraphMeta(PropertyVideoBase.OG_VIDEO_WRITER)
          )
        : makeOpenGraphMeta(PropertyVideoBase.OG_VIDEO_WRITER, ogVideoWriter)
    ).flat(),

    // DURATION?
    ...insertLazilyIf(openGraphVideoBase.ogVideoDuration, (ogVideoDuration) =>
      makeOpenGraphMeta(
        PropertyVideoBase.OG_VIDEO_DURATION,
        Types.Integer(Math.round(ogVideoDuration))
      )
    ),

    // RELEASE_DATE?
    ...insertLazilyIf(
      openGraphVideoBase.ogVideoReleaseDate,
      makeOpenGraphMeta(PropertyVideoBase.OG_VIDEO_RELEASE_DATE)
    ),

    // TAGS?
    ...insertLazilyIf(openGraphVideoBase.ogVideoTag, (ogVideoTag) =>
      isArray(ogVideoTag)
        ? ogVideoTag.map(makeOpenGraphMeta(PropertyVideoBase.OG_VIDEO_TAG))
        : makeOpenGraphMeta(PropertyVideoBase.OG_VIDEO_TAG, ogVideoTag)
    ).flat(),
  ]
}
