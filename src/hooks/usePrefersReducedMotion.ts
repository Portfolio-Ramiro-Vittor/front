import { useEffect } from 'react'
import { useMediaQuery } from './useMediaQuery'
import { scrollState } from '@/lib/scrollState'

/** Tracks the user's motion preference and mirrors it into the scroll state. */
export function usePrefersReducedMotion(): boolean {
  const reduced = useMediaQuery('(prefers-reduced-motion: reduce)')

  useEffect(() => {
    scrollState.reduced = reduced
  }, [reduced])

  return reduced
}
