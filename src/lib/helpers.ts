import { Brand } from '../../typings/types'

export function formatReadingTime(minutes: number): string {
  const cups = Math.round(minutes / 5)
  if (cups > 5) {
    return `${new Array(Math.round(cups / Math.E))
      .fill('🍱')
      .join('')} ${minutes} min read`
  }
  return `${new Array(cups || 1).fill('☕️').join('')} ${minutes} min read`
}

export type DateStringYYYYMMDD = Brand<string, 'YYYY-MM-DD'>

export function assertStringDate(
  string: string
): asserts string is DateStringYYYYMMDD {
  const regex = /\d{4}-(0?[1-9]|1[012])-(0?[012][0-9]|3[01])/g
  if (!regex.test(string)) {
    throw new Error(
      "the provided string doesn't comply with the required format `YYYY-MM-DD`"
    )
  }
}

/**
 * converts a date string 'YYYY-MM-DD' to a Date object
 * @param {String} dateString 'YYYY-MM-DD'
 * @returns {Date}
 */
export function convertStringToDate(dateString: string): Date {
  assertStringDate(dateString)
  const [YYYY, MM, DD] = dateString.split('-')
  return new Date(parseInt(YYYY, 10), parseInt(MM, 10), parseInt(DD, 10))
}

/**
 * transform a `Date` object to an 'en-US' localized date string
 * @param {Date} date
 * @returns {string} 'Month Day, Year'
 */
export function formatDateLocaleLong(date: Date): string {
  return date.toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

export function formatDateLocaleShort(date: Date): string {
  return date.toLocaleDateString('en-US', {
    month: 'short',
    year: 'numeric',
  })
}
