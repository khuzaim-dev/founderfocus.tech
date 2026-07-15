import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Shell } from '@/components/layout/Shell'
import { SaveButton } from '@/components/blog/SaveButton'
import { Sidebar } from '@/components/sidebar/Sidebar'
import {
  getPost,
  getAllPostSlugs,
  getLatestPosts,
  getFeaturedImageUrl,
  getAuthorName,
  getPrimaryCategory,
} from '@/lib/wordpress'
import { calculateReadingTime, formatReadingTime } from '@/utils/readingTime'
import { formatShortDate } from '@/utils/formatDate'
import { buildArticleJsonLd, buildBreadcrumbJsonLd } from '@/utils/seo'

export const revalidate = 3600

interface PageProps {
  params: Promise<{ slug: string }>
  searchParams: Promise<{ from?: string }>
}

export async function generateStaticParams() {
  const slugs = await getAllPostSlugs().catch(() => [] as string[])
  return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const post = await getPost(slug).catch(() => null)
  if (!post) return {}

  const title = post.title?.rendered?.replace(/<[^>]*>/g, '') || 'Untitled'
  const description = post.excerpt?.rendered?.replace(/<[^>]*>/g, '').slice(0, 160) || ''
  const imageUrl = getFeaturedImageUrl(post)

  return {
    title,
    description,
    alternates: {
      canonical: `https://founderfocus.tech/blog/${slug}`,
    },
    openGraph: {
      type: 'article',
      url: `https://founderfocus.tech/blog/${slug}`,
      title,
      description,
      publishedTime: post.date_gmt,
      modifiedTime: post.modified_gmt,
      authors: [getAuthorName(post)],
      images: imageUrl ? [{ url: imageUrl }] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: imageUrl ? [imageUrl] : [],
    },
  }
}

export default async function BlogPostPage({ params, searchParams }: PageProps) {
  const { slug } = await params
  const { from } = await searchParams
  const [post, popularPosts] = await Promise.all([
    getPost(slug).catch(() => null),
    getLatestPosts(3).catch(() => []),
  ])

  if (!post) notFound()

  const title = post.title?.rendered?.replace(/<[^>]*>/g, '') || 'Untitled'
  const imageUrl = getFeaturedImageUrl(post)
  const author = getAuthorName(post)
  const category = getPrimaryCategory(post)
  const readingTime = formatReadingTime(calculateReadingTime(post.content?.rendered || ''))
  const date = formatShortDate(post.date)
  const articleJsonLd = buildArticleJsonLd(post, imageUrl ?? undefined)
  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: 'Home', url: 'https://founderfocus.tech' },
    { name: category, url: `https://founderfocus.tech/category/${category.toLowerCase()}` },
    { name: title, url: `https://founderfocus.tech/blog/${slug}` },
  ])

  const backHref = from === 'saved' ? '/saved' : '/'
  const backText = from === 'saved' ? '← Back to Saved' : '← Back to Signals'

  return (
    <Shell as="main" style={{ paddingTop: '48px', paddingBottom: '80px' }}>
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <div className="ff-layout-grid">
        {/* Article */}
        <article>
          {/* Back */}
          <Link
            href={backHref}
            style={{
              font: "12px 'DM Mono', monospace",
              color: '#696969',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              marginBottom: '28px',
            }}
          >
            {backText}
          </Link>

          {/* Category + reading time */}
          <div
            style={{
              font: "11px 'DM Mono', monospace",
              display: 'flex',
              gap: '16px',
              marginBottom: '16px',
              letterSpacing: '0.02em',
            }}
          >
            <span style={{ color: 'var(--blue)' }}>{category}</span>
            <span style={{ color: '#696969' }}>{readingTime}</span>
          </div>

          {/* Title */}
          <h1
            style={{
              fontSize: 'clamp(2rem, 4vw, 3.2rem)',
              lineHeight: 1.1,
              letterSpacing: '-0.06em',
              margin: '0 0 20px',
              fontFamily: 'Manrope, Arial, sans-serif',
              fontWeight: 800,
              maxWidth: '780px',
            }}
            dangerouslySetInnerHTML={{ __html: post.title?.rendered || 'Untitled' }}
          />

          {/* Author + date */}
          <div
            style={{
              font: "12px 'DM Mono', monospace",
              color: '#696969',
              display: 'flex',
              gap: '18px',
              alignItems: 'center',
              marginBottom: '32px',
              flexWrap: 'wrap',
              padding: '16px 0',
              borderTop: '1px solid var(--line)',
              borderBottom: '1px solid var(--line)',
            }}
          >
            <span style={{ color: 'var(--ink)', fontWeight: 500 }}>{author.toUpperCase()}</span>
            <span>·</span>
            <span>{date}</span>
            <span>·</span>
            <span>{readingTime}</span>
            <div style={{ marginLeft: 'auto' }}>
              <SaveButton slug={post.slug} title={title} category={category} />
            </div>
          </div>

          {/* Featured image */}
          {imageUrl && (
            <div
              style={{
                width: '100%',
                marginBottom: '40px',
                borderRadius: '12px',
                overflow: 'hidden',
                border: '1px solid var(--line)',
              }}
            >
              <Image
                src={imageUrl}
                alt={title}
                width={1200}
                height={500}
                style={{ width: '100%', height: 'auto', objectFit: 'cover' }}
                priority
              />
            </div>
          )}

          {/* Content */}
          <div
            className="ff-blog-content"
            dangerouslySetInnerHTML={{ __html: post.content?.rendered || '' }}
          />

          {/* Tags */}
          {post._embedded?.['wp:term']?.[1]?.length ? (
            <div
              style={{
                marginTop: '40px',
                paddingTop: '24px',
                borderTop: '1px solid var(--line)',
                display: 'flex',
                gap: '8px',
                flexWrap: 'wrap',
              }}
            >
              {post._embedded['wp:term'][1].map((tag) => (
                <span
                  key={tag.id}
                  style={{
                    font: "10px 'DM Mono', monospace",
                    color: 'var(--blue)',
                    border: '1px solid var(--line)',
                    padding: '4px 8px',
                    borderRadius: '4px',
                  }}
                >
                  {tag.name}
                </span>
              ))}
            </div>
          ) : null}

          {/* Share buttons */}
          <div
            style={{
              marginTop: '40px',
              paddingTop: '24px',
              borderTop: '1px solid var(--line)',
              display: 'flex',
              gap: '12px',
            }}
          >
            <a
              href={`https://twitter.com/intent/tweet?url=https://founderfocus.tech/blog/${slug}&text=${encodeURIComponent(title)}`}
              target="_blank"
              rel="noreferrer noopener"
              style={{
                font: "11px 'DM Mono', monospace",
                border: '1px solid var(--line)',
                padding: '8px 14px',
                color: 'var(--ink)',
                borderRadius: '6px',
                transition: 'background 0.2s',
              }}
            >
              SHARE ON X →
            </a>
          </div>
        </article>

        {/* Sidebar */}
        <Sidebar popularPosts={popularPosts} />
      </div>
    </Shell>
  )
}
