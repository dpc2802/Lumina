"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import NextLink from "next/link";
import { ArrowLeft, Heart, ShoppingBag, ShieldCheck, Truck, RotateCcw, Diamond, Droplet, Star, ArrowDown } from "lucide-react";
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
  const yImage = useTransform(scrollYProgress, [0, 1], [0, 300]);
  const opacityImage = useTransform(scrollYProgress, [0, 0.5], [1, 0.3]);
  const scaleImage = useTransform(scrollYProgress, [0, 1], [1, 1.2]);

  const isWishlisted = wishlistItems.some(item => item.id === product.id);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      if (heroRef.current) {
        setShowStickyCart(window.scrollY > heroRef.current.offsetHeight);
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
      <nav className={`fixed top-0 w-full z-[100] transition-all duration-1000 h-24 flex items-center px-6 md:px-16 ${scrolled ? 'bg-white/80 backdrop-blur-xl border-b border-charcoal/5 shadow-sm' : 'bg-transparent'}`}>
        <NextLink href="/coleccion" className="flex items-center gap-3 text-[10px] tracking-[4px] uppercase hover:text-[#C5A059] transition-colors flex-1 font-medium group">
          <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-2" /> 
          <span className="hidden md:inline">El Catálogo</span>
        </NextLink>
        <NextLink href="/" className="font-serif text-2xl md:text-3xl tracking-[0.3em] uppercase text-center flex-1">
          Lumina
        </NextLink>
        <div className="flex-1 flex justify-end gap-6">
          <button onClick={() => toggleWishlist(product)} className="w-10 h-10 rounded-full border border-charcoal/10 flex items-center justify-center hover:border-[#C5A059] hover:bg-[#C5A059]/5 transition-all group">
            <Heart size={16} className={`transition-colors ${isWishlisted ? "fill-[#C5A059] text-[#C5A059]" : "text-charcoal group-hover:text-[#C5A059]"}`} strokeWidth={1.5} />
          </button>
        </div>
      </nav>

      {/* Hero Section - Magazine Cover Style */}
      <section ref={heroRef} className="relative w-full h-[100vh] flex flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-[#F5F4F0] to-[#FDFCFB]">
        {/* Massive Background Typography */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 0.03, scale: 1 }} transition={{ duration: 2 }}
          className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none"
        >
          <h1 className="font-serif text-[15vw] leading-none whitespace-nowrap text-charcoal">HAUTE JOAILLERIE</h1>
        </motion.div>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 h-full flex flex-col justify-center items-center mt-12">
          
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.2 }} className="text-center mb-8 z-20">
            <span className="text-[10px] tracking-[6px] uppercase text-[#C5A059] font-medium block mb-4">Pieza Exclusiva • {product.category}</span>
            <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl text-charcoal font-light leading-[1.1] tracking-tighter">
              {product.name}
            </h1>
          </motion.div>

          <motion.div style={{ y: yImage, opacity: opacityImage, scale: scaleImage }} className="relative w-full max-w-2xl h-[50vh] md:h-[60vh] z-10 group cursor-crosshair">
            <div className="absolute inset-0 bg-rg/5 rounded-full blur-[100px] -z-10 group-hover:bg-[#C5A059]/20 transition-colors duration-1000"></div>
            <Image src={product.image} alt={product.name} fill className="object-contain drop-shadow-[0_30px_50px_rgba(0,0,0,0.2)]" priority />
          </motion.div>

        </div>

        {/* Scroll Indicator */}
        <motion.div 
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2, duration: 1 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 text-charcoal/40"
        >
          <span className="text-[9px] tracking-[3px] uppercase">Descubrir</span>
          <ArrowDown size={16} className="animate-bounce" strokeWidth={1} />
        </motion.div>
      </section>

      {/* The Price & CTA Section (Editorial Block) */}
      <section className="py-20 bg-white border-y border-charcoal/5 relative z-20">
        <div className="max-w-6xl mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-12">
          
          <div className="flex-1">
            <p className="font-serif text-4xl md:text-5xl text-charcoal tracking-wide mb-2">
              ${Number(product.price).toLocaleString('es-ES')} <span className="text-sm font-sans uppercase tracking-[3px] text-charcoal/40">USD</span>
            </p>
            {product.oldPrice && (
              <p className="font-serif text-xl text-charcoal/30 line-through">
                ${Number(product.oldPrice).toLocaleString('es-ES')}
              </p>
            )}
          </div>

          <div className="flex-1 flex flex-col items-center md:items-end w-full">
            <button 
              onClick={() => addToCart(product)}
              disabled={product.stock === 0}
              className={`w-full md:w-auto px-16 py-6 flex items-center justify-center gap-4 text-[11px] tracking-[4px] uppercase transition-all duration-700 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] hover:shadow-[0_20px_40px_-15px_rgba(197,160,89,0.4)] ${product.stock === 0 ? 'bg-[#F5F4F0] text-charcoal/40 cursor-not-allowed border border-charcoal/10' : 'bg-charcoal text-white hover:bg-[#C5A059]'}`}
            >
              {product.stock === 0 ? 'Agotado Temporalmente' : 'Adquirir Obra'} 
            </button>
            {product.stock > 0 && product.stock <= 5 && (
               <div className="mt-4 flex items-center gap-2">
                 <span className="w-2 h-2 rounded-full bg-[#C5A059] animate-pulse"></span>
                 <p className="text-[9px] tracking-widest text-charcoal/60 uppercase">
                   Últimas {product.stock} piezas a nivel mundial
                 </p>
               </div>
            )}
          </div>
        </div>
      </section>

      {/* The Story - Asymmetrical Editorial */}
      <section className="py-32 px-6 md:px-12 bg-[#FDFCFB] overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-20 items-center">
          <div className="lg:w-1/2 relative">
            <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 1.5 }} className="relative z-10 bg-white p-12 md:p-20 shadow-2xl border border-charcoal/5">
              <span className="text-[10px] tracking-[5px] uppercase text-[#C5A059] block mb-8 font-medium">La Inspiración</span>
              <h2 className="font-serif text-3xl md:text-5xl text-charcoal leading-[1.2] mb-10">
                La perfección no es un detalle, es la esencia de Lumina.
              </h2>
              <div className="w-12 h-[1px] bg-[#C5A059] mb-10"></div>
              <p className="text-charcoal/60 font-light leading-loose text-lg">
                {product.description || "Diseñada como un tributo a la arquitectura moderna y la herencia orfebre europea. Esta pieza es el resultado de cientos de horas de diseño meticuloso, forjando un equilibrio absoluto entre la audacia visual y la comodidad infinita."}
              </p>
            </motion.div>
            {/* Background decorative image */}
            <div className="absolute -top-20 -left-20 w-full h-full bg-[url('https://images.unsplash.com/photo-1611085583191-a3b181a88401?q=80&w=1000&auto=format&fit=crop')] bg-cover opacity-10 blur-sm -z-10 hidden md:block"></div>
          </div>

          <div className="lg:w-1/2 w-full grid grid-cols-2 gap-8">
            <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 1 }} className="bg-[#F5F4F0] p-8 md:p-12 aspect-square flex flex-col justify-center items-center text-center">
              <Diamond size={32} className="text-[#C5A059] mb-6" strokeWidth={1} />
              <h3 className="font-serif text-xl mb-3">Pureza Absoluta</h3>
              <p className="text-[10px] uppercase tracking-[2px] text-charcoal/50 leading-relaxed">Selección manual bajo microscopio de las gemas más extraordinarias.</p>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 1, delay: 0.2 }} className="bg-charcoal text-white p-8 md:p-12 aspect-square flex flex-col justify-center items-center text-center mt-12">
              <Droplet size={32} className="text-[#C5A059] mb-6" strokeWidth={1} />
              <h3 className="font-serif text-xl mb-3">El Metal</h3>
              <p className="text-[10px] uppercase tracking-[2px] text-white/50 leading-relaxed">{product.material} de conflicto cero (Conflict-Free).</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Dark Technical Specifications Section */}
      <section className="py-32 bg-charcoal text-white relative">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#C5A059]/10 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#C5A059]/5 rounded-full blur-[120px] pointer-events-none"></div>
        
        <div className="max-w-6xl mx-auto px-6 md:px-12 relative z-10">
          <div className="text-center mb-24">
            <span className="text-[10px] tracking-[6px] uppercase text-[#C5A059] block mb-6 font-medium">Especificaciones</span>
            <h2 className="font-serif text-4xl md:text-5xl font-light">Anatomía de la Obra</h2>
            <div className="w-16 h-[1px] bg-[#C5A059]/50 mx-auto mt-10"></div>
          </div>

          <div className="grid md:grid-cols-3 gap-y-16 gap-x-12">
            
            <div className="border-l border-white/10 pl-8">
              <h4 className="text-[10px] tracking-[4px] uppercase text-white/40 mb-2">Fundición</h4>
              <p className="font-serif text-2xl text-white">{product.material}</p>
              <p className="text-sm text-white/50 font-light mt-4 leading-relaxed">Forjado en cámaras de presión controlada para evitar la más mínima porosidad en el metal.</p>
            </div>
            
            <div className="border-l border-white/10 pl-8">
              <h4 className="text-[10px] tracking-[4px] uppercase text-white/40 mb-2">Acabado</h4>
              <p className="font-serif text-2xl text-white">Pulido Espejo (Mirror-Polish)</p>
              <p className="text-sm text-white/50 font-light mt-4 leading-relaxed">Más de 40 horas de pulido manual con hilos de seda para un brillo inmaculado y reflejo absoluto.</p>
            </div>
            
            <div className="border-l border-white/10 pl-8">
              <h4 className="text-[10px] tracking-[4px] uppercase text-white/40 mb-2">Garantía</h4>
              <p className="font-serif text-2xl text-[#C5A059]">Lumina Lifetime</p>
              <p className="text-sm text-white/50 font-light mt-4 leading-relaxed">Cobertura vitalicia que incluye limpieza ultrasónica, pulido anual y revisión microscópica de engastes.</p>
            </div>

          </div>
        </div>
      </section>

      {/* Trust & Guarantees Bar */}
      <section className="py-16 bg-[#F5F4F0] border-y border-charcoal/5">
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-wrap justify-center gap-12 md:gap-24">
          <div className="flex items-center gap-4 grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all">
            <ShieldCheck size={28} className="text-[#C5A059]" strokeWidth={1} />
            <span className="text-[10px] tracking-[3px] uppercase font-medium">Certificado Oficial</span>
          </div>
          <div className="flex items-center gap-4 grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all">
            <Truck size={28} className="text-[#C5A059]" strokeWidth={1} />
            <span className="text-[10px] tracking-[3px] uppercase font-medium">Entrega Blindada</span>
          </div>
          <div className="flex items-center gap-4 grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all">
            <Star size={28} className="text-[#C5A059]" strokeWidth={1} />
            <span className="text-[10px] tracking-[3px] uppercase font-medium">Calidad Museo</span>
          </div>
        </div>
      </section>

      {/* Floating Action Bar (Sticky at bottom on scroll) */}
      <AnimatePresence>
        {showStickyCart && (
          <motion.div 
            initial={{ y: 100, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 100, opacity: 0 }} transition={{ duration: 0.5 }}
            className="fixed bottom-0 left-0 w-full z-50 bg-white/90 backdrop-blur-xl border-t border-charcoal/10 shadow-[0_-10px_40px_rgba(0,0,0,0.05)] py-4 px-6 md:px-12"
          >
            <div className="max-w-7xl mx-auto flex items-center justify-between">
              <div className="hidden md:flex items-center gap-6">
                <div className="w-12 h-12 relative bg-[#F5F4F0]">
                  <Image src={product.image} alt={product.name} fill className="object-contain mix-blend-multiply p-1" />
                </div>
                <div>
                  <h4 className="font-serif text-lg text-charcoal">{product.name}</h4>
                  <p className="text-[10px] tracking-[2px] uppercase text-[#C5A059]">{product.category}</p>
                </div>
              </div>
              
              <div className="flex items-center justify-between w-full md:w-auto gap-8">
                <p className="font-serif text-xl md:text-2xl text-charcoal">${Number(product.price).toLocaleString('es-ES')}</p>
                <button 
                  onClick={() => addToCart(product)}
                  disabled={product.stock === 0}
                  className={`px-8 py-4 flex items-center justify-center gap-3 text-[10px] tracking-[3px] uppercase transition-all duration-500 ${product.stock === 0 ? 'bg-[#F5F4F0] text-charcoal/40 cursor-not-allowed' : 'bg-charcoal text-white hover:bg-[#C5A059]'}`}
                >
                  {product.stock === 0 ? 'Agotado' : 'Añadir'} <ShoppingBag size={14} />
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
