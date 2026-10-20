import { useEffect, useRef } from 'react'
import { Download, MapPin } from 'lucide-react'
import { cvDownloads, profile, professionalLinks } from '@/data/profile'
import { CoreText } from '@/components/ui/CoreText'
import { LinkButton } from '@/components/ui/button'
import { Magnetic } from '@/components/ui/Magnetic'
import { HeroPipeline } from '@/components/pipeline/HeroPipeline'
import { GitHubIcon, LinkedInIcon } from '@/components/ui/BrandIcons'
import { gsap, registerGsap } from '@/lib/gsap'
import { onIntroDone } from '@/lib/intro'
import { prefersReducedMotionNow } from '@/lib/utils'

const availableCv = cvDownloads.filter((cv) => cv.available)

export function Hero() {
  const scope = useRef<HTMLElement>(null)

  useEffect(() => {
    if (prefersReducedMotionNow()) return
    registerGsap()
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ paused: true, defaults: { ease: 'power3.out' } })
      tl.from('.hero-line-inner', {
        yPercent: 118,
        duration: 1.05,
        stagger: 0.09,
      })
        .from(
          '.hero-meta',
          { y: 16, autoAlpha: 0, duration: 0.8, stagger: 0.08 },
          '-=0.55',
        )
        .from('.hero-actions', { y: 18, autoAlpha: 0, duration: 0.8 }, '-=0.5')
        .from('.hero-pipeline', { y: 26, autoAlpha: 0, duration: 1 }, '-=0.55')

      return onIntroDone(() => tl.play())
    }, scope)
    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={scope}
      id="hero"
      data-scene="hero"
      className="relative flex min-h-screen w-full flex-col justify-center pb-8 pt-24 sm:pt-28 lg:pb-10 lg:pt-28"
    >
      <div className="shell w-full">
        <div className="w-full lg:max-w-3xl">
          <p className="hero-meta flex items-center gap-3 text-sm text-muted">
            <span className="node-dot" aria-hidden="true" />
            {profile.role}
          </p>

          <h1 className="mt-5 font-display text-[clamp(2.4rem,7.6vw,6rem)] font-semibold leading-[0.94] tracking-[-0.035em]">
            <span className="block overflow-hidden">
              <CoreText
                as="span"
                className="hero-line-inner block"
                text={profile.firstName}
              />
            </span>
            <span className="block overflow-hidden">
              <CoreText
                as="span"
                className="hero-line-inner block"
                text={profile.lastName}
              />
            </span>
          </h1>

          <CoreText
            as="p"
            className="hero-meta mt-6 max-w-xl text-lg leading-relaxed text-ink-soft"
            text={`${profile.tagline}. Trabajo entendiendo el problema de negocio y construyendo la solución técnica que lo resuelve.`}
          />

          <div className="hero-actions mt-8 flex flex-wrap items-center gap-3">
            {availableCv.map((cv, index) => (
              <Magnetic key={cv.lang}>
                <LinkButton
                  href={cv.href}
                  download
                  variant={index === 0 ? 'primary' : 'outline'}
                  aria-label={`Descargar ${cv.label} en PDF`}
                >
                  <Download className="h-4 w-4" aria-hidden="true" />
                  {cv.label}
                </LinkButton>
              </Magnetic>
            ))}

            <LinkButton
              href={professionalLinks.linkedin}
              target="_blank"
              rel="noreferrer noopener"
              variant="outline"
            >
              <LinkedInIcon className="h-4 w-4" />
              LinkedIn
            </LinkButton>

            <LinkButton
              href={professionalLinks.github}
              target="_blank"
              rel="noreferrer noopener"
              variant="outline"
            >
              <GitHubIcon className="h-4 w-4" />
              GitHub
            </LinkButton>
          </div>

          <div className="hero-meta mt-6 flex flex-wrap items-center gap-x-8 gap-y-3 text-sm text-muted">
            <span className="inline-flex items-center gap-2">
              <MapPin className="h-4 w-4" aria-hidden="true" />
              {profile.location}
            </span>
            <span className="inline-flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              {profile.availability}
            </span>
          </div>
        </div>
      </div>

      <div className="hero-pipeline shell mt-8 w-full lg:mt-10">
        <HeroPipeline />
      </div>
    </section>
  )
}
