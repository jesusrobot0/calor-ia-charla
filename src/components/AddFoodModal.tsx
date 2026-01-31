'use client';

import { useState } from 'react';
import { useFoodStore } from '@/src/stores/foodStore';
import type { FoodFormData } from '@/src/types/food';

interface AddFoodModalProps {
  estaAbierto: boolean;
  onCerrar: () => void;
}

/** Obtiene la hora actual en formato HH:mm */
const obtenerHoraActual = (): string => {
  const ahora = new Date();
  const horas = ahora.getHours().toString().padStart(2, '0');
  const minutos = ahora.getMinutes().toString().padStart(2, '0');
  return `${horas}:${minutos}`;
};

/** Estado inicial del formulario */
const estadoInicialFormulario: FoodFormData = {
  name: '',
  quantity: '',
  calories: 0,
  time: '',
};

/** Errores de validacion del formulario */
interface ErroresFormulario {
  name?: string;
  quantity?: string;
  calories?: string;
}

/** Modal fullscreen con formulario para agregar un nuevo alimento */
const AddFoodModal = ({ estaAbierto, onCerrar }: AddFoodModalProps) => {
  const addFood = useFoodStore((estado) => estado.addFood);

  const [formulario, setFormulario] = useState<FoodFormData>({
    ...estadoInicialFormulario,
    time: obtenerHoraActual(),
  });
  const [errores, setErrores] = useState<ErroresFormulario>({});

  /** Reinicia el formulario a su estado inicial */
  const reiniciarFormulario = () => {
    setFormulario({
      ...estadoInicialFormulario,
      time: obtenerHoraActual(),
    });
    setErrores({});
  };

  /** Valida los campos del formulario */
  const validarFormulario = (): boolean => {
    const nuevosErrores: ErroresFormulario = {};

    if (formulario.name.trim() === '') {
      nuevosErrores.name = 'El nombre es obligatorio';
    }

    if (formulario.quantity.trim() === '') {
      nuevosErrores.quantity = 'La cantidad es obligatoria';
    }

    if (formulario.calories <= 0) {
      nuevosErrores.calories = 'Las calorias deben ser un numero positivo';
    }

    setErrores(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0;
  };

  /** Maneja el cambio en los campos de texto */
  const handleCambioTexto = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormulario((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Limpia el error del campo al escribir
    if (errores[name as keyof ErroresFormulario]) {
      setErrores((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  /** Maneja el cambio en el campo de calorias (numerico) */
  const handleCambioCalorias = (e: React.ChangeEvent<HTMLInputElement>) => {
    const valor = e.target.value;
    const calorias = valor === '' ? 0 : parseInt(valor, 10);
    setFormulario((prev) => ({
      ...prev,
      calories: isNaN(calorias) ? 0 : calorias,
    }));
    if (errores.calories) {
      setErrores((prev) => ({
        ...prev,
        calories: undefined,
      }));
    }
  };

  /** Maneja el envio del formulario */
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validarFormulario()) {
      return;
    }

    addFood(formulario);
    reiniciarFormulario();
    onCerrar();
  };

  /** Maneja el cierre del modal (cancelar) */
  const handleCancelar = () => {
    reiniciarFormulario();
    onCerrar();
  };

  if (!estaAbierto) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col bg-white"
      role="dialog"
      aria-modal="true"
      aria-label="Agregar nuevo alimento"
    >
      {/* Header del modal */}
      <div className="flex items-center justify-between px-4 py-4 border-b border-gray-200">
        <button
          type="button"
          onClick={handleCancelar}
          className="text-base font-medium text-gray-600 transition-colors hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-400 rounded-lg px-2 py-1"
        >
          Cancelar
        </button>
        <h2 className="text-lg font-semibold text-gray-900">
          Nuevo alimento
        </h2>
        <button
          type="submit"
          form="formulario-alimento"
          className="text-base font-semibold text-orange-500 transition-colors hover:text-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-400 rounded-lg px-2 py-1"
        >
          Guardar
        </button>
      </div>

      {/* Formulario */}
      <form
        id="formulario-alimento"
        onSubmit={handleSubmit}
        className="flex flex-1 flex-col gap-6 overflow-y-auto px-4 py-6"
      >
        {/* Campo: Nombre */}
        <div className="flex flex-col gap-2">
          <label
            htmlFor="campo-nombre"
            className="text-sm font-medium text-gray-700"
          >
            Nombre del alimento
          </label>
          <input
            id="campo-nombre"
            name="name"
            type="text"
            placeholder="Ej: Pollo a la plancha"
            value={formulario.name}
            onChange={handleCambioTexto}
            className="rounded-lg border border-gray-300 px-4 py-3 text-base text-gray-900 placeholder:text-gray-400 focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-200"
          />
          {errores.name && (
            <p className="text-sm text-red-500" role="alert">
              {errores.name}
            </p>
          )}
        </div>

        {/* Campo: Cantidad */}
        <div className="flex flex-col gap-2">
          <label
            htmlFor="campo-cantidad"
            className="text-sm font-medium text-gray-700"
          >
            Cantidad
          </label>
          <input
            id="campo-cantidad"
            name="quantity"
            type="text"
            placeholder="Ej: 200g, 1 taza, 2 unidades"
            value={formulario.quantity}
            onChange={handleCambioTexto}
            className="rounded-lg border border-gray-300 px-4 py-3 text-base text-gray-900 placeholder:text-gray-400 focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-200"
          />
          {errores.quantity && (
            <p className="text-sm text-red-500" role="alert">
              {errores.quantity}
            </p>
          )}
        </div>

        {/* Campo: Calorias */}
        <div className="flex flex-col gap-2">
          <label
            htmlFor="campo-calorias"
            className="text-sm font-medium text-gray-700"
          >
            Calorias
          </label>
          <input
            id="campo-calorias"
            name="calories"
            type="number"
            inputMode="numeric"
            min="1"
            placeholder="Ej: 250"
            value={formulario.calories === 0 ? '' : formulario.calories}
            onChange={handleCambioCalorias}
            className="rounded-lg border border-gray-300 px-4 py-3 text-base text-gray-900 placeholder:text-gray-400 focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-200"
          />
          {errores.calories && (
            <p className="text-sm text-red-500" role="alert">
              {errores.calories}
            </p>
          )}
        </div>

        {/* Campo: Hora */}
        <div className="flex flex-col gap-2">
          <label
            htmlFor="campo-hora"
            className="text-sm font-medium text-gray-700"
          >
            Hora
          </label>
          <input
            id="campo-hora"
            name="time"
            type="time"
            value={formulario.time}
            onChange={handleCambioTexto}
            className="rounded-lg border border-gray-300 px-4 py-3 text-base text-gray-900 focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-200"
          />
        </div>
      </form>
    </div>
  );
};

export default AddFoodModal;
