import type { ComponentPropsWithoutRef, ReactNode } from 'react'
import { cn } from '@/lib/utils'

export type ButtonVariant = 'primary' | 'outline' | 'quiet'

const base =
  'group relative inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-medium transition-[transform,background-color,color,border-color,box-shadow] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50'

const sizes = {
  md: 'px-6 py-3 text-sm',
  sm: 'px-4 py-2 text-[0.8rem]',
} as const

const variants: Record<ButtonVariant, string> = {
  primary:
    'bg-accent text-white hover:bg-accent-ink hover:-translate-y-0.5 shadow-[0_10px_30px_-12px_rgba(59,47,224,0.6)]',
  outline:
    'border border-line bg-transparent text-ink hover:border-accent hover:text-accent hover:-translate-y-0.5',
  quiet: 'px-2 text-muted hover:text-ink',
}

export function buttonStyles(
  variant: ButtonVariant = 'primary',
  size: keyof typeof sizes = 'md',
  className?: string,
): string {
  return cn(base, variant === 'quiet' ? '' : sizes[size], variants[variant], className)
}

interface CommonProps {
  variant?: ButtonVariant
  size?: keyof typeof sizes
  className?: string
  children: ReactNode
}

export function Button({
  variant,
  size,
  className,
  children,
  ...props
}: CommonProps & ComponentPropsWithoutRef<'button'>) {
  return (
    <button className={buttonStyles(variant, size, className)} {...props}>
      {children}
    </button>
  )
}

export function LinkButton({
  variant,
  size,
  className,
  children,
  ...props
}: CommonProps & ComponentPropsWithoutRef<'a'>) {
  return (
    <a className={buttonStyles(variant, size, className)} {...props}>
      {children}
    </a>
  )
}
