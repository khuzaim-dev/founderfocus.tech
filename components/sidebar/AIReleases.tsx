// Static AI Releases list — owner: "don't do anything here still"
const AI_RELEASES = [
  { model: 'GPT-5.6', company: 'OPENAI' },
  { model: 'Claude Opus 4.8', company: 'ANTHROPIC' },
  { model: 'Gemini 3.5', company: 'GOOGLE' },
  { model: 'Grok 4.5', company: 'x-AI' },
]

export function AIReleases() {
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
        AI Releases
      </h3>
      <div style={{ font: "11px 'DM Mono', monospace" }}>
        {AI_RELEASES.map((item) => (
          <div
            key={item.model}
            style={{
              padding: '9px 0',
              borderTop: '1px solid var(--line)',
              display: 'flex',
              justifyContent: 'space-between',
              color: 'var(--ink)',
            }}
          >
            <span>{item.model}</span>
            <span style={{ color: 'var(--ink)' }}>{item.company}</span>
          </div>
        ))}
      </div>
    </section>
  )
}
