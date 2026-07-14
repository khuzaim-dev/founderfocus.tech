import { formatEyebrowDate } from '@/utils/formatDate'
import { StatusPanel } from './StatusPanel'

export function Hero() {
  const dateStr = formatEyebrowDate(new Date())

  return (
    <section
      style={{
        padding: '46px 0 66px',
        display: 'grid',
        gridTemplateColumns: '1.7fr .9fr',
        gap: '80px',
        borderBottom: '1px solid var(--line)',
      }}
    // Responsive handled by media queries in globals.css
    >
      {/* Left: Headline + Lede */}
      <div>
        {/* Eyebrow date */}
        <div
          style={{
            font: "12px 'DM Mono', monospace",
            display: 'flex',
            gap: '10px',
            alignItems: 'center',
            marginBottom: '24px',
          }}
        >
          <b
            style={{
              background: 'var(--ink)',
              color: 'white',
              padding: '4px 7px',
              fontSize: '10px',
              fontWeight: 400,
            }}
          >
            Today
          </b>
          <span>{dateStr}</span>
        </div>

        {/* H1 */}
        <h1
          style={{
            fontSize: 'clamp(3.5rem, 6vw, 7.6rem)',
            lineHeight: 0.94,
            letterSpacing: '-0.079em',
            maxWidth: '830px',
            margin: '0 0 27px',
            fontFamily: 'Manrope, Arial, sans-serif',
            fontWeight: 700,
          }}
        >
          Your&nbsp; trusted{' '}
          <em style={{ fontStyle: 'normal', color: 'var(--blue)' }}>signal</em>{' '}
          for AI, technology, and startups.
        </h1>

        {/* Lede */}
        <p
          style={{
            fontSize: '17px',
            lineHeight: 1.7,
            maxWidth: '595px',
            margin: 0,
            color: '#3c3c3c',
          }}
        >
          FounderFocus is a live field manual for people building the next software economy.
          The important releases, ideas, tools and lessons—without the ambient noise.
        </p>

        {/* Quote */}
        <blockquote
          style={{
            marginTop: '50px',
            display: 'flex',
            gap: '15px',
            borderLeft: '2px solid var(--ink)',
            paddingLeft: '16px',
            font: "13px/1.65 'DM Mono', monospace",
            maxWidth: '570px',
            margin: '50px 0 0',
          }}
        >
          &quot;The future belongs to founders who can learn at the speed of the systems they build.&quot;{' '}
          <span style={{ color: 'var(--muted)' }}>— FOUNDERS&apos; NOTE</span>
        </blockquote>
      </div>

      {/* Right: Status Panel */}
      <StatusPanel />
    </section>
  )
}
