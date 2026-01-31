# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Idioma

Toda comunicación debe ser en **español**. Mensajes de commit, comentarios de código, nombres de variables descriptivas y respuestas al usuario deben estar en español.

## Comandos de Desarrollo

```bash
npm run dev        # Servidor de desarrollo (http://localhost:3000)
npm run build      # Build de producción (incluye type-check)
npm run start      # Servidor de producción (requiere build previo)
npm run lint       # ESLint con config de Next.js
npx tsc --noEmit   # Type-check sin emitir archivos (no hay script dedicado)
```

No hay framework de testing configurado.

## Stack Tecnológico

- **Next.js 16** con App Router (no Pages Router)
- **React 19** con componentes funcionales (arrow functions)
- **TypeScript 5** en modo estricto (`strict: true`)
- **Tailwind CSS 4** vía PostCSS plugin (`@tailwindcss/postcss`)
- **Zustand 5** para estado global con middleware `persist` (localStorage)
- **ESLint 9** flat config con `core-web-vitals` y `typescript`

## Arquitectura del Proyecto

### Estructura de directorios

- `app/` - Next.js App Router: layouts, pages, globals.css
- `src/types/` - Interfaces y types de TypeScript
- `src/stores/` - Stores de Zustand con persist
- `src/components/` - Componentes React
- `specs/` - Especificación técnica (SPEC.md) y plan de implementación (PLAN.md)
- `.claude/agents/` - Definiciones de roles (architect, frontend, pm, qa)
- `.claude/rules/` - Reglas de código (typescript.md, frontend.md)
- `.claude/skills/` - Skills reutilizables (commit, review-checklist)

### Modelo de datos principal

La app es un tracker de calorías. El tipo central es `Food` con campos: `id`, `name`, `quantity`, `calories`, `time` (HH:mm), `createdAt` (ISO string). El store usa key `'calor-ia-storage'` en localStorage.

### Árbol de componentes

```
App (layout.tsx)
└── HomePage (page.tsx)
    ├── Header → TotalCalories
    ├── FoodList → FoodItem (×n)
    ├── AddButton
    └── AddFoodModal → FoodForm
```

## Flujo de trabajo con agentes

El proyecto define 4 agentes en `.claude/agents/`:
1. **architect** - Genera `specs/SPEC.md` a partir de requerimientos
2. **pm** - Genera `specs/PLAN.md` dividiendo la spec en fases incrementales
3. **frontend** - Implementa una fase a la vez, verifica con lint/type-check
4. **qa** - Revisa código por fase, aprueba o rechaza con checklist

El ciclo es: architect → pm → frontend (fase por fase con qa review) → commit.

## Convenciones de Commits

Formato: `<tipo>: <descripción en español>`

Tipos: `feat`, `fix`, `refactor`, `style`, `docs`, `chore`

Un commit atómico por fase completada. Solo commitear código que pasa type-check y lint.

## Convenciones de Código

- **Interfaces** para objetos y props de componentes; **types** para unions/intersections/utilities
- **`import type`** para importaciones que solo traen tipos
- **Eventos tipados**: `React.MouseEvent<HTMLButtonElement>`, `React.ChangeEvent<HTMLInputElement>`, `React.FormEvent<HTMLFormElement>`
- **No usar `any`** — usar `unknown` y validar. No usar `// @ts-ignore`
- **Mobile-first**: estilos base para móvil, breakpoints (`sm:`, `md:`, `lg:`) para pantallas más grandes
- **Orden de clases Tailwind**: layout → spacing → sizing → typography → colors → effects
- **Hooks al inicio** del componente, antes de cualquier lógica
- **Path alias**: `@/*` mapea a `./*`
- **Accesibilidad**: botones con texto/aria-label, inputs con labels, contraste suficiente, focus visible
