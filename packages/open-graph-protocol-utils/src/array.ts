import { isNotFalsy, NotFalsy } from './type-guards'

/**
 * Returns the provided elements wrap in an array if the given condition turns to be truthy.
 * It is meant as immutable alternative of the method push on the Array structure.
 * The consumer should then unwrap the boxed elements by mean on spreading operation.
 * Since the JS spread operator disregards the empty array, it won't modify the original structure in case of falsy condition.
 *
 * @param condition - A whatsoever value that will be checked for truthiness by mean of boolean type coercion!
 * @param elements - The elements to conditionally returns if the `condition` is truthy
 * @returns The provided elements boxed in an array or an empty array
 *
 * @example
 *
 * ```ts
 * const array = [
 *     ...insertIf(false, -2, -1, 0),
 *     1,
 *     2,
 *     ...insertIf(true, 3, 4, 5, 6),
 * ] as const;
 * console.log(array); // => [1, 2, 3, 4, 5, 6]
 * ```
 *
 * @public
 */
export function insertIf<Condition, Elements extends unknown[]>(
  condition: Condition,
  ...elements: readonly [...Elements]
): readonly [...Elements] | readonly [] {
  return isNotFalsy(condition) ? elements : ([] as const)
}

/**
 * Returns the result of invoking the provided callback boxed in an immutable array if the given condition turns to be truthy.
 * The condition itself is passed in as an argument to the lazy callback to be used at the discretion of the caller.
 * It is meant as immutable alternative of the method push on the Array structure.
 * The consumer should then unwrap the boxed elements by mean on spreading operation.
 * Since the JS spread operator disregards the empty array, it won't modify the original structure in case of falsy condition.
 *
 * @param condition - A whatsoever value that will be checked for truthiness by mean of boolean type coercion!
 * @param lazyElement - An lazy unary function (also known as a thunk) who's return value will be the boxed return of the
 *                      whole expression if the condition turned to be truthy.
 *                      The condition itself is passed in as an argument to this callback in case of truthiness.
 *                      This enables the consumer to directly operate on the checked condition in a typesafe manner.
 * @returns An empty array or the return value of the lazyElement boxed in an array.
 *
 * @example
 *
 * ```ts
 * declare function identity<T>(x: T): T
 * declare function upperCase<T extends string>(srt: T): Uppercase<T>
 * declare const undefinedOrBar: undefined | { bar: 'bar' }
 * declare const undefinedOrBaz: undefined | 'BAZ'
 *
 * const array = [
 *   'FOO',
 *   ...insertLazilyIf(undefinedOrBar, (obj: NotFalsy<typeof undefinedOrBar>) => upperCase(obj.bar)),
 *   ...insertLazilyIf(undefinedOrBaz, identity),
 * ] as const
 *
 * // the resulting array will be a disjoint union of all the possible cases
 * type Array =
 *   | readonly ['FOO']                // when both `undefinedOrBar` and  `undefinedOrBaz` are falsy (in this case `undefined`)
 *   | readonly ['FOO', 'BAR']         // when only `undefinedOrBaz` is falsy
 *   | readonly ['FOO', 'BAZ']         // when only `undefinedOrBar` is falsy
 *   | readonly ['FOO', 'BAR', 'BAZ']  // when none are falsy
 * ```
 *
 * @public
 */
export function insertLazilyIf<Condition, T>(
  condition: Condition,
  lazyElement: (condition: NotFalsy<Condition>) => T
): readonly [element: T] | readonly [] {
  return isNotFalsy(condition)
    ? ([lazyElement(condition)] as const) //
    : ([] as const) //
}
