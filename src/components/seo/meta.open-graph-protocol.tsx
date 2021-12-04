import { BaseOf, Brand, make } from '../../types/brand'

/**
 * The
 */
export namespace Types {
  /**
   * A Boolean represents a true or false value
   * @example
   * 'true', 'false', '1', '0'
   */
  export type Boolean = Brand<true | false | 1 | 0, 'Boolean'>
  export const Boolean = make<Boolean>()

  type Year = number
  type Month = number
  type Day = number
  type Hours = number
  type Minutes = number

  /**
   * A DateTime represents a temporal value composed of a date (year, month, day) and an optional time component (hours, minutes)
   * We support absolute ISO 8061 timestamps with the timezone defaulting to UTC.
   * The format we are expecting is YYYY-MM-DDThh:mm:ssZ. Z is used to express different time zones, and represents an offset from UTC. Examples:
   *
   * @example
   * January 26th, 2011 = 2011-01-26
   * January 26th, 2011 at 7:15pm = 2011-01-26T19:15
   * January 26th, 2001 at 7:15pm Pacific Standard Time = 2011-01-26T19:15-8:00
   */
  export type DateTime = Brand<
    | `${Year}-${Month}-${Day}`
    | `${Year}-${Month}-${Day}T${Hours}:${Minutes}`
    | `${Year}-${Month}-${Day}T${Hours}:${Minutes}${
        | '+'
        | '-'}${Hours}:${Minutes}`,
    'DateTime'
  >
  /**
   * converts a `${Year}-${Month}-${Day}` | `${Year}-${Month}-${Day}T${Hours}:${Minutes}` to a OpenGraph `DateTime`
   * @example
   * const instanceOfDateTime:Types.DateTime = Types.DateTime(`${2001}-${09}-${11}`)
   */
  export const DateTime = make<DateTime>()

  /**
   * A 64-bit signed floating point number
   * All literals that conform to the following formats:
   *
   * @example
   * 1.234
   * -1.234
   * 1.2e3
   * -1.2e3
   * 7E-10
   */
  export type Float = Brand<number, 'Float'>

  /**
   * converts a number to a OpenGraph `Float`
   * @example
   * const instanceOfFloat:Types.Float = Types.Float(0.001)
   */
  export const Float = make<Float>()

  /**
   * A 32-bit signed integer. In many languages integers over 32-bits become floats, so we limit Open Graph protocol for easy multi-language use.
   * All literals that conform to the following formats:
   * @example
   * 1234
   * -123
   */
  export type Integer = Brand<number, 'Integer'>

  /**
   * converts a number to a OpenGraph `Integer`
   * @example
   * const instanceOfInteger:Types.Integer = Types.Integer(49)
   */
  export const Integer = make<Integer>()

  /**
   * A sequence of Unicode characters
   * All literals composed of Unicode characters with no escape characters
   */
  export type String<T extends string = string> = Brand<T, 'String'>

  /**
   * converts a string to a OpenGraph `String`
   * @example
   * const instanceOfString:Types.String = Types.String('this is definitely a string')
   */
  export const String = <T extends string = string>(underlying: T) => {
    return make<String<T>>()(underlying as BaseOf<String<T>>)
  }

  /**
   * A sequence of Unicode characters that identify an Internet resource.
   * All valid URLs that utilize the `https://` or `https://` protocols
   */
  export type URL = Brand<string, 'URL'>

  /**
   * converts a string to a OpenGraph `URL`
   * @example
   * const instanceOfURL:Types.URL = Types.URL('https://duckduckgo.com')
   */
  export const URL = make<URL>()

  /**
   * A type consisting of bounded set of constant string values (enumeration members).
   * A string value that is a member of the enumeration
   */
  export type Enum<T extends string = string> = Brand<T, 'Enum'>

  /**
   * converts a union of string to a OpenGraph `Enum`
   * @example
   * const instanceOfEnum:Types.Enum<'foo' | 'bar'> = Types.Enum<'foo', 'bar'>('foo')
   */
  export const Enum = <T extends string = string>(underlying: T) =>
    make<Enum<T>>()(underlying as BaseOf<Enum<T>>)

