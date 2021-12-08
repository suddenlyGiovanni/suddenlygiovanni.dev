import { insertLazilyIf } from '@lib/array'
import { maxLength } from '@lib/string'

import { type BaseOrExtended, Types } from './open-graph'
import type { MetaBase } from './open-graph-base'

type twitter<T extends string = ''> = BaseOrExtended<'twitter', T>

export type PropertyTwitter =
  | twitter<'card'>
  | twitter<'site'>
  | twitter<'site:id'>
  | twitter<'creator'>
  | twitter<'creator:id'>
  | twitter<'description'>
  | twitter<'title'>
  | twitter<'image'>
  | twitter<'image:alt'>
  | twitter<'player'>
  | twitter<'player:width'>
  | twitter<'player:height'>
  | twitter<'player:stream'>
  | twitter<'app:name:iphone'>
  | twitter<'app:id:iphone'>
  | twitter<'app:url:iphone'>
  | twitter<'app:name:ipad'>
  | twitter<'app:id:ipad'>
  | twitter<'app:url:ipad'>
  | twitter<'app:name:googleplay'>
  | twitter<'app:id:googleplay'>
  | twitter<'app:url:googleplay'>

interface TwitterMetadataBase<
  Property extends PropertyTwitter,
  Content extends Types.Type
> extends MetaBase<Property, Content> {}

/**
 * The card type
 *
 * Used with all cards
 */
interface TwitterCard
  extends TwitterMetadataBase<
    twitter<'card'>,
    Types.Enum<'summary_large_image' | 'summary' | 'app' | 'player'>
  > {}

/**
 * @username of website. Either twitter:site or twitter:site:id is required.
 *
 * Used with summary, summary_large_image, app, player cards
 * @link TwitterSiteID
 */
interface TwitterSite
  extends TwitterMetadataBase<twitter<'site'>, Types.String> {}

/**
 * Same as twitter:site, but the user’s Twitter ID. Either twitter:site or twitter:site:id is required.
 *
 * Used with summary, summary_large_image, player cards
 * @link TwitterSite
 */
interface TwitterSiteID
  extends TwitterMetadataBase<twitter<'site:id'>, Types.String> {}

/**
 * @username of content creator
 *
 * Used with summary_large_image cards
 */
interface TwitterCreator
  extends TwitterMetadataBase<twitter<'creator'>, Types.String> {}

/**
 * Twitter user ID of content creator
 *
 * Used with summary, summary_large_image card
 */
interface TwitterCreatorID
  extends TwitterMetadataBase<twitter<'creator:id'>, Types.String> {}

/**
 * Description of content (maximum 200 characters)
 *
 * Used with summary, summary_large_image, player cards
 */
interface TwitterDescription
  extends TwitterMetadataBase<twitter<'description'>, Types.String> {}

/**
 * Title of content (max 70 characters)
 *
 * Used with summary, summary_large_image, player cards
 */
interface TwitterTitle
  extends TwitterMetadataBase<twitter<'title'>, Types.String> {}

/**
 * URL of image to use in the card. Images must be less than 5MB in size. JPG, PNG, WEBP and GIF formats are supported. Only the first frame of an animated GIF will be used. SVG is not supported.
 *
 * Used with summary, summary_large_image, player cards
 */
interface TwitterImage
  extends TwitterMetadataBase<twitter<'image'>, Types.URL> {}

/**
 * A text description of the image conveying the essential nature of an image to users who are visually impaired. Maximum 420 characters.
 *
 * Used with summary, summary_large_image, player cards
 */
interface TwitterImageAlt
  extends TwitterMetadataBase<twitter<'image:alt'>, Types.String> {}

/**
 * HTTPS URL of player iframe
 *
 * Used with player card
 */
interface TwitterPlayer
  extends TwitterMetadataBase<twitter<'player'>, Types.URL> {}

/**
 * Width of iframe in pixels
 *
 * Used with player card
 */
interface TwitterPlayerWidth
  extends TwitterMetadataBase<twitter<'player:width'>, Types.Integer> {}

/**
 * Height of iframe in pixels
 *
 * Used with player card
 */
interface TwitterPlayerHeight
  extends TwitterMetadataBase<twitter<'player:height'>, Types.Integer> {}

/**
 * URL to raw video or audio stream
 *
 * Used with player card
 */
interface TwitterPlayerStream
  extends TwitterMetadataBase<twitter<'player:stream'>, Types.URL> {}

/**
 * Name of your iPhone app
 *
 * Used with app card
 */
