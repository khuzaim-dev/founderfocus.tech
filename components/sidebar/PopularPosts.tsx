import Link from 'next/link'
import type { WPPost } from '@/types/wordpress'

interface PopularPostsProps {
  posts: WPPost[]
}

export function PopularPosts({ posts }: PopularPostsProps) {
  return (
    <section
      style={{
        padding: '0 0 28px',
        marginBottom: '28px',
        borderBottom: '1px solid var(--line)',
      }}
    >
      <h3
        style={{
          font: "11px 'DM Mono', monospace",
          textTransform: 'uppercase',
          margin: '0 0 18px',
          color: 'var(--ink)',
        }}
      >
        Popular today / 24h
      </h3>
      {posts.slice(0, 3).map((post, i) => {
        const title = post.title?.rendered?.replace(/<[^>]*>/g, '') || 'Untitled'
        return (
          <Link key={post.id} href={`/blog/${post.slug}`}>
            <div
              style={{
                display: 'flex',
                gap: '12px',
                padding: '13px 0',
                borderTop: i === 0 ? 'none' : '1px solid var(--line)',
                transition: 'opacity 0.2s',
              }}
            >
              <b
                style={{
                  font: "11px 'DM Mono', monospace",
                  color: 'var(--blue)',
                  flexShrink: 0,
                }}
              >
                {String(i + 1).padStart(2, '0')}
              </b>
              <h4
                style={{
                  fontSize: '13px',
                  lineHeight: 1.42,
                  margin: 0,
                  letterSpacing: '-0.2px',
                  fontFamily: 'Manrope, Arial, sans-serif',
                  fontWeight: 600,
                  color: 'var(--ink)',
                }}
              >
                {title}
              </h4>
            </div>
          </Link>
        )
      })}
    </section>
  )
}
