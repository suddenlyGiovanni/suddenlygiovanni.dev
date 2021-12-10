import { _makeOpenGraphVideoBase, type OpenGraphVideoBase } from './open-graph-video-base'
import type { MetaBase, og, Types } from './open-graph'
import { type video } from './open-graph-video'
import type {
  PropertyVideoMovie,
  OgTypeVideoMovie,
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
export type VideoTvShowRecord = Exclude<VideoMovieRecord, OgTypeVideoMovie> | OgTypeVideoTvShow

interface OgTypeVideoTvShow extends MetaBase<og<'type'>, Types.Enum<video<'tv_show'>>> {}

interface OpenGraphVideoTvShow extends OpenGraphVideoBase {
  ogType: Types.Enum<'video.tv_show'>
}

export function makeOpenGraphVideoTvShow(openGraphVideoTvShow: OpenGraphVideoTvShow) {
  return _makeOpenGraphVideoBase(openGraphVideoTvShow)
}
