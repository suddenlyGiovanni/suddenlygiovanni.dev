type ImageMetadata = 'url' | 'secure_url' | 'type' | 'width' | 'height' | 'alt'
type VideoMetadata = ImageMetadata
type AudioMetadata = 'secure_url' | 'type'

type BasicMetadataKeys =
  | 'title'
  | 'type'
  | `image${'' | `:${ImageMetadata}`}`
  | 'url'
  | `audio${'' | `:${AudioMetadata}`}`
  | 'description'
  | 'determiner'
  | 'locale'
  | 'site_name'
  | `video${'' | `:${VideoMetadata}`}`

type OG =
  | `og:${
      | BasicMetadataKeys
      | MusicMetadataKeys
      | VideoMetadataKeys
      | ArticleMetadataKeys
      | BookMetadataKeys
      | ProfileMetadataKeys}`
  | TwitterMetadataKeys

interface OpenGraphRecord<
  Property extends OG = OG,
  Content extends string = string
> {
  property: Property
  content: Content
}

interface OGTypeWebsite extends OpenGraphRecord<'og:type', 'website'> {}

/**
 * This object represents an article on a website. It is the preferred type for blog posts and news stories.
 */
interface OGTypeArticle extends OpenGraphRecord<'og:type', 'article'> {}

type article<StructureAttribute extends string> =
  `article:${StructureAttribute}`

type ArticleMetadataKeys =
  | article<'published_time'>
  | article<'modified_time'>
  | article<'expiration_time'>
  | article<'author'>
  | article<'section'>
  | article<'tag'>

/**
 * This object type represents a book or publication. This is an appropriate type for ebooks, as well as traditional paperback or hardback books. Do not use this type to represent magazines
 */
interface OGTypeBook extends OpenGraphRecord<'og:type', 'book'> {}

/**
 * This object type represents a single author of a book.
 */
interface OGTypeBooksAuthor
  extends OpenGraphRecord<'og:type', 'books.author'> {}

/**
 * This object type represents a book or publication. This is an appropriate type for ebooks, as well as traditional paperback or hardback books
 */
interface OGTypeBooksBook extends OpenGraphRecord<'og:type', 'books.book'> {}

/**
 * This object type represents the genre of a book or publication.
 */
interface OGTypeBooksGenre extends OpenGraphRecord<'og:type', 'books.genre'> {}

interface OGTypeBooksQuotes
  extends OpenGraphRecord<'og:type', 'books.quotes'> {}

type book<StructureAttribute extends string> = `book:${StructureAttribute}`
type BookMetadataKeys =
  | book<'author'>
  | book<'isbn'>
  | book<'release_date'>
  | book<'tag'>

export type OGTypeBooks =
  | OGTypeBook
  | OGTypeBooksAuthor
  | OGTypeBooksBook
  | OGTypeBooksGenre
  | OGTypeBooksQuotes

interface OGTypeMusicSong extends OpenGraphRecord<'og:type', 'music.song'> {}

interface OGTypeMusicAlbum extends OpenGraphRecord<'og:type', 'music.album'> {}

interface OGTypeMusicPlaylist
  extends OpenGraphRecord<'og:type', 'music.playlist'> {}

interface OGTypeMusicRadioStation
  extends OpenGraphRecord<'og:type', 'music.radio_station'> {}

type music<StructureAttribute extends string> = `music:${StructureAttribute}`
type MusicSongMetadataKeys =
  | music<'duration'>
  | music<'album'>
  | music<'album:disc'>
  | music<'album:track'>
  | music<'musician'>

type MusicAlbumMetadataKeys =
  | music<'song'>
  | music<'song:disc'>
  | music<'song:track'>
  | music<'musician'>
  | music<'release_date'>

type MusicPlaylistMetadataKeys =
  | music<'song'>
  | music<'song:disc'>
  | music<'song:track'>
  | music<'creator'>

type MusicRadioStationMetadataKeys = music<'creator'>

export type MusicMetadataKeys =
  | MusicSongMetadataKeys
  | MusicAlbumMetadataKeys
  | MusicPlaylistMetadataKeys
  | MusicRadioStationMetadataKeys

export type OGTypeMusic =
  | OGTypeMusicSong
  | OGTypeMusicAlbum
  | OGTypeMusicPlaylist
  | OGTypeMusicRadioStation

interface OGTypeVideoMovie extends OpenGraphRecord<'og:type', 'video.movie'> {}

interface OGTypeVideoEpisode
  extends OpenGraphRecord<'og:type', 'video.episode'> {}

interface OGTypeVideoTvShow
  extends OpenGraphRecord<'og:type', 'video.tv_show'> {}

interface OGTypeVideoOther extends OpenGraphRecord<'og:type', 'video.other'> {}

export type OGTypeVideos =
  | OGTypeVideoMovie
  | OGTypeVideoEpisode
  | OGTypeVideoTvShow
  | OGTypeVideoOther

