import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  type ReactNode,
} from 'react'
import Lenis from 'lenis'
import { gsap, registerGsap, ScrollTrigger } from '@/lib/gsap'
import { scrollState } from '@/lib/scrollState'
import { notifyScroll } from '@/lib/scrollStore'
import { sceneFromProgress } from '@/lib/scenes'

type ScrollTarget = string | number | HTMLElement

interface SmoothScrollValue {
  scrollTo: (target: ScrollTarget) => void
}

const SmoothScrollContext = createContext<SmoothScrollValue>({
  scrollTo: () => {},
})

export function useSmoothScroll(): SmoothScrollValue {
  return useContext(SmoothScrollContext)
}

export function SmoothScrollProvider({ children }: { children: ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null)

  useEffect(() => {
    registerGsap()

    const reduced = scrollState.reduced
    const story = document.getElementById('story')
    let lenis: Lenis | null = null
    let tickerFn: ((time: number) => void) | null = null

    if (!reduced) {
      lenis = new Lenis({
        lerp: 0.1,
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 1.6,
      })
      lenisRef.current = lenis
      lenis.on('scroll', () => ScrollTrigger.update())
      tickerFn = (time: number) => lenis?.raf(time * 1000)
      gsap.ticker.add(tickerFn)
      gsap.ticker.lagSmoothing(0)
    }

    const trigger = story
      ? ScrollTrigger.create({
          trigger: story,
          start: 'top top',
          end: 'bottom bottom',
          onUpdate: (self) => {
            scrollState.progress = self.progress
            const { id, local } = sceneFromProgress(self.progress)
            scrollState.scene = id
            scrollState.sceneProgress = local
            notifyScroll()
          },
          onToggle: (self) => {
            scrollState.visible = self.isActive
          },
        })
      : null

    scrollState.smoothReady = true

    const raf = requestAnimationFrame(() => ScrollTrigger.refresh())
    const onResize = () => ScrollTrigger.refresh()
    window.addEventListener('resize', onResize)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', onResize)
      if (tickerFn) gsap.ticker.remove(tickerFn)
      trigger?.kill()
      lenis?.destroy()
      lenisRef.current = null
      scrollState.smoothReady = false
      scrollState.progress = 0
    }
  }, [])

  const scrollTo = useCallback((target: ScrollTarget) => {
    const behavior: ScrollBehavior = scrollState.reduced ? 'auto' : 'smooth'

    if (lenisRef.current) {
      lenisRef.current.scrollTo(target, { duration: 1.2 })
      return
    }
    if (typeof target === 'number') {
      window.scrollTo({ top: target, behavior })
      return
    }
    const element =
      typeof target === 'string' ? document.querySelector(target) : target
    element?.scrollIntoView({ behavior, block: 'start' })
  }, [])

  return (
    <SmoothScrollContext.Provider value={{ scrollTo }}>
      {children}
    </SmoothScrollContext.Provider>
  )
}
