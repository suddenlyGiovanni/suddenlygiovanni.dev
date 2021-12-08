import type { og, Types } from './open-graph'
import {
  makeOpenGraphBase,
  type MetaBase,
  type OpenGraphBaseWithOptional,
} from './open-graph-base'

export interface TypeWebsite
  extends MetaBase<og<'type'>, Types.Enum<'website'>> {}

interface OpenGraphWebsite extends OpenGraphBaseWithOptional {
  ogType: Types.Enum<'website'>
}

export function makeOpenGraphWebsite(openGraphWebsite: OpenGraphWebsite) {
  return makeOpenGraphBase(openGraphWebsite)
}
