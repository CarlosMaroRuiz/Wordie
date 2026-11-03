import { SpeakerHigh } from '@phosphor-icons/react'
import type { StoryKeywordDTO } from '../../dto'
import type { StoryParagraphsProps } from './type'

interface TextPart {
  text: string
  startIndex: number
  endIndex: number
  keywordMatch?: StoryKeywordDTO
}

function getParagraphParts(text: string, keywords: StoryKeywordDTO[]): TextPart[] {
  if (keywords.length === 0) {
    return [{ text, startIndex: 0, endIndex: text.length }]
  }

  const regex = new RegExp(`\\b(${keywords.map((k) => k.term).join('|')})\\b`, 'gi')
  const parts: TextPart[] = []
  let lastIndex = 0

  let match: RegExpExecArray | null
  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push({
        text: text.slice(lastIndex, match.index),
        startIndex: lastIndex,
        endIndex: match.index,
      })
    }

    const matchedKeyword = keywords.find(
      (k) => k.term.toLowerCase() === match![0].toLowerCase(),
    )

    parts.push({
      text: match[0],
      startIndex: match.index,
      endIndex: match.index + match[0].length,
      keywordMatch: matchedKeyword,
    })

    lastIndex = match.index + match[0].length
  }

  if (lastIndex < text.length) {
    parts.push({
      text: text.slice(lastIndex),
      startIndex: lastIndex,
      endIndex: text.length,
    })
  }

  return parts
}

export function StoryParagraphs({
  paragraphs,
  keywords,
  selectedKeyword,
  isNarrating,
  narratingParagraphIndex,
  narratingCharIndex,
  onSelectKeyword,
}: StoryParagraphsProps) {
  const renderNormalTextWithWordHighlight = (
    text: string,
    partStartIndex: number,
    isCurrentParagraph: boolean,
  ) => {
    // Si no está narrando este párrafo o no hay charIndex, renderizar texto plano
    if (!isCurrentParagraph || narratingCharIndex === null) {
      return text
    }

    // Dividir texto conservando delimitadores para resaltar la palabra exacta
    const wordsAndSpaces = text.split(/(\s+|[.,;!?]+)/)
    let currentPos = partStartIndex

    return wordsAndSpaces.map((chunk, idx) => {
      const chunkStart = currentPos
      const chunkEnd = chunkStart + chunk.length
      currentPos = chunkEnd

      const isCurrentWord =
        narratingCharIndex >= chunkStart && narratingCharIndex < chunkEnd && /\S/.test(chunk)

      if (isCurrentWord) {
        return (
          <span
            key={idx}
            className="rounded bg-primary/25 px-1 font-bold text-primary transition-all duration-150 shadow-xs"
          >
            {chunk}
          </span>
        )
      }

      return <span key={idx}>{chunk}</span>
    })
  }

  return (
    <div className="max-w-[65ch] text-base sm:text-lg">
      {paragraphs.map((pText, pIdx) => {
        const isCurrentParagraph = isNarrating && narratingParagraphIndex === pIdx
        const parts = getParagraphParts(pText, keywords)

        return (
          <div
            key={pIdx}
            className={`my-4 transition-all duration-300 rounded-2xl ${
              isCurrentParagraph
                ? 'bg-primary/8 border-l-4 border-primary p-4 -ml-4 shadow-xs'
                : isNarrating
                  ? 'opacity-55 p-1'
                  : 'p-1'
            }`}
          >
            <p className="text-text-main leading-relaxed">
              {isCurrentParagraph && (
                <span
                  title="Narrando este párrafo"
                  className="inline-flex items-center gap-1 mr-2 text-primary align-middle select-none animate-pulse"
                >
                  <SpeakerHigh size={18} weight="fill" />
                </span>
              )}

              {parts.map((part, partIdx) => {
                if (part.keywordMatch) {
                  const match = part.keywordMatch
                  const isSelected = selectedKeyword?.toLowerCase() === match.term.toLowerCase()
                  const isCurrentWord =
                    isCurrentParagraph &&
                    narratingCharIndex !== null &&
                    narratingCharIndex >= part.startIndex &&
                    narratingCharIndex < part.endIndex

                  return (
                    <button
                      key={partIdx}
                      type="button"
                      onClick={() => onSelectKeyword(match)}
                      title={`Ver significado de "${match.term}"`}
                      className={`inline-flex items-center px-1.5 py-0.5 mx-0.5 rounded-md font-bold text-sm transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-primary text-on-primary shadow-xs'
                          : isCurrentWord
                            ? 'bg-primary text-on-primary ring-2 ring-primary ring-offset-surface scale-105 shadow-sm'
                            : 'bg-primary/10 text-primary hover:bg-primary/20'
                      }`}
                    >
                      {part.text}
                    </button>
                  )
                }

                return (
                  <span key={partIdx}>
                    {renderNormalTextWithWordHighlight(
                      part.text,
                      part.startIndex,
                      isCurrentParagraph,
                    )}
                  </span>
                )
              })}
            </p>
          </div>
        )
      })}
    </div>
  )
}
