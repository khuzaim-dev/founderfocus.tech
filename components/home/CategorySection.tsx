import type { WPPost } from '@/types/wordpress'
import { SectionHead } from '@/components/shared/SectionHead'
import { CompactCard } from '@/components/blog/CompactCard'

interface CategorySectionProps {
  title: string
  subtitle: string
  slug: string
  posts: WPPost[]
  id?: string
}

export function CategorySection({ title, subtitle, slug, posts, id }: CategorySectionProps) {
  return (
    <section className="section-block" id={id} style={{ marginTop: '68px' }}>
      <SectionHead
        title={title}
        subtitle={subtitle}
        viewAllHref={`/category/${slug}`}
        viewAllLabel="VIEW ALL ↗"
      />
      <div className="ff-compact-grid">
        {posts.slice(0, 4).map((post, i) => (
          <CompactCard key={post.id} post={post} index={i} />
        ))}
      </div>
    </section>
  )
}
