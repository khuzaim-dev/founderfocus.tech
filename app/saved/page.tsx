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
                {/* Cover image */}
                {item.imageUrl ? (
                  <div
                    style={{
                      width: '100%',
                      height: '132px',
                      overflow: 'hidden',
                      borderBottom: '1px solid var(--line)',
                      flexShrink: 0,
                    }}
                  >
                    <Image
                      src={item.imageUrl}
                      alt={item.title}
                      width={600}
                      height={132}
                      style={{
                        width: '100%',
                        height: '132px',
                        objectFit: 'cover',
                        filter: 'saturate(.72) contrast(1.05)',
                        transition: 'filter .25s, transform .25s',
                      }}
                      className="article-cover"
                    />
                  </div>
                ) : (
                  /* Editorial Placeholder matching site grid background */
                  <div
                    style={{
                      width: '100%',
                      height: '132px',
                      background: 'var(--paper)',
                      backgroundImage: 'linear-gradient(var(--grid) 1px, transparent 1px), linear-gradient(90deg, var(--grid) 1px, transparent 1px)',
                      backgroundSize: '20px 20px',
                      borderBottom: '1px solid var(--line)',
                      flexShrink: 0,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <span style={{ font: "9px 'DM Mono', monospace", color: 'var(--muted)', letterSpacing: '0.05em', border: '1px solid var(--line)', padding: '3px 8px', background: 'var(--paper)', borderRadius: '2px' }}>
                      NO IMAGE
                    </span>
                  </div>
                )}

                <div style={{ padding: '0 21px 21px', display: 'flex', flexDirection: 'column', flex: 1 }}>
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
