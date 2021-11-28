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

type OG = `og:${
  | BasicMetadataKeys
  | MusicMetadataKeys
  | VideoMetadataKeys
  | ArticleMetadataKeys
  | BookMetadataKeys
  | ProfileMetadataKeys}`

interface OpenGraphRecord<Property extends OG, Content extends string> {
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

export function MetaOpenGraph<P extends OG, C extends string>({
  property,
  content,
  ...MetaHTMLAttributes
}: (OpenGraphRecord<P, C> | OpenGraphRecordType) &
  JSX.IntrinsicElements['meta']) {
  return <meta {...MetaHTMLAttributes} property={property} content={content} />
}
