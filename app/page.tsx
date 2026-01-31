'use client';

import { useState } from 'react';
import Header from '@/src/components/Header';
import FoodList from '@/src/components/FoodList';
import AddButton from '@/src/components/AddButton';
import AddFoodModal from '@/src/components/AddFoodModal';

const HomePage = () => {
  const [modalAbierto, setModalAbierto] = useState(false);

  const handleAbrirModal = () => {
    setModalAbierto(true);
  };

  const handleCerrarModal = () => {
    setModalAbierto(false);
  };

  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      <Header />

      <main className="flex flex-1 flex-col px-4 py-6 pb-24">
        <FoodList />
      </main>

      <AddButton onClick={handleAbrirModal} />
      <AddFoodModal estaAbierto={modalAbierto} onCerrar={handleCerrarModal} />
    </div>
  );
};

export default HomePage;
