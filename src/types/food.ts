/** Representa un alimento registrado con todos sus datos */
export interface Food {
  id: string;
  name: string;
  quantity: string;
  calories: number;
  time: string; // formato HH:mm
  createdAt: string; // ISO date string
}

/** Datos del formulario para agregar un alimento (sin id ni createdAt) */
export interface FoodFormData {
  name: string;
  quantity: string;
  calories: number;
  time: string;
}
