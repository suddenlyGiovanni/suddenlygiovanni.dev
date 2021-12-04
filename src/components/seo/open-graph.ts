import { insertLazilyIf, isArray } from '../../lib/array'
import {
  DelimiterContent,
  makeOpenGraphMetaAttributesRecord as makeRecord,
  makeRecordCurried,
  MIMEContent,
  TypeContent,
  Types,
} from './meta.open-graph-protocol'

interface OpenGraphImage {
  /**
   * An image URL which should represent your object within the graph.
   */
  ogImage: Types.URL

  /** Identical to og:image */
  ogImageURL?: Types.URL

  /** An alternate url to use if the webpage requires HTTPS. */
  ogImageSecureUrl?: Types.URL

  /** A MIME type for this image. */
  ogImageType?: MIMEContent

  /** The number of pixels wide. */
  ogImageWidth?: Types.Integer

  /** The number of pixels high. */
  ogImageHeight?: Types.Integer

  /** A description of what is in the image (not a caption). */
  ogImageAlt?: Types.String
}

export function makeOpenGraphImage(
  openGraphImage: Types.URL | OpenGraphImage | readonly OpenGraphImage[]
) {
  function _makeOpenGraphImage(ogImage: OpenGraphImage) {
    return [
      // IMAGE!
      makeRecord({ property: 'og:image', content: ogImage.ogImage }),

      // IMAGE_URL?
      ...insertLazilyIf(ogImage.ogImageURL, makeRecordCurried('og:image:url')),

      // IMAGE_SECURE_URL?
      ...insertLazilyIf(
        ogImage.ogImageSecureUrl,
        makeRecordCurried('og:image:secure_url')
      ),

      // IMAGE_TYPE?
      ...insertLazilyIf(
        ogImage.ogImageType,
        makeRecordCurried('og:image:type')
      ),

      // IMAGE_WIDTH?
      ...insertLazilyIf(
        ogImage.ogImageWidth,
        makeRecordCurried('og:image:width')
      ),

      // IMAGE_HEIGHT?
      ...insertLazilyIf(
        ogImage.ogImageHeight,
        makeRecordCurried('og:image:height')
      ),

      // IMAGE_ALT?
      ...insertLazilyIf(ogImage.ogImageAlt, makeRecordCurried('og:image:alt')),
    ]
  }

  if (typeof openGraphImage === 'string') {
    return [makeRecord({ property: 'og:image', content: openGraphImage })]
  } else if (isArray(openGraphImage)) {
    return openGraphImage.map((image) => _makeOpenGraphImage(image)).flat()
  } else {
    return _makeOpenGraphImage(openGraphImage)
  }
}

interface OpenGraphVideo {
  /** An video URL which should represent your object within the graph */
  ogVideo: Types.URL

  /** Identical to og:video */
  ogVideoURL?: Types.URL

  /** An alternate url to use if the webpage requires HTTPS. */
  ogVideoSecureUrl?: Types.URL

  /** A MIME type for this video. */
  ogVideoType?: MIMEContent

  /** The number of pixels wide. */
  ogVideoWidth?: Types.Integer

  /** The number of pixels high. */
  ogVideoHeight?: Types.Integer

  /** A description of what is in the video (not a caption). */
  ogVideoAlt?: Types.String
}

export function makeOpenGraphVideo(
  openGraphVideo: Types.URL | OpenGraphVideo | readonly OpenGraphVideo[]
) {
  function _makeOpenGraphVideo(_openGraphVideo: OpenGraphVideo) {
    return [
      // VIDEO!
      makeRecord({ property: 'og:video', content: _openGraphVideo.ogVideo }),

      // VIDEO_URL?
      ...insertLazilyIf(
        _openGraphVideo.ogVideoURL,
        makeRecordCurried('og:video:url')
      ),

      // VIDEO_SECURE_URL?
      ...insertLazilyIf(
        _openGraphVideo.ogVideoSecureUrl,
        makeRecordCurried('og:video:secure_url')
      ),

      // VIDEO_TYPE?
      ...insertLazilyIf(
        _openGraphVideo.ogVideoType,
        makeRecordCurried('og:video:type')
      ),

      // VIDEO_WIDTH?
      ...insertLazilyIf(
        _openGraphVideo.ogVideoWidth,
        makeRecordCurried('og:video:width')
      ),

      // VIDEO_HEIGHT?
      ...insertLazilyIf(
        _openGraphVideo.ogVideoHeight,
        makeRecordCurried('og:video:height')
      ),

      // VIDEO_ALT?
      ...insertLazilyIf(
        _openGraphVideo.ogVideoAlt,
        makeRecordCurried('og:video:alt')
      ),
    ]
  }

  if (typeof openGraphVideo === 'string') {
    return [makeRecord({ property: 'og:video', content: openGraphVideo })]
  } else if (isArray(openGraphVideo)) {
    return openGraphVideo.map(_makeOpenGraphVideo).flat()
  } else {
    return _makeOpenGraphVideo(openGraphVideo)
  }
}

