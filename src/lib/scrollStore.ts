type Listener = () => void

const listeners = new Set<Listener>()

export function subscribeScroll(listener: Listener): () => void {
  listeners.add(listener)
  return () => {
    listeners.delete(listener)
  }
}

export function notifyScroll(): void {
  listeners.forEach((listener) => listener())
}
