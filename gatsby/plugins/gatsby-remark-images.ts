import type { IPluginRefObject, IPluginRefOptions } from 'gatsby'

interface PluginOptionsSchema extends IPluginRefOptions {
  /**
   * The maxWidth in pixels of the div where the markdown will be displayed. This value is used when deciding what the width of the various responsive thumbnails should be.
   * @default 650
   */
  maxWidth?: number

  /**
   * Add a link to each image to the original image. Sometimes people want to see a full-sized version of an image e.g. to see extra detail on a part of the image and this is a convenient and common pattern for enabling this. Set this option to false to disable this behavior.
   * @default true
   */
  linkImagesToOriginal?: boolean

  /**
   * Add a caption to each image with the contents of the title attribute, when this is not empty.
   * If the title attribute is empty but the alt attribute is not, it will be used instead.
   * Set this option to true to enable this behavior.
   * You can also pass an array instead to specify which value should be used for the caption \u2014 for example, passing ['alt', 'title'] would use the alt attribute first, and then the title.
   * When this is set to true it is the same as passing ['title', 'alt'].
   * If you just want to use the title (and omit captions for images that have alt attributes but no title), pass ['title'].
   */
  showCaptions?: boolean | Array<'title' | 'alt'> | ['title']

  /**
   * Parse the caption as markdown instead of raw text. Ignored if showCaptions is false.
   * @default false
   */
  markdownCaptions?: boolean

  /**
   * Pixel density is only used in vector images, which Gatsby's implementation of Sharp doesn't support.
   * This option is currently a no-op and will be removed in the next major version of Gatsby.
   * @default false
   * @deprecated
   */
  sizeByPixelDensity?: boolean

  wrapperStyle?: {} | ((x?: unknown) => unknown) | string

  /**
   * Set the background color of the image to match the background image of your design.
   * Note:
   *  - set this option to `transparent` for a transparent image background.
   *  - set this option to `none` to completely remove the image background.
   * @default "white"
   */
  backgroundColor?: string | 'transparent' | 'none'

  /**
   * The quality level of the generated files.
   * @default 50
   */
  quality?: number

  /**
   * Additionally generate WebP versions alongside your chosen file format.
   * They are added as a srcset with the appropriate mimetype and will be loaded in browsers that support the format.
   * Pass true for default support, or an object of options to specifically override those for the WebP files.
   * For example, pass { quality: 80 } to have the WebP images be at quality level 80.
   * @default false
   */
  withWebp?: { quality: number } | boolean

  /**
   * Use traced SVGs for placeholder images instead of the \u201Cblur up\u201D effect.
   * Pass true for traced SVGs with the default settings (seen here), or an object of options to override the default.
   * For example, pass `{ color: "#F00", turnPolicy: "TURNPOLICY_MAJORITY" }` to change the color of the trace to red and the turn policy to TURNPOLICY_MAJORITY.
   * See node-potrace parameter documentation for a full listing and explanation of the available options.
   * @default false
   */
  tracedSVG?:
    | boolean
    | {
        /**
         * this plugin also allow to use key names and not exact values
         * it also allow using actual policy values
         * @default Potrace.TURNPOLICY_MAJORITY
         */
        turnPolicy?:
          | 'TURNPOLICY_BLACK'
          | 'TURNPOLICY_WHITE'
          | 'TURNPOLICY_LEFT'
          | 'TURNPOLICY_RIGHT'
          | 'TURNPOLICY_MINORITY'
          | 'TURNPOLICY_MAJORITY'

        /**
         * @default 100
         */
        turdSize?: number

        alphaMax?: number

        /**
         * @default true
         */
        optCurve?: boolean

        /**
         * @default 0.4
         */
        optTolerance?: number

        /**
         * min(0)
         * max(255)
         * @default Potrace.THRESHOLD_AUTO
         */
        threshold?: number

        /**
         * @default true
         */
        blackOnWhite?: boolean

        /**
         * @default 'lightgray'
         */
        color?: string

        /**
         * @default 'transparent'
         */
        background?: string
      }
  /**
   * Set the browser's native lazy loading attribute.
   * One of `lazy`, `eager` or `auto`.
   * @default 'lazy'
   */
  loading?: 'lazy' | 'eager' | 'auto'

  /**
   * Set the browser's native decoding attribute.
   * One of `async`, `sync` or `auto`.
   * @default 'async'
   */
  decoding?: 'async' | 'sync' | 'auto'

  /**
   * Images containing transparent pixels around the edges results in images with blurry edges.
   * As a result, these images do not work well with the \u201Cblur up\u201D technique used in this plugin.
   * As a workaround to disable background images with blurry edges on images containing transparent pixels, enable this setting.
   * @default false
   */
  disableBgImageOnAlpha?: boolean
  /**
   * Remove background image and its inline style.
   * Useful to prevent Stylesheet too long error on AMP.
   * @default false
   */
  disableBgImage?: boolean

  /**
   * By default gatsby generates 0.25x, 0.5x, 1x, 1.5x, 2x, and 3x sizes of thumbnails.
   * If you want more control over which sizes are output you can use the srcSetBreakpoints parameter.
   * For example, if you want images that are 200, 340, 520, and 890 wide you can add srcSetBreakpoints: `[ 200, 340, 520, 890 ]` as a parameter.
   * You will also get maxWidth as a breakpoint (which is 650 by default), so you will actually get `[ 200, 340, 520, 650, 890 ]` as breakpoints.
   */
  srcSetBreakpoints?: number[]
}

export const makeGatsbyRemarkImagesConfig = (
  options: PluginOptionsSchema = {}
): IPluginRefObject => ({
  resolve: 'gatsby-remark-images',
  options,
})
