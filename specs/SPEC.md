# CALOR-IA - Especificación Técnica

## Resumen

Aplicación mobile-first para tracking de calorías diarias. Permite registrar alimentos consumidos con sus calorías y visualizar el total del día.

---

## Modelo de Datos

### Tipos TypeScript

```typescript
// types/food.ts

interface Food {
  id: string;
  name: string;           // "Pollo a la plancha"
  quantity: string;       // "200g", "1 taza", "2 unidades"
  calories: number;       // 250
  time: string;           // "14:30" (formato HH:mm)
  createdAt: string;      // ISO date string
}

// Para el formulario
interface FoodFormData {
  name: string;
  quantity: string;
  calories: number;
  time: string;
}
```

---

## Arquitectura de Componentes

### Árbol de Componentes

```
App (layout.tsx)
└── HomePage (page.tsx)
    ├── Header
    │   └── TotalCalories
    ├── FoodList
    │   └── FoodItem (×n)
    ├── AddButton
    └── AddFoodModal
        └── FoodForm
```

### Responsabilidades

| Componente | Responsabilidad |
|------------|-----------------|
| `Header` | Mostrar título y total de calorías del día |
| `FoodList` | Renderizar lista de registros, manejar estado vacío |
| `FoodItem` | Mostrar un registro individual (nombre, cantidad, calorías, hora) |
| `AddButton` | Botón flotante para abrir modal |
| `AddFoodModal` | Modal fullscreen con formulario |
| `FoodForm` | Campos del formulario y validación |

---

## Estado (Zustand Store)

### Shape del Estado

```typescript
interface FoodStore {
  // State
  foods: Food[];
  
  // Actions
  addFood: (data: FoodFormData) => void;
  removeFood: (id: string) => void;
  getTodayFoods: () => Food[];
  getTotalCalories: () => number;
}
```

### Persistencia

- Middleware: `persist` de Zustand
- Storage: `localStorage`
- Key: `'calor-ia-storage'`

---

## UI/UX

### Layout Principal

```
┌─────────────────────────┐
│  🔥 CALOR-IA            │  ← Header
│  Total: 1,250 kcal      │
├─────────────────────────┤
│                         │
│  ┌─────────────────┐    │
│  │ 🍗 Pollo        │    │  ← FoodItem
│  │ 200g · 250 kcal │    │
│  │ 14:30           │    │
│  └─────────────────┘    │
│                         │
│  ┌─────────────────┐    │
│  │ 🍚 Arroz        │    │
│  │ 1 taza · 200... │    │
│  └─────────────────┘    │
│                         │
│         ...             │
│                         │
├─────────────────────────┤
│      [ + Agregar ]      │  ← AddButton
└─────────────────────────┘
```

### Modal de Agregar

```
┌─────────────────────────┐
│  ← Cancelar    Guardar  │  ← Header modal
├─────────────────────────┤
│                         │
│  Nombre del alimento    │
│  ┌─────────────────┐    │
│  │ Pollo a la...   │    │
│  └─────────────────┘    │
│                         │
│  Cantidad               │
│  ┌─────────────────┐    │
│  │ 200g            │    │
│  └─────────────────┘    │
│                         │
│  Calorías               │
│  ┌─────────────────┐    │
│  │ 250             │    │
│  └─────────────────┘    │
│                         │
│  Hora                   │
│  ┌─────────────────┐    │
│  │ 14:30       🕐  │    │
│  └─────────────────┘    │
│                         │
└─────────────────────────┘
```

---

## Flujo de Usuario

### Flujo Principal: Agregar Comida

1. Usuario ve la lista (puede estar vacía)
2. Toca botón "Agregar"
3. Se abre modal fullscreen
4. Completa el formulario:
   - Nombre (requerido)
   - Cantidad (requerido)
   - Calorías (requerido, número positivo)
   - Hora (default: hora actual)
5. Toca "Guardar"
6. Modal se cierra
7. Nuevo registro aparece en la lista
8. Total de calorías se actualiza

### Estados UI

- **Lista vacía**: Mostrar mensaje "No hay registros hoy"
- **Modal abierto**: Overlay que cubre toda la pantalla
- **Validación**: Mostrar errores inline bajo cada campo

---

## Criterios de Aceptación

- [ ] Puedo ver una lista de alimentos registrados hoy
- [ ] Puedo ver el total de calorías del día
- [ ] Puedo abrir un modal tocando "Agregar"
- [ ] El modal ocupa toda la pantalla (mobile)
- [ ] Puedo ingresar nombre, cantidad, calorías y hora
- [ ] La hora tiene valor default (hora actual)
- [ ] Al guardar, el modal se cierra
- [ ] El nuevo registro aparece en la lista
- [ ] Los datos persisten al recargar la página
- [ ] El diseño es mobile-first y usable
- [ ] TypeScript compila sin errores
- [ ] ESLint pasa sin errores

---

## Fuera de Alcance (v1)

- ❌ Autenticación/login
- ❌ Backend/API
- ❌ Historial por día (solo muestra "hoy")
- ❌ Editar registros existentes
- ❌ Eliminar registros
- ❌ Búsqueda de alimentos
- ❌ Gráficas/estadísticas
- ❌ Metas de calorías
- ❌ Modo oscuro
