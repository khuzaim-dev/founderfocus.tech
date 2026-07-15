'use client'
import { useBookmarks } from '@/hooks/useBookmarks'

interface SaveButtonProps {
  slug: string
  title: string
  category: string
  imageUrl?: string | null
}

export function SaveButton({ slug, title, category, imageUrl }: SaveButtonProps) {
  const { save, remove, isSaved } = useBookmarks()
  const saved = isSaved(slug)

  return (
    <button
      onClick={() => {
        if (saved) {
          remove(slug)
        } else {
          save(slug, { slug, title, category, imageUrl })
        }
      }}
      aria-label={saved ? 'Remove bookmark' : 'Save article'}
      style={{
        background: 'transparent',
        border: `1px solid ${saved ? 'var(--blue)' : 'var(--line)'}`,
        color: saved ? 'var(--blue)' : '#696969',
        font: "9px 'DM Mono', monospace",
        padding: '4px 8px',
        cursor: 'pointer',
        transition: 'all 0.2s',
        borderRadius: '3px',
        letterSpacing: '0.04em',
      }}
    >
      {saved ? '✓ SAVED' : '+ SAVE'}
    </button>
  )
}
