# Hub de Aprendizaje de Inglés (Wordie)

## Descripción general
Wordie es una aplicación web interactiva para aprender inglés, construida con tecnologías frontend modernas. Ofrece gramática, vocabulario, historias, frases, fonética y juegos para que los usuarios practiquen inglés de forma lúdica.

## Tecnologías
- **Framework:** React 19 (componentes declarados con `function`)
- **Lenguaje:** TypeScript (modo estricto)
- **Compilación:** Vite 8
- **Estilos:** Tailwind CSS v4
- **Gestión de estado:** Zustand
- **Animaciones:** motion/react (sin framer‑motion)
- **Ruteo:** React Router DOM v7
- **Pruebas:** Vitest + Playwright (navegador)
- **Storybook:** 10.6.1 para documentación de componentes UI
- **Gestor de paquetes:** pnpm 9
- **Herramientas backend:** Servidor MCP (english‑hub‑mcp) para mapa de arquitectura, auditorías y registro de decisiones.

## Arquitectura
El código está claramente separado entre componentes reutilizables (`@common`) y módulos de funcionalidad (`src/features/*`). Cada módulo sigue una estructura de carpetas canónica:
```
src/features/<Feature>/
├── components/
│   └── <Component>/
│       ├── index.tsx      // implementación del componente (declaración de función)
│       ├── type.ts        // tipos de props
│       ├── constant.ts    // constantes de animación o UI
│       └── <Component>.stories.tsx // historia de Storybook
├── dto/                // contratos JSON (interfaces)
├── hooks/              // obtención de datos a nivel de feature
├── store/              // store Zustand (si es necesario)
└── index.tsx           // componente raíz del feature
```
La configuración de rutas carga de forma diferida cada feature usando `LoadSuspense`, generando chunks independientes y manteniendo ligero el bundle inicial.

### Diagrama de arquitectura
El siguiente diagrama fue generado automáticamente por el servidor MCP mediante la herramienta `generar_diagrama_arquitectura` con vista `global` y profundidad `detallado`:

```mermaid
flowchart TD
  subgraph Rutas
    R_Home["/ Home"]
    R_Grammar["/grammar"]
    R_Phrases["/phrases"]
    R_Stories["/stories"]
    R_Vocabulary["/vocabulary"]
  end

  subgraph Features
    F_Games[GamesModule - 9 componentes]
    F_Grammar[GrammarModule - 14 componentes]
    F_Home[HomeModule - 14 componentes]
    F_Phonetics[PhoneticsModule - 8 componentes]
    F_PhrasalVerbs[PhrasalVerbsModule - 7 componentes]
    F_Phrases[PhrasesModule - 5 componentes]
    F_Stories[StoriesModule - 9 componentes]
    F_Vocabulary[VocabularyModule - 11 componentes]
  end

  subgraph Stores
    S_useVocabStore[useVocabStore - persiste en LS]
    S_useTopicStore[useTopicStore]
    S_useTourStore[useTourStore]
  end

  subgraph Datos
    D_grammar[grammar.json - 18 items]
    D_phonetics[phonetics.json - 44 items]
    D_phrasal[phrasal-verbs.json - 22 items]
    D_phrases[phrases.json - 40 items]
    D_stories[stories.json - 6 items]
    D_vocabulary[vocabulary.json - 40 items]
    D_LS[localStorage]
  end

  subgraph Common
    C_BottomNav[BottomNav]
    C_Button[Button]
    C_CardBase[CardBase]
    C_Chip[Chip]
    C_Dropdown[Dropdown]
    C_ErrorBoundary[ErrorBoundary]
    C_ErrorBoundaryFallback[ErrorBoundaryFallback]
    C_ErrorLottieAnimation[ErrorLottieAnimation]
    C_ErrorState[ErrorState]
    C_ErrorTechnicalDetails[ErrorTechnicalDetails]
    C_FloatingHelpButton[FloatingHelpButton]
    C_HelpModalDialog[HelpModalDialog]
    C_NavExtraMenu[NavExtraMenu]
    C_Navbar[Navbar]
    C_OnboardingTour[OnboardingTour]
    C_RouteErrorFallback[RouteErrorFallback]
    C_SkeletonPage[SkeletonPage]
  end

  R_Home --> F_Home
  R_Grammar --> F_Grammar
  R_Phrases --> F_Phrases
  R_Stories --> F_Stories
  R_Vocabulary --> F_Vocabulary

  F_Vocabulary --> S_useVocabStore
  S_useVocabStore --> D_LS
  D_LS --> S_useVocabStore

  F_Grammar -.-> D_grammar
  F_Phonetics -.-> D_phonetics
  F_Phrases -.-> D_phrases
  F_Stories -.-> D_stories
  F_Vocabulary -.-> D_vocabulary

  F_Games -.-> C_FloatingHelpButton
  F_Games -.-> C_HelpModalDialog
  F_Games -.-> C_Button
  F_Grammar -.-> C_Button
  F_Grammar -.-> C_SkeletonPage
  F_Grammar -.-> C_ErrorState
  F_Grammar -.-> C_CardBase
  F_Grammar -.-> C_Chip
  F_Home -.-> C_Button
  F_Home -.-> C_CardBase
  F_Phonetics -.-> C_ErrorState
  F_Phonetics -.-> C_FloatingHelpButton
  F_Phonetics -.-> C_SkeletonPage
  F_PhrasalVerbs -.-> C_CardBase
  F_PhrasalVerbs -.-> C_Button
  F_PhrasalVerbs -.-> C_ErrorState
  F_PhrasalVerbs -.-> C_FloatingHelpButton
  F_PhrasalVerbs -.-> C_SkeletonPage
  F_Phrases -.-> C_CardBase
  F_Phrases -.-> C_Button
  F_Phrases -.-> C_Chip
  F_Phrases -.-> C_SkeletonPage
  F_Phrases -.-> C_ErrorState
  F_Stories -.-> C_Button
  F_Stories -.-> C_SkeletonPage
  F_Stories -.-> C_ErrorState
  F_Stories -.-> C_CardBase
  F_Stories -.-> C_Chip
  F_Vocabulary -.-> C_Chip
  F_Vocabulary -.-> C_Button
  F_Vocabulary -.-> C_CardBase
  F_Vocabulary -.-> C_SkeletonPage
  F_Vocabulary -.-> C_ErrorState
``` 

