import type { BaseOrExtended, MetaBase } from './open-graph.ts'
import * as Types from './types.ts'
import { insertIf, maxLength, type ValueOf } from './utils/index.ts'

type Twitter<T extends string = ''> = BaseOrExtended<'twitter', T>
export type TwitterCardType = 'summary_large_image' | 'summary' | 'app' | 'player'
export type IPropertyTwitter = ValueOf<typeof PropertyTwitter>
export const PropertyTwitter = {
	TWITTER_APP_ID_GOOGLEPLAY: 'twitter:app:id:googleplay',
	TWITTER_APP_ID_IPAD: 'twitter:app:id:ipad',
	TWITTER_APP_ID_IPHONE: 'twitter:app:id:iphone',
	TWITTER_APP_NAME_GOOGLEPLAY: 'twitter:app:name:googleplay',
	TWITTER_APP_NAME_IPAD: 'twitter:app:name:ipad',
	TWITTER_APP_NAME_IPHONE: 'twitter:app:name:iphone',
	TWITTER_APP_URL_GOOGLEPLAY: 'twitter:app:url:googleplay',
	TWITTER_APP_URL_IPAD: 'twitter:app:url:ipad',
	TWITTER_APP_URL_IPHONE: 'twitter:app:url:iphone',
	TWITTER_CARD: 'twitter:card',
	TWITTER_CREATOR: 'twitter:creator',
	TWITTER_CREATOR_ID: 'twitter:creator:id',
	TWITTER_DESCRIPTION: 'twitter:description',
	TWITTER_IMAGE: 'twitter:image',
	TWITTER_IMAGE_ALT: 'twitter:image:alt',
	TWITTER_PLAYER: 'twitter:player',
	TWITTER_PLAYER_HEIGHT: 'twitter:player:height',
	TWITTER_PLAYER_STREAM: 'twitter:player:stream',
	TWITTER_PLAYER_WIDTH: 'twitter:player:width',
	TWITTER_SITE: 'twitter:site',
	TWITTER_SITE_ID: 'twitter:site:id',
	TWITTER_TITLE: 'twitter:title',
} as const

export type TwitterRecord =
	| TwitterCard
	| TwitterSite
	| TwitterSiteId
	| TwitterCreator
	| TwitterCreatorId
	| TwitterDescription
	| TwitterTitle
	| TwitterImage
	| TwitterImageAlt
	| TwitterPlayer
	| TwitterPlayerWidth
	| TwitterPlayerHeight
	| TwitterPlayerStream
	| TwitterAppNameIphone
	| TwitterAppIdIphone
	| TwitterAppUrlIphone
	| TwitterAppNameIpad
	| TwitterAppIdIpad
	| TwitterAppUrlIpad
	| TwitterAppNameGooglePlay
	| TwitterAppIdGooglePlay
	| TwitterAppUrlGooglePlay

type TwitterMetaBase<Property extends IPropertyTwitter, Content extends Types.Type> = MetaBase<Property, Content>

/**
 * The card type
 *
 * Used with all cards
 */
type TwitterCard = TwitterMetaBase<Twitter<'card'>, Types.Enum<TwitterCardType>>

/**
 * @username of website. Either twitter:site or twitter:site:id is required.
 *
 * Used with summary, summary_large_image, app, player cards
 * @link TwitterSiteID
 */
type TwitterSite = TwitterMetaBase<Twitter<'site'>, Types.String>

/**
 * Same as twitter:site, but the user’s Twitter ID. Either twitter:site or twitter:site:id is required.
 *
 * Used with summary, summary_large_image, player cards
 * @link TwitterSite
 */
type TwitterSiteId = TwitterMetaBase<Twitter<'site:id'>, Types.String>

/**
 * @username of content creator
 *
 * Used with summary_large_image cards
 */
type TwitterCreator = TwitterMetaBase<Twitter<'creator'>, Types.String>

/**
 * Twitter user ID of content creator
 *
 * Used with summary, summary_large_image card
 */
type TwitterCreatorId = TwitterMetaBase<Twitter<'creator:id'>, Types.String>

