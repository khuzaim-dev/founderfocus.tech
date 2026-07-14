import type { WPPost } from '@/types/wordpress'
import { ArticleCard } from './ArticleCard'
import { FeaturedCard } from './FeaturedCard'
import { SponsorCard } from './SponsorCard'

interface ArticleGridProps {
  posts: WPPost[]
}

/**
 * Renders the 3-column article grid with the fixed ad layout:
 * [0] ArticleCard
 * [1] ArticleCard
 * [2] ArticleCard
 * [3] FeaturedCard (span 2, static editorial)
 * [4] SponsorCard (span 1, static)
 * [5] ArticleCard
 * [6] ArticleCard (if exists)
 */
export function ArticleGrid({ posts }: ArticleGridProps) {
  const before = posts.slice(0, 3)
  const after = posts.slice(3)

  return (
    <div className="ff-article-grid mt-7">
      {/* First 3 post cards */}
      {before.map((post) => (
        <ArticleCard key={post.id} post={post} />
      ))} 

      {/* Preserve grid layout position even if there are no posts */}
      {before.length === 0 && (
        <div style={{ gridColumn: '1 / -1', minHeight: '323px' }} />
      )}

      {/* Fixed editorial + sponsor (always present on second row) */}
      <div className="ff-article-grid" style={{ gridColumn: '1 / -1' }}>
        <FeaturedCard />
        <SponsorCard />
      </div>

      {/* Remaining post cards */}
      {after.map((post) => (
        <ArticleCard key={post.id} post={post} />
      ))}
    </div>
  )
}
