"use client";
import { Gem } from "lucide-react";

export default function AnnouncementBar() {
  const items = [
    { text: "ENVÍO INTERNACIONAL DE GALA GRATUITO", type: "emerald" },
    { text: "GRABADO PERSONALIZADO DE CORTESÍA", type: "diamond" },
    { text: "CERTIFICACIÓN GIA INCLUIDA", type: "emerald" },
    { text: "LIMPIEZA VITALICIA EN TIENDA", type: "diamond" },
  ];

  const TickerGroup = () => (
    <div className="flex items-center gap-8 px-4">
      {items.map((item, i) => (
        <div key={i} className="flex items-center gap-8">
          <span className="font-serif text-[11px] md:text-[12px] tracking-[0.3em] uppercase bg-gradient-to-r from-[#D4AF37] via-[#FFF5D1] to-[#D4AF37] bg-clip-text text-transparent font-medium">
            {item.text}
          </span>
          <div className="relative">
             {/* Glow behind the gem */}
             <div className={`absolute inset-0 blur-sm rounded-full ${item.type === 'emerald' ? 'bg-emerald-500/50' : 'bg-sky-200/50'}`}></div>
             <Gem 
               size={14} 
               className={`relative z-10 ${item.type === 'emerald' ? 'text-emerald-400 fill-emerald-900' : 'text-sky-100 fill-sky-100/30'}`} 
               strokeWidth={1.5}
             />
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="bg-[#050505] py-3.5 overflow-hidden whitespace-nowrap border-b border-[#D4AF37]/20 relative">
      {/* Shine overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-pulse pointer-events-none z-10"></div>
      
      <div className="inline-flex animate-[ticker_40s_linear_infinite] items-center relative z-20">
        <TickerGroup />
        <TickerGroup />
        <TickerGroup />
        <TickerGroup />
      </div>
    </div>
  );
}