  /**
   * The Disjoint union type of all the possible Open Graph Protocol types
   * @internal
   */
  export type Type = Boolean | DateTime | Float | Integer | String | URL | Enum
}

type ImageKeys = 'url' | 'secure_url' | 'type' | 'width' | 'height' | 'alt'
type VideoKeys = ImageKeys
type AudioKeys = 'secure_url' | 'type'

/**
 * a small subset of all the common MIME types
 */
export type MIME =
  | 'application/x-executable'
  | 'application/graphql'
  | 'application/javascript'
  | 'application/json'
  | 'application/ld+json'
  | 'application/feed+json'
  | 'application/msword'
  | 'application/pdf'
  | 'application/sql'
  | 'application/vnd.api+json'
  | 'application/vnd.ms-excel'
  | 'application/vnd.ms-powerpoint'
  | 'application/vnd.oasis.opendocument.text'
  | 'application/vnd.openxmlformats-officedocument.presentationml.presentation'
  | 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
  | 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  | 'application/x-www-form-urlencoded'
  | 'application/xml'
  | 'application/zip'
  | 'application/zstd'
  | 'application/macbinary'
  | 'audio/mpeg'
  | 'audio/ogg'
  | 'image/apng'
  | 'image/avif'
  | 'image/flif'
  | 'image/gif'
  | 'image/jpeg '
  | 'image/jxl'
  | 'image/png'
  | 'image/svg+xml'
  | 'image/webp'
  | 'image/x-mng'
  | 'multipart/form-data'
  | 'text/css'
  | 'text/csv'
  | 'text/html'
  | 'text/php'
  | 'text/plain'
  | 'text/xml'

export type MIMEContent = Types.Enum<MIME>

type og<T extends string> = `og:${T}`

type BaseOrExtended<
  Base extends string,
  Extended extends string = ''
> = Extended extends '' ? Base : `${Base}:${Extended}`

type locale<T extends string = ''> = BaseOrExtended<'locale', T>
type image<T extends string = ''> = BaseOrExtended<'image', T>
type audio<T extends string = ''> = BaseOrExtended<'audio', T>
type profile<T extends string = ''> = BaseOrExtended<'profile', T>
type video<T extends string = ''> = BaseOrExtended<'video', T>
type article<T extends string = ''> = BaseOrExtended<'article', T>
type music<T extends string = ''> = BaseOrExtended<'music', T>
type book<T extends string = ''> = BaseOrExtended<'book', T>
type twitter<T extends string = ''> = BaseOrExtended<'twitter', T>

type BasicMetadataKeys =
  | 'title'
  | 'type'
  | (image | image<ImageKeys>)
  | 'url'
  | (audio | audio<AudioKeys>)
  | 'description'
  | 'determiner'
  | (locale | locale<'alternate'>)
  | 'site_name'
  | (video | video<VideoKeys>)

type PropertyAttribute =
  | og<
      | BasicMetadataKeys
      | MusicMetadataKeys
      | VideoMetadataKeys
      | ArticleMetadataKeys
      | BookMetadataKeys
      | ProfileMetadataKeys
    >
  | TwitterMetadataKeys

interface MetadataBase<
  Property extends PropertyAttribute = PropertyAttribute,
  Content extends Types.Type = Types.Type
> {
  property: Property
  content: Content
}

/**
 * The title of your object as it should appear within the graph, e.g., "The Rock".
 */
interface Title extends MetadataBase<og<'title'>, Types.String> {}

export type TypeContent = Types.Enum<
  | 'website'
  | 'music.song'
  | 'music.album'
  | 'music.playlist'
  | 'music.radio_station'
  | 'video.movie'
  | 'video.episode'
  | 'video.tv_show'
  | 'video.other'
  | 'article'
  | 'book'
  | 'profile'
>

/**
 * The type of your object, e.g., "video.movie".
 * Depending on the type you specify, other properties may also be required.
 */
interface Type extends MetadataBase<og<'type'>, TypeContent> {}

/**
 * The canonical URL of your object that will be used as its permanent ID in the graph, e.g., "https://www.imdb.com/title/tt0117500/".
 */
interface Url extends MetadataBase<og<'url'>, Types.URL> {}

