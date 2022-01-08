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
