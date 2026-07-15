import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Shell } from '@/components/layout/Shell'
import { ArticleGrid } from '@/components/blog/ArticleGrid'
import { Pagination } from '@/components/blog/Pagination'
import { Sidebar } from '@/components/sidebar/Sidebar'
import { SectionHead } from '@/components/shared/SectionHead'
import { getPostsByCategory, getLatestPosts, getCategories } from '@/lib/wordpress'
import { getCategoryBySlug } from '@/services/categories'

export const revalidate = 3600

interface PageProps {
  params: Promise<{ slug: string }>
  searchParams: Promise<{ page?: string }>
}

export async function generateStaticParams() {
  const categories = await getCategories().catch(() => [])
  return categories.map((cat) => ({ slug: cat.slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const category = await getCategoryBySlug(slug).catch(() => null)
  if (!category) return {}

  return {
    title: `${category?.name || 'Category'} — FounderFocus`,
    description: category?.description || `Latest ${category?.name || 'Category'} signals from FounderFocus.`,
    alternates: {
      canonical: `https://founderfocus.tech/category/${slug}`,
    },
  }
}

export default async function CategoryPage({ params, searchParams }: PageProps) {
  const { slug } = await params
  const { page: pageParam } = await searchParams
  const currentPage = Math.max(1, parseInt(pageParam ?? '1', 10))

  const [category, { posts, totalPages }, popularPosts] = await Promise.all([
    getCategoryBySlug(slug).catch(() => null),
    getPostsByCategory(slug, currentPage, 6).catch(() => ({ posts: [], totalPages: 0, total: 0 })),
    getLatestPosts(3).catch(() => []),
  ])

  if (!category) notFound()

  return (
    <Shell as="main" style={{ paddingTop: '48px', paddingBottom: '80px' }}>
      <div className="ff-layout-grid">
        <div>
          <SectionHead
            title={category?.name || 'Category'}
            subtitle={category?.description?.toUpperCase() || `ALL ${category?.name?.toUpperCase() || 'CATEGORY'} SIGNALS`}
            right={`${posts?.length || 0} signals`}
          />
          <ArticleGrid posts={posts} />
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            basePath={`/category/${slug}`}
          />
        </div>
        <Sidebar popularPosts={popularPosts} />
      </div>
    </Shell>
  )
}
