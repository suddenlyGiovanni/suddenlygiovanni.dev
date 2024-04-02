import { type OpenGraphVideoBase, _makeOpenGraphVideoBase } from './open-graph-video-base.ts'
import type {
	IPropertyVideoMovie,
	OgTypeVideoMovie,
	VideoMovieRecord,
} from './open-graph-video-movie.ts'
import type { video } from './open-graph-video.ts'
import type { MetaBase, Types, og } from './open-graph.ts'

export type IPropertyVideoOther = IPropertyVideoMovie

interface OgTypeVideoOther extends MetaBase<og<'type'>, Types.Enum<video<'other'>>> {}

export type VideoOtherRecord = Exclude<VideoMovieRecord, OgTypeVideoMovie> | OgTypeVideoOther

interface OpenGraphVideoOther extends OpenGraphVideoBase {
	ogType: Types.Enum<'video.other'>
}

export function makeOpenGraphVideoOther(openGraphVideoOther: OpenGraphVideoOther) {
	return _makeOpenGraphVideoBase(openGraphVideoOther)
}
