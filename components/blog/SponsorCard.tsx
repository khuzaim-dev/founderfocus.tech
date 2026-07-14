/**
 * SponsorCard — static acid-yellow partner block
 * Matches HTML .sponsor exactly
 */
export function SponsorCard() {
  return (
    <article
      style={{
        background: 'var(--acid)',
        padding: '21px',
        border: '1px solid var(--ink)',
        borderRadius: '14px',
        display: 'flex',
        flexDirection: 'column',
        minHeight: '283px',
      }}
    >
      <b
        style={{
          font: "10px 'DM Mono', monospace",
          fontWeight: 400,
        }}
      >
        PARTNER SIGNAL / 01
      </b>
      <h3
        style={{
          fontSize: '27px',
          lineHeight: 1.05,
          letterSpacing: '-1.5px',
          margin: '20px 0',
          fontFamily: 'Manrope, Arial, sans-serif',
          fontWeight: 800,
        }}
      >
        Build the product your users keep asking for.
      </h3>
      <p
        style={{
          fontFamily: '"Geist Mono", monospace',
          fontSize: '11px',
          lineHeight: 1.6,
          margin: '0 0 auto',
        }}
      >
        Linear is the purpose-built system for modern product development.
      </p>
      <a
        href="https://linear.app"
        target="_blank"
        rel="noreferrer noopener"
        style={{
          font: "11px 'DM Mono', monospace",
          marginTop: 'auto',
          textDecoration: 'underline',
          display: 'block',
          paddingTop: '16px',
        }}
      >
        EXPLORE LINEAR ↗
      </a>
    </article>
  )
}
