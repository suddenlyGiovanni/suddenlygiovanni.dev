import { insertIf, isArray, type ValueOf } from '@suddenlygiovanni/open-graph-protocol-utils'

import {
  type BaseOrExtended,
  makeOpenGraphMeta,
  type MetaBase,
  type MIMEContent,
  type og,
  PropertyVideo,
  Types,
} from './open-graph'

export type video<T extends string = ''> = BaseOrExtended<'video', T>

export type IPropertyVideo = ValueOf<typeof PropertyVideo>

export type VideoRecord =
  | OgVideo
  | OgVideoURL
  | OgVideoSecureURL
  | OgVideoType
  | OgVideoWidth
  | OgVideoHeight
  | OgVideoAlt

export interface VideoMetaBase<Property extends IPropertyVideo, Content extends Types.Type>
  extends MetaBase<Property, Content> {}

/**
 * A URL to a video file that complements this object.
 */
export interface OgVideo extends VideoMetaBase<og<video>, Types.URL> {}

/**
 * Identical to og:video.
 */
interface OgVideoURL extends VideoMetaBase<og<video<'url'>>, Types.URL> {}

/**
 * An alternate url to use if the webpage requires HTTPS.
 */
interface OgVideoSecureURL extends VideoMetaBase<og<video<'secure_url'>>, Types.URL> {}

/**
 * A MIME type for this video.
 */
interface OgVideoType extends VideoMetaBase<og<video<'type'>>, MIMEContent> {}

/**
 * The number of pixels wide.
 */
interface OgVideoWidth extends VideoMetaBase<og<video<'width'>>, Types.Integer> {}

/**
 * The number of pixels high.
 */
interface OgVideoHeight extends VideoMetaBase<og<video<'height'>>, Types.Integer> {}

/**
 * A description of what is in the image (not a caption).
 * If the page specifies an og:video it should specify og:video:alt.
 */
interface OgVideoAlt extends VideoMetaBase<og<video<'alt'>>, Types.String> {}

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
      ...insertIf(ogVideoURL, makeOpenGraphMeta(PropertyVideo.OG_VIDEO_URL)),

      // VIDEO_SECURE_URL?
      ...insertIf(ogVideoSecureUrl, makeOpenGraphMeta(PropertyVideo.OG_VIDEO_SECURE_URL)),

      // VIDEO_TYPE?
      ...insertIf(ogVideoType, makeOpenGraphMeta(PropertyVideo.OG_VIDEO_TYPE)),

      // VIDEO_WIDTH?
      ...insertIf(ogVideoWidth, makeOpenGraphMeta(PropertyVideo.OG_VIDEO_WIDTH)),

      // VIDEO_HEIGHT?
      ...insertIf(ogVideoHeight, makeOpenGraphMeta(PropertyVideo.OG_VIDEO_HEIGHT)),

      // VIDEO_ALT?
      ...insertIf(ogVideoAlt, makeOpenGraphMeta(PropertyVideo.OG_VIDEO_ALT)),
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
