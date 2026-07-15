import Link from 'next/link'
import Image from 'next/image'
import type { WPPost } from '@/types/wordpress'
import {
  getFeaturedImageUrl,
  getAuthorName,
  getPrimaryCategory,
} from '@/lib/wordpress'
import { calculateReadingTime } from '@/utils/readingTime'
import { formatRelativeTime } from '@/utils/formatDate'
import { SaveButton } from './SaveButton'

interface ArticleCardProps {
  post: WPPost
}

export function ArticleCard({ post }: ArticleCardProps) {
  const imageUrl = getFeaturedImageUrl(post)
  const author = getAuthorName(post)
  const category = getPrimaryCategory(post)
  const readingTime = calculateReadingTime(post.content?.rendered || '')
  const relativeTime = formatRelativeTime(post.date)
  const title = post.title?.rendered?.replace(/<[^>]*>/g, '') || 'Untitled'
  const excerpt = post.excerpt?.rendered?.replace(/<[^>]*>/g, '').slice(0, 100) || ''

  return (
    <article className="ff-article-card">
      <Link href={`/blog/${post.slug}`} style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
        {/* Cover image */}
        {imageUrl && (
          <div
            style={{
              width: '100%',
              height: '132px',
              overflow: 'hidden',
              borderBottom: '1px solid var(--line)',
              flexShrink: 0,
            }}
          >
            <Image
              src={imageUrl}
              alt={title}
              width={600}
              height={132}
              style={{
                width: '100%',
                height: '132px',
                objectFit: 'cover',
                filter: 'saturate(.72) contrast(1.05)',
                transition: 'filter .25s, transform .25s',
              }}
              className="article-cover"
            />
          </div>
        )}

        <div style={{ padding: '0 21px 21px', display: 'flex', flexDirection: 'column', flex: 1 }}>
          {/* Meta row */}
          <div
            style={{
              font: "10px 'DM Mono', monospace",
              color: '#696969',
              display: 'flex',
              justifyContent: 'space-between',
              marginTop: '18px',
              letterSpacing: '0.04em',
            }}
          >
            <span style={{ color: 'var(--blue)', fontWeight: 600 }}>{category}</span>
            <span>{readingTime} MIN</span>
          </div>

          {/* Title */}
          <h3
            style={{
              fontFamily: '"Geist Mono", monospace',
              fontSize: '21px',
              fontWeight: 500,
              lineHeight: 1.25,
              letterSpacing: '-0.02em',
              margin: '16px 0 10px',
              color: 'var(--ink)',
            }}
          >
            {title}
          </h3>

          {/* Excerpt */}
          {excerpt && (
            <p
              style={{
                fontFamily: '"Geist Mono", monospace',
                fontSize: '13px',
                lineHeight: 1.6,
                color: '#555',
                margin: 0,
              }}
            >
              {excerpt}
            </p>
          )}

          {/* Byline */}
          <div
            style={{
              font: "10px 'DM Mono', monospace",
              marginTop: 'auto',
              paddingTop: '18px',
              color: '#696969',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              letterSpacing: '0.02em',
            }}
          >
            <span style={{ fontWeight: 500, color: 'var(--ink)' }}>{author.toUpperCase()}</span>
            <span>{relativeTime}</span>
          </div>
        </div>
      </Link>
      
    </article>
  )
}
