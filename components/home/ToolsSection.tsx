import { SectionHead } from '@/components/shared/SectionHead'

// Static tools section — owner requested "keep as is, don't do anything here yet"
const STATIC_TOOLS = [
  {
    id: 1,
    tag: 'OPEN SOURCE',
    title: 'Trigger.dev brings durable background jobs to TypeScript.',
    image: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=300&q=80',
    alt: 'Code editor',
  },
  {
    id: 2,
    tag: 'DEVELOPER TOOLS',
    title: 'Aider makes pair programming with your codebase feel local.',
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=300&q=80',
    alt: 'Developer workspace',
  },
]

export function ToolsSection() {
  return (
    <section className="section-block" id="tools" style={{ marginTop: '68px' }}>
      <SectionHead
        title="Developer Tools & Open Source"
        subtitle="NEW THINGS TO PUT TO WORK"
        right="UPDATED DAILY"
      />
      <div className="ff-compact-grid">
        {STATIC_TOOLS.map((tool, i) => (
          <article key={tool.id} className="ff-compact-card">
            <img
              src={tool.image}
              alt={tool.alt}
              style={{
                width: '74px',
                height: '74px',
                objectFit: 'cover',
                filter: 'grayscale(.45)',
                borderRadius: '8px',
                flexShrink: 0,
              }}
            />
            <span
              style={{
                font: "11px 'DM Mono', monospace",
                color: 'var(--blue)',
                flexShrink: 0,
              }}
            >
              ◎
            </span>
            <div>
              <span
                style={{
                  fontFamily: '"Geist Mono", monospace',
                  fontSize: '10px',
                  color: 'var(--blue)',
                }}
              >
                {tool.tag}
              </span>
              <h3
                style={{
                  fontFamily: '"Geist Mono", monospace',
                  fontSize: '15px',
                  fontWeight: 400,
                  lineHeight: 1.35,
                  margin: '5px 0 0',
                  letterSpacing: '-0.4px',
                  color: 'var(--ink)',
                }}
              >
                {tool.title}
              </h3>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