/**
 * As an example, the following is the Open Graph protocol markup for The Rock on IMDB:
 * @example
 * ```html
 * <html prefix="og: https://ogp.me/">
 * <head>
 * <title>The Rock (1996)</title>
 * <meta property="og:title" content="The Rock" />
 * <meta property="og:type" content="video.movie" />
 * <meta property="og:url" content="https://www.imdb.com/title/tt0117500/" />
 * <meta property="og:image" content="https://ia.media-imdb.com/images/rock.jpg" />
 * ...
 * </head>
 * ...
 * </html>
 * ```
 */
type BasicMetadata = Title | Type | Image | Url

/**
 * A one to two sentence description of your object.
 */
interface Description extends MetadataBase<og<'description'>, Types.String> {}

export type DelimiterContent = Types.Enum<'' | 'a' | 'an' | 'the' | 'auto'>

/**
 * The word that appears before this object's title in a sentence.
 * An enum of (a, an, the, "", auto).
 * If auto is chosen, the consumer of your data should chose between "a" or "an".
 * Default is "" (blank).
 */
interface Determiner extends MetadataBase<og<'determiner'>, DelimiterContent> {}

/**
 * The locale these tags are marked up in. Of the format language_TERRITORY.
 * Default is en_US.
 */
interface Locale extends MetadataBase<og<'locale'>, Types.String> {}

/**
 * An array of other locales this page is available in.
 */
interface LocaleAlternate
  extends MetadataBase<og<'locale:alternate'>, Types.String> {}

/**
 * If your object is part of a larger website, the name which should be displayed for the overall site. e.g., "IMDb".
 */
interface SiteName extends MetadataBase<og<'site_name'>, Types.String> {}

/**
 * The following properties are optional for any object and are generally recommended
 * For example (line-break solely for display purposes)
 * @example
 * ```html
 * <meta property="og:audio" content="https://example.com/bond/theme.mp3" />
 * <meta property="og:description"
 *   content="Sean Connery found fame and fortune as the
 *            suave, sophisticated British agent, James Bond." />
 * <meta property="og:determiner" content="the" />
 * <meta property="og:locale" content="en_GB" />
 * <meta property="og:locale:alternate" content="fr_FR" />
 * <meta property="og:locale:alternate" content="es_ES" />
 * <meta property="og:site_name" content="IMDb" />
 * <meta property="og:video" content="https://example.com/bond/trailer.swf" />
 * ```
 */
type OptionalMetadata =
  | Audio
  | Description
  | Determiner
  | Locale
  | LocaleAlternate
  | SiteName
  | Video
  | WebsiteType

interface ImageMetadataBase<
  Property extends og<image | image<ImageKeys>>,
  Content extends Types.Type
> extends MetadataBase<Property, Content> {}

/**
 * An image URL which should represent your object within the graph.
 */
interface Image extends ImageMetadataBase<og<image>, Types.URL> {}

/**
 * Identical to og:image
 * @link Image
 */
interface ImageURL extends ImageMetadataBase<og<image<'url'>>, Types.URL> {}

/**
 * An alternate url to use if the webpage requires HTTPS.
 */
interface ImageSecureURL
  extends ImageMetadataBase<og<image<'secure_url'>>, Types.URL> {}

/**
 * A MIME type for this image.
 */
interface ImageType extends ImageMetadataBase<og<image<'type'>>, MIMEContent> {}

/**
 * The number of pixels wide.
 */
interface ImageWidth
  extends ImageMetadataBase<og<image<'width'>>, Types.Integer> {}

/**
 * The number of pixels high.
 */
interface ImageHeight
  extends ImageMetadataBase<og<image<'height'>>, Types.Integer> {}

/**
 * A description of what is in the image (not a caption).
 * If the page specifies an og:image it should specify og:image:alt.
 */
interface ImageAlt extends ImageMetadataBase<og<image<'alt'>>, Types.String> {}

