"use client";

import { useState, useEffect } from "react";
import { ShoppingBag, X, Heart, ArrowRight, SlidersHorizontal, Check } from "lucide-react";
import NextLink from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import Footer from "@/components/Footer";
import { useCart } from "@/components/CartContext";
import { toast } from "sonner";

export default function Catalog({ initialProducts }: { initialProducts: any[] }) {
  const [products, setProducts] = useState<any[]>(initialProducts);
  
  useEffect(() => {
    setProducts(initialProducts);
  }, [initialProducts]);

  const [cartOpen, setCartOpen] = useState(false);
  const [wishlistOpen, setWishlistOpen] = useState(false);
  const { cartItems, addToCart: contextAddToCart, removeFromCart, cartTotal, cartCount } = useCart();
  const [wishlistItems, setWishlistItems] = useState<any[]>([]);
  const [scrolled, setScrolled] = useState(false);
  
  const router = useRouter();
  const searchParams = useSearchParams();
  const activeFilter = searchParams.get('categoria') || 'Todos';
  
  // New Drawer state instead of dropdowns
  const [filterDrawerOpen, setFilterDrawerOpen] = useState(false);
  const [sortOrder, setSortOrder] = useState('recent');
  
  const [selectedProduct, setSelectedProduct] = useState<any>(null);

  const { scrollYProgress } = useScroll();
  const headerY = useTransform(scrollYProgress, [0, 0.5], ["0%", "50%"]);
  const headerOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const addToCart = (product: any) => {
    contextAddToCart(product);
    toast.success(`${product.name} añadido a la cesta`, {
      description: "Puedes proceder al pago cuando desees."
    });
  };

  const toggleWishlist = (product: any) => {
    if (wishlistItems.find(item => item.id === product.id)) {
      setWishlistItems(wishlistItems.filter(item => item.id !== product.id));
    } else {
      setWishlistItems([...wishlistItems, product]);
    }
  };

  const categories = ['Todos', 'Cadenas', 'Brazaletes', 'Anillos', 'Aretes'];
  
  let filteredProducts = [...products];
  
  // Apply Category Filter
  if (activeFilter !== 'Todos') {
    filteredProducts = filteredProducts.filter(p => p.category.toLowerCase() === activeFilter);
  }

  // Apply Sorting
  if (sortOrder === 'price-asc') {
    filteredProducts.sort((a, b) => a.price - b.price);
  } else if (sortOrder === 'price-desc') {
    filteredProducts.sort((a, b) => b.price - a.price);
  } else {
    filteredProducts.sort((a, b) => a.id - b.id); // 'recent'
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#FCFBF8] font-sans">
      {/* Floating Glassmorphism Navigation */}
      <nav className={`fixed top-0 w-full z-40 transition-all duration-500 px-6 md:px-12 flex items-center justify-between ${scrolled ? 'bg-white/95 backdrop-blur-xl shadow-[0_2px_20px_rgba(0,0,0,0.03)] h-20 text-[#1A1A1A]' : 'bg-transparent h-28 text-white'}`}>
        <div className="flex-1 flex justify-start">
          <div className="hidden md:flex gap-12 text-[10px] tracking-[3px] uppercase font-medium">
            <NextLink href="/" className="hover:text-[#D4AF37] transition-colors relative group">
              Inicio
              <span className="absolute -bottom-2 left-0 w-0 h-[1px] bg-[#D4AF37] transition-all group-hover:w-full"></span>
            </NextLink>
            <NextLink href="/coleccion" className="hover:text-[#D4AF37] transition-colors relative group">
              Colecciones
              <span className="absolute -bottom-2 left-0 w-full h-[1px] bg-[#D4AF37] transition-all"></span>
            </NextLink>
          </div>
        </div>

        <NextLink href="/" className="font-serif text-base md:text-3xl tracking-[0.1em] md:tracking-[0.2em] uppercase flex items-center justify-center whitespace-nowrap">
          Lumina <span className="text-[#D4AF37] mx-2 text-xl">·</span> Joyas
        </NextLink>

        <div className="flex-1 flex justify-end items-center gap-8">
          <button className="relative hover:text-[#D4AF37] transition-colors" onClick={() => setWishlistOpen(true)}>
            <Heart strokeWidth={1} size={22} />
            {wishlistItems.length > 0 && (
              <span className="absolute -top-1 -right-2 bg-[#D4AF37] text-white text-[8px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {wishlistItems.length}
              </span>
            )}
          </button>
          <button onClick={() => setCartOpen(true)} className="hover:text-[#D4AF37] transition-colors relative">
            <ShoppingBag size={20} strokeWidth={1} />
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-[#D4AF37] text-white text-[9px] flex items-center justify-center rounded-full font-medium">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </nav>

      {/* Cinematic Editorial Hero */}
      <header className="relative pt-40 pb-24 w-full h-[60vh] md:h-[70vh] flex flex-col justify-center overflow-hidden bg-[#1A1A1A]">
        <motion.div style={{ y: headerY }} className="absolute inset-0 origin-center">
          <Image 
            src="https://images.unsplash.com/photo-1599643478524-fb66f7f6f59d?q=80&w=2000&auto=format&fit=crop" 
            alt="Colección Lumina" 
            fill 
            className="object-cover opacity-60 mix-blend-luminosity scale-105" 
            priority 
          />
        </motion.div>
        {/* Soft Vignette Overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-[#1A1A1A]/40 to-[#1A1A1A]"></div>
        
        <motion.div style={{ opacity: headerOpacity }} className="relative z-10 w-full max-w-[1400px] mx-auto px-6 md:px-12 flex flex-col items-center text-center">
          <motion.span 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }} 
            className="text-[10px] md:text-[12px] tracking-[8px] uppercase text-[#D4AF37] font-medium mb-6 block"
          >
            Haute Joaillerie
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.5, delay: 0.2 }} 
            className="font-serif text-5xl md:text-8xl text-white font-light tracking-tight leading-[1.1]"
          >
            La Colección <br/> <i className="text-white/80">Eterna</i>
          </motion.h1>
        </motion.div>
      </header>

      {/* Tools & Filter Bar (Minimalist) */}
      <div className="w-full bg-[#FCFBF8] border-b border-[#1A1A1A]/5 sticky top-20 z-30 transition-all duration-300">
        <div className="max-w-[1600px] mx-auto px-6 md:px-12 py-5 flex justify-between items-center">
          <p className="text-[10px] tracking-[3px] uppercase text-[#1A1A1A]/50 hidden md:block">
            {filteredProducts.length} Piezas Maestras
          </p>
          
          <div className="flex-1 flex justify-center">
            {/* Quick Categories for Desktop (Optional, but elegant if centered) */}
            <div className="hidden lg:flex gap-10">
              {categories.map(cat => (
                <button 
                  key={cat} 
                  onClick={() => {
                    const newCat = cat === 'Todos' ? '' : cat.toLowerCase();
                    router.push(newCat ? `/coleccion?categoria=${newCat}` : '/coleccion', { scroll: false });
                  }}
                  className={`text-[10px] tracking-[3px] uppercase transition-colors ${activeFilter === (cat === 'Todos' ? 'Todos' : cat.toLowerCase()) ? 'text-[#1A1A1A] border-b border-[#1A1A1A] pb-1' : 'text-[#1A1A1A]/40 hover:text-[#D4AF37]'}`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <button 
            onClick={() => setFilterDrawerOpen(true)} 
            className="flex items-center gap-3 text-[10px] tracking-[3px] uppercase text-[#1A1A1A] hover:text-[#D4AF37] transition-colors"
          >
            Refinar Colección <SlidersHorizontal size={14} strokeWidth={1} />
          </button>
        </div>
      </div>

      {/* "Floating Jewels" Grid - Borderless and Airy */}
      <section className="w-full max-w-[1600px] mx-auto px-6 md:px-12 py-24 min-h-[50vh]">
        {filteredProducts.length === 0 ? (
          <div className="flex flex-col items-center justify-center text-center py-32">
            <h3 className="font-serif text-3xl text-[#1A1A1A] mb-4">Colección Privada</h3>
            <p className="text-[#1A1A1A]/50 font-light mb-8 max-w-md mx-auto">No hay piezas disponibles actualmente bajo estos criterios. Los maestros orfebres continúan su labor.</p>
            <button onClick={() => router.push('/coleccion')} className="text-[10px] tracking-[3px] uppercase text-[#1A1A1A] border-b border-[#1A1A1A] pb-1 hover:text-[#D4AF37] hover:border-[#D4AF37] transition-colors">
              Ver Toda la Colección
            </button>
          </div>
        ) : (
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.1 }
              }
            }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-12 gap-y-24"
          >
            {filteredProducts.map((p) => {
              return (
                <motion.div 
                  key={p.id} 
                  variants={{
                    hidden: { opacity: 0, y: 40 },
                    visible: { opacity: 1, y: 0, transition: { duration: 1, ease: [0.16, 1, 0.3, 1] } }
                  }}
                  className="group flex flex-col"
                >
                  
                  {/* Image Container - Floating Effect (No Borders) */}
                  <div 
                    className="relative w-full aspect-[4/5] bg-white flex items-center justify-center overflow-hidden cursor-pointer mb-8"
                    onClick={() => setSelectedProduct(p)}
                  >
                    <div className="w-[85%] h-[85%] relative transition-transform duration-[2s] ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover:scale-110">
                       <Image src={p.image} alt={p.name} fill className="object-contain mix-blend-multiply drop-shadow-2xl" />
                    </div>

                    {/* Stock Badge */}
                    {p.stock === 0 && (
                      <span className="absolute top-6 left-6 text-white text-[9px] tracking-[3px] uppercase px-3 py-1 bg-[#1A1A1A]/80 backdrop-blur-md">
                        Agotado
                      </span>
                    )}

                    {/* Hover Overlay Actions (Hidden until hover) */}
                    <div className="absolute inset-0 bg-white/20 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-6">
                       <div className="flex gap-4 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                         <button 
                            disabled={p.stock === 0}
                            onClick={(e) => { e.stopPropagation(); addToCart(p); }}
                            className={`flex-1 py-4 text-[10px] tracking-[3px] uppercase text-white ${p.stock === 0 ? 'bg-[#1A1A1A]/40 cursor-not-allowed' : 'bg-[#1A1A1A] hover:bg-[#D4AF37] transition-colors'}`}
                          >
                            {p.stock === 0 ? 'Sin Stock' : 'Añadir'}
                          </button>
                          <button 
                            onClick={(e) => { e.stopPropagation(); toggleWishlist(p); }}
                            className="w-12 h-auto flex items-center justify-center bg-white text-[#1A1A1A] hover:text-[#D4AF37] transition-colors"
                          >
                            <Heart size={16} className={wishlistItems.find(item => item.id === p.id) ? "fill-[#D4AF37] text-[#D4AF37]" : ""} strokeWidth={1} />
                          </button>
                       </div>
                    </div>
                  </div>
                  
                  {/* Content - Pure Typography */}
                  <div className="flex flex-col text-center px-4">
                    <p className="text-[9px] tracking-[4px] uppercase text-[#1A1A1A]/40 mb-3">{p.category}</p>
                    <h3 className="font-serif text-2xl text-[#1A1A1A] mb-3 font-light leading-snug cursor-pointer hover:text-[#D4AF37] transition-colors" onClick={() => setSelectedProduct(p)}>
                      {p.name}
                    </h3>
                    <p className="font-serif text-xl text-[#1A1A1A]/70 italic tracking-wide">
                      ${Number(p.price).toLocaleString('es-ES')}
                    </p>
                  </div>

                </motion.div>
              );
            })}
          </motion.div>
        )}
      </section>

      {/* Off-Canvas Filter Drawer */}
      <AnimatePresence>
      {filterDrawerOpen && (
        <div className="fixed inset-0 z-[100] flex justify-end">
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="absolute inset-0 bg-[#1A1A1A]/40 backdrop-blur-sm" 
            onClick={() => setFilterDrawerOpen(false)} 
          />
          <motion.div 
            initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="relative w-full max-w-md bg-[#FCFBF8] h-full shadow-2xl flex flex-col border-l border-[#1A1A1A]/10"
          >
            <div className="p-8 border-b border-[#1A1A1A]/5 flex justify-between items-center bg-white">
              <span className="font-serif text-3xl text-[#1A1A1A] font-light">Refinar</span>
              <button onClick={() => setFilterDrawerOpen(false)} className="p-2 text-[#1A1A1A]/50 hover:text-[#1A1A1A] transition-colors duration-300 hover:rotate-90">
                <X size={24} strokeWidth={1} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-10 space-y-12">
              
              {/* Category Filter */}
              <div>
                <span className="text-[10px] tracking-[4px] uppercase text-[#1A1A1A]/40 mb-6 block">Colecciones</span>
                <div className="flex flex-col gap-4">
                  {categories.map(cat => {
                    const isSelected = activeFilter === (cat === 'Todos' ? 'Todos' : cat.toLowerCase());
                    return (
                      <button 
                        key={cat}
                        onClick={() => {
                          const newCat = cat === 'Todos' ? '' : cat.toLowerCase();
                          router.push(newCat ? `/coleccion?categoria=${newCat}` : '/coleccion', { scroll: false });
                          setFilterDrawerOpen(false);
                        }}
                        className={`flex items-center justify-between text-left font-serif text-xl hover:text-[#D4AF37] transition-colors ${isSelected ? 'text-[#D4AF37]' : 'text-[#1A1A1A]'}`}
                      >
                        {cat}
                        {isSelected && <Check size={18} strokeWidth={1} />}
                      </button>
                    )
                  })}
                </div>
              </div>

              <div className="w-full h-[1px] bg-[#1A1A1A]/5"></div>

              {/* Sort Filter */}
              <div>
                <span className="text-[10px] tracking-[4px] uppercase text-[#1A1A1A]/40 mb-6 block">Ordenar Por</span>
                <div className="flex flex-col gap-4">
                  <button 
                    onClick={() => { setSortOrder('recent'); setFilterDrawerOpen(false); }} 
                    className={`flex items-center justify-between text-left font-serif text-xl hover:text-[#D4AF37] transition-colors ${sortOrder === 'recent' ? 'text-[#D4AF37]' : 'text-[#1A1A1A]'}`}
                  >
                    Lanzamiento Reciente {sortOrder === 'recent' && <Check size={18} strokeWidth={1} />}
                  </button>
                  <button 
                    onClick={() => { setSortOrder('price-asc'); setFilterDrawerOpen(false); }} 
                    className={`flex items-center justify-between text-left font-serif text-xl hover:text-[#D4AF37] transition-colors ${sortOrder === 'price-asc' ? 'text-[#D4AF37]' : 'text-[#1A1A1A]'}`}
                  >
                    Precio: Menor a Mayor {sortOrder === 'price-asc' && <Check size={18} strokeWidth={1} />}
                  </button>
                  <button 
                    onClick={() => { setSortOrder('price-desc'); setFilterDrawerOpen(false); }} 
                    className={`flex items-center justify-between text-left font-serif text-xl hover:text-[#D4AF37] transition-colors ${sortOrder === 'price-desc' ? 'text-[#D4AF37]' : 'text-[#1A1A1A]'}`}
                  >
                    Precio: Mayor a Menor {sortOrder === 'price-desc' && <Check size={18} strokeWidth={1} />}
                  </button>
                </div>
              </div>

            </div>
          </motion.div>
        </div>
      )}
      </AnimatePresence>

      <Footer />

      {/* Quick View Modal - High Refinery Edition (Unchanged layout structure, just color tweaks for consistency) */}
      <AnimatePresence>
      {selectedProduct && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 sm:p-6 md:p-12">
          {/* Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="absolute inset-0 bg-[#1A1A1A]/80 backdrop-blur-md" 
            onClick={() => setSelectedProduct(null)}
          ></motion.div>
          
          {/* Modal Content */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }} transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="relative bg-white w-full max-w-6xl max-h-[90vh] flex flex-col md:flex-row shadow-[0_30px_100px_rgba(0,0,0,0.8)] overflow-hidden"
          >
            <button onClick={() => setSelectedProduct(null)} className="absolute top-6 right-6 z-30 p-2 text-[#1A1A1A] hover:text-[#D4AF37] transition-colors bg-white/80 backdrop-blur-md rounded-full shadow-sm">
               <X size={20} strokeWidth={1} />
            </button>
            
            {/* Image Panel - Architectural Framing */}
            <div className="w-full md:w-1/2 relative min-h-[400px] md:min-h-[700px] bg-white flex items-center justify-center p-12 border-r border-[#1A1A1A]/5">
              <div className="relative w-full h-full aspect-[4/5]">
                 <Image src={selectedProduct.image} alt={selectedProduct.name} fill className="object-contain mix-blend-multiply drop-shadow-2xl" />
              </div>
              
              {/* Inner Luxury Details */}
              <div className="absolute top-6 left-6 w-4 h-4 border-t border-l border-[#D4AF37] z-10"></div>
              <div className="absolute top-6 right-6 w-4 h-4 border-t border-r border-[#D4AF37] z-10"></div>
              <div className="absolute bottom-6 left-6 w-4 h-4 border-b border-l border-[#D4AF37] z-10"></div>
              <div className="absolute bottom-6 right-6 w-4 h-4 border-b border-r border-[#D4AF37] z-10"></div>
            </div>
            
            {/* Details Panel - Certificate of Authenticity Style */}
            <div className="w-full md:w-1/2 p-8 md:p-12 lg:p-16 flex flex-col justify-center bg-[#FCFBF8] relative overflow-y-auto scrollbar-hide">
               
               <div className="relative z-10 h-full flex flex-col">
                 <span className="text-[10px] tracking-[4px] uppercase text-[#D4AF37] mb-6 flex items-center gap-4">
                   <div className="w-8 h-[1px] bg-[#D4AF37]"></div>
                   {selectedProduct.category}
                 </span>
                 
                 <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-[#1A1A1A] font-light mb-6 tracking-tight leading-[1.1]">{selectedProduct.name}</h2>
                 
                 <div className="mb-10">
                   <span className="text-[#1A1A1A]/60 text-[9px] tracking-[0.3em] uppercase bg-white px-4 py-2 border border-[#1A1A1A]/5 shadow-sm inline-block">
                     {selectedProduct.material}
                   </span>
                 </div>
                 
                 <p className="font-serif text-3xl text-[#1A1A1A] mb-10">${selectedProduct.price.toLocaleString('es-ES')}</p>
                 
                 {/* Geometric Divider */}
                 <div className="w-full flex items-center justify-center gap-4 mb-10">
                   <div className="h-[1px] flex-1 bg-[#1A1A1A]/10"></div>
                   <div className="w-2 h-2 rotate-45 border border-[#D4AF37]"></div>
                   <div className="h-[1px] flex-1 bg-[#1A1A1A]/10"></div>
                 </div>
                 
                 <p className="text-sm text-[#1A1A1A]/60 font-light leading-relaxed mb-10 text-justify">
                   {selectedProduct.description}
                 </p>
                 
                 <ul className="space-y-4 mb-12 border-t border-b border-[#1A1A1A]/5 py-8 bg-white/40 px-6">
                   {(selectedProduct.details || ['Metal de máxima pureza', 'Garantía Lumina Care']).map((detail: string, i: number) => (
                     <li key={i} className="text-xs tracking-wide text-[#1A1A1A]/70 font-light flex items-center gap-4">
                       <div className="w-1 h-1 bg-[#D4AF37] rotate-45 shrink-0"></div> {detail}
                     </li>
                   ))}
                 </ul>
                 
                 <div className="flex-1"></div>
                 
                 <NextLink href={`/producto/${selectedProduct.slug}`} className="w-full py-4 text-center text-[10px] tracking-[3px] uppercase text-[#1A1A1A] border border-[#1A1A1A]/20 hover:border-[#1A1A1A] transition-colors mb-4 block">
                   Ver Detalles Completos
                 </NextLink>

                 <div className="flex gap-4">
                   <button 
                      disabled={selectedProduct.stock === 0}
                      onClick={() => { addToCart(selectedProduct); setSelectedProduct(null); setCartOpen(true); }}
                      className={`flex-1 text-white py-5 text-[11px] tracking-[4px] uppercase transition-all duration-500 flex justify-center items-center gap-4 group ${selectedProduct.stock === 0 ? 'bg-[#1A1A1A]/30 cursor-not-allowed' : 'bg-[#1A1A1A] hover:bg-[#D4AF37]'}`}
                    >
                      {selectedProduct.stock === 0 ? 'Agotado' : 'Añadir a la cesta'}
                   </button>
                 </div>
               </div>
             </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Shopping Cart Sidebar */}
      {cartOpen && (
        <div className="fixed inset-0 z-[120] flex justify-end">
          <div className="absolute inset-0 bg-[#1A1A1A]/40 backdrop-blur-sm transition-opacity" onClick={() => setCartOpen(false)}></div>
          <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-500">
            {/* Header */}
            <div className="p-8 border-b border-[#1A1A1A]/5 flex justify-between items-center bg-[#FCFBF8]">
              <span className="font-serif text-2xl text-[#1A1A1A]">Tu Cesta</span>
              <button onClick={() => setCartOpen(false)} className="p-2 text-[#1A1A1A]/50 hover:text-[#1A1A1A] transition-colors hover:rotate-90 duration-300">
                <X size={20} strokeWidth={1} />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto p-8 space-y-8">
              {cartItems.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-[#1A1A1A]/20">
                  <ShoppingBag size={48} strokeWidth={1} className="mb-4" />
                  <p className="text-[10px] font-light uppercase tracking-[3px]">La cesta está vacía</p>
                </div>
              ) : (
                cartItems.map((item) => (
                  <div key={item.cartId} className="flex gap-6 group">
                    <div className="w-24 h-24 bg-white border border-[#1A1A1A]/5 relative p-2">
                      <Image src={item.image} alt={item.name} fill className="object-cover mix-blend-multiply" />
                    </div>
                    <div className="flex-1 flex flex-col justify-center">
                      <h4 className="font-serif text-lg text-[#1A1A1A] leading-snug">{item.name}</h4>
                      <p className="text-[9px] uppercase tracking-[2px] text-[#1A1A1A]/40 mt-1 mb-2">{item.material}</p>
                      <p className="font-serif text-lg text-[#1A1A1A]">${item.price}</p>
                    </div>
                    <button 
                      onClick={() => removeFromCart(item.cartId)}
                      className="text-[#1A1A1A]/30 hover:text-[#D4AF37] transition-colors p-2 h-fit"
                    >
                      <X size={16} strokeWidth={1} />
                    </button>
                  </div>
                ))
              )}
            </div>

            {/* Footer */}
            {cartItems.length > 0 && (
              <div className="p-8 bg-[#FCFBF8] border-t border-[#1A1A1A]/5">
                <div className="flex justify-between items-center mb-6">
                  <span className="text-[10px] uppercase tracking-[3px] text-[#1A1A1A]/60">Subtotal</span>
                  <span className="font-serif text-3xl text-[#1A1A1A]">${cartTotal}</span>
                </div>
                <div className="mb-4">
                  <NextLink 
                    href="/checkout"
                    className="w-full bg-[#1A1A1A] text-white py-5 text-[10px] tracking-[3px] uppercase font-medium hover:bg-[#D4AF37] transition-colors flex justify-center items-center"
                  >
                    Finalizar Compra
                  </NextLink>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Wishlist Sidebar */}
      {wishlistOpen && (
        <div className="fixed inset-0 z-[120] flex justify-end">
          <div className="absolute inset-0 bg-[#1A1A1A]/40 backdrop-blur-sm transition-opacity" onClick={() => setWishlistOpen(false)} />
          <div className="relative w-full max-w-md bg-[#FCFBF8] h-full flex flex-col shadow-2xl animate-in slide-in-from-right duration-500">
            <div className="p-8 border-b border-[#1A1A1A]/5 flex justify-between items-center bg-white">
              <h2 className="font-serif text-2xl text-[#1A1A1A]">Lista de Deseos</h2>
              <button onClick={() => setWishlistOpen(false)} className="hover:text-[#D4AF37] transition-colors p-2 text-[#1A1A1A]/50"><X size={20} strokeWidth={1} /></button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-8 space-y-8">
              {wishlistItems.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-[#1A1A1A]/20">
                  <Heart size={48} strokeWidth={1} className="mb-4" />
                  <p className="text-[10px] font-light uppercase tracking-[3px]">Tu lista está vacía</p>
                </div>
              ) : (
                wishlistItems.map((item) => (
                  <div key={item.id} className="flex gap-6 items-center">
                    <div className="w-24 h-24 bg-white border border-[#1A1A1A]/5 relative p-2 shrink-0">
                      <Image src={item.image} alt={item.name} fill className="object-cover mix-blend-multiply" />
                    </div>
                    <div className="flex-1 flex flex-col justify-center">
                      <h3 className="font-serif text-lg text-[#1A1A1A] leading-snug">{item.name}</h3>
                      <p className="text-[9px] uppercase tracking-[2px] text-[#1A1A1A]/40 mt-1 mb-2">{item.category}</p>
                      <p className="font-serif text-lg text-[#1A1A1A]">${item.price.toLocaleString('es-ES')}</p>
                    </div>
                    <div className="flex flex-col gap-2">
                      <button 
                        onClick={() => { addToCart(item); toggleWishlist(item); setWishlistOpen(false); setCartOpen(true); }}
                        className="w-10 h-10 border border-[#1A1A1A]/20 flex items-center justify-center hover:bg-[#1A1A1A] hover:text-white transition-colors"
                        title="Mover al Carrito"
                      >
                        <ShoppingBag size={14} />
                      </button>
                      <button onClick={() => toggleWishlist(item)} className="text-[#1A1A1A]/30 hover:text-red-500 transition-colors w-10 h-10 flex items-center justify-center">
                        <X size={16} />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
