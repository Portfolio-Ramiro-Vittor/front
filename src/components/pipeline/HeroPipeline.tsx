import { useEffect, useRef, useState } from 'react'
import { scrollState } from '@/lib/scrollState'
import { useDocumentVisible } from '@/hooks/useDocumentVisible'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'
import { cn } from '@/lib/utils'

export interface PipelineStage {
  label: string
  detail: string
}

/**
 * The story of the work, told as one conveyor: raw sources at the left, a
 * usable product at the right. These are real stages of the CV, not decoration.
 */
export const PIPELINE_STAGES: PipelineStage[] = [
  { label: 'Extraer', detail: 'Fuentes y APIs' },
  { label: 'Transformar', detail: 'ETL / ELT' },
  { label: 'Almacenar', detail: 'SQL y modelos' },
  { label: 'Analizar', detail: 'BI e indicadores' },
  { label: 'Automatizar', detail: 'IA y agentes' },
  { label: 'Entregar', detail: 'Software y tableros' },
]

const LEFT = 0.055
const RIGHT = 0.945
const PAPER = '#eaeeee'
const ACCENT = '#3b2fe0'
const SPARK = '#ff9d2e'

interface Packet {
  u: number
  speed: number
  size: number
}

interface Pulse {
  u: number
  age: number
}

const stageU = (index: number, total: number) => index / Math.max(1, total - 1)

