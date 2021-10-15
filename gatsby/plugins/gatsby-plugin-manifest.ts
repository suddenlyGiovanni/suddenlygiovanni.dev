import type { IPluginRefObject } from 'gatsby'

/**
 * The platform on which the application can be found.
 * https://w3c.github.io/manifest-app-info/#platform-member
 * @default: ''
 */
type Platform =
  | string
  | 'narrow'
  | 'wide'
  | 'chromeos'
  | 'ios'
  | 'kaios'
  | 'macos'
  | 'windows'
  | 'windows10x'
  | 'xbox'
  | 'chrome_web_store'
  | 'play'
  | 'itunes'
  | 'microsoft'
  | 'webapp'

interface FingerPrint extends Record<string, unknown> {
  /**
   * syntax and semantics are platform-defined
   */
  type: string

  /**
   * syntax and semantics are platform-defined
   */
  value: string
}

interface ImageResource extends Record<string, unknown> {
  /**
   * A string containing space-separated image dimensions
   */
  sizes?: string

  /**
   * The path to the image file. If src is a relative URL, the base URL will be the URL of the manifest.
   */
  src: string

  /**
   * A hint as to the media type of the image. The purpose of this member is to allow a user agent to quickly ignore images with media types it does not support.
   */
  type?: string
}

interface ManifestImageResource extends ImageResource {
  /**
   * Defines the purpose of the image, for example if the image is intended to serve some special purpose in the context of the host OS.
   */
  purpose?: string
}

interface ShortcutItem extends Record<string, unknown> {
  /**
   * The name member of a ShortcutItem is a string that represents the name of the shortcut as it is usually displayed to the user in a context menu.
   */
  name: string

  /**
   * The short_name member of a ShortcutItem is a string that represents a short version of the name of the shortcut.
   */
  short_name?: string

  /**
   * The description member of a ShortcutItem is a string that allows the developer to describe the purpose of the shortcut.
   */
  description?: string

  /**
   * The url member of a ShortcutItem is a URL within scope of a processed manifest that opens when the associated shortcut is activated.
   */
  url: string

  /**
   * The icons member of an ShortcutItem member serve as iconic representations of the shortcut in various contexts.
   */
  icons?: ManifestImageResource[]
}

interface ExternalApplicationResource extends Record<string, unknown> {
  platform: Platform

  /**
   * The URL at which the application can be found.
   */
  url?: string

  /**
   * The ID used to represent the application on the specified platform.
   */
  id?: string

  /**
   * The minimum version of the application that is considered related to this web app.
   */
  min_version?: string

  /**
   * Each Fingerprints represents a set of cryptographic fingerprints used for verifying the application.
   */
  fingerprints?: FingerPrint[]
}

/**
 * This only includes items in the draft, but allows unknown keys in params
 * @see https://w3c.github.io/web-share-target/
 */
interface ShareTarget extends Record<string, unknown> {
  /**
   * The URL for the web share target.
   */
  action: string

  /**
   * The HTTP request method for the web share target
   */
  method?: string

  /**
   * Specifies how the share data is encoded in the body of a POST request. It is ignored when method is "GET"
   */
  enctype?: string

  /**
   * Allow unknown keys, because the spec is an unofficial draft and Google already seems to have added support for keys that are not in the spec
   */
  params: Record<string, unknown> & {
    /**
     * The name of the query parameter used for the title of the document being shared
     */
    title?: string

    /**
     * The name of the query parameter used for the arbitrary text that forms the body of the message being shared
     */
    text?: string

    /**
     * The name of the query parameter used for the URL string referring to a resource being shared
     */
    url?: string
  }
}

interface WebAppManifest {
  /**
   * The background_color member defines a placeholder background color for the
   * application page to display before its stylesheet is loaded.
   */
  background_color?: string

  /**
   * The categories member is an array of strings defining the names of categories
   * that the application supposedly belongs to.
   */
  categories?: string[]