/**
 * Description of content (maximum 200 characters)
 *
 * Used with summary, summary_large_image, player cards
 */
type TwitterDescription = TwitterMetaBase<Twitter<'description'>, Types.String>

/**
 * Title of content (max 70 characters)
 *
 * Used with summary, summary_large_image, player cards
 */
type TwitterTitle = TwitterMetaBase<Twitter<'title'>, Types.String>

/**
 * URL of image to use in the card. Images must be less than 5MB in size. JPG, PNG, WEBP and GIF formats are supported. Only the first frame of an animated GIF will be used. SVG is not supported.
 *
 * Used with summary, summary_large_image, player cards
 */
type TwitterImage = TwitterMetaBase<Twitter<'image'>, Types.URL>

/**
 * A text description of the image conveying the essential nature of an image to users who are visually impaired. Maximum 420 characters.
 *
 * Used with summary, summary_large_image, player cards
 */
type TwitterImageAlt = TwitterMetaBase<Twitter<'image:alt'>, Types.String>

/**
 * HTTPS URL of player iframe
 *
 * Used with player card
 */
type TwitterPlayer = TwitterMetaBase<Twitter<'player'>, Types.URL>

/**
 * Width of iframe in pixels
 *
 * Used with player card
 */
type TwitterPlayerWidth = TwitterMetaBase<Twitter<'player:width'>, Types.Integer>

/**
 * Height of iframe in pixels
 *
 * Used with player card
 */
type TwitterPlayerHeight = TwitterMetaBase<Twitter<'player:height'>, Types.Integer>

/**
 * URL to raw video or audio stream
 *
 * Used with player card
 */
type TwitterPlayerStream = TwitterMetaBase<Twitter<'player:stream'>, Types.URL>

/**
 * Name of your iPhone app
 *
 * Used with app card
 */
type TwitterAppNameIphone = TwitterMetaBase<Twitter<'app:name:iphone'>, Types.String>

/**
 * Your app ID in the iTunes App Store (Note: NOT your bundle ID)
 *
 * Used with app card
 */
type TwitterAppIdIphone = TwitterMetaBase<Twitter<'app:id:iphone'>, Types.String>

/**
 * Your app’s custom URL scheme (you must include ”://” after your scheme name)
 *
 * Used with app card
 */
type TwitterAppUrlIphone = TwitterMetaBase<Twitter<'app:url:iphone'>, Types.URL>

/**
 * Name of your iPad optimized app.
 * Used with app card
 */
type TwitterAppNameIpad = TwitterMetaBase<Twitter<'app:name:ipad'>, Types.String>

/**
 * Your app ID in the iTunes App Store
 *
 * Used with app card
 */
type TwitterAppIdIpad = TwitterMetaBase<Twitter<'app:id:ipad'>, Types.String>

/**
 * Your app’s custom URL scheme
 *
 * Used with app card
 */
type TwitterAppUrlIpad = TwitterMetaBase<Twitter<'app:url:ipad'>, Types.URL>

/**
 * Name of your Android app
 *
 * Used with app card
 */
type TwitterAppNameGooglePlay = TwitterMetaBase<Twitter<'app:name:googleplay'>, Types.String>

/**
 * Your app ID in the Google Play Store
 *
 * Used with app card
 */
type TwitterAppIdGooglePlay = TwitterMetaBase<Twitter<'app:id:googleplay'>, Types.String>

/**
 * Your app’s custom URL scheme
 *
 * Used with app card
 */
type TwitterAppUrlGooglePlay = TwitterMetaBase<Twitter<'app:url:googleplay'>, Types.URL>

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
	Content extends Metadata['content'],
>(property: Property): (content: Content) => TwitterCardMeta

export function makeTwitterCardMeta<
	Metadata extends TwitterRecord,
	Property extends Metadata['property'],
	Content extends Metadata['content'],
>(property: Property, content: Content): TwitterCardMeta

