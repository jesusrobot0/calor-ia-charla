# Reglas TypeScript

## Configuración Estricta

El proyecto usa `strict: true` en tsconfig.json. Esto incluye:
- `noImplicitAny`: No se permite `any` implícito
- `strictNullChecks`: null/undefined deben manejarse explícitamente
- `strictFunctionTypes`: Tipado estricto de funciones

## Tipos vs Interfaces

```tsx
// ✅ Interface para objetos y props de componentes
interface Food {
  id: string;
  name: string;
  calories: number;
}

interface FoodItemProps {
  food: Food;
  onDelete: (id: string) => void;
}

// ✅ Type para unions, intersections, utilities
type FoodCategory = 'breakfast' | 'lunch' | 'dinner' | 'snack';
type PartialFood = Partial<Food>;
```

## Evitar

```tsx
// ❌ NO usar any
const data: any = fetchData();

// ✅ Usar unknown y validar
const data: unknown = fetchData();
if (isFood(data)) {
  // data es Food aquí
}

// ❌ NO usar non-null assertion sin justificación
const element = document.getElementById('app')!;

// ✅ Manejar el caso null
const element = document.getElementById('app');
if (!element) throw new Error('App element not found');
```

## Tipado de Eventos

```tsx
// ✅ Eventos tipados correctamente
const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
  e.preventDefault();
};

const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  setValue(e.target.value);
};

const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
};
```

## Imports de Tipos

```tsx
// ✅ Usar import type cuando solo se importan tipos
import type { Food } from '@/types/food';
import { useFoodStore } from '@/stores/foodStore';
```

## Generics

```tsx
// ✅ Usar generics para componentes reutilizables
interface ListProps<T> {
  items: T[];
  renderItem: (item: T) => React.ReactNode;
}

const List = <T,>({ items, renderItem }: ListProps<T>) => (
  <ul>
    {items.map((item, index) => (
      <li key={index}>{renderItem(item)}</li>
    ))}
  </ul>
);
```
