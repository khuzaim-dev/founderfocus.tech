// WordPress REST API Type Definitions for FounderFocus.tech

export interface WPRendered {
  rendered: string
  protected?: boolean
}

export interface WPAuthor {
  id: number
  name: string
  url: string
  description: string
  link: string
  slug: string
  avatar_urls: {
    '24': string
    '48': string
    '96': string
  }
}

export interface WPMedia {
  id: number
  source_url: string
  alt_text: string
  media_details: {
    width: number
    height: number
    file: string
    sizes: {
      [key: string]: {
        source_url: string
        width: number
        height: number
      }
    }
  }
}

export interface WPCategory {
  id: number
  count: number
  description: string
  link: string
  name: string
  slug: string
  taxonomy: string
  parent: number
}

export interface WPTag {
  id: number
  count: number
  description: string
  link: string
  name: string
  slug: string
}

export interface WPPost {
  id: number
  date: string
  date_gmt: string
  modified: string
  modified_gmt: string
  slug: string
  status: string
  type: string
  link: string
  title: WPRendered
  content: WPRendered
  excerpt: WPRendered
  author: number
  featured_media: number
  comment_status: string
  ping_status: string
  sticky: boolean
  format: string
  categories: number[]
  tags: number[]
  acf?: {
    tweet_id?: string
    [key: string]: unknown
  }
  _embedded?: {
    author?: WPAuthor[]
    'wp:featuredmedia'?: WPMedia[]
    'wp:term'?: WPCategory[][]
  }
}

export interface WPSearchResult {
  id: number
  title: string
  url: string
  type: string
  subtype: string
}

export interface PaginatedPosts {
  posts: WPPost[]
  totalPages: number
  total: number
}
