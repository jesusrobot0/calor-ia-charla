# Reglas Frontend

## React/Next.js

- Usar App Router (no Pages Router)
- Componentes funcionales con arrow functions
- Hooks al inicio del componente
- Memoización solo si hay problema de performance demostrado

## TypeScript

- Strict mode habilitado
- Interfaces para props de componentes
- Types para datos/modelos
- No usar `any` - usar `unknown` si es necesario
- Tipar eventos: `React.MouseEvent<HTMLButtonElement>`

## Tailwind CSS

- Mobile-first: diseñar para móvil, agregar breakpoints para desktop
- Usar clases de Tailwind, no CSS custom
- Orden de clases: layout → spacing → sizing → typography → colors → effects
- Extraer componentes si hay mucha repetición de clases

## Componentes

```tsx
// ✅ Correcto
interface ButtonProps {
  label: string;
  onClick: () => void;
  variant?: 'primary' | 'secondary';
}

const Button = ({ label, onClick, variant = 'primary' }: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        'px-4 py-2 rounded-lg font-medium',
        variant === 'primary' ? 'bg-blue-500 text-white' : 'bg-gray-200'
      )}
    >
      {label}
    </button>
  );
};

export default Button;
```

## Zustand Store

```tsx
// ✅ Patrón correcto con persist
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface FoodStore {
  foods: Food[];
  addFood: (food: Food) => void;
}

export const useFoodStore = create<FoodStore>()(
  persist(
    (set) => ({
      foods: [],
      addFood: (food) => set((state) => ({ 
        foods: [...state.foods, food] 
      })),
    }),
    { name: 'food-storage' }
  )
);
```

## Accesibilidad (a11y)

- Botones con texto descriptivo o aria-label
- Inputs con labels asociados
- Contraste de colores suficiente
- Focus visible en elementos interactivos
