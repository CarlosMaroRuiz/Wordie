# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Profesionales hispanohablantes (desarrolladores de software, personas que viajan y trabajadores de oficina) que necesitan adquirir, afianzar y practicar vocabulario, gramática y expresiones en inglés aplicadas a situaciones reales de su día a día.

## Product Purpose

"Wordie" (Interactive English Learning Hub) es una plataforma web modular y dinámica de aprendizaje de inglés. Su propósito es transformar el estudio pasivo en práctica activa mediante un sistema multitemático integrado, método Leitner de repetición espaciada, lecturas inmersivas con glosarios contextuales y minijuegos de agilidad lingüística.

## Positioning

A diferencia de las aplicaciones genéricas de idiomas o plataformas infantiles, Wordie aborda tres pilares temáticos de igual jerarquía: **Desarrollo (`dev`)**, **Viajes (`travel`)** y **Trabajo de oficina (`work`)**, gobernados por un selector global (`useTopicStore`). El contenido, las oraciones, las historias y los minijuegos se adaptan al contexto seleccionado por el usuario.

## Operating Context

- Aplicación web responsive (desktop, tablet, mobile) orientada a sesiones de estudio y repaso rápido (microlearning de 3 a 10 minutos).
- Soporte para navegación con teclado, feedback de audio accesible vía síntesis de voz (`SpeechSynthesis`), y modo oscuro/claro resuelto mediante tokens CSS en `[data-theme="dark"]`.

## Capabilities and Constraints

- **Módulos Principales:**
  - **Gramática (`/grammar`):** Niveles A1 a C1 con explicaciones concisas, fórmulas interactivas, ejemplos bilingües y mini-quizzes.
  - **Vocabulario (`/vocabulary`):** Sistema Leitner de 5 cajas de repetición espaciada persistido en `localStorage`.
  - **Historias (`/stories`):** Lecturas guiadas con narración de audio, palabras clave interactivas y quizzes de comprensión.
  - **Frases (`/phrases`):** Expresiones coloquiales y profesionales clasificadas por contexto situacional.
  - **Minijuegos (`/games`):** Memorama, Sentence Builder, Detective de Tiempos, Palabra Intrusa y Engranajes (conectores lógicos).
- **Restricciones Técnicas:**
  - TypeScript estricto sin `any`.
  - Arquitectura desacoplada en `@common`, `@core` y `@features`.
  - Reutilización obligatoria de primitivos y componentes compuestos de `@common`.
  - Prohibidos colores fuera de tokens `@theme` (`src/index.css`), gradientes arbitrarios y clases `dark:` manuales.

## Brand Commitments

- **Tono y Voz:** Directo, profesional, motivador y claro. Libre de jerga innecesaria o infantilizaciones.
- **Identidad Visual:** Neutros equilibrados con acento funcional Slate Blue (`#5759EA`), tipografía redondeada accesible (`Nunito`) y soporte monospace selectivo (`JetBrains Mono`).

## Product Principles

1. **Contexto sobre abstracción:** Cada palabra o regla gramatical se acompaña de un ejemplo en una situación cotidiana real (dev, viajes u oficina).
2. **Reutilización y coherencia:** Las mismas experiencias (cabeceras, barras de estado, tarjetas y botones) comparten primitivos comunes para eliminar la sobrecarga cognitiva.
3. **Respeto a la temática activa:** El usuario experimenta una app cohesiva según el tema que haya seleccionado sin mezclas accidentales.
