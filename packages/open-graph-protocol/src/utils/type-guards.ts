/**
 * Removes from a given T all possible instance value JavaScript deems Falsy
 * @public
 */
export type NotFalsy<T> = Exclude<T, null | undefined | false | 0 | -0 | ''>

/**
 * A not nullish type-guard, where nullish is either `null` or `undefined`
 * @public
 */
export function isNotNullish<T>(value: T): value is NonNullable<T> {
	return value !== undefined && value !== null
}

/**
 * A not falsy type-guard.
 * @returns A boolean value defining if the provided argument is falsy or not
 * @public
 */
export function isNotFalsy<T>(value: T): value is NotFalsy<T> {
	switch (typeof value) {
		case 'boolean': {
			return value !== false
		}
		case 'number': {
			return !Number.isNaN(value) && value !== 0
		}
		case 'string': {
			return value !== ''
		}
		default: {
			return isNotNullish(value)
		}
	}
}

/**
 * Patch for Array.isArray `isArray(arg: any): arg is any[];`
 *
 * @remarks
 * since it loses the type information of the array type
 * solution by `laughinghan`
 *
 * @mentions https://github.com/laughinghan
 * @see  https://github.com/microsoft/TypeScript/pull/28916
 * @public
 */
export function isArray<T>(
	arg: T,
): arg is
	| Extract<unknown[], T>
	| Extract<[unknown], T>
	| (unknown extends T ? never : Extract<T, readonly unknown[]>) {
	/*
   the first two clauses, `Extract<any[], T>` and `Extract<[any], T>`,
   ensure that the type predicate will extract `B[]` out of `A | B[]`
   and `[B]` out of `A | [B]`, just like a naive predicate `arg is any[]`
   would. The final clause is a special case if T is known to include
   a readonly array, to extract `readonly B[]` out of `A | readonly B[]`,
   and `readonly [B]` out of `A | readonly [B]`, but as a special exception
   it needs to ignore the case of T = any, because `any` is an ill-behaved
   type. See https://github.com/microsoft/TypeScript/pull/28916#issuecomment-573217751
   */
	return Array.isArray(arg)
}

/**
 * Throw an error if the condition fails.
 * Also known as `invariant`.
 *
 * @param condition - A boolean value to assert
 * @param message - An optional message to customize the assertion failure message.
 *                  It could be a simple string or a lazy string for cases where
 *                  the message takes a fair amount of effort to compute.
 * @returns void
 * @throws
 * Throws if the condition is not `true`, with either a default message or a customized one if provided
 *
 * @public
 */
export function assert(condition: boolean, message?: string | (() => string)): asserts condition

/**
 * Asserts that the condition is of a specific type.
 * Throw an error if the condition fails.
 * Also known as `invariant`.
 *
 * @param condition - A value of any type to assert by mean of truthy coercion.
 * @param message - An optional message to customize the assertion failure message.
 *                  It could be a simple string or a lazy string for cases where
 *                  the message takes a fair amount of effort to compute.
 * @returns void
 * @throws
 * Throws if the condition is not truthy, with either a default message or a customized one if provided
 *
 * @public
 */
export function assert<T>(
	condition: T | null | undefined,
	message?: string | (() => string),
): asserts condition is T

/**
 * Asserts that the condition is of a specific type.
 * Throw an error if the condition fails.
 * Also known as `invariant`.
 *
 * @param condition - A value of any type to assert by mean of truthy coercion.
 * @param message - An optional message to customize the assertion failure message.
 *                  It could be a simple string or a lazy string for cases where
 *                  the message takes a fair amount of effort to compute.
 * @returns void
 * @throws
 * Throws if the condition is not truthy, with either a default message or a customized one if provided
 *
 * @public
 */
export function assert(condition: unknown, message?: string | (() => string)) {
	if (
		typeof condition === 'undefined' ||
		condition === null ||
		condition === false ||
		// biome-ignore lint/complexity/noExtraBooleanCast: we want to make the type coercion explicit
		!Boolean(condition)
	) {
		const prefix: string = 'Assertion failed'
		const provided: string | undefined = typeof message === 'function' ? message() : message

		/**
		 * Options:
		 * 1. message provided: `${prefix}: ${provided}`
		 * 2. message not provided: prefix
		 */
		const value: string = provided ? `${prefix}: ${provided}` : prefix
		throw new Error(value)
	}
}
