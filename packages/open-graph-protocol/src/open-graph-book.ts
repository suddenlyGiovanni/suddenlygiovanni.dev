import { insertLazilyIf, isArray, type ValueOf } from '@suddenlygiovanni/open-graph-protocol-utils'

import {
  type BaseOrExtended,
  makeOpenGraphMeta,
  type MetaBase,
  type og,
  PropertyBook,
  type Types,
} from './open-graph'
import {
  type BasicRecord,
  makeOpenGraphBase,
  type OgType,
  type OpenGraphBaseWithOptional,
  type OptionalRecord,
} from './open-graph-base'

export type book<T extends string = ''> = BaseOrExtended<'book', T>

export type IPropertyBook = ValueOf<typeof PropertyBook>

export type BookRecord =
  | Exclude<BasicRecord, OgType>
  | OptionalRecord
  | OgTypeBook
  | OgBookAuthor
  | OgBookIsbn
  | OgBookReleaseDate
  | OgBookTag

interface BookMetaBase<Property extends IPropertyBook, Content extends Types.Type>
  extends MetaBase<Property, Content> {}

/**
 * This object type represents a book or publication. This is an appropriate type for ebooks, as well as traditional paperback or hardback books. Do not use this type to represent magazines
 */
interface OgTypeBook extends MetaBase<og<'type'>, Types.Enum<book>> {}

/**
 * Who wrote this book.
 * profile array
 */
interface OgBookAuthor extends BookMetaBase<og<book<'author'>>, Types.URL> {}

/**
 * The [ISBN](https://en.wikipedia.org/wiki/International_Standard_Book_Number)
 */
interface OgBookIsbn extends BookMetaBase<og<book<'isbn'>>, Types.String> {}

/**
 * The date the book was released.
 * datetime
 */
interface OgBookReleaseDate extends BookMetaBase<og<book<'release_date'>>, Types.DateTime> {}

/**
 * Tag words associated with this book.
 * string array
 */
interface OgBookTag extends BookMetaBase<og<book<'tag'>>, Types.String> {}

interface OpenGraphBook extends OpenGraphBaseWithOptional {
  ogType: Types.Enum<'book'>

  /**
   * Who wrote this book.
   * profile array
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
        ? ogBookAuthor.map(makeOpenGraphMeta(PropertyBook.OG_BOOK_AUTHOR))
        : makeOpenGraphMeta(PropertyBook.OG_BOOK_AUTHOR, ogBookAuthor)
    ).flat(),

    // BOOK_ISBN?
    ...insertLazilyIf(openGraphBook.ogBookIsbn, makeOpenGraphMeta(PropertyBook.OG_BOOK_ISBN)),

    // BOOK_RELEASE_DATE?
    ...insertLazilyIf(
      openGraphBook.ogBookReleaseDate,
      makeOpenGraphMeta(PropertyBook.OG_BOOK_RELEASE_DATE)
    ),

    // BOOK_TAG?
    ...insertLazilyIf(openGraphBook.ogBookTag, (ogBookTag) =>
      isArray(ogBookTag)
        ? ogBookTag.map(makeOpenGraphMeta(PropertyBook.OG_BOOK_TAG))
        : makeOpenGraphMeta(PropertyBook.OG_BOOK_TAG, ogBookTag)
    ).flat(),
  ]
}
