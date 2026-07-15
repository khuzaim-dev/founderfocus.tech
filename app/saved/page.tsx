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
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
            gap: '24px',
            maxWidth: '1100px',
            margin: '0 auto',
            paddingTop: '32px'
          }}
        >
          {saved.map((item, i) => (
            <div
              key={item.slug}
              className="ff-saved-card"
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                padding: '24px',
                border: '1px solid #eaeaea',
                borderRadius: '8px',
                background: '#ffffff',
                boxShadow: '0 2px 8px rgba(0,0,0,0.02)',
                transition: 'box-shadow 0.2s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = '0 6px 16px rgba(0,0,0,0.06)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.02)'
              }}
            >
              <Link
                href={`/blog/${item.slug}?from=saved`}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '20px',
                  flex: 1,
                  textDecoration: 'none',
                }}
              >
                {item.imageUrl && (
                  <div style={{ width: '100%', height: '140px', overflow: 'hidden', borderRadius: '4px' }}>
                    <Image
                      src={item.imageUrl}
                      alt={item.title}
                      width={400}
                      height={140}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  </div>
                )}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <b
                    style={{
                      font: "12px 'DM Mono', monospace",
                      color: '#3b82f6',
                    }}
                  >
                    {String(i + 1).padStart(2, '0')}
                  </b>
                  <div
                    style={{
                      font: "10px 'DM Mono', monospace",
                      color: '#3b82f6',
                      background: '#eff6ff',
                      padding: '4px 8px',
                      borderRadius: '4px',
                      textTransform: 'uppercase'
                    }}
                  >
                    {item.category}
                  </div>
                </div>
                <h3
                  style={{
                    fontFamily: '"Geist Mono", monospace',
                    fontSize: '19px',
                    fontWeight: 600,
                    margin: 0,
                    letterSpacing: '-0.3px',
                    lineHeight: 1.4,
                    color: '#111827',
                  }}
                >
                  {item.title}
                </h3>
              </Link>

              <div style={{ marginTop: '28px', paddingTop: '16px', borderTop: '1px solid #eaeaea', display: 'flex', justifyContent: 'flex-end' }}>
                <button
                  onClick={() => remove(item.slug)}
                  aria-label={`Remove ${item.title} from saved`}
                  style={{
                    background: '#ffffff',
                    border: '1px solid #eaeaea',
                    color: '#e5e7eb',
                    font: "10px 'DM Mono', monospace",
                    padding: '6px 12px',
                    cursor: 'pointer',
                    borderRadius: '6px',
                    transition: 'all 0.2s',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = '#ef4444'
                    e.currentTarget.style.borderColor = '#ef4444'
                    e.currentTarget.style.background = '#fef2f2'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = '#e5e7eb'
                    e.currentTarget.style.borderColor = '#eaeaea'
                    e.currentTarget.style.background = '#ffffff'
                  }}
                >
                  REMOVE
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </Shell>
  )
}
