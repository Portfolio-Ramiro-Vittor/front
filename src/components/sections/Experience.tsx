import { useEffect, useRef } from 'react'
import { experience } from '@/data/experience'
import { Section } from '@/components/ui/Section'
import { CoreText } from '@/components/ui/CoreText'
import { MaskReveal, Reveal } from '@/components/ui/Reveal'
import { gsap, registerGsap } from '@/lib/gsap'
import { prefersReducedMotionNow } from '@/lib/utils'

export function Experience() {
  const scope = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (prefersReducedMotionNow()) return
    registerGsap()
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.xp-progress',
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: '.xp-list',
            start: 'top 72%',
            end: 'bottom 72%',
            scrub: true,
          },
        },
      )
      gsap.utils.toArray<HTMLElement>('.xp-dot').forEach((dot) => {
        gsap.from(dot, {
          scale: 0,
          duration: 0.5,
          ease: 'back.out(2)',
          scrollTrigger: {
            trigger: dot,
            start: 'top 82%',
            toggleActions: 'play reverse play reverse',
          },
        })
      })
    }, scope)
    return () => ctx.revert()
  }, [])

  return (
    <Section id="experience">
      <div ref={scope} className="w-full">
        <h2 className="font-display text-[clamp(1.9rem,5vw,3.4rem)] font-semibold leading-[1.02] tracking-[-0.02em]">
          <MaskReveal>
            <CoreText text="Dónde trabajé" />
          </MaskReveal>
        </h2>
        <CoreText
          as="p"
          className="mt-5 max-w-lg text-base leading-relaxed text-muted"
          text="Experiencia en análisis de datos, automatización e inteligencia artificial aplicada, siempre cerca de procesos reales de negocio."
        />

        <ol className="xp-list relative mt-14 space-y-14 border-l border-line pl-8 sm:pl-12">
          <span
            aria-hidden="true"
            className="xp-progress absolute left-[-1px] top-0 h-full w-px origin-top bg-accent"
          />
          {experience.map((entry, index) => (
            <li key={entry.id} className="relative">
              <span
                aria-hidden="true"
                className="xp-dot absolute -left-[calc(2rem+5px)] top-2 h-2.5 w-2.5 rounded-full border border-accent bg-paper sm:-left-[calc(3rem+5px)]"
              />
              <Reveal>
                <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                  <span className="technical text-xs text-muted">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <span className="technical text-xs text-muted">{entry.period}</span>
                  {entry.ongoing ? (
                    <span className="inline-flex items-center gap-1.5 text-[0.7rem] text-accent">
                      <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                      Actual
                    </span>
                  ) : null}
                </div>

                <h3 className="mt-3 font-display text-2xl font-medium tracking-tight sm:text-[1.7rem]">
                  <CoreText text={entry.role} />
                </h3>
                <CoreText
                  as="p"
                  className="mt-1 text-sm text-muted"
                  text={entry.company}
                />

                <ul className="mt-5 space-y-3">
                  {entry.points.map((point) => (
                    <li key={point} className="flex gap-3 text-[0.95rem] leading-relaxed text-ink-soft">
                      <span
                        aria-hidden="true"
                        className="mt-2.5 h-px w-4 shrink-0 bg-line"
                      />
                      <CoreText text={point} />
                    </li>
                  ))}
                </ul>

                <ul className="mt-6 flex flex-wrap gap-2">
                  {entry.focus.map((tag) => (
                    <li
                      key={tag}
                      className="rounded-md border border-line px-2.5 py-1 text-[0.72rem] text-muted"
                    >
                      {tag}
                    </li>
                  ))}
                </ul>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </Section>
  )
}
