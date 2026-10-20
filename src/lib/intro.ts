let done = false
const listeners = new Set<() => void>()

export function markIntroDone(): void {
  if (done) return
  done = true
  listeners.forEach((listener) => listener())
  listeners.clear()
}

export function onIntroDone(callback: () => void): () => void {
  if (done) {
    callback()
    return () => {}
  }
  listeners.add(callback)
  return () => {
    listeners.delete(callback)
  }
}
