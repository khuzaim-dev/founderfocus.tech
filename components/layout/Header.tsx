'use client'
import { useState } from 'react'
import Link from 'next/link'
import { Shell } from '@/components/layout/Shell'
import { NavLinks } from '@/components/navigation/NavLinks'
import { LiveIndicator } from '@/components/shared/LiveIndicator'
import { SubscribeDialog } from '@/components/newsletter/SubscribeDialog'
import { SearchModal } from '@/components/shared/SearchModal'
import type { WPCategory } from '@/types/wordpress'

interface HeaderProps {
  categories: WPCategory[]
}

export function Header({ categories }: HeaderProps) {
  const [subscribeOpen, setSubscribeOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <>
      <Shell
        as="header"
        style={{
          width: '100%',
          height: '76px',
          display: 'flex',
          alignItems: 'center',
          gap: '32px',
          borderBottom: '1px solid var(--line)',
          position: 'relative',
        }}
      >
        {/* Logo */}
        <Link
          href="/"
          aria-label="FounderFocus home"
          style={{
            font: '800 23px Manrope, sans-serif',
            letterSpacing: '-1.8px',
            textDecoration: 'none',
            color: 'var(--ink)',
            flexShrink: 0,
          }}
        >
          Founder<span style={{ color: 'var(--blue)' }}>Focus</span>
        </Link>

        {/* Nav links (fetched from WP categories) - hidden on mobile via CSS */}
        <NavLinks categories={categories} />

        {/* Actions: search, live, subscribe */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '14px',
            flexShrink: 0,
            marginLeft: 'auto',
          }}
        >
          {/* Search button */}
          <button
            className="icon-btn"
            aria-label="Search (Ctrl+K)"
            onClick={() => setSearchOpen(true)}
            style={{
              background: 'transparent',
              border: 0,
              cursor: 'pointer',
              fontSize: '18px',
              padding: '5px',
              lineHeight: 1,
              color: 'var(--ink)',
            }}
          >
            ⌕
          </button>

          {/* LIVE indicator */}
          <LiveIndicator />

          {/* Subscribe button (hidden on mobile, mobile banner used instead) */}
          <button
            className="ff-subscribe"
            onClick={() => setSubscribeOpen(true)}
            aria-label="Subscribe to FounderFocus newsletter"
          >
            SUBSCRIBE ↗
          </button>

          {/* Hamburger button (visible on mobile via CSS) */}
          <button
            className="ff-hamburger"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? '✕' : '☰'}
          </button>
        </div>

        {/* Mobile Dropdown Menu */}
        {menuOpen && (
          <div className="ff-mobile-menu">
            <NavLinks
              categories={categories}
              className="mobile-nav"
              showSaved
            />
            <button
              className="ff-subscribe-mobile"
              onClick={() => {
                setSubscribeOpen(true)
                setMenuOpen(false)
              }}
            >
              SUBSCRIBE TO NEWSLETTER ↗
            </button>
          </div>
        )}
      </Shell>

      {/* Dialogs */}
      <SubscribeDialog open={subscribeOpen} onOpenChange={setSubscribeOpen} />
      <SearchModal open={searchOpen} onOpenChange={setSearchOpen} />
    </>
  )
}
