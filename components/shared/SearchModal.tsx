'use client'
import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { searchPosts } from '@/services/posts'
import { getFeaturedImageUrl } from '@/lib/wordpress'
import type { WPPost } from '@/types/wordpress'
import { useSearchModal } from '@/hooks/useSearchModal'

interface SearchModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function SearchModal({ open, onOpenChange }: SearchModalProps) {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<WPPost[]>([])
  const [loading, setLoading] = useState(false)
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Ctrl+K global shortcut
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault()
        onOpenChange(true)
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onOpenChange])

  // Focus input when opened
  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 100)
    } else {
      setQuery('')
      setResults([])
    }
  }, [open])

  // Debounced search
  useEffect(() => {
    if (!query.trim()) {
      setResults([])
      return
    }
    if (debounceRef.current) clearTimeout(debounceRef.current)
    setLoading(true)
    debounceRef.current = setTimeout(async () => {
      try {
        const data = await searchPosts(query)
        setResults(data)
      } catch {
        setResults([])
      } finally {
        setLoading(false)
      }
    }, 350)
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current)
    }
  }, [query])

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        style={{
          maxWidth: '560px',
          padding: 0,
          background: 'white',
          border: '1px solid var(--line)',
          borderRadius: '12px',
          overflow: 'hidden',
        }}
      >
        {/* Search input */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            borderBottom: '1px solid var(--line)',
            padding: '0 16px',
            gap: '10px',
          }}
        >
          <span style={{ fontSize: '18px', color: 'var(--muted)' }}>⌕</span>
          <input
            ref={inputRef}
            id="search-input"
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search FounderFocus..."
            aria-label="Search posts"
            style={{
              flex: 1,
              border: 'none',
              outline: 'none',
              padding: '16px 0',
              font: '14px Manrope, Arial, sans-serif',
              background: 'transparent',
              color: 'var(--ink)',
            }}
          />
          <kbd
            style={{
              font: "10px 'DM Mono', monospace",
              color: 'var(--muted)',
              background: '#f4f4f4',
              border: '1px solid var(--line)',
              padding: '2px 6px',
              borderRadius: '4px',
            }}
          >
            ESC
          </kbd>
        </div>

        {/* Results */}
        <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
          {loading && (
            <p
              style={{
                font: "11px 'DM Mono', monospace",
                color: 'var(--muted)',
                padding: '16px',
                margin: 0,
              }}
            >
              Searching...
            </p>
          )}
          {!loading && query && results.length === 0 && (
            <p
              style={{
                font: "11px 'DM Mono', monospace",
                color: 'var(--muted)',
                padding: '16px',
                margin: 0,
              }}
            >
              No results for &quot;{query}&quot;
            </p>
          )}
          {results.map((post) => (
            <Link
              key={post.id}
              href={`/blog/${post.slug}`}
              onClick={() => onOpenChange(false)}
              style={{
                display: 'block',
                padding: '12px 16px',
                borderBottom: '1px solid var(--line)',
                transition: 'background 0.15s',
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.background = '#f8f8f7')
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.background = 'transparent')
              }
            >
              <div
                style={{
                  font: "11px 'DM Mono', monospace",
                  color: 'var(--blue)',
                  marginBottom: '3px',
                }}
              >
                SIGNAL
              </div>
              <div
                style={{
                  fontSize: '14px',
                  fontWeight: 600,
                  letterSpacing: '-0.3px',
                  color: 'var(--ink)',
                  lineHeight: 1.3,
                }}
                dangerouslySetInnerHTML={{ __html: post.title.rendered }}
              />
            </Link>
          ))}
        </div>

        {/* Footer hint */}
        {!query && (
          <p
            style={{
              font: "10px 'DM Mono', monospace",
              color: 'var(--muted)',
              padding: '12px 16px',
              margin: 0,
              borderTop: '1px solid var(--line)',
            }}
          >
            Type to search all signals and articles
          </p>
        )}
      </DialogContent>
    </Dialog>
  )
}
