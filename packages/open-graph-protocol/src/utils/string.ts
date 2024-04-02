/**
 * A curry helper function that operates on string to trim them at a given length
 *
 * @param upperBound - An Integer defining the upper bound to which the string should
 *                 be trimmed.
 * @returns A function that accepts a sting as argument and returns said string
 *          trimmed at the previously defined upper bound.
 *
 * @example
 * ```ts
 * // lets imagine it having a length greater than 100 chars
 * declare const loremIpsum: string
 *
 * const trimTo100 = maxLength(100)
 * console.log(trimTo100(loremIpsum)) // => only the first 100 chars
 * ```
 * @public
 */
export const maxLength =
	<UpperBound extends number>(upperBound: UpperBound) =>
	<String extends string>(string: String) =>
		string.slice(0, upperBound)
