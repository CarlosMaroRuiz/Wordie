export type ClassValue = string | false | null | undefined

/**
 * Une clases descartando valores falsy. Existe una sola implementación en el
 * proyecto: cualquier componente de `@common` o de feature importa esta.
 */
export function cn(...classes: ClassValue[]): string {
  return classes.filter(Boolean).join(' ')
}
