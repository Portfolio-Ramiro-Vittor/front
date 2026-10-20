import { Mail, MapPin } from 'lucide-react'
import { profile, professionalLinks } from '@/data/profile'
import { Section } from '@/components/ui/Section'
import { CoreText } from '@/components/ui/CoreText'
import { MaskReveal } from '@/components/ui/Reveal'
import { ContactForm } from '@/components/contact/ContactForm'
import { GitHubIcon, LinkedInIcon } from '@/components/ui/BrandIcons'

export function Contact() {
  return (
    <Section id="contact" className="py-32 lg:py-44">
      <div className="w-full">
        <h2 className="font-display text-[clamp(2rem,5.5vw,3.8rem)] font-semibold leading-[1.02] tracking-[-0.025em]">
          <MaskReveal>
            <CoreText text="¿Construimos algo juntos?" />
          </MaskReveal>
        </h2>
        <CoreText
          as="p"
          className="mt-5 max-w-xl text-base leading-relaxed text-muted"
          text="Si hay una oportunidad, un proyecto o una idea para conversar, escribime. Puedo ayudar con datos, automatización, inteligencia artificial o desarrollo de software."
        />

        <div className="mt-14 grid gap-14 lg:grid-cols-[1.25fr_0.75fr] lg:gap-20">
          <div className="panel p-6 sm:p-9">
            <ContactForm />
          </div>

          <div className="space-y-8">
            <div>
              <h3 className="font-display text-sm font-medium text-muted">
                Directo
              </h3>
              <ul className="mt-5 space-y-3">
                <li>
                  <a
                    href={`mailto:${profile.email}`}
                    className="link-underline inline-flex items-center gap-2 text-ink"
                  >
                    <Mail className="h-4 w-4" aria-hidden="true" />
                    {profile.email}
                  </a>
                </li>
                <li className="inline-flex items-center gap-2 text-muted">
                  <MapPin className="h-4 w-4" aria-hidden="true" />
                  {profile.location}
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-display text-sm font-medium text-muted">
                Redes
              </h3>
              <ul className="mt-5 space-y-3">
                <li>
                  <a
                    href={professionalLinks.linkedin}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="link-underline inline-flex items-center gap-2 text-ink"
                  >
                    <LinkedInIcon className="h-4 w-4" />
                    LinkedIn
                  </a>
                </li>
                <li>
                  <a
                    href={professionalLinks.github}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="link-underline inline-flex items-center gap-2 text-ink"
                  >
                    <GitHubIcon className="h-4 w-4" />
                    GitHub
                  </a>
                </li>
              </ul>
            </div>

            <div className="panel p-6">
              <p className="inline-flex items-center gap-2 text-sm text-ink">
                <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                {profile.availability}
              </p>
              <p className="mt-2 text-sm text-muted">
                Disponible para oportunidades en datos, IA y desarrollo.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Section>
  )
}
