/**
 * A namespace containing utility string manipulation types.
 */
export declare namespace Strings {
	type PrependIfDefined<T extends string, S extends string> = T extends '' ? T : `${S}${T}`

	/**
		 * Constructs a new string by concatenating an array of string elements `T` with a separator `S`.
		 *
		 * The type `ConcatSeparator` takes an array of strings `T` and a separator string `S` as type parameters,
		 * and produces a single string where each element in `T` is joined together using the separator `S`.
		 *
		 * If the array `T` is empty, the resulting string is an empty string.
		 *

		 * Recursively processes the input array `T` by taking the first element, concatenating it with the
		 * result of recursively processing the rest of the array (with the separator `S` prepended, if defined).
		 *
		 * @template T An array of string literals.
		 * @template S A string literal used as a separator.
		 *
		 * @example Example with an empty array:
		 * ```ts
		 * type Example0 = ConcatSeparator<[], ", ">;
		 * //   ^? Expected: ""
		 * ```
		 *
		 * @example Example with a single element:
		 * ```ts
		 * type Example1 = ConcatSeparator<["Hello"], ", ">;
		 * //   ^? Expected: "Hello"
		 * ```
		 * @example Example with two elements:
		 * ```ts
		 * type Example2 = ConcatSeparator<["Hello", "World"], ", ">;
		 * //   ^? Expected: "Hello, World"
		 * ```
		 * @example Example with multiple elements and a different separator:
		 * ```ts
		 * type Example3 = ConcatSeparator<["a", "b", "c"], "-">;
		 * //   ^? Expected: "a-b-c"
		 * ```
		 */
	export type ConcatSeparator<T extends string[], S extends string> = T extends [
		infer F extends string,
		...infer R extends string[],
	]
		? `${F}${PrependIfDefined<ConcatSeparator<R, S>, S>}`
		: ''
}

if (import.meta.vitest) {
	const { it, describe, expectTypeOf } = import.meta.vitest
	describe('Strings', () => {
		describe('ConcatSeparator', () => {
			it('should produce an empty string for an empty array', () => {
				expectTypeOf<Strings.ConcatSeparator<[], ', '>>().toEqualTypeOf<''>()
			})

			it('should produce "Hello" for a single-element array', () => {
				expectTypeOf<Strings.ConcatSeparator<['Hello'], ', '>>().toEqualTypeOf<'Hello'>()
			})

			it('should produce "Hello, World" for two elements', () => {
				expectTypeOf<
					Strings.ConcatSeparator<['Hello', 'World'], ', '>
				>().toEqualTypeOf<'Hello, World'>()
			})

			it('should produce "a-b-c" for multiple elements with a "-" separator', () => {
				expectTypeOf<Strings.ConcatSeparator<['a', 'b', 'c'], '-'>>().toEqualTypeOf<'a-b-c'>()
			})
		})
	})
}
