/**
 * A namespace holding the type definitions and the type constructors used by the Open Graph protocol.
 * @see {@link https://ogp.me/#data_types}
 * @public
 */

import { type BaseOf, type Brand, make } from 'ts-brand'

/**
 * A Boolean represents a true or false value
 * @example
 * 'true', 'false', '1', '0'
 */
export type Boolean = Brand<true | false | 1 | 0, 'Boolean'>
/**
 * a `Open Graph protocol` Boolean type constructor.
 * @example
 * Boolean(true)
 * Boolean(false)
 * Boolean(0)
 * Boolean(1)
 */

// biome-ignore lint/suspicious/noShadowRestrictedNames: It's fine as its wrapped in a namespace
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
 * @remarks
 * January 26th, 2011 = 2011-01-26
 * January 26th, 2011 at 7:15pm = 2011-01-26T19:15
 * January 26th, 2001 at 7:15pm Pacific Standard Time = 2011-01-26T19:15-8:00
 */
export type DateTime = Brand<
	| `${Year}-${Month}-${Day}`
	| `${Year}-${Month}-${Day}T${Hours}:${Minutes}`
	| `${Year}-${Month}-${Day}T${Hours}:${Minutes}${'+' | '-'}${Hours}:${Minutes}`,
	'DateTime'
>
/**
   a `Open Graph protocol` DateTime type constructor.
   * converts a `${Year}-${Month}-${Day}` | `${Year}-${Month}-${Day}T${Hours}:${Minutes}` string to a OpenGraph `DateTime`
   * @example
   * ```ts
   * const instanceOfDateTime:Types.DateTime = Types.DateTime(`${2001}-${09}-${11}`)
   * ```
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
   a `Open Graph protocol` Float type constructor.
   * Converts a number to a OpenGraph `Float`.
   * @example
   * ```ts
   * const instanceOfFloat:Types.Float = Types.Float(0.001)
   * ```
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
 * A `Open Graph protocol` Integer type constructor.
 * Converts a number to a OpenGraph `Integer`
 * @example
 * ```ts
 * const instanceOfInteger:Types.Integer = Types.Integer(49)
 * ```
 */
export const Integer = make<Integer>()

/**
 * A sequence of Unicode characters
 * All literals composed of Unicode characters with no escape characters
 */
export type String<T extends string = string> = Brand<T, 'String'>

/**
 * A `Open Graph protocol` String type constructor.
 * converts a string to a OpenGraph `String`
 * @example
 * ```ts
 * const instanceOfString:Types.String = Types.String('this is definitely a string')
 * ```
 */
// biome-ignore lint/suspicious/noShadowRestrictedNames: It's fine as its wrapped in a namespace
export const String = <T extends string = string>(underlying: T): String<T> => {
	return make<String<T>>()(underlying as BaseOf<String<T>>)
}

/**
 * A sequence of Unicode characters that identify an Internet resource.
 * All valid URLs that utilize the `https://` or `https://` protocols
 */
export type URL = Brand<string, 'URL'>

/**
 * A `Open Graph protocol` URL type constructor.
 * Converts a string to a OpenGraph `URL`.
 * @example
 * ```ts
 * const instanceOfURL:Types.URL = Types.URL('https://duckduckgo.com')
 * ```
 */
export const URL = make<URL>()

/**
 * A type consisting of bounded set of constant string values (enumeration members).
 * A string value that is a member of the enumeration
 */
export type Enum<T extends string = string> = Brand<T, 'Enum'>

/**
 * A `Open Graph protocol` Enum type constructor.
 * Converts a union of string to a OpenGraph `Enum`
 * @example
 * ```ts
 * const instanceOfEnum:Types.Enum<'foo' | 'bar'> = Types.Enum<'foo', 'bar'>('foo')
 * ```
 */
export const Enum = <T extends string = string>(underlying: T): Enum<T> =>
	make<Enum<T>>()(underlying as BaseOf<Enum<T>>)

/**
 * The Disjoint union type of all the possible Open Graph Protocol types
 * @internal
 */
export type Type = Boolean | DateTime | Float | Integer | String | URL | Enum
