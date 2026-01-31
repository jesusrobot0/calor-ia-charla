'use client';

import { useFoodStore } from '@/src/stores/foodStore';

/** Header principal con titulo y total de calorias del dia */
const Header = () => {
  const getTotalCalories = useFoodStore((estado) => estado.getTotalCalories);
  const totalCalorias = getTotalCalories();

  return (
    <header className="flex flex-col gap-1 px-4 py-6 bg-orange-500 text-white">
      <h1 className="text-2xl font-bold tracking-tight">CALOR-IA</h1>
      <p className="text-lg font-medium text-orange-100">
        Total: {totalCalorias.toLocaleString()} kcal
      </p>
    </header>
  );
};

export default Header;
