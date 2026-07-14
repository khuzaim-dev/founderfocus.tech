'use client'
import { useState, FormEvent } from 'react'

type FormState = 'idle' | 'loading' | 'success' | 'error'

export function NewsletterWidget() {
  const [email, setEmail] = useState('')
  const [state, setState] = useState<FormState>('idle')

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (!email) return
    setState('loading')
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, name: '' }),
      })
      if (!res.ok) throw new Error()
      setState('success')
    } catch {
      setState('error')
    }
  }

  return (
    <section
      style={{
        background: 'var(--ink)',
        color: 'white',
        padding: '20px',
        marginBottom: '28px',
      }}
    >
      <h3
        style={{
          fontSize: '20px',
          letterSpacing: '-0.8px',
          margin: '0 0 8px',
          fontFamily: 'Manrope, Arial, sans-serif',
        }}
      >
        Stay in the loop.
      </h3>
      <p
        style={{
          font: "11px/1.55 'DM Mono', monospace",
          color: '#b8b8b8',
          margin: '0 0 16px',
        }}
      >
        A brief, useful read for builders. Every weekday.
      </p>

      {state === 'success' ? (
        <p
          style={{
            font: "11px 'DM Mono', monospace",
            color: 'var(--acid)',
          }}
        >
          ✓ You&apos;re subscribed. Signal incoming.
        </p>
      ) : (
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            aria-label="Email address"
            placeholder="you@company.com"
            required
            style={{
              width: '100%',
              padding: '11px',
              border: '1px solid #555',
              background: '#252525',
              color: 'white',
              font: "11px 'DM Mono', monospace",
              outline: 'none',
              marginBottom: 0,
            }}
          />
          <button
            type="submit"
            disabled={state === 'loading'}
            style={{
              width: '100%',
              marginTop: '8px',
              padding: '11px',
              border: 0,
              background: state === 'loading' ? '#b8cc30' : 'var(--acid)',
              font: "11px 'DM Mono', monospace",
              cursor: state === 'loading' ? 'not-allowed' : 'pointer',
              color: 'var(--ink)',
              fontWeight: 600,
            }}
          >
            {state === 'loading' ? 'SENDING...' : 'GET THE SIGNAL →'}
          </button>
          {state === 'error' && (
            <p
              style={{
                font: "10px 'DM Mono', monospace",
                color: '#ff6b6b',
                margin: '6px 0 0',
              }}
            >
              Something went wrong. Try again.
            </p>
          )}
        </form>
      )}
    </section>
  )
}
