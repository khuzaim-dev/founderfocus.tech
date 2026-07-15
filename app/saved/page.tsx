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
                border: '1px solid var(--line)',
                borderRadius: '12px',
                background: '#fafafa',
                boxShadow: '0 4px 12px rgba(0,0,0,0.03)',
                transition: 'transform 0.2s, box-shadow 0.2s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)'
                e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.06)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'none'
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.03)'
              }}
            >
              <Link
                href={`/blog/${item.slug}?from=saved`}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px',
                  flex: 1,
                  textDecoration: 'none',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <b
                    style={{
                      font: "11px 'DM Mono', monospace",
                      color: 'var(--blue)',
                    }}
                  >
                    {String(i + 1).padStart(2, '0')}
                  </b>
                  <div
                    style={{
                      font: "10px 'DM Mono', monospace",
                      color: 'var(--blue)',
                      background: 'rgba(0, 102, 255, 0.08)',
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
                    fontSize: '18px',
                    fontWeight: 600,
                    margin: 0,
                    letterSpacing: '-0.4px',
                    lineHeight: 1.4,
                    color: 'var(--ink)',
                  }}
                >
                  {item.title}
                </h3>
              </Link>
              
              <div style={{ marginTop: '24px', paddingTop: '16px', borderTop: '1px solid var(--line)', display: 'flex', justifyContent: 'flex-end' }}>
                <button
                  onClick={() => remove(item.slug)}
                  aria-label={`Remove ${item.title} from saved`}
                  style={{
                    background: 'transparent',
                    border: '1px solid var(--line)',
                    color: 'var(--muted)',
                    font: "10px 'DM Mono', monospace",
                    padding: '6px 12px',
                    cursor: 'pointer',
                    borderRadius: '6px',
                    transition: 'color 0.2s, border-color 0.2s, background 0.2s',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = '#e53e3e'
                    e.currentTarget.style.borderColor = '#e53e3e'
                    e.currentTarget.style.background = 'rgba(229, 62, 62, 0.05)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = 'var(--muted)'
                    e.currentTarget.style.borderColor = 'var(--line)'
                    e.currentTarget.style.background = 'transparent'
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
