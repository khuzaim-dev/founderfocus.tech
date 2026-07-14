/**
 * Calculates reading time from HTML or plain text content.
 * Assumes 200 words per minute average reading speed.
 */
export function calculateReadingTime(content: string): number {
  // Strip HTML tags
  const plainText = content.replace(/<[^>]*>/g, ' ')
  // Normalize whitespace
  const normalized = plainText.replace(/\s+/g, ' ').trim()
  // Count words
  const wordCount = normalized ? normalized.split(' ').length : 0
  // Calculate minutes (minimum 1)
  return Math.max(1, Math.round(wordCount / 200))
}

export function formatReadingTime(minutes: number): string {
  return `${minutes} MIN`
}
