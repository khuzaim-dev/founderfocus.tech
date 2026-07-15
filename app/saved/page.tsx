'use client'
import Link from 'next/link'
import { Shell } from '@/components/layout/Shell'
import { SectionHead } from '@/components/shared/SectionHead'
import { useBookmarks } from '@/hooks/useBookmarks'

export default function SavedPage() {
  const { saved, remove } = useBookmarks()

  return (
    <Shell as="main" style={{ paddingTop: '48px', paddingBottom: '80px' }}>
      <SectionHead
        title="Saved Signals"
        subtitle="YOUR BOOKMARKED ARTICLES"
        right={`${saved.length} saved`}
      />

      {saved.length === 0 ? (
        <div
          style={{
            padding: '60px 0',
            textAlign: 'center',
            font: "13px 'DM Mono', monospace",
            color: 'var(--muted)',
          }}
        >
          <p>No saved signals yet.</p>
          <Link
            href="/"
            style={{
              color: 'var(--blue)',
              textDecoration: 'underline',
              marginTop: '12px',
              display: 'inline-block',
            }}
          >
            ← Back to signals
          </Link>
        </div>
      ) : (
        <div className="ff-article-grid" style={{ maxWidth: '1100px', margin: '0 auto', paddingTop: '32px' }}>
          {saved.map((item, i) => (
            <article
              key={item.slug}
              className="ff-article-card"
              style={{
                display: 'flex',
                flexDirection: 'column',
                flex: 1,
              }}
            >
              <Link
                href={`/blog/${item.slug}?from=saved`}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  flex: 1,
                  textDecoration: 'none',
                }}
              >
                <div style={{ padding: '24px 24px 16px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                  {/* Meta row */}
                  <div
                    style={{
                      font: "10px 'DM Mono', monospace",
                      color: '#696969',
                      display: 'flex',
                      justifyContent: 'space-between',
                      marginTop: '18px',
                      letterSpacing: '0.04em',
                    }}
                  >
                    <span style={{ color: 'var(--blue)', fontWeight: 600, textTransform: 'uppercase' }}>
                      {item.category}
                    </span>
                    <span>#{String(i + 1).padStart(2, '0')}</span>
                  </div>

                  {/* Title */}
                  <h3
                    style={{
                      fontFamily: '"Geist Mono", monospace',
                      fontSize: '19px',
                      fontWeight: 500,
                      lineHeight: 1.25,
                      letterSpacing: '-0.02em',
                      margin: '16px 0 10px',
                      color: 'var(--ink)',
                    }}
                  >
                    {item.title}
                  </h3>
                </div>
              </Link>

              {/* Footer row with REMOVE button */}
              <div
                style={{
                  padding: '0 21px 21px',
                  marginTop: 'auto',
                  display: 'flex',
                  justifyContent: 'flex-end',
                }}
              >
                <button
                  onClick={() => remove(item.slug)}
                  aria-label={`Remove ${item.title} from saved`}
                  style={{
                    background: 'transparent',
                    border: '1px solid var(--line)',
                    color: 'var(--ink)',
                    font: "10px 'DM Mono', monospace",
                    padding: '6px 12px',
                    cursor: 'pointer',
                    borderRadius: '4px',
                    transition: 'all 0.2s',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = '#ef4444'
                    e.currentTarget.style.borderColor = '#ef4444'
                    e.currentTarget.style.background = '#fef2f2'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = 'var(--ink)'
                    e.currentTarget.style.borderColor = 'var(--line)'
                    e.currentTarget.style.background = 'transparent'
                  }}
                >
                  REMOVE
                </button>
              </div>
            </article>
          ))}
        </div>
      )}
    </Shell>
  )
}
