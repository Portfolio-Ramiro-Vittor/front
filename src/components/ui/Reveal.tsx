import { useEffect, useRef, type ReactNode } from 'react'
import { gsap, registerGsap } from '@/lib/gsap'
import { cn } from '@/lib/utils'

function motionAllowed(): boolean {
  return !window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

interface RevealProps {
  children: ReactNode
  className?: string
  delay?: number
  y?: number
}

/** Restrained entrance for blocks of content. No-op under reduced motion. */
export function Reveal({ children, className, delay = 0, y = 20 }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el || !motionAllowed()) return
    registerGsap()
    const ctx = gsap.context(() => {
      gsap.from(el, {
        y,
        autoAlpha: 0,
        duration: 0.9,
        delay,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 88%',
          toggleActions: 'play reverse play reverse',
        },
      })
    }, el)
    return () => ctx.revert()
  }, [delay, y])

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  )
}

interface MaskRevealProps {
  children: ReactNode
  className?: string
  innerClassName?: string
}

/** Editorial mask reveal, used only for large headings. */
export function MaskReveal({ children, className, innerClassName }: MaskRevealProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el || !motionAllowed()) return
    registerGsap()
    const ctx = gsap.context(() => {
      gsap.from(el, {
        yPercent: 110,
        duration: 1.1,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: el.parentElement,
          start: 'top 88%',
          toggleActions: 'play reverse play reverse',
        },
      })
    }, el)
    return () => ctx.revert()
  }, [])

  return (
    <div className={cn('overflow-hidden', className)}>
      <div ref={ref} className={innerClassName}>
        {children}
      </div>
    </div>
  )
}
