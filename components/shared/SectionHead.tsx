import Link from 'next/link'
import type { ReactNode } from 'react'

interface SectionHeadProps {
  title: string
  subtitle?: string
  right?: ReactNode
  viewAllHref?: string
  viewAllLabel?: string
  id?: string
}

export function SectionHead({
  title,
  subtitle,
  right,
  viewAllHref,
  viewAllLabel = 'VIEW ALL ↗',
  id,
}: SectionHeadProps) {
  return (
    <div className="ff-section-head" id={id}>
      <h2
        style={{
          fontSize: '20px',
          letterSpacing: '-0.8px',
          margin: 0,
          fontFamily: 'Manrope, Arial, sans-serif',
          fontWeight: 700,
          textTransform: 'capitalize',
        }}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          style={{
            font: "10px 'DM Mono', monospace",
            color: 'var(--muted)',
            margin: 0,
          }}
        >
          {subtitle}
        </p>
      )}
      {viewAllHref ? (
        <Link
          href={viewAllHref}
          style={{
            font: "10px 'DM Mono', monospace",
            color: 'var(--muted)',
            margin: 0,
          }}
        >
          {viewAllLabel}
        </Link>
      ) : right ? (
        <span
          style={{
            font: "10px 'DM Mono', monospace",
            color: 'var(--muted)',
            margin: 0,
          }}
        >
          {right}
        </span>
      ) : null}
    </div>
  )
}
