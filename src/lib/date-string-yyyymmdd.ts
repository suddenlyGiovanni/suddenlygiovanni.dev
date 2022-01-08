export interface DateStringYYYYMMDDBrand {
  readonly DateStringYYYYMMDD: unique symbol
}

export type DateStringYYYYMMDD = string & DateStringYYYYMMDDBrand

class DateStringYYYYMMDDError extends Error {
  readonly _tag = 'DateStringYYYYMMDDError' as const
  constructor(message: string) {
    super(message)
  }
}

function assertStringDate(
  string: string
): asserts string is DateStringYYYYMMDD {
  const regex = /\d{4}-(0?[1-9]|1[012])-(0?[012][0-9]|3[01])/g
  if (!regex.test(string)) {
    throw new DateStringYYYYMMDDError(
      "the provided string doesn't comply with the required format `YYYY-MM-DD`"
    )
  }
}

export function fromString(stringYYYYMMDD: string): DateStringYYYYMMDD {
  assertStringDate(stringYYYYMMDD)
  return stringYYYYMMDD
}

export function toString(dateStringYYYYMMDD: DateStringYYYYMMDD): string {
  return dateStringYYYYMMDD as string
}

/**
 * converts a date string 'YYYY-MM-DD' to a Date object
 * @param {String} dateString 'YYYY-MM-DD'
 * @returns {Date}
 */

export function toDate(dateStringYYYYMMDD: DateStringYYYYMMDD): Date {
  const [YYYY, MM, DD] = dateStringYYYYMMDD.split('-')
  return new Date(
    Number.parseInt(YYYY, 10),
    Number.parseInt(MM, 10),
    Number.parseInt(DD, 10)
  )
}
