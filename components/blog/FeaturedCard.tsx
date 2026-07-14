/**
 * FeaturedCard — static editorial block
 * Matches HTML .featured: dark bg, acid tag, large ghost "AI" text in ::after
 * Spans 2 columns in the article grid
 */
export function FeaturedCard() {
  return (
    <article
      style={{
        gridColumn: 'span 2',
        background: 'var(--ink)',
        color: 'white',
        position: 'relative',
        minHeight: '390px',
        padding: '30px',
        overflow: 'hidden',
        border: '1px solid var(--ink)',
        borderRadius: '14px',
        transition: 'background .2s',
        cursor: 'default',
      }}
    >
      {/* Ghost background text */}
      <span
        aria-hidden="true"
        style={{
          position: 'absolute',
          right: '-16px',
          bottom: '-52px',
          font: 'bold 190px Manrope',
          color: '#252525',
          letterSpacing: '-25px',
          lineHeight: 1,
          userSelect: 'none',
          pointerEvents: 'none',
        }}
      >
        AI
      </span>

      {/* Content (z-index above ghost text) */}
      <div style={{ position: 'relative', zIndex: 1 }}>
        <div
          style={{
            font: "10px 'DM Mono', monospace",
            color: '#aaa',
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <span style={{ color: 'var(--acid)' }}>EDITORIAL / THE NEW STACK</span>
          <span>14 MIN</span>
        </div>

        <h3
          style={{
            fontSize: 'clamp(25px, 3vw, 42px)',
            maxWidth: '600px',
            margin: '32px 0 15px',
            letterSpacing: '-1.8px',
            lineHeight: 1.1,
            fontFamily: 'Manrope, Arial, sans-serif',
            fontWeight: 800,
          }}
        >
          AI-native companies have a radically different operating cadence.
        </h3>

        <p
          style={{
            fontFamily: '"Geist Mono", monospace',
            fontSize: '13px',
            lineHeight: 1.6,
            color: '#aaa',
            margin: 0,
            maxWidth: '500px',
          }}
        >
          Inside the feedback loops, small teams and decision systems that compound faster than headcount.
        </p>

        <div
          style={{
            font: "10px 'DM Mono', monospace",
            marginTop: '28px',
            color: '#aaa',
          }}
        >
          FOUNDERFOCUS EDITORIAL · TODAY
        </div>
      </div>
    </article>
  )
}
