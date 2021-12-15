import { insertLazilyIf, isArray, type ValueOf } from '@suddenlyGiovanni/open-graph-protocol-utils'

import {
  type BaseOrExtended,
  makeOpenGraphMeta,
  type MetaBase,
  type MIMEContent,
  type og,
  type Types,
} from './open-graph'

type audio<T extends string = ''> = BaseOrExtended<'audio', T>

export type PropertyAudio = ValueOf<typeof PropertyAudio>
export const PropertyAudio = {
  OG_AUDIO: 'og:audio',
  OG_AUDIO_SECURE_URL: 'og:audio:secure_url',
  OG_AUDIO_TYPE: 'og:audio:type',
} as const

interface AudioMetaBase<Property extends PropertyAudio, Content extends Types.Type>
  extends MetaBase<Property, Content> {}

/** A URL to an audio file to accompany this object. */
export interface OgAudio extends AudioMetaBase<og<audio>, Types.URL> {}

/** An alternate url to use if the webpage requires HTTPS. */
interface OgAudioSecureURL extends AudioMetaBase<og<audio<'secure_url'>>, Types.URL> {}

/** A MIME type for this audio. */
interface OgAudioType extends AudioMetaBase<og<audio<'type'>>, MIMEContent> {}

/**
 * The og:audio tag only has the first 3 properties available (since size doesn't make sense for sound):
 * @example
 * ```html
 * <meta property="og:audio" content="https://example.com/sound.mp3" />
 * <meta property="og:audio:secure_url" content="https://secure.example.com/sound.mp3" />
 * <meta property="og:audio:type" content="audio/mpeg" />
 * ```
 */
export type AudioRecord = OgAudio | OgAudioSecureURL | OgAudioType

export interface OpenGraphAudio {
  /** An audio URL which should represent your object within the graph */
  ogAudio: Types.URL

  /** An alternate url to use if the webpage requires HTTPS. */
  ogAudioSecureUrl?: Types.URL

  /** A MIME type for this audio. */
  ogAudioType?: MIMEContent
}

export function makeOpenGraphAudio(
  openGraphAudio: Types.URL | OpenGraphAudio | readonly OpenGraphAudio[]
) {
  function _makeOpenGraphAudio({ ogAudio, ogAudioSecureUrl, ogAudioType }: OpenGraphAudio) {
    return [
      // AUDIO!
      makeOpenGraphMeta(PropertyAudio.OG_AUDIO, ogAudio),

      // AUDIO_SECURE_URL?
      ...insertLazilyIf(ogAudioSecureUrl, makeOpenGraphMeta(PropertyAudio.OG_AUDIO_SECURE_URL)),

      ...insertLazilyIf(ogAudioType, makeOpenGraphMeta(PropertyAudio.OG_AUDIO_TYPE)),
    ]
  }

  if (typeof openGraphAudio === 'string') {
    return [makeOpenGraphMeta(PropertyAudio.OG_AUDIO, openGraphAudio)]
  } else if (isArray(openGraphAudio)) {
    return openGraphAudio.map(_makeOpenGraphAudio).flat()
  } else {
    return _makeOpenGraphAudio(openGraphAudio)
  }
}
