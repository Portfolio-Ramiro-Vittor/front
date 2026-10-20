import type { ExperienceEntry } from '@/types'

export const experience: ExperienceEntry[] = [
  {
    id: 'mi-contacto-web',
    role: 'Analista de Datos',
    company: 'Mi Contacto Web Inc.',
    period: 'Septiembre 2024 — Presente',
    ongoing: true,
    points: [
      'Diseño y mantengo automatizaciones end-to-end y pipelines ETL/ELT con Python, Apache Airflow y n8n para integrar fuentes y reducir tareas manuales.',
      'Implementé asistentes de IA generativa basados en RAG para consultar información financiera y dar soporte a necesidades de negocio.',
      'Desarrollo agentes de monitoreo y calidad de datos, y generación de informes.',
      'Analizo procesos e información financiera, fiscal y comercial de múltiples clientes, asegurando calidad, consistencia y trazabilidad.',
      'Soluciones de Business Intelligence para municipalidades: ingresos, egresos y ejecución financiera en tableros e indicadores con Power BI y Excel.',
    ],
    focus: ['Ingeniería de datos', 'Business Intelligence', 'Automatización', 'IA generativa'],
  },
  {
    id: 'tesis',
    role: 'Tesis — Analista de Sistemas',
    company: 'UTN FRC',
    period: 'Agosto 2026 — Presente',
    ongoing: true,
    points: [
      'Aplicación web para gestión y diseño de muebles a medida, orientada a carpinteros independientes y pequeños talleres.',
      'Gestiona proyectos, configuración parametrizada de muebles, cálculo de despieces y materiales, optimización de cortes y presupuestos.',
      'Incluye asistencia de diseño con modelado 2D y 3D, y comparación de precios de insumos.',
    ],
    focus: ['Desarrollo web', 'Modelado 2D/3D', 'Producto'],
  },
  {
    id: 'instructor',
    role: 'Instructor de Natación y Guardavidas',
    company: 'Campo Deportivo Inc.',
    period: 'Septiembre 2023 — Septiembre 2024',
    ongoing: false,
    points: [
      'Coordiné grupos de distintas edades y planifiqué actividades.',
      'Actué con responsabilidad y capacidad de respuesta ante situaciones cambiantes.',
    ],
    focus: ['Liderazgo', 'Trabajo con personas', 'Responsabilidad'],
  },
]
