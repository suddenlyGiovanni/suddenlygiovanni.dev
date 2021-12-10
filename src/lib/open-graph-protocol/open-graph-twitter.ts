import { insertLazilyIf } from '@lib/array'
import { maxLength } from '@lib/string'
import type { ValueOf } from '@lib/types'

import { type BaseOrExtended, Types } from './open-graph'
import type { MetaBase } from './open-graph-base'

type twitter<T extends string = ''> = BaseOrExtended<'twitter', T>

export type PropertyTwitter = ValueOf<typeof PropertyTwitter>
export const PropertyTwitter = {
  TWITTER_CARD: 'twitter:card',
  TWITTER_SITE: 'twitter:site',
  TWITTER_SITE_ID: 'twitter:site:id',
  TWITTER_CREATOR: 'twitter:creator',
  TWITTER_CREATOR_ID: 'twitter:creator:id',
  TWITTER_DESCRIPTION: 'twitter:description',
  TWITTER_TITLE: 'twitter:title',
  TWITTER_IMAGE: 'twitter:image',
  TWITTER_IMAGE_ALT: 'twitter:image:alt',
  TWITTER_PLAYER: 'twitter:player',
  TWITTER_PLAYER_WIDTH: 'twitter:player:width',
  TWITTER_PLAYER_HEIGHT: 'twitter:player:height',
  TWITTER_PLAYER_STREAM: 'twitter:player:stream',
  TWITTER_APP_NAME_IPHONE: 'twitter:app:name:iphone',
  TWITTER_APP_ID_IPHONE: 'twitter:app:id:iphone',
  TWITTER_APP_URL_IPHONE: 'twitter:app:url:iphone',
  TWITTER_APP_NAME_IPAD: 'twitter:app:name:ipad',
  TWITTER_APP_ID_IPAD: 'twitter:app:id:ipad',
  TWITTER_APP_URL_IPAD: 'twitter:app:url:ipad',
  TWITTER_APP_NAME_GOOGLEPLAY: 'twitter:app:name:googleplay',
  TWITTER_APP_ID_GOOGLEPLAY: 'twitter:app:id:googleplay',
  TWITTER_APP_URL_GOOGLEPLAY: 'twitter:app:url:googleplay',
} as const

export type TwitterRecord =
  | TwitterCard
  | TwitterSite
  | TwitterSiteID
  | TwitterCreator
  | TwitterCreatorID
  | TwitterDescription
  | TwitterTitle
  | TwitterImage
  | TwitterImageAlt
  | TwitterPlayer
  | TwitterPlayerWidth
  | TwitterPlayerHeight
  | TwitterPlayerStream
  | TwitterAppNameIphone
  | TwitterAppIDIphone
  | TwitterAppURLIphone
  | TwitterAppNameIpad
  | TwitterAppIDIpad
  | TwitterAppURLIpad
  | TwitterAppNameGooglePlay
  | TwitterAppIDGooglePlay
  | TwitterAppURLGooglePlay

interface TwitterMetaBase<
  Property extends PropertyTwitter,
  Content extends Types.Type
> extends MetaBase<Property, Content> {}

/**
 * The card type
 *
 * Used with all cards
 */
interface TwitterCard
  extends TwitterMetaBase<
    twitter<'card'>,
    Types.Enum<'summary_large_image' | 'summary' | 'app' | 'player'>
  > {}

/**
 * @username of website. Either twitter:site or twitter:site:id is required.
 *
 * Used with summary, summary_large_image, app, player cards
 * @link TwitterSiteID
 */
interface TwitterSite extends TwitterMetaBase<twitter<'site'>, Types.String> {}

/**
 * Same as twitter:site, but the user’s Twitter ID. Either twitter:site or twitter:site:id is required.
 *
 * Used with summary, summary_large_image, player cards
 * @link TwitterSite
 */
interface TwitterSiteID
  extends TwitterMetaBase<twitter<'site:id'>, Types.String> {}

/**
 * @username of content creator
 *
 * Used with summary_large_image cards
 */
interface TwitterCreator
  extends TwitterMetaBase<twitter<'creator'>, Types.String> {}

/**
 * Twitter user ID of content creator
 *
 * Used with summary, summary_large_image card
 */
interface TwitterCreatorID
  extends TwitterMetaBase<twitter<'creator:id'>, Types.String> {}

/**
 * Description of content (maximum 200 characters)
 *
 * Used with summary, summary_large_image, player cards
 */
