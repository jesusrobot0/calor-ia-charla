'use client';

import { useFoodStore } from '@/src/stores/foodStore';
import FoodItem from '@/src/components/FoodItem';

/** Lista de alimentos registrados hoy, con estado vacio */
const FoodList = () => {
  const getTodayFoods = useFoodStore((estado) => estado.getTodayFoods);
  const alimentosHoy = getTodayFoods();

  if (alimentosHoy.length === 0) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center gap-2 py-16">
        <p className="text-lg font-medium text-gray-400">
          No hay registros hoy
        </p>
        <p className="text-sm text-gray-300">
          Agrega tu primer alimento del dia
        </p>
      </div>
    );
  }

  return (
    <section className="flex flex-col gap-3" aria-label="Lista de alimentos">
      {alimentosHoy.map((alimento) => (
        <FoodItem key={alimento.id} alimento={alimento} />
      ))}
    </section>
  );
};

export default FoodList;