interface OpenGraphAudio {
  /** An audio URL which should represent your object within the graph */
  ogAudio: Types.URL

  /** An alternate url to use if the webpage requires HTTPS. */
  ogAudioSecureUrl?: Types.URL

  /** A MIME type for this audio. */
  ogAudioType?: MIMEContent
}

export function makeOpenGraphAudio(
  openGraphAudio: Types.URL | OpenGraphAudio | readonly OpenGraphAudio[]
) {
  function _makeOpenGraphAudio(ogAudio: OpenGraphAudio) {
    return [
      // AUDIO!
      makeRecord({ property: 'og:audio', content: ogAudio.ogAudio }),

      // AUDIO_SECURE_URL?
      ...insertLazilyIf(
        ogAudio.ogAudioSecureUrl,
        makeRecordCurried('og:audio:secure_url')
      ),

      ...insertLazilyIf(
        ogAudio.ogAudioType,
        makeRecordCurried('og:audio:type')
      ),
    ]
  }

  if (typeof openGraphAudio === 'string') {
    return [makeRecord({ property: 'og:audio', content: openGraphAudio })]
  } else if (isArray(openGraphAudio)) {
    return openGraphAudio.map(_makeOpenGraphAudio).flat()
  } else {
    return _makeOpenGraphAudio(openGraphAudio)
  }
}

/**
 * To turn your web pages into graph objects, you need to add basic metadata to your page.
 * We've based the initial version of the protocol on RDFa which means that you'll place additional `<meta>` tags in the `<head>` of your web page.
 * The four required properties for every page are:
 */
interface OpenGraphBase {
  /**
   * The title of your object as it should appear within the graph,
   * e.g., “The Rock”.
   */
  ogTitle: Types.String

  /**
   * The type of your object, e.g., "video.movie".
   * Depending on the type you specify, other properties may also be required.
   */
  ogType: TypeContent

  /**
   * An image URL which should represent your object within the graph.
   */
  ogImage: Types.URL | OpenGraphImage | readonly OpenGraphImage[]

  /**
   * The canonical URL of your object that will be used as its permanent ID in the graph, e.g., "https://www.imdb.com/title/tt0117500/".
   */
  ogUrl: Types.URL
}

/**
 * The following properties are optional for any object and are generally recommended:
 */
interface OpenGraphBaseWithOptional extends OpenGraphBase {
  /** A URL to an audio file to accompany this object. */
  ogAudio?: Types.URL | OpenGraphAudio | readonly OpenGraphAudio[]

  /** A one to two sentence description of your object. */
  ogDescription?: Types.String

  /**
   * The word that appears before this object's title in a sentence. An enum of (a, an, the, "", auto). If auto is chosen, the consumer of your data should chose between "a" or "an". Default is "" (blank)
   */
  ogDeterminer?: DelimiterContent

  /**
   * The locale these tags are marked up in.
   * Of the format language_TERRITORY.
   * Default is en_US.
   */
  ogLocale?: Types.String

  /**
   * An array of other locales this page is available in.
   */
  ogLocaleAlternate?: Types.String | Types.String[]

  /**
   * If your object is part of a larger website, the name which should be displayed for the overall site.
   * A human-readable name for your site, e.g., "IMDb".
   */
  ogSiteName?: Types.String

  /**
   * A URL to a video file that complements this object.
   */
  ogVideo?: Types.URL | OpenGraphVideo | readonly OpenGraphVideo[]
}

