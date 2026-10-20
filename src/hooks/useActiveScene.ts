import { useSyncExternalStore } from 'react'
import { scrollState, type SceneId } from '@/lib/scrollState'
import { subscribeScroll } from '@/lib/scrollStore'
import { notifyScroll } from '@/lib/scrollStore'

export function useActiveScene(): SceneId {
  return useSyncExternalStore(
    subscribeScroll,
    () => scrollState.scene,
    () => 'hero' as SceneId,
  )
}

export { notifyScroll }
