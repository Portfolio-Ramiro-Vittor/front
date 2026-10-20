import { useEffect, useRef } from 'react'
import { scrollState } from '@/lib/scrollState'
import { subscribeScroll } from '@/lib/scrollStore'

/** Thin top progress bar driven imperatively so it never re-renders React. */
export function ProgressBar() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const element = ref.current
    if (!element) return
    const apply = () => {
      element.style.transform = `scaleX(${scrollState.progress.toFixed(4)})`
    }
    apply()
    return subscribeScroll(apply)
  }, [])

  return (
    <div
      className="pointer-events-none fixed inset-x-0 top-0 z-50 h-[2px] bg-transparent"
      aria-hidden="true"
    >
      <div
        ref={ref}
        className="h-full origin-left bg-gradient-to-r from-accent to-spark"
        style={{ transform: 'scaleX(0)' }}
      />
    </div>
  )
}
