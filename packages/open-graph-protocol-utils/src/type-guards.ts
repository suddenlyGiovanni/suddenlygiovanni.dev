export type NotFalsy<T> = Exclude<T, null | undefined | false | 0 | -0 | ''>

export function isNotNullish<T extends unknown>(value: T): value is NonNullable<T> {
  return value !== undefined && value !== null
}

export function isNotFalsy<T extends unknown>(value: T): value is NotFalsy<T> {
  switch (typeof value) {
    case 'boolean': {
      return value !== false
    }
    case 'number': {
      return !isNaN(value) && value !== 0
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

/**
 * Throw an error if the condition fails
 * Strip out error messages for production
 * @param message Can provide a string, or a function that returns a string for cases where the message takes a fair amount of effort to compute
 */
export function assert(condition: boolean, message?: string | (() => string)): asserts condition

export function assert<T>(
  condition: T | null | undefined,
  message?: string | (() => string)
): asserts condition is T

export function assert(condition: any, message?: string | (() => string)) {
  if (
    typeof condition === undefined ||
    condition === null ||
    condition === false ||
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
