import { insertLazilyIf, isArray } from '@lib/array'

import {
  type BaseOrExtended,
  makeOpenGraphMeta,
  type og,
  Types,
} from './open-graph'
import {
  makeOpenGraphBase,
  type MetaBase,
  type OpenGraphBaseWithOptional,
} from './open-graph-base'

export type book<T extends string = ''> = BaseOrExtended<'book', T>

/**`
 * This object type represents a book or publication. This is an appropriate type for ebooks, as well as traditional paperback or hardback books. Do not use this type to represent magazines
 */
interface BookType extends MetaBase<og<'type'>, Types.Enum<book>> {}

export type PropertyBook =
  | book<'author'>
  | book<'isbn'>
  | book<'release_date'>
  | book<'tag'>

interface BookMetaBase<
  Property extends og<PropertyBook>,
  Content extends Types.Type
> extends MetaBase<Property, Content> {}

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

export type BookRecord =
  | BookType
  | BookAuthor
  | BookIsbn
  | BookReleaseDate
  | BookTag

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
        ? ogBookAuthor.map(makeOpenGraphMeta('og:book:author'))
        : makeOpenGraphMeta({
            property: 'og:book:author',
            content: ogBookAuthor,
          })
    ).flat(),

    // BOOK_ISBN?
    ...insertLazilyIf(
      openGraphBook.ogBookIsbn,
      makeOpenGraphMeta('og:book:isbn')
    ),

    // BOOK_RELEASE_DATE?
    ...insertLazilyIf(
      openGraphBook.ogBookReleaseDate,
      makeOpenGraphMeta('og:book:release_date')
    ),

    // BOOK_TAG?
    ...insertLazilyIf(openGraphBook.ogBookTag, (ogBookTag) =>
      isArray(ogBookTag)
        ? ogBookTag.map(makeOpenGraphMeta('og:book:tag'))
        : makeOpenGraphMeta({ property: 'og:book:tag', content: ogBookTag })
    ).flat(),
  ]
}
