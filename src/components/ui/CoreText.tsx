import type { ElementType } from 'react'

interface CoreTextProps {
  text: string
  as?: ElementType
  className?: string
}

/**
 * Plain typed text. It used to render per-glyph spans so copy could flip to
 * white over the old WebGL core; the pipeline aesthetic keeps the animation out
 * of the text column, so the markup is a single node.
 */
export function CoreText({ text, as: Tag = 'span', className }: CoreTextProps) {
  return <Tag className={className}>{text}</Tag>
}
