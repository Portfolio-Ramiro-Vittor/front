import { useEffect, useRef, useState } from 'react'
import { skillCategories } from '@/data/skills'
import { Section } from '@/components/ui/Section'
import { CoreText } from '@/components/ui/CoreText'
import { MaskReveal } from '@/components/ui/Reveal'
import { gsap, registerGsap, ScrollTrigger } from '@/lib/gsap'
import { useSmoothScroll } from '@/providers/SmoothScrollProvider'
import { cn, prefersReducedMotionNow } from '@/lib/utils'

export function Skills() {
  const scope = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<ScrollTrigger | null>(null)
  const categoryRefs = useRef<Array<HTMLDivElement | null>>([])
  const [active, setActive] = useState(0)
  const { scrollTo } = useSmoothScroll()

  useEffect(() => {
    const el = scope.current
    if (!el) return
    registerGsap()

    if (prefersReducedMotionNow()) return

    const updateActive = () => {
      const line = window.innerHeight * 0.45
      let index = 0
      categoryRefs.current.forEach((node, position) => {
        if (node && node.getBoundingClientRect().top <= line) index = position
      })
      setActive((previous) => (previous === index ? previous : index))
    }

    const ctx = gsap.context(() => {
      triggerRef.current = ScrollTrigger.create({
        trigger: el,
        start: 'top bottom',
        end: 'bottom top',
        onUpdate: updateActive,
        onRefresh: updateActive,
      })
    }, scope)

    updateActive()

    return () => {
      ctx.revert()
      triggerRef.current = null
    }
  }, [])

  const goToCategory = (index: number) => {
    const node = categoryRefs.current[index]
    if (!node) return
    const target =
      node.getBoundingClientRect().top + window.scrollY - window.innerHeight * 0.25
    if (!triggerRef.current) setActive(index)
    scrollTo(target)
  }

  return (
    <Section id="skills">
      <div ref={scope} className="w-full">
        <h2 className="font-display text-[clamp(1.9rem,5vw,3.4rem)] font-semibold leading-[1.02] tracking-[-0.02em]">
          <MaskReveal>
            <CoreText text="Habilidades y tecnologías" />
          </MaskReveal>
        </h2>
        <CoreText
          as="p"
          className="mt-5 max-w-lg text-base leading-relaxed text-muted"
          text="Herramientas que uso a diario, agrupadas por cómo se aplican. Sin porcentajes: el trabajo real está en la experiencia."
        />

        <div
          role="tablist"
          aria-label="Categorías de habilidades"
          className="-mx-1 mt-10 flex flex-wrap gap-2 px-1"
        >
          {skillCategories.map((category, index) => {
            const isActive = index === active
            return (
              <button
                key={category.id}
                role="tab"
                type="button"
                aria-selected={isActive}
                onClick={() => goToCategory(index)}
                className={cn(
                  'inline-flex items-center gap-2 rounded-md border px-3.5 py-2 text-[0.8rem] transition-colors duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]',
                  isActive
                    ? 'border-accent bg-accent-soft text-accent-ink'
                    : 'border-line text-muted hover:border-ink/40 hover:text-ink',
                )}
              >
                <span
                  aria-hidden="true"
                  className={cn(
                    'h-1.5 w-1.5 rounded-full border transition-colors duration-500',
                    isActive ? 'border-accent bg-accent' : 'border-line bg-transparent',
                  )}
                />
                {category.title}
              </button>
            )
          })}
        </div>

        <div className="mt-12 space-y-10">
          {skillCategories.map((category, index) => {
            const isActive = index === active
            return (
              <div
                key={category.id}
                ref={(node) => {
                  categoryRefs.current[index] = node
                }}
                className={cn(
                  'border-t border-line pt-6 transition-opacity duration-700',
                  isActive ? 'opacity-100' : 'opacity-45',
                )}
              >
                <div className="flex flex-wrap items-baseline justify-between gap-3">
                  <h3 className="font-display text-lg font-medium tracking-tight">
                    {category.title}
                  </h3>
                  <CoreText
                    as="p"
                    className="max-w-sm text-sm text-muted"
                    text={category.blurb}
                  />
                </div>
                <ul className="mt-5 flex flex-wrap gap-2">
                  {category.items.map((item) => (
                    <li key={item.id}>
                      <span
                        className={cn(
                          'inline-flex items-center gap-2 rounded-md border border-transparent px-2.5 py-1 text-[0.84rem] transition-colors duration-300',
                          isActive
                            ? 'bg-panel text-ink hover:border-accent hover:text-accent'
                            : 'text-muted',
                        )}
                      >
                        <span
                          aria-hidden="true"
                          className="h-1 w-1 rounded-full bg-current opacity-50"
                        />
                        {item.name}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )
          })}
        </div>
      </div>
    </Section>
  )
}
