'use client'
import { useState } from 'react'
import { SubscribeDialog } from '@/components/newsletter/SubscribeDialog'

export function MobileSubscribeBanner() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <button
        className="mobile-sub"
        onClick={() => setOpen(true)}
        aria-label="Subscribe to FounderFocus"
        style={{
          position: 'fixed',
          zIndex: 8,
          bottom: '13px',
          left: '18px',
          right: '18px',
          padding: '14px',
          background: 'var(--ink)',
          border: '1px solid var(--acid)',
          color: 'white',
          font: "11px 'DM Mono', monospace",
          display: 'flex',
          justifyContent: 'space-between',
          cursor: 'pointer',
        }}
      >
        <span>GET THE DAILY SIGNAL</span>
        <b style={{ color: 'var(--acid)', fontWeight: 400 }}>SUBSCRIBE ↗</b>
      </button>
      <SubscribeDialog open={open} onOpenChange={setOpen} />
    </>
  )
}
