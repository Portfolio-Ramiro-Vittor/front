import { useEffect, useRef } from 'react'
import { Mail } from 'lucide-react'
import { navItems, profile } from '@/data/profile'
import { useActiveScene } from '@/hooks/useActiveScene'
import { useSmoothScroll } from '@/providers/SmoothScrollProvider'
import { cn } from '@/lib/utils'
import { LinkButton } from '@/components/ui/button'

export function Header() {
  const ref = useRef<HTMLElement>(null)
  const active = useActiveScene()
  const { scrollTo } = useSmoothScroll()

  useEffect(() => {
    const el = ref.current
    if (!el) return
    let frame = 0
    const update = () => {
      frame = 0
      el.dataset.scrolled = window.scrollY > 40 ? 'true' : 'false'
    }
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [])

  return (
    <header
      ref={ref}
      data-scrolled="false"
      className="group fixed inset-x-0 top-0 z-50 transition-colors duration-500 data-[scrolled=true]:bg-paper/75 data-[scrolled=true]:backdrop-blur-md"
    >
      <div className="shell flex h-16 items-center justify-between lg:h-20">
        <button
          type="button"
          onClick={() => scrollTo(0)}
          className="flex items-center gap-3"
          aria-label="Ir al inicio"
        >
          <span className="grid h-8 w-8 place-items-center rounded-md bg-ink">
            <span aria-hidden="true" className="flex items-center gap-1">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              <span className="h-px w-3 bg-accent/70" />
              <span className="h-1.5 w-1.5 rounded-full border border-spark" />
            </span>
          </span>
          <span className="font-display text-sm font-medium tracking-tight">
            {profile.name}
          </span>
        </button>

        <nav aria-label="Secciones" className="hidden items-center gap-1 lg:flex">
          {navItems.map((item) => {
            const isActive = item.id === active
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => scrollTo(`#${item.id}`)}
                aria-current={isActive ? 'true' : undefined}
                className={cn(
                  'relative px-4 py-2 text-sm transition-colors duration-500',
                  isActive ? 'text-ink' : 'text-muted hover:text-ink',
                )}
              >
                {item.label}
                <span
                  aria-hidden="true"
                  className={cn(
                    'absolute inset-x-4 bottom-1 h-px origin-left bg-accent transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]',
                    isActive ? 'scale-x-100' : 'scale-x-0',
                  )}
                />
              </button>
            )
          })}
        </nav>

        <div className="flex items-center gap-4">
          <span className="hidden items-center gap-2 text-[0.72rem] text-muted xl:flex">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            {profile.availability}
          </span>
          <LinkButton
            variant="outline"
            size="sm"
            href="#contact"
            onClick={(event) => {
              event.preventDefault()
              scrollTo('#contact')
            }}
          >
            <Mail className="h-4 w-4" aria-hidden="true" />
            Escribime
          </LinkButton>
        </div>
      </div>
      <div className="border-b border-line opacity-0 transition-opacity duration-500 group-data-[scrolled=true]:opacity-100" />
    </header>
  )
}
