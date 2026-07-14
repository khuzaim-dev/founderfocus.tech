import type { WPPost } from '@/types/wordpress'
import { SectionHead } from '@/components/shared/SectionHead'
import { NavLinks } from '@/components/navigation/NavLinks'
import { ArticleGrid } from '@/components/blog/ArticleGrid'
import { Pagination } from '@/components/blog/Pagination'
import type { WPCategory } from '@/types/wordpress'

interface LatestSignalsProps {
  posts: WPPost[]
  currentPage: number
  totalPages: number
  categories: WPCategory[]
}

export function LatestSignals({
  posts,
  currentPage,
  totalPages,
  categories,
}: LatestSignalsProps) {
  const from = (currentPage - 1) * 6 + 1
  const to = Math.min(currentPage * 6, totalPages * 6)

  return (
    <section id="signals">
      <SectionHead
        title="Latest Signals"
        subtitle="THE THINGS WORTH KNOWING TODAY"
        right={`${String(from).padStart(2, '0')}—${String(to).padStart(2, '0')}`}
      />

      {/* Sub-navigation (category links + Saved) */}
      <NavLinks
        categories={categories}
        className="navmain"
        showSaved
      />

      {/* Article grid (3 posts → featured + sponsor → remaining) */}
      <ArticleGrid posts={posts} />

      {/* Pagination */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        basePath="/"
      />
    </section>
  )
}
