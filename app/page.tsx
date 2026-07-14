import type { Metadata } from 'next'
import { Suspense } from 'react'
import { Shell } from '@/components/layout/Shell'
import { Hero } from '@/components/home/Hero'
import { Ticker } from '@/components/home/Ticker'
import { LatestSignals } from '@/components/home/LatestSignals'
import { CategorySection } from '@/components/home/CategorySection'
import { ThreadsSection } from '@/components/home/ThreadsSection'
import { ToolsSection } from '@/components/home/ToolsSection'
import { Sidebar } from '@/components/sidebar/Sidebar'
import {
  getPosts,
  getLatestPosts,
  getPostsByCategory,
  getTickerPosts,
} from '@/services/posts'
import { getTweetPosts } from '@/services/tweets'
import { getCategories } from '@/lib/wordpress'
import { buildWebsiteJsonLd } from '@/utils/seo'

// ISR: revalidate every hour
export const revalidate = 3600

export const metadata: Metadata = {
  title: 'FounderFocus — Signal for builders',
  description:
    'FounderFocus is a live field manual for people building the next software economy. AI, tech, and startup signals—without the ambient noise.',
  alternates: {
    canonical: 'https://founderfocus.tech',
  },
}

interface HomePageProps {
  searchParams: Promise<{ page?: string }>
}

export default async function HomePage({ searchParams }: HomePageProps) {
  const { page: pageParam } = await searchParams
  const currentPage = Math.max(1, parseInt(pageParam ?? '1', 10))

  // Parallel data fetching
  const [
    { posts, totalPages },
    tickerPosts,
    aiPosts,
    techPosts,
    startupPosts,
    tweetPosts,
    popularPosts,
    categories,
  ] = await Promise.all([
    getPosts(currentPage, 6),
    getTickerPosts(),
    getPostsByCategory('ai', 1, 4).then((r) => r.posts).catch(() => []),
    getPostsByCategory('tech', 1, 4).then((r) => r.posts).catch(() => []),
    getPostsByCategory('startups', 1, 4).then((r) => r.posts).catch(() => []),
    getTweetPosts(12).catch(() => []),
    getLatestPosts(3).catch(() => []),
    getCategories().catch(() => []),
  ])

  return (
    <Shell as="main">
      {/* Hero — date, headline, status panel */}
      <Hero />

      {/* Live feed ticker */}
      <Ticker posts={tickerPosts} />

      {/* Main content + sidebar */}
      <div className="ff-layout-grid" style={{ padding: '60px 0 80px' }}>
        {/* Main column */}
        <div>
          {/* Latest Signals — 6 posts/page */}
          <LatestSignals
            posts={posts}
            currentPage={currentPage}
            totalPages={totalPages}
            categories={categories}
          />

          {/* AI/Tech News */}
          {aiPosts.length > 0 && (
            <CategorySection
              id="ai"
              title="AI/Tech News"
              subtitle="MODEL MOVES / RESEARCH / INFRASTRUCTURE"
              slug="ai"
              posts={aiPosts}
            />
          )}

          {/* Tech */}
          {techPosts.length > 0 && (
            <CategorySection
              id="tech"
              title="Tech"
              subtitle="PLATFORMS / INFRASTRUCTURE / TOOLS"
              slug="tech"
              posts={techPosts}
            />
          )}

          {/* Startups */}
          {startupPosts.length > 0 && (
            <CategorySection
              id="startups"
              title="SAAS / Startups"
              subtitle="FUNDING / GROWTH / OPERATOR LESSONS"
              slug="startups"
              posts={startupPosts}
            />
          )}

          {/* X Threads */}
          <Suspense fallback={null}>
            <ThreadsSection posts={tweetPosts} />
          </Suspense>

          {/* Tools — static */}
          <ToolsSection />
        </div>

        {/* Sidebar */}
        <Sidebar popularPosts={popularPosts} />
      </div>
    </Shell>
  )
}