interface TwitterDescription
  extends TwitterMetaBase<twitter<'description'>, Types.String> {}

/**
 * Title of content (max 70 characters)
 *
 * Used with summary, summary_large_image, player cards
 */
interface TwitterTitle
  extends TwitterMetaBase<twitter<'title'>, Types.String> {}

/**
 * URL of image to use in the card. Images must be less than 5MB in size. JPG, PNG, WEBP and GIF formats are supported. Only the first frame of an animated GIF will be used. SVG is not supported.
 *
 * Used with summary, summary_large_image, player cards
 */
interface TwitterImage extends TwitterMetaBase<twitter<'image'>, Types.URL> {}

/**
 * A text description of the image conveying the essential nature of an image to users who are visually impaired. Maximum 420 characters.
 *
 * Used with summary, summary_large_image, player cards
 */
interface TwitterImageAlt
  extends TwitterMetaBase<twitter<'image:alt'>, Types.String> {}

/**
 * HTTPS URL of player iframe
 *
 * Used with player card
 */
interface TwitterPlayer extends TwitterMetaBase<twitter<'player'>, Types.URL> {}

/**
 * Width of iframe in pixels
 *
 * Used with player card
 */
interface TwitterPlayerWidth
  extends TwitterMetaBase<twitter<'player:width'>, Types.Integer> {}

/**
 * Height of iframe in pixels
 *
 * Used with player card
 */
interface TwitterPlayerHeight
  extends TwitterMetaBase<twitter<'player:height'>, Types.Integer> {}

/**
 * URL to raw video or audio stream
 *
 * Used with player card
 */
interface TwitterPlayerStream
  extends TwitterMetaBase<twitter<'player:stream'>, Types.URL> {}

/**
 * Name of your iPhone app
 *
 * Used with app card
 */
interface TwitterAppNameIphone
  extends TwitterMetaBase<twitter<'app:name:iphone'>, Types.String> {}

/**
 * Your app ID in the iTunes App Store (Note: NOT your bundle ID)
 *
 * Used with app card
 */
interface TwitterAppIDIphone
  extends TwitterMetaBase<twitter<'app:id:iphone'>, Types.String> {}

/**
 * Your app’s custom URL scheme (you must include ”://” after your scheme name)
 *
 * Used with app card
 */
interface TwitterAppURLIphone
  extends TwitterMetaBase<twitter<'app:url:iphone'>, Types.URL> {}

/**
 * Name of your iPad optimized app.
 * Used with app card
 */
interface TwitterAppNameIpad
  extends TwitterMetaBase<twitter<'app:name:ipad'>, Types.String> {}

/**
 * Your app ID in the iTunes App Store
 *
 * Used with app card
 */
interface TwitterAppIDIpad
  extends TwitterMetaBase<twitter<'app:id:ipad'>, Types.String> {}

/**
 * Your app’s custom URL scheme
 *
 * Used with app card
 */
interface TwitterAppURLIpad
  extends TwitterMetaBase<twitter<'app:url:ipad'>, Types.URL> {}

/**
 * Name of your Android app
 *
 * Used with app card
 */
interface TwitterAppNameGooglePlay
  extends TwitterMetaBase<twitter<'app:name:googleplay'>, Types.String> {}

/**
 * Your app ID in the Google Play Store
 *
 * Used with app card
 */
interface TwitterAppIDGooglePlay
  extends TwitterMetaBase<twitter<'app:id:googleplay'>, Types.String> {}

/**
 * Your app’s custom URL scheme
 *
 * Used with app card
 */
interface TwitterAppURLGooglePlay
  extends TwitterMetaBase<twitter<'app:url:googleplay'>, Types.URL> {}

export interface TwitterCardMeta {
  readonly name: TwitterRecord['property']
  readonly content: string
}

/**
 * A polymorphic factory function to produce an OpenGraph TwitterCard record
 * with correct attribute.  Normalize the arguments to the Open Graph standard
 * `property` `content`
 * Can be used by providing a TwitterMetadata object or by partially applying
 * the `property` first and the `content` last
 * returns a Twitter Card Tags
 * @link https://developer.twitter.com/en/docs/twitter-for-websites/cards/overview/markup
 */
export function makeTwitterCardMeta<
  Metadata extends TwitterRecord,
  Property extends Metadata['property'],
  Content extends Metadata['content']
>(property: Property): (content: Content) => TwitterCardMeta

