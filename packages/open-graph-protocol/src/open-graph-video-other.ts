import type { MetaBase, OpenGraphMeta, og } from './open-graph.ts'
import type { video } from './open-graph-video.ts'
import { _makeOpenGraphVideoBase, type OpenGraphVideoBase } from './open-graph-video-base.ts'
import type { IPropertyVideoMovie, OgTypeVideoMovie, VideoMovieRecord } from './open-graph-video-movie.ts'
import type * as Types from './types.ts'

export type IPropertyVideoOther = IPropertyVideoMovie

type OgTypeVideoOther = MetaBase<og<'type'>, Types.Enum<video<'other'>>>

export type VideoOtherRecord = Exclude<VideoMovieRecord, OgTypeVideoMovie> | OgTypeVideoOther

interface OpenGraphVideoOther extends OpenGraphVideoBase {
	ogType: Types.Enum<'video.other'>
}

export function makeOpenGraphVideoOther(openGraphVideoOther: OpenGraphVideoOther): readonly OpenGraphMeta[] {
	return _makeOpenGraphVideoBase(openGraphVideoOther)
}
