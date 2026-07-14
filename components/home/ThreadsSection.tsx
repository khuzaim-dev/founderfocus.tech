import Link from 'next/link'
import dynamic from 'next/dynamic'
import { Suspense } from 'react'
import type { WPPost } from '@/types/wordpress'
import { SectionHead } from '@/components/shared/SectionHead'
import { TweetCarousel } from '@/components/twitter/TweetCarousel'
import { extractTweetId } from '@/lib/wordpress'

import { ClientTweet } from '@/components/twitter/ClientTweet'

function TweetFallback() {
  return (
    <div
      style={{
        height: '300px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'rgba(255,255,255,0.7)',
        borderRadius: '12px',
        border: '1px solid var(--line)',
      }}
    >
      <span style={{ font: "11px 'DM Mono', monospace", color: 'var(--muted)' }}>
        Loading thread...
      </span>
    </div>
  )
}

interface ThreadsSectionProps {
  posts: WPPost[]
}

export function ThreadsSection({ posts }: ThreadsSectionProps) {
  const tweetIds = posts
    .map(extractTweetId)
    .filter((id): id is string => id !== null)

  if (tweetIds.length === 0) {
    return (
      <section className="section-block" id="threads" style={{ marginTop: '68px' }}>
        <SectionHead
          title="Best Threads on X"
          subtitle="THE BUILDER CONVERSATIONS TO OPEN"
          viewAllHref="/threads"
          viewAllLabel="VIEW ALL →"
        />
        <div
          style={{
            padding: '40px 0',
            textAlign: 'center',
            color: 'var(--muted)',
            font: "13px 'DM Mono', monospace",
          }}
        >
          No threads available.
        </div>
      </section>
    )
  }

  return (
    <section className="section-block" id="threads" style={{ marginTop: '68px' }}>
      <SectionHead
        title="Best Threads on X"
        subtitle="THE BUILDER CONVERSATIONS TO OPEN"
        viewAllHref="/threads"
        viewAllLabel="VIEW ALL →"
      />
      <TweetCarousel>
        {tweetIds.map((id, index) => (
          <div key={`${id}-${index}`} className="ff-tweet-card ff-tweet-slide">
            <div data-theme="light">
              <Suspense fallback={<TweetFallback />}>
                <ClientTweet id={id} />
              </Suspense>
            </div>
          </div>
        ))}
      </TweetCarousel>
    </section>
  )
}
