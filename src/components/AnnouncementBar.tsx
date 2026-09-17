"use client";

export default function AnnouncementBar() {
  const msg =
    "ENVÍO INTERNACIONAL DE GALA GRATUITO • GRABADO PERSONALIZADO DE CORTESÍA • CERTIFICACIÓN GIA INCLUIDA • LIMPIEZA VITALICIA • ";
  return (
    <div className="bg-[#1A1A1A] text-[#D4AF37] text-[9px] tracking-[4px] uppercase py-2.5 overflow-hidden whitespace-nowrap">
      <div className="inline-block animate-[ticker_40s_linear_infinite]">
        <span className="mr-4">{msg.repeat(4)}</span>
        <span>{msg.repeat(4)}</span>
      </div>
    </div>
  );
}
