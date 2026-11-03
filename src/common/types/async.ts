/**
 * Contrato único de los hooks que cargan datos remotos en la app.
 *
 * Todo hook de vista (`useGrammar`, `useStories`, `useVocabulary`…) debe exponer
 * exactamente estos tres campos, para que la vista pueda delegarlos en
 * `AsyncBoundary` sin adaptadores:
 *
 * ```ts
 * const { isLoading, error, refetch } = useStories()
 * return <AsyncBoundary isLoading={isLoading} error={error} onRetry={refetch}>…</AsyncBoundary>
 * ```
 */
export interface AsyncStatus {
  isLoading: boolean
  error: Error | null
  refetch: () => void
}

/** Resultado de `useFetch<T>`: el contrato anterior más el dato descargado. */
export interface AsyncResource<T> extends AsyncStatus {
  data: T | null
}

/**
 * Permite validar el contrato sobre un objeto que además devuelve campos propios
 * del hook, sin tener que repetir aquí los 20 campos de cada feature:
 *
 * ```ts
 * return { …campos } satisfies AsyncStatusShape
 * ```
 */
export type AsyncStatusShape = AsyncStatus & Record<string, unknown>
