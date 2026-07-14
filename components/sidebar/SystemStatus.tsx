const STATUS_ITEMS = [
  { label: 'Server Status / working', ok: true },
  { label: 'Signal index / nominal', ok: true },
  { label: 'RSS delivery / nominal', ok: true },
]

export function SystemStatus() {
  return (
    <section
      style={{
        padding: '0 0 28px',
        marginBottom: '28px',
        borderBottom: '1px solid var(--line)',
      }}
    >
      <h3
        style={{
          font: "11px 'DM Mono', monospace",
          textTransform: 'uppercase',
          margin: '0 0 18px',
          color: 'var(--ink)',
        }}
      >
        System Status
      </h3>
      <div style={{ font: "11px/1.5 'DM Mono', monospace" }}>
        {STATUS_ITEMS.map((item) => (
          <p
            key={item.label}
            style={{
              padding: '10px 0',
              margin: 0,
              borderTop: '1px solid var(--line)',
            }}
          >
            <span
              style={{
                color: 'var(--acid)',
                marginRight: '7px',
                animation: 'live-pulse 2s ease-in-out infinite',
              }}
              aria-hidden="true"
            >
              ●
            </span>
            {item.label}
          </p>
        ))}
      </div>
    </section>
  )
}
