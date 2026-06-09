"use client";

import { Trash2 } from "lucide-react";

export function DeleteButton() {
  return (
    <button 
      type="submit" 
      className="p-2 text-red-500/70 hover:text-white hover:bg-red-500 bg-red-50 rounded transition-colors" 
      title="Eliminar" 
      onClick={(e) => { 
        if(!window.confirm('¿Estás seguro de eliminar esta joya? Esta acción no se puede deshacer.')) {
          e.preventDefault(); 
        }
      }}
    >
      <Trash2 size={16} />
    </button>
  );
}
