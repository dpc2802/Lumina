"use client";

import { Trash2 } from "lucide-react";
import { deleteCustomer } from "@/app/actions";
import { toast } from "sonner";
import { useState } from "react";

export default function DeleteCustomerButton({ id, customerName }: { id: string, customerName: string }) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (confirm(`¿Estás seguro que deseas eliminar el registro de ${customerName}?\n\nAlerta: Esto también eliminará su historial de órdenes por políticas de privacidad.`)) {
      setIsDeleting(true);
      try {
        const result = await deleteCustomer(id);
        if (result.success) {
          toast.success("Cliente eliminado exitosamente.");
        }
      } catch (error) {
        console.error(error);
        toast.error("Error al eliminar el cliente.");
      } finally {
        setIsDeleting(false);
      }
    }
  };

  return (
    <button 
      onClick={handleDelete}
      disabled={isDeleting}
      className={`p-2 bg-[#fafafa] border border-red-500/20 text-red-500 hover:bg-red-500 hover:text-white transition-colors ${isDeleting ? 'opacity-50 cursor-not-allowed' : ''}`}
      title="Eliminar Cliente"
    >
      <Trash2 size={14} />
    </button>
  );
}
