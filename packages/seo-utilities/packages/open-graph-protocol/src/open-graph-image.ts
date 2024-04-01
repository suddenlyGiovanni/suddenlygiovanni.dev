import { insertIf, isArray, type ValueOf } from '@suddenlygiovanni/open-graph-protocol-utils'

import {
  type BaseOrExtended,
  makeOpenGraphMeta,
  type MetaBase,
  type MIMEContent,
  type og,
  PropertyImage,
  type Types,
} from './open-graph'

export type image<T extends string = ''> = BaseOrExtended<'image', T>

export type IPropertyImage = ValueOf<typeof PropertyImage>

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
  | OgImage
  | OgImageURL
  | OgImageSecureURL
  | OgImageType
  | OgImageWidth
  | OgImageHeight
  | OgImageAlt

export interface ImageMetaBase<Property extends IPropertyImage, Content extends Types.Type>
  extends MetaBase<Property, Content> {}

/**
 * An image URL which should represent your object within the graph.
 */
export interface OgImage extends ImageMetaBase<og<image>, Types.URL> {}

/**
 * Identical to og:image
 * @link OgImage
 */
interface OgImageURL extends ImageMetaBase<og<image<'url'>>, Types.URL> {}

/**
 * An alternate url to use if the webpage requires HTTPS.
 */
interface OgImageSecureURL extends ImageMetaBase<og<image<'secure_url'>>, Types.URL> {}

/**
 * A MIME type for this image.
 */
interface OgImageType extends ImageMetaBase<og<image<'type'>>, MIMEContent> {}

/**
 * The number of pixels wide.
 */
interface OgImageWidth extends ImageMetaBase<og<image<'width'>>, Types.Integer> {}

/**
 * The number of pixels high.
 */
interface OgImageHeight extends ImageMetaBase<og<image<'height'>>, Types.Integer> {}

/**
 * A description of what is in the image (not a caption).
 * If the page specifies an og:image it should specify og:image:alt.
 */
interface OgImageAlt extends ImageMetaBase<og<image<'alt'>>, Types.String> {}

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
  function _makeOpenGraphImage({
    ogImage,
    ogImageAlt,
    ogImageHeight,
    ogImageSecureUrl,
    ogImageType,
    ogImageURL,
    ogImageWidth,
  }: OpenGraphImage) {
    return [
      // IMAGE!
      makeOpenGraphMeta(PropertyImage.OG_IMAGE, ogImage),

      // IMAGE_URL?
      ...insertIf(ogImageURL, makeOpenGraphMeta(PropertyImage.OG_IMAGE_URL)),

      // IMAGE_SECURE_URL?
      ...insertIf(ogImageSecureUrl, makeOpenGraphMeta(PropertyImage.OG_IMAGE_SECURE_URL)),

      // IMAGE_TYPE?
      ...insertIf(ogImageType, makeOpenGraphMeta(PropertyImage.OG_IMAGE_TYPE)),

      // IMAGE_WIDTH?
      ...insertIf(ogImageWidth, makeOpenGraphMeta(PropertyImage.OG_IMAGE_WIDTH)),

      // IMAGE_HEIGHT?
      ...insertIf(ogImageHeight, makeOpenGraphMeta(PropertyImage.OG_IMAGE_HEIGHT)),

      // IMAGE_ALT?
      ...insertIf(ogImageAlt, makeOpenGraphMeta(PropertyImage.OG_IMAGE_ALT)),
    ]
  }

  if (typeof openGraphImage === 'string') {
    return [makeOpenGraphMeta('og:image', openGraphImage)]
  } else if (isArray(openGraphImage)) {
    return openGraphImage.map((image) => _makeOpenGraphImage(image)).flat()
  } else {
    return _makeOpenGraphImage(openGraphImage)
  }
}
