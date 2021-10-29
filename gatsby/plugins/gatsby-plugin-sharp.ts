import type { IPluginRefObject, IPluginRefOptions } from 'gatsby'

interface PluginOptionsSchema extends IPluginRefOptions {
  /**
   * The width of the generated base64 preview image
   * @default 20
   */
  base64Width?: number

  /**
   * Force a different format for the generated base64 image. Defaults to the same format as the input image
   */
  forceBase64Format?: `png` | `jpg` | `webp`
  /**
   * The the mozJpeg library for encoding.
   * Defaults to false, unless `process.env.GATSBY_JPEG_ENCODER` === `MOZJPEG`
   * @default false
   */
  useMozJpeg?: boolean

  /**
   * @default true
   */
  stripMetadata?: boolean

  /**
   * @default 50
   */
  defaultQuality?: number

  /**
   * @default true
   */
  failOnError?: boolean

  /**
   * Default options used by gatsby-plugin-image.
   * See https://gatsbyjs.com/docs/reference/built-in-components/gatsby-plugin-image/
   */
  defaults?: {
    formats?: ('auto' | 'png' | 'jpg' | 'webp' | 'avif')[]
    placeholder?: 'tracedSVG' | 'dominantColor' | 'blurred' | 'none'
    quality?: number
    breakpoints?: number[]
    backgroundColor?: string
    transformOptions?: {}
    tracedSVGOptions?: {}
    blurredOptions?: {}
    jpgOptions?: {}
    pngOptions?: {}
    webpOptions?: {}
    avifOptions?: {}
  }
}

/**
 * # Factory function to correctly configure `gatsby-plugin-sharp`
 *
 * Exposes several image processing functions built on the Sharp image processing library.
 * This is a low-level helper plugin generally used by other Gatsby plugins.
 * You generally shouldn’t be using this directly but might find it helpful if doing very custom image processing.
 *
 * It aims to provide excellent out-of-the box settings for processing common web image formats.
 *
 * @see https://www.gatsbyjs.com/plugins/gatsby-plugin-sharp/?=gatsby-plugin-sharp
 */
export const makeGatsbySharpPluginConfig = (
  options: PluginOptionsSchema = {}
): IPluginRefObject => ({
  resolve: 'gatsby-plugin-sharp',
  options,
})
