import { type OpenGraphVideoBase, _makeOpenGraphVideoBase } from './open-graph-video-base.ts'
import type {
	IPropertyVideoMovie,
	OgTypeVideoMovie,
	VideoMovieRecord,
} from './open-graph-video-movie.ts'
import type { video } from './open-graph-video.ts'
import type { MetaBase, Types, og } from './open-graph.ts'

export type IPropertyVideoTvShow = IPropertyVideoMovie
export type VideoTvShowRecord = Exclude<VideoMovieRecord, OgTypeVideoMovie> | OgTypeVideoTvShow

interface OgTypeVideoTvShow extends MetaBase<og<'type'>, Types.Enum<video<'tv_show'>>> {}

interface OpenGraphVideoTvShow extends OpenGraphVideoBase {
	ogType: Types.Enum<'video.tv_show'>
}

export function makeOpenGraphVideoTvShow(openGraphVideoTvShow: OpenGraphVideoTvShow) {
	return _makeOpenGraphVideoBase(openGraphVideoTvShow)
}
