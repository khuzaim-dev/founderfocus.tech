import Link from 'next/link'
import { Shell } from '@/components/layout/Shell'
import type { WPCategory } from '@/types/wordpress'

interface FooterProps {
  categories: WPCategory[]
}

export function Footer({ categories }: FooterProps) {
  const currentYear = new Date().getFullYear()

  const footerCategories = categories.slice(0, 6)

  return (
    <Shell as="footer" style={{ borderTop: '1px solid var(--ink)', width: '100%', maxWidth: '1300px', margin: '0 auto', padding: '45px 0 23px' }}>
      {/* Giant brand wordmark */}

      <div className="ff-footer-brand" style={{ width: '100%', textAlign: 'left' }} aria-label="FounderFocus">
        Founder<i style={{ fontStyle: 'normal', color: 'var(--blue)' }}>Focus</i>
      </div>

      {/* Footer row */}
      <div
        style={{
          marginTop: '55px',
          display: 'flex',
          justifyContent: 'space-between',
          gap: '20px',
          borderTop: '1px solid var(--line)',
          paddingTop: '15px',
          font: "10px 'DM Mono', monospace",
          flexWrap: 'wrap',
        }}
      >
        <span>© {currentYear} FOUNDERFOCUS.TECH</span>

        <div style={{ display: 'flex', gap: '17px', flexWrap: 'wrap' }}>
          {footerCategories.map((cat) => (
            <Link key={cat.id} href={`/category/${cat.slug}`}>
              {cat.name.toUpperCase()}
            </Link>
          ))}
          <Link href="/rss.xml">RSS</Link>
          <Link href="/privacy">PRIVACY</Link>
        </div>

        <span>Built with ❤️ for the open web.</span>
      </div>


    </Shell>
  )
}
