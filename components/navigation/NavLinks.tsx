'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import type { WPCategory } from '@/types/wordpress'
import { cn } from '@/lib/utils'

const STATIC_NAV_LINKS = [
  { label: 'Signals', href: '/#signals' },
  { label: 'AI', href: '/category/ai' },
  { label: 'Tech', href: '/category/tech' },
  { label: 'SAAS/Startups', href: '/category/startups' },
  { label: 'X-Threads', href: '/threads' },
  { label: 'Tools', href: '/#tools' },
  { label: 'AI/Tech News', href: '/category/ai' },
  { label: 'Saved', href: '/saved' },
]

interface NavLinksProps {
  categories?: WPCategory[]
  className?: string
  showSaved?: boolean
}

export function NavLinks({ categories, className, showSaved = false }: NavLinksProps) {
  const pathname = usePathname()

  const links = categories && categories.length > 0
    ? [
        { label: 'Signals', href: '/#signals' },
        ...categories.slice(0, 5).map((cat) => ({
          label: cat.name,
          href: `/category/${cat.slug}`,
        })),
        { label: 'X-Threads', href: '/threads' },
        { label: 'Saved', href: '/saved' },
      ]
    : STATIC_NAV_LINKS

  return (
    <nav
      className={cn('navlinks', className)}
      aria-label="Main navigation"
      style={{
        display: 'flex',
        gap: '22px',
        font: "12px 'DM Mono', monospace",
        marginRight: 'auto',
      }}
    >
      {links.map((link) => {
        const isActive =
          link.href === '/'
            ? pathname === '/'
            : pathname.startsWith(link.href.replace('/#', '/'))

        return (
          <Link
            key={link.href + link.label}
            href={link.href}
            className="ff-navlink"
            style={{
              borderBottom: isActive ? '2px solid var(--ink)' : undefined,
              transition: 'opacity 0.2s',
              textTransform: 'capitalize',
            }}
          >
            {link.label}
          </Link>
        )
      })}
    </nav>
  )
}
