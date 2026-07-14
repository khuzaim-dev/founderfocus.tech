'use client'
import { useState, useEffect, useCallback } from 'react'

interface BookmarkMeta {
  title: string
  slug: string
  category: string
  savedAt: string
}

interface BookmarksStore {
  [slug: string]: BookmarkMeta
}

const STORAGE_KEY = 'ff_bookmarks'

function loadBookmarks(): BookmarksStore {
  if (typeof window === 'undefined') return {}
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : {}
  } catch {
    return {}
  }
}

function saveBookmarks(store: BookmarksStore): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(store))
  } catch {
    // localStorage may be unavailable
  }
}

export function useBookmarks() {
  const [store, setStore] = useState<BookmarksStore>({})

  useEffect(() => {
    setStore(loadBookmarks())
  }, [])

  const save = useCallback((slug: string, meta: Omit<BookmarkMeta, 'savedAt'>) => {
    setStore((prev) => {
      const next = {
        ...prev,
        [slug]: { ...meta, savedAt: new Date().toISOString() },
      }
      saveBookmarks(next)
      return next
    })
  }, [])

  const remove = useCallback((slug: string) => {
    setStore((prev) => {
      const next = { ...prev }
      delete next[slug]
      saveBookmarks(next)
      return next
    })
  }, [])

  const isSaved = useCallback(
    (slug: string) => Boolean(store[slug]),
    [store]
  )

  const saved = Object.values(store).sort(
    (a, b) => new Date(b.savedAt).getTime() - new Date(a.savedAt).getTime()
  )

  return { saved, save, remove, isSaved }
}
