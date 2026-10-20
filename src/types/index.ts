export interface CvDownload {
  lang: 'ES' | 'EN'
  label: string
  href: string
  available: boolean
}

export interface ProfessionalLinks {
  linkedin: string
  github: string
}

export interface ExperienceEntry {
  id: string
  role: string
  company: string
  period: string
  ongoing: boolean
  points: string[]
  focus: string[]
}

export interface SkillItem {
  id: string
  name: string
}

export interface SkillCategory {
  id: string
  title: string
  blurb: string
  items: SkillItem[]
}

export interface EducationEntry {
  id: string
  title: string
  institution: string
  period: string
}

export interface NavItem {
  id: string
  label: string
}
