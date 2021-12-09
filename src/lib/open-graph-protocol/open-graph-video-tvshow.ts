import type { og, Types } from './open-graph'
import type { MetaBase } from './open-graph-base'
import {
  _makeOpenGraphVideoBase,
  type OpenGraphVideoBase,
  type video,
} from './open-graph-video'
import type {
  PropertyVideoMovie,
  TypeVideoMovie,
  VideoMovieRecord,
} from './open-graph-video-movie'

export type PropertyVideoTvShow = PropertyVideoMovie
export const PropertyVideoTvShow = {
  OG_VIDEO_ACTOR: 'og:video:actor',
  OG_VIDEO_ACTOR_ROLE: 'og:video:actor:role',
  OG_VIDEO_DIRECTOR: 'og:video:director',
  OG_VIDEO_WRITER: 'og:video:writer',
  OG_VIDEO_DURATION: 'og:video:duration',
  OG_VIDEO_RELEASE_DATE: 'og:video:release_date',
  OG_VIDEO_TAG: 'og:video:tag',
} as const
export type VideoTvShowRecord =
  | Exclude<VideoMovieRecord, TypeVideoMovie>
  | TypeVideoTvShow

interface TypeVideoTvShow
  extends MetaBase<og<'type'>, Types.Enum<video<'tv_show'>>> {}

interface OpenGraphVideoTvShow extends OpenGraphVideoBase {
  ogType: Types.Enum<'video.tv_show'>
}

export function makeOpenGraphVideoTvShow(
  openGraphVideoTvShow: OpenGraphVideoTvShow
) {
  return _makeOpenGraphVideoBase(openGraphVideoTvShow)
}