export function makeTwitterCardMeta<
  Metadata extends TwitterRecord,
  Property extends Metadata['property'],
  Content extends Metadata['content']
>(property: Property, content: Content): TwitterCardMeta

export function makeTwitterCardMeta<
  Metadata extends TwitterRecord,
  Property extends Metadata['property'],
  Content extends Metadata['content']
>(
  ...args: [property: Property, content: Content] | [property: Property]
): ((content: Content) => TwitterCardMeta) | TwitterCardMeta {
  /**
   * returns a Twitter Card Tags
   * @link https://developer.twitter.com/en/docs/twitter-for-websites/cards/overview/markup
   */
  if (args.length === 2) {
    const [property, content] = args
    return {
      name: property,
      content: String(content),
    } as const
  } else {
    const [property] = args
    return (content: Content): TwitterCardMeta =>
      ({ name: property, content: String(content) } as const)
  }
}

interface TwitterCardBase {
  /** The card type */
  card: Types.Enum<'summary_large_image' | 'summary' | 'app' | 'player'>

  /** @username of website */
  site?: Types.String
}

/**
 * # [Summary Card](https://developer.twitter.com/en/docs/twitter-for-websites/cards/overview/summary):
 * Title, description, and thumbnail.
 *
 * # [Summary Card with Large Image](https://developer.twitter.com/en/docs/twitter-for-websites/cards/overview/summary-card-with-large-image):
 * Similar to the Summary Card, but with a prominently-featured image.
 */
interface OpenGraphTwitterSummaryCard extends TwitterCardBase {
  /** The card type */
  card: Types.Enum<'summary_large_image' | 'summary'>

  /** the user’s Twitter ID */
  siteID?: Types.String

  /** @username of content creator */
  creator?: Types.String

  /** Twitter user ID of content creator */
  creatorID?: Types.String

  /** Description of content (maximum 200 characters) */
  description?: Types.String

  /** Title of content (max 70 characters) */
  title: Types.String

  /**
   * URL of image to use in the card. Images must be less than 5MB in size. JPG, PNG, WEBP and GIF formats are supported. Only the first frame of an animated GIF will be used. SVG is not supported.
   */
  image?: Types.URL

  /**
   * A text description of the image conveying the essential nature of an image to users who are visually impaired.
   * Maximum 420 characters.
   */
  imageAlt?: Types.String
}

/**
 * # [Player Card](https://developer.twitter.com/content/developer-twitter/en/docs/tweets/optimize-with-cards/overview/player-card):
 * A Card that can display video/audio/media.
 */
interface OpenGraphTwitterPlayerCard extends TwitterCardBase {
  /** The card type */
  card: Types.Enum<'player'>

  /** @username of website */
  site: Types.String

  /** the user’s Twitter ID */
  siteID?: Types.String

  /** Title of content (max 70 characters) */
  title: Types.String

  /** Description of content (maximum 200 characters) */
  description?: Types.String

  /**
   * URL of image to use in the card. Images must be less than 5MB in size. JPG, PNG, WEBP and GIF formats are supported. Only the first frame of an animated GIF will be used. SVG is not supported.
   */
  image: Types.URL

  /**
   * A text description of the image conveying the essential nature of an image to users who are visually impaired.
   * Maximum 420 characters.
   */
  imageAlt?: Types.String

  /** HTTPS URL of player iframe */
  player: Types.URL

  /** Width of iframe in pixels */
  playerWidth: Types.Integer

  /** Height of iframe in pixels */
  playerHeight: Types.Integer

  /** URL to raw video or audio stream */
  playerStream?: Types.URL
}

/**
 * # [App Card](https://developer.twitter.com/content/developer-twitter/en/docs/tweets/optimize-with-cards/overview/app-card):
 * A Card with a direct download to a mobile app.
 */
interface OpenGraphTwitterAppCard extends TwitterCardBase {
  /** The card type */
  card: Types.Enum<'app'>

  /** @username of website */
  site: Types.String

  /** Description of content (maximum 200 characters) */
  description?: Types.String

  /** Name of your iPhone app. */
  appNameIphone?: Types.String

  /** Your app ID in the iTunes App Store (Note: NOT your bundle ID). */
  appIDIphone: Types.String

  /** Your app’s custom URL scheme (you must include ”://” after your scheme name). */
  appURLIphone?: Types.URL

  /** Name of your iPad optimized app. */
  appNameIpad?: Types.String

  /** Your app ID in the iTunes App Store. */
  appIDIpad: Types.String

