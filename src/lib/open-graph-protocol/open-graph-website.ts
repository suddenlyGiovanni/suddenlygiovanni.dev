import type { og, Types } from './open-graph'
import {
  type BasicRecord,
  makeOpenGraphBase,
  type MetaBase,
  type OpenGraphBaseWithOptional,
  type OptionalRecord,
  type Type,
} from './open-graph-base'

interface TypeWebsite extends MetaBase<og<'type'>, Types.Enum<'website'>> {}

export type WebsiteRecord =
  | Exclude<BasicRecord, Type>
  | TypeWebsite
  | OptionalRecord

interface OpenGraphWebsite extends OpenGraphBaseWithOptional {
  ogType: Types.Enum<'website'>
}

export function makeOpenGraphWebsite(openGraphWebsite: OpenGraphWebsite) {
  return makeOpenGraphBase(openGraphWebsite)
}