/**
 * @example
 * ```html
 *  <meta property="og:image" content="https://example.com/ogp.jpg" />
 *  <meta property="og:image:secure_url" content="https://secure.example.com/ogp.jpg" />
 *  <meta property="og:image:type" content="image/jpeg" />
 *  <meta property="og:image:width" content="400" />
 *  <meta property="og:image:height" content="300" />
 *  <meta property="og:image:alt" content="A shiny red apple with a bite taken out" />
 * ```
 */
type ImageMetadata =
  | Image
  | ImageURL
  | ImageSecureURL
  | ImageType
  | ImageWidth
  | ImageHeight
  | ImageAlt

interface VideoMetadataBase<
  Property extends og<video | video<VideoKeys>>,
  Content extends Types.Type
> extends MetadataBase<Property, Content> {}

/**
 * A URL to a video file that complements this object.
 */
interface Video extends VideoMetadataBase<og<video>, Types.URL> {}

/**
 * Identical to og:video.
 */
interface VideoURL extends VideoMetadataBase<og<video<'url'>>, Types.URL> {}

/**
 * An alternate url to use if the webpage requires HTTPS.
 */
interface VideoSecureURL
  extends VideoMetadataBase<og<video<'secure_url'>>, Types.URL> {}

/**
 * A MIME type for this video.
 */
interface VideoType extends VideoMetadataBase<og<video<'type'>>, MIMEContent> {}

/**
 * The number of pixels wide.
 */
interface VideoWidth
  extends VideoMetadataBase<og<video<'width'>>, Types.Integer> {}

/**
 * The number of pixels high.
 */
interface VideoHeight
  extends VideoMetadataBase<og<video<'height'>>, Types.Integer> {}

/**
 * A description of what is in the image (not a caption).
 * If the page specifies an og:video it should specify og:video:alt.
 */
interface VideoAlt extends VideoMetadataBase<og<video<'alt'>>, Types.String> {}

interface AudioMetadataBase<
  Property extends og<audio | audio<AudioKeys>>,
  Content extends Types.Type
> extends MetadataBase<Property, Content> {}

/**
 *  A URL to an audio file to accompany this object.
 */
interface Audio extends AudioMetadataBase<og<audio>, Types.URL> {}

interface AudioSecureURL
  extends AudioMetadataBase<og<audio<'secure_url'>>, Types.URL> {}

interface AudioType extends AudioMetadataBase<og<audio<'type'>>, MIMEContent> {}

/**
 * The og:audio tag only has the first 3 properties available (since size doesn't make sense for sound):
 * @example
 * ```html
 * <meta property="og:audio" content="https://example.com/sound.mp3" />
 * <meta property="og:audio:secure_url" content="https://secure.example.com/sound.mp3" />
 * <meta property="og:audio:type" content="audio/mpeg" />
 * ```
 */
type AudioMetadata = Audio | AudioSecureURL | AudioType

interface WebsiteType extends MetadataBase<og<'type'>, Types.Enum<'website'>> {}

/**
 * This object represents an article on a website. It is the preferred type for blog posts and news stories.
 */
interface ArticleType extends MetadataBase<og<'type'>, Types.Enum<article>> {}

type ArticleMetadataKeys =
  | article<'published_time'>
  | article<'modified_time'>
  | article<'expiration_time'>
  | article<'author'>
  | article<'section'>
  | article<'tag'>

interface ArticleMetadataBase<
  Property extends og<ArticleMetadataKeys>,
  Content extends Types.Type
> extends MetadataBase<Property, Content> {}

/**
 * When the article was first published.
 */
interface ArticlePublishedTime
  extends ArticleMetadataBase<og<article<'published_time'>>, Types.DateTime> {}

/**
 * When the article was last changed.
 */
interface ArticleModifiedTime
  extends ArticleMetadataBase<og<article<'modified_time'>>, Types.DateTime> {}

/**
 * When the article is out of date after.
 */
interface ArticleExpirationTime
  extends ArticleMetadataBase<og<article<'expiration_time'>>, Types.DateTime> {}

/**
 * Writers of the article.
 * array of profile
 */
interface ArticleAuthor
  extends ArticleMetadataBase<og<article<'author'>>, Types.URL> {}

/**
 * A high-level section name. E.g. Technology
 */
interface ArticleSection
  extends ArticleMetadataBase<og<article<'section'>>, Types.String> {}