export function makeOpenGraphBase({
  ogTitle,
  ogType,
  ogImage,
  ogUrl,
  ...optionalMetadata
}: OpenGraphBaseWithOptional) {
  return [
    // TITLE!
    makeRecord({ property: 'og:title', content: ogTitle }),

    // TYPE!
    makeRecord({ property: 'og:type', content: ogType }),

    // IMAGE!
    ...makeOpenGraphImage(ogImage),

    // URL!
    makeRecord({ property: 'og:url', content: ogUrl }),

    // AUDIO?
    ...insertLazilyIf(optionalMetadata.ogAudio, makeOpenGraphAudio).flat(),

    // DESCRIPTION?
    ...insertLazilyIf(
      optionalMetadata.ogDescription,
      makeRecordCurried('og:description')
    ),

    // DETERMINER?
    ...insertLazilyIf(
      optionalMetadata.ogDeterminer,
      makeRecordCurried('og:determiner')
    ),

    // LOCALE?
    ...insertLazilyIf(
      optionalMetadata.ogLocale,
      makeRecordCurried('og:locale')
    ),

    // LOCALE_ALTERNATE?
    ...insertLazilyIf(optionalMetadata.ogLocaleAlternate, (ogLocaleAlternate) =>
      isArray(ogLocaleAlternate)
        ? ogLocaleAlternate.map(makeRecordCurried('og:locale:alternate'))
        : makeRecord({
            property: 'og:locale:alternate',
            content: ogLocaleAlternate,
          })
    ).flat(),

    // SITE_NAME?
    ...insertLazilyIf(
      optionalMetadata.ogSiteName,
      makeRecordCurried('og:site_name')
    ),

    // VIDEO?
    ...insertLazilyIf(optionalMetadata.ogVideo, makeOpenGraphVideo).flat(),
  ]
}

interface OpenGraphProfile extends OpenGraphBaseWithOptional {
  ogType: Types.Enum<'profile'>

  /**
   * A name normally given to an individual by a parent or self-chosen.
   * string
   */
  ogProfileFirstName?: Types.String

  /**
   * A name inherited from a family or marriage and by which the individual is commonly known.
   * string
   */
  ogProfileLastName?: Types.String

  /**
   * A short unique string to identify them.
   * string
   */
  ogProfileUsername?: Types.String

  /** Gender */
  ogProfileGender?: Types.Enum<'male' | 'female'>
}

export function makeOpenGraphProfile(openGraphProfile: OpenGraphProfile) {
  return [
    // BASIC_METADATA!
    ...makeOpenGraphBase(openGraphProfile),

    // FIRST_NAME?
    ...insertLazilyIf(
      openGraphProfile.ogProfileFirstName,
      makeRecordCurried('og:profile:first_name')
    ),

    // LAST_NAME?
    ...insertLazilyIf(
      openGraphProfile.ogProfileLastName,
      makeRecordCurried('og:profile:last_name')
    ),

    // USER_NAME?
    ...insertLazilyIf(
      openGraphProfile.ogProfileUsername,
      makeRecordCurried('og:profile:username')
    ),

    // GENDER?
    ...insertLazilyIf(
      openGraphProfile.ogProfileGender,
      makeRecordCurried('og:profile:gender')
    ),
  ]
}

interface OpenGraphArticle extends OpenGraphBaseWithOptional {
  ogType: Types.Enum<'article'>

  /** When the article was first published. */
  ogArticlePublishedTime?: Types.DateTime

  /** When the article was last changed. */
  ogArticleModifiedTime?: Types.DateTime

  /** When the article is out of date after. */
  ogArticleExpirationTime?: Types.DateTime

  /**
   * Writers of the article.
   * array of profile
   */
  ogArticleAuthor?: Types.URL | readonly Types.URL[]

  /**
   * A high-level section name.
   * E.g. Technology
   */
  ogArticleSection?: Types.String

  /**
   * Tag words associated with this article
   * array of article:tag
   */
  ogArticleTag?: Types.String | readonly Types.String[]
}

