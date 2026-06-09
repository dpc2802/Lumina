"use client";

import { useState } from "react";
import { updateOrderStatus } from "@/app/actions";
import { toast } from "sonner";
import { CheckCircle2, Truck, Clock } from "lucide-react";

export function OrderStatusSelect({ orderId, initialStatus }: { orderId: string, initialStatus: string }) {
  const [status, setStatus] = useState(initialStatus);

  const getStatusStyle = (s: string) => {
    switch(s) {
      case 'Completado':
        return 'text-emerald-700 bg-emerald-50 border-emerald-200';
      case 'Tránsito Blindado':
        return 'text-blue-700 bg-blue-50 border-blue-200';
      case 'Procesando':
        return 'text-amber-700 bg-amber-50 border-amber-200';
      case 'Cancelado':
        return 'text-red-700 bg-red-50 border-red-200';
      default:
        return 'text-charcoal bg-charcoal/5 border-charcoal/10';
    }
  };

  const getStatusIcon = (s: string) => {
    switch(s) {
      case 'Completado':
        return <CheckCircle2 size={14} className="mr-1.5" />;
      case 'Tránsito Blindado':
        return <Truck size={14} className="mr-1.5" />;
      case 'Procesando':
        return <Clock size={14} className="mr-1.5" />;
      default:
        return null;
    }
  };

  const handleChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newStatus = e.target.value;
    setStatus(newStatus);
    
    toast.promise(
      updateOrderStatus(orderId, newStatus),
      {
        loading: 'Actualizando estatus...',
        success: `Orden actualizada a ${newStatus}`,
        error: 'Error al actualizar estatus'
      }
    );
  };

  return (
    <div className={`relative inline-flex items-center px-2 py-0.5 text-xs border rounded-full ${getStatusStyle(status)}`}>
      {getStatusIcon(status)}
      <select 
        value={status} 
        onChange={handleChange}
        className="bg-transparent appearance-none outline-none cursor-pointer font-medium text-inherit pr-4 pl-1 py-1"
      >
        <option value="Procesando">Procesando</option>
        <option value="Tránsito Blindado">Tránsito Blindado</option>
        <option value="Completado">Completado</option>
        <option value="Cancelado">Cancelado</option>
      </select>
    </div>
  );
}
