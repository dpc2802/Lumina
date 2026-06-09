"use client";

import { Trash2 } from "lucide-react";
import { deleteOrder } from "@/app/actions";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export function DeleteOrderButton({ orderId }: { orderId: string }) {
  const router = useRouter();

  const handleDelete = async () => {
    if (window.confirm("¿Estás seguro de eliminar esta orden por completo? Esta acción es irreversible y afectará tus estadísticas de ingresos.")) {
      toast.promise(
        deleteOrder(orderId),
        {
          loading: 'Eliminando orden...',
          success: () => {
            router.push('/admin/ordenes');
            return 'Orden eliminada con éxito';
          },
          error: 'Error al eliminar la orden'
        }
      );
    }
  };

  return (
    <button 
      onClick={handleDelete}
      className="p-2 text-red-500/70 hover:text-white hover:bg-red-500 bg-red-50 rounded transition-colors ml-4 flex items-center gap-2 text-xs" 
      title="Eliminar Orden"
    >
      <Trash2 size={16} /> <span className="hidden sm:inline">Eliminar Orden</span>
    </button>
  );
}