/**
 * Tag words associated with this article
 * array of article:tag
 */
interface ArticleTag
  extends ArticleMetadataBase<og<article<'tag'>>, Types.String> {}

type ArticleMetadata =
  | ArticleType
  | ArticlePublishedTime
  | ArticleModifiedTime
  | ArticleExpirationTime
  | ArticleAuthor
  | ArticleSection
  | ArticleTag

/**
 * This object type represents a book or publication. This is an appropriate type for ebooks, as well as traditional paperback or hardback books. Do not use this type to represent magazines
 */
interface BookType extends MetadataBase<og<'type'>, Types.Enum<book>> {}

type BookMetadataKeys =
  | book<'author'>
  | book<'isbn'>
  | book<'release_date'>
  | book<'tag'>

interface BookMetadataBase<
  Property extends og<BookMetadataKeys>,
  Content extends Types.Type
> extends MetadataBase<Property, Content> {}

/**
 * Who wrote this book.
 * profile array
 * @link ProfileMetadata
 */
interface BookAuthor extends BookMetadataBase<og<book<'author'>>, Types.URL> {}

/**
 * The [ISBN](https://en.wikipedia.org/wiki/International_Standard_Book_Number)
 */
interface BookIsbn extends BookMetadataBase<og<book<'isbn'>>, Types.String> {}

/**
 * The date the book was released.
 * datetime
 */
interface BookReleaseDate
  extends BookMetadataBase<og<book<'release_date'>>, Types.DateTime> {}

/**
 * Tag words associated with this book.
 * string array
 */
interface BookTag extends BookMetadataBase<og<book<'tag'>>, Types.String> {}

type BookMetadata = BookType | BookAuthor | BookIsbn | BookReleaseDate | BookTag

interface MusicSongType
  extends MetadataBase<og<'type'>, Types.Enum<music<'song'>>> {}

interface MusicSongMetadataBase<
  Property extends og<MusicSongMetadataKeys>,
  Content extends Types.Type
> extends MetadataBase<Property, Content> {}

/**
 * The song's length in seconds.
 * integer >=1
 */
interface MusicSongDuration
  extends MusicSongMetadataBase<og<music<'duration'>>, Types.Integer> {}

/**
 * The album this song is from.
 * music.album array
 */
interface MusicSongAlbum
  extends MusicSongMetadataBase<og<music<'album'>>, Types.URL> {}

/**
 * Which disc of the album this song is on.
 * integer >=1
 */
interface MusicSongAlbumDisc
  extends MusicSongMetadataBase<og<music<'album:disc'>>, Types.Integer> {}

/**
 * Which track this song is.
 * integer >=1
 */
interface MusicSongAlbumTrack
  extends MusicSongMetadataBase<og<music<'album:track'>>, Types.Integer> {}

/**
 * The musician that made this song.
 * profile array
 * @link ProfileMetadata
 */
interface MusicSongMusician
  extends MusicSongMetadataBase<og<music<'musician'>>, Types.String> {}

type MusicSongRecord =
  | MusicSongType
  | MusicSongDuration
  | MusicSongAlbum
  | MusicSongAlbumDisc
  | MusicSongAlbumTrack
  | MusicSongMusician

interface MusicAlbumType
  extends MetadataBase<og<'type'>, Types.Enum<music<'album'>>> {}

interface MusicAlbumMetadataBase<
  Property extends og<MusicAlbumMetadataKeys>,
  Content extends Types.Type
> extends MetadataBase<Property, Content> {}

/**
 * The song on this album.
 * music.song
 * @link MusicSongRecord
 */
interface MusicAlbumSong
  extends MusicAlbumMetadataBase<og<music<'song'>>, Types.URL> {}

/**
 * The same as music:album:disc but in reverse.
 * integer >=1
 * @link MusicSongAlbumDisc
 */
interface MusicAlbumSongDisc
  extends MusicAlbumMetadataBase<og<music<'song:disc'>>, Types.Integer> {}

/**
 * The same as music:album:track but in reverse.
 * integer >=1
 * @link MusicSongAlbumTrack
 */
