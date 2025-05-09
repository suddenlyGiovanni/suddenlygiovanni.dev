import type { MetaBase, OpenGraphMeta, og } from './open-graph.ts'
import {
	type BasicRecord,
	makeOpenGraphBase,
	type OgType,
	type OpenGraphBaseWithOptional,
	type OptionalRecord,
} from './open-graph-base.ts'
import type * as Types from './types.ts'

type OgTypeWebsite = MetaBase<og<'type'>, Types.Enum<'website'>>

export type WebsiteRecord = Exclude<BasicRecord, OgType> | OgTypeWebsite | OptionalRecord

interface OpenGraphWebsite extends OpenGraphBaseWithOptional {
	ogType: Types.Enum<'website'>
}

export function makeOpenGraphWebsite(openGraphWebsite: OpenGraphWebsite): readonly OpenGraphMeta[] {
	return makeOpenGraphBase(openGraphWebsite)
}
