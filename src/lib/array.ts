import { isNotFalsy, NotFalsy } from '@lib/type-guards'

export function insertIf<Condition, T>(
  condition: Condition,
  ...elements: T[]
): readonly T[] {
  return isNotFalsy(condition) ? elements : []
}

export function insertLazilyIf<Condition, T>(
  condition: Condition,
  lazyElement: (condition: NotFalsy<Condition>) => T
): readonly T[] {
  if (isNotFalsy(condition)) {
    return [lazyElement(condition)] as const
  }
  return []
}

/**
 * Patch for Array.isArray `isArray(arg: any): arg is any[];` since it loses
 * the type information of the array type
 * solution by `laughinghan`
 * @mentions https://github.com/laughinghan
 * @see https://github.com/microsoft/TypeScript/pull/28916
 */
export function isArray<T>(
  arg: T
): arg is
  | Extract<any[], T>
  | Extract<[any], T>
  | (unknown extends T ? never : Extract<T, readonly any[]>) {
  /*
   the first two clauses, `Extract<any[], T>` and `Extract<[any], T>`,
   ensure that the type predicate will extract `B[]` out of `A | B[]`
   and `[B]` out of `A | [B]`, just like a the naive predicate `arg is any[]`
   would. The final clause is a special case if T is known to include
   a readonly array, to extract `readonly B[]` out of `A | readonly B[]`,
   and `readonly [B]` out of `A | readonly [B]`, but as a special exception
   it needs to ignore the case of T = any, because `any` is an ill-behaved
   type. See https://github.com/microsoft/TypeScript/pull/28916#issuecomment-573217751
   */
  return Array.isArray(arg)
}
