import React from 'react'

import { formatDate, formatReadingTime } from '../lib/helpers'

type Props = {
  /** minutes in integer */
  timeToRead: number
  date: Date
}
export const DateAndReadingTime = ({
  timeToRead,
  date,
}: Props): JSX.Element => {
  const dateISO = date.toISOString()
  const dateLocalized = formatDate(date)
  const readingTime = formatReadingTime(timeToRead)
  const timeDuration = `PT${timeToRead}M`
  return (
    <small>
      <time dateTime={dateISO}>{dateLocalized}</time>
      {' • '}
      <time dateTime={timeDuration}>{readingTime}</time>
    </small>
  )
}
