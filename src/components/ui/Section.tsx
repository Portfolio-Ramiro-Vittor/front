import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface SectionProps {
  id: string
  children: ReactNode
  className?: string
}

export function Section({ id, children, className }: SectionProps) {
  return (
    <section
      id={id}
      data-scene={id}
      className={cn(
        'relative flex min-h-screen w-full items-center py-28 sm:py-32 lg:py-40',
        className,
      )}
    >
      <div className="shell">
        <div className="w-full lg:max-w-3xl">{children}</div>
      </div>
    </section>
  )
}
