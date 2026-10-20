import { useEffect, useRef } from 'react'
import { prefersReducedMotionNow } from '@/lib/utils'

/**
 * The page's ground: engineering graph paper with a soft accent glow that
 * tracks the pointer. Deliberately static and very low-contrast so text sitting
 * on top stays perfectly legible — the moving pipeline lives in the hero and in
 * the side rail, never behind a paragraph.
 */
export function PipelineBackground() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (prefersReducedMotionNow()) return
    if (window.matchMedia('(pointer: coarse)').matches) return

    let frame = 0
    let targetX = window.innerWidth / 2
    let targetY = window.innerHeight * 0.4
    let currentX = targetX
    let currentY = targetY

    const render = () => {
      currentX += (targetX - currentX) * 0.12
      currentY += (targetY - currentY) * 0.12
      el.style.setProperty('--mx', `${currentX.toFixed(1)}px`)
      el.style.setProperty('--my', `${currentY.toFixed(1)}px`)
      if (
        Math.abs(targetX - currentX) > 0.5 ||
        Math.abs(targetY - currentY) > 0.5
      ) {
        frame = requestAnimationFrame(render)
      } else {
        frame = 0
      }
    }

    const onMove = (event: PointerEvent) => {
      targetX = event.clientX
      targetY = event.clientY
      if (el.dataset.active !== 'true') el.dataset.active = 'true'
      if (!frame) frame = requestAnimationFrame(render)
    }

    window.addEventListener('pointermove', onMove, { passive: true })
    return () => {
      window.removeEventListener('pointermove', onMove)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [])

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
    >
      <div className="graph-paper absolute inset-0" />
      <div
        ref={ref}
        data-active="false"
        className="absolute inset-0 opacity-0 transition-opacity duration-700 data-[active=true]:opacity-100"
        style={{
          background:
            'radial-gradient(440px circle at var(--mx, 50%) var(--my, 40%), rgba(59,47,224,0.10), rgba(59,47,224,0) 62%)',
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(120% 92% at 50% 38%, rgba(234,238,238,0) 52%, rgba(234,238,238,0.8) 100%)',
        }}
      />
    </div>
  )
}
