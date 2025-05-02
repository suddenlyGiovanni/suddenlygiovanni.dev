import type { MetaBase, OpenGraphMeta, og } from './open-graph.ts'
import type { video } from './open-graph-video.ts'
import { _makeOpenGraphVideoBase, type OpenGraphVideoBase } from './open-graph-video-base.ts'
import type {
	IPropertyVideoMovie,
	OgTypeVideoMovie,
	VideoMovieRecord,
} from './open-graph-video-movie.ts'
import type * as Types from './types.ts'

export type IPropertyVideoTvShow = IPropertyVideoMovie
export type VideoTvShowRecord = Exclude<VideoMovieRecord, OgTypeVideoMovie> | OgTypeVideoTvShow

type OgTypeVideoTvShow = MetaBase<og<'type'>, Types.Enum<video<'tv_show'>>>

interface OpenGraphVideoTvShow extends OpenGraphVideoBase {
	ogType: Types.Enum<'video.tv_show'>
}

export function makeOpenGraphVideoTvShow(
	openGraphVideoTvShow: OpenGraphVideoTvShow,
): readonly OpenGraphMeta[] {
	return _makeOpenGraphVideoBase(openGraphVideoTvShow)
}