interface TwitterAppNameIphone
  extends TwitterMetadataBase<twitter<'app:name:iphone'>, Types.String> {}

/**
 * Your app ID in the iTunes App Store (Note: NOT your bundle ID)
 *
 * Used with app card
 */
interface TwitterAppIDIphone
  extends TwitterMetadataBase<twitter<'app:id:iphone'>, Types.String> {}

/**
 * Your app’s custom URL scheme (you must include ”://” after your scheme name)
 *
 * Used with app card
 */
interface TwitterAppURLIphone
  extends TwitterMetadataBase<twitter<'app:url:iphone'>, Types.URL> {}

/**
 * Name of your iPad optimized app.
 * Used with app card
 */
interface TwitterAppNameIpad
  extends TwitterMetadataBase<twitter<'app:name:ipad'>, Types.String> {}

/**
 * Your app ID in the iTunes App Store
 *
 * Used with app card
 */
interface TwitterAppIDIpad
  extends TwitterMetadataBase<twitter<'app:id:ipad'>, Types.String> {}

/**
 * Your app’s custom URL scheme
 *
 * Used with app card
 */
interface TwitterAppURLIpad
  extends TwitterMetadataBase<twitter<'app:url:ipad'>, Types.URL> {}

/**
 * Name of your Android app
 *
 * Used with app card
 */
interface TwitterAppNameGooglePlay
  extends TwitterMetadataBase<twitter<'app:name:googleplay'>, Types.String> {}

/**
 * Your app ID in the Google Play Store
 *
 * Used with app card
 */
interface TwitterAppIDGooglePlay
  extends TwitterMetadataBase<twitter<'app:id:googleplay'>, Types.String> {}

/**
 * Your app’s custom URL scheme
 *
 * Used with app card
 */
interface TwitterAppURLGooglePlay
  extends TwitterMetadataBase<twitter<'app:url:googleplay'>, Types.URL> {}

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

export function makeTwitterCardMeta<Metadata extends TwitterRecord>(
  twitterMetadata: Metadata
): TwitterCardMeta

export function makeTwitterCardMeta<
  Metadata extends TwitterRecord,
  Property extends Metadata['property'],
  Content extends Metadata['content']