export function makeOpenGraphArticle(openGraphArticle: OpenGraphArticle) {
  return [
    // BASIC_METADATA!
    ...makeOpenGraphBase(openGraphArticle),

    // PUBLISHED_TIME?
    ...insertLazilyIf(
      openGraphArticle.ogArticlePublishedTime,
      makeRecordCurried('og:article:published_time')
    ),

    // MODIFIED_TIME?
    ...insertLazilyIf(
      openGraphArticle.ogArticleModifiedTime,
      makeRecordCurried('og:article:modified_time')
    ),

    // EXPIRATION_TIME?
    ...insertLazilyIf(
      openGraphArticle.ogArticleExpirationTime,
      makeRecordCurried('og:article:expiration_time')
    ),

    // AUTHOR?
    ...insertLazilyIf(openGraphArticle.ogArticleAuthor, (ogArticleAuthor) =>
      isArray(ogArticleAuthor)
        ? ogArticleAuthor.map(makeRecordCurried('og:article:author'))
        : makeRecord({
            property: 'og:article:author',
            content: ogArticleAuthor,
          })
    ).flat(),

    // SECTION?
    ...insertLazilyIf(
      openGraphArticle.ogArticleSection,
      makeRecordCurried('og:article:section')
    ),

    // TAG?
    ...insertLazilyIf(openGraphArticle.ogArticleTag, (ogArticleTag) =>
      isArray(ogArticleTag)
        ? ogArticleTag.map(makeRecordCurried('og:article:tag'))
        : makeRecord({
            property: 'og:article:tag',
            content: ogArticleTag,
          })
    ).flat(),
  ]
}

interface OpenGraphBook extends OpenGraphBaseWithOptional {
  ogType: Types.Enum<'book'>

  /**
   * Who wrote this book.
   * profile array
   * @link ProfileMetadata
   */
  ogBookAuthor?: Types.URL | readonly Types.URL[]

  /**
   * The [ISBN](https://en.wikipedia.org/wiki/International_Standard_Book_Number)
   */
  ogBookIsbn?: Types.String

  /**
   * The date the book was released.
   * datetime
   */
  ogBookReleaseDate?: Types.DateTime

  /**
   * Tag words associated with this book.
   * string array
   */
  ogBookTag?: Types.String | readonly Types.String[]
}

export function makeOpenGraphBook(openGraphBook: OpenGraphBook) {
  return [
    // BASIC_METADATA!
    ...makeOpenGraphBase(openGraphBook),

    // BOOK_AUTHOR?
    ...insertLazilyIf(openGraphBook.ogBookAuthor, (ogBookAuthor) =>
      isArray(ogBookAuthor)
        ? ogBookAuthor.map(makeRecordCurried('og:book:author'))
        : makeRecord({ property: 'og:book:author', content: ogBookAuthor })
    ).flat(),

    // BOOK_ISBN?
    ...insertLazilyIf(
      openGraphBook.ogBookIsbn,
      makeRecordCurried('og:book:isbn')
    ),

    // BOOK_RELEASE_DATE?
    ...insertLazilyIf(
      openGraphBook.ogBookReleaseDate,
      makeRecordCurried('og:book:release_date')
    ),

    // BOOK_TAG?
    ...insertLazilyIf(openGraphBook.ogBookTag, (ogBookTag) =>
      isArray(ogBookTag)
        ? ogBookTag.map(makeRecordCurried('og:book:tag'))
        : makeRecord({ property: 'og:book:tag', content: ogBookTag })
    ).flat(),
  ]
}

interface OpenGraphWebsite extends OpenGraphBaseWithOptional {
  ogType: Types.Enum<'website'>
}

export function makeOpenGraphWebsite(openGraphWebsite: OpenGraphWebsite) {
  return makeOpenGraphBase(openGraphWebsite)
}

interface OpenGraphMusicSong extends OpenGraphBaseWithOptional {
  /**
   * The type of your object, e.g., "video.movie".
   * Depending on the type you specify, other properties may also be required.
   */
  ogType: Types.Enum<'music.song'>

  /** The song's length in seconds. integer >=1 */
  ogMusicDuration?: Types.Integer

  /** The album this song is from. music.album array */
  ogMusicAlbum?: Types.URL | Types.URL[]

  /** Which disc of the album this song is on. integer >=1 */
  ogMusicAlbumDisc?: Types.Integer

  /** Which track this song is. integer >=1 */
  ogMusicAlbumTrack?: Types.Integer

  /** The musician that made this song. profile array */
  ogMusicMusician?: Types.URL | Types.URL[]
}