interface MusicAlbumSongTrack
  extends MusicAlbumMetadataBase<og<music<'song:track'>>, Types.Integer> {}

/**
 * The musician that made this song.
 * profile
 * @link ProfileMetadata
 */
interface MusicAlbumMusician
  extends MusicAlbumMetadataBase<og<music<'musician'>>, Types.URL> {}

/**
 * The date the album was released.
 * datetime
 */
interface MusicAlbumReleaseDate
  extends MusicAlbumMetadataBase<og<music<'release_date'>>, Types.DateTime> {}

type MusicAlbumRecord =
  | MusicAlbumType
  | MusicAlbumSong
  | MusicAlbumSongDisc
  | MusicAlbumSongTrack
  | MusicAlbumMusician
  | MusicAlbumReleaseDate

interface MusicPlaylistType
  extends MetadataBase<og<'type'>, Types.Enum<music<'playlist'>>> {}

interface MusicPlaylistMetadataBase<
  Property extends og<MusicPlaylistMetadataKeys>,
  Content extends Types.Type
> extends MetadataBase<Property, Content> {}

/**
 * The song on this playlist.
 * music.song
 * @link MusicSongRecord
 */
interface MusicPlaylistSong
  extends MusicPlaylistMetadataBase<og<music<'song'>>, Types.URL> {}

/**
 * The same as music:album:disc but in reverse.
 * integer >=1
 * @link MusicSongAlbumDisc
 */
interface MusicPlaylistSongDisc
  extends MusicPlaylistMetadataBase<og<music<'song:disc'>>, Types.Integer> {}

/**
 * The same as music:album:track but in reverse.
 * integer >=1
 * @link MusicSongAlbumTrack
 */
interface MusicPlaylistSongTrack
  extends MusicPlaylistMetadataBase<og<music<'song:track'>>, Types.Integer> {}

/**
 * The creator of this playlist.
 * profile
 * @link ProfileMetadata
 */
interface MusicPlaylistCreator
  extends MusicPlaylistMetadataBase<og<music<'creator'>>, Types.URL> {}

type MusicPlaylistRecord =
  | MusicPlaylistType
  | MusicPlaylistSong
  | MusicPlaylistSongDisc
  | MusicPlaylistSongTrack
  | MusicPlaylistCreator

interface MusicRadioStationType
  extends MetadataBase<og<'type'>, Types.Enum<music<'radio_station'>>> {}

interface MusicRadioStationMetadataBase<
  Property extends og<MusicRadioStationMetadataKeys>,
  Content extends Types.Type
> extends MetadataBase<Property, Content> {}

/**
 * The creator of this station.
 * profile
 * @link ProfileMetadata
 */
interface MusicRadioStationCreator
  extends MusicRadioStationMetadataBase<og<music<'creator'>>, Types.String> {}

type RadioStationRecord = MusicRadioStationType | MusicRadioStationCreator

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

type MusicMetadataKeys =
  | MusicSongMetadataKeys
  | MusicAlbumMetadataKeys
  | MusicPlaylistMetadataKeys
  | MusicRadioStationMetadataKeys

type MusicMetadata =
  | MusicSongRecord
  | MusicAlbumRecord
  | MusicPlaylistRecord
  | RadioStationRecord

interface VideoMovieType
  extends MetadataBase<og<'type'>, Types.Enum<video<'movie'>>> {}

interface VideoMovieMetadataBase<
  Property extends og<VideoMovieMetadataKeys>,
  Content extends Types.Type
> extends MetadataBase<Property, Content> {}

/**
 * Actors in the movie.
 * profile array
 * @link ProfileMetadata
 */
interface VideoMovieActor
  extends VideoMovieMetadataBase<og<video<'actor'>>, Types.URL> {}

/**
 * The role they played.
 * string
 */
interface VideoMovieActorRole
  extends VideoMovieMetadataBase<og<video<'actor:role'>>, Types.String> {}

/**
 * Directors of the movie.
 * profile array
 * @link ProfileMetadata
 */
interface VideoMovieDirector
  extends VideoMovieMetadataBase<og<video<'director'>>, Types.URL> {}

/**
 * Writers of the movie.
 * profile array
 * @link ProfileMetadata
 */
