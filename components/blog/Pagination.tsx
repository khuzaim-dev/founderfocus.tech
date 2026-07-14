import Link from 'next/link'

interface PaginationProps {
  currentPage: number
  totalPages: number
  basePath: string
}

export function Pagination({ currentPage, totalPages, basePath }: PaginationProps) {
  if (totalPages <= 1) return null

  const prev = currentPage - 1
  const next = currentPage + 1

  function pageHref(page: number): string {
    if (page === 1) return basePath
    return `${basePath}?page=${page}`
  }

  return (
    <nav
      aria-label="Pagination"
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        paddingTop: '28px',
        font: "11px 'DM Mono', monospace",
      }}
    >
      {/* Previous */}
      {prev >= 1 ? (
        <Link
          href={pageHref(prev)}
          style={{
            padding: '8px 14px',
            border: '1px solid var(--line)',
            color: 'var(--ink)',
            transition: 'background 0.2s',
            borderRadius: '6px',
          }}
        >
          ← PREV
        </Link>
      ) : (
        <span
          style={{
            padding: '8px 14px',
            border: '1px solid var(--line)',
            color: 'var(--muted)',
            cursor: 'not-allowed',
            borderRadius: '6px',
          }}
        >
          ← PREV
        </span>
      )}

      {/* Page numbers */}
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
        <Link
          key={page}
          href={pageHref(page)}
          aria-current={page === currentPage ? 'page' : undefined}
          style={{
            padding: '8px 12px',
            border: page === currentPage ? '1px solid var(--ink)' : '1px solid var(--line)',
            background: page === currentPage ? 'var(--ink)' : 'transparent',
            color: page === currentPage ? 'white' : 'var(--ink)',
            transition: 'background 0.2s',
            borderRadius: '6px',
          }}
        >
          {page}
        </Link>
      ))}

      {/* Next */}
      {next <= totalPages ? (
        <Link
          href={pageHref(next)}
          style={{
            padding: '8px 14px',
            border: '1px solid var(--line)',
            color: 'var(--ink)',
            transition: 'background 0.2s',
            borderRadius: '6px',
          }}
        >
          NEXT →
        </Link>
      ) : (
        <span
          style={{
            padding: '8px 14px',
            border: '1px solid var(--line)',
            color: 'var(--muted)',
            cursor: 'not-allowed',
            borderRadius: '6px',
          }}
        >
          NEXT →
        </span>
      )}
    </nav>
  )
}
