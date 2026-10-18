import type { LeitnerBox, VocabCardDTO, VocabRawDTO } from '../dto'

/** Clave de localStorage donde Vive el progreso Leitner del vocabulario. */
export const VOCAB_PROGRESS_KEY = 'wordie_vocab_progress'

/** A partir de esta caja se considera que la palabra está dominada. */
export const MASTERED_BOX: LeitnerBox = 4

const BOXES: readonly LeitnerBox[] = [1, 2, 3, 4, 5]

export interface VocabProgressEntry {
  box: LeitnerBox
  nextReview: number
}

export type VocabProgressMap = Record<string, VocabProgressEntry>

export interface VocabProgressStats {
  total: number
  mastered: number
  reviewing: number
  fresh: number
  percent: number
  hasProgress: boolean
}

export interface VocabReviewItem {
  id: string
  word: string
  translation: string
  phonetic: string
  level: string
  domain: string
  box: LeitnerBox
}

/** Detecta texto corrupto tipo `despu?s`, `?ltimo` o `/b??/` sin confundirlo con `?` de pregunta. */
const BROKEN_TEXT = /\?\p{L}|\p{L}\?\p{L}|\?\?/u

export function hasBrokenText(value: string): boolean {
  return BROKEN_TEXT.test(value)
}

/** Devuelve la pista legible: IPA si es válida, nivel y dominio si está corrupta. */
export function getVocabHint(item: VocabReviewItem): string {
  return hasBrokenText(item.phonetic) ? `${item.level} / ${item.domain}` : item.phonetic
}

function isLeitnerBox(value: unknown): value is LeitnerBox {
  return typeof value === 'number' && BOXES.includes(value as LeitnerBox)
}

function isProgressEntry(value: unknown): value is VocabProgressEntry {
  if (typeof value !== 'object' || value === null) return false
  const entry = value as { box?: unknown; nextReview?: unknown }
  return isLeitnerBox(entry.box) && typeof entry.nextReview === 'number'
}

/**
 * Lee el progreso guardado y descarta entradas corruptas.
 * Nunca lanza: sin localStorage disponible devuelve un mapa vacío.
 */
export function readVocabProgress(): VocabProgressMap {
  try {
    const raw = localStorage.getItem(VOCAB_PROGRESS_KEY)
    if (!raw) return {}
    const parsed: unknown = JSON.parse(raw)
    if (typeof parsed !== 'object' || parsed === null) return {}

    return Object.entries(parsed as Record<string, unknown>).reduce<VocabProgressMap>(
      (map, [id, value]) => {
        if (isProgressEntry(value)) map[id] = value
        return map
      },
      {},
    )
  } catch {
    return {}
  }
}

/** Combina el catálogo crudo con el progreso persistido. */
export function toVocabCards(raw: VocabRawDTO[], progress: VocabProgressMap): VocabCardDTO[] {
  return raw.map(item => {
    const saved = progress[item.id]
    return saved
      ? { ...item, box: saved.box, nextReview: saved.nextReview }
      : { ...item, box: 1, nextReview: 0 }
  })
}

/** Cuenta dominadas, en repaso y sin empezar sin depender del reloj. */
export function computeVocabStats(
  raw: VocabRawDTO[],
  progress: VocabProgressMap,
): VocabProgressStats {
  let mastered = 0
  let reviewing = 0
  let fresh = 0

  for (const item of raw) {
    const box = progress[item.id]?.box ?? 1
    if (box >= MASTERED_BOX) mastered += 1
    else if (box > 1) reviewing += 1
    else fresh += 1
  }

  const total = raw.length

  return {
    total,
    mastered,
    reviewing,
    fresh,
    percent: total > 0 ? Math.round((mastered / total) * 100) : 0,
    hasProgress: Object.keys(progress).length > 0,
  }
}

/** Devuelve las palabras con la caja más baja, priorizando las que tienen IPA legible. */
export function pickReviewItems(
  raw: VocabRawDTO[],
  progress: VocabProgressMap,
  limit = 3,
): VocabReviewItem[] {
  return raw
    .map(item => ({
      id: item.id,
      word: item.word,
      translation: item.translation,
      phonetic: item.phonetic,
      level: item.level,
      domain: item.domain,
      box: progress[item.id]?.box ?? 1,
    }))
    .sort((a, b) => {
      const brokenA = hasBrokenText(a.phonetic) ? 1 : 0
      const brokenB = hasBrokenText(b.phonetic) ? 1 : 0
      return brokenA - brokenB || a.box - b.box || a.word.localeCompare(b.word)
    })
    .slice(0, limit)
}
