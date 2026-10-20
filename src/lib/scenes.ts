import type { SceneId } from './scrollState'

export interface SceneMeta {
  id: SceneId
  index: number
  /** Records the range of global progress [start, end] this scene occupies. */
  range: [number, number]
  label: string
}

/**
 * The five scenes are a genuine narrative sequence, so a numbered rail is
 * meaningful navigation rather than decoration.
 */
export const SCENES: SceneMeta[] = [
  { id: 'hero', index: 1, range: [0, 0.2], label: 'Presentación' },
  { id: 'experience', index: 2, range: [0.2, 0.42], label: 'Experiencia' },
  { id: 'skills', index: 3, range: [0.42, 0.64], label: 'Habilidades' },
  { id: 'about', index: 4, range: [0.64, 0.82], label: 'Sobre mí' },
  { id: 'contact', index: 5, range: [0.82, 1], label: 'Contacto' },
]

export function sceneFromProgress(progress: number): { id: SceneId; local: number } {
  let current = SCENES[0]
  for (const scene of SCENES) {
    if (progress >= scene.range[0]) current = scene
  }
  const [start, end] = current.range
  const local = Math.min(1, Math.max(0, (progress - start) / (end - start || 1)))
  return { id: current.id, local }
}
