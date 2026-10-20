import { z } from 'zod'
import { env } from '@/lib/env'

export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, 'Contame cómo te llamás.')
    .max(80, 'Máximo 80 caracteres.'),
  email: z
    .string()
    .trim()
    .min(5, 'Necesito tu correo para responderte.')
    .max(160, 'Máximo 160 caracteres.')
    .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Revisá el formato del correo.'),
  message: z
    .string()
    .trim()
    .min(20, 'Contame un poco más (mínimo 20 caracteres).')
    .max(2000, 'Máximo 2000 caracteres.'),
  // Honeypot: must stay empty. Hidden from people, tempting for bots.
  company: z.string().max(0, '').optional(),
})

export type ContactValues = z.infer<typeof contactSchema>

export async function sendContactMessage(values: ContactValues): Promise<void> {
  const controller = new AbortController()
  const timeout = window.setTimeout(() => controller.abort(), 15000)

  try {
    const response = await fetch(`${env.apiBaseUrl}/api/contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(values),
      signal: controller.signal,
    })

    if (!response.ok) {
      const data = (await response.json().catch(() => null)) as
        | { error?: string }
        | null
      throw new Error(
        data?.error ??
          'No pudimos enviar el mensaje. Probá de nuevo en unos minutos.',
      )
    }
  } catch (error) {
    if (error instanceof DOMException && error.name === 'AbortError') {
      throw new Error('El envío tardó demasiado. Revisá tu conexión y reintentá.')
    }
    if (error instanceof Error) throw error
    throw new Error('No pudimos enviar el mensaje.')
  } finally {
    window.clearTimeout(timeout)
  }
}
