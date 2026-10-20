import { useId, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { CheckCircle2, LoaderCircle, Send } from 'lucide-react'
import {
  contactSchema,
  sendContactMessage,
  type ContactValues,
} from '@/lib/contact'
import { cn } from '@/lib/utils'

type Status =
  | { kind: 'idle' }
  | { kind: 'success'; message: string }
  | { kind: 'error'; message: string }

export function ContactForm() {
  const uid = useId()
  const [status, setStatus] = useState<Status>({ kind: 'idle' })

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactValues>({
    resolver: zodResolver(contactSchema),
    mode: 'onBlur',
  })

  const onSubmit = handleSubmit(async (values) => {
    setStatus({ kind: 'idle' })
    try {
      await sendContactMessage(values)
      reset()
      setStatus({
        kind: 'success',
        message: 'Gracias, recibí tu mensaje. Te respondo a la brevedad.',
      })
    } catch (error) {
      setStatus({
        kind: 'error',
        message:
          error instanceof Error
            ? error.message
            : 'No pudimos enviar el mensaje.',
      })
    }
  })

  const fieldClass =
    'w-full rounded-md border bg-panel/70 px-4 py-3 text-[0.95rem] text-ink placeholder:text-muted/60 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-accent/40'

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label
            htmlFor={`${uid}-name`}
            className="mb-2 block text-sm font-medium text-ink"
          >
            Nombre
          </label>
          <input
            id={`${uid}-name`}
            type="text"
            autoComplete="name"
            placeholder="Cómo te llamás"
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? `${uid}-name-error` : undefined}
            className={cn(fieldClass, errors.name ? 'border-accent' : 'border-line')}
            {...register('name')}
          />
          {errors.name ? (
            <p id={`${uid}-name-error`} role="alert" className="mt-2 text-xs text-accent-ink">
              {errors.name.message}
            </p>
          ) : null}
        </div>

        <div>
          <label
            htmlFor={`${uid}-email`}
            className="mb-2 block text-sm font-medium text-ink"
          >
            Correo
          </label>
          <input
            id={`${uid}-email`}
            type="email"
            autoComplete="email"
            placeholder="tu@correo.com"
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? `${uid}-email-error` : undefined}
            className={cn(fieldClass, errors.email ? 'border-accent' : 'border-line')}
            {...register('email')}
          />
          {errors.email ? (
            <p id={`${uid}-email-error`} role="alert" className="mt-2 text-xs text-accent-ink">
              {errors.email.message}
            </p>
          ) : null}
        </div>
      </div>

      <div>
        <label
          htmlFor={`${uid}-message`}
          className="mb-2 block text-sm font-medium text-ink"
        >
          Mensaje
        </label>
        <textarea
          id={`${uid}-message`}
          rows={5}
          placeholder="Sobre qué te gustaría conversar"
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? `${uid}-message-error` : undefined}
          className={cn(
            fieldClass,
            'resize-none',
            errors.message ? 'border-accent' : 'border-line',
          )}
          {...register('message')}
        />
        {errors.message ? (
          <p
            id={`${uid}-message-error`}
            role="alert"
            className="mt-2 text-xs text-accent-ink"
          >
            {errors.message.message}
          </p>
        ) : null}
      </div>

      <div className="absolute -left-[9999px] top-auto h-px w-px overflow-hidden">
        <label htmlFor={`${uid}-company`}>Empresa</label>
        <input
          id={`${uid}-company`}
          type="text"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          {...register('company')}
        />
      </div>

      <div className="flex flex-wrap items-center gap-4 pt-1">
        <button
          type="submit"
          disabled={isSubmitting}
          className="group inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-medium text-white shadow-[0_10px_30px_-12px_rgba(59,47,224,0.6)] transition-[transform,background-color] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:bg-accent-ink hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting ? (
            <LoaderCircle className="h-4 w-4 animate-spin" aria-hidden="true" />
          ) : (
            <Send className="h-4 w-4" aria-hidden="true" />
          )}
          {isSubmitting ? 'Enviando…' : 'Enviar mensaje'}
        </button>

        <p className="text-xs text-muted">
          Respondo personalmente a cada mensaje.
        </p>
      </div>

      <div aria-live="polite" aria-atomic="true" className="min-h-6">
        {status.kind === 'success' ? (
          <p className="inline-flex items-center gap-2 text-sm text-accent-ink">
            <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
            {status.message}
          </p>
        ) : null}
        {status.kind === 'error' ? (
          <p className="text-sm text-accent-ink">{status.message}</p>
        ) : null}
      </div>
    </form>
  )
}