  /**
   * The description member is a string in which developers can explain what the application does.
   */
  description?: string

  /**
   * The base direction in which to display direction-capable members of the manifest.
   */
  dir?: 'auto' | 'ltr' | 'rtl'

  /**
   * The display member is a string that determines the developers’ preferred display mode for the website
   */
  display?: 'fullscreen' | 'standalone' | 'minimal-ui' | 'browser'

  /**
   * The iarc_rating_id member is a string that represents the International Age Rating Coalition (IARC) certification code of the web application.
   */
  iarc_rating_id?: string

  /**
   * The icons member specifies an array of objects representing image files that can serve as application icons for different contexts.
   */
  icons?: ManifestImageResource[]

  /**
   * The lang member is a string containing a single language tag.
   */
  lang?: string

  /**
   * The name member is a string that represents the name of the web application as it is usually displayed to the user.
   */
  name?: string

  /**
   * The orientation member defines the default orientation for all the website's top-level browsing contexts
   * From: https://www.w3.org/TR/screen-orientation/#screenorientation-interface
   */
  orientation?:
    | 'any'
    | 'natural'
    | 'landscape'
    | 'landscape-primary'
    | 'landscape-secondary'
    | 'portrait'
    | 'portrait-primary'
    | 'portrait-secondary'

  /**
   * The prefer_related_applications member is a boolean value that specifies
   * that applications listed in related_applications should be preferred over the web application.
   */
  prefer_related_applications?: boolean

  /**
   * The related_applications field is an array of objects specifying native applications that are installable by, or accessible to, the underlying platform.
   */
  related_applications?: ExternalApplicationResource[]

  /**
   * Allows websites to declare themselves as web share targets, which can receive shared content from either the Web Share API, or system events (e.g., shares from native apps).
   */
  share_target?: ShareTarget

  /**
   * The scope member is a string that defines the navigation scope of this web application's application context.
   */
  scope?: string

  /**
   * The screenshots member defines an array of screenshots intended to showcase the application.
   */
  screenshots?: Array<
    {
      /**
       * The label member is a string that serves as the accessible name of that screenshots object.
       */
      label?: string
      platform: Platform
    } & ManifestImageResource
  >

  /**
   * The short_name member is a string that represents the name of the web application displayed to the user if there is not enough space to display name.
   */
  short_name?: string

  /**
   * Each ShortcutItem represents a link to a key task or page within a web app.
   */
  shortcuts?: ShortcutItem[]

  /**
   * The start_url member is a string that represents the start URL of the web application.
   */
  start_url?: string

  /**
   * The theme_color member is a string that defines the default theme color for the application.
   */
  theme_color?: string
}

interface GatsbyPluginOptions extends Record<string, unknown> {
  icon: string
  /**
   * @default: true
   */
  legacy?: boolean

  /**
   * @default: true
   */
  theme_color_in_head?: boolean

  /**
   * @default: 'query'
   */
  cache_busting_mode?: 'none' | 'query' | 'name'

  /**
   * @default: 'anonymous'
   */
  crossOrigin?: 'anonymous' | 'use-credentials'

  /**
   * @default: true
   */
  include_favicon?: boolean

  icon_options?: Exclude<ManifestImageResource, 'src' | 'sizes'>

  /**
   * Used for localizing your WebAppManifest
   */
  localize?: Array<
    {
      lang: Required<WebAppManifest>['lang']
      start_url: Required<WebAppManifest>['start_url']
    } & WebAppManifest
  >
}

interface GatsbyPluginManifestConfigOptions
  extends WebAppManifest,
    GatsbyPluginOptions {}

export const makeGatsbyManifestPluginConfig = (
  options: GatsbyPluginManifestConfigOptions
): IPluginRefObject =>
  ({
    resolve: 'gatsby-plugin-manifest',
    options,
  } as IPluginRefObject)
