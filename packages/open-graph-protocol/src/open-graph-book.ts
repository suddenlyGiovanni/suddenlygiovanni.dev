import {
	type BasicRecord,
	type OgType,
	type OpenGraphBaseWithOptional,
	type OptionalRecord,
	makeOpenGraphBase,
} from './open-graph-base.ts'
import {
	type BaseOrExtended,
	type MetaBase,
	type OpenGraphMeta,
	PropertyBook,
	makeOpenGraphMeta,
	type og,
} from './open-graph.ts'
import type * as Types from './types.ts'
import { insertIf } from './utils/array.ts'
import { isArray } from './utils/type-guards.ts'
import type { ValueOf } from './utils/types.ts'

// biome-ignore lint/style/useNamingConvention: <explanation>
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

type BookMetaBase<Property extends IPropertyBook, Content extends Types.Type> = MetaBase<
	Property,
	Content
>

/**
 * This object type represents a book or publication. This is an appropriate type for ebooks, as well as traditional paperback or hardback books. Do not use this type to represent magazines
 */
type OgTypeBook = MetaBase<og<'type'>, Types.Enum<book>>

/**
 * Who wrote this book.
 * profile array
 */
type OgBookAuthor = BookMetaBase<og<book<'author'>>, Types.URL>

/**
 * The [ISBN](https://en.wikipedia.org/wiki/International_Standard_Book_Number)
 */
type OgBookIsbn = BookMetaBase<og<book<'isbn'>>, Types.String>

/**
 * The date the book was released.
 * datetime
 */
type OgBookReleaseDate = BookMetaBase<og<book<'release_date'>>, Types.DateTime>

/**
 * Tag words associated with this book.
 * string array
 */
type OgBookTag = BookMetaBase<og<book<'tag'>>, Types.String>

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

export function makeOpenGraphBook(openGraphBook: OpenGraphBook): readonly OpenGraphMeta[] {
	return [
		// BASIC_METADATA!
		...makeOpenGraphBase(openGraphBook),

		// BOOK_AUTHOR?
		...insertIf(openGraphBook.ogBookAuthor, ogBookAuthor =>
			isArray(ogBookAuthor)
				? ogBookAuthor.map(makeOpenGraphMeta(PropertyBook.OG_BOOK_AUTHOR))
				: makeOpenGraphMeta(PropertyBook.OG_BOOK_AUTHOR, ogBookAuthor),
		).flat(),

		// BOOK_ISBN?
		...insertIf(openGraphBook.ogBookIsbn, makeOpenGraphMeta(PropertyBook.OG_BOOK_ISBN)),

		// BOOK_RELEASE_DATE?
		...insertIf(
			openGraphBook.ogBookReleaseDate,
			makeOpenGraphMeta(PropertyBook.OG_BOOK_RELEASE_DATE),
		),

		// BOOK_TAG?
		...insertIf(openGraphBook.ogBookTag, ogBookTag =>
			isArray(ogBookTag)
				? ogBookTag.map(makeOpenGraphMeta(PropertyBook.OG_BOOK_TAG))
				: makeOpenGraphMeta(PropertyBook.OG_BOOK_TAG, ogBookTag),
		).flat(),
	]
}
