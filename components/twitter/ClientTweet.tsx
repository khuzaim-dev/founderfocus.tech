'use client'

import dynamic from 'next/dynamic'

// Dynamically import Tweet with ssr: false to bypass Twitter blocks on Vercel IPs
const Tweet = dynamic(() => import('react-tweet').then((mod) => mod.Tweet), { ssr: false })

interface ClientTweetProps {
  id: string
}

export function ClientTweet({ id }: ClientTweetProps) {
  return <Tweet id={id} />
}
