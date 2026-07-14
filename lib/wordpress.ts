import type { WPPost, WPCategory, PaginatedPosts } from '@/types/wordpress'

const WP_API_BASE = 'https://cms.founderfocus.tech/wp-json/wp/v2'

/**
 * Centralized fetch for WordPress REST API.
 * Handles caching, revalidation, and error handling.
 */
async function wpFetch<T>(
  path: string,
  options: RequestInit & { next?: { revalidate?: number; tags?: string[] } } = {}
): Promise<{ data: T; headers: Headers }> {
  const url = `${WP_API_BASE}${path}`

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  }

  // Allow bypassing Cloudflare bot/WAF checks using a secret token configured in Vercel env
  if (process.env.WP_BYPASS_TOKEN) {
    headers['X-FF-CMS-Bypass'] = process.env.WP_BYPASS_TOKEN
  }

  const res = await fetch(url, {
    headers,
    next: options.next ?? { revalidate: 3600 },
    ...options,
  })

  if (!res.ok) {
    throw new Error(`WordPress API error: ${res.status} ${res.statusText} for ${url}`)
  }

  const data: T = await res.json()
  return { data, headers: res.headers }
}

// ─── Posts ────────────────────────────────────────────────────────────────────

/**
 * Get paginated posts, optionally filtered by category ID.
 * Excludes 'threads' category when fetching all posts.
 */
export async function getPosts(
  page = 1,
  perPage = 6,
  categoryId?: number
): Promise<PaginatedPosts> {
  const params = new URLSearchParams({
    _embed: '1',
    per_page: String(perPage),
    page: String(page),
  })
  
  if (categoryId) {
    params.set('categories', String(categoryId))
  } else {
    // Exclude threads category from main feed
    const categories = await getCategories()
    const threadsCat = categories.find((c) => c.slug === 'threads')
    if (threadsCat) {
      params.set('categories_exclude', String(threadsCat.id))
    }
  }

  const { data, headers } = await wpFetch<WPPost[]>(`/posts?${params}`, {
    next: { revalidate: 3600, tags: ['posts'] },
  })

  const totalPages = parseInt(headers.get('X-WP-TotalPages') ?? '1', 10)
  const total = parseInt(headers.get('X-WP-Total') ?? '0', 10)

  return { posts: data, totalPages, total }
}

/**
 * Get the latest N posts (for sidebar, ticker, etc.)
 * Excludes 'threads' category.
 */
export async function getLatestPosts(n = 3): Promise<WPPost[]> {
  const params = new URLSearchParams({
    _embed: '1',
    per_page: String(n),
    page: '1',
  })

  // Exclude threads category
  const categories = await getCategories()
  const threadsCat = categories.find((c) => c.slug === 'threads')
  if (threadsCat) {
    params.set('categories_exclude', String(threadsCat.id))
  }

  const { data } = await wpFetch<WPPost[]>(`/posts?${params}`, {
    next: { revalidate: 1800, tags: ['posts', 'latest'] },
  })
  return data
}

/**
 * Get posts by category slug.
 */
export async function getPostsByCategory(
  categorySlug: string,
  page = 1,
  perPage = 6
): Promise<PaginatedPosts> {
  // First resolve the category ID from slug
  const categories = await getCategories()
  const category = categories.find((c) => c.slug === categorySlug)

  if (!category) {
    return { posts: [], totalPages: 0, total: 0 }
  }

  return getPosts(page, perPage, category.id)
}

/**
 * Get a single post by slug.
 */
export async function getPost(slug: string): Promise<WPPost | null> {
  const { data } = await wpFetch<WPPost[]>(
    `/posts?_embed=1&slug=${encodeURIComponent(slug)}`,
    { next: { revalidate: 3600, tags: ['posts', `post-${slug}`] } }
  )
  return data[0] ?? null
}

/**
 * Get all post slugs (for generateStaticParams).
 */
export async function getAllPostSlugs(): Promise<string[]> {
  const { data } = await wpFetch<WPPost[]>('/posts?per_page=100&page=1', {
    next: { revalidate: 3600, tags: ['posts'] },
  })
  return data.map((p) => p.slug)
}

/**
 * Search posts.
 */
export async function searchPosts(query: string): Promise<WPPost[]> {
  const { data } = await wpFetch<WPPost[]>(
    `/posts?_embed=1&search=${encodeURIComponent(query)}&per_page=8`,
    { next: { revalidate: 60, tags: ['search'] } }
  )
  return data
}

// ─── Categories ───────────────────────────────────────────────────────────────

let _categoriesCache: WPCategory[] | null = null

/**
 * Get all categories (cached in memory for the process lifetime).
 */
export async function getCategories(): Promise<WPCategory[]> {
  if (_categoriesCache) return _categoriesCache
  const { data } = await wpFetch<WPCategory[]>('/categories?per_page=50', {
    next: { revalidate: 86400, tags: ['categories'] },
  })
  _categoriesCache = data
  return data
}

/**
 * Get category by slug.
 */
export async function getCategoryBySlug(slug: string): Promise<WPCategory | null> {
  const categories = await getCategories()
  return categories.find((c) => c.slug === slug) ?? null
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

/**
 * Extract featured image URL from a post with _embed data.
 */
export function getFeaturedImageUrl(post: WPPost): string | null {
  const media = post._embedded?.['wp:featuredmedia']?.[0]
  if (!media) return null
  // Try medium_large first, fallback to full
  return (
    media.media_details?.sizes?.['medium_large']?.source_url ??
    media.source_url ??
    null
  )
}

/**
 * Extract author name from an embedded post.
 */
export function getAuthorName(post: WPPost): string {
  const name = post._embedded?.author?.[0]?.name ?? 'FounderFocus Editorial'
  // If the API returns the email as the display name, map it to the desired public username
  if (name.includes('@')) {
    return 'Astro'
  }
  return name
}

/**
 * Extract the first category name from an embedded post.
 */
export function getPrimaryCategory(post: WPPost): string {
  const terms = post._embedded?.['wp:term']?.[0]
  if (!terms || terms.length === 0) return 'SIGNAL'
  return terms[0].name.toUpperCase()
}

/**
 * Extract tweet ID from a URL (e.g. https://x.com/user/status/123456)
 */
export function getTweetId(url: string): string | null {
  const match = url.match(/(?:twitter\.com|x\.com)\/[^/]+\/status\/(\d+)/)
  return match?.[1] ?? null
}

/**
 * Extract tweet ID from a post's ACF field or content.
 * Tries: post.acf.tweet_id → first Twitter URL in content
 */
export function extractTweetId(post: WPPost): string | null {
  // Try ACF field
  if (post.acf?.tweet_id) return String(post.acf.tweet_id)

  // Try to extract from post content (t.co or twitter.com/*/status/ID)
  return getTweetId(post.content.rendered)
}
