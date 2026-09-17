"use client";
import { MessageCircle } from "lucide-react";

export default function FloatingWhatsApp() {
  const handleClick = () => {
    const WHATSAPP_NUMBER = "1234567890"; // Reemplazar con el número real
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("¡Hola Lumina! Necesito asesoría privada para adquirir una pieza.")}`;
    window.open(url, '_blank');
  };

  return (
    <button
      onClick={handleClick}
      className="fixed bottom-6 right-6 z-40 bg-[#1A1A1A] hover:bg-[#D4AF37] text-white p-4 rounded-full shadow-2xl transition-all duration-300 hover:scale-110 flex items-center justify-center group md:bottom-8 md:right-8"
      aria-label="Contactar por WhatsApp"
    >
      <MessageCircle size={24} strokeWidth={1} />
      
      {/* Tooltip */}
      <span className="absolute right-full mr-4 bg-[#1A1A1A] text-[#D4AF37] text-[10px] font-light uppercase tracking-[3px] px-6 py-3 shadow-xl opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
        Asesoría Privada
      </span>
      
      {/* Ping effect */}
      <span className="absolute flex h-full w-full inset-0">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#D4AF37] opacity-20"></span>
      </span>
    </button>
  );
}
