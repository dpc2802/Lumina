"use client";

import NextLink from "next/link";
import { ArrowLeft, Sparkles, Droplets, Box } from "lucide-react";
import Footer from "@/components/Footer";
import Image from "next/image";

export default function Cuidado() {
  return (
    <div className="min-h-screen flex flex-col bg-pearl font-sans text-charcoal">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-white/90 backdrop-blur-xl shadow-sm h-20 flex items-center px-6 md:px-12">
        <NextLink href="/" className="flex items-center gap-3 text-[10px] tracking-[2px] uppercase hover:text-rg transition-colors flex-1">
          <ArrowLeft size={14} /> Volver
        </NextLink>

        <NextLink href="/" className="font-serif text-xl md:text-2xl tracking-[0.2em] uppercase text-center flex-1">
          Lumina
        </NextLink>
        
        <div className="flex-1"></div>
      </nav>

      {/* Main Content */}
      <main className="flex-1 pt-40 pb-32">
        
        {/* Header Title */}
        <div className="px-6 md:px-12 max-w-[1200px] mx-auto text-center mb-24">
          <span className="text-[10px] tracking-[4px] uppercase text-rg mb-6 block">Mantenimiento de Alta Joyería</span>
          <h1 className="font-serif text-5xl md:text-7xl font-light tracking-tight mb-8">Arte que Perdura</h1>
          <p className="text-sm text-charcoal3 font-light max-w-xl mx-auto leading-relaxed">
            Las piezas de Lumina están concebidas para ser heredadas. Con el cuidado adecuado, la brillantez de su joya se mantendrá inalterable a lo largo de las generaciones.
          </p>
        </div>

        {/* Feature Layout */}
        <div className="px-6 md:px-12 max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 mb-32">
          
          <div className="bg-white p-10 md:p-12 border border-charcoal/5 flex flex-col items-center text-center group hover:border-charcoal/20 transition-colors duration-500">
             <div className="w-16 h-16 bg-pearl rounded-full flex items-center justify-center mb-8 group-hover:bg-rg group-hover:text-white transition-colors duration-500 text-rg">
               <Droplets strokeWidth={1} size={28} />
             </div>
             <h3 className="font-serif text-2xl mb-4">Uso Diario</h3>
             <p className="text-sm font-light text-charcoal/70 leading-relaxed">
               Recomendamos aplicar perfumes, lociones y cosméticos antes de colocarse sus joyas. Evite el contacto con agua clorada, salada o productos químicos domésticos para preservar el rodio y el brillo del oro.
             </p>
          </div>

          <div className="bg-white p-10 md:p-12 border border-charcoal/5 flex flex-col items-center text-center group hover:border-charcoal/20 transition-colors duration-500">
             <div className="w-16 h-16 bg-pearl rounded-full flex items-center justify-center mb-8 group-hover:bg-rg group-hover:text-white transition-colors duration-500 text-rg">
               <Box strokeWidth={1} size={28} />
             </div>
             <h3 className="font-serif text-2xl mb-4">Almacenamiento</h3>
             <p className="text-sm font-light text-charcoal/70 leading-relaxed">
               Cuando no las use, guarde sus piezas de forma individual en el estuche original Lumina o en un joyero forrado de terciopelo. Esto evita que los diamantes rayen los metales u otras gemas más suaves.
             </p>
          </div>

          <div className="bg-white p-10 md:p-12 border border-charcoal/5 flex flex-col items-center text-center group hover:border-charcoal/20 transition-colors duration-500">
             <div className="w-16 h-16 bg-pearl rounded-full flex items-center justify-center mb-8 group-hover:bg-rg group-hover:text-white transition-colors duration-500 text-rg">
               <Sparkles strokeWidth={1} size={28} />
             </div>
             <h3 className="font-serif text-2xl mb-4">Limpieza Ligera</h3>
             <p className="text-sm font-light text-charcoal/70 leading-relaxed">
               Utilice periódicamente la gamuza de microfibra proporcionada con su compra. Para una limpieza más profunda, emplee agua tibia con un toque de jabón neutro y un cepillo de cerdas ultra suaves.
             </p>
          </div>
          
        </div>

        {/* Spa Section */}
        <div className="w-full bg-charcoal text-white py-24 px-6 md:px-12 relative overflow-hidden">
          {/* Subtle Watermark */}
          <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none">
             <span className="font-serif text-[15rem] md:text-[20rem] text-white tracking-tighter">Lumina</span>
          </div>
          
          <div className="max-w-[800px] mx-auto text-center relative z-10">
            <span className="text-[10px] tracking-[4px] uppercase text-rg mb-6 block">Spa de Joyería</span>
            <h2 className="font-serif text-4xl md:text-5xl font-light mb-8">Servicio de Mantenimiento Profesional</h2>
            <p className="text-white/70 font-light leading-relaxed mb-12 max-w-2xl mx-auto">
              Como miembro de la familia Lumina, usted tiene derecho a una revisión técnica y limpieza ultrasónica anual de cortesía en cualquiera de nuestras boutiques. Revisaremos los engastes y devolveremos a su joya el resplandor del primer día.
            </p>
            <button className="bg-white text-charcoal py-4 px-12 text-[10px] tracking-[3px] uppercase hover:bg-rg hover:text-white transition-colors duration-500">
              Solicitar Mantenimiento
            </button>
          </div>
        </div>

      </main>

      <Footer />
    </div>
  );
}
