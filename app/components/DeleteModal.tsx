import { useStore } from "../../store/useStore";

export default function DeleteModal() {
  const { setItemToDelete, removeFromHistorial, itemToDelete } = useStore();

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="bg-[#1a1a1a] p-6 rounded-xl border border-gray-800 shadow-2xl w-80">
        <h3 className="text-white font-bold mb-2">¿Eliminar análisis?</h3>
        <p className="text-gray-400 text-sm mb-6">
          Esta acción no se puede deshacer.
        </p>

        <div className="flex gap-3">
          <button
            onClick={() => setItemToDelete(null)}
            className="flex-1 px-4 py-2 rounded-lg bg-gray-800 text-white hover:bg-gray-700"
          >
            Cancelar
          </button>
          <button
            onClick={() => {
              removeFromHistorial(itemToDelete);
              setItemToDelete(null);
            }}
            className="flex-1 px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-500"
          >
            Borrar
          </button>
        </div>
      </div>
    </div>
  );
}