  /** Your app’s custom URL scheme */
  appURLIpad?: Types.URL

  /** Name of your Android app */
  appNameGooglePlay?: Types.String

  /** Your app ID in the Google Play Store */
  appIDGooglePlay: Types.String

  /** Your app’s custom URL schema in The Google Play Store*/
  appURLGooglePlay?: Types.URL
}

export type OpenGraphTwitterCard =
  | OpenGraphTwitterSummaryCard
  | OpenGraphTwitterAppCard
  | OpenGraphTwitterPlayerCard

function isOpenGraphTwitterSummaryCard(
  openGraphTwitterCard: OpenGraphTwitterCard
): openGraphTwitterCard is OpenGraphTwitterSummaryCard {
  return (
    openGraphTwitterCard.card === 'summary' ||
    openGraphTwitterCard.card === 'summary_large_image'
  )
}

function isOpenGraphTwitterAppCard(
  openGraphTwitterCard: OpenGraphTwitterCard
): openGraphTwitterCard is OpenGraphTwitterAppCard {
  return openGraphTwitterCard.card === 'app'
}

function isOpenGraphTwitterPlayerCard(
  openGraphTwitterCard: OpenGraphTwitterCard
): openGraphTwitterCard is OpenGraphTwitterPlayerCard {
  return openGraphTwitterCard.card === 'player'
}

