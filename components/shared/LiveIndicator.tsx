export function LiveIndicator() {
  return (
    <span
      style={{
        font: "10px 'DM Mono', monospace",
        display: 'flex',
        alignItems: 'center',
        gap: '7px',
      }}
    >
      <span className="ff-dot" aria-hidden="true" />
      LIVE
    </span>
  )
}