export function makeOpenGraphMusicSong(openGraphMusicSong: OpenGraphMusicSong) {
  return [
    // BASIC_METADATA!
    ...makeOpenGraphBase(openGraphMusicSong),

    // DURATION?
    ...insertLazilyIf(openGraphMusicSong.ogMusicDuration, (ogMusicDuration) =>
      makeRecord({
        property: 'og:music:duration',
        content: Types.Integer(Math.round(ogMusicDuration)),
      })
    ),

    // ALBUM?
    ...insertLazilyIf(openGraphMusicSong.ogMusicAlbum, (ogMusicAlbum) =>
      isArray(ogMusicAlbum)
        ? ogMusicAlbum.map(makeRecordCurried('og:music:album'))
        : makeRecord({
            property: 'og:music:album',
            content: ogMusicAlbum,
          })
    ).flat(),

    // DISC?
    ...insertLazilyIf(openGraphMusicSong.ogMusicAlbumDisc, (ogMusicAlbumDisc) =>
      makeRecord({
        property: 'og:music:album:disc',
        content: Types.Integer(Math.round(ogMusicAlbumDisc)),
      })
    ),

    // TRACK?
    ...insertLazilyIf(
      openGraphMusicSong.ogMusicAlbumTrack,
      (ogMusicAlbumTrack) =>
        makeRecord({
          property: 'og:music:album:track',
          content: Types.Integer(Math.round(ogMusicAlbumTrack)),
        })
    ),

    // MUSICIAN?
    ...insertLazilyIf(openGraphMusicSong.ogMusicMusician, (ogMusicMusician) =>
      isArray(ogMusicMusician)
        ? ogMusicMusician.map(makeRecordCurried('og:music:musician'))
        : makeRecord({
            property: 'og:music:musician',
            content: ogMusicMusician,
          })
    ).flat(),
  ]
}

interface OpenGraphMusicAlbum extends OpenGraphBaseWithOptional {
  /**
   * The type of your object, e.g., "video.movie".
   * Depending on the type you specify, other properties may also be required.
   */
  ogType: Types.Enum<'music.album'>

  /** A song on this album.
   * This is a URL of a page with og type music.song.
   * Multiple music:song tags
   */
  ogMusicSong: Types.URL | readonly Types.URL[]

  /**
   * The disc number this song is on within this album [defaults to ‘1’]
   */
  ogMusicSongDisc?: Types.Integer

  /**
   * The track number of this song on this album [relative to the disc number]
   */
  ogMusicSongTrack?: Types.Integer

  /**
   * The artist of this album.
   * This is a URL of a page with og type profile.
   * Multiple music:musician tags can be specified.
   */
  ogMusicMusician?: Types.URL | readonly Types.URL[]

  /**
   * The date this album was first released, expressed in ISO 8061 format.
   */
  ogMusicReleaseData?: Types.DateTime
}

export function makeOpenGraphMusicAlbum(
  openGraphMusicAlbum: OpenGraphMusicAlbum
) {
  return [
    // BASIC_METADATA!
    ...makeOpenGraphBase(openGraphMusicAlbum),

    // SONG?
    ...insertLazilyIf(openGraphMusicAlbum.ogMusicSong, (ogMusicSong) => {
      return isArray(ogMusicSong)
        ? ogMusicSong.map(makeRecordCurried('og:music:song'))
        : makeRecord({
            property: 'og:music:song',
            content: ogMusicSong,
          })
    }).flat(),

    // DISC?
    ...insertLazilyIf(openGraphMusicAlbum.ogMusicSongDisc, (ogMusicSongDisc) =>
      makeRecord({
        property: 'og:music:song:disc',
        content: Types.Integer(Math.round(ogMusicSongDisc)),
      })
    ),

    // TRACK?
    ...insertLazilyIf(
      openGraphMusicAlbum.ogMusicSongTrack,
      (ogMusicSongTrack) =>
        makeRecord({
          property: 'og:music:song:track',
          content: Types.Integer(Math.round(ogMusicSongTrack)),
        })
    ),

    // MUSICIAN?
    ...insertLazilyIf(openGraphMusicAlbum.ogMusicMusician, (ogMusicMusician) =>
      isArray(ogMusicMusician)
        ? ogMusicMusician.map(makeRecordCurried('og:music:musician'))
        : makeRecord({
            property: 'og:music:musician',
            content: ogMusicMusician,
          })
    ).flat(),

    // RELEASE_DATE?
    ...insertLazilyIf(
      openGraphMusicAlbum.ogMusicReleaseData,
      makeRecordCurried('og:music:release_date')
    ),
  ]
}