export function makeTwitterCardMeta<
	Metadata extends TwitterRecord,
	Property extends Metadata['property'],
	Content extends Metadata['content'],
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
			content: String(content),
			name: property,
		} as const
	}
	const [property] = args
	return (content: Content): TwitterCardMeta =>
		({
			content: String(content),
			name: property,
		}) as const
}

interface TwitterCardBase {
	/** The card type */
	twitterCard: Types.Enum<TwitterCardType>

	/** @username of website */
	twitterSite?: Types.String
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
	twitterCard: Types.Enum<'summary_large_image' | 'summary'>

	/** the user’s Twitter ID */
	twitterSiteID?: Types.String

	/** @username of content creator */
	twitterCreator?: Types.String

	/** Twitter user ID of content creator */
	twitterCreatorID?: Types.String

	/** Description of content (maximum 200 characters) */
	twitterDescription?: Types.String

	/** Title of content (max 70 characters) */
	twitterTitle: Types.String

	/**
	 * URL of image to use in the card. Images must be less than 5MB in size. JPG, PNG, WEBP and GIF formats are supported. Only the first frame of an animated GIF will be used. SVG is not supported.
	 */
	twitterImage?: Types.URL

	/**
	 * A text description of the image conveying the essential nature of an image to users who are visually impaired.
	 * Maximum 420 characters.
	 */
	twitterImageAlt?: Types.String
}

/**
 * # [Player Card](https://developer.twitter.com/content/developer-twitter/en/docs/tweets/optimize-with-cards/overview/player-card):
 * A Card that can display video/audio/media.
 */
interface OpenGraphTwitterPlayerCard extends TwitterCardBase {
	/** The card type */
	twitterCard: Types.Enum<'player'>

	/** @username of website */
	twitterSite: Types.String

	/** the user’s Twitter ID */
	twitterSiteID?: Types.String

	/** Title of content (max 70 characters) */
	twitterTitle: Types.String

	/** Description of content (maximum 200 characters) */
	twitterDescription?: Types.String

	/**
	 * URL of image to use in the card. Images must be less than 5MB in size. JPG, PNG, WEBP and GIF formats are supported. Only the first frame of an animated GIF will be used. SVG is not supported.
	 */
	twitterImage: Types.URL

	/**
	 * A text description of the image conveying the essential nature of an image to users who are visually impaired.
	 * Maximum 420 characters.
	 */
	twitterImageAlt?: Types.String

	/** HTTPS URL of player iframe */
	twitterPlayer: Types.URL

	/** Width of iframe in pixels */
	twitterPlayerWidth: Types.Integer

	/** Height of iframe in pixels */
	twitterPlayerHeight: Types.Integer

	/** URL to raw video or audio stream */
	twitterPlayerStream?: Types.URL
}

/**
 * # [App Card](https://developer.twitter.com/content/developer-twitter/en/docs/tweets/optimize-with-cards/overview/app-card):
 * A Card with a direct download to a mobile app.
 */
interface OpenGraphTwitterAppCard extends TwitterCardBase {
	/** The card type */
	twitterCard: Types.Enum<'app'>

	/** @username of website */
	twitterSite: Types.String

	/** Description of content (maximum 200 characters) */
	twitterDescription?: Types.String

	/** Name of your iPhone app. */
	twitterAppNameIphone?: Types.String

	/** Your app ID in the iTunes App Store (Note: NOT your bundle ID). */
	twitterAppIDIphone: Types.String

	/** Your app’s custom URL scheme (you must include ”://” after your scheme name). */
	twitterAppURLIphone?: Types.URL

	/** Name of your iPad optimized app. */
	twitterAppNameIpad?: Types.String

	/** Your app ID in the iTunes App Store. */
	twitterAppIDIpad: Types.String

	/** Your app’s custom URL scheme */
	twitterAppURLIpad?: Types.URL

	/** Name of your Android app */
	twitterAppNameGooglePlay?: Types.String

	/** Your app ID in the Google Play Store */
	twitterAppIDGooglePlay: Types.String

	/** Your app’s custom URL schema in The Google Play Store*/
	twitterAppURLGooglePlay?: Types.URL
}

