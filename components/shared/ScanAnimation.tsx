'use client'

export function ScanAnimation() {
  return (
    <div
      style={{
        paddingTop: '18px',
        font: "10px 'DM Mono', monospace",
        color: '#aaa',
        display: 'flex',
        alignItems: 'center',
        gap: '0',
      }}
    >
      UPDATING CONTINUOUSLY{' '}
      <span
        style={{
          display: 'inline-flex',
          gap: '3px',
          marginLeft: '8px',
          alignItems: 'center',
        }}
        aria-hidden="true"
      >
        {Array.from({ length: 10 }).map((_, i) => (
          <span
            key={i}
            style={{
              display: 'inline-block',
              width: '4px',
              height: '7px',
              background: '#d7ff3f',
              animation: `scan-blink 1.2s ease-in-out infinite`,
              animationDelay: `${i * 0.1}s`,
            }}
          />
        ))}
      </span>
    </div>
  )
}
