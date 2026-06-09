"use client";

import NextLink from "next/link";
import { ArrowLeft, Package, RotateCcw, ShieldCheck } from "lucide-react";
import Footer from "@/components/Footer";

export default function Envios() {
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
      <main className="flex-1 pt-40 pb-32 px-6 md:px-12 max-w-[1000px] mx-auto w-full">
        <span className="text-[10px] tracking-[4px] uppercase text-rg mb-6 block text-center">Logística de Lujo</span>
        <h1 className="font-serif text-5xl md:text-7xl font-light tracking-tight mb-16 text-center">Envíos y Devoluciones</h1>
        
        <div className="w-16 h-[1px] bg-rg mx-auto mb-24"></div>
        
        <div className="space-y-24">
          
          {/* Envíos Section */}
          <section className="flex flex-col md:flex-row gap-12 md:gap-24">
            <div className="md:w-1/3">
               <div className="w-12 h-12 bg-white flex items-center justify-center border border-charcoal/10 rounded-full mb-6">
                 <Package size={20} className="text-rg" />
               </div>
               <h2 className="font-serif text-3xl mb-4">Servicio de Entrega</h2>
            </div>
            <div className="md:w-2/3 prose prose-sm prose-charcoal">
               <p className="text-charcoal3 font-light leading-relaxed mb-6">
                 Cada pieza de Lumina es tratada con el mayor rigor y confidencialidad. Nuestros envíos son gestionados a través de un servicio de mensajería blindada internacional, asegurando que su joya llegue en perfectas condiciones y con total discreción.
               </p>
               <div className="bg-white p-8 border border-charcoal/5">
                 <ul className="space-y-6">
                   <li className="flex justify-between items-center border-b border-charcoal/5 pb-4">
                     <div>
                       <span className="block text-[10px] tracking-[2px] uppercase mb-1">Envío Estándar (Europa)</span>
                       <span className="text-charcoal/50 text-xs font-light">3 - 5 días hábiles</span>
                     </div>
                     <span className="font-serif text-lg">Cortesía</span>
                   </li>
                   <li className="flex justify-between items-center border-b border-charcoal/5 pb-4">
                     <div>
                       <span className="block text-[10px] tracking-[2px] uppercase mb-1">Envío Exprés (Global)</span>
                       <span className="text-charcoal/50 text-xs font-light">24 - 48 horas</span>
                     </div>
                     <span className="font-serif text-lg">$45</span>
                   </li>
                 </ul>
               </div>
            </div>
          </section>

          {/* Devoluciones Section */}
          <section className="flex flex-col md:flex-row gap-12 md:gap-24">
            <div className="md:w-1/3">
               <div className="w-12 h-12 bg-white flex items-center justify-center border border-charcoal/10 rounded-full mb-6">
                 <RotateCcw size={20} className="text-rg" />
               </div>
               <h2 className="font-serif text-3xl mb-4">Políticas de Devolución</h2>
            </div>
            <div className="md:w-2/3 prose prose-sm prose-charcoal">
               <p className="text-charcoal3 font-light leading-relaxed mb-6">
                 Entendemos que la elección de una joya es un asunto íntimo. Por ello, ofrecemos un período de reflexión de 30 días naturales a partir de la fecha de entrega para devoluciones o cambios.
               </p>
               <p className="text-charcoal3 font-light leading-relaxed mb-6">
                 Las piezas deben ser devueltas en su estado original, sin signos de uso y con su certificado de autenticidad y embalaje intactos. Para las piezas Bespoke o grabadas, no se aceptan devoluciones dada su naturaleza personalizada.
               </p>
               <button className="text-[10px] tracking-[2px] uppercase text-charcoal border-b border-charcoal pb-1 hover:text-rg hover:border-rg transition-colors mt-4">
                 Iniciar una Devolución
               </button>
            </div>
          </section>

          {/* Seguridad Section */}
          <section className="flex flex-col md:flex-row gap-12 md:gap-24">
            <div className="md:w-1/3">
               <div className="w-12 h-12 bg-white flex items-center justify-center border border-charcoal/10 rounded-full mb-6">
                 <ShieldCheck size={20} className="text-rg" />
               </div>
               <h2 className="font-serif text-3xl mb-4">Seguro Total</h2>
            </div>
            <div className="md:w-2/3 prose prose-sm prose-charcoal">
               <p className="text-charcoal3 font-light leading-relaxed">
                 Desde el momento en que su joya abandona nuestro atelier hasta que usted firma la recepción, la pieza está asegurada al 100% de su valor comercial. Todo riesgo asociado con el tránsito es asumido enteramente por Lumina.
               </p>
            </div>
          </section>

        </div>
      </main>

      <Footer />
    </div>
  );
}
