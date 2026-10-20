import { Mail } from 'lucide-react'
import { navItems, profile, professionalLinks } from '@/data/profile'
import { useSmoothScroll } from '@/providers/SmoothScrollProvider'
import { GitHubIcon, LinkedInIcon } from '@/components/ui/BrandIcons'

export function Footer() {
  const { scrollTo } = useSmoothScroll()
  const year = new Date().getFullYear()

  return (
    <footer className="relative z-10 border-t border-line bg-paper/60 backdrop-blur-[2px]">
      <div className="shell grid gap-12 py-16 md:grid-cols-3">
        <div className="space-y-3">
          <p className="font-display text-lg font-medium">{profile.name}</p>
          <p className="max-w-xs text-sm text-muted">{profile.shortBio}</p>
          <p className="text-sm text-muted">{profile.location}</p>
        </div>

        <nav aria-label="Pie de página" className="space-y-3">
          <p className="text-[0.72rem] text-muted">Recorrido</p>
          <ul className="space-y-2">
            {navItems.slice(1).map((item) => (
              <li key={item.id}>
                <button
                  type="button"
                  onClick={() => scrollTo(`#${item.id}`)}
                  className="link-underline text-sm text-ink/80 hover:text-ink"
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        <div className="space-y-3">
          <p className="text-[0.72rem] text-muted">Enlaces</p>
          <ul className="space-y-3">
            <li>
              <a
                className="link-underline inline-flex items-center gap-2 text-sm text-ink/80 hover:text-ink"
                href={professionalLinks.linkedin}
                target="_blank"
                rel="noreferrer noopener"
              >
                <LinkedInIcon className="h-4 w-4" />
                LinkedIn
              </a>
            </li>
            <li>
              <a
                className="link-underline inline-flex items-center gap-2 text-sm text-ink/80 hover:text-ink"
                href={professionalLinks.github}
                target="_blank"
                rel="noreferrer noopener"
              >
                <GitHubIcon className="h-4 w-4" />
                GitHub
              </a>
            </li>
            <li>
              <a
                className="link-underline inline-flex items-center gap-2 text-sm text-ink/80 hover:text-ink"
                href={`mailto:${profile.email}`}
              >
                <Mail className="h-4 w-4" aria-hidden="true" />
                {profile.email}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="shell flex flex-col gap-2 border-t border-line py-8 text-[0.72rem] text-muted sm:flex-row sm:items-center sm:justify-between">
        <p>
          © {year} {profile.name}. Todos los derechos reservados.
        </p>
        <p>Diseñado y construido con React, Canvas y GSAP.</p>
      </div>
    </footer>
  )
}
