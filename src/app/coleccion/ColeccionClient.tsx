"use client";

import { useState, useEffect } from "react";
import { ShoppingBag, X, Heart, ArrowRight, SlidersHorizontal, ChevronDown, Grid2X2, List, Maximize2 } from "lucide-react";
import NextLink from "next/link";
import Image from "next/image";
import { getProducts } from "@/app/actions";
import Footer from "@/components/Footer";
import { useCart } from "@/components/CartContext";
import { toast } from "sonner";

export default function Catalog({ initialProducts }: { initialProducts: any[] }) {
  const [products, setProducts] = useState<any[]>(initialProducts);


  const [cartOpen, setCartOpen] = useState(false);
  const [wishlistOpen, setWishlistOpen] = useState(false);
  const { cartItems, addToCart, removeFromCart, cartTotal, cartCount } = useCart();
  const [wishlistItems, setWishlistItems] = useState<any[]>([]);
  const [scrolled, setScrolled] = useState(false);
  const [activeFilter, setActiveFilter] = useState('Todos');
  const [filterOpen, setFilterOpen] = useState(false);
  const [sortOrder, setSortOrder] = useState('recent');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedProduct, setSelectedProduct] = useState<any>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleAddToCart = (product: any) => {
    addToCart(product);
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
  
  let filteredProducts = activeFilter === 'Todos' ? [...products] : products.filter(p => p.category === activeFilter);
  if (sortOrder === 'price-asc') {
    filteredProducts.sort((a, b) => a.price - b.price);
  } else if (sortOrder === 'price-desc') {
    filteredProducts.sort((a, b) => b.price - a.price);
  } else {
    filteredProducts.sort((a, b) => b.id - a.id); // 'recent'
  }

  return (
    <div className="min-h-screen flex flex-col bg-pearl font-sans">
      {/* Floating Glassmorphism Navigation (Dynamic Text for Dark Hero) */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-500 px-6 md:px-12 flex items-center justify-between ${scrolled ? 'bg-white/90 backdrop-blur-xl shadow-sm h-20 text-charcoal' : 'bg-transparent h-28 text-white'}`}>
        <div className="flex-1 flex justify-start">
          <div className="hidden md:flex gap-12 text-[11px] tracking-[2.5px] uppercase font-medium">
            <NextLink href="/" className="hover:text-rg transition-colors relative group">
              Inicio
              <span className="absolute -bottom-2 left-0 w-0 h-[1px] bg-rg transition-all group-hover:w-full"></span>
            </NextLink>
            <NextLink href="/coleccion" className="hover:text-rg transition-colors relative group">
              Colecciones
              <span className="absolute -bottom-2 left-0 w-full h-[1px] bg-rg transition-all"></span>
            </NextLink>
          </div>
        </div>

        <NextLink href="/" className="font-serif text-2xl md:text-3xl tracking-[0.2em] uppercase flex items-center justify-center">
          Lumina <span className="text-rg mx-2 text-xl">·</span> Joyas
        </NextLink>

        <div className="flex-1 flex justify-end items-center gap-6">
          <button className="relative hover:text-rg transition-colors" onClick={() => setWishlistOpen(true)}>
            <Heart strokeWidth={1.5} size={20} />
            {wishlistItems.length > 0 && (
              <span className="absolute -top-1 -right-2 bg-rg text-white text-[8px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {wishlistItems.length}
              </span>
            )}
          </button>
          <button onClick={() => setCartOpen(true)} className="hover:text-rg transition-colors relative">
            <ShoppingBag size={18} strokeWidth={1.5} />
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 w-3.5 h-3.5 bg-rg text-white text-[8px] flex items-center justify-center rounded-full font-medium">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </nav>

      {/* Cinematic Catalog Hero */}
      <header className="relative pt-40 pb-24 px-6 md:px-12 w-full min-h-[50vh] flex flex-col items-center justify-center text-center overflow-hidden bg-charcoal">
        <Image src="/hero5.png" alt="Colección Completa" fill className="object-cover opacity-60 mix-blend-overlay" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a]/90 via-[#0a0a0a]/40 to-[#0a0a0a]/20"></div>
        
        <div className="relative z-10 w-full max-w-3xl mx-auto">
          <span className="text-[10px] tracking-[4px] uppercase text-rg font-medium mb-6 block">Catálogo Completo</span>
          <h1 className="font-serif text-5xl md:text-7xl text-white font-light tracking-tight mb-8">Nuestras Colecciones</h1>
          <div className="w-16 h-[1px] bg-rg/50 mx-auto mb-8"></div>
          <p className="text-sm text-white/80 font-light leading-relaxed">
            Explora nuestra meticulosa selección de piezas atemporales. Cada joya es una declaración de herencia y precisión geométrica.
          </p>
        </div>
      </header>

      {/* Premium Filters & View Toggle */}
      <section className="w-full max-w-[1400px] mx-auto px-6 md:px-12 py-12 flex flex-col md:flex-row justify-between items-center gap-8 border-b border-charcoal/5 mb-12">
        <div className="flex items-center gap-8 overflow-x-auto w-full md:w-auto pb-4 md:pb-0 scrollbar-hide">
          {categories.map(cat => (
            <button 
              key={cat} 
              onClick={() => setActiveFilter(cat)}
              className={`text-[10px] tracking-[3px] uppercase whitespace-nowrap transition-all duration-300 ${activeFilter === cat ? 'text-charcoal border-b border-charcoal pb-1' : 'text-charcoal3 hover:text-rg'}`}
            >
              {cat}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-6 text-[10px] tracking-[2px] uppercase text-charcoal3 shrink-0">
          <div className="flex items-center gap-3 border-r border-charcoal/10 pr-6 hidden md:flex">
             <button onClick={() => setViewMode('grid')} className={`p-1.5 transition-colors ${viewMode === 'grid' ? 'text-charcoal bg-charcoal/5' : 'hover:text-rg'}`}><Grid2X2 size={16}/></button>
             <button onClick={() => setViewMode('list')} className={`p-1.5 transition-colors ${viewMode === 'list' ? 'text-charcoal bg-charcoal/5' : 'hover:text-rg'}`}><List size={16}/></button>
          </div>
          <div className="relative">
            <button onClick={() => setFilterOpen(!filterOpen)} className="flex items-center gap-2 hover:text-charcoal transition-colors cursor-pointer">
              <SlidersHorizontal size={14} /> Filtrar <ChevronDown size={14} className={`transition-transform duration-300 ${filterOpen ? 'rotate-180' : ''}`} />
            </button>
            {filterOpen && (
              <div className="absolute top-full mt-4 right-0 w-56 bg-white border border-charcoal/10 shadow-2xl z-20 flex flex-col p-6 animate-in fade-in slide-in-from-top-2">
                 <span className="text-[8px] tracking-[4px] uppercase text-charcoal/50 mb-4 block border-b border-charcoal/5 pb-2">Ordenar por</span>
                 <button onClick={() => { setSortOrder('price-asc'); setFilterOpen(false); }} className={`text-[10px] tracking-[2px] uppercase text-left py-3 transition-colors ${sortOrder === 'price-asc' ? 'text-rg' : 'text-charcoal hover:text-rg'}`}>Precio: Menor a Mayor</button>
                 <button onClick={() => { setSortOrder('price-desc'); setFilterOpen(false); }} className={`text-[10px] tracking-[2px] uppercase text-left py-3 transition-colors ${sortOrder === 'price-desc' ? 'text-rg' : 'text-charcoal hover:text-rg'}`}>Precio: Mayor a Menor</button>
                 <button onClick={() => { setSortOrder('recent'); setFilterOpen(false); }} className={`text-[10px] tracking-[2px] uppercase text-left py-3 transition-colors ${sortOrder === 'recent' ? 'text-rg' : 'text-charcoal hover:text-rg'}`}>Más Recientes</button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Products Grid / List */}
      <section className="w-full max-w-[1400px] mx-auto px-6 md:px-12 pb-32">
        <div className={`grid gap-4 lg:gap-8 ${viewMode === 'grid' ? 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4' : 'grid-cols-1 md:grid-cols-2'}`}>
          {filteredProducts.map((p) => {
            return (
              <div 
                key={p.id} 
                onClick={() => setSelectedProduct(p)}
                className={`group cursor-pointer flex ${viewMode === 'grid' ? 'flex-col' : 'flex-row'} h-full bg-white border border-charcoal/10 hover:border-charcoal/30 transition-all duration-500 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] animate-in fade-in zoom-in-95 duration-500`}
              >
                
                {/* Image Container */}
                <div className={`relative ${viewMode === 'grid' ? 'h-48 md:h-[22rem] w-full' : 'h-full w-1/2'} border-b border-charcoal/5 overflow-hidden bg-[#fafafa] p-4 md:p-6 shrink-0`}>
                  <div className="absolute top-4 left-4 w-2 h-2 border-t border-l border-charcoal/30 transition-colors group-hover:border-rg"></div>
                  <div className="absolute top-4 right-4 w-2 h-2 border-t border-r border-charcoal/30 transition-colors group-hover:border-rg"></div>
                  <div className="absolute bottom-4 left-4 w-2 h-2 border-b border-l border-charcoal/30 transition-colors group-hover:border-rg"></div>
                  <div className="absolute bottom-4 right-4 w-2 h-2 border-b border-r border-charcoal/30 transition-colors group-hover:border-rg"></div>

                  {(p.badge || p.stock === 0) && (
                    <span className={`absolute z-10 top-4 left-4 md:top-6 md:left-6 text-white text-[8px] md:text-[9px] tracking-[3px] uppercase px-2 md:px-3 py-1 ${p.stock === 0 ? 'bg-red-900/80 backdrop-blur-sm' : 'bg-charcoal'}`}>
                      {p.stock === 0 ? 'Agotado' : p.badge}
                    </span>
                  )}

                  <button 
                    onClick={(e) => { e.stopPropagation(); toggleWishlist(p); }}
                    className="absolute top-4 right-14 md:top-6 md:right-16 z-20 transition-colors opacity-0 group-hover:opacity-100 duration-300 bg-white/80 p-2 backdrop-blur-sm rounded-full hover:bg-white"
                  >
                    <Heart size={14} className={wishlistItems.find(item => item.id === p.id) ? "text-rg fill-rg" : "text-charcoal3 hover:text-rg"} strokeWidth={1.5} />
                  </button>
                  <button className="absolute top-4 right-4 md:top-6 md:right-6 z-20 text-charcoal3 hover:text-charcoal transition-colors opacity-0 group-hover:opacity-100 duration-300 bg-white/80 p-2 backdrop-blur-sm rounded-full">
                    <Maximize2 size={14} strokeWidth={1.5} />
                  </button>

                  <div className="relative w-full h-full transition-transform duration-[1.5s] ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover:scale-105">
                     <Image src={p.image} alt={p.name} fill className="object-cover mix-blend-multiply p-4" />
                  </div>
                </div>
                
                {/* Content */}
                <div className={`flex flex-col flex-1 ${viewMode === 'grid' ? 'p-4 md:p-8 text-center' : 'p-6 md:p-10 justify-center text-left'} bg-white`}>
                  <p className="text-[8px] md:text-[9px] tracking-[3px] uppercase text-rg mb-2 md:mb-3">{p.material}</p>
                  <h3 className={`font-serif ${viewMode === 'grid' ? 'text-lg md:text-xl' : 'text-2xl md:text-3xl'} text-charcoal mb-2 md:mb-4 font-light leading-snug`}>{p.name}</h3>
                  <div className="flex-1"></div>
                  <div className={`w-6 h-[1px] bg-charcoal/20 mb-3 md:mb-4 ${viewMode === 'grid' ? 'mx-auto' : ''}`}></div>
                  <p className={`font-serif ${viewMode === 'grid' ? 'text-base md:text-lg' : 'text-xl md:text-2xl'} font-light text-charcoal tracking-wide mb-4`}>${p.price.toLocaleString()}</p>
                  
                  {/* Add to Cart Footer inside the card */}
                  <button 
                    disabled={p.stock === 0}
                    onClick={(e) => { e.stopPropagation(); handleAddToCart(p); }}
                    className={`w-full text-white py-3 md:py-4 text-[9px] md:text-[10px] tracking-[3px] uppercase flex justify-center items-center gap-2 md:gap-3 ${viewMode === 'list' ? 'mt-4' : ''} ${p.stock === 0 ? 'bg-charcoal/30 cursor-not-allowed' : 'bg-charcoal hover:bg-rg transition-colors duration-300'}`}
                  >
                    {p.stock === 0 ? 'Sin Stock' : 'Añadir a la cesta'} {p.stock > 0 && <ArrowRight size={12} />}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <Footer />

      {/* Quick View Modal - High Refinery Edition */}
      {selectedProduct && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 md:p-12">
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/70 backdrop-blur-md animate-in fade-in duration-300" onClick={() => setSelectedProduct(null)}></div>
          
          {/* Modal Content */}
          <div className="relative bg-white w-full max-w-6xl max-h-[90vh] flex flex-col md:flex-row shadow-[0_30px_100px_rgba(0,0,0,0.8)] animate-in fade-in zoom-in-95 duration-400 overflow-hidden border border-charcoal/10">
            <button onClick={() => setSelectedProduct(null)} className="absolute top-6 right-6 z-30 p-2 text-charcoal hover:text-rg transition-colors bg-white/80 backdrop-blur-md rounded-full shadow-sm">
               <X size={20} strokeWidth={1.5} />
            </button>
            
            {/* Image Panel - Architectural Framing */}
            <div className="w-full md:w-1/2 relative min-h-[400px] md:min-h-[700px] bg-charcoal">
              <Image src={selectedProduct.image} alt={selectedProduct.name} fill className="object-cover opacity-90 mix-blend-screen" />
              
              {/* Inner Luxury Details */}
              <div className="absolute inset-6 border border-white/20 pointer-events-none z-10"></div>
              <div className="absolute top-6 left-6 w-4 h-4 border-t border-l border-rg z-10"></div>
              <div className="absolute top-6 right-6 w-4 h-4 border-t border-r border-rg z-10"></div>
              <div className="absolute bottom-6 left-6 w-4 h-4 border-b border-l border-rg z-10"></div>
              <div className="absolute bottom-6 right-6 w-4 h-4 border-b border-r border-rg z-10"></div>
              
              <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none">
                 <span className="font-serif text-8xl md:text-9xl text-white tracking-[0.2em] uppercase -rotate-90 md:rotate-0">Lumina</span>
              </div>
            </div>
            
            {/* Details Panel - Certificate of Authenticity Style */}
            <div className="w-full md:w-1/2 p-6 md:p-12 lg:p-16 flex flex-col justify-center bg-pearl relative overflow-y-auto scrollbar-hide">
               {/* Inner Certificate Border */}
               <div className="absolute inset-4 border border-charcoal/5 pointer-events-none"></div>
               
               <div className="relative z-10 h-full flex flex-col">
                 <span className="text-[10px] tracking-[4px] uppercase text-rg mb-6 flex items-center gap-4">
                   <div className="w-8 h-[1px] bg-rg"></div>
                   {selectedProduct.category}
                 </span>
                 
                 <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-charcoal font-light mb-6 tracking-tight leading-[1.1]">{selectedProduct.name}</h2>
                 
                 <div className="mb-10">
                   <span className="text-charcoal/60 text-[9px] tracking-[0.3em] uppercase bg-white px-4 py-2 border border-charcoal/5 shadow-[0_4px_10px_rgba(0,0,0,0.02)] inline-block">
                     {selectedProduct.material}
                   </span>
                 </div>
                 
                 <p className="font-serif text-3xl text-charcoal mb-10">${selectedProduct.price.toLocaleString()}</p>
                 
                 {/* Geometric Divider */}
                 <div className="w-full flex items-center justify-center gap-4 mb-10">
                   <div className="h-[1px] flex-1 bg-charcoal/10"></div>
                   <div className="w-2 h-2 rotate-45 border border-rg"></div>
                   <div className="h-[1px] flex-1 bg-charcoal/10"></div>
                 </div>
                 
                 <p className="text-sm text-charcoal3 font-light leading-relaxed mb-10 text-justify">
                   {selectedProduct.description}
                 </p>
                 
                 <ul className="space-y-4 mb-12 border-t border-b border-charcoal/5 py-8 bg-white/40 px-6 md:px-8">
                   {selectedProduct.details?.map((detail: string, i: number) => (
                     <li key={i} className="text-xs tracking-wide text-charcoal/80 font-light flex items-center gap-4">
                       <div className="w-1 h-1 bg-rg rotate-45 shrink-0"></div> {detail}
                     </li>
                   ))}
                 </ul>
                 
                 <div className="flex-1"></div>
                 
                 <div className="flex gap-4">
                   <button 
                      disabled={selectedProduct.stock === 0}
                      onClick={() => { handleAddToCart(selectedProduct); setSelectedProduct(null); setCartOpen(true); }}
                      className={`flex-1 text-white py-6 text-[11px] tracking-[4px] uppercase border border-transparent transition-all duration-500 flex justify-center items-center gap-4 group ${selectedProduct.stock === 0 ? 'bg-charcoal/30 cursor-not-allowed' : 'bg-charcoal hover:bg-white hover:text-charcoal hover:border-charcoal'}`}
                    >
                      {selectedProduct.stock === 0 ? 'Pieza Agotada' : 'Añadir a la cesta'} {selectedProduct.stock > 0 && <ArrowRight size={14} className="group-hover:translate-x-2 transition-transform" />}
                   </button>
                   <button 
                      onClick={() => toggleWishlist(selectedProduct)}
                      className="w-16 flex items-center justify-center border border-charcoal/20 hover:border-rg transition-colors"
                   >
                      <Heart size={20} className={wishlistItems.find(item => item.id === selectedProduct.id) ? "text-rg fill-rg" : "text-charcoal"} strokeWidth={1} />
                   </button>
                 </div>
               </div>
            </div>
          </div>
        </div>
      )}

      {/* Shopping Cart Sidebar (Copied from main page to keep UX functional) */}
      {cartOpen && (
        <div className="fixed inset-0 z-[100] flex justify-end">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity" onClick={() => setCartOpen(false)}></div>
          <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-500">
            {/* Header */}
            <div className="p-8 border-b border-charcoal/5 flex justify-between items-center bg-[#fafafa]">
              <span className="font-serif text-2xl text-charcoal">Tu Cesta</span>
              <button onClick={() => setCartOpen(false)} className="p-2 text-charcoal/50 hover:text-charcoal transition-colors hover:rotate-90 duration-300">
                <X size={20} />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto p-8 space-y-6">
              {cartItems.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-charcoal/30">
                  <ShoppingBag size={48} strokeWidth={1} className="mb-4" />
                  <p className="text-sm font-light uppercase tracking-widest">La cesta está vacía</p>
                </div>
              ) : (
                cartItems.map((item) => (
                  <div key={item.cartId} className="flex gap-6 group">
                    <div className="w-24 h-24 bg-[#fafafa] border border-charcoal/5 relative p-2">
                      <Image src={item.image} alt={item.name} fill className="object-cover mix-blend-multiply" />
                    </div>
                    <div className="flex-1 flex flex-col justify-center">
                      <h4 className="font-serif text-lg text-charcoal leading-snug">{item.name}</h4>
                      <p className="text-[9px] uppercase tracking-widest text-charcoal/50 mt-1 mb-2">{item.material}</p>
                      <p className="text-sm text-charcoal">${item.price}</p>
                    </div>
                    <button 
                      onClick={() => removeFromCart(item.cartId)}
                      className="text-charcoal/30 hover:text-red-500 transition-colors p-2 h-fit"
                    >
                      <X size={16} />
                    </button>
                  </div>
                ))
              )}
            </div>

            {/* Footer */}
            {cartItems.length > 0 && (
              <div className="p-8 bg-[#fafafa] border-t border-charcoal/5">
                <div className="flex justify-between items-center mb-6">
                  <span className="text-[11px] uppercase tracking-widest text-charcoal/60">Subtotal</span>
                  <span className="font-serif text-2xl text-charcoal">${cartTotal}</span>
                </div>
                <NextLink href="/checkout" className="w-full bg-charcoal text-white py-5 text-[10px] tracking-[3px] uppercase hover:bg-rg transition-colors duration-300 flex justify-center items-center gap-3">
                  Finalizar Compra <ArrowRight size={14} />
                </NextLink>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Wishlist Sidebar */}
      {wishlistOpen && (
        <div className="fixed inset-0 z-[100] flex justify-end">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity" onClick={() => setWishlistOpen(false)} />
          <div className="relative w-full max-w-md bg-white h-full flex flex-col shadow-2xl animate-in slide-in-from-right duration-500">
            <div className="p-8 border-b border-charcoal/5 flex justify-between items-center bg-[#fafafa]">
              <h2 className="font-serif text-2xl text-charcoal">Lista de Deseos</h2>
              <button onClick={() => setWishlistOpen(false)} className="hover:text-rg transition-colors p-2 text-charcoal/50"><X size={20} strokeWidth={1} /></button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-8 space-y-6">
              {wishlistItems.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-charcoal/30">
                  <Heart size={48} strokeWidth={1} className="mb-4" />
                  <p className="text-sm font-light uppercase tracking-widest">Tu lista está vacía</p>
                </div>
              ) : (
                wishlistItems.map((item) => (
                  <div key={item.id} className="flex gap-6 items-center">
                    <div className="w-24 h-24 bg-[#fafafa] border border-charcoal/5 relative p-2 shrink-0">
                      <Image src={item.image} alt={item.name} fill className="object-cover mix-blend-multiply" />
                    </div>
                    <div className="flex-1 flex flex-col justify-center">
                      <h3 className="font-serif text-lg text-charcoal leading-snug">{item.name}</h3>
                      <p className="text-[9px] uppercase tracking-widest text-charcoal/50 mt-1 mb-2">{item.category}</p>
                      <p className="text-sm text-charcoal">${item.price.toLocaleString()}</p>
                    </div>
                    <div className="flex flex-col gap-2">
                      <button 
                        onClick={() => { handleAddToCart(item); toggleWishlist(item); setWishlistOpen(false); setCartOpen(true); }}
                        className="w-10 h-10 border border-charcoal/20 flex items-center justify-center hover:bg-charcoal hover:text-white transition-colors"
                        title="Mover al Carrito"
                      >
                        <ShoppingBag size={14} />
                      </button>
                      <button onClick={() => toggleWishlist(item)} className="text-charcoal/30 hover:text-red-500 transition-colors w-10 h-10 flex items-center justify-center">
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
