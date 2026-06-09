"use client";

import NextLink from "next/link";
import { ArrowLeft } from "lucide-react";
import Footer from "@/components/Footer";

export default function Legales() {
  return (
    <div className="min-h-screen flex flex-col bg-pearl font-sans text-charcoal">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-white/90 backdrop-blur-xl shadow-sm h-20 flex items-center px-6 md:px-12 border-b border-charcoal/5">
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
        <h1 className="font-serif text-4xl md:text-5xl font-light tracking-tight mb-4 text-center">Términos y Privacidad</h1>
        <p className="text-xs tracking-[2px] uppercase text-charcoal/40 text-center mb-24">Última actualización: Junio 2026</p>
        
        <div className="prose prose-sm md:prose-base prose-charcoal mx-auto">
          
          {/* Términos Section */}
          <section className="mb-20">
            <h2 className="font-serif text-2xl mb-8 border-b border-charcoal/10 pb-4">1. Términos y Condiciones de Uso</h2>
            <p className="text-sm font-light text-charcoal/80 leading-relaxed mb-6 text-justify">
              El acceso y uso del sitio web de Lumina Alta Joyería, así como la compra de nuestros productos y servicios, están sujetos a los presentes Términos y Condiciones. Al utilizar este sitio, usted acepta vincularse a estas políticas en su totalidad.
            </p>
            <h3 className="font-serif text-lg mt-8 mb-4">Propiedad Intelectual</h3>
            <p className="text-sm font-light text-charcoal/80 leading-relaxed mb-6 text-justify">
              Todos los diseños, fotografías, textos, logotipos y elementos visuales presentes en este sitio son propiedad exclusiva de Lumina Joyas y están protegidos por las leyes internacionales de derechos de autor. Queda estrictamente prohibida su reproducción o distribución sin el consentimiento expreso y por escrito de la marca.
            </p>
            <h3 className="font-serif text-lg mt-8 mb-4">Condiciones de Venta</h3>
            <p className="text-sm font-light text-charcoal/80 leading-relaxed mb-6 text-justify">
              Nos reservamos el derecho de rechazar o cancelar cualquier pedido por razones que incluyen, pero no se limitan a, disponibilidad del producto, errores en la descripción o el precio del producto, o sospecha de transacción fraudulenta.
            </p>
          </section>

          {/* Privacidad Section */}
          <section className="mb-20">
            <h2 className="font-serif text-2xl mb-8 border-b border-charcoal/10 pb-4">2. Política de Privacidad y Confidencialidad</h2>
            <p className="text-sm font-light text-charcoal/80 leading-relaxed mb-6 text-justify">
              En Lumina, la confidencialidad de nuestra clientela es tan preciada como nuestras joyas. Nos comprometemos a proteger su información personal con los más altos estándares de seguridad y encriptación disponibles.
            </p>
            <h3 className="font-serif text-lg mt-8 mb-4">Recopilación de Datos</h3>
            <p className="text-sm font-light text-charcoal/80 leading-relaxed mb-6 text-justify">
              Únicamente recopilamos la información estrictamente necesaria para procesar sus transacciones de alta joyería, asegurar la entrega blindada de sus piezas y proporcionarle un servicio de Concierge personalizado. Sus datos nunca serán vendidos ni cedidos a terceros con fines de marketing ajenos a Lumina.
            </p>
            <h3 className="font-serif text-lg mt-8 mb-4">Servicios 'Bespoke' y Discreción</h3>
            <p className="text-sm font-light text-charcoal/80 leading-relaxed mb-6 text-justify">
              Para encargos especiales, anillos de compromiso y piezas Bespoke, garantizamos discreción absoluta en las comunicaciones. Si requiere que nos comuniquemos por un canal seguro o en horarios específicos para mantener una sorpresa, por favor indíquelo a nuestro Concierge.
            </p>
          </section>

        </div>
      </main>

      <Footer />
    </div>
  );
}
