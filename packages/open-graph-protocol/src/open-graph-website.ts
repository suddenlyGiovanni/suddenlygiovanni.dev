import {
	type BasicRecord,
	type OgType,
	type OpenGraphBaseWithOptional,
	type OptionalRecord,
	makeOpenGraphBase,
} from './open-graph-base.ts'
import type { MetaBase, Types, og } from './open-graph.ts'

interface OgTypeWebsite extends MetaBase<og<'type'>, Types.Enum<'website'>> {}

export type WebsiteRecord = Exclude<BasicRecord, OgType> | OgTypeWebsite | OptionalRecord

interface OpenGraphWebsite extends OpenGraphBaseWithOptional {
	ogType: Types.Enum<'website'>
}

export function makeOpenGraphWebsite(openGraphWebsite: OpenGraphWebsite) {
	return makeOpenGraphBase(openGraphWebsite)
}
