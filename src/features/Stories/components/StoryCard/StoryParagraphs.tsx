import type { StoryParagraphsProps } from './type'

export function StoryParagraphs({
  paragraphs,
  keywords,
  selectedKeyword,
  onSelectKeyword,
}: StoryParagraphsProps) {
  // Helper to highlight terms in paragraph text
  const renderParagraph = (text: string, pIdx: number) => {
    if (keywords.length === 0) {
      return <p key={pIdx} className="my-3 text-text-main leading-relaxed">{text}</p>
    }

    const regex = new RegExp(`\\b(${keywords.map((k) => k.term).join('|')})\\b`, 'gi')
    const parts = text.split(regex)

    return (
      <p key={pIdx} className="my-3 text-text-main leading-relaxed">
        {parts.map((part, idx) => {
          const match = keywords.find(
            (k) => k.term.toLowerCase() === part.toLowerCase(),
          )
          if (match) {
            const isSelected = selectedKeyword?.toLowerCase() === match.term.toLowerCase()
            return (
              <button
                key={idx}
                type="button"
                onClick={() => onSelectKeyword(match.term)}
                title={`Traducir: ${match.translation}`}
                className={`inline-flex items-center px-1.5 py-0.5 mx-0.5 rounded-md font-bold text-sm transition-colors cursor-pointer ${
                  isSelected
                    ? 'bg-primary text-white shadow-xs'
                    : 'bg-primary/10 text-primary hover:bg-primary/20 dark:bg-primary/20 dark:hover:bg-primary/30'
                }`}
              >
                {part}
              </button>
            )
          }
          return <span key={idx}>{part}</span>
        })}
      </p>
    )
  }

  return (
    <div className="max-w-[65ch] text-base sm:text-lg">
      {paragraphs.map((p, idx) => renderParagraph(p, idx))}
    </div>
  )
}
