import type { EducationEntry } from '@/types'

export const about = {
  heading: 'Sobre mí',
  intro:
    'Vengo de la Ingeniería en Sistemas y terminé trabajando donde los datos, la automatización y la inteligencia artificial se cruzan. Me interesa entender el problema antes de escribir la primera línea.',
  paragraphs: [
    'Analizo procesos e información de negocio para encontrar dónde se pierde tiempo, se duplican tareas o se pierde confianza en los números. A partir de ahí construyo pipelines, automatizaciones y tableros que dejan de depender de trabajo manual.',
    'En los últimos años sumé herramientas de IA generativa a la caja: asistentes con RAG que consultan información real de la organización, agentes de monitoreo y controles de calidad de datos.',
    'Antes de dedicarme a esto coordiné grupos como instructor de natación y guardavidas. De ahí me traigo algo que uso todos los días: responsabilidad, calma bajo presión y la costumbre de trabajar con personas.',
  ],
  pullQuote:
    'Mi trabajo empieza entendiendo el problema de negocio y termina en una solución técnica que alguien pueda usar.',
} as const

export const education: EducationEntry[] = [
  {
    id: 'utn',
    title: 'Ingeniería en Sistemas de Información',
    institution: 'Universidad Tecnológica Nacional — FRC',
    period: '2021 — Presente, 4.º año',
  },
  {
    id: 'fcc',
    title: 'Data Analysis with Python',
    institution: 'freeCodeCamp',
    period: 'Certificación',
    technologies: ['NumPy', 'Pandas', 'Matplotlib', 'Seaborn'],
  },
  {
    id: 'udemy-ml',
    title: 'Machine Learning con Python',
    institution: 'Udemy',
    period: 'Certificación',
    technologies: ['Scikit-learn', 'Keras', 'TensorFlow', 'PyTorch'],
  },
  {
    id: 'stats',
    title: 'Formación en Probabilidad y Estadística',
    institution: 'Formación complementaria',
    period: '',
  },
]
