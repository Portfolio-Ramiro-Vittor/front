import type { SkillCategory } from '@/types'

/**
 * Every technology listed here is backed by the CV or by this project itself
 * (TypeScript). No proficiency scores are shown on purpose: levels are not
 * measurable from a curriculum.
 */
export const skillCategories: SkillCategory[] = [
  {
    id: 'data',
    title: 'Datos y Business Intelligence',
    blurb: 'Integrar, depurar y transformar información en indicadores confiables.',
    items: [
      { id: 'python-data', name: 'Python' },
      { id: 'sql', name: 'SQL' },
      { id: 'sql-server', name: 'SQL Server' },
      { id: 't-sql', name: 'T-SQL' },
      { id: 'databricks', name: 'Databricks' },
      { id: 'pandas', name: 'Pandas' },
      { id: 'numpy', name: 'NumPy' },
      { id: 'spark', name: 'Spark' },
      { id: 'etl-elt', name: 'ETL / ELT' },
      { id: 'power-bi', name: 'Power BI' },
      { id: 'excel', name: 'Excel' },
    ],
  },
  {
    id: 'ai',
    title: 'IA y automatización',
    blurb: 'Automatizar procesos y construir asistentes sobre información propia.',
    items: [
      { id: 'n8n', name: 'n8n' },
      { id: 'airflow', name: 'Apache Airflow' },
      { id: 'llms', name: 'LLMs' },
      { id: 'rag', name: 'RAG' },
      { id: 'langchain', name: 'LangChain' },
      { id: 'langgraph', name: 'LangGraph' },
      { id: 'agents', name: 'Agentes' },
      { id: 'prompting', name: 'Prompting' },
    ],
  },
  {
    id: 'software',
    title: 'Desarrollo de software',
    blurb: 'Construir servicios e integraciones detrás de los datos.',
    items: [
      { id: 'typescript', name: 'TypeScript' },
      { id: 'javascript', name: 'JavaScript' },
      { id: 'node', name: 'Node.js' },
      { id: 'react', name: 'React.js' },
      { id: 'fastapi', name: 'FastAPI' },
      { id: 'rest', name: 'APIs REST' },
      { id: 'java', name: 'Java' },
      { id: 'spring', name: 'Spring Boot' },
      { id: 'express', name: 'Express' },
    ],
  },
  {
    id: 'tooling',
    title: 'Herramientas y prácticas',
    blurb: 'Trabajar con criterio de producto, calidad y trazabilidad.',
    items: [
      { id: 'git', name: 'Git' },
      { id: 'linux', name: 'Linux' },
      { id: 'cicd', name: 'CI/CD' },
      { id: 'requirements', name: 'Análisis de requerimientos' },
      { id: 'quality', name: 'Calidad de datos' },
      { id: 'product', name: 'Mentalidad de producto' },
    ],
  },
]
