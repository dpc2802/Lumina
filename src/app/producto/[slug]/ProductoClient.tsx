"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import NextLink from "next/link";
import { ArrowLeft, Heart, ShoppingBag, ChevronDown, ChevronUp, ShieldCheck, Truck, RotateCcw, Gem, Award } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/components/CartContext";
import Footer from "@/components/Footer";

export default function ProductoClient({ product }: { product: any }) {
  const { addToCart } = useCart();
  const [wishlistItems, setWishlistItems] = useState<any[]>([]);
  const [activeAccordion, setActiveAccordion] = useState<string | null>("description");
  const [scrolled, setScrolled] = useState(false);
  
  const isWishlisted = wishlistItems.some(item => item.id === product.id);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleWishlist = (product: any) => {
    if (isWishlisted) {
      setWishlistItems(wishlistItems.filter(item => item.id !== product.id));
    } else {
      setWishlistItems([...wishlistItems, product]);
    }
  };

  const toggleAccordion = (id: string) => {
    if (activeAccordion === id) setActiveAccordion(null);
    else setActiveAccordion(id);
  };

  return (
    <div className="min-h-screen bg-pearl font-sans text-charcoal flex flex-col selection:bg-[#C5A059] selection:text-white">
      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-700 h-24 flex items-center px-6 md:px-12 ${scrolled ? 'bg-white/95 backdrop-blur-md shadow-sm' : 'bg-transparent'}`}>
        <NextLink href="/coleccion" className="flex items-center gap-3 text-[10px] tracking-[3px] uppercase hover:text-[#C5A059] transition-colors flex-1 font-medium">
          <ArrowLeft size={14} /> Colección
        </NextLink>
        <NextLink href="/" className="font-serif text-2xl tracking-[0.3em] uppercase text-center flex-1">
          Lumina
        </NextLink>
        <div className="flex-1 flex justify-end gap-6">
          <button onClick={() => toggleWishlist(product)} className="hover:text-[#C5A059] transition-colors group">
            <Heart size={18} className={`transition-colors ${isWishlisted ? "fill-[#C5A059] text-[#C5A059]" : "text-charcoal group-hover:text-[#C5A059]"}`} strokeWidth={1.5} />
          </button>
        </div>
      </nav>

      {/* Main PDP Layout - Split Screen on Desktop */}
      <main className="flex-1 pt-24 flex flex-col lg:flex-row relative">
        
        {/* Left Side: Sticky Image Gallery */}
        <div className="w-full lg:w-[55%] lg:h-[calc(100vh-96px)] lg:sticky lg:top-24 bg-[#F5F4F0] relative overflow-hidden flex items-center justify-center p-8 md:p-16 border-r border-charcoal/5">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full h-[60vh] lg:h-full max-w-3xl group"
          >
            <Image src={product.image} alt={product.name} fill className="object-contain mix-blend-multiply drop-shadow-2xl transition-transform duration-1000 group-hover:scale-110" priority />
          </motion.div>
          
          {/* Subtle Decorative Accents (Alta Realeza) */}
          <div className="absolute top-12 left-12 w-8 h-8 border-t border-l border-[#C5A059]/40"></div>
          <div className="absolute bottom-12 right-12 w-8 h-8 border-b border-r border-[#C5A059]/40"></div>
          <div className="absolute top-1/2 left-8 -translate-y-1/2 text-[9px] tracking-[6px] uppercase text-charcoal/20 -rotate-90 origin-left whitespace-nowrap">
            Lumina Haute Joaillerie
          </div>
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-[9px] tracking-[4px] uppercase text-[#C5A059]/60">
            Pieza de Colección
          </div>
        </div>

        {/* Right Side: Product Details & Storytelling */}
        <div className="w-full lg:w-[45%] bg-white px-8 py-16 md:px-20 lg:py-24 flex flex-col justify-start min-h-[calc(100vh-96px)]">
          
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }} className="max-w-xl mx-auto w-full">
            
            {/* Breadcrumbs & Category */}
            <div className="flex items-center gap-3 text-[9px] tracking-[4px] uppercase text-charcoal/40 mb-8">
              <NextLink href="/" className="hover:text-[#C5A059] transition-colors">Inicio</NextLink>
              <span className="text-charcoal/20">•</span>
              <NextLink href="/coleccion" className="hover:text-[#C5A059] transition-colors">Colección</NextLink>
              <span className="text-charcoal/20">•</span>
              <span className="text-[#C5A059]">{product.category}</span>
            </div>

            {/* Title & Price */}
            <h1 className="font-serif text-5xl md:text-6xl text-charcoal mb-6 font-light leading-[1.1] tracking-tight">
              {product.name}
            </h1>
            
            <div className="flex items-end gap-5 mb-12">
              <p className="font-serif text-3xl text-charcoal tracking-wide">
                ${Number(product.price).toLocaleString('es-ES')}
              </p>
              {product.oldPrice && (
                <p className="font-serif text-xl text-charcoal/30 line-through mb-1">
                  ${Number(product.oldPrice).toLocaleString('es-ES')}
                </p>
              )}
            </div>

            <div className="w-16 h-[1px] bg-[#C5A059] mb-12"></div>

            {/* Badges / Value Props - Ultra Premium */}
            <div className="grid grid-cols-2 gap-6 mb-16">
              <div className="flex flex-col gap-3">
                <ShieldCheck size={20} className="text-[#C5A059]" strokeWidth={1} />
                <span className="text-[10px] tracking-[2px] uppercase text-charcoal/60 leading-relaxed">Certificado <br/> de Autenticidad</span>
              </div>
              <div className="flex flex-col gap-3">
                <Gem size={20} className="text-[#C5A059]" strokeWidth={1} />
                <span className="text-[10px] tracking-[2px] uppercase text-charcoal/60 leading-relaxed">Diamantes <br/> Éticos (GIA)</span>
              </div>
            </div>

            {/* Add to Cart Sticky / Normal Button */}
            <div className="mb-20 sticky bottom-8 z-40 lg:static">
              <button 
                onClick={() => addToCart(product)}
                disabled={product.stock === 0}
                className={`w-full py-5 flex items-center justify-center gap-4 text-[11px] tracking-[5px] uppercase transition-all duration-700 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] lg:shadow-none hover:shadow-[0_20px_40px_-15px_rgba(197,160,89,0.3)] ${product.stock === 0 ? 'bg-[#F5F4F0] text-charcoal/40 cursor-not-allowed border border-charcoal/10' : 'bg-charcoal text-white hover:bg-[#C5A059]'}`}
              >
                {product.stock === 0 ? 'Agotado Temporalmente' : 'Añadir a la Colección'} 
              </button>
              
              {product.stock > 0 && product.stock <= 3 && (
                <p className="text-center text-[10px] tracking-widest text-[#C5A059] uppercase mt-4">
                  Solo {product.stock} piezas disponibles a nivel mundial
                </p>
              )}
            </div>

            {/* Accordions for Details */}
            <div className="border-t border-charcoal/10">
              
              {/* Accordion 1: Description */}
              <div className="border-b border-charcoal/10">
                <button 
                  onClick={() => toggleAccordion('description')}
                  className="w-full py-7 flex items-center justify-between text-left group"
                >
                  <span className={`text-[10px] tracking-[4px] uppercase transition-colors ${activeAccordion === 'description' ? 'text-[#C5A059] font-medium' : 'text-charcoal group-hover:text-[#C5A059]'}`}>La Obra</span>
                  {activeAccordion === 'description' ? <ChevronUp size={16} className="text-[#C5A059]" /> : <ChevronDown size={16} className="text-charcoal/30" />}
                </button>
                <AnimatePresence>
                  {activeAccordion === 'description' && (
                    <motion.div 
                      initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <p className="pb-8 text-charcoal/60 font-light leading-relaxed text-sm md:text-base">
                        {product.description || "Una pieza concebida bajo los más estrictos estándares de la alta joyería. Su diseño arquitectónico refleja una búsqueda incesante por la perfección estética, convirtiéndose en un tributo tangible al arte moderno y la herencia orfebre."}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Accordion 2: Materials */}
              <div className="border-b border-charcoal/10">
                <button 
                  onClick={() => toggleAccordion('materials')}
                  className="w-full py-7 flex items-center justify-between text-left group"
                >
                  <span className={`text-[10px] tracking-[4px] uppercase transition-colors ${activeAccordion === 'materials' ? 'text-[#C5A059] font-medium' : 'text-charcoal group-hover:text-[#C5A059]'}`}>Artesanía y Materiales</span>
                  {activeAccordion === 'materials' ? <ChevronUp size={16} className="text-[#C5A059]" /> : <ChevronDown size={16} className="text-charcoal/30" />}
                </button>
                <AnimatePresence>
                  {activeAccordion === 'materials' && (
                    <motion.div 
                      initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <ul className="pb-8 space-y-4">
                        <li className="flex items-start gap-4">
                          <div className="w-1.5 h-1.5 bg-[#C5A059] rotate-45 shrink-0 mt-1.5"></div>
                          <p className="text-sm text-charcoal/60 font-light leading-relaxed"><strong className="text-charcoal font-normal">Metal:</strong> {product.material} forjado en cámaras de presión controlada.</p>
                        </li>
                        <li className="flex items-start gap-4">
                          <div className="w-1.5 h-1.5 bg-[#C5A059] rotate-45 shrink-0 mt-1.5"></div>
                          <p className="text-sm text-charcoal/60 font-light leading-relaxed"><strong className="text-charcoal font-normal">Engaste:</strong> Cada gema es ajustada a mano bajo microscopio por nuestros maestros artesanos (Hand-set).</p>
                        </li>
                        <li className="flex items-start gap-4">
                          <div className="w-1.5 h-1.5 bg-[#C5A059] rotate-45 shrink-0 mt-1.5"></div>
                          <p className="text-sm text-charcoal/60 font-light leading-relaxed"><strong className="text-charcoal font-normal">Garantía:</strong> Cobertura vitalicia (Lumina Care) que incluye limpieza, pulido y revisión de engastes anual.</p>
                        </li>
                      </ul>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Accordion 3: Delivery */}
              <div className="border-b border-charcoal/10">
                <button 
                  onClick={() => toggleAccordion('delivery')}
                  className="w-full py-7 flex items-center justify-between text-left group"
                >
                  <span className={`text-[10px] tracking-[4px] uppercase transition-colors ${activeAccordion === 'delivery' ? 'text-[#C5A059] font-medium' : 'text-charcoal group-hover:text-[#C5A059]'}`}>Servicio de Guante Blanco</span>
                  {activeAccordion === 'delivery' ? <ChevronUp size={16} className="text-[#C5A059]" /> : <ChevronDown size={16} className="text-charcoal/30" />}
                </button>
                <AnimatePresence>
                  {activeAccordion === 'delivery' && (
                    <motion.div 
                      initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="pb-8 text-charcoal/60 font-light leading-relaxed text-sm space-y-5">
                        <p>Las creaciones Lumina se entregan de manera segura y confidencial. Todas las piezas viajan aseguradas al 100% de su valor comercial.</p>
                        <div className="flex items-center gap-4 bg-[#F5F4F0] p-5">
                          <Truck size={24} className="text-[#C5A059] shrink-0" strokeWidth={1} /> 
                          <span className="text-charcoal font-normal text-xs uppercase tracking-widest">Entrega Internacional Blindada (3-5 Días Hábiles)</span>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

            </div>

          </motion.div>
        </div>
      </main>

      {/* Brand Heritage Section (Below the fold) */}
      <section className="py-24 md:py-32 bg-charcoal text-white relative flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1599643477874-5c866f4c2810?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center"></div>
        <div className="relative z-10 text-center max-w-3xl px-6">
          <Award size={32} className="text-[#C5A059] mx-auto mb-8" strokeWidth={1} />
          <h2 className="font-serif text-3xl md:text-5xl font-light mb-8 leading-snug">
            La perfección no es un objetivo, es nuestro estándar base.
          </h2>
          <div className="w-16 h-[1px] bg-[#C5A059] mx-auto mb-8"></div>
          <p className="text-white/60 font-light leading-relaxed md:text-lg">
            Descubra el herencia detrás de cada pieza de alta joyería. Desde la selección de las gemas más raras del planeta hasta la fundición del oro en hornos de inducción especializados.
          </p>
          <NextLink href="/nosotros" className="inline-block mt-12 border border-[#C5A059] text-[#C5A059] py-4 px-10 text-[10px] tracking-[4px] uppercase hover:bg-[#C5A059] hover:text-white transition-colors duration-500">
            Descubrir La Maison
          </NextLink>
        </div>
      </section>
      
      <Footer />
    </div>
  );
}
