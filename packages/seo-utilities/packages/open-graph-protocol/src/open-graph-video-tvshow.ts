import { _makeOpenGraphVideoBase, type OpenGraphVideoBase } from './open-graph-video-base'
import type { MetaBase, og, Types } from './open-graph'
import type { video } from './open-graph-video'
import type {
  IPropertyVideoMovie,
  OgTypeVideoMovie,
  VideoMovieRecord,
} from './open-graph-video-movie'

export type IPropertyVideoTvShow = IPropertyVideoMovie
export type VideoTvShowRecord = Exclude<VideoMovieRecord, OgTypeVideoMovie> | OgTypeVideoTvShow

interface OgTypeVideoTvShow extends MetaBase<og<'type'>, Types.Enum<video<'tv_show'>>> {}

interface OpenGraphVideoTvShow extends OpenGraphVideoBase {
  ogType: Types.Enum<'video.tv_show'>
}

export function makeOpenGraphVideoTvShow(openGraphVideoTvShow: OpenGraphVideoTvShow) {
  return _makeOpenGraphVideoBase(openGraphVideoTvShow)
}
