"use client";

import { useState } from "react";
import Image from "next/image";
import NextLink from "next/link";
import { ArrowLeft, Heart, ShoppingBag, ChevronDown, ChevronUp, ArrowRight, ShieldCheck, Truck, RotateCcw } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/components/CartContext";
import Footer from "@/components/Footer";

export default function ProductoClient({ product }: { product: any }) {
  const { addToCart } = useCart();
  const [wishlistItems, setWishlistItems] = useState<any[]>([]);
  const [activeAccordion, setActiveAccordion] = useState<string | null>("description");
  
  const isWishlisted = wishlistItems.some(item => item.id === product.id);

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
    <div className="min-h-screen bg-pearl font-sans text-charcoal flex flex-col">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-white/90 backdrop-blur-xl shadow-sm h-20 flex items-center px-6 md:px-12 transition-all">
        <NextLink href="/coleccion" className="flex items-center gap-3 text-[10px] tracking-[2px] uppercase hover:text-rg transition-colors flex-1 font-medium">
          <ArrowLeft size={14} /> Colección
        </NextLink>
        <NextLink href="/" className="font-serif text-xl md:text-2xl tracking-[0.2em] uppercase text-center flex-1">
          Lumina
        </NextLink>
        <div className="flex-1 flex justify-end gap-6">
          <button onClick={() => toggleWishlist(product)} className="hover:text-rg transition-colors">
            <Heart size={18} className={isWishlisted ? "fill-rg text-rg" : "text-charcoal"} strokeWidth={1.5} />
          </button>
        </div>
      </nav>

      {/* Main PDP Layout - Split Screen on Desktop */}
      <main className="flex-1 pt-20 flex flex-col lg:flex-row">
        
        {/* Left Side: Sticky Image Gallery */}
        <div className="w-full lg:w-1/2 lg:h-[calc(100vh-80px)] lg:sticky lg:top-20 bg-[#f8f8f8] relative overflow-hidden flex items-center justify-center p-8 md:p-16">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1, ease: "easeOut" }}
            className="relative w-full h-[50vh] lg:h-full max-w-2xl"
          >
            <Image src={product.image} alt={product.name} fill className="object-contain mix-blend-multiply drop-shadow-2xl" priority />
          </motion.div>
          
          {/* Subtle Decorative Accents */}
          <div className="absolute top-8 left-8 w-4 h-4 border-t border-l border-charcoal/20"></div>
          <div className="absolute bottom-8 right-8 w-4 h-4 border-b border-r border-charcoal/20"></div>
          <div className="absolute top-1/2 left-4 -translate-y-1/2 text-[8px] tracking-[5px] uppercase text-charcoal/30 -rotate-90 origin-left">
            Lumina Haute Joaillerie
          </div>
        </div>

        {/* Right Side: Product Details & Storytelling */}
        <div className="w-full lg:w-1/2 bg-white px-6 py-12 md:p-16 lg:p-24 flex flex-col justify-start">
          
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}>
            {/* Breadcrumbs & Category */}
            <div className="flex items-center gap-2 text-[9px] tracking-[3px] uppercase text-charcoal/50 mb-6">
              <NextLink href="/" className="hover:text-charcoal transition-colors">Inicio</NextLink>
              <span>/</span>
              <NextLink href="/coleccion" className="hover:text-charcoal transition-colors">Colección</NextLink>
              <span>/</span>
              <span className="text-rg">{product.category}</span>
            </div>

            {/* Title & Price */}
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-charcoal mb-4 font-light leading-tight">
              {product.name}
            </h1>
            
            <div className="flex items-end gap-4 mb-10">
              <p className="font-serif text-2xl md:text-3xl text-charcoal tracking-wide">
                ${Number(product.price).toLocaleString('es-ES')}
              </p>
              {product.oldPrice && (
                <p className="font-serif text-lg text-charcoal/40 line-through mb-1">
                  ${Number(product.oldPrice).toLocaleString('es-ES')}
                </p>
              )}
            </div>

            <div className="w-12 h-[1px] bg-rg mb-10"></div>

            {/* Badges / Value Props */}
            <div className="grid grid-cols-2 gap-4 mb-12">
              <div className="flex items-center gap-3 border border-charcoal/5 p-4 bg-pearl/30">
                <ShieldCheck size={18} className="text-rg" strokeWidth={1} />
                <span className="text-[10px] tracking-[2px] uppercase text-charcoal/80">Certificado de Autenticidad</span>
              </div>
              <div className="flex items-center gap-3 border border-charcoal/5 p-4 bg-pearl/30">
                <Truck size={18} className="text-rg" strokeWidth={1} />
                <span className="text-[10px] tracking-[2px] uppercase text-charcoal/80">Envío Asegurado Gratuito</span>
              </div>
            </div>

            {/* Add to Cart Sticky / Normal Button */}
            <div className="mb-16 sticky bottom-6 z-40 lg:static">
              <button 
                onClick={() => addToCart(product)}
                disabled={product.stock === 0}
                className={`w-full py-5 flex items-center justify-center gap-4 text-[11px] tracking-[4px] uppercase transition-all duration-500 shadow-xl lg:shadow-none ${product.stock === 0 ? 'bg-charcoal/30 text-white cursor-not-allowed' : 'bg-charcoal text-white hover:bg-rg hover:shadow-2xl'}`}
              >
                {product.stock === 0 ? 'Agotado Temporalmente' : 'Añadir a la Cesta'} 
                {product.stock > 0 && <ShoppingBag size={14} />}
              </button>
            </div>

            {/* Accordions for Details */}
            <div className="border-t border-charcoal/10">
              
              {/* Accordion 1: Description */}
              <div className="border-b border-charcoal/10">
                <button 
                  onClick={() => toggleAccordion('description')}
                  className="w-full py-6 flex items-center justify-between text-left group"
                >
                  <span className={`text-[11px] tracking-[3px] uppercase transition-colors ${activeAccordion === 'description' ? 'text-rg font-medium' : 'text-charcoal group-hover:text-rg'}`}>La Inspiración</span>
                  {activeAccordion === 'description' ? <ChevronUp size={16} className="text-rg" /> : <ChevronDown size={16} className="text-charcoal/50" />}
                </button>
                <AnimatePresence>
                  {activeAccordion === 'description' && (
                    <motion.div 
                      initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <p className="pb-8 text-charcoal/70 font-light leading-relaxed text-sm">
                        {product.description || "Una pieza concebida bajo los más estrictos estándares de la alta joyería. Su diseño arquitectónico refleja una búsqueda incesante por la perfección estética, convirtiéndose en un tributo tangible al arte moderno."}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Accordion 2: Materials */}
              <div className="border-b border-charcoal/10">
                <button 
                  onClick={() => toggleAccordion('materials')}
                  className="w-full py-6 flex items-center justify-between text-left group"
                >
                  <span className={`text-[11px] tracking-[3px] uppercase transition-colors ${activeAccordion === 'materials' ? 'text-rg font-medium' : 'text-charcoal group-hover:text-rg'}`}>Materiales y Artesanía</span>
                  {activeAccordion === 'materials' ? <ChevronUp size={16} className="text-rg" /> : <ChevronDown size={16} className="text-charcoal/50" />}
                </button>
                <AnimatePresence>
                  {activeAccordion === 'materials' && (
                    <motion.div 
                      initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <ul className="pb-8 space-y-3">
                        <li className="flex items-start gap-3">
                          <div className="w-1 h-1 bg-rg rotate-45 shrink-0 mt-2"></div>
                          <p className="text-sm text-charcoal/70 font-light"><strong className="text-charcoal font-normal">Metal Base:</strong> {product.material}</p>
                        </li>
                        <li className="flex items-start gap-3">
                          <div className="w-1 h-1 bg-rg rotate-45 shrink-0 mt-2"></div>
                          <p className="text-sm text-charcoal/70 font-light"><strong className="text-charcoal font-normal">Fabricación:</strong> Forjado y pulido a mano por maestros orfebres en talleres de circuito cerrado.</p>
                        </li>
                        <li className="flex items-start gap-3">
                          <div className="w-1 h-1 bg-rg rotate-45 shrink-0 mt-2"></div>
                          <p className="text-sm text-charcoal/70 font-light"><strong className="text-charcoal font-normal">Pureza:</strong> Inspección rigurosa de control de calidad bajo estándares internacionales (Hallmarked).</p>
                        </li>
                      </ul>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Accordion 3: Care & Delivery */}
              <div className="border-b border-charcoal/10">
                <button 
                  onClick={() => toggleAccordion('delivery')}
                  className="w-full py-6 flex items-center justify-between text-left group"
                >
                  <span className={`text-[11px] tracking-[3px] uppercase transition-colors ${activeAccordion === 'delivery' ? 'text-rg font-medium' : 'text-charcoal group-hover:text-rg'}`}>Envíos y Cuidados</span>
                  {activeAccordion === 'delivery' ? <ChevronUp size={16} className="text-rg" /> : <ChevronDown size={16} className="text-charcoal/50" />}
                </button>
                <AnimatePresence>
                  {activeAccordion === 'delivery' && (
                    <motion.div 
                      initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="pb-8 text-charcoal/70 font-light leading-relaxed text-sm space-y-4">
                        <p>Cada pieza de Lumina se entrega en nuestra caja icónica sellada a mano, ideal para preservar la joya de la oxidación y humedad.</p>
                        <div className="flex items-center gap-3 mt-4">
                          <RotateCcw size={16} className="text-rg" /> 
                          <span className="text-charcoal font-normal">Política de devoluciones de 30 días garantizada.</span>
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
      
      {/* Footer */}
      <Footer />
    </div>
  );
}
