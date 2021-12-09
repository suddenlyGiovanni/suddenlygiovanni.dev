import { insertLazilyIf, isArray } from '@lib/array'
import type { ValueOf } from '@lib/types'

import {
  type BaseOrExtended,
  makeOpenGraphMeta,
  type MIMEContent,
  type og,
  Types,
} from './open-graph'
import {
  makeOpenGraphBase,
  type MetaBase,
  type OpenGraphBaseWithOptional,
} from './open-graph-base'

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

export interface OpenGraphVideoBase extends OpenGraphBaseWithOptional {
  ogType: Types.Enum<
    'video.movie' | 'video.episode' | 'video.tv_show' | 'video.other'
  >

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
  openGraphVideoBase: OpenGraphVideoBase
) {
  return [
    // BASIC_METADATA!
    ...makeOpenGraphBase(openGraphVideoBase),

    ...insertLazilyIf(
      openGraphVideoBase.ogVideoActorAndRole,
      (ogVideoActorAndRole) =>
        isArray(ogVideoActorAndRole)
          ? ogVideoActorAndRole.map(({ actor, role }) => [
              makeOpenGraphMeta({
                property: 'og:video:actor',
                content: actor,
              }),
              ...insertLazilyIf(role, makeOpenGraphMeta('og:video:actor:role')),
            ])
          : [
              makeOpenGraphMeta({
                property: 'og:video:actor',
                content: ogVideoActorAndRole.actor,
              }),
              ...insertLazilyIf(
                ogVideoActorAndRole.role,
                makeOpenGraphMeta('og:video:actor:role')
              ),
            ]
    ).flat(2),

    // DIRECTORS?
    ...insertLazilyIf(openGraphVideoBase.ogVideoDirector, (ogVideoDirector) =>
      isArray(ogVideoDirector)
        ? ogVideoDirector.map(makeOpenGraphMeta('og:video:director'))
        : makeOpenGraphMeta({
            property: 'og:video:director',
            content: ogVideoDirector,
          })
    ).flat(),

    // WRITER?
    ...insertLazilyIf(openGraphVideoBase.ogVideoWriter, (ogVideoWriter) =>
      isArray(ogVideoWriter)
        ? ogVideoWriter.map(makeOpenGraphMeta('og:video:writer'))
        : makeOpenGraphMeta({
            property: 'og:video:writer',
            content: ogVideoWriter,
          })
    ).flat(),

    // DURATION?
    ...insertLazilyIf(openGraphVideoBase.ogVideoDuration, (ogVideoDuration) =>
      makeOpenGraphMeta({
        property: 'og:video:duration',
        content: Types.Integer(Math.round(ogVideoDuration)),
      })
    ),

    // RELEASE_DATE?
    ...insertLazilyIf(
      openGraphVideoBase.ogVideoReleaseDate,
      makeOpenGraphMeta('og:video:release_date')
    ),

    // TAGS?
    ...insertLazilyIf(openGraphVideoBase.ogVideoTag, (ogVideoTag) =>
      isArray(ogVideoTag)
        ? ogVideoTag.map(makeOpenGraphMeta('og:video:tag'))
        : makeOpenGraphMeta({
            property: 'og:video:tag',
            content: ogVideoTag,
          })
    ).flat(),
  ]
}

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
      makeOpenGraphMeta({
        property: PropertyVideo.OG_VIDEO,
        content: ogVideo,
      }),

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
    return [
      makeOpenGraphMeta({
        property: PropertyVideo.OG_VIDEO,
        content: openGraphVideo,
      }),
    ]
  } else if (isArray(openGraphVideo)) {
    return openGraphVideo.map(_makeOpenGraphVideo).flat()
  } else {
    return _makeOpenGraphVideo(openGraphVideo)
  }
}
