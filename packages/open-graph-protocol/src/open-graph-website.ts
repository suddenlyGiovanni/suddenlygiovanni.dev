import {
	type BasicRecord,
	type OgType,
	type OpenGraphBaseWithOptional,
	type OptionalRecord,
	makeOpenGraphBase,
} from './open-graph-base.ts'
import type { MetaBase, OpenGraphMeta, Types, og } from './open-graph.ts'

type OgTypeWebsite = MetaBase<og<'type'>, Types.Enum<'website'>>

export type WebsiteRecord = Exclude<BasicRecord, OgType> | OgTypeWebsite | OptionalRecord

interface OpenGraphWebsite extends OpenGraphBaseWithOptional {
	ogType: Types.Enum<'website'>
}

export function makeOpenGraphWebsite(openGraphWebsite: OpenGraphWebsite): readonly OpenGraphMeta[] {
	return makeOpenGraphBase(openGraphWebsite)
}