export type OpenGraphTwitterCard = OpenGraphTwitterSummaryCard | OpenGraphTwitterAppCard | OpenGraphTwitterPlayerCard

function isOpenGraphTwitterSummaryCard(
	openGraphTwitterCard: OpenGraphTwitterCard,
): openGraphTwitterCard is OpenGraphTwitterSummaryCard {
	return openGraphTwitterCard.twitterCard === 'summary' || openGraphTwitterCard.twitterCard === 'summary_large_image'
}

function isOpenGraphTwitterAppCard(
	openGraphTwitterCard: OpenGraphTwitterCard,
): openGraphTwitterCard is OpenGraphTwitterAppCard {
	return openGraphTwitterCard.twitterCard === 'app'
}

function isOpenGraphTwitterPlayerCard(
	openGraphTwitterCard: OpenGraphTwitterCard,
): openGraphTwitterCard is OpenGraphTwitterPlayerCard {
	return openGraphTwitterCard.twitterCard === 'player'
}

export function makeOpenGraphTwitterCard(openGraphTwitterCard: OpenGraphTwitterCard): TwitterCardMeta[] {
	const cutAt420Characters = maxLength(420)
	const cutAt200Characters = maxLength(200)
	const cutAt70Characters = maxLength(70)

	if (isOpenGraphTwitterSummaryCard(openGraphTwitterCard)) {
		return [
			// CARD!
			makeTwitterCardMeta(
				PropertyTwitter.TWITTER_CARD,
				openGraphTwitterCard.twitterCard, // 'summary_large_image' | 'summary'
			),

			// SITE?
			...insertIf(openGraphTwitterCard.twitterSite, makeTwitterCardMeta(PropertyTwitter.TWITTER_SITE)),

			// SITE_ID?
			...insertIf(openGraphTwitterCard.twitterSiteID, makeTwitterCardMeta(PropertyTwitter.TWITTER_SITE_ID)),

			// TITLE!
			makeTwitterCardMeta(
				PropertyTwitter.TWITTER_TITLE,
				Types.String(cutAt70Characters(openGraphTwitterCard.twitterTitle)),
			),

			// CREATOR?
			...insertIf(openGraphTwitterCard.twitterCreator, makeTwitterCardMeta(PropertyTwitter.TWITTER_CREATOR)),
			// CREATOR_ID?
			...insertIf(openGraphTwitterCard.twitterCreatorID, makeTwitterCardMeta(PropertyTwitter.TWITTER_CREATOR_ID)),

			// DESCRIPTION?
			...insertIf(openGraphTwitterCard.twitterDescription, description =>
				makeTwitterCardMeta(PropertyTwitter.TWITTER_DESCRIPTION, Types.String(cutAt200Characters(description))),
			),

			// IMAGE?
			...insertIf(openGraphTwitterCard.twitterImage, makeTwitterCardMeta(PropertyTwitter.TWITTER_IMAGE)),

			// IMAGE_ALT?
			...insertIf(openGraphTwitterCard.twitterImageAlt, imageAlt =>
				makeTwitterCardMeta(PropertyTwitter.TWITTER_IMAGE_ALT, Types.String(cutAt420Characters(imageAlt))),
			),
		]
	}
	if (isOpenGraphTwitterPlayerCard(openGraphTwitterCard)) {
		return [
			// CARD!
			makeTwitterCardMeta(
				PropertyTwitter.TWITTER_CARD,
				openGraphTwitterCard.twitterCard, // player
			),

			// TITLE!
			makeTwitterCardMeta(
				PropertyTwitter.TWITTER_TITLE,
				Types.String(cutAt70Characters(openGraphTwitterCard.twitterTitle)),
			),

			// SITE!
			makeTwitterCardMeta(PropertyTwitter.TWITTER_SITE, openGraphTwitterCard.twitterSite),

			// SITE_ID?
			...insertIf(openGraphTwitterCard.twitterSiteID, makeTwitterCardMeta(PropertyTwitter.TWITTER_SITE_ID)),

			// DESCRIPTION?
			...insertIf(openGraphTwitterCard.twitterDescription, description =>
				makeTwitterCardMeta(PropertyTwitter.TWITTER_DESCRIPTION, Types.String(cutAt200Characters(description))),
			),

			// IMAGE!
			makeTwitterCardMeta(PropertyTwitter.TWITTER_IMAGE, openGraphTwitterCard.twitterImage),

			// IMAGE_ALT?
			...insertIf(openGraphTwitterCard.twitterImageAlt, imageAlt =>
				makeTwitterCardMeta(PropertyTwitter.TWITTER_IMAGE_ALT, Types.String(cutAt420Characters(imageAlt))),
			),

			// PLAYER!
			makeTwitterCardMeta(PropertyTwitter.TWITTER_PLAYER, openGraphTwitterCard.twitterPlayer),

			// PLAYER_WIDTH!
			makeTwitterCardMeta(PropertyTwitter.TWITTER_PLAYER_WIDTH, openGraphTwitterCard.twitterPlayerWidth),

			// PLAYER_HEIGHT!
			makeTwitterCardMeta(PropertyTwitter.TWITTER_PLAYER_HEIGHT, openGraphTwitterCard.twitterPlayerHeight),

			// PLAYER_STREAM?
			...insertIf(openGraphTwitterCard.twitterPlayerStream, makeTwitterCardMeta(PropertyTwitter.TWITTER_PLAYER_STREAM)),
		]
	}

	if (isOpenGraphTwitterAppCard(openGraphTwitterCard)) {
		return [
			// CARD!
			makeTwitterCardMeta(
				PropertyTwitter.TWITTER_CARD,
				openGraphTwitterCard.twitterCard, // 'app'
			),

			// SITE!
			makeTwitterCardMeta(PropertyTwitter.TWITTER_SITE, openGraphTwitterCard.twitterSite),

			// DESCRIPTION?
			...insertIf(openGraphTwitterCard.twitterDescription, description =>
				makeTwitterCardMeta(PropertyTwitter.TWITTER_DESCRIPTION, Types.String(cutAt200Characters(description))),
			),

			// APP_NAME_IPHONE?
			...insertIf(
				openGraphTwitterCard.twitterAppNameIphone,
				makeTwitterCardMeta(PropertyTwitter.TWITTER_APP_NAME_IPHONE),
			),

			// APP_ID_IPHONE!
			makeTwitterCardMeta(PropertyTwitter.TWITTER_APP_ID_IPHONE, openGraphTwitterCard.twitterAppIDIphone),

			// APP_URL_IPHONE?
			...insertIf(
				openGraphTwitterCard.twitterAppURLIphone,
				makeTwitterCardMeta(PropertyTwitter.TWITTER_APP_URL_IPHONE),
			),

			// APP_NAME_IPAD?
			...insertIf(openGraphTwitterCard.twitterAppNameIpad, makeTwitterCardMeta(PropertyTwitter.TWITTER_APP_NAME_IPAD)),

			// APP_ID_IPAD!
			makeTwitterCardMeta(PropertyTwitter.TWITTER_APP_ID_IPAD, openGraphTwitterCard.twitterAppIDIpad),

			// APP_URL_IPAD?
			...insertIf(openGraphTwitterCard.twitterAppURLIpad, makeTwitterCardMeta(PropertyTwitter.TWITTER_APP_URL_IPAD)),

			// APP_NAME_GOOGLEPLAY?
			...insertIf(
				openGraphTwitterCard.twitterAppNameGooglePlay,
				makeTwitterCardMeta(PropertyTwitter.TWITTER_APP_NAME_GOOGLEPLAY),
			),

			// APP_ID_APP_GOOGLEPLAY!
			makeTwitterCardMeta(PropertyTwitter.TWITTER_APP_ID_GOOGLEPLAY, openGraphTwitterCard.twitterAppIDGooglePlay),

			// APP_URL_GOOGLEPLAY?
			...insertIf(
				openGraphTwitterCard.twitterAppURLGooglePlay,
				makeTwitterCardMeta(PropertyTwitter.TWITTER_APP_URL_GOOGLEPLAY),
			),
		]
	}
	return []
}
