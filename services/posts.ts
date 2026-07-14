import type { WPPost } from '@/types/wordpress'
import {
  getPosts,
  getLatestPosts,
  getPost,
  getAllPostSlugs,
  searchPosts as wpSearchPosts,
  getPostsByCategory,
  getFeaturedImageUrl,
  getAuthorName,
  getPrimaryCategory,
  extractTweetId,
} from '@/lib/wordpress'
import { calculateReadingTime } from '@/utils/readingTime'

export type { WPPost }

export {
  getPosts,
  getLatestPosts,
  getPost,
  getAllPostSlugs,
  getPostsByCategory,
  getFeaturedImageUrl,
  getAuthorName,
  getPrimaryCategory,
  extractTweetId,
}

/**
 * Get posts for the ticker (News category).
 * Falls back to latest posts if "news" category doesn't exist.
 */
export async function getTickerPosts(): Promise<WPPost[]> {
  const { posts } = await getPostsByCategory('news', 1, 10)
  if (posts.length > 0) return posts
  // Fallback to latest
  return getLatestPosts(8)
}

/**
 * Get posts that have tweet IDs stored (for X Threads section).
 */
export async function getTweetPosts(limit = 12): Promise<WPPost[]> {
  const { posts } = await getPostsByCategory('threads', 1, limit)
  return posts.filter((p) => extractTweetId(p) !== null)
}

/**
 * Search posts — wraps wpSearchPosts.
 */
export async function searchPosts(query: string): Promise<WPPost[]> {
  return wpSearchPosts(query)
}

/**
 * Get reading time for a post.
 */
export function getPostReadingTime(post: WPPost): number {
  return calculateReadingTime(post.content.rendered)
}
