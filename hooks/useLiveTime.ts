'use client'
import { useState, useEffect } from 'react'
import { formatLiveTime } from '@/utils/formatDate'

export function useLiveTime(): string {
  const [time, setTime] = useState<string>(() => formatLiveTime(new Date()))

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(formatLiveTime(new Date()))
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  return time
}