interface OpenGraphMusicPlaylist extends OpenGraphBaseWithOptional {
  /** 'music.playlist' */
  ogType: Types.Enum<'music.playlist'>

  /**
   * A song on this playlist.
   * This is a URL of a page with og type music.song.
   * Multiple music:song tags can be specified.
   */
  ogMusicSong?: Types.URL | readonly Types.URL[]

  /** The track number of this song on this playlist. */
  ogMusicSongTrack?: Types.Integer

  /**
   * The creator of this playlist.
   * This is the canonical URL of a page with og type profile.
   * Multiple music:creator tags can be specified.
   */
  ogMusicCreator?: Types.URL | readonly Types.URL[]
}

export function makeOpenGraphMusicPlaylist(
  openGraphMusicPlaylist: OpenGraphMusicPlaylist
) {
  return [
    // BASIC_METADATA!
    ...makeOpenGraphBase(openGraphMusicPlaylist),

    // MUSIC_SONG?
    ...insertLazilyIf(openGraphMusicPlaylist.ogMusicSong, (ogMusicSong) =>
      isArray(ogMusicSong)
        ? ogMusicSong.map(makeRecordCurried('og:music:song'))
        : makeRecord({
            property: 'og:music:song',
            content: ogMusicSong,
          })
    ).flat(),

    // MUSIC_SONG_TRACK?
    ...insertLazilyIf(
      openGraphMusicPlaylist.ogMusicSongTrack,
      makeRecordCurried('og:music:song:track')
    ),

    // MUSIC_CREATOR?
    ...insertLazilyIf(openGraphMusicPlaylist.ogMusicCreator, (ogMusicCreator) =>
      isArray(ogMusicCreator)
        ? ogMusicCreator.map(makeRecordCurried('og:music:creator'))
        : makeRecord({
            property: 'og:music:creator',
            content: ogMusicCreator,
          })
    ).flat(),
  ]
}

interface OpenGraphMusicRadioStation extends OpenGraphBaseWithOptional {
  /** 'music.radio_station */
  ogType: Types.Enum<'music.radio_station'>

  /**
   * The URL of the actual radio stream
   */
  ogAudio: Types.URL

  /**
   * The creator of this radio station.
   * This is a URL of a page with og type profile.
   * Multiple music:creator tags can be specified.
   */
  ogMusicCreator?: Types.URL | readonly Types.URL[]
}

export function makeOpenGraphMusicRadioStation(
  openGraphMusicRadioStation: OpenGraphMusicRadioStation
) {
  return [
    // BASIC_METADATA! + AUDIO!
    ...makeOpenGraphBase(openGraphMusicRadioStation),

    // MUSIC_CREATOR?
    ...insertLazilyIf(
      openGraphMusicRadioStation.ogMusicCreator,
      (ogMusicCreator) =>
        isArray(ogMusicCreator)
          ? ogMusicCreator.map(makeRecordCurried('og:music:creator'))
          : makeRecord({
              property: 'og:music:creator',
              content: ogMusicCreator,
            })
    ).flat(),
  ]
}

interface OpenGraphVideoBase extends OpenGraphBaseWithOptional {
  ogType: Types.Enum<
    'video.movie' | 'video.episode' | 'video.tv_show' | 'video.other'
  >

  /**
   * Actors in the movie/episode/tv-show/other and the role they played.
   * @link ProfileMetadata
   */
  ogVideoActorAndRole?:
    | { actor: Types.URL; role?: Types.String }
    | readonly { actor: Types.URL; role?: Types.String }[]

  /**
   * Directors of the movie/episode/tv-show/other.
   * profile array
   * @link ProfileMetadata
   */
  ogVideoDirector?: Types.URL | readonly Types.URL[]

  /**
   * Writers of the movie/episode/tv-show/other.
   * profile array
   * @link ProfileMetadata
   */
  ogVideoWriter?: Types.URL | readonly Types.URL[]

  /**
   * The movie/episode/tv-show/other's length in seconds.
   * integer >=1
   */
  ogVideoDuration?: Types.Integer

  /**
   * The date the movie/episode/tv-show/other was released.
   * datetime
   */
  ogVideoReleaseDate?: Types.DateTime