>(
  metadataOrProperty: Metadata | Property
): ((content: Content) => TwitterCardMeta) | TwitterCardMeta {
  /**
   * returns a Twitter Card Tags
   * @link https://developer.twitter.com/en/docs/twitter-for-websites/cards/overview/markup
   */
  return typeof metadataOrProperty === 'object'
    ? ({
        name: metadataOrProperty.property,
        content: String(metadataOrProperty.content),
      } as const)
    : (content: Content): TwitterCardMeta =>
        ({ name: metadataOrProperty, content: String(content) } as const)
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
      makeTwitterCardMeta({
        property: 'twitter:card',
        content: openGraphTwitterCard.card, // 'summary_large_image' | 'summary'
      }),

      // SITE?
      ...insertLazilyIf(
        openGraphTwitterCard.site,
        makeTwitterCardMeta('twitter:site')
      ),

      // SITE_ID?
      ...insertLazilyIf(
        openGraphTwitterCard.siteID,
        makeTwitterCardMeta('twitter:site:id')
      ),

      // TITLE!
      makeTwitterCardMeta({
        property: 'twitter:title',
        content: Types.String(cutAt70Characters(openGraphTwitterCard.title)),
      }),

      // CREATOR?
      ...insertLazilyIf(
        openGraphTwitterCard.creator,
        makeTwitterCardMeta('twitter:creator')
      ),
      // CREATOR_ID?
      ...insertLazilyIf(
        openGraphTwitterCard.creatorID,
        makeTwitterCardMeta('twitter:creator:id')
      ),

      // DESCRIPTION?
      ...insertLazilyIf(openGraphTwitterCard.description, (description) =>
        makeTwitterCardMeta({
          property: 'twitter:description',
          content: Types.String(cutAt200Characters(description)),
        })
      ),

      // IMAGE?
      ...insertLazilyIf(
        openGraphTwitterCard.image,
        makeTwitterCardMeta('twitter:image')
      ),

      // IMAGE_ALT?
      ...insertLazilyIf(openGraphTwitterCard.imageAlt, (imageAlt) =>
        makeTwitterCardMeta({
          property: 'twitter:image:alt',
          content: Types.String(cutAt420Characters(imageAlt)),
        })
      ),
    ]
  }
  if (isOpenGraphTwitterPlayerCard(openGraphTwitterCard)) {
    return [
      // CARD!
      makeTwitterCardMeta({
        property: 'twitter:card',
        content: openGraphTwitterCard.card, // player
      }),

      // TITLE!
      makeTwitterCardMeta({
        property: 'twitter:title',
        content: Types.String(cutAt70Characters(openGraphTwitterCard.title)),
      }),

      // SITE!
      makeTwitterCardMeta({
        property: 'twitter:site',
        content: openGraphTwitterCard.site,
      }),

      // SITE_ID?
      ...insertLazilyIf(
        openGraphTwitterCard.siteID,
        makeTwitterCardMeta('twitter:site:id')
      ),

      // DESCRIPTION?
      ...insertLazilyIf(openGraphTwitterCard.description, (description) =>
        makeTwitterCardMeta({
          property: 'twitter:description',
          content: Types.String(cutAt200Characters(description)),
        })
      ),

      // IMAGE!
      makeTwitterCardMeta({
        property: 'twitter:image',
        content: openGraphTwitterCard.image,
      }),

      // IMAGE_ALT?
      ...insertLazilyIf(openGraphTwitterCard.imageAlt, (imageAlt) =>
        makeTwitterCardMeta({
          property: 'twitter:image:alt',
          content: Types.String(cutAt420Characters(imageAlt)),
        })
      ),

      // PLAYER!
      makeTwitterCardMeta({
        property: 'twitter:player',
        content: openGraphTwitterCard.player,
      }),

      // PLAYER_WIDTH!
      makeTwitterCardMeta({
        property: 'twitter:player:width',
        content: openGraphTwitterCard.playerWidth,
      }),

      // PLAYER_HEIGHT!
      makeTwitterCardMeta({
        property: 'twitter:player:height',
        content: openGraphTwitterCard.playerHeight,
      }),

      // PLAYER_STREAM?
      ...insertLazilyIf(
        openGraphTwitterCard.playerStream,
        makeTwitterCardMeta('twitter:player:stream')
      ),
    ]
  }

  if (isOpenGraphTwitterAppCard(openGraphTwitterCard)) {
    return [
      // CARD!
      makeTwitterCardMeta({
        property: 'twitter:card',
        content: openGraphTwitterCard.card, // 'app'
      }),

      // SITE!
      makeTwitterCardMeta({
        property: 'twitter:site',
        content: openGraphTwitterCard.site,
      }),

      // DESCRIPTION?
      ...insertLazilyIf(openGraphTwitterCard.description, (description) =>
        makeTwitterCardMeta({
          property: 'twitter:description',
          content: Types.String(cutAt200Characters(description)),
        })
      ),

      // APP_NAME_IPHONE?
      ...insertLazilyIf(
        openGraphTwitterCard.appNameIphone,
        makeTwitterCardMeta('twitter:app:name:iphone')
      ),

      // APP_ID_IPHONE!
      makeTwitterCardMeta({
        property: 'twitter:app:id:iphone',
        content: openGraphTwitterCard.appIDIphone,
      }),

      // APP_URL_IPHONE?
      ...insertLazilyIf(
        openGraphTwitterCard.appURLIphone,
        makeTwitterCardMeta('twitter:app:url:iphone')
      ),

      // APP_NAME_IPAD?
      ...insertLazilyIf(
        openGraphTwitterCard.appNameIpad,
        makeTwitterCardMeta('twitter:app:name:ipad')
      ),

      // APP_ID_IPAD!
      makeTwitterCardMeta({
        property: 'twitter:app:id:ipad',
        content: openGraphTwitterCard.appIDIpad,
      }),

      // APP_URL_IPAD?
      ...insertLazilyIf(
        openGraphTwitterCard.appURLIpad,
        makeTwitterCardMeta('twitter:app:url:ipad')
      ),

      // APP_NAME_GOOGLEPLAY?
      ...insertLazilyIf(
        openGraphTwitterCard.appNameGooglePlay,
        makeTwitterCardMeta('twitter:app:name:googleplay')
      ),

      // APP_ID_APP_NAME_GOOGLEPLAY!
      makeTwitterCardMeta({
        property: 'twitter:app:id:googleplay',
        content: openGraphTwitterCard.appIDGooglePlay,
      }),

      // APP_URL_GOOGLEPLAY?
      ...insertLazilyIf(
        openGraphTwitterCard.appURLGooglePlay,
        makeTwitterCardMeta('twitter:app:url:googleplay')
      ),
    ]
  }
  return []
}
