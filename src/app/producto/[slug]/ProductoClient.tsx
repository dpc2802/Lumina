"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Link as NextLink } from "next-view-transitions";
import { ArrowLeft, Heart, ShoppingBag, ShieldCheck, Truck, RotateCcw, ChevronDown, ChevronUp, Gem } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/components/CartContext";
import Footer from "@/components/Footer";
import ThemeToggle from "@/components/ThemeToggle";

export default function ProductoClient({ product }: { product: any }) {
  const { addToCart } = useCart();
  const [wishlistItems, setWishlistItems] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState<string>("detalles");
  const [activeAccordion, setActiveAccordion] = useState<string | null>("description");
  const [scrolled, setScrolled] = useState(false);
  const [skinTone, setSkinTone] = useState<'blanco' | 'claro' | 'medio' | 'oscuro'>('blanco');
  
  const isWishlisted = wishlistItems.some(item => item.id === product.id);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
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
    <div className="min-h-screen bg-[#FCFBF8] font-sans text-[#1A1A1A] flex flex-col selection:bg-[#D4AF37] selection:text-white">
      
      {/* Elegant Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-500 h-20 flex items-center px-6 md:px-12 ${scrolled ? 'bg-[#FCFBF8]/95 backdrop-blur-md shadow-[0_4px_20px_rgba(0,0,0,0.03)] border-b border-[#1A1A1A]/5' : 'bg-transparent'}`}>
        <NextLink href="/coleccion" className="flex items-center gap-3 text-[11px] tracking-[2px] uppercase hover:text-[#D4AF37] transition-colors flex-1 font-medium">
          <ArrowLeft size={16} strokeWidth={1.5} /> <span className="hidden sm:inline">Colección</span>
        </NextLink>
        <NextLink href="/" className="font-serif text-2xl tracking-[0.25em] uppercase text-center flex-1 shrink-0">
          Lumina
        </NextLink>
        <div className="flex-1 flex justify-end gap-6 items-center">
          <ThemeToggle />
          <button onClick={() => toggleWishlist(product)} className="hover:text-[#D4AF37] transition-colors">
            <Heart size={20} className={isWishlisted ? "fill-[#D4AF37] text-[#D4AF37]" : "text-[#1A1A1A]"} strokeWidth={1} />
          </button>
        </div>
      </nav>

      {/* Main Layout - Classic Split Screen */}
      <main className="flex-1 pt-20 flex flex-col lg:flex-row max-w-[1600px] mx-auto w-full">
        
        {/* Left Gallery Section */}
        <div className="w-full lg:w-1/2 p-4 md:p-12 lg:p-16 lg:sticky lg:top-20 lg:h-[calc(100vh-80px)] flex items-center justify-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}
            className="w-full h-[50vh] md:h-full md:min-h-[60vh] relative bg-white border border-[#1A1A1A]/5 shadow-[0_10px_40px_rgba(0,0,0,0.02)] flex items-center justify-center p-6 md:p-12 group overflow-hidden"
          >
            {/* Subtle frame corners */}
            <div className="absolute top-4 left-4 md:top-6 md:left-6 w-4 h-4 border-t border-l border-[#D4AF37]/40 transition-all duration-700 group-hover:w-8 group-hover:h-8"></div>
            <div className="absolute bottom-4 right-4 md:bottom-6 md:right-6 w-4 h-4 border-b border-r border-[#D4AF37]/40 transition-all duration-700 group-hover:w-8 group-hover:h-8"></div>
            
            <div className="relative w-full h-full">
              <Image 
                src={product.image} 
                alt={product.name} 
                fill 
                className="object-contain mix-blend-multiply drop-shadow-xl transition-transform duration-[2s] group-hover:scale-[1.03]" 
                priority 
              />
            </div>
          </motion.div>
        </div>

        {/* Right Details Section */}
        <div className="w-full lg:w-1/2 p-6 md:p-12 lg:p-20 flex flex-col justify-center">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.2 }} className="max-w-xl mx-auto w-full">
            
            {/* Breadcrumbs */}
            <div className="flex items-center gap-2 text-[10px] tracking-[3px] uppercase text-[#1A1A1A]/40 mb-8">
              <NextLink href="/" className="hover:text-[#D4AF37] transition-colors">Inicio</NextLink>
              <span>/</span>
              <span className="text-[#D4AF37]">{product.category}</span>
            </div>

            {/* Title & Price */}
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-[#1A1A1A] mb-4 font-light leading-tight">
              {product.name}
            </h1>
            
            <p className="text-[11px] tracking-[2px] uppercase text-[#1A1A1A]/50 mb-8">
              Referencia: LU-{product.id.substring(0, 6).toUpperCase()}
            </p>

            <div className="flex items-end gap-4 mb-10">
              <p className="font-serif text-3xl md:text-4xl text-[#1A1A1A]">
                ${Number(product.price).toLocaleString('es-ES')}
              </p>
              {product.oldPrice && (
                <p className="font-serif text-xl text-[#1A1A1A]/30 line-through mb-1">
                  ${Number(product.oldPrice).toLocaleString('es-ES')}
                </p>
              )}
            </div>

            <div className="w-full h-[1px] bg-gradient-to-r from-[#D4AF37]/50 to-transparent mb-10"></div>

            {/* Description */}
            <p className="text-[#1A1A1A]/70 font-light leading-relaxed mb-12 text-sm md:text-base">
              {product.description || "Una obra maestra de la alta joyería contemporánea. Diseñada para trascender generaciones, esta creación entrelaza la pureza de sus materiales con una ejecución orfebre de precisión inigualable."}
            </p>

            {/* CTA */}
            <div className="mb-16">
              <button 
                onClick={() => addToCart(product)}
                disabled={product.stock === 0}
                className={`w-full py-5 flex items-center justify-center gap-3 text-[11px] tracking-[4px] uppercase transition-all duration-500 border ${product.stock === 0 ? 'bg-[#F5F4F0] text-[#1A1A1A]/40 cursor-not-allowed border-[#1A1A1A]/10' : 'bg-[#1A1A1A] text-white border-[#1A1A1A] hover:bg-white hover:text-[#1A1A1A]'}`}
              >
                {product.stock === 0 ? 'Temporalmente sin stock' : 'Añadir a su Colección'} 
                {product.stock > 0 && <ShoppingBag size={14} />}
              </button>
              
              {product.stock > 0 && product.stock <= 3 && (
                <div className="flex justify-center items-center gap-2 mt-4">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]"></span>
                  <p className="text-center text-[10px] tracking-[2px] text-[#1A1A1A]/50 uppercase">
                    Piezas muy limitadas
                  </p>
                </div>
              )}
            </div>

            {/* Elegant Tabs for Info */}
            <div className="border border-[#1A1A1A]/10 bg-white">
              
              <div className="flex border-b border-[#1A1A1A]/10">
                <button 
                  onClick={() => setActiveTab('detalles')}
                  className={`flex-1 py-4 text-[10px] tracking-[3px] uppercase transition-colors ${activeTab === 'detalles' ? 'text-[#1A1A1A] font-medium bg-[#FCFBF8]' : 'text-[#1A1A1A]/40 hover:text-[#1A1A1A]'}`}
                >
                  Detalles
                </button>
                <button 
                  onClick={() => setActiveTab('envios')}
                  className={`flex-1 py-4 text-[10px] tracking-[3px] uppercase border-l border-[#1A1A1A]/10 transition-colors ${activeTab === 'envios' ? 'text-[#1A1A1A] font-medium bg-[#FCFBF8]' : 'text-[#1A1A1A]/40 hover:text-[#1A1A1A]'}`}
                >
                  Envíos
                </button>
              </div>

              <div className="p-8">
                <AnimatePresence mode="wait">
                  {activeTab === 'detalles' && (
                    <motion.div key="detalles" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
                      <ul className="space-y-4 text-sm font-light text-[#1A1A1A]/70">
                        <li className="flex justify-between border-b border-[#1A1A1A]/5 pb-3">
                          <span className="text-[#1A1A1A] font-medium">Material Base</span>
                          <span>{product.material}</span>
                        </li>
                        <li className="flex justify-between border-b border-[#1A1A1A]/5 pb-3">
                          <span className="text-[#1A1A1A] font-medium">Categoría</span>
                          <span>{product.category}</span>
                        </li>
                        <li className="flex justify-between border-b border-[#1A1A1A]/5 pb-3">
                          <span className="text-[#1A1A1A] font-medium">Certificación</span>
                          <span className="text-[#D4AF37]">Lumina Authenticity</span>
                        </li>
                        <li className="flex justify-between pb-1">
                          <span className="text-[#1A1A1A] font-medium">Artesanía</span>
                          <span>Hecho a mano</span>
                        </li>
                      </ul>
                    </motion.div>
                  )}

                  {activeTab === 'envios' && (
                    <motion.div key="envios" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
                      <div className="space-y-6 text-sm font-light text-[#1A1A1A]/70 leading-relaxed">
                        <div className="flex items-start gap-4">
                          <Truck size={20} className="text-[#D4AF37] shrink-0 mt-1" strokeWidth={1.5} />
                          <p><strong className="text-[#1A1A1A] font-medium block mb-1">Entrega Internacional de Cortesía</strong> Cada pieza viaja 100% asegurada. Tiempo estimado: 3 a 5 días hábiles.</p>
                        </div>
                        <div className="flex items-start gap-4">
                          <RotateCcw size={20} className="text-[#D4AF37] shrink-0 mt-1" strokeWidth={1.5} />
                          <p><strong className="text-[#1A1A1A] font-medium block mb-1">Devoluciones Sencillas</strong> Disfrute de 30 días para devoluciones o cambios sin complicaciones.</p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Need Help? */}
            <div className="mt-12 text-center">
              <p className="text-[10px] tracking-[2px] uppercase text-[#1A1A1A]/50 mb-3">¿Desea asesoramiento personalizado?</p>
              <a href="#" className="text-[11px] tracking-[2px] uppercase text-[#1A1A1A] border-b border-[#1A1A1A] hover:text-[#D4AF37] hover:border-[#D4AF37] transition-all pb-1">
                Contactar a un Asesor Lumina
              </a>
            </div>

          </motion.div>
        </div>
      </main>

      {/* --- DESKTOP ENHANCEMENTS: ARCHITECTURAL ELEGANCE --- */}
      {/* Zero extra images required. Pure layout, typography, and negative space. */}

      <section className="w-full bg-[#FCFBF8] py-20 md:py-32 border-t border-[#1A1A1A]/5 mt-10 md:mt-20">
        <div className="max-w-[1000px] mx-auto px-6">
          <div className="flex flex-col items-center text-center mb-20">
            <Gem size={20} className="text-[#D4AF37] mb-6" strokeWidth={1} />
            <h2 className="font-serif text-3xl md:text-5xl text-[#1A1A1A] font-light leading-snug mb-8">
              Detalles de la Pieza
            </h2>
            <p className="text-[#1A1A1A]/60 font-light text-sm md:text-base max-w-2xl leading-relaxed">
              La excelencia reside en lo invisible. Cada aspecto de esta joya ha sido forjado bajo especificaciones rigurosas que garantizan su durabilidad, brillo y estatus por generaciones.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12">
            
            <div className="group border-b border-[#1A1A1A]/10 pb-6 relative overflow-hidden">
              <div className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#D4AF37] transition-all duration-700 group-hover:w-full"></div>
              <span className="text-[#1A1A1A]/40 text-[10px] tracking-[4px] uppercase block mb-3">El Material</span>
              <p className="font-serif text-2xl text-[#1A1A1A] mb-2">{product.material}</p>
              <p className="text-[#1A1A1A]/50 font-light text-sm">Selección de pureza máxima, fundición en atmósfera controlada.</p>
            </div>

            <div className="group border-b border-[#1A1A1A]/10 pb-6 relative overflow-hidden">
              <div className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#D4AF37] transition-all duration-700 group-hover:w-full"></div>
              <span className="text-[#1A1A1A]/40 text-[10px] tracking-[4px] uppercase block mb-3">El Acabado</span>
              <p className="font-serif text-2xl text-[#1A1A1A] mb-2">Pulido Espejo</p>
              <p className="text-[#1A1A1A]/50 font-light text-sm">Proceso manual de 40 horas con hilos de seda para un reflejo inmaculado.</p>
            </div>

            <div className="group border-b border-[#1A1A1A]/10 pb-6 relative overflow-hidden">
              <div className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#D4AF37] transition-all duration-700 group-hover:w-full"></div>
              <span className="text-[#1A1A1A]/40 text-[10px] tracking-[4px] uppercase block mb-3">La Estructura</span>
              <p className="font-serif text-2xl text-[#1A1A1A] mb-2">Engaste de Precisión</p>
              <p className="text-[#1A1A1A]/50 font-light text-sm">Calibración microscópica para asegurar integridad estructural de por vida.</p>
            </div>

            <div className="group border-b border-[#1A1A1A]/10 pb-6 relative overflow-hidden">
              <div className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#D4AF37] transition-all duration-700 group-hover:w-full"></div>
              <span className="text-[#1A1A1A]/40 text-[10px] tracking-[4px] uppercase block mb-3">El Respaldo</span>
              <p className="font-serif text-2xl text-[#1A1A1A] mb-2">Lumina Care</p>
              <p className="text-[#1A1A1A]/50 font-light text-sm">Certificado de autenticidad y limpieza ultrasónica vitalicia de cortesía.</p>
            </div>

          </div>
        </div>
      </section>

      {/* Modern Value Strip - Fixed Contrast */}
      <section className="py-20 bg-white border-t border-[#1A1A1A]/5">
        <div className="max-w-[1000px] mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-16 md:gap-6 text-center">
          <div className="flex-1 flex flex-col items-center">
            <ShieldCheck size={28} className="text-[#D4AF37] mb-5" strokeWidth={1} />
            <h4 className="text-[11px] tracking-[4px] uppercase text-[#1A1A1A] mb-3">Compra Blindada</h4>
            <p className="text-[13px] text-[#1A1A1A]/50 font-light max-w-[220px] leading-relaxed">Transacciones encriptadas con protocolos de grado militar.</p>
          </div>
          
          <div className="hidden md:block w-[1px] h-16 bg-[#1A1A1A]/10"></div>
          
          <div className="flex-1 flex flex-col items-center">
            <Truck size={28} className="text-[#D4AF37] mb-5" strokeWidth={1} />
            <h4 className="text-[11px] tracking-[4px] uppercase text-[#1A1A1A] mb-3">Envío de Gala</h4>
            <p className="text-[13px] text-[#1A1A1A]/50 font-light max-w-[220px] leading-relaxed">Entrega internacional asegurada en empaque de madera lacada.</p>
          </div>
          
          <div className="hidden md:block w-[1px] h-16 bg-[#1A1A1A]/10"></div>
          
          <div className="flex-1 flex flex-col items-center">
            <Gem size={28} className="text-[#D4AF37] mb-5" strokeWidth={1} />
            <h4 className="text-[11px] tracking-[4px] uppercase text-[#1A1A1A] mb-3">Atención Exclusiva</h4>
            <p className="text-[13px] text-[#1A1A1A]/50 font-light max-w-[220px] leading-relaxed">Asesoría personalizada y servicio postventa de por vida.</p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
