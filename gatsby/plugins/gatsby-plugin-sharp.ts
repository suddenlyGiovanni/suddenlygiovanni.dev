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

export const makeGatsbySharpPluginConfig = (
  options: PluginOptionsSchema = {}
): IPluginRefObject => ({
  resolve: 'gatsby-plugin-sharp',
  options,
})
