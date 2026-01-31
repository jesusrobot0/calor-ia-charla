import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Food, FoodFormData } from '@/src/types/food';

/** Estado del store de alimentos */
interface FoodStoreState {
  foods: Food[];
}

/** Acciones del store de alimentos */
interface FoodStoreActions {
  addFood: (data: FoodFormData) => void;
  removeFood: (id: string) => void;
  getTodayFoods: () => Food[];
  getTotalCalories: () => number;
}

type FoodStore = FoodStoreState & FoodStoreActions;

/** Genera un ID unico basado en timestamp y valor aleatorio */
const generarId = (): string => {
  return `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
};

/** Obtiene la fecha de hoy en formato ISO (solo fecha, sin hora) */
const obtenerFechaHoy = (): string => {
  return new Date().toISOString().split('T')[0];
};

export const useFoodStore = create<FoodStore>()(
  persist(
    (set, get) => ({
      foods: [],

      addFood: (data: FoodFormData) => {
        const nuevoAlimento: Food = {
          id: generarId(),
          name: data.name,
          quantity: data.quantity,
          calories: data.calories,
          time: data.time,
          createdAt: new Date().toISOString(),
        };

        set((estado) => ({
          foods: [...estado.foods, nuevoAlimento],
        }));
      },

      removeFood: (id: string) => {
        set((estado) => ({
          foods: estado.foods.filter((alimento) => alimento.id !== id),
        }));
      },

      getTodayFoods: (): Food[] => {
        const hoy = obtenerFechaHoy();
        return get().foods.filter(
          (alimento) => alimento.createdAt.split('T')[0] === hoy
        );
      },

      getTotalCalories: (): number => {
        const alimentosHoy = get().getTodayFoods();
        return alimentosHoy.reduce(
          (total, alimento) => total + alimento.calories,
          0
        );
      },
    }),
    { name: 'calor-ia-storage' }
  )
);
