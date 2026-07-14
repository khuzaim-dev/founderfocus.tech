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
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
          {saved.map((item, i) => (
            <div
              key={item.slug}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '16px 0',
                borderBottom: '1px solid var(--line)',
                gap: '16px',
              }}
            >
              <Link
                href={`/blog/${item.slug}`}
                style={{
                  display: 'flex',
                  gap: '16px',
                  alignItems: 'flex-start',
                  flex: 1,
                }}
              >
                <b
                  style={{
                    font: "11px 'DM Mono', monospace",
                    color: 'var(--blue)',
                    flexShrink: 0,
                    minWidth: '24px',
                  }}
                >
                  {String(i + 1).padStart(2, '0')}
                </b>
                <div>
                  <div
                    style={{
                      font: "10px 'DM Mono', monospace",
                      color: 'var(--blue)',
                      marginBottom: '4px',
                    }}
                  >
                    {item.category}
                  </div>
                  <h3
                    style={{
                      fontFamily: '"Geist Mono", monospace',
                      fontSize: '16px',
                      fontWeight: 400,
                      margin: 0,
                      letterSpacing: '-0.4px',
                      lineHeight: 1.35,
                      color: 'var(--ink)',
                    }}
                  >
                    {item.title}
                  </h3>
                </div>
              </Link>
              <button
                onClick={() => remove(item.slug)}
                aria-label={`Remove ${item.title} from saved`}
                style={{
                  background: 'transparent',
                  border: '1px solid var(--line)',
                  color: 'var(--muted)',
                  font: "9px 'DM Mono', monospace",
                  padding: '4px 8px',
                  cursor: 'pointer',
                  borderRadius: '3px',
                  flexShrink: 0,
                  transition: 'color 0.2s, border-color 0.2s',
                }}
              >
                REMOVE
              </button>
            </div>
          ))}
        </div>
      )}
    </Shell>
  )
}
