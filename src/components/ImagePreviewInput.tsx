"use client";

import { useState } from "react";
import Image from "next/image";

export function ImagePreviewInput({ defaultImage }: { defaultImage?: string | null }) {
  const [preview, setPreview] = useState<string | null>(defaultImage || null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const objectUrl = URL.createObjectURL(file);
      setPreview(objectUrl);
      
      // Liberar memoria cuando el componente se desmonte o cambie la foto
      return () => URL.revokeObjectURL(objectUrl);
    } else {
      setPreview(defaultImage || null);
    }
  };

  return (
    <div className="flex flex-col sm:flex-row gap-4 items-start">
      {preview ? (
        <div className="relative w-24 h-24 border border-charcoal/10 bg-[#fafafa] flex-shrink-0 overflow-hidden shadow-sm">
          <Image src={preview} alt="Preview" fill className="object-cover mix-blend-multiply" />
        </div>
      ) : (
        <div className="relative w-24 h-24 border border-charcoal/10 border-dashed flex items-center justify-center bg-charcoal/5 flex-shrink-0">
          <span className="text-[10px] uppercase text-charcoal/40 text-center tracking-widest px-2">Sin Foto</span>
        </div>
      )}
      <div className="flex-1 w-full">
        <input 
          required={!defaultImage} 
          name="image" 
          type="file" 
          accept="image/*" 
          onChange={handleFileChange}
          className="w-full border border-charcoal/20 p-3 outline-none focus:border-rg transition-colors text-sm bg-white cursor-pointer" 
        />
        <p className="text-[10px] text-charcoal/50 mt-2 uppercase tracking-[1px]">Recomendado: Imágenes de producto con fondo claro (JPG/PNG).</p>
      </div>
    </div>
  );
}
