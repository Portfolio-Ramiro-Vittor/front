import type { CvDownload, NavItem, ProfessionalLinks } from '@/types'

export const profile = {
  name: 'Ramiro Vittor',
  firstName: 'Ramiro',
  lastName: 'Vittor',
  role: 'Analista de Datos',
  tagline: 'Datos, inteligencia artificial y desarrollo de software',
  shortBio:
    'Analista de Datos. Estudiante avanzado de Ingeniería en Sistemas de Información.',
  availability: 'Abierto a nuevas oportunidades',
  location: 'Córdoba Capital, Argentina',
  email: 'ramirovittor@gmail.com',
  phone: '3513997192',
} as const

export const professionalLinks: ProfessionalLinks = {
  linkedin: 'https://www.linkedin.com/in/ramiro-vittor',
  github: 'https://github.com/ramiro-vtt',
}

/**
 * Only downloads flagged as available are rendered, so no broken link is ever
 * shown. Add the English PDF to `public/cv/` and flip `available` to true.
 */
export const cvDownloads: CvDownload[] = [
  {
    lang: 'ES',
    label: 'CV en español',
    href: '/cv/Ramiro_Vittor_CV_ES.pdf',
    available: true,
  },
  {
    lang: 'EN',
    label: 'CV en inglés',
    href: '/cv/Ramiro_Vittor_CV_EN.pdf',
    available: true,
  },
]

export const navItems: NavItem[] = [
  { id: 'hero', label: 'Inicio' },
  { id: 'experience', label: 'Experiencia' },
  { id: 'skills', label: 'Habilidades' },
  { id: 'about', label: 'Sobre mí' },
  { id: 'contact', label: 'Contacto' },
]
