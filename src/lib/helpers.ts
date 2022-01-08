import * as Int from './integer'

export function formatReadingTime(minutes: Int.Int): string {
  const cups = Math.round(minutes / 5) as Int.Int
  if (cups > 5) {
    return `${new Array(Math.round(cups / Math.E))
      .fill('🍱')
      .join('')} ${minutes} min read`
  }
  return `${new Array(cups || 1).fill('☕️').join('')} ${minutes} min read`
}
