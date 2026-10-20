import { prefersReducedMotionNow } from './utils'

export type SceneId = 'hero' | 'experience' | 'skills' | 'about' | 'contact'

export interface SceneState {
  /** Global story progress, 0 at the first pixel of the hero, 1 at the end. */
  progress: number
  /** Currently dominant scene. */
  scene: SceneId
  /** Progress inside the active scene, 0..1. */
  sceneProgress: number
  /** Normalised pointer position, each axis in -1..1. */
  pointerX: number
  pointerY: number
  /** True while ScrollTrigger marks the story as in view. */
  visible: boolean
  /** Respect the user's motion preference. */
  reduced: boolean
  /** True once Lenis + ScrollTrigger are wired up. */
  smoothReady: boolean
}

export const scrollState: SceneState = {
  progress: 0,
  scene: 'hero',
  sceneProgress: 0,
  pointerX: 0,
  pointerY: 0,
  visible: true,
  reduced: prefersReducedMotionNow(),
  smoothReady: false,
}
