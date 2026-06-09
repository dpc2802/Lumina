"use client";

import { useState } from "react";
import NextLink from "next/link";
import { ArrowLeft, ChevronDown } from "lucide-react";
import Footer from "@/components/Footer";

const faqs = [
  { 
    question: "¿Las piezas de Lumina incluyen certificado de autenticidad?", 
    answer: "Absolutamente. Cada joya de Lumina, ya sea de colección o Bespoke, se entrega con un certificado físico sellado e impreso en papel de algodón, firmado por nuestros maestros orfebres. Éste garantiza los quilates del oro, la claridad de los diamantes y la procedencia ética de todos los materiales." 
  },
  { 
    question: "¿Ofrecen servicio de personalización o piezas 'Bespoke'?", 
    answer: "Sí. Nuestro atelier está a su entera disposición para materializar su visión. Puede contactar a nuestro equipo de Concierge para agendar una consulta privada (presencial o virtual), donde nuestros diseñadores esbozarán una pieza única exclusivamente para usted." 
  },
  { 
    question: "¿Cómo puedo asegurar la talla correcta para mi anillo?", 
    answer: "Ofrecemos una guía de tallas exhaustiva. Para piezas de la colección principal, si la talla no es perfecta, ofrecemos un ajuste de talla gratuito dentro de los primeros 30 días posteriores a su recepción." 
  },
  { 
    question: "¿Realizan envíos internacionales asegurados?", 
    answer: "Sí, despachamos a nivel global mediante servicios de logística blindada. Su pieza viaja asegurada por el 100% de su valor comercial hasta el segundo en que usted firma la recepción en su domicilio." 
  },
  { 
    question: "¿Tienen políticas de financiamiento o reserva?", 
    answer: "Para colecciones de alta joyería, ofrecemos la posibilidad de realizar reservas con un depósito del 30%. Nuestro equipo de atención al cliente estará encantado de estructurar un plan de pagos a la medida de sus necesidades." 
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

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
      <main className="flex-1 pt-40 pb-32 px-6 md:px-12 max-w-[800px] mx-auto w-full">
        <span className="text-[10px] tracking-[4px] uppercase text-rg mb-6 block text-center">Transparencia Total</span>
        <h1 className="font-serif text-5xl md:text-7xl font-light tracking-tight mb-8 text-center">Consultas<br/>Frecuentes</h1>
        <p className="text-sm text-charcoal/60 font-light text-center mb-20 max-w-lg mx-auto">
          Encuentre respuestas detalladas sobre nuestros procesos, garantías y servicios exclusivos. Si no halla lo que busca, nuestro equipo de Concierge está a su servicio.
        </p>
        
        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <div 
              key={index} 
              className={`border-b border-charcoal/10 transition-colors duration-500 ${openIndex === index ? 'bg-white shadow-[0_10px_30px_rgba(0,0,0,0.02)] border-transparent' : ''}`}
            >
              <button 
                onClick={() => toggleFAQ(index)}
                className="w-full text-left py-6 px-4 md:px-8 flex justify-between items-center group focus:outline-none"
              >
                <h3 className={`font-serif text-xl md:text-2xl transition-colors duration-300 ${openIndex === index ? 'text-rg' : 'text-charcoal group-hover:text-rg'}`}>
                  {faq.question}
                </h3>
                <ChevronDown 
                  className={`text-charcoal/30 transition-transform duration-500 shrink-0 ${openIndex === index ? 'rotate-180 text-rg' : ''}`} 
                  size={20} 
                  strokeWidth={1.5}
                />
              </button>
              
              <div 
                className={`overflow-hidden transition-all duration-500 ease-in-out ${openIndex === index ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}
              >
                <div className="p-4 md:p-8 pt-0 text-sm md:text-base text-charcoal3 font-light leading-relaxed">
                  <div className="w-8 h-[1px] bg-rg/50 mb-6"></div>
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-24 text-center">
          <p className="text-sm text-charcoal/50 font-light mb-6">¿Aún tiene dudas?</p>
          <NextLink href="/contacto" className="text-[10px] tracking-[3px] uppercase text-charcoal border-b border-charcoal pb-1 hover:text-rg hover:border-rg transition-colors">
            Contactar al Atelier
          </NextLink>
        </div>
      </main>

      <Footer />
    </div>
  );
}
