import { insertLazilyIf, isArray } from '@lib/array'
import type { ValueOf } from '@lib/types'

import {
  type BaseOrExtended,
  makeOpenGraphMeta,
  MetaBase,
  type MIMEContent,
  type og,
  Types,
} from './open-graph'

export type video<T extends string = ''> = BaseOrExtended<'video', T>

export type PropertyVideo = ValueOf<typeof PropertyVideo>
export const PropertyVideo = {
  OG_VIDEO: 'og:video',
  OG_VIDEO_ALT: 'og:video:alt',
  OG_VIDEO_HEIGHT: 'og:video:height',
  OG_VIDEO_TYPE: 'og:video:type',
  OG_VIDEO_URL: 'og:video:url',
  OG_VIDEO_WIDTH: 'og:video:width',
  OG_VIDEO_SECURE_URL: 'og:video:secure_url',
} as const

export type VideoRecord =
  | Video
  | VideoURL
  | VideoSecureURL
  | VideoType
  | VideoWidth
  | VideoHeight
  | VideoAlt

export interface VideoMetaBase<
  Property extends PropertyVideo,
  Content extends Types.Type
> extends MetaBase<Property, Content> {}

/**
 * Identical to og:video.
 */
interface VideoURL extends VideoMetaBase<og<video<'url'>>, Types.URL> {}

/**
 * An alternate url to use if the webpage requires HTTPS.
 */
interface VideoSecureURL
  extends VideoMetaBase<og<video<'secure_url'>>, Types.URL> {}

/**
 * A MIME type for this video.
 */
interface VideoType extends VideoMetaBase<og<video<'type'>>, MIMEContent> {}

/**
 * The number of pixels wide.
 */
interface VideoWidth extends VideoMetaBase<og<video<'width'>>, Types.Integer> {}

/**
 * The number of pixels high.
 */
interface VideoHeight
  extends VideoMetaBase<og<video<'height'>>, Types.Integer> {}

/**
 * A description of what is in the image (not a caption).
 * If the page specifies an og:video it should specify og:video:alt.
 */
interface VideoAlt extends VideoMetaBase<og<video<'alt'>>, Types.String> {}

/**
 * A URL to a video file that complements this object.
 */
export interface Video extends VideoMetaBase<og<video>, Types.URL> {}

export interface OpenGraphVideo {
  /** An video URL which should represent your object within the graph */
  ogVideo: Types.URL

  /** Identical to og:video */
  ogVideoURL?: Types.URL

  /** An alternate url to use if the webpage requires HTTPS. */
  ogVideoSecureUrl?: Types.URL

  /** A MIME type for this video. */
  ogVideoType?: MIMEContent

  /** The number of pixels wide. */
  ogVideoWidth?: Types.Integer

  /** The number of pixels high. */
  ogVideoHeight?: Types.Integer

  /** A description of what is in the video (not a caption). */
  ogVideoAlt?: Types.String
}

export function makeOpenGraphVideo(
  openGraphVideo: Types.URL | OpenGraphVideo | readonly OpenGraphVideo[]
) {
  function _makeOpenGraphVideo({
    ogVideo,
    ogVideoAlt,
    ogVideoHeight,
    ogVideoSecureUrl,
    ogVideoType,
    ogVideoURL,
    ogVideoWidth,
  }: OpenGraphVideo) {
    return [
      // VIDEO!
      makeOpenGraphMeta(PropertyVideo.OG_VIDEO, ogVideo),

      // VIDEO_URL?
      ...insertLazilyIf(
        ogVideoURL,
        makeOpenGraphMeta(PropertyVideo.OG_VIDEO_URL)
      ),

      // VIDEO_SECURE_URL?
      ...insertLazilyIf(
        ogVideoSecureUrl,
        makeOpenGraphMeta(PropertyVideo.OG_VIDEO_SECURE_URL)
      ),

      // VIDEO_TYPE?
      ...insertLazilyIf(
        ogVideoType,
        makeOpenGraphMeta(PropertyVideo.OG_VIDEO_TYPE)
      ),

      // VIDEO_WIDTH?
      ...insertLazilyIf(
        ogVideoWidth,
        makeOpenGraphMeta(PropertyVideo.OG_VIDEO_WIDTH)
      ),

      // VIDEO_HEIGHT?
      ...insertLazilyIf(
        ogVideoHeight,
        makeOpenGraphMeta(PropertyVideo.OG_VIDEO_HEIGHT)
      ),

      // VIDEO_ALT?
      ...insertLazilyIf(
        ogVideoAlt,
        makeOpenGraphMeta(PropertyVideo.OG_VIDEO_ALT)
      ),
    ]
  }

  if (typeof openGraphVideo === 'string') {
    return [makeOpenGraphMeta(PropertyVideo.OG_VIDEO, openGraphVideo)]
  } else if (isArray(openGraphVideo)) {
    return openGraphVideo.map(_makeOpenGraphVideo).flat()
  } else {
    return _makeOpenGraphVideo(openGraphVideo)
  }
}
