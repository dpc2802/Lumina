"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import NextLink from "next/link";
import { ArrowLeft, Heart, ShoppingBag, ShieldCheck, Truck, Diamond, Droplet, Star, ArrowDown } from "lucide-react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useCart } from "@/components/CartContext";
import Footer from "@/components/Footer";

export default function ProductoClient({ product }: { product: any }) {
  const { addToCart } = useCart();
  const [wishlistItems, setWishlistItems] = useState<any[]>([]);
  const [scrolled, setScrolled] = useState(false);
  const [showStickyCart, setShowStickyCart] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll();
  const yImage = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const opacityImage = useTransform(scrollYProgress, [0, 0.5], [1, 0.5]);

  const isWishlisted = wishlistItems.some(item => item.id === product.id);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
      if (heroRef.current) {
        setShowStickyCart(window.scrollY > heroRef.current.offsetHeight * 0.8);
      }
    };
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

  return (
    <div className="min-h-screen bg-[#FDFCFB] font-sans text-charcoal flex flex-col selection:bg-[#C5A059] selection:text-white">
      
      {/* Editorial Navigation */}
      <nav className={`fixed top-0 w-full z-[100] transition-all duration-500 h-16 md:h-20 flex items-center px-4 md:px-12 ${scrolled ? 'bg-white/90 backdrop-blur-md border-b border-charcoal/5 shadow-sm' : 'bg-transparent'}`}>
        <NextLink href="/coleccion" className="flex items-center gap-2 text-[10px] md:text-[11px] tracking-[2px] uppercase hover:text-[#C5A059] transition-colors flex-1 font-medium group">
          <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-1" /> 
          <span className="hidden sm:inline">Colección</span>
        </NextLink>
        <NextLink href="/" className="font-serif text-xl md:text-2xl tracking-[0.2em] uppercase text-center flex-1 shrink-0">
          Lumina
        </NextLink>
        <div className="flex-1 flex justify-end gap-4">
          <button onClick={() => toggleWishlist(product)} className="w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-end md:justify-center hover:text-[#C5A059] transition-all group">
            <Heart size={18} className={`transition-colors ${isWishlisted ? "fill-[#C5A059] text-[#C5A059]" : "text-charcoal group-hover:text-[#C5A059]"}`} strokeWidth={1.5} />
          </button>
        </div>
      </nav>

      {/* Hero Section - Compact Mobile Editorial */}
      <section ref={heroRef} className="relative w-full min-h-[90vh] md:min-h-[100vh] flex flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-[#F5F4F0] to-[#FDFCFB] pt-16">
        
        {/* Background Typography - Hidden on very small screens, tighter on medium */}
        <motion.div 
          initial={{ opacity: 0 }} animate={{ opacity: 0.03 }} transition={{ duration: 2 }}
          className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none hidden sm:flex"
        >
          <h1 className="font-serif text-[12vw] leading-none whitespace-nowrap text-charcoal">HAUTE JOAILLERIE</h1>
        </motion.div>

        <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 h-full flex flex-col justify-center items-center">
          
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="text-center mb-4 md:mb-8 z-20 mt-4 md:mt-0">
            <span className="text-[9px] md:text-[10px] tracking-[4px] uppercase text-[#C5A059] font-medium block mb-3 md:mb-4">
              Pieza Exclusiva • {product.category}
            </span>
            <h1 className="font-serif text-4xl sm:text-5xl md:text-7xl text-charcoal font-light leading-tight tracking-tight px-2">
              {product.name}
            </h1>
          </motion.div>

          <motion.div style={{ y: yImage, opacity: opacityImage }} className="relative w-full max-w-md md:max-w-xl h-[40vh] sm:h-[45vh] md:h-[55vh] z-10 group mt-4 md:mt-0">
            <div className="absolute inset-0 bg-rg/5 rounded-full blur-[60px] md:blur-[100px] -z-10 group-hover:bg-[#C5A059]/10 transition-colors duration-1000"></div>
            <Image src={product.image} alt={product.name} fill className="object-contain drop-shadow-xl md:drop-shadow-[0_20px_40px_rgba(0,0,0,0.15)]" priority />
          </motion.div>

        </div>

        {/* Scroll Indicator */}
        <motion.div 
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1, duration: 1 }}
          className="absolute bottom-6 md:bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 md:gap-4 text-charcoal/40"
        >
          <span className="text-[8px] md:text-[9px] tracking-[2px] uppercase">Descubrir</span>
          <ArrowDown size={14} className="animate-bounce" strokeWidth={1} />
        </motion.div>
      </section>

      {/* The Price & CTA Section (Editorial Block) */}
      <section className="py-10 md:py-16 bg-white border-y border-charcoal/5 relative z-20 shadow-[0_-10px_30px_rgba(0,0,0,0.02)]">
        <div className="max-w-5xl mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-6 md:gap-12">
          
          <div className="text-center md:text-left">
            <p className="font-serif text-3xl md:text-4xl text-charcoal tracking-wide mb-1 md:mb-2">
              ${Number(product.price).toLocaleString('es-ES')} <span className="text-xs font-sans uppercase tracking-[2px] text-charcoal/40">USD</span>
            </p>
            {product.oldPrice && (
              <p className="font-serif text-lg text-charcoal/30 line-through">
                ${Number(product.oldPrice).toLocaleString('es-ES')}
              </p>
            )}
          </div>

          <div className="w-full md:w-auto flex flex-col items-center md:items-end">
            <button 
              onClick={() => addToCart(product)}
              disabled={product.stock === 0}
              className={`w-full md:w-auto px-10 py-5 flex items-center justify-center gap-3 text-[10px] md:text-[11px] tracking-[3px] uppercase transition-all duration-300 shadow-lg hover:shadow-xl ${product.stock === 0 ? 'bg-[#F5F4F0] text-charcoal/40 cursor-not-allowed border border-charcoal/10' : 'bg-charcoal text-white hover:bg-[#C5A059]'}`}
            >
              {product.stock === 0 ? 'Agotado Temporalmente' : 'Adquirir Obra'} 
            </button>
            {product.stock > 0 && product.stock <= 5 && (
               <div className="mt-3 flex items-center gap-2">
                 <span className="w-1.5 h-1.5 rounded-full bg-[#C5A059] animate-pulse"></span>
                 <p className="text-[8px] tracking-[2px] text-charcoal/60 uppercase">
                   Últimas {product.stock} piezas a nivel mundial
                 </p>
               </div>
            )}
          </div>
        </div>
      </section>

      {/* The Story - Tighter Asymmetrical Editorial */}
      <section className="py-16 md:py-24 px-4 sm:px-6 md:px-12 bg-[#FDFCFB] overflow-hidden">
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-8 md:gap-16 items-center">
          
          <div className="w-full lg:w-1/2 relative">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.8 }} className="relative z-10 bg-white p-8 md:p-14 shadow-lg border border-charcoal/5">
              <span className="text-[9px] md:text-[10px] tracking-[4px] uppercase text-[#C5A059] block mb-4 md:mb-6 font-medium">La Inspiración</span>
              <h2 className="font-serif text-2xl md:text-4xl text-charcoal leading-snug mb-6">
                La perfección no es un detalle, es la esencia.
              </h2>
              <div className="w-8 h-[1px] bg-[#C5A059] mb-6"></div>
              <p className="text-charcoal/70 font-light leading-relaxed text-sm md:text-base">
                {product.description || "Diseñada como un tributo a la arquitectura moderna y la herencia orfebre europea. Esta pieza es el resultado de cientos de horas de diseño meticuloso, forjando un equilibrio absoluto entre la audacia visual y la comodidad infinita."}
              </p>
            </motion.div>
          </div>

          <div className="w-full lg:w-1/2 grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="bg-[#F5F4F0] py-10 px-6 md:p-10 flex flex-col justify-center items-center text-center">
              <Diamond size={24} className="text-[#C5A059] mb-4" strokeWidth={1} />
              <h3 className="font-serif text-lg md:text-xl mb-2">Pureza Absoluta</h3>
              <p className="text-[9px] uppercase tracking-[1px] text-charcoal/50 leading-relaxed">Selección manual bajo microscopio de las gemas.</p>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }} className="bg-charcoal text-white py-10 px-6 md:p-10 flex flex-col justify-center items-center text-center sm:mt-8">
              <Droplet size={24} className="text-[#C5A059] mb-4" strokeWidth={1} />
              <h3 className="font-serif text-lg md:text-xl mb-2">El Metal</h3>
              <p className="text-[9px] uppercase tracking-[1px] text-white/50 leading-relaxed">{product.material} de conflicto cero (Conflict-Free).</p>
            </motion.div>
          </div>

        </div>
      </section>

      {/* Dark Technical Specifications Section */}
      <section className="py-16 md:py-24 bg-charcoal text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-[#C5A059]/10 rounded-full blur-[80px] pointer-events-none"></div>
        
        <div className="max-w-5xl mx-auto px-6 md:px-12 relative z-10">
          <div className="text-center mb-12 md:mb-20">
            <span className="text-[9px] md:text-[10px] tracking-[4px] uppercase text-[#C5A059] block mb-4 font-medium">Especificaciones</span>
            <h2 className="font-serif text-3xl md:text-4xl font-light">Anatomía de la Obra</h2>
            <div className="w-10 h-[1px] bg-[#C5A059]/50 mx-auto mt-6"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8">
            
            <div className="border-l border-white/10 pl-6 md:pl-8">
              <h4 className="text-[9px] tracking-[3px] uppercase text-white/40 mb-1">Fundición</h4>
              <p className="font-serif text-xl md:text-2xl text-white">{product.material}</p>
              <p className="text-xs text-white/50 font-light mt-2 leading-relaxed">Forjado en cámaras de presión controlada contra porosidad.</p>
            </div>
            
            <div className="border-l border-white/10 pl-6 md:pl-8">
              <h4 className="text-[9px] tracking-[3px] uppercase text-white/40 mb-1">Acabado</h4>
              <p className="font-serif text-xl md:text-2xl text-white">Pulido Espejo</p>
              <p className="text-xs text-white/50 font-light mt-2 leading-relaxed">Más de 40 horas de pulido manual con hilos de seda.</p>
            </div>
            
            <div className="border-l border-white/10 pl-6 md:pl-8">
              <h4 className="text-[9px] tracking-[3px] uppercase text-white/40 mb-1">Garantía</h4>
              <p className="font-serif text-xl md:text-2xl text-[#C5A059]">Lumina Lifetime</p>
              <p className="text-xs text-white/50 font-light mt-2 leading-relaxed">Cobertura vitalicia con limpieza ultrasónica y pulido.</p>
            </div>

          </div>
        </div>
      </section>

      {/* Trust & Guarantees Bar - Compact */}
      <section className="py-10 bg-[#F5F4F0] border-y border-charcoal/5">
        <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row justify-center items-center gap-6 sm:gap-12 md:gap-20">
          <div className="flex items-center gap-3 grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition-all">
            <ShieldCheck size={20} className="text-[#C5A059]" strokeWidth={1.5} />
            <span className="text-[9px] tracking-[2px] uppercase font-medium">Certificado Oficial</span>
          </div>
          <div className="flex items-center gap-3 grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition-all">
            <Truck size={20} className="text-[#C5A059]" strokeWidth={1.5} />
            <span className="text-[9px] tracking-[2px] uppercase font-medium">Entrega Blindada</span>
          </div>
          <div className="flex items-center gap-3 grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition-all">
            <Star size={20} className="text-[#C5A059]" strokeWidth={1.5} />
            <span className="text-[9px] tracking-[2px] uppercase font-medium">Calidad Museo</span>
          </div>
        </div>
      </section>

      {/* Floating Action Bar (Sticky at bottom on scroll) */}
      <AnimatePresence>
        {showStickyCart && (
          <motion.div 
            initial={{ y: 100, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 100, opacity: 0 }} transition={{ duration: 0.3 }}
            className="fixed bottom-0 left-0 w-full z-50 bg-white/95 backdrop-blur-xl border-t border-charcoal/10 shadow-[0_-10px_20px_rgba(0,0,0,0.05)] py-3 md:py-4 px-4 md:px-12"
          >
            <div className="max-w-6xl mx-auto flex items-center justify-between gap-4">
              <div className="hidden sm:flex items-center gap-4">
                <div className="w-10 h-10 relative bg-[#F5F4F0] rounded-sm">
                  <Image src={product.image} alt={product.name} fill className="object-contain mix-blend-multiply p-1" />
                </div>
                <div>
                  <h4 className="font-serif text-sm md:text-base text-charcoal leading-none mb-1">{product.name}</h4>
                  <p className="text-[8px] tracking-[1px] uppercase text-[#C5A059]">{product.category}</p>
                </div>
              </div>
              
              <div className="flex items-center justify-between w-full sm:w-auto gap-4 md:gap-8">
                <div className="flex flex-col sm:block">
                  <p className="font-serif text-lg md:text-xl text-charcoal leading-none">
                    ${Number(product.price).toLocaleString('es-ES')}
                  </p>
                </div>
                <button 
                  onClick={() => addToCart(product)}
                  disabled={product.stock === 0}
                  className={`w-full sm:w-auto px-6 py-3 md:py-4 flex items-center justify-center gap-2 text-[9px] md:text-[10px] tracking-[2px] uppercase transition-all shadow-md ${product.stock === 0 ? 'bg-[#F5F4F0] text-charcoal/40 cursor-not-allowed' : 'bg-charcoal text-white hover:bg-[#C5A059]'}`}
                >
                  {product.stock === 0 ? 'Agotado' : 'Añadir'} <ShoppingBag size={12} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
}
