import React from 'react'
import { Helmet } from 'react-helmet'
import MetaOpenGraphProtocol, {
  makeOpenGraphMetaAttributesObject,
  TwitterMetadata,
  Types,
} from './meta.open-graph-protocol'

interface TwitterCardBase {
  /** The card type */
  card?: Types.Enum<'summary_large_image' | 'summary' | 'app' | 'player'>

  /** @username of website */
  site?: Types.String
}

interface TwitterSummaryCard extends TwitterCardBase {
  /** The card type */
  card?: Types.Enum<'summary_large_image' | 'summary'>

  /** the user’s Twitter ID */
  siteID?: Types.String

  /** @username of content creator */
  creator?: Types.String

  /** Twitter user ID of content creator */
  creatorID?: Types.String

  /** Description of content (maximum 200 characters) */
  description?: Types.String

  /** Title of content (max 70 characters) */
  title?: Types.String

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

interface TwitterPlayerCard extends TwitterCardBase {
  /** The card type */
  card?: Types.Enum<'player'>

  /** the user’s Twitter ID */
  siteID?: Types.String

  /** Title of content (max 70 characters) */
  title?: Types.String

  /** Description of content (maximum 200 characters) */
  description?: Types.String

  /**
   * URL of image to use in the card. Images must be less than 5MB in size. JPG, PNG, WEBP and GIF formats are supported. Only the first frame of an animated GIF will be used. SVG is not supported.
   */
  image?: Types.URL

  /**
   * A text description of the image conveying the essential nature of an image to users who are visually impaired.
   * Maximum 420 characters.
   */
  imageAlt?: Types.String

  /** HTTPS URL of player iframe */
  player?: Types.URL

  /** Width of iframe in pixels */
  playerWidth?: Types.Integer

  /** Height of iframe in pixels */
  playerHeight?: Types.Integer

  /** URL to raw video or audio stream */
  playerStream?: Types.URL
}

interface TwitterAppCard extends TwitterCardBase {
  /** The card type */
  card?: Types.Enum<'app'>

  /** Name of your iPhone app. */
  appNameIphone?: Types.String

  /** Your app ID in the iTunes App Store (Note: NOT your bundle ID). */
  appIDIphone?: Types.String

  /** Your app’s custom URL scheme (you must include ”://” after your scheme name). */
  appURLIphone?: Types.URL

  /** Name of your iPad optimized app. */
  appNameIpad?: Types.String

  /** Your app ID in the iTunes App Store. */
  appIDIpad?: Types.String

  /** Your app’s custom URL scheme */
  appURLIpad?: Types.URL

  /** Name of your Android app */
  appNameGooglePlay?: Types.String

  /** Your app ID in the Google Play Store */
  appIDGooglePlay?: Types.String

  /** Your app’s custom URL schema in The Google Play Store*/
  appURLGooglePlay?: Types.URL
}

type TwitterCard = TwitterSummaryCard | TwitterAppCard | TwitterPlayerCard

function makeTwitterCard(
  _twitterCard: TwitterCard
): readonly TwitterMetadata[] {
  // TODO: finish this implementation
  return []
}

interface Props {
  username: string
  title: string
  desc: string
  image: string
  type?: 'summary_large_image' | 'summary' | 'app'
}

export const Twitter: React.VFC<TwitterCard> = ({
  type = 'summary_large_image' as const,
  username,
  title,
  desc,
  image,
}) => {
  return (
    <Helmet
      meta={makeTwitterCard({}).map((t) => {
        // FIXME: address the miss typing!
        return makeOpenGraphMetaAttributesObject(t)
      })}
    >
      {username && (
        <MetaOpenGraphProtocol
          property="twitter:creator"
          content={Types.String(username)}
        />
      )}
      <MetaOpenGraphProtocol
        property="twitter:card"
        content={Types.Enum('summary_large_image', 'summary', 'app')(type)}
      />
      <MetaOpenGraphProtocol
        property="twitter:title"
        content={Types.String(title)}
      />
      <MetaOpenGraphProtocol
        property="twitter:description"
        content={Types.String(desc)}
      />
      <MetaOpenGraphProtocol
        property="twitter:image"
        content={Types.URL(image)}
      />
      <MetaOpenGraphProtocol
        property="twitter:image:alt"
        content={Types.String(desc)}
      />
    </Helmet>
  )
}
