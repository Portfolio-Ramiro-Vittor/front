import { useEffect, useRef, type ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface MagneticProps {
  children: ReactNode
  className?: string
  /** Maximum translation in pixels. */
  strength?: number
}

/**
 * Pulls its child slightly toward the pointer. Disabled automatically under
 * prefers-reduced-motion.
 */
export function Magnetic({ children, className, strength = 10 }: MagneticProps) {
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const element = ref.current
    if (!element) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    if (window.matchMedia('(pointer: coarse)').matches) return

    let frame = 0
    let targetX = 0
    let targetY = 0
    let currentX = 0
    let currentY = 0

    const render = () => {
      currentX += (targetX - currentX) * 0.18
      currentY += (targetY - currentY) * 0.18
      element.style.transform = `translate3d(${currentX.toFixed(2)}px, ${currentY.toFixed(2)}px, 0)`
      if (Math.abs(targetX - currentX) > 0.1 || Math.abs(targetY - currentY) > 0.1) {
        frame = requestAnimationFrame(render)
      } else {
        frame = 0
      }
    }

    const onMove = (event: PointerEvent) => {
      const rect = element.getBoundingClientRect()
      const relX = (event.clientX - (rect.left + rect.width / 2)) / (rect.width / 2)
      const relY = (event.clientY - (rect.top + rect.height / 2)) / (rect.height / 2)
      targetX = Math.max(-1, Math.min(1, relX)) * strength
      targetY = Math.max(-1, Math.min(1, relY)) * strength
      if (!frame) frame = requestAnimationFrame(render)
    }

    const onLeave = () => {
      targetX = 0
      targetY = 0
      if (!frame) frame = requestAnimationFrame(render)
    }

    element.addEventListener('pointermove', onMove)
    element.addEventListener('pointerleave', onLeave)
    return () => {
      element.removeEventListener('pointermove', onMove)
      element.removeEventListener('pointerleave', onLeave)
      if (frame) cancelAnimationFrame(frame)
      element.style.transform = ''
    }
  }, [strength])

  return (
    <span ref={ref} className={cn('inline-block will-change-transform', className)}>
      {children}
    </span>
  )
}
