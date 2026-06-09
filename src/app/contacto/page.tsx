"use client";

import NextLink from "next/link";
import { ArrowLeft, Mail, Phone, MapPin } from "lucide-react";
import Footer from "@/components/Footer";

export default function Contacto() {
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
      <main className="flex-1 pt-40 pb-24 px-6 md:px-12 max-w-[1200px] mx-auto w-full">
        <span className="text-[10px] tracking-[4px] uppercase text-rg mb-6 block text-center">Atención Personalizada</span>
        <h1 className="font-serif text-5xl md:text-7xl font-light tracking-tight mb-16 text-center">Contáctanos</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          
          {/* Form */}
          <div className="bg-white p-8 md:p-12 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.05)] border border-charcoal/5 relative">
            <div className="absolute top-4 left-4 w-3 h-3 border-t border-l border-rg"></div>
            <div className="absolute bottom-4 right-4 w-3 h-3 border-b border-r border-rg"></div>
            
            <h2 className="font-serif text-3xl md:text-4xl mb-10 text-charcoal font-light">Envíanos un mensaje</h2>
            <form className="space-y-8 text-sm font-light">
              <div>
                <label className="block text-[10px] tracking-[2px] uppercase text-charcoal/50 mb-2">Nombre Completo</label>
                <input type="text" className="w-full border-b border-charcoal/20 bg-transparent py-2 outline-none focus:border-rg transition-colors" />
              </div>
              <div>
                <label className="block text-[10px] tracking-[2px] uppercase text-charcoal/50 mb-2">Correo Electrónico</label>
                <input type="email" className="w-full border-b border-charcoal/20 bg-transparent py-2 outline-none focus:border-rg transition-colors" />
              </div>
              <div>
                <label className="block text-[10px] tracking-[2px] uppercase text-charcoal/50 mb-2">Mensaje o Consulta</label>
                <textarea rows={4} className="w-full border-b border-charcoal/20 bg-transparent py-2 outline-none focus:border-rg transition-colors resize-none"></textarea>
              </div>
              <button type="button" className="w-full bg-charcoal text-white py-5 text-[10px] tracking-[4px] uppercase hover:bg-rg transition-colors mt-8">
                Enviar Mensaje
              </button>
            </form>
          </div>
          
          {/* Info */}
          <div className="flex flex-col justify-center gap-12">
            <p className="text-charcoal3 font-light leading-relaxed md:text-lg">
              Nuestros asesores expertos en alta joyería están disponibles para asistirte con consultas sobre piezas exclusivas, pedidos personalizados y detalles de colecciones.
            </p>
            
            <div className="w-12 h-[1px] bg-rg"></div>
            
            <div className="space-y-10">
              <div className="flex items-start gap-6">
                <Mail className="text-rg shrink-0" size={24} strokeWidth={1} />
                <div>
                  <h4 className="text-[10px] tracking-[3px] uppercase text-charcoal mb-2">Email</h4>
                  <p className="text-sm md:text-base text-charcoal/70 font-light">concierge@luminajoyas.com</p>
                </div>
              </div>
              
              <div className="flex items-start gap-6">
                <Phone className="text-rg shrink-0" size={24} strokeWidth={1} />
                <div>
                  <h4 className="text-[10px] tracking-[3px] uppercase text-charcoal mb-2">Teléfono Directo</h4>
                  <p className="text-sm md:text-base text-charcoal/70 font-light">+34 91 123 4567</p>
                  <p className="text-[10px] uppercase tracking-widest text-charcoal/40 mt-2">Lun-Vie, 10am - 7pm CET</p>
                </div>
              </div>
              
              <div className="flex items-start gap-6">
                <MapPin className="text-rg shrink-0" size={24} strokeWidth={1} />
                <div>
                  <h4 className="text-[10px] tracking-[3px] uppercase text-charcoal mb-2">Boutique Insignia</h4>
                  <p className="text-sm md:text-base text-charcoal/70 font-light leading-relaxed">
                    Paseo de Gracia, 45<br/>Barcelona, España
                  </p>
                  <a href="https://wa.link/2tyflm" target="_blank" rel="noopener noreferrer" className="text-[10px] uppercase tracking-widest text-rg mt-2 inline-block cursor-pointer hover:text-charcoal transition-colors">
                    Agendar cita privada
                  </a>
                </div>
              </div>
            </div>
          </div>
          
        </div>
      </main>

      <Footer />
    </div>
  );
}
