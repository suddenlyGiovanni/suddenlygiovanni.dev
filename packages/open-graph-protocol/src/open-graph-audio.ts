import {
	type BaseOrExtended,
	type MIMEContent,
	type MetaBase,
	type OpenGraphMeta,
	PropertyAudio,
	type Types,
	makeOpenGraphMeta,
	type og,
} from './open-graph.ts'
import { insertIf } from './utils/array.ts'
import { isArray } from './utils/type-guards.ts'
import type { ValueOf } from './utils/types.ts'

type Audio<T extends string = ''> = BaseOrExtended<'audio', T>

export type IPropertyAudio = ValueOf<typeof PropertyAudio>

type AudioMetaBase<Property extends IPropertyAudio, Content extends Types.Type> = MetaBase<
	Property,
	Content
>

/** A URL to an audio file to accompany this object. */
export type OgAudio = AudioMetaBase<og<Audio>, Types.URL>

/** An alternate url to use if the webpage requires HTTPS. */
type OgAudioSecureUrl = AudioMetaBase<og<Audio<'secure_url'>>, Types.URL>

/** A MIME type for this audio. */
type OgAudioType = AudioMetaBase<og<Audio<'type'>>, MIMEContent>

/**
 * The og:audio tag only has the first 3 properties available (since size doesn't make sense for sound):
 * @example
 * ```html
 * <meta property="og:audio" content="https://example.com/sound.mp3" />
 * <meta property="og:audio:secure_url" content="https://secure.example.com/sound.mp3" />
 * <meta property="og:audio:type" content="audio/mpeg" />
 * ```
 */
export type AudioRecord = OgAudio | OgAudioSecureUrl | OgAudioType

export interface OpenGraphAudio {
	/** An audio URL which should represent your object within the graph */
	ogAudio: Types.URL

	/** An alternate url to use if the webpage requires HTTPS. */
	ogAudioSecureUrl?: Types.URL

	/** A MIME type for this audio. */
	ogAudioType?: MIMEContent
}

export function makeOpenGraphAudio(
	openGraphAudio: Types.URL | OpenGraphAudio | readonly OpenGraphAudio[],
): readonly OpenGraphMeta[] {
	function _makeOpenGraphAudio({ ogAudio, ogAudioSecureUrl, ogAudioType }: OpenGraphAudio) {
		return [
			// AUDIO!
			makeOpenGraphMeta(PropertyAudio.OG_AUDIO, ogAudio),

			// AUDIO_SECURE_URL?
			...insertIf(ogAudioSecureUrl, makeOpenGraphMeta(PropertyAudio.OG_AUDIO_SECURE_URL)),

			...insertIf(ogAudioType, makeOpenGraphMeta(PropertyAudio.OG_AUDIO_TYPE)),
		]
	}

	if (typeof openGraphAudio === 'string') {
		return [makeOpenGraphMeta(PropertyAudio.OG_AUDIO, openGraphAudio)]
	}

	if (isArray(openGraphAudio)) {
		return openGraphAudio.flatMap(_makeOpenGraphAudio)
	}

	return _makeOpenGraphAudio(openGraphAudio)
}
