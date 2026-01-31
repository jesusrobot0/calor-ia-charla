# Skill: Review Checklist

Checklist completo para revisar código antes de aprobar una fase.

## Uso

Invoca esta skill para hacer una revisión estructurada del código de una fase.

## Checklist

### 1. Verificación Automatizada

```bash
# Ejecutar en orden y reportar resultados
npm run type-check    # [ ] Pasa
npm run lint          # [ ] Pasa
npm run build         # [ ] Pasa (si aplica)
```

### 2. TypeScript Quality

- [ ] **No `any`**: Buscar `any` explícitos o implícitos
- [ ] **Interfaces definidas**: Props y datos tienen tipos
- [ ] **Eventos tipados**: `React.MouseEvent`, `React.ChangeEvent`, etc.
- [ ] **No suppressions**: Sin `@ts-ignore` o `@ts-expect-error`
- [ ] **Nullability**: Se maneja null/undefined correctamente

```bash
# Buscar any
grep -r "any" src/ --include="*.ts" --include="*.tsx"

# Buscar ts-ignore
grep -r "@ts-ignore\|@ts-expect-error" src/
```

### 3. React Best Practices

- [ ] **Hooks al inicio**: useState, useEffect antes de la lógica
- [ ] **Dependencias useEffect**: Array de dependencias correcto
- [ ] **Keys en listas**: Cada item tiene key único
- [ ] **Componentes pequeños**: < 150 líneas idealmente
- [ ] **Props destructuradas**: En la firma de la función

### 4. Zustand Store (si aplica)

- [ ] **Tipado completo**: State y Actions tipados
- [ ] **Inmutabilidad**: No mutar estado directamente
- [ ] **Persist configurado**: Si se requiere persistencia
- [ ] **Selectores simples**: Evitar re-renders innecesarios

### 5. Estilos (Tailwind)

- [ ] **Mobile-first**: Sin breakpoints innecesarios para móvil
- [ ] **Clases organizadas**: Orden lógico (layout → spacing → colors)
- [ ] **No !important**: Evitar forzar especificidad
- [ ] **Responsive**: Funciona en diferentes tamaños

### 6. Accesibilidad Básica

- [ ] **Labels en inputs**: `<label htmlFor="">` o aria-label
- [ ] **Botones descriptivos**: Texto o aria-label
- [ ] **Roles semánticos**: `<button>` no `<div onClick>`
- [ ] **Focus visible**: Se ve qué elemento tiene foco

### 7. Funcionalidad

- [ ] **Happy path**: El flujo principal funciona
- [ ] **Edge cases**: Listas vacías, valores límite
- [ ] **Errores**: Se manejan errores de forma visible
- [ ] **Persistencia**: Datos sobreviven refresh (si aplica)

## Output Template

```markdown
## Review Checklist - Fase [N]

### Automatizado
- [x] type-check: ✅ 0 errores
- [x] lint: ✅ 0 errores
- [ ] build: ⏳ pendiente

### TypeScript
- [x] Sin `any`
- [x] Interfaces definidas
- [x] Eventos tipados
- [x] Sin @ts-ignore
- [x] Nullability OK

### React
- [x] Hooks correctos
- [x] Keys en listas
- [x] Componentes razonables

### Estilos
- [x] Mobile-first
- [x] Clases organizadas

### Accesibilidad
- [x] Labels en inputs
- [x] Botones descriptivos

### Funcionalidad
- [x] Happy path OK
- [ ] Edge cases: [pendiente probar lista vacía]

---

**Resultado**: ✅ APROBADO / ❌ RECHAZADO

**Notas**: [observaciones]
```
