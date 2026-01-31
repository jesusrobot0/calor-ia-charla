interface AddButtonProps {
  onClick: () => void;
}

/** Boton flotante fijo en la parte inferior para agregar alimentos */
const AddButton = ({ onClick }: AddButtonProps) => {
  return (
    <button
      onClick={onClick}
      aria-label="Agregar alimento"
      className="fixed bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 rounded-full bg-orange-500 px-6 py-3 text-base font-semibold text-white shadow-lg transition-colors hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-2 active:bg-orange-700"
    >
      <span className="text-xl leading-none" aria-hidden="true">+</span>
      Agregar
    </button>
  );
};

export default AddButton;