interface VideoMovieWriter
  extends VideoMovieMetadataBase<og<video<'writer'>>, Types.URL> {}

/**
 * The movie's length in seconds.
 * integer >=1
 */
interface VideoMovieDuration
  extends VideoMovieMetadataBase<og<video<'duration'>>, Types.Integer> {}

/**
 * The date the movie was released.
 * datetime
 */
interface VideoMovieReleaseDate
  extends VideoMovieMetadataBase<og<video<'release_date'>>, Types.DateTime> {}

/**
 * Tag words associated with this movie.
 * string array
 */
interface VideoMovieTag
  extends VideoMovieMetadataBase<og<video<'tag'>>, Types.String> {}

type VideoMovieRecord =
  | VideoMovieType
  | VideoMovieActor
  | VideoMovieActorRole
  | VideoMovieDirector
  | VideoMovieWriter
  | VideoMovieDuration
  | VideoMovieReleaseDate
  | VideoMovieTag

interface VideoEpisodeType
  extends MetadataBase<og<'type'>, Types.Enum<video<'episode'>>> {}

interface VideoEpisodeMetadataBase<
  Property extends og<VideoEpisodeMetadataKeys>,
  Content extends Types.Type
> extends MetadataBase<Property, Content> {}

/**
 * Actors in the episode.
 * profile array
 * @link ProfileMetadata
 */
interface VideoEpisodeActor
  extends VideoEpisodeMetadataBase<og<video<'actor'>>, Types.String> {}

/**
 * The role they played.
 * string
 */
interface VideoEpisodeActorRole
  extends VideoEpisodeMetadataBase<og<video<'actor:role'>>, Types.String> {}

/**
 * Directors of the Episode.
 * profile array
 * @link ProfileMetadata
 */
interface VideoEpisodeDirector
  extends VideoEpisodeMetadataBase<og<video<'director'>>, Types.String> {}

/**
 * Writers of the episode.
 * profile array
 * @link ProfileMetadata
 */
interface VideoEpisodeWriter
  extends VideoEpisodeMetadataBase<og<video<'writer'>>, Types.String> {}

/**
 * The episode's length in seconds.
 * integer >=1
 */
interface VideoEpisodeDuration
  extends VideoEpisodeMetadataBase<og<video<'duration'>>, Types.Integer> {}

/**
 * The date the episode was released.
 * datetime
 */
interface VideoEpisodeReleaseDate
  extends VideoEpisodeMetadataBase<og<video<'release_date'>>, Types.DateTime> {}

/**
 * Tag words associated with this movie.
 * string array
 */
interface VideoEpisodeTag
  extends VideoEpisodeMetadataBase<og<video<'tag'>>, Types.String> {}

/**
 * Which series this episode belongs to.
 * video.tv_show
 */
interface VideoEpisodeSeries
  extends VideoEpisodeMetadataBase<og<video<'series'>>, Types.URL> {}

type VideoEpisodeRecord =
  | VideoEpisodeType
  | VideoEpisodeActor
  | VideoEpisodeActorRole
  | VideoEpisodeDirector
  | VideoEpisodeWriter
  | VideoEpisodeDuration
  | VideoEpisodeReleaseDate
  | VideoEpisodeTag
  | VideoEpisodeSeries

interface VideoTvShowType
  extends MetadataBase<og<'type'>, Types.Enum<video<'tv_show'>>> {}

interface VideoOtherType
  extends MetadataBase<og<'type'>, Types.Enum<video<'other'>>> {}

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

type VideoMetadataKeys = VideoMovieMetadataKeys | VideoEpisodeMetadataKeys

type VideoMetadata =
  | Video
  | VideoURL
  | VideoSecureURL
  | VideoType
  | VideoWidth
  | VideoHeight
  | VideoAlt
  | VideoMovieRecord
  | VideoEpisodeRecord
  | VideoTvShowType
  | VideoOtherType

interface ProfileType extends MetadataBase<og<'type'>, Types.Enum<'profile'>> {}

type ProfileMetadataKeys =
  | profile<'first_name'>
  | profile<'last_name'>
  | profile<'username'>
  | profile<'gender'>

