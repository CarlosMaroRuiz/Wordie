/** Semilla para barajar de forma reproducible entre renders. */
export function randomSeed(): number {
  return Math.floor(Math.random() * 2 ** 31)
}

/** PRNG determinista (mulberry32): la misma semilla da la misma secuencia. */
export function mulberry32(seed: number): () => number {
  let state = seed
  return () => {
    state = (state + 0x6d2b79f5) | 0
    let t = Math.imul(state ^ (state >>> 15), 1 | state)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

/** Fisher-Yates usando el generador recibido. */
export function shuffleWith<T>(items: T[], rand: () => number): T[] {
  const result = [...items]
  for (let i = result.length - 1; i > 0; i -= 1) {
    const j = Math.floor(rand() * (i + 1))
    const temp = result[i]!
    result[i] = result[j]!
    result[j] = temp
  }
  return result
}

/** Atajo no determinista para casos donde la estabilidad no importa. */
export function shuffle<T>(items: T[]): T[] {
  return shuffleWith(items, Math.random)
}
