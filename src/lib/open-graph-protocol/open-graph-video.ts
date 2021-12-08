import { insertLazilyIf, isArray } from '@lib/array'
import { ImageKeys } from '@lib/open-graph-protocol/open-graph-image'

import {
  BaseOrExtended,
  makeOpenGraphMeta,
  MIMEContent,
  og,
  Types,
} from './open-graph'
import {
  makeOpenGraphBase,
  MetaBase,
  OpenGraphBaseWithOptional,
} from './open-graph-base'
import {
  PropertyVideoEpisode,
  VideoEpisodeRecord,
} from './open-graph-video-episode'
import { PropertyVideoMovie, VideoMovieRecord } from './open-graph-video-movie'
import { VideoOtherType } from './open-graph-video-other'
import { VideoTvShowType } from './open-graph-video-tvshow'

export type PropertyVideo = PropertyVideoMovie | PropertyVideoEpisode

export type VideoRecord =
  | VideoMovieRecord
  | VideoEpisodeRecord
  | VideoTvShowType
  | VideoOtherType

export interface OpenGraphVideoBase extends OpenGraphBaseWithOptional {
  ogType: Types.Enum<
    'video.movie' | 'video.episode' | 'video.tv_show' | 'video.other'
  >

  /**
   * Actors in the movie/episode/tv-show/other and the role they played.
   * @link ProfileMetadata
   */
  ogVideoActorAndRole?:
    | { actor: Types.URL; role?: Types.String }
    | readonly { actor: Types.URL; role?: Types.String }[]

  /**
   * Directors of the movie/episode/tv-show/other.
   * profile array
   * @link ProfileMetadata
   */
  ogVideoDirector?: Types.URL | readonly Types.URL[]

  /**
   * Writers of the movie/episode/tv-show/other.
   * profile array
   * @link ProfileMetadata
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
  function _makeOpenGraphVideo(_openGraphVideo: OpenGraphVideo) {
    return [
      // VIDEO!
      makeOpenGraphMeta({
        property: 'og:video',
        content: _openGraphVideo.ogVideo,
      }),

      // VIDEO_URL?
      ...insertLazilyIf(
        _openGraphVideo.ogVideoURL,
        makeOpenGraphMeta('og:video:url')
      ),

      // VIDEO_SECURE_URL?
      ...insertLazilyIf(
        _openGraphVideo.ogVideoSecureUrl,
        makeOpenGraphMeta('og:video:secure_url')
      ),

      // VIDEO_TYPE?
      ...insertLazilyIf(
        _openGraphVideo.ogVideoType,
        makeOpenGraphMeta('og:video:type')
      ),

      // VIDEO_WIDTH?
      ...insertLazilyIf(
        _openGraphVideo.ogVideoWidth,
        makeOpenGraphMeta('og:video:width')
      ),

      // VIDEO_HEIGHT?
      ...insertLazilyIf(
        _openGraphVideo.ogVideoHeight,
        makeOpenGraphMeta('og:video:height')
      ),

      // VIDEO_ALT?
      ...insertLazilyIf(
        _openGraphVideo.ogVideoAlt,
        makeOpenGraphMeta('og:video:alt')
      ),
    ]
  }

  if (typeof openGraphVideo === 'string') {
    return [
      makeOpenGraphMeta({ property: 'og:video', content: openGraphVideo }),
    ]
  } else if (isArray(openGraphVideo)) {
    return openGraphVideo.map(_makeOpenGraphVideo).flat()
  } else {
    return _makeOpenGraphVideo(openGraphVideo)
  }
}

export type VideoKeys = ImageKeys
export type OptionalVideoMetadata =
  | Video
  | VideoURL
  | VideoSecureURL
  | VideoType
  | VideoWidth
  | VideoHeight
  | VideoAlt
export type video<T extends string = ''> = BaseOrExtended<'video', T>

export interface VideoMetadataBase<
  Property extends og<video | video<VideoKeys>>,
  Content extends Types.Type
> extends MetaBase<Property, Content> {}

/**
 * Identical to og:video.
 */
interface VideoURL extends VideoMetadataBase<og<video<'url'>>, Types.URL> {}

/**
 * An alternate url to use if the webpage requires HTTPS.
 */
interface VideoSecureURL
  extends VideoMetadataBase<og<video<'secure_url'>>, Types.URL> {}

/**
 * A MIME type for this video.
 */
interface VideoType extends VideoMetadataBase<og<video<'type'>>, MIMEContent> {}

/**
 * The number of pixels wide.
 */
interface VideoWidth
  extends VideoMetadataBase<og<video<'width'>>, Types.Integer> {}

/**
 * The number of pixels high.
 */
interface VideoHeight
  extends VideoMetadataBase<og<video<'height'>>, Types.Integer> {}

/**
 * A description of what is in the image (not a caption).
 * If the page specifies an og:video it should specify og:video:alt.
 */
interface VideoAlt extends VideoMetadataBase<og<video<'alt'>>, Types.String> {}

/**
 * A URL to a video file that complements this object.
 */
export interface Video extends VideoMetadataBase<og<video>, Types.URL> {}
