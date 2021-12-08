import type { og, Types } from './open-graph'
import type { MetaBase } from './open-graph-base'
import {
  _makeOpenGraphVideoBase,
  type OpenGraphVideoBase,
  type video,
} from './open-graph-video'

export interface VideoOtherType
  extends MetaBase<og<'type'>, Types.Enum<video<'other'>>> {}

interface OpenGraphVideoOther extends OpenGraphVideoBase {
  ogType: Types.Enum<'video.other'>
}

export function makeOpenGraphVideoOther(
  openGraphVideoOther: OpenGraphVideoOther
) {
  return _makeOpenGraphVideoBase(openGraphVideoOther)
}