  /**
   * Tag words associated with this movie/episode/tv-show/other.
   * string array
   */
  ogVideoTag?: Types.String | readonly Types.String[]
}

interface OpenGraphVideoMovie extends OpenGraphVideoBase {
  ogType: Types.Enum<'video.movie'>
}

function _makeOpenGraphVideoBase(openGraphVideoBase: OpenGraphVideoBase) {
  return [
    // BASIC_METADATA!
    ...makeOpenGraphBase(openGraphVideoBase),

    ...insertLazilyIf(
      openGraphVideoBase.ogVideoActorAndRole,
      (ogVideoActorAndRole) =>
        isArray(ogVideoActorAndRole)
          ? ogVideoActorAndRole.map(({ actor, role }) => [
              makeRecord({
                property: 'og:video:actor',
                content: actor,
              }),
              ...insertLazilyIf(role, makeRecordCurried('og:video:actor:role')),
            ])
          : [
              makeRecord({
                property: 'og:video:actor',
                content: ogVideoActorAndRole.actor,
              }),
              ...insertLazilyIf(
                ogVideoActorAndRole.role,
                makeRecordCurried('og:video:actor:role')
              ),
            ]
    ).flat(2),

    // DIRECTORS?
    ...insertLazilyIf(openGraphVideoBase.ogVideoDirector, (ogVideoDirector) =>
      isArray(ogVideoDirector)
        ? ogVideoDirector.map(makeRecordCurried('og:video:director'))
        : makeRecord({
            property: 'og:video:director',
            content: ogVideoDirector,
          })
    ).flat(),

    // WRITER?
    ...insertLazilyIf(openGraphVideoBase.ogVideoWriter, (ogVideoWriter) =>
      isArray(ogVideoWriter)
        ? ogVideoWriter.map(makeRecordCurried('og:video:writer'))
        : makeRecord({
            property: 'og:video:writer',
            content: ogVideoWriter,
          })
    ).flat(),

    // DURATION?
    ...insertLazilyIf(openGraphVideoBase.ogVideoDuration, (ogVideoDuration) =>
      makeRecord({
        property: 'og:video:duration',
        content: Types.Integer(Math.round(ogVideoDuration)),
      })
    ),

    // RELEASE_DATE?
    ...insertLazilyIf(
      openGraphVideoBase.ogVideoReleaseDate,
      makeRecordCurried('og:video:release_date')
    ),

    // TAGS?
    ...insertLazilyIf(openGraphVideoBase.ogVideoTag, (ogVideoTag) =>
      isArray(ogVideoTag)
        ? ogVideoTag.map(makeRecordCurried('og:video:tag'))
        : makeRecord({
            property: 'og:video:tag',
            content: ogVideoTag,
          })
    ).flat(),
  ]
}

export function makeOpenGraphVideoMovie(
  openGraphVideoMovie: OpenGraphVideoMovie
) {
  return _makeOpenGraphVideoBase(openGraphVideoMovie)
}

interface OpenGraphVideoEpisode extends OpenGraphVideoBase {
  ogType: Types.Enum<'video.episode'>

  /**
   * Which series this episode belongs to.
   * video.tv_show
   */
  ogVideoSeries?: Types.URL
}

export function makeOpenGraphVideoEpisode(
  openGraphVideoEpisode: OpenGraphVideoEpisode
) {
  return [
    // BASE_METADATA! + VIDEO_MOVIE_METADATA?
    ..._makeOpenGraphVideoBase(openGraphVideoEpisode),

    // VIDEO_SERIES?
    ...insertLazilyIf(
      openGraphVideoEpisode.ogVideoSeries,
      makeRecordCurried('og:video:series')
    ),
  ]
}

interface OpenGraphVideoTvShow extends OpenGraphVideoBase {
  ogType: Types.Enum<'video.tv_show'>
}

export function makeOpenGraphVideoTvShow(
  openGraphVideoTvShow: OpenGraphVideoTvShow
) {
  return _makeOpenGraphVideoBase(openGraphVideoTvShow)
}

interface OpenGraphVideoOther extends OpenGraphVideoBase {
  ogType: Types.Enum<'video.other'>
}

export function makeOpenGraphVideoOther(
  openGraphVideoOther: OpenGraphVideoOther
) {
  return _makeOpenGraphVideoBase(openGraphVideoOther)
}
