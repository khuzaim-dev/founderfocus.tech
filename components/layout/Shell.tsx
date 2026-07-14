import { cn } from '@/lib/utils'
import type { CSSProperties } from 'react'

interface ShellProps {
  children: React.ReactNode
  className?: string
  as?: keyof React.JSX.IntrinsicElements
  style?: CSSProperties
  id?: string
}

export function Shell({ children, className, as: Tag = 'div', style, id }: ShellProps) {
  return (
    <Tag className={cn('ff-shell', className)} style={style} id={id}>
      {children}
    </Tag>
  )
}
