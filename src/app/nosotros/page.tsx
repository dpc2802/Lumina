"use client";

import NextLink from "next/link";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import Footer from "@/components/Footer";

export default function Nosotros() {
  return (
    <div className="min-h-screen flex flex-col bg-pearl font-sans text-charcoal">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-white/90 backdrop-blur-xl shadow-sm h-20 flex items-center px-6 md:px-12 transition-all">
        <NextLink href="/" className="flex items-center gap-3 text-[10px] tracking-[2px] uppercase hover:text-rg transition-colors flex-1">
          <ArrowLeft size={14} /> Inicio
        </NextLink>
        <NextLink href="/" className="font-serif text-xl md:text-2xl tracking-[0.2em] uppercase text-center flex-1">
          Lumina
        </NextLink>
        <div className="flex-1 flex justify-end">
          <NextLink href="/coleccion" className="text-[10px] tracking-[2px] uppercase hover:text-rg transition-colors hidden md:block">
            Colección
          </NextLink>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative w-full h-[80vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-charcoal"></div>
        <motion.div 
          initial={{ opacity: 0, scale: 1.1 }} animate={{ opacity: 0.6, scale: 1 }} transition={{ duration: 2, ease: "easeOut" }}
          className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1599643477874-5c866f4c2810?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center mix-blend-overlay"
        ></motion.div>
        
        <div className="relative z-10 text-center px-6 mt-20">
          <motion.span initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.5 }} className="text-[10px] tracking-[5px] uppercase text-rg mb-6 block font-medium">
            Maison Lumina
          </motion.span>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.8 }} className="font-serif text-5xl md:text-8xl font-light tracking-tight text-white mb-8">
            El Arte de la <br className="hidden md:block"/> Precisión
          </motion.h1>
          <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 1.5, delay: 1.2 }} className="w-24 h-[1px] bg-rg/50 mx-auto"></motion.div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-32 px-6 md:px-12 bg-white relative">
        <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row gap-16 md:gap-24 items-center">
          <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 1 }} className="md:w-1/2">
            <h2 className="font-serif text-4xl md:text-5xl text-charcoal mb-8 leading-snug">
              Diseñamos reliquias <br/> modernas, no tendencias.
            </h2>
            <div className="space-y-6 text-charcoal/70 font-light leading-relaxed">
              <p>
                Lumina Joyas nació con una visión singular: redefinir la alta joyería contemporánea mediante un enfoque obsesivo en la arquitectura del diseño y la pureza de los materiales. No seguimos ritmos de moda acelerados; creamos obras atemporales.
              </p>
              <p>
                Creemos firmemente que una joya no es un simple accesorio temporal, sino un legado tangible diseñado para ser transferido de generación en generación. Cada ángulo, cada engaste y cada curva es matemática pura fusionada con emoción.
              </p>
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 1 }} className="md:w-1/2 relative h-[500px] w-full bg-[#f8f8f8]">
            <Image src="https://images.unsplash.com/photo-1611085583191-a3b181a88401?q=80&w=1000&auto=format&fit=crop" fill className="object-cover mix-blend-multiply p-8" alt="Artesanía" />
            <div className="absolute top-4 left-4 w-4 h-4 border-t border-l border-rg/50"></div>
            <div className="absolute bottom-4 right-4 w-4 h-4 border-b border-r border-rg/50"></div>
          </motion.div>
        </div>
      </section>

      {/* Ethics & Process */}
      <section className="py-32 px-6 md:px-12 bg-charcoal text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-rg/5 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2"></div>
        <div className="max-w-[1000px] mx-auto text-center relative z-10">
          <span className="text-[10px] tracking-[4px] uppercase text-rg mb-6 block font-medium">Abastecimiento Ético</span>
          <h2 className="font-serif text-4xl md:text-6xl mb-12 font-light">Responsabilidad Inquebrantable</h2>
          <div className="w-16 h-[1px] bg-rg/30 mx-auto mb-12"></div>
          <div className="grid md:grid-cols-2 gap-12 text-left">
            <div>
              <h3 className="font-serif text-2xl text-white mb-4">El Taller</h3>
              <p className="text-white/60 font-light leading-relaxed">
                El secreto de nuestra excepcional calidad radica en el hermetismo de nuestro proceso. Trabajamos en exclusiva con maestros orfebres en entornos de alta precisión (Clean Rooms), forjando cada pieza a mano con tolerancias microscópicas.
              </p>
            </div>
            <div>
              <h3 className="font-serif text-2xl text-white mb-4">La Materia</h3>
              <p className="text-white/60 font-light leading-relaxed">
                Utilizamos exclusivamente oro de 14 y 18 quilates obtenido de zonas libres de conflictos (Conflict-Free Gold), sometido a estrictos controles de pureza. Garantizamos que el lujo de hoy no comprometa la integridad del futuro.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Exclusivity */}
      <section className="py-32 px-6 md:px-12 bg-white text-center">
        <div className="max-w-[800px] mx-auto">
          <h2 className="font-serif text-4xl md:text-5xl text-charcoal mb-8 leading-snug">Exclusividad Garantizada</h2>
          <p className="text-charcoal/70 font-light leading-relaxed mb-16">
            Para mantener nuestro estándar incuestionable, la producción de Lumina es estrictamente limitada. Cada colección cuenta con un volumen restringido de unidades a nivel mundial. Nuestros clientes adquieren una obra de arte protegida por la discreción y un servicio de guante blanco incomparable.
          </p>
          <NextLink href="/coleccion" className="inline-block bg-charcoal text-white py-5 px-12 text-[10px] tracking-[3px] uppercase hover:bg-rg hover:shadow-2xl transition-all duration-300">
            Descubrir la Colección
          </NextLink>
        </div>
      </section>

      <Footer />
    </div>
  );
}
