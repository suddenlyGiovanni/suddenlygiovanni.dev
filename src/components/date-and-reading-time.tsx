import * as React from 'react'
import { formatDateLocaleLong } from '../lib/dates'
import { formatReadingTime } from '../lib/helpers'
import { Int } from '../lib/integer'

interface Props {
  /** minutes in integer */
  timeToRead: Int
  date: Date
}

export const DateAndReadingTime: React.VFC<Props> = ({ timeToRead, date }) => {
  const dateISO = date.toISOString()
  const dateLocalized = formatDateLocaleLong(date)
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
