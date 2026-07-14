'use client'
import { useState, FormEvent } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'

interface SubscribeDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

type FormState = 'idle' | 'loading' | 'success' | 'error'

export function SubscribeDialog({ open, onOpenChange }: SubscribeDialogProps) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [state, setState] = useState<FormState>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (!email || !name) return

    setState('loading')
    setErrorMsg('')

    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email }),
      })

      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        throw new Error(data.message ?? 'Something went wrong')
      }

      setState('success')
    } catch (err) {
      setState('error')
      setErrorMsg(err instanceof Error ? err.message : 'Please try again.')
    }
  }

  function handleClose(v: boolean) {
    onOpenChange(v)
    if (!v) {
      setTimeout(() => {
        setState('idle')
        setName('')
        setEmail('')
        setErrorMsg('')
      }, 300)
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent
        style={{
          background: '#181818',
          border: '1px solid var(--acid)',
          color: 'white',
          maxWidth: '420px',
          padding: '30px',
          borderRadius: '0',
        }}
      >
        {state === 'success' ? (
          <div style={{ textAlign: 'center', padding: '20px 0' }}>
            <div
              style={{
                fontSize: '36px',
                marginBottom: '16px',
              }}
            >
              ✓
            </div>
            <DialogTitle
              style={{
                fontSize: '20px',
                letterSpacing: '-0.8px',
                color: 'var(--acid)',
                fontFamily: 'Manrope, Arial, sans-serif',
              }}
            >
              You&apos;re in.
            </DialogTitle>
            <p
              style={{
                font: "11px/1.55 'DM Mono', monospace",
                color: '#b8b8b8',
                marginTop: '12px',
              }}
            >
              Check your inbox. The signal arrives every weekday.
            </p>
          </div>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle
                style={{
                  fontSize: '22px',
                  letterSpacing: '-0.9px',
                  fontFamily: 'Manrope, Arial, sans-serif',
                  marginBottom: '6px',
                }}
              >
                Get the Daily Signal.
              </DialogTitle>
              <DialogDescription
                style={{
                  font: "11px/1.55 'DM Mono', monospace",
                  color: '#b8b8b8',
                }}
              >
                A brief, useful read for builders. Every weekday.
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmit} style={{ marginTop: '20px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <input
                  id="subscribe-name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name"
                  required
                  aria-label="Your name"
                  style={{
                    width: '100%',
                    padding: '11px',
                    border: '1px solid #555',
                    background: '#252525',
                    color: 'white',
                    font: "11px 'DM Mono', monospace",
                    outline: 'none',
                  }}
                />
                <input
                  id="subscribe-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@company.com"
                  required
                  aria-label="Email address"
                  style={{
                    width: '100%',
                    padding: '11px',
                    border: '1px solid #555',
                    background: '#252525',
                    color: 'white',
                    font: "11px 'DM Mono', monospace",
                    outline: 'none',
                  }}
                />

                {state === 'error' && (
                  <p
                    style={{
                      font: "10px 'DM Mono', monospace",
                      color: '#ff6b6b',
                      margin: 0,
                    }}
                    role="alert"
                  >
                    {errorMsg}
                  </p>
                )}

                <button
                  id="subscribe-submit"
                  type="submit"
                  disabled={state === 'loading'}
                  style={{
                    width: '100%',
                    padding: '11px',
                    border: 0,
                    background: state === 'loading' ? '#b8cc30' : 'var(--acid)',
                    font: "11px 'DM Mono', monospace",
                    cursor: state === 'loading' ? 'not-allowed' : 'pointer',
                    color: 'var(--ink)',
                    fontWeight: 600,
                    transition: 'background 0.2s',
                  }}
                >
                  {state === 'loading' ? 'SENDING...' : 'GET THE SIGNAL →'}
                </button>
              </div>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}