export function HeroPipeline() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const hoverRef = useRef(-1)
  const [hovered, setHovered] = useState(-1)
  const reduced = usePrefersReducedMotion()
  const visible = useDocumentVisible()
  const visibleRef = useRef(visible)

  useEffect(() => {
    visibleRef.current = visible
  }, [visible])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let frame = 0
    let width = 0
    let height = 0
    let packets: Packet[] = []
    const pulses: Pulse[] = []

    const stageX = (u: number) => (LEFT + (RIGHT - LEFT) * u) * width

    const conduitY = (x: number, t: number) => {
      const base = height * 0.46 + scrollState.pointerY * 5
      const wave = Math.sin(x * 0.004 + t * 0.5) * Math.min(6, height * 0.05)
      return base + wave
    }

    const seedPackets = () => {
      const count = Math.max(4, Math.round(width / 260))
      packets = Array.from({ length: count }, (_, i) => ({
        u: i / count,
        speed: 0.1 + ((i * 37) % 11) / 90,
        size: 2.1 + ((i * 13) % 5) * 0.3,
      }))
    }

    const resize = () => {
      const dpr = Math.min(2, window.devicePixelRatio || 1)
      const rect = canvas.getBoundingClientRect()
      width = rect.width
      height = rect.height
      canvas.width = Math.max(1, Math.floor(width * dpr))
      canvas.height = Math.max(1, Math.floor(height * dpr))
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      seedPackets()
    }

    const tracePolyline = (offset: number, t: number) => {
      const step = Math.max(6, width / 160)
      ctx.beginPath()
      for (let x = 0; x <= width; x += step) {
        const y = conduitY(x, t) + offset
        if (x === 0) ctx.moveTo(x, y)
        else ctx.lineTo(x, y)
      }
      ctx.stroke()
    }

    const drawConduit = (t: number) => {
      ctx.lineWidth = 1
      ctx.strokeStyle = 'rgba(63, 82, 78, 0.26)'
      tracePolyline(0, t)
      ctx.strokeStyle = 'rgba(63, 82, 78, 0.08)'
      tracePolyline(-8, t)
      tracePolyline(8, t)
    }

    const drawNodes = (t: number) => {
      const total = PIPELINE_STAGES.length
      for (let i = 0; i < total; i++) {
        const x = stageX(stageU(i, total))
        const y = conduitY(x, t)
        const isHover = hoverRef.current === i
        const r = isHover ? 6.5 : 5

        ctx.beginPath()
        ctx.arc(x, y, r + 4.5, 0, Math.PI * 2)
        ctx.fillStyle = isHover
          ? 'rgba(59,47,224,0.16)'
          : 'rgba(59,47,224,0.09)'
        ctx.fill()

        ctx.beginPath()
        ctx.arc(x, y, r, 0, Math.PI * 2)
        ctx.fillStyle = PAPER
        ctx.fill()
        ctx.lineWidth = 1.6
        ctx.strokeStyle = ACCENT
        ctx.stroke()

        ctx.beginPath()
        ctx.arc(x, y, isHover ? 2.7 : 2, 0, Math.PI * 2)
        ctx.fillStyle = isHover ? SPARK : ACCENT
        ctx.fill()
      }
    }

    const drawPackets = (dt: number, t: number) => {
      const total = PIPELINE_STAGES.length
      ctx.lineCap = 'round'
      for (const packet of packets) {
        const prev = packet.u
        packet.u += packet.speed * dt
        if (packet.u > 1) packet.u -= 1

        for (let i = 0; i < total; i++) {
          const f = stageU(i, total)
          if (prev < f && packet.u >= f) pulses.push({ u: f, age: 0 })
        }

        const x = stageX(packet.u)
        const y = conduitY(x, t)
        const tail = 24 + packet.speed * 460
        const headX = Math.max(0, x - tail)
        const headY = conduitY(headX, t)
        const grad = ctx.createLinearGradient(headX, headY, x, y)
        grad.addColorStop(0, 'rgba(255,157,46,0)')
        grad.addColorStop(1, 'rgba(255,157,46,0.95)')

        ctx.strokeStyle = grad
        ctx.lineWidth = packet.size
        ctx.beginPath()
        ctx.moveTo(headX, headY)
        ctx.lineTo(x, y)
        ctx.stroke()

        ctx.beginPath()
        ctx.arc(x, y, packet.size * 0.85, 0, Math.PI * 2)
        ctx.fillStyle = SPARK
        ctx.fill()
      }
    }

    const drawPulses = (dt: number, t: number) => {
      const life = 0.7
      for (let i = pulses.length - 1; i >= 0; i--) {
        const pulse = pulses[i]
        pulse.age += dt
        if (pulse.age >= life) {
          pulses.splice(i, 1)
          continue
        }
        const x = stageX(pulse.u)
        const y = conduitY(x, t)
        const k = pulse.age / life
        ctx.beginPath()
        ctx.arc(x, y, 6 + k * 26, 0, Math.PI * 2)
        ctx.strokeStyle = `rgba(59,47,224,${(1 - k) * 0.45})`
        ctx.lineWidth = 1.4
        ctx.stroke()
      }
    }

    const paint = (dt: number, t: number) => {
      ctx.clearRect(0, 0, width, height)
      drawConduit(t)
      drawPackets(dt, t)
      drawPulses(dt, t)
      drawNodes(t)
    }

    resize()
    const observer = new ResizeObserver(resize)
    observer.observe(canvas)

    if (reduced) {
      packets = packets.map((packet, i) => ({ ...packet, u: (i + 0.5) / packets.length }))
      paint(0, 0)
    } else {
      let last = performance.now()
      const loop = (now: number) => {
        frame = requestAnimationFrame(loop)
        if (!visibleRef.current) {
          last = now
          return
        }
        const dt = Math.min(0.05, (now - last) / 1000)
        last = now
        paint(dt, now / 1000)
      }
      frame = requestAnimationFrame(loop)
    }

    return () => {
      if (frame) cancelAnimationFrame(frame)
      observer.disconnect()
    }
  }, [reduced])

  return (
    <div className="relative">
      <div className="mb-4 flex items-center gap-3">
        <span className="node-dot" aria-hidden="true" />
        <span className="text-[0.72rem] text-muted">
          Un mismo flujo, de la fuente a la entrega
        </span>
      </div>

      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="block h-[130px] w-full sm:h-[150px] lg:h-[160px]"
      />

      <ol className="pointer-events-none absolute inset-0 hidden sm:block">
        {PIPELINE_STAGES.map((stage, index) => {
          const left =
            (LEFT + (RIGHT - LEFT) * stageU(index, PIPELINE_STAGES.length)) * 100
          return (
            <li
              key={stage.label}
              className="pointer-events-auto absolute top-[60%] -translate-x-1/2 text-center"
              style={{ left: `${left}%` }}
              onPointerEnter={() => {
                hoverRef.current = index
                setHovered(index)
              }}
              onPointerLeave={() => {
                if (hoverRef.current === index) hoverRef.current = -1
                setHovered(-1)
              }}
            >
              <span
                className={cn(
                  'block text-[0.74rem] font-medium tracking-tight transition-colors duration-300',
                  hovered === index ? 'text-accent' : 'text-ink',
                )}
              >
                {stage.label}
              </span>
              <span className="mt-0.5 block whitespace-nowrap text-[0.62rem] text-muted">
                {stage.detail}
              </span>
            </li>
          )
        })}
      </ol>

      <ol className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-[0.72rem] text-muted sm:hidden">
        {PIPELINE_STAGES.map((stage) => (
          <li key={stage.label} className="inline-flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
            {stage.label}
          </li>
        ))}
      </ol>
    </div>
  )
}
