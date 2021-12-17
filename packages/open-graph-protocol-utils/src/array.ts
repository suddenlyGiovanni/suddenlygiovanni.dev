import { isNotFalsy, NotFalsy } from './type-guards'

/**
 * @public
 */
export function insertIf<Condition, T>(condition: Condition, ...elements: T[]): readonly T[] {
  return isNotFalsy(condition) ? elements : []
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