type video<StructureAttribute extends string> = `video:${StructureAttribute}`
type VideoMovieMetadataKeys =
  | video<'actor'>
  | video<'actor:role'>
  | video<'director'>
  | video<'writer'>
  | video<'duration'>
  | video<'release_date'>
  | video<'tag'>

type VideoEpisodeMetadataKeys =
  | video<'actor'>
  | video<'actor:role'>
  | video<'director'>
  | video<'writer'>
  | video<'duration'>
  | video<'release_date'>
  | video<'tag'>
  | video<'series'>

export type VideoMetadataKeys =
  | VideoMovieMetadataKeys
  | VideoEpisodeMetadataKeys

export interface OGTypeProfile extends OpenGraphRecord<'og:type', 'profile'> {}

type profile<StructureAttribute extends string> =
  `profile:${StructureAttribute}`
type ProfileMetadataKeys =
  | profile<'first_name'>
  | profile<'last_name'>
  | profile<'username'>
  | profile<'gender'>

export type OpenGraphRecordType =
  | OGTypeWebsite
  | OGTypeArticle
  | OGTypeBooks
  | OGTypeMusic
  | OGTypeVideos
  | OGTypeProfile

type twitter<StructureAttribute extends string> =
  `twitter:${StructureAttribute}`

type TwitterMetadataKeys =
  | /**
   * The card type
   *
   * Used with all cards
   */
  twitter<'card'>
  /**
   * @username of website. Either twitter:site or twitter:site:id is required.
   *
   * Used with summary, summary_large_image, app, player cards
   */
  | twitter<'site'>
  /**
   * Same as twitter:site, but the user’s Twitter ID. Either twitter:site or twitter:site:id is required.
   *
   * Used with summary, summary_large_image, player cards
   */
  | twitter<'site:id'>
  /**
   * @username of content creator
   *
   * Used with summary_large_image cards
   */
  | twitter<'creator'>
  /**
   * Twitter user ID of content creator
   *
   * Used with summary, summary_large_image card
   */
  | twitter<'creator:id'>
  /**
   * Description of content (maximum 200 characters)
   *
   * Used with summary, summary_large_image, player cards
   */
  | twitter<'description'>
  /**
   * Title of content (max 70 characters)
   *
   * Used with summary, summary_large_image, player cards
   */
  | twitter<'title'>
  /**
   * URL of image to use in the card. Images must be less than 5MB in size. JPG, PNG, WEBP and GIF formats are supported. Only the first frame of an animated GIF will be used. SVG is not supported.
   *
   * Used with summary, summary_large_image, player cards
   */
  | twitter<'image'>
  /**
   * A text description of the image conveying the essential nature of an image to users who are visually impaired. Maximum 420 characters.
   *
   * Used with summary, summary_large_image, player cards
   */
  | twitter<'image:alt'>
  /**
   * HTTPS URL of player iframe
   *
   * Used with player card
   */
  | twitter<'player'>
  /**
   * Width of iframe in pixels
   *
   * Used with player card
   */
  | twitter<'player:width'>
  /**
   * Height of iframe in pixels
   *
   * Used with player card
   */
  | twitter<'player:height'>
  /**
   * URL to raw video or audio stream
   *
   * Used with player card
   */
  | twitter<'player:stream'>
  /**
   * Name of your iPhone app
   *
   * Used with app card
   */
  | twitter<'app:name:iphone'>
  /**
   * Your app ID in the iTunes App Store (Note: NOT your bundle ID)
   *
   * Used with app card
   */
  | twitter<'app:id:iphone'>
  /**
   * Your app’s custom URL scheme (you must include ”://” after your scheme name)
   *
   * Used with app card
   */
  | twitter<'app:url:iphone'>
  /**
   * Name of your iPad optimized app
   *
   * Used with app card
   */
  | twitter<'app:name:ipad'>
  /**
   * Your app ID in the iTunes App Store
   *
   * Used with app card
   */
  | twitter<'app:id:ipad'>
  /**
   * Your app’s custom URL scheme
   *
   * Used with app card
   */
  | twitter<'app:url:ipad'>
  /**
   * Name of your Android app
   *
   * Used with app card
   */
  | twitter<'app:name:googleplay'>
  /**
   * Your app ID in the Google Play Store
   *
   * Used with app card
   */
  | twitter<'app:id:googleplay'>
  /**
   * Your app’s custom URL scheme
   *
   * Used with app card
   */
  | twitter<'app:url:googleplay'>

export function MetaOpenGraph({
  property,
  content,
  ...MetaHTMLAttributes
}: (OpenGraphRecord | OpenGraphRecordType) &
  Omit<JSX.IntrinsicElements['meta'], 'property' | 'content'>) {
  return <meta {...MetaHTMLAttributes} property={property} content={content} />
}
