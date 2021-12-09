import { insertLazilyIf, isArray } from '@lib/array'
import { ValueOf } from '@lib/types'

import {
  type BaseOrExtended,
  makeOpenGraphMeta,
  type og,
  type Types,
} from './open-graph'
import {
  type BasicRecord,
  makeOpenGraphBase,
  type MetaBase,
  type OpenGraphBaseWithOptional,
  type OptionalRecord,
  type Type,
} from './open-graph-base'

export type book<T extends string = ''> = BaseOrExtended<'book', T>

export type PropertyBook = ValueOf<typeof PropertyBook>
export const PropertyBook = {
  OG_BOOK_AUTHOR: 'og:book:author',
  OG_BOOK_ISBN: 'og:book:isbn',
  OG_BOOK_RELEASE_DATE: 'og:book:release_date',
  OG_BOOK_TAG: 'og:book:tag',
} as const

export type BookRecord =
  | Exclude<BasicRecord, Type>
  | OptionalRecord
  | TypeBook
  | BookAuthor
  | BookIsbn
  | BookReleaseDate
  | BookTag

interface BookMetaBase<
  Property extends PropertyBook,
  Content extends Types.Type
> extends MetaBase<Property, Content> {}

/**`
 * This object type represents a book or publication. This is an appropriate type for ebooks, as well as traditional paperback or hardback books. Do not use this type to represent magazines
 */
interface TypeBook extends MetaBase<og<'type'>, Types.Enum<book>> {}

/**
 * Who wrote this book.
 * profile array
 */
interface BookAuthor extends BookMetaBase<og<book<'author'>>, Types.URL> {}

/**
 * The [ISBN](https://en.wikipedia.org/wiki/International_Standard_Book_Number)
 */
interface BookIsbn extends BookMetaBase<og<book<'isbn'>>, Types.String> {}

/**
 * The date the book was released.
 * datetime
 */
interface BookReleaseDate
  extends BookMetaBase<og<book<'release_date'>>, Types.DateTime> {}

/**
 * Tag words associated with this book.
 * string array
 */
interface BookTag extends BookMetaBase<og<book<'tag'>>, Types.String> {}

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
        : makeOpenGraphMeta({
            property: PropertyBook.OG_BOOK_AUTHOR,
            content: ogBookAuthor,
          })
    ).flat(),

    // BOOK_ISBN?
    ...insertLazilyIf(
      openGraphBook.ogBookIsbn,
      makeOpenGraphMeta(PropertyBook.OG_BOOK_ISBN)
    ),

    // BOOK_RELEASE_DATE?
    ...insertLazilyIf(
      openGraphBook.ogBookReleaseDate,
      makeOpenGraphMeta(PropertyBook.OG_BOOK_RELEASE_DATE)
    ),

    // BOOK_TAG?
    ...insertLazilyIf(openGraphBook.ogBookTag, (ogBookTag) =>
      isArray(ogBookTag)
        ? ogBookTag.map(makeOpenGraphMeta(PropertyBook.OG_BOOK_TAG))
        : makeOpenGraphMeta({
            property: PropertyBook.OG_BOOK_TAG,
            content: ogBookTag,
          })
    ).flat(),
  ]
}
