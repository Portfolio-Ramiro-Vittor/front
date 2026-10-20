import { about, education } from '@/data/about'
import { profile } from '@/data/profile'
import { Section } from '@/components/ui/Section'
import { CoreText } from '@/components/ui/CoreText'
import { MaskReveal, Reveal } from '@/components/ui/Reveal'

export function About() {
  return (
    <Section id="about" className="py-32 lg:py-44">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      >
        <div className="absolute right-0 top-1/4 h-[42rem] w-[42rem] rounded-full bg-[radial-gradient(circle,rgba(59,47,224,0.10),transparent_62%)]" />
      </div>

      <div className="w-full">
        <h2 className="font-display text-[clamp(1.9rem,5vw,3.4rem)] font-semibold leading-[1.02] tracking-[-0.02em]">
          <MaskReveal>
            <CoreText text="Sobre mí" />
          </MaskReveal>
        </h2>

        <Reveal className="mt-8">
          <CoreText
            as="p"
            className="max-w-2xl font-display text-[clamp(1.3rem,2.6vw,2rem)] font-medium leading-[1.25] tracking-[-0.01em] text-ink"
            text={about.pullQuote}
          />
        </Reveal>

        <div className="mt-12 space-y-6">
          {about.paragraphs.map((paragraph) => (
            <Reveal key={paragraph}>
              <CoreText
                as="p"
                className="max-w-2xl text-base leading-relaxed text-ink-soft"
                text={paragraph}
              />
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-16">
          <div className="panel p-8">
            <h3 className="font-display text-sm font-medium text-muted">
              Formación
            </h3>
            <ul className="mt-6 divide-y divide-line">
              {education.map((entry) => (
                <li
                  key={entry.id}
                  className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 py-4 first:pt-0 last:pb-0"
                >
                  <div>
                    <p className="font-medium text-ink">{entry.title}</p>
                    <p className="text-sm text-muted">{entry.institution}</p>
                  </div>
                  {entry.period ? (
                    <span className="technical text-xs text-muted">
                      {entry.period}
                    </span>
                  ) : null}
                </li>
              ))}
            </ul>
            <p className="mt-6 flex items-center gap-2 text-sm text-muted">
              <span>{profile.firstName}</span>
              <span className="h-1 w-1 rounded-full bg-line" aria-hidden="true" />
              <span>{profile.location}</span>
            </p>
          </div>
        </Reveal>
      </div>
    </Section>
  )
}
