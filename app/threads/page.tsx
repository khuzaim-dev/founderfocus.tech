import type { Metadata } from 'next'
import dynamic from 'next/dynamic'
import { Suspense } from 'react'
import { Shell } from '@/components/layout/Shell'
import { SectionHead } from '@/components/shared/SectionHead'
import { getTweetPosts } from '@/services/tweets'
import { extractTweetId } from '@/lib/wordpress'

const Tweet = dynamic(() => import('react-tweet').then((mod) => mod.Tweet), { ssr: false })

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

export const revalidate = 3600

export const metadata: Metadata = {
  title: 'Best X Threads — FounderFocus',
  description: 'The best threads from builders on X, curated by FounderFocus.',
  alternates: { canonical: 'https://founderfocus.tech/threads' },
}

export default async function ThreadsPage() {
  const tweetPosts = await getTweetPosts(20).catch(() => [])
  const tweetIds = tweetPosts
    .map(extractTweetId)
    .filter((id): id is string => id !== null)

  return (
    <Shell as="main" style={{ paddingTop: '48px', paddingBottom: '80px' }}>
      <SectionHead
        title="Best Threads on X"
        subtitle="THE BUILDER CONVERSATIONS TO OPEN"
      />

      {tweetIds.length === 0 ? (
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
      ) : (
        <div className="ff-article-grid mt-7">
          {tweetIds.map((id, index) => (
            <div key={`${id}-${index}`} className="ff-tweet-card">
              <div data-theme="light">
                <Suspense fallback={<TweetFallback />}>
                  <Tweet id={id} />
                </Suspense>
              </div>
            </div>
          ))}
        </div>
      )}

      <div style={{ marginTop: '40px' }}>
        <p style={{ font: "11px 'DM Mono', monospace", color: 'var(--muted)', margin: '0 0 24px' }}>
          ALL THREADS — {tweetIds.length} curated
        </p>
      </div>
    </Shell>
  )
}
