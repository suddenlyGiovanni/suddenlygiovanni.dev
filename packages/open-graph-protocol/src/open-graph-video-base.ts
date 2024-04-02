import * as Types from './types.ts'
import { type OpenGraphBaseWithOptional, makeOpenGraphBase } from './open-graph-base.ts'
import { type OpenGraphMeta, PropertyVideoBase, makeOpenGraphMeta } from './open-graph.ts'
import { insertIf } from './utils/array.ts'
import { isArray } from './utils/type-guards.ts'

export interface OpenGraphVideoBase extends OpenGraphBaseWithOptional {
	ogType: Types.Enum<'video.movie' | 'video.episode' | 'video.tv_show' | 'video.other'>

	/** Actors in the movie/episode/tv-show/other and the role they played. */
	ogVideoActorAndRole?:
		| { actor: Types.URL; role?: Types.String }
		| readonly { actor: Types.URL; role?: Types.String }[]

	/**
	 * Directors of the movie/episode/tv-show/other.
	 * profile array
	 */
	ogVideoDirector?: Types.URL | readonly Types.URL[]

	/**
	 * Writers of the movie/episode/tv-show/other.
	 * profile array
	 */
	ogVideoWriter?: Types.URL | readonly Types.URL[]

	/**
	 * The movie/episode/tv-show/other's length in seconds.
	 * integer >=1
	 */
	ogVideoDuration?: Types.Integer

	/**
	 * The date the movie/episode/tv-show/other was released.
	 * datetime
	 */
	ogVideoReleaseDate?: Types.DateTime

	/**
	 * Tag words associated with this movie/episode/tv-show/other.
	 * string array
	 */
	ogVideoTag?: Types.String | readonly Types.String[]
}

export function _makeOpenGraphVideoBase(
	openGraphVideoBase: OpenGraphVideoBase,
): readonly OpenGraphMeta[] {
	return [
		// BASIC_METADATA!
		...makeOpenGraphBase(openGraphVideoBase),

		...insertIf(openGraphVideoBase.ogVideoActorAndRole, ogVideoActorAndRole =>
			isArray(ogVideoActorAndRole)
				? ogVideoActorAndRole.map(({ actor, role }) => [
						makeOpenGraphMeta(PropertyVideoBase.OG_VIDEO_ACTOR, actor),
						...insertIf(role, makeOpenGraphMeta(PropertyVideoBase.OG_VIDEO_ACTOR_ROLE)),
					])
				: [
						makeOpenGraphMeta(PropertyVideoBase.OG_VIDEO_ACTOR, ogVideoActorAndRole.actor),
						...insertIf(
							ogVideoActorAndRole.role,
							makeOpenGraphMeta(PropertyVideoBase.OG_VIDEO_ACTOR_ROLE),
						),
					],
		).flat(2),

		// DIRECTORS?
		...insertIf(openGraphVideoBase.ogVideoDirector, ogVideoDirector =>
			isArray(ogVideoDirector)
				? ogVideoDirector.map(makeOpenGraphMeta(PropertyVideoBase.OG_VIDEO_DIRECTOR))
				: makeOpenGraphMeta(PropertyVideoBase.OG_VIDEO_DIRECTOR, ogVideoDirector),
		).flat(),

		// WRITER?
		...insertIf(openGraphVideoBase.ogVideoWriter, ogVideoWriter =>
			isArray(ogVideoWriter)
				? ogVideoWriter.map(makeOpenGraphMeta(PropertyVideoBase.OG_VIDEO_WRITER))
				: makeOpenGraphMeta(PropertyVideoBase.OG_VIDEO_WRITER, ogVideoWriter),
		).flat(),

		// DURATION?
		...insertIf(openGraphVideoBase.ogVideoDuration, ogVideoDuration =>
			makeOpenGraphMeta(
				PropertyVideoBase.OG_VIDEO_DURATION,
				Types.Integer(Math.round(ogVideoDuration)),
			),
		),

		// RELEASE_DATE?
		...insertIf(
			openGraphVideoBase.ogVideoReleaseDate,
			makeOpenGraphMeta(PropertyVideoBase.OG_VIDEO_RELEASE_DATE),
		),

		// TAGS?
		...insertIf(openGraphVideoBase.ogVideoTag, ogVideoTag =>
			isArray(ogVideoTag)
				? ogVideoTag.map(makeOpenGraphMeta(PropertyVideoBase.OG_VIDEO_TAG))
				: makeOpenGraphMeta(PropertyVideoBase.OG_VIDEO_TAG, ogVideoTag),
		).flat(),
	]
}
