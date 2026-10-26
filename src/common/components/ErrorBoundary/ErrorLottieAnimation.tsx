import { useEffect, useRef } from 'react'
import lottie from 'lottie-web'
import errorAnimationData from '../../../assets/lottie/error.json'

export function ErrorLottieAnimation() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const anim = lottie.loadAnimation({
      container,
      renderer: 'svg',
      loop: true,
      autoplay: true,
      animationData: errorAnimationData,
    })

    anim.play()

    return () => {
      anim.destroy()
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className="mx-auto mb-2 flex h-44 sm:h-56 w-64 sm:w-80 max-w-full items-center justify-center overflow-hidden"
      aria-label="Animación ilustrativa de problema inesperado"
    />
  )
}
