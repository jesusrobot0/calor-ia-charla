---
name: review-checklist
description: Revisión estructurada del código de una fase antes de aprobar. Usar para validar calidad de código, TypeScript, React, accesibilidad y estilos.
disable-model-invocation: true
allowed-tools: Bash, Read, Grep, Glob
---

Revisión estructurada del código de una fase implementada en el proyecto calor-ia.

## Proceso

### 1. Verificación Automatizada

Ejecutar en orden y reportar resultados:

```bash
npx tsc --noEmit       # Type-check
npm run lint           # ESLint
npm run build          # Build de producción (si aplica)
```

### 2. TypeScript Quality

Usar la herramienta Grep (NO bash grep) para buscar problemas:

- Buscar `any` en archivos `.ts` y `.tsx` dentro de `src/`
- Buscar `@ts-ignore` y `@ts-expect-error` en `src/`
- Verificar que interfaces y types estén definidos para props y datos
- Verificar que eventos usen tipos explícitos (`React.MouseEvent`, `React.ChangeEvent`, etc.)
- Verificar manejo correcto de null/undefined

### 3. React Best Practices

- Hooks (useState, useEffect, etc.) al inicio del componente, antes de lógica
- Array de dependencias correcto en useEffect
- Key único en cada item de listas renderizadas
- Componentes menores a 150 líneas idealmente
- Props destructuradas en la firma de la función

### 4. Zustand Store (si aplica)

- State y Actions con tipado completo
- No mutar estado directamente (usar spread/nuevo objeto)
- Middleware persist configurado si se requiere persistencia
- Selectores simples para evitar re-renders innecesarios

### 5. Estilos (Tailwind CSS)

- Mobile-first: estilos base para móvil, breakpoints para desktop
- Orden de clases: layout -> spacing -> sizing -> typography -> colors -> effects
- Sin `!important`
- Funciona en diferentes tamaños de pantalla

### 6. Accesibilidad

- Inputs con `<label htmlFor="">` o `aria-label`
- Botones con texto descriptivo o `aria-label`
- Elementos semánticos (`<button>` en vez de `<div onClick>`)
- Focus visible en elementos interactivos

### 7. Funcionalidad

- El flujo principal (happy path) funciona correctamente
- Edge cases manejados (listas vacías, valores límite)
- Errores visibles para el usuario
- Persistencia funciona tras refresh (si aplica)

## Output

Reportar usando este formato:

```
## Review - Fase [N]

### Automatizado
- [ ] type-check: [resultado]
- [ ] lint: [resultado]
- [ ] build: [resultado]

### TypeScript
- [ ] Sin `any`
- [ ] Interfaces/types definidos
- [ ] Eventos tipados
- [ ] Sin @ts-ignore/@ts-expect-error
- [ ] Nullability manejada

### React
- [ ] Hooks al inicio
- [ ] Keys en listas
- [ ] Componentes < 150 líneas

### Estilos
- [ ] Mobile-first
- [ ] Clases ordenadas

### Accesibilidad
- [ ] Labels en inputs
- [ ] Botones descriptivos
- [ ] Semántica HTML correcta

### Funcionalidad
- [ ] Happy path OK
- [ ] Edge cases manejados

---
Resultado: APROBADO / RECHAZADO
Notas: [observaciones o correcciones necesarias]
```
