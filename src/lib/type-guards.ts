export type NotFalsy<T> = Exclude<T, null | undefined | false | 0 | -0 | ''>

export function isNotNullish<T extends unknown>(
  value: T
): value is NonNullable<T> {
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

const isProduction: boolean = process.env.NODE_ENV === 'production'
const prefix: string = 'Assertion failed'

/**
 * Throw an error if the condition fails
 * Strip out error messages for production
 * @param message Can provide a string, or a function that returns a string for cases where the message takes a fair amount of effort to compute
 */

export default function assert(
  condition: boolean,
  message?: string | (() => string)
): asserts condition

export default function assert<T>(
  condition: T | null | undefined,
  message?: string | (() => string)
): asserts condition is T

export default function assert(
  condition: any,
  message?: string | (() => string)
) {
  if (
    typeof condition === undefined ||
    condition === null ||
    condition === false ||
    !Boolean(condition)
  ) {
    // In production, we strip the message but still throw
    if (isProduction) {
      throw new Error(prefix)
    }

    /**
     * When not in production we allow the message to pass through
     * This block will be removed in production builds
     */
    const provided: string | undefined =
      typeof message === 'function' ? message() : message

    /**
     * Options:
     * 1. message provided: `${prefix}: ${provided}`
     * 2. message not provided: prefix
     */
    const value: string = provided ? `${prefix}: ${provided}` : prefix
    throw new Error(value)
  }
}
