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
 * @public
 */
export function insertLazilyIf<Condition, T>(
  condition: Condition,
  lazyElement: (condition: NotFalsy<Condition>) => T
): readonly T[] {
  if (isNotFalsy(condition)) {
    return [lazyElement(condition)] as const
  }
  return []
}
