import type { WPPost } from '@/types/wordpress'

const SITE_URL = 'https://founderfocus.tech'
const SITE_NAME = 'FounderFocus'

/**
 * Build Article JSON-LD schema for a WordPress post
 */
export function buildArticleJsonLd(post: WPPost, imageUrl?: string) {
  const authorName = post._embedded?.author?.[0]?.name ?? 'FounderFocus Editorial'

  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title?.rendered?.replace(/<[^>]*>/g, '') || 'Untitled',
    description: post.excerpt?.rendered?.replace(/<[^>]*>/g, '').trim() || '',
    image: imageUrl ? [imageUrl] : undefined,
    datePublished: post.date_gmt,
    dateModified: post.modified_gmt,
    author: {
      '@type': 'Person',
      name: authorName,
    },
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      url: SITE_URL,
    },
    url: `${SITE_URL}/blog/${post.slug}`,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${SITE_URL}/blog/${post.slug}`,
    },
  }
}

/**
 * Build BreadcrumbList JSON-LD schema
 */
export function buildBreadcrumbJsonLd(
  items: { name: string; url: string }[]
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  }
}

/**
 * Build WebSite JSON-LD schema
 */
export function buildWebsiteJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_NAME,
    url: SITE_URL,
    description: 'FounderFocus — the operating system for builders.',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${SITE_URL}/?s={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  }
}
