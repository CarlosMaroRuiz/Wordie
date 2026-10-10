export function SkeletonPage() {
  return (
    <div
      role="status"
      aria-live="polite"
      aria-busy="true"
      aria-label="Cargando contenido"
      className="mx-auto flex w-full max-w-3xl flex-col gap-4 px-4 py-10"
    >
      <div className="h-4 w-32 animate-pulse rounded-full bg-primary-light" />
      <div className="h-9 w-2/3 animate-pulse rounded-2xl bg-border-subtle" />
      <div className="h-4 w-full animate-pulse rounded-full bg-border-subtle" />
      <div className="mt-4 h-40 w-full animate-pulse rounded-[22px] bg-border-subtle motion-reduce:animate-none" />
      <span className="sr-only">Cargando…</span>
    </div>
  )
}
