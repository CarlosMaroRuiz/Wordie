import type { BannerProps } from './type'
import { FormulaSlider } from './FormulaSlider'

export function Banner({
  title,
  category,
  level,
  explanation,
  formula,
  formulas,
}: BannerProps) {
  // Normalizar las fórmulas para el slider deslizable
  const items =
    formulas && formulas.length > 0
      ? formulas
      : formula
        ? [{ label: 'Estructura', value: formula }]
        : []

  return (
    <>
      <div className="flex items-center justify-between">
        <span className="inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-primary dark:bg-primary/20">
          {category}
        </span>
        <span className="text-sm font-bold text-text-main">Nivel {level}</span>
      </div>

      <div className="mt-3">
        <h2 className="mb-3 text-3xl font-extrabold text-text-main">{title}</h2>
        <p className="text-base leading-relaxed text-text-main">{explanation}</p>
      </div>

      <div className="mt-6">
        <span className="mb-3 block text-xs font-bold uppercase tracking-widest text-text-secondary">
          Estructura Gramatical
        </span>

        {items.length > 0 ? (
          <FormulaSlider formulas={items} />
        ) : null}
      </div>
    </>
  )
}
