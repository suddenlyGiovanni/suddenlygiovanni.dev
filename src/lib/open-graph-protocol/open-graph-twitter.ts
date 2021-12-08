import { insertLazilyIf } from '@lib/array'
import { maxLength } from '@lib/string'

import {
  makeOpenGraphMetaAttributesRecord as makeRecord,
  makeRecordCurried,
  Types,
} from './open-graph-protocol'

const cutAt420Characters = maxLength(420)
const cutAt200Characters = maxLength(200)
const cutAt70Characters = maxLength(70)

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
interface TwitterSummaryCard extends TwitterCardBase {
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
interface TwitterPlayerCard extends TwitterCardBase {
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
interface TwitterAppCard extends TwitterCardBase {
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

export type TwitterCard =
  | TwitterSummaryCard
  | TwitterAppCard
  | TwitterPlayerCard

function isTwitterSummaryCard(
  twitterCard: TwitterCard
): twitterCard is TwitterSummaryCard {
  return (
    twitterCard.card === 'summary' || twitterCard.card === 'summary_large_image'
  )
}

function isTwitterAppCard(
  twitterCard: TwitterCard
): twitterCard is TwitterAppCard {
  return twitterCard.card === 'app'
}

function isTwitterPlayerCard(
  twitterCard: TwitterCard
): twitterCard is TwitterPlayerCard {
  return twitterCard.card === 'player'
}

export function makeTwitterCard(twitterCard: TwitterCard) {
  // TODO: finish this implementation

  if (isTwitterSummaryCard(twitterCard)) {
    return [
      // CARD!
      makeRecord({
        property: 'twitter:card',
        content: twitterCard.card, // 'summary_large_image' | 'summary'
      }),

      // SITE?
      ...insertLazilyIf(twitterCard.site, makeRecordCurried('twitter:site')),

      // SITE_ID?
      ...insertLazilyIf(
        twitterCard.siteID,
        makeRecordCurried('twitter:site:id')
      ),

      // TITLE!
      makeRecord({
        property: 'twitter:title',
        content: Types.String(cutAt70Characters(twitterCard.title)),
      }),

      // CREATOR?
      ...insertLazilyIf(
        twitterCard.creator,
        makeRecordCurried('twitter:creator')
      ),
      // CREATOR_ID?
      ...insertLazilyIf(
        twitterCard.creatorID,
        makeRecordCurried('twitter:creator:id')
      ),

      // DESCRIPTION?
      ...insertLazilyIf(twitterCard.description, (description) =>
        makeRecord({
          property: 'twitter:description',
          content: Types.String(cutAt200Characters(description)),
        })
      ),

      // IMAGE?
      ...insertLazilyIf(twitterCard.image, makeRecordCurried('twitter:image')),

      // IMAGE_ALT?
      ...insertLazilyIf(twitterCard.imageAlt, (imageAlt) =>
        makeRecord({
          property: 'twitter:image:alt',
          content: Types.String(cutAt420Characters(imageAlt)),
        })
      ),
    ]
  }
  if (isTwitterPlayerCard(twitterCard)) {
    return [
      // CARD!
      makeRecord({
        property: 'twitter:card',
        content: twitterCard.card, // player
      }),

      // TITLE!
      makeRecord({
        property: 'twitter:title',
        content: Types.String(cutAt70Characters(twitterCard.title)),
      }),

      // SITE!
      makeRecord({
        property: 'twitter:site',
        content: twitterCard.site,
      }),

      // SITE_ID?
      ...insertLazilyIf(
        twitterCard.siteID,
        makeRecordCurried('twitter:site:id')
      ),

      // DESCRIPTION?
      ...insertLazilyIf(twitterCard.description, (description) =>
        makeRecord({
          property: 'twitter:description',
          content: Types.String(cutAt200Characters(description)),
        })
      ),

      // IMAGE!
      makeRecord({
        property: 'twitter:image',
        content: twitterCard.image,
      }),

      // IMAGE_ALT?
      ...insertLazilyIf(twitterCard.imageAlt, (imageAlt) =>
        makeRecord({
          property: 'twitter:image:alt',
          content: Types.String(cutAt420Characters(imageAlt)),
        })
      ),

      // PLAYER!
      makeRecord({
        property: 'twitter:player',
        content: twitterCard.player,
      }),

      // PLAYER_WIDTH!
      makeRecord({
        property: 'twitter:player:width',
        content: twitterCard.playerWidth,
      }),

      // PLAYER_HEIGHT!
      makeRecord({
        property: 'twitter:player:height',
        content: twitterCard.playerHeight,
      }),

      // PLAYER_STREAM?
      ...insertLazilyIf(
        twitterCard.playerStream,
        makeRecordCurried('twitter:player:stream')
      ),
    ]
  }

  if (isTwitterAppCard(twitterCard)) {
    return [
      // CARD!
      makeRecord({
        property: 'twitter:card',
        content: twitterCard.card, // 'app'
      }),

      // SITE!
      makeRecord({
        property: 'twitter:site',
        content: twitterCard.site,
      }),

      // DESCRIPTION?
      ...insertLazilyIf(twitterCard.description, (description) =>
        makeRecord({
          property: 'twitter:description',
          content: Types.String(cutAt200Characters(description)),
        })
      ),

      // APP_NAME_IPHONE?
      ...insertLazilyIf(
        twitterCard.appNameIphone,
        makeRecordCurried('twitter:app:name:iphone')
      ),

      // APP_ID_IPHONE!
      makeRecord({
        property: 'twitter:app:id:iphone',
        content: twitterCard.appIDIphone,
      }),

      // APP_URL_IPHONE?
      ...insertLazilyIf(
        twitterCard.appURLIphone,
        makeRecordCurried('twitter:app:url:iphone')
      ),

      // APP_NAME_IPAD?
      ...insertLazilyIf(
        twitterCard.appNameIpad,
        makeRecordCurried('twitter:app:name:ipad')
      ),

      // APP_ID_IPAD!
      makeRecord({
        property: 'twitter:app:id:ipad',
        content: twitterCard.appIDIpad,
      }),

      // APP_URL_IPAD?
      ...insertLazilyIf(
        twitterCard.appURLIpad,
        makeRecordCurried('twitter:app:url:ipad')
      ),

      // APP_NAME_GOOGLEPLAY?
      ...insertLazilyIf(
        twitterCard.appNameGooglePlay,
        makeRecordCurried('twitter:app:name:googleplay')
      ),

      // APP_ID_APP_NAME_GOOGLEPLAY!
      makeRecord({
        property: 'twitter:app:id:googleplay',
        content: twitterCard.appIDGooglePlay,
      }),

      // APP_URL_GOOGLEPLAY?
      ...insertLazilyIf(
        twitterCard.appURLGooglePlay,
        makeRecordCurried('twitter:app:url:googleplay')
      ),
    ]
  }
  return []
}
