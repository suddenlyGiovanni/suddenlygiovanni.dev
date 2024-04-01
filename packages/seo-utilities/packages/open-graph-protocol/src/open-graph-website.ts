import type { MetaBase, og, Types } from './open-graph'
import {
  type BasicRecord,
  makeOpenGraphBase,
  type OgType,
  type OpenGraphBaseWithOptional,
  type OptionalRecord,
} from './open-graph-base'

interface OgTypeWebsite extends MetaBase<og<'type'>, Types.Enum<'website'>> {}

export type WebsiteRecord = Exclude<BasicRecord, OgType> | OgTypeWebsite | OptionalRecord

interface OpenGraphWebsite extends OpenGraphBaseWithOptional {
  ogType: Types.Enum<'website'>
}

export function makeOpenGraphWebsite(openGraphWebsite: OpenGraphWebsite) {
  return makeOpenGraphBase(openGraphWebsite)
}
