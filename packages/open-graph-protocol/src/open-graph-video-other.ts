import { _makeOpenGraphVideoBase, type OpenGraphVideoBase } from './open-graph-video-base'
import type { MetaBase, og, Types } from './open-graph'
import type { video } from './open-graph-video'
import type {
  IPropertyVideoMovie,
  OgTypeVideoMovie,
  VideoMovieRecord,
} from './open-graph-video-movie'

export type IPropertyVideoOther = IPropertyVideoMovie

interface OgTypeVideoOther extends MetaBase<og<'type'>, Types.Enum<video<'other'>>> {}

export type VideoOtherRecord = Exclude<VideoMovieRecord, OgTypeVideoMovie> | OgTypeVideoOther

interface OpenGraphVideoOther extends OpenGraphVideoBase {
  ogType: Types.Enum<'video.other'>
}

export function makeOpenGraphVideoOther(openGraphVideoOther: OpenGraphVideoOther) {
  return _makeOpenGraphVideoBase(openGraphVideoOther)
}
