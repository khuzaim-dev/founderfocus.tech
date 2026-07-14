import Link from 'next/link'
import Image from 'next/image'
import type { WPPost } from '@/types/wordpress'
import { getFeaturedImageUrl, getPrimaryCategory } from '@/lib/wordpress'

interface CompactCardProps {
  post: WPPost
  index: number
}

export function CompactCard({ post, index }: CompactCardProps) {
  const imageUrl = getFeaturedImageUrl(post)
  const category = getPrimaryCategory(post)
  const title = post.title.rendered.replace(/<[^>]*>/g, '')

  return (
    <Link href={`/blog/${post.slug}`}>
      <article className="ff-compact-card">
        {/* Thumbnail */}
        {imageUrl && (
          <Image
            src={imageUrl}
            alt={title}
            width={74}
            height={74}
            style={{
              width: '74px',
              height: '74px',
              objectFit: 'cover',
              filter: 'grayscale(.45)',
              borderRadius: '8px',
              flexShrink: 0,
            }}
          />
        )}

        {/* Number */}
        <span
          style={{
            font: "11px 'DM Mono', monospace",
            color: 'var(--blue)',
            flexShrink: 0,
          }}
        >
          {String(index + 1).padStart(2, '0')}
        </span>

        {/* Content */}
        <div>
          <span
            style={{
              fontFamily: '"Geist Mono", monospace',
              fontSize: '10px',
              color: 'var(--blue)',
            }}
          >
            {category}
          </span>
          <h3
            style={{
              fontFamily: '"Geist Mono", monospace',
              fontSize: '15px',
              fontWeight: 400,
              lineHeight: 1.35,
              margin: '5px 0 0',
              letterSpacing: '-0.4px',
              color: 'var(--ink)',
            }}
          >
            {title}
          </h3>
        </div>
      </article>
    </Link>
  )
}