interface ProfileMetadataBase<
  Property extends og<ProfileMetadataKeys>,
  Content extends Types.Type
> extends MetadataBase<Property, Content> {}

/**
 * A name normally given to an individual by a parent or self-chosen.
 * string
 */
interface ProfileFirstName
  extends ProfileMetadataBase<og<profile<'first_name'>>, Types.String> {}

/**
 * A name inherited from a family or marriage and by which the individual is commonly known.
 * string
 */
interface ProfileLastName
  extends ProfileMetadataBase<og<profile<'last_name'>>, Types.String> {}

/**
 * A short unique string to identify them.
 * string
 */
interface ProfileUsername
  extends ProfileMetadataBase<og<profile<'username'>>, Types.String> {}

/**
 * Gender
 */
interface ProfileGender
  extends ProfileMetadataBase<
    og<profile<'gender'>>,
    Types.Enum<'male' | 'female'>
  > {}

type ProfileMetadata =
  | ProfileType
  | ProfileFirstName
  | ProfileLastName
  | ProfileUsername
  | ProfileGender

type TwitterMetadataKeys =
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
  Property extends TwitterMetadataKeys,
  Content extends Types.Type
> extends MetadataBase<Property, Content> {}

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

export type TwitterMetadata =
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

type OpenGraphMetadata =
  | BasicMetadata
  | OptionalMetadata
  | ImageMetadata
  | ArticleMetadata
  | BookMetadata
  | ProfileMetadata
  | AudioMetadata
  | VideoMetadata
  | MusicMetadata
  | TwitterMetadata

type OpenGraphMetaAttributes = Readonly<
  Partial<Omit<JSX.IntrinsicElements['meta'], 'property' | 'content'>> &
    (
      | { name: TwitterMetadata['property']; content: string }
      | {
          property: Exclude<OpenGraphMetadata, TwitterMetadata>['property']
          content: string
        }
    )
>

/**
 * A utility fn to produce the correct attributes for the open graph protocol meta tags
 * It also supports Twitter's custom schema
 *
 * @param property
 * @param content
 * @param IntrinsicMetaAttributes
 * @link https://ogp.me/#types
 */
export function makeOpenGraphMetaAttributesRecord({
  property,
  content,
  ...IntrinsicMetaAttributes
}: OpenGraphMetadata &
  Partial<
    Omit<JSX.IntrinsicElements['meta'], 'property' | 'content'>
  >): OpenGraphMetaAttributes {
  function isTwitterMetadata(
    openGraphMetadata: OpenGraphMetadata
  ): openGraphMetadata is TwitterMetadata {
    return openGraphMetadata.property.includes('twitter', 0)
  }

  const openGraphMetadata = { property, content } as OpenGraphMetadata

  return isTwitterMetadata(openGraphMetadata)
    ? /**
       * this branch returns a Twitter Card Tags
       * @link https://developer.twitter.com/en/docs/twitter-for-websites/cards/overview/markup
       */
      ({
        ...IntrinsicMetaAttributes,
        name: openGraphMetadata.property,
        content: String(openGraphMetadata.content),
      } as const)
    : ({
        ...IntrinsicMetaAttributes,
        property: openGraphMetadata.property,
        content: String(openGraphMetadata.content),
      } as const)
}

/**
 * an internal curried version of makeOpenGraphMetaAttributesRecord applying
 * only `property` an `content`
 * @see makeOpenGraphMetaAttributesRecord
 */
export function makeRecordCurried<
  Metadata extends OpenGraphMetadata,
  Property extends Metadata['property'],
  Content extends Metadata['content']
>(property: Property) {
  return (content: Content) =>
    makeOpenGraphMetaAttributesRecord({ property, content } as Metadata)
}

/**
 * React wrapper around the open graph specification
 * it supports the `The Open Graph protocol` and Twitter's custom implementation
 * @link https://ogp.me/#types
 */
export default function MetaOpenGraphProtocol(
  props: Partial<Omit<JSX.IntrinsicElements['meta'], 'property' | 'content'>> &
    OpenGraphMetadata
): JSX.Element {
  return <meta {...makeOpenGraphMetaAttributesRecord(props)} />
}
