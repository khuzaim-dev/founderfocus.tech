'use client'
import { useLiveTime } from '@/hooks/useLiveTime'
import { ScanAnimation } from '@/components/shared/ScanAnimation'

export function StatusPanel() {
  const liveTime = useLiveTime()

  return (
    <aside
      style={{
        alignSelf: 'end',
        border: '1px solid var(--ink)',
        background: '#181818',
        color: '#f4f4f4',
        padding: '22px',
        position: 'relative',
      }}
    >
      {/* Acid corner triangle */}
      <span
        aria-hidden="true"
        style={{
          position: 'absolute',
          right: '-1px',
          top: '-1px',
          width: 0,
          height: 0,
          borderTop: '15px solid var(--acid)',
          borderLeft: '15px solid transparent',
          display: 'block',
        }}
      />

      {/* Header row */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          font: "10px 'DM Mono', monospace",
          paddingBottom: '18px',
          borderBottom: '1px solid #454545',
        }}
      >
        <span>FOUNDERFOCUS / STATUS</span>
        <span style={{ color: 'var(--acid)' }}>● ALL SYSTEMS ONLINE</span>
      </div>

      {/* Metrics */}
      {[
        { label: 'Server Status', value: 'Online' },
        { label: 'Active Community', value: '1,408' },
        { label: 'BUILDERS READING', value: '2,902' },
        { label: 'Last Updated', value: liveTime },
      ].map(({ label, value }) => (
        <div
          key={label}
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            padding: '13px 0',
            borderBottom: '1px solid #373737',
            font: "11px 'DM Mono', monospace",
          }}
        >
          <span>{label}</span>
          <strong style={{ fontWeight: 400 }}>{value}</strong>
        </div>
      ))}

      {/* Updating scan animation */}
      <ScanAnimation />
    </aside>
  )
}
