import type { og, Types } from './open-graph'
import type { MetaBase } from './open-graph-base'
import {
  _makeOpenGraphVideoBase,
  type OpenGraphVideoBase,
  type video,
} from './open-graph-video'

export interface VideoTvShowType
  extends MetaBase<og<'type'>, Types.Enum<video<'tv_show'>>> {}

interface OpenGraphVideoTvShow extends OpenGraphVideoBase {
  ogType: Types.Enum<'video.tv_show'>
}

export function makeOpenGraphVideoTvShow(
  openGraphVideoTvShow: OpenGraphVideoTvShow
) {
  return _makeOpenGraphVideoBase(openGraphVideoTvShow)
}
