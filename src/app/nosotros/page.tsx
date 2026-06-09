"use client";

import NextLink from "next/link";
import { ArrowLeft } from "lucide-react";
import Footer from "@/components/Footer";

export default function Nosotros() {
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
      <main className="flex-1 pt-40 pb-24 px-6 md:px-12 max-w-[900px] mx-auto w-full">
        <div className="text-center mb-24 animate-in slide-in-from-bottom-5 fade-in duration-700">
          <span className="text-[10px] tracking-[4px] uppercase text-rg mb-6 block font-medium">Nuestra Herencia</span>
          <h1 className="font-serif text-5xl md:text-7xl font-light tracking-tight text-charcoal leading-[1.1]">Sobre Nosotros</h1>
          <div className="w-16 h-[1px] bg-rg mx-auto mt-10"></div>
        </div>
        
        <div className="space-y-24 animate-in slide-in-from-bottom-10 fade-in duration-1000 delay-300">
          
          {/* Section 1 */}
          <section className="text-center md:text-left md:flex md:gap-16 items-start">
            <h2 className="font-serif text-3xl md:text-4xl md:w-1/3 mb-6 md:mb-0 text-charcoal/80 leading-snug">Nuestra<br/>Filosofía</h2>
            <div className="md:w-2/3 space-y-6 text-charcoal3 font-light leading-relaxed text-sm md:text-base">
              <p>
                Lumina Joyas nació con una visión singular: redefinir la alta joyería contemporánea mediante un enfoque obsesivo en la arquitectura del diseño y la pureza de los materiales.
              </p>
              <p>
                No seguimos tendencias efímeras ni ritmos de moda acelerados. Diseñamos reliquias modernas. Creemos firmemente que una joya no es un simple accesorio temporal, sino un legado tangible diseñado para ser transferido de generación en generación.
              </p>
            </div>
          </section>

          <div className="w-full flex justify-center items-center py-6 opacity-60">
            <div className="w-[30%] max-w-[150px] h-[1px] bg-gradient-to-r from-transparent to-charcoal/20"></div>
            <div className="mx-6 w-1.5 h-1.5 rotate-45 border border-rg"></div>
            <div className="w-[30%] max-w-[150px] h-[1px] bg-gradient-to-l from-transparent to-charcoal/20"></div>
          </div>

          {/* Section 2 */}
          <section className="text-center md:text-left md:flex md:gap-16 items-start">
            <h2 className="font-serif text-3xl md:text-4xl md:w-1/3 mb-6 md:mb-0 text-charcoal/80 leading-snug">El Proceso<br/>y La Ética</h2>
            <div className="md:w-2/3 space-y-6 text-charcoal3 font-light leading-relaxed text-sm md:text-base">
              <p>
                El secreto de nuestra excepcional calidad radica en el hermetismo de nuestro proceso de producción. Trabajamos en exclusiva con un equipo selecto de artesanos altamente capacitados que forjan y pulen cada pieza a mano en entornos de alta precisión.
              </p>
              <p>
                Nuestra promesa de valor se sostiene inquebrantablemente en el abastecimiento ético. Utilizamos exclusivamente oro de 14 y 18 quilates obtenido de zonas libres de conflictos, sometido a estrictos controles de pureza. Así garantizamos que el lujo que ofrendamos hoy no comprometa la integridad del futuro.
              </p>
            </div>
          </section>

          <div className="w-full flex justify-center items-center py-6 opacity-60">
            <div className="w-[30%] max-w-[150px] h-[1px] bg-gradient-to-r from-transparent to-charcoal/20"></div>
            <div className="mx-6 w-1.5 h-1.5 rotate-45 border border-rg"></div>
            <div className="w-[30%] max-w-[150px] h-[1px] bg-gradient-to-l from-transparent to-charcoal/20"></div>
          </div>

          {/* Section 3 */}
          <section className="text-center md:text-left md:flex md:gap-16 items-start">
            <h2 className="font-serif text-3xl md:text-4xl md:w-1/3 mb-6 md:mb-0 text-charcoal/80 leading-snug">Exclusividad<br/>Garantizada</h2>
            <div className="md:w-2/3 space-y-6 text-charcoal3 font-light leading-relaxed text-sm md:text-base">
              <p>
                Para mantener el estándar de excelencia incuestionable que nos define, la producción de Lumina es estrictamente limitada. Cada colección cuenta con un volumen restringido de unidades a nivel mundial, lo que asegura que su pieza no solo sea exquisita, sino genuinamente rara.
              </p>
              <p>
                Nuestros clientes no solo adquieren joyas; adquieren una obra de arte protegida por el anonimato, la máxima discreción y un servicio de guante blanco incomparable.
              </p>
            </div>
          </section>
          
          <div className="pt-16 text-center">
            <NextLink href="/coleccion" className="inline-block bg-charcoal text-white py-5 px-12 text-[10px] tracking-[3px] uppercase hover:bg-rg transition-colors duration-300">
              Explorar el Catálogo
            </NextLink>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
