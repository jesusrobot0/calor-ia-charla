# Plan de Implementación - CALOR-IA

## Resumen de Fases

| Fase | Descripción | Estimado |
|------|-------------|----------|
| 1 | Setup + Tipos | 3 min |
| 2 | Zustand Store | 5 min |
| 3 | Header + Layout | 5 min |
| 4 | FoodList + FoodItem | 7 min |
| 5 | AddButton | 3 min |
| 6 | AddFoodModal + Form | 10 min |
| 7 | Integración + Polish | 7 min |

**Total estimado**: ~40 minutos

---

## Fase 1: Setup + Tipos

### Objetivo
Establecer los tipos de datos base del proyecto.

### Entregables
- [ ] Crear carpeta `src/types/`
- [ ] Crear archivo `src/types/food.ts` con interfaces

### Archivos a Crear

**`src/types/food.ts`**
```typescript
export interface Food {
  id: string;
  name: string;
  quantity: string;
  calories: number;
  time: string;
  createdAt: string;
}

export interface FoodFormData {
  name: string;
  quantity: string;
  calories: number;
  time: string;
}
```

### Dependencias
- Ninguna (primera fase)

### Verificación
```bash
npm run type-check
```

### Commit Message
`feat: agregar tipos de datos para alimentos`

---

## Fase 2: Zustand Store

### Objetivo
Implementar el store de estado con persistencia en localStorage.

### Entregables
- [ ] Crear carpeta `src/stores/`
- [ ] Crear archivo `src/stores/foodStore.ts`
- [ ] Implementar state y actions
- [ ] Configurar persistencia

### Archivos a Crear

**`src/stores/foodStore.ts`**
- State: `foods: Food[]`
- Actions: `addFood`, `removeFood`, `getTodayFoods`, `getTotalCalories`
- Middleware: `persist` con key `'calor-ia-storage'`

### Dependencias
- Fase 1 (tipos)

### Verificación
```bash
npm run type-check
npm run lint
```

### Commit Message
`feat: implementar store de Zustand con persistencia`

---

## Fase 3: Header + Layout

### Objetivo
Crear el header con título y total de calorías, más el layout base.

### Entregables
- [ ] Crear `src/components/Header.tsx`
- [ ] Mostrar título "CALOR-IA"
- [ ] Mostrar total de calorías del día
- [ ] Integrar en `page.tsx`

### Archivos a Crear/Modificar
- `src/components/Header.tsx` (nuevo)
- `src/app/page.tsx` (modificar)

### Dependencias
- Fase 2 (store para getTotalCalories)

### Verificación
```bash
npm run type-check
npm run lint
npm run dev  # Verificar visualmente
```

### Commit Message
`feat: agregar header con total de calorías`

---

## Fase 4: FoodList + FoodItem

### Objetivo
Mostrar la lista de alimentos registrados hoy.

### Entregables
- [ ] Crear `src/components/FoodItem.tsx`
- [ ] Crear `src/components/FoodList.tsx`
- [ ] Manejar estado vacío
- [ ] Integrar en page

### Archivos a Crear/Modificar
- `src/components/FoodItem.tsx` (nuevo)
- `src/components/FoodList.tsx` (nuevo)
- `src/app/page.tsx` (modificar)

### Dependencias
- Fase 2 (store)
- Fase 3 (layout)

### Verificación
```bash
npm run type-check
npm run lint
npm run dev  # Verificar con datos mock o lista vacía
```

### Commit Message
`feat: agregar lista de alimentos`

---

## Fase 5: AddButton

### Objetivo
Crear el botón flotante para agregar nuevos alimentos.

### Entregables
- [ ] Crear `src/components/AddButton.tsx`
- [ ] Posición fija en la parte inferior
- [ ] Prop `onClick` para abrir modal
- [ ] Integrar en page

### Archivos a Crear/Modificar
- `src/components/AddButton.tsx` (nuevo)
- `src/app/page.tsx` (modificar)

### Dependencias
- Fase 3 (layout)

### Verificación
```bash
npm run type-check
npm run lint
npm run dev  # Verificar posición y estilo
```

### Commit Message
`feat: agregar botón de agregar alimento`

---

## Fase 6: AddFoodModal + Form

### Objetivo
Implementar el modal fullscreen con el formulario de agregar.

### Entregables
- [ ] Crear `src/components/AddFoodModal.tsx`
- [ ] Campos: nombre, cantidad, calorías, hora
- [ ] Validación básica
- [ ] Lógica de abrir/cerrar
- [ ] Default de hora = ahora

### Archivos a Crear/Modificar
- `src/components/AddFoodModal.tsx` (nuevo)
- `src/app/page.tsx` (modificar - estado del modal)

### Dependencias
- Fase 2 (store para addFood)
- Fase 5 (AddButton dispara apertura)

### Verificación
```bash
npm run type-check
npm run lint
npm run dev  # Probar flujo completo
```

### Commit Message
`feat: agregar modal y formulario de nuevo alimento`

---

## Fase 7: Integración + Polish

### Objetivo
Verificar que todo funciona end-to-end y hacer ajustes finales.

### Entregables
- [ ] Verificar flujo completo: agregar → ver en lista
- [ ] Verificar persistencia (refresh)
- [ ] Ajustar estilos si es necesario
- [ ] Revisar accesibilidad básica

### Archivos a Modificar
- Cualquiera que necesite ajustes

### Dependencias
- Todas las fases anteriores

### Verificación
```bash
npm run type-check
npm run lint
npm run build  # Build completo sin errores
npm run dev    # Test manual end-to-end
```

### Test Manual
1. Abrir app en móvil/responsive
2. Verificar lista vacía
3. Agregar un alimento
4. Verificar que aparece en lista
5. Verificar total actualizado
6. Refresh página
7. Verificar que datos persisten

### Commit Message
`feat: integración completa y polish final`

---

## Notas para el Implementador

1. **Una fase a la vez**: No saltarse fases
2. **Verificar antes de avanzar**: Cada fase debe pasar verificación
3. **Commits atómicos**: Un commit por fase
4. **Mobile-first**: Diseñar para móvil primero
5. **TypeScript estricto**: No usar `any`