## Rendimiento
Las métricas de Core Web Vitals para la página principal son actualmente:
- **FCP:** 1 088 ms (bueno)
- **LCP:** 1 372 ms (bueno)
- **CLS:** 0.001 (bueno)
- **TTFB:** 133 ms (bueno)

## Servidor MCP (english-hub-mcp)

El proyecto cuenta con un servidor MCP propio que actua como fuente unica de verdad para la arquitectura, calidad y datos de la aplicacion. Expone 30 herramientas organizadas en las siguientes categorias:

- **Contexto y arquitectura:** `obtener_mapa_arquitectura`, `obtener_contexto_tarea`, `briefing_sesion` devuelven el estado completo del proyecto (rutas, features, stores, datos) para eliminar la amnesia entre sesiones de desarrollo.
- **Diagramas dinamicos:** `generar_diagrama_arquitectura` produce diagramas Mermaid en multiples vistas (global, feature, flujo de datos, common, navegacion) con distintos niveles de profundidad. El diagrama de arquitectura de este README fue generado con esta herramienta.
- **Analisis de impacto:** `analizar_impacto_cambio`, `inspeccionar_componente`, `detectar_componentes_huerfanos` y `detectar_componentes_hub` calculan el radio de afectacion antes de modificar cualquier componente o store.
- **Auditoria y calidad (AST TypeScript):** `auditar_codigo`, `auditar_cambio` y `verificar_proyecto` analizan el codigo fuente con el parser AST oficial de TypeScript, verificando el cumplimiento de las reglas arquitecturales del proyecto.
- **Catalogo y andamiaje:** `listar_catalogo_common`, `consultar_componente_common` y `generar_andamiaje_componente` permiten consultar la libreria de componentes reutilizables y generar la estructura modular de nuevos componentes (index, type, constant, stories, hook).
- **Esquemas y datos:** `obtener_esquema_datos`, `validar_datos_json`, `generar_archivo_datos`, `detectar_drift` y `migrar_datos` gestionan los archivos JSON de `/public/data/`, validandolos contra los contratos TypeScript y detectando desincronizaciones.
- **Bitacora de decisiones:** `registrar_decision`, `consultar_bitacora`, `generar_reporte_decisiones` y `exportar_bitacora` documentan el por que de cada cambio arquitectural, manteniendo un historial consultable en una base de datos SQLite.
- **Hallazgos y mejoras:** `registrar_hallazgo`, `consultar_hallazgos` y `gestionar_hallazgo` permiten rastrear mejoras pendientes, bugs detectados y oportunidades de optimizacion.
- **Workspace:** `estado_workspace`, `leer_archivo` y `buscar_en_proyecto` ofrecen acceso al repositorio Git y busqueda por expresiones regulares en el codigo fuente.

## Despliegue
El repositorio está enlazado a Vercel. En cada push a `main`, Vercel construye y despliega la última versión. La URL pública es `https://wordie-beta.vercel.app/`.
