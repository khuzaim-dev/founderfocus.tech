'use client'
import type { WPPost } from '@/types/wordpress'
import { extractTweetId } from '@/lib/wordpress'
import { Tweet } from 'react-tweet'

interface TweetMarqueeProps {
  posts: WPPost[]
}

// Fallback tweet IDs for when WP has no threads category yet
const FALLBACK_TWEET_IDS = [
  '1685118800974655489',
  '1671197910899785728',
  '1685118800974655489',
]

export function TweetMarquee({ posts }: TweetMarqueeProps) {
  const tweetIds = posts
    .map((p) => extractTweetId(p))
    .filter((id): id is string => id !== null)

  const ids = tweetIds.length > 0 ? tweetIds : FALLBACK_TWEET_IDS
  // Duplicate for seamless infinite scroll
  const doubled = [...ids, ...ids]

  return (
    <div
      className="ff-x-marquee"
      aria-label="Selected technology conversations on X"
    >
      <div className="ff-x-track">
        {doubled.map((id, i) => (
          <div
            key={`${id}-${i}`}
            style={{ width: '276px', flexShrink: 0 }}
            data-theme="light"
          >
            <Tweet id={id} />
          </div>
        ))}
      </div>
    </div>
  )
}
