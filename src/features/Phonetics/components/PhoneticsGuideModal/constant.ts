import type { GuideSection } from './type'

export const GUIDE_MODAL_BACKDROP =
  'fixed inset-0 z-50 bg-black/50 backdrop-blur-sm transition-opacity duration-200 data-closed:opacity-0'

export const GUIDE_MODAL_PANEL =
  'fixed inset-x-4 top-1/2 z-50 mx-auto max-h-[85vh] max-w-2xl -translate-y-1/2 overflow-y-auto rounded-[32px] border border-border-subtle bg-surface p-6 shadow-2xl transition duration-200 data-closed:scale-95 data-closed:opacity-0 focus:outline-none sm:p-8'

export const GUIDE_SECTIONS: GuideSection[] = [
  {
    id: 'what-is-ipa',
    title: '¿Qué es el Alfabeto Fonético Internacional (IPA)?',
    subtitle: 'El mapa universal de sonidos humanos',
    content:
      'El inglés no es un idioma fonético: las letras escritas no siempre coinciden con su sonido (por ejemplo, las combinaciones "ough" en though, through y thought suenan completamente distintas). El IPA resuelve esto asignando exactamente un símbolo único e inequívoco a cada sonido del habla humana.',
    bullets: [
      'Te permite saber cómo se pronuncia cualquier palabra nueva sin haberla escuchado antes.',
      'Es el estándar utilizado por los mejores diccionarios técnicos de software del mundo.',
    ],
    iconName: 'ipa',
  },
  {
    id: 'why-44-phonemes',
    title: '¿Por qué 44 fonemas si el abecedario solo tiene 26 letras?',
    subtitle: 'La anatomía acústica del inglés estándar',
    content:
      'Aunque el alfabeto en inglés solo cuenta con 26 letras grafemáticas, la lengua inglesa articula exactamente 44 sonidos distintivos (fonemas). Dominar esta proporción es la clave de la fluidez:',
    bullets: [
      '20 Sonidos Vocálicos: 7 vocales cortas, 5 vocales largas y 8 diptongos continuos.',
      '24 Sonidos Consonánticos: 9 sordas (sin vibración de cuerdas) y 15 sonoras (con vibración vocal activa).',
    ],
    iconName: 'count',
  },
  {
    id: 'what-is-phoneme',
    title: '¿Qué es un fonema y por qué importa en ingeniería?',
    subtitle: 'La unidad mínima de significado',
    content:
      'Un fonema es la unidad más pequeña de sonido capaz de cambiar el significado de una palabra. Cambiar un fonema puede transformar un concepto técnico en un error de comunicación.',
    bullets: [
      'Ejemplo crítico: /bɪt/ (bit, dato binario) frente a /biːt/ (beat, compás/vencer).',
      'Ejemplo de fricativa: /ʃel/ (shell, terminal) frente a /sel/ (sell, vender).',
    ],
    iconName: 'sound',
  },
  {
    id: 'how-to-read',
    title: '¿Cómo leer correctamente las transcripciones fonéticas?',
    subtitle: 'La simbología y los signos diacríticos clave',
    content:
      'Al consultar vocabulario en la aplicación, verás transcripciones entre barras inclinadas /.../. Estos son los signos que debes reconocer:',
    bullets: [
      'Barras /.../: Indican que los caracteres representan sonidos hablados y no ortografía.',
      'Acento primario ˈ: La sílaba siguiente lleva el golpe principal de voz (ej: /ˈsɜː.vər/ en server).',
      'Acento secundario ˌ: Marca una fuerza menor pero perceptible en palabras compuestas.',
      'Dos puntos ː: Indican que la vocal se alarga en el tiempo (ej: /iː/ en clean vs /ɪ/ en click).',
      'El Schwa /ə/: El sonido más común del inglés; siempre es átono y ultra relajado (ej: /ˈdeɪ.tə/).',
    ],
    iconName: 'read',
  },
]
