import type { WPPost } from '@/types/wordpress'
import { PopularPosts } from './PopularPosts'
import { NewsletterWidget } from './NewsletterWidget'
import { AIReleases } from './AIReleases'
import { SystemStatus } from './SystemStatus'

interface SidebarProps {
  popularPosts: WPPost[]
}

export function Sidebar({ popularPosts }: SidebarProps) {
  return (
    <aside
      style={{
        borderLeft: '1px solid var(--line)',
        paddingLeft: '27px',
      }}
    >
      <PopularPosts posts={popularPosts} />
      <NewsletterWidget />
      <AIReleases />
      <SystemStatus />
    </aside>
  )
}
