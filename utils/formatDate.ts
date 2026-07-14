/**
 * Date formatting utilities for FounderFocus.tech
 */

const DAY_NAMES = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
]

/**
 * Format date as "Tuesday / July 14 / 2026"
 */
export function formatEyebrowDate(date: Date = new Date()): string {
  const dayName = DAY_NAMES[date.getDay()]
  const month = MONTH_NAMES[date.getMonth()]
  const day = date.getDate()
  const year = date.getFullYear()
  return `${dayName} / ${month} ${day} / ${year}`
}

/**
 * Format date as relative time: "2H AGO", "3D AGO", "TODAY"
 */
export function formatRelativeTime(dateString: string): string {
  const date = new Date(dateString)
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  const diffMinutes = Math.floor(diffMs / (1000 * 60))
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60))
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))

  if (diffMinutes < 60) {
    return diffMinutes <= 1 ? 'JUST NOW' : `${diffMinutes}M AGO`
  }
  if (diffHours < 24) {
    return `${diffHours}H AGO`
  }
  if (diffDays === 1) {
    return 'YESTERDAY'
  }
  if (diffDays < 7) {
    return `${diffDays}D AGO`
  }
  return formatShortDate(dateString)
}

/**
 * Format date as "Jan 14, 2026"
 */
export function formatShortDate(dateString: string): string {
  const date = new Date(dateString)
  const month = MONTH_NAMES[date.getMonth()].slice(0, 3).toUpperCase()
  const day = date.getDate()
  const year = date.getFullYear()
  return `${month} ${day}, ${year}`
}

/**
 * Format a live clock as "10:24:11 AM"
 */
export function formatLiveTime(date: Date = new Date()): string {
  return date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true,
  })
}
