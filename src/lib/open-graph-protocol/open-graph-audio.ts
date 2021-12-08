import { insertLazilyIf, isArray } from '@lib/array'
import { makeOpenGraphMeta } from './open-graph'

import type { BaseOrExtended, MIMEContent, og, Types } from './open-graph'
import { type MetaBase } from './open-graph-base'

export type audio<T extends string = ''> = BaseOrExtended<'audio', T>
export type AudioKeys = 'secure_url' | 'type'

/**
 * The og:audio tag only has the first 3 properties available (since size doesn't make sense for sound):
 * @example
 * ```html
 * <meta property="og:audio" content="https://example.com/sound.mp3" />
 * <meta property="og:audio:secure_url" content="https://secure.example.com/sound.mp3" />
 * <meta property="og:audio:type" content="audio/mpeg" />
 * ```
 */
export type AudioRecord = Audio | AudioSecureURL | AudioType

interface AudioMetadataBase<
  Property extends og<audio | audio<AudioKeys>>,
  Content extends Types.Type
> extends MetaBase<Property, Content> {}

interface AudioSecureURL
  extends AudioMetadataBase<og<audio<'secure_url'>>, Types.URL> {}

interface AudioType extends AudioMetadataBase<og<audio<'type'>>, MIMEContent> {}

/**
 *  A URL to an audio file to accompany this object.
 */
export interface Audio extends AudioMetadataBase<og<audio>, Types.URL> {}

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
  function _makeOpenGraphAudio(ogAudio: OpenGraphAudio) {
    return [
      // AUDIO!
      makeOpenGraphMeta({ property: 'og:audio', content: ogAudio.ogAudio }),

      // AUDIO_SECURE_URL?
      ...insertLazilyIf(
        ogAudio.ogAudioSecureUrl,
        makeOpenGraphMeta('og:audio:secure_url')
      ),

      ...insertLazilyIf(
        ogAudio.ogAudioType,
        makeOpenGraphMeta('og:audio:type')
      ),
    ]
  }

  if (typeof openGraphAudio === 'string') {
    return [
      makeOpenGraphMeta({ property: 'og:audio', content: openGraphAudio }),
    ]
  } else if (isArray(openGraphAudio)) {
    return openGraphAudio.map(_makeOpenGraphAudio).flat()
  } else {
    return _makeOpenGraphAudio(openGraphAudio)
  }
}