export function makeOpenGraphTwitterCard(
  openGraphTwitterCard: OpenGraphTwitterCard
) {
  const cutAt420Characters = maxLength(420)
  const cutAt200Characters = maxLength(200)
  const cutAt70Characters = maxLength(70)

  if (isOpenGraphTwitterSummaryCard(openGraphTwitterCard)) {
    return [
      // CARD!
      makeTwitterCardMeta(
        PropertyTwitter.TWITTER_CARD,
        openGraphTwitterCard.card // 'summary_large_image' | 'summary'
      ),

      // SITE?
      ...insertLazilyIf(
        openGraphTwitterCard.site,
        makeTwitterCardMeta(PropertyTwitter.TWITTER_SITE)
      ),

      // SITE_ID?
      ...insertLazilyIf(
        openGraphTwitterCard.siteID,
        makeTwitterCardMeta(PropertyTwitter.TWITTER_SITE_ID)
      ),

      // TITLE!
      makeTwitterCardMeta(
        PropertyTwitter.TWITTER_TITLE,
        Types.String(cutAt70Characters(openGraphTwitterCard.title))
      ),

      // CREATOR?
      ...insertLazilyIf(
        openGraphTwitterCard.creator,
        makeTwitterCardMeta(PropertyTwitter.TWITTER_CREATOR)
      ),
      // CREATOR_ID?
      ...insertLazilyIf(
        openGraphTwitterCard.creatorID,
        makeTwitterCardMeta(PropertyTwitter.TWITTER_CREATOR_ID)
      ),

      // DESCRIPTION?
      ...insertLazilyIf(openGraphTwitterCard.description, (description) =>
        makeTwitterCardMeta(
          PropertyTwitter.TWITTER_DESCRIPTION,
          Types.String(cutAt200Characters(description))
        )
      ),

      // IMAGE?
      ...insertLazilyIf(
        openGraphTwitterCard.image,
        makeTwitterCardMeta(PropertyTwitter.TWITTER_IMAGE)
      ),

      // IMAGE_ALT?
      ...insertLazilyIf(openGraphTwitterCard.imageAlt, (imageAlt) =>
        makeTwitterCardMeta(
          PropertyTwitter.TWITTER_IMAGE_ALT,
          Types.String(cutAt420Characters(imageAlt))
        )
      ),
    ]
  }
  if (isOpenGraphTwitterPlayerCard(openGraphTwitterCard)) {
    return [
      // CARD!
      makeTwitterCardMeta(
        PropertyTwitter.TWITTER_CARD,
        openGraphTwitterCard.card // player
      ),

      // TITLE!
      makeTwitterCardMeta(
        PropertyTwitter.TWITTER_TITLE,
        Types.String(cutAt70Characters(openGraphTwitterCard.title))
      ),

      // SITE!
      makeTwitterCardMeta(
        PropertyTwitter.TWITTER_SITE,
        openGraphTwitterCard.site
      ),

      // SITE_ID?
      ...insertLazilyIf(
        openGraphTwitterCard.siteID,
        makeTwitterCardMeta(PropertyTwitter.TWITTER_SITE_ID)
      ),

      // DESCRIPTION?
      ...insertLazilyIf(openGraphTwitterCard.description, (description) =>
        makeTwitterCardMeta(
          PropertyTwitter.TWITTER_DESCRIPTION,
          Types.String(cutAt200Characters(description))
        )
      ),

      // IMAGE!
      makeTwitterCardMeta(
        PropertyTwitter.TWITTER_IMAGE,
        openGraphTwitterCard.image
      ),

      // IMAGE_ALT?
      ...insertLazilyIf(openGraphTwitterCard.imageAlt, (imageAlt) =>
        makeTwitterCardMeta(
          PropertyTwitter.TWITTER_IMAGE_ALT,
          Types.String(cutAt420Characters(imageAlt))
        )
      ),

      // PLAYER!
      makeTwitterCardMeta(
        PropertyTwitter.TWITTER_PLAYER,
        openGraphTwitterCard.player
      ),

      // PLAYER_WIDTH!
      makeTwitterCardMeta(
        PropertyTwitter.TWITTER_PLAYER_WIDTH,
        openGraphTwitterCard.playerWidth
      ),

      // PLAYER_HEIGHT!
      makeTwitterCardMeta(
        PropertyTwitter.TWITTER_PLAYER_HEIGHT,
        openGraphTwitterCard.playerHeight
      ),

      // PLAYER_STREAM?
      ...insertLazilyIf(
        openGraphTwitterCard.playerStream,
        makeTwitterCardMeta(PropertyTwitter.TWITTER_PLAYER_STREAM)
      ),
    ]
  }

  if (isOpenGraphTwitterAppCard(openGraphTwitterCard)) {
    return [
      // CARD!
      makeTwitterCardMeta(
        PropertyTwitter.TWITTER_CARD,
        openGraphTwitterCard.card // 'app'
      ),

      // SITE!
      makeTwitterCardMeta(
        PropertyTwitter.TWITTER_SITE,
        openGraphTwitterCard.site
      ),

      // DESCRIPTION?
      ...insertLazilyIf(openGraphTwitterCard.description, (description) =>
        makeTwitterCardMeta(
          PropertyTwitter.TWITTER_DESCRIPTION,
          Types.String(cutAt200Characters(description))
        )
      ),

      // APP_NAME_IPHONE?
      ...insertLazilyIf(
        openGraphTwitterCard.appNameIphone,
        makeTwitterCardMeta(PropertyTwitter.TWITTER_APP_NAME_IPHONE)
      ),

      // APP_ID_IPHONE!
      makeTwitterCardMeta(
        PropertyTwitter.TWITTER_APP_ID_IPHONE,
        openGraphTwitterCard.appIDIphone
      ),

      // APP_URL_IPHONE?
      ...insertLazilyIf(
        openGraphTwitterCard.appURLIphone,
        makeTwitterCardMeta(PropertyTwitter.TWITTER_APP_URL_IPHONE)
      ),

      // APP_NAME_IPAD?
      ...insertLazilyIf(
        openGraphTwitterCard.appNameIpad,
        makeTwitterCardMeta(PropertyTwitter.TWITTER_APP_NAME_IPAD)
      ),

      // APP_ID_IPAD!
      makeTwitterCardMeta(
        PropertyTwitter.TWITTER_APP_ID_IPAD,
        openGraphTwitterCard.appIDIpad
      ),

      // APP_URL_IPAD?
      ...insertLazilyIf(
        openGraphTwitterCard.appURLIpad,
        makeTwitterCardMeta(PropertyTwitter.TWITTER_APP_URL_IPAD)
      ),

      // APP_NAME_GOOGLEPLAY?
      ...insertLazilyIf(
        openGraphTwitterCard.appNameGooglePlay,
        makeTwitterCardMeta(PropertyTwitter.TWITTER_APP_NAME_GOOGLEPLAY)
      ),

      // APP_ID_APP_GOOGLEPLAY!
      makeTwitterCardMeta(
        PropertyTwitter.TWITTER_APP_ID_GOOGLEPLAY,
        openGraphTwitterCard.appIDGooglePlay
      ),

      // APP_URL_GOOGLEPLAY?
      ...insertLazilyIf(
        openGraphTwitterCard.appURLGooglePlay,
        makeTwitterCardMeta(PropertyTwitter.TWITTER_APP_URL_GOOGLEPLAY)
      ),
    ]
  }
  return []
}
