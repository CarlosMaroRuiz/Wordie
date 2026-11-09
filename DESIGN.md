---
name: Wordie - Interactive English Learning Hub
description: Sistema de diseño limpio, accesible y estructurado para la app de aprendizaje de inglés Wordie.
colors:
  primary: "#5759EA"
  primary-hover: "#4A4CD9"
  primary-light: "#EEEEFD"
  on-primary: "#FFFFFF"
  bg-page: "#FAFAFE"
  surface: "#FFFFFF"
  surface-muted: "#F4F4FB"
  surface-elevated: "#FFFFFF"
  border-subtle: "#E6E6F2"
  text-main: "#2B2740"
  text-secondary: "#5C5870"
  text-tertiary: "#6F6B85"
  success: "#317E28"
  success-light: "#EEF9ED"
  warning: "#A85C00"
  warning-light: "#FFF6EB"
  error: "#C73D3D"
  error-light: "#FFF1F1"
  info: "#15759E"
  info-light: "#E4F4FB"
typography:
  display:
    fontFamily: "'Nunito', system-ui, -apple-system, sans-serif"
    fontWeight: 800
    letterSpacing: "-0.02em"
  body:
    fontFamily: "'Nunito', system-ui, -apple-system, sans-serif"
    fontWeight: 400
    lineHeight: 1.6
  mono:
    fontFamily: "'JetBrains Mono', monospace"
    fontWeight: 500
rounded:
  sm: "8px"
  md: "12px"
  lg: "16px"
  xl: "24px"
  full: "9999px"
---

# Design System — Wordie

## Overview
Wordie utiliza un sistema de diseño enfocado en la claridad, la accesibilidad y el ritmo visual relajado. Evita deliberadamente los clichés de interfaces de IA (sin gradientes morados llamativos, sin barras laterales gruesas decorativas y sin tarjetas idénticas con flechas redundantes). El diseño apoya la concentración y el estudio activo en tres temáticas: **Desarrollo**, **Viajes** y **Trabajo**.

## Colors
Todos los colores se resuelven exclusivamente mediante los tokens declarados en `@theme` (`src/index.css`).

- **Primario (Slate Blue):** `--color-primary` (`#5759EA`), usado para acciones principales, estados activos y confirmaciones clave.
- **Superficies Neutras:** 
  - Fondo de página: `--color-bg-page` (`#FAFAFE` en modo claro, `#17151F` en oscuro).
  - Tarjetas y paneles: `--color-surface` (`#FFFFFF` en modo claro, `#211E2B` en oscuro).
  - Superficies alternas: `--color-surface-muted` (`#F4F4FB` / `#2A2739`).
  - Bordes: `--color-border-subtle` (`#E6E6F2` / `#3A3550`).
- **Texto:**
  - Principal: `--color-text-main` (`#2B2740` / `#F5F3FA`).
  - Secundario: `--color-text-secondary` (`#5C5870` / `#A5A0BA`).
  - Terciario: `--color-text-tertiary` (`#6F6B85` / `#8C86A5`).
- **Feedback Semántico:** 
  - Verde éxito (`--color-success` / `--color-success-light`).
  - Ámbar advertencia (`--color-warning` / `--color-warning-light`).
  - Rojo error (`--color-error` / `--color-error-light`).
  - Azul información (`--color-info` / `--color-info-light`).

## Typography
- **Fuente Principal:** `Nunito` (`--font-sans`), elegida por su legibilidad, calidez y curvas amigables en tamaños de lectura y títulos.
- **Fuente Monoespaciada:** `JetBrains Mono` (`--font-mono`), reservada estrictamente para transcripciones fonéticas (IPA), bloques de código o visualización de datos técnicos. **Prohibido usarla como adorno en etiquetas genéricas de UI.**
- **Jerarquía:** Los encabezados (`h1`, `h2`, `h3`) deben sostener su propia jerarquía con tamaño y peso tipográfico, sin requerir "kickers" o micro-etiquetas en mayúsculas encima.

## Layout
- **Contenedores de Página:** Ancho máximo contenido (`max-w-6xl` a `max-w-7xl`), centrado y con espaciado responsive (`px-4 sm:px-6 lg:px-8`).
- **Espaciado y Ritmo:** Separación generosa entre secciones mayores (`gap-6 sm:gap-8`), y agrupación estrecha de elementos dependientes (`gap-2 sm:gap-3`).
- **Navegación:** `Navbar` fija o persistente superior y `BottomNav` para acceso táctil rápido en dispositivos móviles.

## Elevation & Depth
- **Regla de elevación:** Declarar la elevación una sola vez: o borde sutil (`border border-border-subtle`), o sombra difusa (`shadow-soft`), nunca duplicar un borde grueso con una sombra intensa.
- **Sombras:** Se emplean sombras suaves con desenfoque amplio (`--shadow-soft`: `0 4px 20px rgb(43 39 64 / 0.06)`), descartando sombras duras o halos de color tipo neón.

## Shapes
- **Tarjetas y Paneles:** Radios de curvatura de `rounded-2xl` (16px) a `rounded-3xl` (24px) para contenedores de lectura.
- **Botones y Chips:** `rounded-[14px]` a `rounded-full` para controles interactivos y píldoras de filtro.
- **Prohibido:** No utilizar píldoras completas en tarjetas grandes ni bordes angulados discordantes.

## Components
- **Primitivos Obligatorios (`@common`):**
  - `Button`: Botón estándar con variantes (`primary`, `secondary`, `ghost`, `icon`, `iconPrimary`).
  - `CardBase`: Contenedor base de tarjetas con accesibilidad incorporada.
  - `Chip`: Filtro o píldora interactiva con soporte NavLink.
  - `Badge`: Etiqueta semántica de estado o nivel.
  - `AsyncBoundary`: Envoltorio unificado para skeleton, error y contenido.
- **Componentes de Juego (`@features/Games/components`):**
  - `GameShell`: Shell responsive compartido por los 5 juegos.
  - `GameHeader`: Encabezado común con enlace de retorno, reinicio y tutorial.
  - `GameStatsBar`: Barra horizontal limpia de estado, aciertos y racha.

## Do's and Don'ts

### Do
- Utilizar componentes de `@common` antes de considerar crear uno nuevo.
- Respetar la temática activa (`dev`, `travel`, `work`) en datos y ejemplos.
- Asegurar contraste mínimo de 4.5:1 en textos principales.
- Diseñar pensando tanto en tema claro como oscuro mediante tokens semánticos.

### Don't
- **No usar side-tabs:** Prohibido `border-l-4` o `border-r-4` en tarjetas o párrafos de lectura.
- **No usar kickers:** No colocar microetiquetas en mayúsculas `tracking-widest` encima de los títulos.
- **No inventar colores:** Prohibido usar clases hexadecimales (`bg-[#...]`) o gradientes arbitrarios.
- **No anidar tarjetas:** Evitar meter cards dentro de cards sin un propósito jerárquico real.
