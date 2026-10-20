import { useEffect, useRef, useState } from 'react'
import { gsap, registerGsap } from '@/lib/gsap'
import { markIntroDone } from '@/lib/intro'
import { profile } from '@/data/profile'

const NAME = profile.name.toUpperCase()

/**
 * A single orchestrated intro: the name rises through a mask while a hairline
 * fills, then the overlay lifts away. Collapses to a quick fade under reduced
 * motion and always yields to a timeout so it can never trap the visitor.
 */
export function Preloader() {
  const [done, setDone] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const nameRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const timeout = window.setTimeout(() => setDone(true), 2600)

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      window.clearTimeout(timeout)
      window.setTimeout(() => setDone(true), 200)
      return () => window.clearTimeout(timeout)
    }

    registerGsap()
    const ctx = gsap.context(() => {
      const letters = nameRef.current?.querySelectorAll('span')
      const tl = gsap.timeline({ onComplete: () => setDone(true) })
      if (letters?.length) {
        tl.fromTo(
          letters,
          { yPercent: 120 },
          { yPercent: 0, duration: 0.9, ease: 'power4.out', stagger: 0.035 },
        )
      }
      tl.fromTo(
        '.pl-fill',
        { scaleX: 0 },
        { scaleX: 1, duration: 1, ease: 'power2.inOut' },
        0.15,
      )
        .to('.pl-inner', { opacity: 0, duration: 0.35, ease: 'power2.out' }, '+=0.1')
        .to(el, { autoAlpha: 0, duration: 0.55, ease: 'power2.inOut' }, '-=0.1')
    }, el)

    return () => {
      window.clearTimeout(timeout)
      ctx.revert()
    }
  }, [])

  useEffect(() => {
    if (done) markIntroDone()
  }, [done])

  if (done) return null

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="fixed inset-0 z-[70] flex items-center justify-center bg-paper"
    >
      <div className="pl-inner w-[min(92vw,40rem)]">
        <div
          ref={nameRef}
          className="flex justify-center overflow-hidden font-display text-2xl font-medium tracking-tight sm:text-4xl"
        >
          {NAME.split('').map((char, index) => (
            <span key={`${char}-${index}`} className="inline-block">
              {char === ' ' ? '\u00A0' : char}
            </span>
          ))}
        </div>
        <div className="mt-6 h-px w-full bg-line">
          <div className="pl-fill h-full origin-left bg-accent" />
        </div>
        <div className="mt-4 flex items-center justify-center gap-2 text-[0.72rem] text-muted">
          <span>{profile.role}</span>
          <span className="h-1 w-1 rounded-full bg-spark" aria-hidden="true" />
          <span>{profile.location}</span>
        </div>
      </div>
    </div>
  )
}
