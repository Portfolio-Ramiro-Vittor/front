import { useEffect, useRef } from 'react'
import { SCENES } from '@/lib/scenes'
import { useActiveScene } from '@/hooks/useActiveScene'
import { useSmoothScroll } from '@/providers/SmoothScrollProvider'
import { scrollState } from '@/lib/scrollState'
import { subscribeScroll } from '@/lib/scrollStore'
import { cn } from '@/lib/utils'

const NODE = 24

/**
 * The pipeline, continued into the margin: a vertical conduit with one node per
 * scene, a fill that follows the story and a spark packet that rides it. Kept
 * out of the text column, so it never competes with the copy.
 */
export function PipelineRail() {
  const active = useActiveScene()
  const { scrollTo } = useSmoothScroll()
  const listRef = useRef<HTMLUListElement>(null)
  const fillRef = useRef<HTMLSpanElement>(null)
  const packetRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const list = listRef.current
    if (!list) return

    let track = 0
    const measure = () => {
      track = Math.max(0, list.getBoundingClientRect().height - NODE)
    }
    measure()
    const observer = new ResizeObserver(measure)
    observer.observe(list)

    const apply = () => {
      const index = Math.max(
        0,
        SCENES.findIndex((scene) => scene.id === scrollState.scene),
      )
      const local = scrollState.reduced ? 0 : scrollState.sceneProgress
      const p = Math.min(
        1,
        Math.max(0, (index + local) / (SCENES.length - 1 || 1)),
      )
      if (packetRef.current) {
        packetRef.current.style.top = `${(NODE / 2 + p * track).toFixed(1)}px`
      }
      if (fillRef.current) {
        fillRef.current.style.height = `${(p * track).toFixed(1)}px`
      }
    }

    apply()
    const unsubscribe = subscribeScroll(apply)
    return () => {
      unsubscribe()
      observer.disconnect()
    }
  }, [])

  return (
    <nav
      aria-label="Secciones"
      className="pointer-events-none fixed right-5 top-1/2 z-40 hidden -translate-y-1/2 lg:block"
    >
      <ul ref={listRef} className="pointer-events-auto relative flex flex-col items-center gap-8">
        <span
          aria-hidden="true"
          className="absolute inset-y-3 left-1/2 w-px -translate-x-1/2 bg-line"
        />
        <span
          ref={fillRef}
          aria-hidden="true"
          className="absolute left-1/2 top-3 w-px -translate-x-1/2 bg-accent"
          style={{ height: 0 }}
        />
        <span
          ref={packetRef}
          aria-hidden="true"
          className="absolute left-1/2 z-20 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-spark shadow-[0_0_0_3px_rgba(255,157,46,0.25)]"
          style={{ top: NODE / 2 }}
        />

        {SCENES.map((scene) => {
          const isActive = scene.id === active
          return (
            <li key={scene.id}>
              <button
                type="button"
                onClick={() => scrollTo(`#${scene.id}`)}
                aria-current={isActive ? 'true' : undefined}
                aria-label={scene.label}
                className="group relative z-10 grid h-6 w-6 place-items-center"
              >
                <span
                  className={cn(
                    'h-2 w-2 rounded-full border transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]',
                    isActive
                      ? 'scale-125 border-accent bg-accent'
                      : 'border-line bg-paper group-hover:border-ink/50',
                  )}
                />
                <span className="pointer-events-none absolute right-full mr-3 whitespace-nowrap text-[0.72rem] text-muted opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100">
                  {scene.label}
                </span>
              </button>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
