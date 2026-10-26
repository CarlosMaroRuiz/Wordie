import type { GuideSectionCardProps } from './type'

export function GuideSectionCard({ section, icon }: GuideSectionCardProps) {
  return (
    <article className="rounded-2xl border border-border-subtle bg-surface-muted/50 p-4 transition hover:border-primary/30 sm:p-5">
      <div className="flex items-start gap-3">
        <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
          {icon}
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="text-base font-bold text-text-main">{section.title}</h3>
          <span className="text-xs font-medium text-primary">{section.subtitle}</span>
          <p className="mt-2 text-xs leading-relaxed text-text-secondary">{section.content}</p>

          {section.bullets && section.bullets.length > 0 ? (
            <ul className="mt-3 space-y-1.5 border-t border-border-subtle/60 pt-2 text-xs text-text-secondary">
              {section.bullets.map(bullet => (
                <li key={bullet} className="flex items-start gap-2">
                  <span className="mt-1 size-1.5 shrink-0 rounded-full bg-primary" />
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      </div>
    </article>
  )
}
