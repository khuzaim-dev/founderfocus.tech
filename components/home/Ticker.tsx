'use client'
import Link from 'next/link'
import type { WPPost } from '@/types/wordpress'

interface TickerProps {
  posts: WPPost[]
}

export function Ticker({ posts }: TickerProps) {
  const items = posts.length > 0 ? posts : []

  return (
    <div
      style={{
        height: '47px',
        overflow: 'hidden',
        borderBottom: '1px solid var(--line)',
        display: 'flex',
        alignItems: 'center',
        whiteSpace: 'nowrap',
        font: "12px 'DM Mono', monospace",
        gap: 0,
      }}
      aria-label="Live feed ticker"
    >
      {/* LIVE FEED label */}
      <b
        style={{
          background: 'var(--acid)',
          padding: '3px 7px',
          marginRight: '19px',
          fontWeight: 500,
          flexShrink: 0,
        }}
      >
        LIVE FEED
      </b>

      {/* Scrolling track */}
      <div
        style={{
          overflow: 'hidden',
          flex: 1,
          maskImage: 'linear-gradient(90deg, transparent, #000 3%, #000 97%, transparent)',
        }}
      >
        <div
          className="ticker-track"
          style={{
            display: 'inline-flex',
            gap: 0,
            animation: 'ticker-scroll 30s linear infinite',
          }}
        >
          {/* Duplicate for seamless loop */}
          {[...items, ...items].map((post, i) => {
            const title = post.title.rendered.replace(/<[^>]*>/g, '')
            return (
              <Link
                key={`${post.id}-${i}`}
                href={`/blog/${post.slug}`}
                style={{
                  marginRight: '45px',
                  color: 'var(--ink)',
                  whiteSpace: 'nowrap',
                  transition: 'color 0.2s',
                }}
              >
                {title}
              </Link>
            )
          })}
          {/* Static items when no posts */}
          {items.length === 0 && (
            <>
              <span style={{ marginRight: '45px' }}>OpenAI ships faster tool calling</span>
              <span style={{ marginRight: '45px' }}>Anthropic expands Claude Code access</span>
              <span style={{ marginRight: '45px' }}>New funding: Cursor raises $900M</span>
            </>
          )}
        </div>
      </div>

      {/* View all */}
      <Link
        href="/#signals"
        style={{
          flexShrink: 0,
          marginLeft: '19px',
          font: "11px 'DM Mono', monospace",
          color: 'var(--muted)',
        }}
      >
        ▸ VIEW ALL SIGNALS
      </Link>
    </div>
  )
}
