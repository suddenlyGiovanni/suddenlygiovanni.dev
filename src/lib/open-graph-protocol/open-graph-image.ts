import { insertLazilyIf, isArray } from '@lib/array'

import {
  type BaseOrExtended,
  makeOpenGraphMeta,
  type MIMEContent,
  type og,
  type Types,
} from './open-graph'
import type { MetaBase } from './open-graph-base'

export type image<T extends string = ''> = BaseOrExtended<'image', T>
export type ImageKeys =
  | 'url'
  | 'secure_url'
  | 'type'
  | 'width'
  | 'height'
  | 'alt'

export interface ImageMetaBase<
  Property extends og<image | image<ImageKeys>>,
  Content extends Types.Type
> extends MetaBase<Property, Content> {}

/**
 * An image URL which should represent your object within the graph.
 */
export interface Image extends ImageMetaBase<og<image>, Types.URL> {}

/**
 * Identical to og:image
 * @link Image
 */
interface ImageURL extends ImageMetaBase<og<image<'url'>>, Types.URL> {}

/**
 * An alternate url to use if the webpage requires HTTPS.
 */
interface ImageSecureURL
  extends ImageMetaBase<og<image<'secure_url'>>, Types.URL> {}

/**
 * A MIME type for this image.
 */
interface ImageType extends ImageMetaBase<og<image<'type'>>, MIMEContent> {}

/**
 * The number of pixels wide.
 */
interface ImageWidth extends ImageMetaBase<og<image<'width'>>, Types.Integer> {}

/**
 * The number of pixels high.
 */
interface ImageHeight
  extends ImageMetaBase<og<image<'height'>>, Types.Integer> {}

/**
 * A description of what is in the image (not a caption).
 * If the page specifies an og:image it should specify og:image:alt.
 */
interface ImageAlt extends ImageMetaBase<og<image<'alt'>>, Types.String> {}

/**
 * @example
 * ```html
 *  <meta property="og:image" content="https://example.com/ogp.jpg" />
 *  <meta property="og:image:secure_url" content="https://secure.example.com/ogp.jpg" />
 *  <meta property="og:image:type" content="image/jpeg" />
 *  <meta property="og:image:width" content="400" />
 *  <meta property="og:image:height" content="300" />
 *  <meta property="og:image:alt" content="A shiny red apple with a bite taken out" />
 * ```
 */
export type ImageRecord =
  | Image
  | ImageURL
  | ImageSecureURL
  | ImageType
  | ImageWidth
  | ImageHeight
  | ImageAlt

export interface OpenGraphImage {
  /**
   * An image URL which should represent your object within the graph.
   */
  ogImage: Types.URL

  /** Identical to og:image */
  ogImageURL?: Types.URL

  /** An alternate url to use if the webpage requires HTTPS. */
  ogImageSecureUrl?: Types.URL

  /** A MIME type for this image. */
  ogImageType?: MIMEContent

  /** The number of pixels wide. */
  ogImageWidth?: Types.Integer

  /** The number of pixels high. */
  ogImageHeight?: Types.Integer

  /** A description of what is in the image (not a caption). */
  ogImageAlt?: Types.String
}

export function makeOpenGraphImage(
  openGraphImage: Types.URL | OpenGraphImage | readonly OpenGraphImage[]
) {
  function _makeOpenGraphImage(ogImage: OpenGraphImage) {
    return [
      // IMAGE!
      makeOpenGraphMeta({ property: 'og:image', content: ogImage.ogImage }),

      // IMAGE_URL?
      ...insertLazilyIf(ogImage.ogImageURL, makeOpenGraphMeta('og:image:url')),

      // IMAGE_SECURE_URL?
      ...insertLazilyIf(
        ogImage.ogImageSecureUrl,
        makeOpenGraphMeta('og:image:secure_url')
      ),

      // IMAGE_TYPE?
      ...insertLazilyIf(
        ogImage.ogImageType,
        makeOpenGraphMeta('og:image:type')
      ),

      // IMAGE_WIDTH?
      ...insertLazilyIf(
        ogImage.ogImageWidth,
        makeOpenGraphMeta('og:image:width')
      ),

      // IMAGE_HEIGHT?
      ...insertLazilyIf(
        ogImage.ogImageHeight,
        makeOpenGraphMeta('og:image:height')
      ),

      // IMAGE_ALT?
      ...insertLazilyIf(ogImage.ogImageAlt, makeOpenGraphMeta('og:image:alt')),
    ]
  }

  if (typeof openGraphImage === 'string') {
    return [
      makeOpenGraphMeta({ property: 'og:image', content: openGraphImage }),
    ]
  } else if (isArray(openGraphImage)) {
    return openGraphImage.map((image) => _makeOpenGraphImage(image)).flat()
  } else {
    return _makeOpenGraphImage(openGraphImage)
  }
}
