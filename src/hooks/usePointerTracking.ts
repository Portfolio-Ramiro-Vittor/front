import { useEffect } from 'react'
import { scrollState } from '@/lib/scrollState'

/**
 * Normalises the pointer position into -1..1 and mirrors it into the shared
 * scroll state. Kept outside React state so the canvas pipeline can read it
 * every frame without triggering re-renders.
 */
export function usePointerTracking(): void {
  useEffect(() => {
    if (scrollState.reduced) return

    const onMove = (event: PointerEvent) => {
      const x = (event.clientX / window.innerWidth) * 2 - 1
      const y = (event.clientY / window.innerHeight) * 2 - 1
      scrollState.pointerX = Math.max(-1, Math.min(1, x))
      scrollState.pointerY = Math.max(-1, Math.min(1, y))
    }

    window.addEventListener('pointermove', onMove, { passive: true })
    return () => window.removeEventListener('pointermove', onMove)
  }, [])
}
