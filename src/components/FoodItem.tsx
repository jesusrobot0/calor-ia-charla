import type { Food } from '@/src/types/food';

interface FoodItemProps {
  alimento: Food;
}

/** Muestra un registro individual de alimento con nombre, cantidad, calorias y hora */
const FoodItem = ({ alimento }: FoodItemProps) => {
  return (
    <article className="flex items-center justify-between rounded-xl bg-white p-4 shadow-sm">
      <div className="flex flex-col gap-1">
        <h3 className="text-base font-semibold text-gray-900">
          {alimento.name}
        </h3>
        <p className="text-sm text-gray-500">
          {alimento.quantity} &middot; {alimento.calories} kcal
        </p>
      </div>
      <span className="text-sm font-medium text-gray-400">
        {alimento.time}
      </span>
    </article>
  );
};

export default FoodItem;
