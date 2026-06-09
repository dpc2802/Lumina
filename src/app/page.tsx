"use client";

import { useState, useEffect } from "react";
import { ShoppingBag, X, CreditCard, Wallet, MessageCircle, Heart, ArrowRight, ChevronDown, Menu, CheckCircle, ShieldCheck, User } from "lucide-react";
import NextLink from "next/link";
import Image from "next/image";
import { getProducts } from "@/app/actions";
import Footer from "@/components/Footer";

export default function Storefront() {
  const [products, setProducts] = useState<any[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [wishlistOpen, setWishlistOpen] = useState(false);
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [wishlistItems, setWishlistItems] = useState<any[]>([]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<any | null>(null);
  const [payMethod, setPayMethod] = useState<'stripe'|'paypal'|'wa'>('stripe');
  const [toast, setToast] = useState("");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    getProducts().then(setProducts);
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const addToCart = (product: any) => {
    setCartItems([...cartItems, { ...product, cartId: Date.now() }]);
    showToast(`${product.name} added to your collection`);
  };

  const removeFromCart = (cartId: number) => {
    setCartItems(cartItems.filter(item => item.cartId !== cartId));
  };

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(""), 3000);
  };

  const toggleWishlist = (product: any) => {
    if (wishlistItems.find(item => item.id === product.id)) {
      setWishlistItems(wishlistItems.filter(item => item.id !== product.id));
      showToast('Eliminado de tu lista de deseos');
    } else {
      setWishlistItems([...wishlistItems, product]);
      showToast('Añadido a tu lista de deseos');
    }
  };

  const cartTotal = cartItems.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="min-h-screen flex flex-col bg-pearl font-sans">
      {/* Premium Toast Notification */}
      {toast && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-charcoal text-pearl px-6 py-4 text-xs tracking-widest uppercase flex items-center gap-3 z-[100] shadow-2xl animate-in slide-in-from-bottom-5 fade-in duration-300">
          <div className="w-1.5 h-1.5 rounded-full bg-rg-lt"></div>
          {toast}
        </div>
      )}

      {/* Floating Glassmorphism Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-500 px-6 md:px-12 flex items-center justify-between ${scrolled ? 'bg-black/80 backdrop-blur-xl shadow-lg h-20' : 'bg-transparent h-28'}`}>
        <div className="flex-1 flex justify-start">
          <button className="md:hidden text-white p-2 hover:text-rg transition-colors" onClick={() => setMobileMenuOpen(true)}>
            <Menu size={24} strokeWidth={1.5} />
          </button>
          <div className="hidden md:flex gap-12 text-[11px] tracking-[2.5px] uppercase text-white font-medium">
            <NextLink href="/coleccion" className="hover:text-rg transition-colors relative group">
              Colecciones
              <span className="absolute -bottom-2 left-0 w-0 h-[1px] bg-rg transition-all group-hover:w-full"></span>
            </NextLink>
            <NextLink href="/nosotros" className="hover:text-rg transition-colors relative group">
              Nuestra Historia
              <span className="absolute -bottom-2 left-0 w-0 h-[1px] bg-rg transition-all group-hover:w-full"></span>
            </NextLink>
          </div>
        </div>

        <div className="font-serif text-lg md:text-3xl tracking-[0.1em] md:tracking-[0.2em] uppercase text-white flex items-center justify-center text-center leading-none">
          Lumina <span className="text-rg mx-1 md:mx-2">·</span> Joyas
        </div>

        <div className="flex-1 flex justify-end items-center gap-6">
          {/* Icons */}
          <div className="flex gap-6 items-center text-white">
            <NextLink href="/admin" className="hover:text-rg transition-colors relative" title="Acceso Administrativo">
              <User strokeWidth={1.5} size={20} />
            </NextLink>
            <button className="relative hover:text-rg transition-colors" onClick={() => setWishlistOpen(true)}>
              <Heart strokeWidth={1.5} size={20} />
              {wishlistItems.length > 0 && (
                <span className="absolute -top-1 -right-2 bg-rg text-white text-[8px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {wishlistItems.length}
                </span>
              )}
            </button>
            <button 
              onClick={() => setCartOpen(true)}
              className="relative p-2 text-white hover:text-rg transition-colors group"
            >
              <ShoppingBag size={22} strokeWidth={1.2} className="group-hover:scale-110 transition-transform" />
              {cartItems.length > 0 && (
                <span className="absolute top-1 right-0 w-4 h-4 bg-rg rounded-full text-[9px] text-white flex items-center justify-center font-medium shadow-md">
                  {cartItems.length}
                </span>
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="relative w-full min-h-screen flex flex-col justify-between items-center overflow-hidden pt-32 pb-8">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image 
            src="/hero6.png" 
            alt="Lumina Jewelry Display" 
            fill 
            className="object-cover object-center scale-105 animate-[kenburns_20s_ease-out_forwards]"
            priority
          />
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-black/90"></div>
        </div>

        {/* Top Spacer */}
        <div className="w-full"></div>

        {/* Hero Content */}
        <div className="relative z-10 px-6 text-center max-w-4xl mx-auto flex flex-col items-center w-full">
          <div className="animate-in slide-in-from-bottom-10 fade-in duration-1000 delay-300 flex flex-col items-center">
            <div className="flex items-center justify-center gap-4 mb-6">
              <span className="w-12 h-[1px] bg-rg-lt/50"></span>
              <p className="text-[10px] md:text-xs tracking-[5px] uppercase text-rg-lt font-medium">La Colección 2026</p>
              <span className="w-12 h-[1px] bg-rg-lt/50"></span>
            </div>
            
            <h1 className="font-serif text-6xl md:text-8xl lg:text-9xl text-white leading-[1.05] mb-6 font-light tracking-tight">
              Elegancia<br/><em className="text-rg-lt">Atemporal</em>
            </h1>
            
            <p className="text-sm md:text-base text-white/80 leading-relaxed font-light mb-10 max-w-xl mx-auto tracking-wide">
              Descubre piezas elaboradas a mano con piedras de origen ético y oro puro. Joyas con significado, diseñadas para trascender generaciones.
            </p>
            
            <NextLink href="/coleccion" className="bg-white text-charcoal px-10 py-4 text-[11px] tracking-[3px] uppercase font-bold hover:bg-rg hover:text-white transition-all duration-300 shadow-[0_0_30px_rgba(255,255,255,0.15)] flex items-center gap-3">
              Explorar Colección <ArrowRight size={16} />
            </NextLink>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="relative z-10 flex flex-col items-center gap-2 animate-pulse opacity-80 mt-12">
          <span className="text-[10px] tracking-[3px] uppercase text-white font-medium">Descubrir</span>
          <ChevronDown size={20} className="text-white" strokeWidth={1.5} />
        </div>
      </header>

      {/* Social Proof Bar */}
      <section className="bg-[#0a0a0a] py-10 border-t border-b border-white/5 relative z-10">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-[9px] tracking-[5px] uppercase text-white/40 mb-6">Reconocidos Mundialmente Por</p>
          <div className="flex flex-wrap justify-center items-center gap-12 md:gap-24 opacity-50 transition-opacity hover:opacity-100 duration-500">
            <h3 className="font-serif text-xl tracking-widest text-white">VOGUE</h3>
            <h3 className="font-sans font-bold text-lg tracking-[0.3em] text-white">GQ</h3>
            <h3 className="font-serif italic text-2xl text-white">Vanity Fair</h3>
            <h3 className="font-sans font-light text-xl tracking-widest text-white">ELLE</h3>
          </div>
        </div>
      </section>

      {/* Editorial Collections Layout */}
      <section id="collections" className="px-6 md:px-12 pt-32 pb-16 max-w-[1400px] mx-auto w-full relative">
        <div className="flex flex-col md:flex-row justify-between items-end mb-24 border-b border-charcoal/10 pb-12">
          <div className="max-w-xl">
            <span className="text-[9px] tracking-[4px] text-rg uppercase font-medium mb-6 block">El Arte Fino</span>
            <h2 className="font-serif text-5xl md:text-7xl text-charcoal font-light tracking-tight leading-[1.1]">
              Obras Maestras <br />
              <em className="text-charcoal3">Esculpidas</em>
            </h2>
          </div>
          <p className="text-xs text-charcoal3 font-light max-w-sm leading-relaxed mt-8 md:mt-0">
            Descubre colecciones nacidas de la obsesión por el detalle. Cada pieza cuenta una historia de herencia, precisión y oro puro de 18 quilates.
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-16 lg:gap-24 items-start">
          {/* Left Large Editorial Portrait */}
          <div className="w-full md:w-5/12 group cursor-pointer">
            <div className="relative w-full h-[600px] lg:h-[800px] overflow-hidden mb-8">
              <Image src="/cat_rings.png" alt="Alta Joyería" fill className="object-cover transition-transform duration-[2s] ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover:scale-105" />
            </div>
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-serif text-3xl text-charcoal mb-2">Alta Joyería</h3>
                <p className="text-[10px] tracking-[2px] uppercase text-charcoal3">Colección Exclusiva</p>
              </div>
              <span className="w-10 h-10 rounded-full border border-charcoal/20 flex items-center justify-center group-hover:border-rg group-hover:text-rg transition-colors">
                <ArrowRight size={16} strokeWidth={1} />
              </span>
            </div>
          </div>

          {/* Right Staggered Section */}
          <div className="w-full md:w-7/12 flex flex-col md:mt-40">
            
            <div className="group cursor-pointer mb-24">
              <div className="relative w-full h-[400px] lg:h-[500px] overflow-hidden mb-8">
                <Image src="/chain.png" alt="Cadenas Fina" fill className="object-cover transition-transform duration-[2s] ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover:scale-105" />
              </div>
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-serif text-3xl text-charcoal mb-2">Cadenas de Lujo</h3>
                  <p className="text-[10px] tracking-[2px] uppercase text-charcoal3">Para Él y Para Ella</p>
                </div>
                <span className="w-10 h-10 rounded-full border border-charcoal/20 flex items-center justify-center group-hover:border-rg group-hover:text-rg transition-colors">
                  <ArrowRight size={16} strokeWidth={1} />
                </span>
              </div>
            </div>

            {/* Typography / Custom Piece Block */}
            <div className="w-full bg-pearl pt-16 relative">
              <div className="absolute top-0 right-0 w-24 h-[1px] bg-rg"></div>
              <span className="text-[9px] tracking-[3px] text-charcoal3 uppercase mb-6 block">Servicio Bespoke</span>
              <h3 className="font-serif text-4xl lg:text-5xl text-charcoal mb-8 font-light leading-tight">
                Forja tu propio legado en oro.
              </h3>
              <p className="text-sm font-light text-charcoal3 max-w-md mb-12 leading-relaxed">
                Trabaja mano a mano con nuestros maestros joyeros. Desde el boceto inicial hasta el pulido final, creamos la pieza exacta que vive en tu imaginación.
              </p>
              <a href="https://wa.link/2tyflm" target="_blank" rel="noopener noreferrer" className="text-[10px] tracking-[3px] uppercase text-charcoal border-b border-charcoal pb-2 hover:text-rg hover:border-rg transition-all flex items-center gap-4 group w-fit">
                Agendar Consulta Privada
                <ArrowRight size={12} className="group-hover:translate-x-2 transition-transform" />
              </a>
            </div>

          </div>
        </div>
      </section>

      {/* Premium Geometric Divider */}
      <div className="w-full flex justify-center items-center py-6 opacity-60">
        <div className="w-[30%] max-w-[200px] h-[1px] bg-gradient-to-r from-transparent to-charcoal/20"></div>
        <div className="mx-6 w-2 h-2 rotate-45 border border-rg flex items-center justify-center">
          <div className="w-0.5 h-0.5 bg-rg"></div>
        </div>
        <div className="w-[30%] max-w-[200px] h-[1px] bg-gradient-to-l from-transparent to-charcoal/20"></div>
      </div>

      {/* Featured Products */}
      <section className="bg-white px-6 md:px-12 pt-16 pb-32 w-full">
        <div className="max-w-[1400px] mx-auto">
          <div className="flex flex-col items-center text-center mb-24">
            <span className="text-[9px] tracking-[4px] text-rg uppercase font-medium mb-6">Selección Curada</span>
            <h2 className="font-serif text-4xl md:text-5xl text-charcoal font-light tracking-tight mb-8">Piezas Destacadas</h2>
            <div className="w-12 h-[1px] bg-charcoal/20 mb-8"></div>
            <NextLink href="/coleccion" className="text-[10px] tracking-[3px] uppercase text-charcoal3 hover:text-rg transition-colors">Descubrir el Catálogo Completo</NextLink>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {products.filter(p => p.isFeatured).map((p) => {
              return (
                <div key={p.id} onClick={() => setQuickViewProduct(p)} className="group cursor-pointer flex flex-col h-full bg-white border border-charcoal/10 hover:border-charcoal/30 transition-all duration-500 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)]">
                  
                  {/* Image Container */}
                  <div className="relative h-[22rem] w-full border-b border-charcoal/5 overflow-hidden bg-[#fafafa] p-6 group/img">
                    <button 
                      onClick={(e) => { e.stopPropagation(); toggleWishlist(p); }}
                      className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-white/80 backdrop-blur flex items-center justify-center shadow-sm opacity-0 group-hover/img:opacity-100 transition-all hover:bg-white"
                    >
                      <Heart size={14} className={wishlistItems.find(item => item.id === p.id) ? "text-rg fill-rg" : "text-charcoal"} strokeWidth={1.5} />
                    </button>
                    {/* Corner accents for luxury framing */}
                    <div className="absolute top-4 left-4 w-2 h-2 border-t border-l border-charcoal/30 transition-colors group-hover:border-rg"></div>
                    <div className="absolute top-4 right-4 w-2 h-2 border-t border-r border-charcoal/30 transition-colors group-hover:border-rg"></div>
                    <div className="absolute bottom-4 left-4 w-2 h-2 border-b border-l border-charcoal/30 transition-colors group-hover:border-rg"></div>
                    <div className="absolute bottom-4 right-4 w-2 h-2 border-b border-r border-charcoal/30 transition-colors group-hover:border-rg"></div>

                    {(p.badge || p.stock === 0) && (
                      <span className={`absolute z-10 top-6 left-6 text-white text-[9px] tracking-[3px] uppercase px-3 py-1 ${p.stock === 0 ? 'bg-red-900/80 backdrop-blur-sm' : 'bg-charcoal'}`}>
                        {p.stock === 0 ? 'Agotado' : p.badge}
                      </span>
                    )}



                    <div className="relative w-full h-full transition-transform duration-[1.5s] ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover:scale-105">
                       <Image src={p.image} alt={p.name} fill className="object-cover mix-blend-multiply" />
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div className="flex flex-col flex-1 p-8 text-center bg-white">
                    <p className="text-[9px] tracking-[3px] uppercase text-rg mb-3">{p.material}</p>
                    <h3 className="font-serif text-xl text-charcoal mb-4 font-light leading-snug">{p.name}</h3>
                    <div className="flex-1"></div>
                    <div className="w-6 h-[1px] bg-charcoal/20 mx-auto mb-4"></div>
                    <p className="font-serif text-lg font-light text-charcoal tracking-wide mb-2">${p.price.toLocaleString()}</p>
                  </div>

                  {/* Add to Cart Footer */}
                  <button 
                    disabled={p.stock === 0}
                    onClick={(e) => { e.stopPropagation(); addToCart(p); }}
                    className={`w-full text-white py-4 text-[10px] tracking-[3px] uppercase flex justify-center items-center gap-3 ${p.stock === 0 ? 'bg-charcoal/30 cursor-not-allowed' : 'bg-charcoal hover:bg-rg transition-colors duration-300'}`}
                  >
                    {p.stock === 0 ? 'Sin Stock' : 'Añadir a la cesta'} {p.stock > 0 && <ArrowRight size={12} />}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </section>


      {/* Craftsmanship Section (Story) */}
      <section id="heritage" className="w-full bg-[#0a0a0a] text-white flex flex-col md:flex-row relative z-10">
        <div className="w-full md:w-1/2 relative min-h-[500px] md:min-h-screen">
          <Image src="/hero6.png" alt="Herencia y Maestría" fill className="object-cover grayscale opacity-50 mix-blend-screen object-left" />
          {/* Moody fade gradients to eliminate harsh lines */}
          <div className="absolute inset-0 bg-gradient-to-tr from-[#0a0a0a]/90 via-transparent to-[#0a0a0a]/30"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#0a0a0a]/20 to-[#0a0a0a]"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-transparent to-transparent opacity-50"></div>
          
          {/* Elegant seal */}
          <div className="absolute bottom-12 right-12 text-center border border-white/10 p-8 backdrop-blur-md hidden md:block">
             <div className="text-[9px] tracking-[4px] text-rg uppercase mb-2">Fundación</div>
             <div className="font-serif text-5xl font-light text-white tracking-widest">1992</div>
          </div>
        </div>
        <div className="w-full md:w-1/2 flex items-center justify-center p-12 md:p-24">
          <div className="max-w-md">
            <span className="text-[10px] tracking-[4px] uppercase text-rg-lt mb-6 block">Nuestra Herencia</span>
            <h2 className="font-serif text-4xl md:text-5xl mb-8 leading-tight">La maestría detrás<br/>de cada detalle.</h2>
            <p className="text-white/60 font-light leading-relaxed mb-8 text-sm md:text-base">
              Fundada bajo los principios de excelencia y precisión, Lumina trabaja exclusivamente con artesanos maestros. Cada cadena, cada engaste y cada pulido pasa por rigurosos estándares de calidad.
            </p>
            <p className="text-white/60 font-light leading-relaxed mb-12 text-sm md:text-base">
              Nos enorgullecemos de utilizar oro de 14 y 18 quilates obtenido de fuentes éticas y sostenibles, garantizando que el lujo de hoy no comprometa el mundo de mañana.
            </p>
            <NextLink href="/nosotros" className="text-[10px] tracking-[2px] uppercase text-white border-b border-rg-lt pb-1 hover:text-rg-lt transition-colors inline-block">
              Conoce el Proceso
            </NextLink>
          </div>
        </div>
      </section>

      <Footer />

      {/* Shopping Cart Sidebar (Mismo funcionamiento premium) */}
      {cartOpen && (
        <div className="fixed inset-0 z-[100] flex justify-end">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity" onClick={() => setCartOpen(false)}></div>
          <div className="w-full max-w-md bg-pearl h-full shadow-2xl relative flex flex-col animate-in slide-in-from-right duration-500 ease-out">
            <div className="px-8 py-8 flex justify-between items-center bg-white border-b border-black/5">
              <h2 className="font-serif text-2xl text-charcoal">Tu Cesta</h2>
              <button onClick={() => setCartOpen(false)} className="text-charcoal3 hover:text-charcoal p-2 transition-transform hover:rotate-90">
                <X size={24} strokeWidth={1.5} />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-8 flex flex-col gap-8">
              {cartItems.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-charcoal3 opacity-60">
                  <ShoppingBag size={48} strokeWidth={1} className="mb-6" />
                  <div className="text-[10px] tracking-[3px] uppercase">Tu cesta está vacía</div>
                </div>
              ) : (
                cartItems.map(item => {
                  return (
                    <div key={item.cartId} className="flex gap-6 pb-6 border-b border-black/5">
                      <div className="w-24 h-24 bg-surface relative shrink-0 overflow-hidden">
                        <Image src={item.image} alt={item.name} fill className="object-cover" />
                      </div>
                      <div className="flex-1 flex flex-col justify-center">
                        <h4 className="text-sm font-serif text-charcoal mb-2">{item.name}</h4>
                        <p className="text-[9px] tracking-widest uppercase text-charcoal3 mb-3">{item.category}</p>
                        <p className="text-base font-serif font-medium text-rg">${item.price.toLocaleString()}</p>
                      </div>
                      <button onClick={() => removeFromCart(item.cartId)} className="text-charcoal3 hover:text-red-500 self-start p-2 transition-colors">
                        <X size={16} />
                      </button>
                    </div>
                  );
                })
              )}
            </div>

            {cartItems.length > 0 && (
              <div className="p-8 border-t border-black/5 bg-white shadow-[0_-10px_40px_rgba(0,0,0,0.03)]">
                <div className="flex justify-between items-center mb-8">
                  <span className="text-[10px] tracking-[2px] uppercase text-charcoal3 font-medium">Subtotal</span>
                  <span className="font-serif text-3xl text-charcoal">${cartTotal.toLocaleString()}</span>
                </div>
                
                <div className="mb-6">
                  <p className="text-[9px] tracking-[2px] uppercase text-charcoal3 mb-4">Método de Pago</p>
                  <div className="flex flex-col gap-3">
                    <button 
                      onClick={() => setPayMethod('stripe')}
                      className={`flex items-center gap-4 p-4 text-left border ${payMethod==='stripe' ? 'border-rg bg-rg-pale/30' : 'border-black/10 hover:border-black/30'} transition-all`}
                    >
                      <CreditCard size={20} className={payMethod==='stripe' ? 'text-rg' : 'text-charcoal3'} strokeWidth={1.5} />
                      <div>
                        <div className="text-xs font-medium text-charcoal">Tarjeta de Crédito</div>
                        <div className="text-[10px] text-charcoal3 mt-1 font-light">Pago seguro vía Stripe</div>
                      </div>
                    </button>
                    <button 
                      onClick={() => setPayMethod('paypal')}
                      className={`flex items-center gap-4 p-4 text-left border ${payMethod==='paypal' ? 'border-rg bg-rg-pale/30' : 'border-black/10 hover:border-black/30'} transition-all`}
                    >
                      <Wallet size={20} className={payMethod==='paypal' ? 'text-rg' : 'text-charcoal3'} strokeWidth={1.5} />
                      <div>
                        <div className="text-xs font-medium text-charcoal">PayPal</div>
                        <div className="text-[10px] text-charcoal3 mt-1 font-light">Paga con tu saldo o tarjeta</div>
                      </div>
                    </button>
                    <button 
                      onClick={() => setPayMethod('wa')}
                      className={`flex items-center gap-4 p-4 text-left border ${payMethod==='wa' ? 'border-rg bg-rg-pale/30' : 'border-black/10 hover:border-black/30'} transition-all`}
                    >
                      <MessageCircle size={20} className={payMethod==='wa' ? 'text-rg' : 'text-charcoal3'} strokeWidth={1.5} />
                      <div>
                        <div className="text-xs font-medium text-charcoal">Atención Personalizada</div>
                        <div className="text-[10px] text-charcoal3 mt-1 font-light">Finalizar vía WhatsApp</div>
                      </div>
                    </button>
                  </div>
                </div>

                {payMethod === 'wa' ? (
                  <button 
                    onClick={() => showToast('Abriendo WhatsApp...')}
                    className="w-full bg-[#25D366] text-white py-5 text-[10px] tracking-[3px] uppercase font-medium flex items-center justify-center gap-3 hover:bg-[#1ebd59] transition-colors"
                  >
                    <MessageCircle size={18} /> Confirmar por WhatsApp
                  </button>
                ) : (
                  <NextLink 
                    href="/checkout"
                    className="w-full bg-charcoal text-white py-5 text-[10px] tracking-[3px] uppercase font-medium hover:bg-black transition-colors flex justify-center items-center"
                  >
                    Finalizar Compra
                  </NextLink>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Wishlist Sidebar */}
      {wishlistOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div className="absolute inset-0 bg-charcoal/40 backdrop-blur-sm" onClick={() => setWishlistOpen(false)} />
          <div className="relative w-full max-w-md bg-white h-full flex flex-col shadow-2xl animate-in slide-in-from-right">
            <div className="p-8 border-b border-black/5 flex justify-between items-center bg-white">
              <h2 className="font-serif text-3xl">Lista de Deseos</h2>
              <button onClick={() => setWishlistOpen(false)} className="hover:text-rg transition-colors p-2"><X size={24} strokeWidth={1} /></button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-8">
              {wishlistItems.length === 0 ? (
                <div className="text-center text-charcoal/40 mt-20">
                  <Heart size={48} strokeWidth={0.5} className="mx-auto mb-6 opacity-20" />
                  <p className="font-light">Tu lista de deseos está vacía.</p>
                </div>
              ) : (
                <div className="space-y-8">
                  {wishlistItems.map((item) => (
                    <div key={item.id} className="flex gap-6 items-center">
                      <div className="w-24 h-32 bg-pearl relative overflow-hidden shrink-0">
                        <Image src={item.image} alt={item.name} fill className="object-cover" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-serif text-lg mb-1">{item.name}</h3>
                        <p className="text-[10px] tracking-[2px] uppercase text-charcoal/50 mb-3">{item.category}</p>
                        <p className="text-sm font-light">${item.price.toLocaleString()}</p>
                      </div>
                      <div className="flex flex-col gap-3">
                        <button 
                          onClick={() => { addToCart(item); toggleWishlist(item); setWishlistOpen(false); setCartOpen(true); }}
                          className="w-10 h-10 border border-charcoal/20 flex items-center justify-center hover:bg-charcoal hover:text-white transition-colors"
                          title="Mover al Carrito"
                        >
                          <ShoppingBag size={14} />
                        </button>
                        <button onClick={() => toggleWishlist(item)} className="text-charcoal/40 hover:text-red-500 transition-colors w-10 h-10 flex items-center justify-center">
                          <X size={16} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-[200] w-full h-[100dvh] bg-[#111] flex flex-col">
          <div className="flex justify-between items-center p-6 border-b border-white/10">
            <span className="font-serif text-2xl tracking-[0.2em] uppercase text-white">Lumina</span>
            <button onClick={() => setMobileMenuOpen(false)} className="text-white hover:text-rg transition-colors p-2 bg-white/10 flex items-center justify-center rounded-full">
              <X size={24} strokeWidth={1.5} />
            </button>
          </div>
          <div className="flex flex-col flex-1 items-center justify-center gap-6 text-center px-6 overflow-y-auto py-8">
            <NextLink href="/coleccion" onClick={() => setMobileMenuOpen(false)} className="w-full max-w-xs border border-white/20 py-4 font-serif text-2xl text-white hover:border-rg hover:text-rg transition-colors">
              Catálogo
            </NextLink>
            <NextLink href="/nosotros" onClick={() => setMobileMenuOpen(false)} className="w-full max-w-xs border border-white/20 py-4 font-serif text-2xl text-white hover:border-rg hover:text-rg transition-colors">
              Nuestra Historia
            </NextLink>
            <NextLink href="/contacto" onClick={() => setMobileMenuOpen(false)} className="w-full max-w-xs border border-white/20 py-4 font-serif text-2xl text-white hover:border-rg hover:text-rg transition-colors">
              Contacto
            </NextLink>
            
            <a href="https://wa.link/2tyflm" target="_blank" rel="noopener noreferrer" className="w-full max-w-xs bg-[#25D366] text-white py-4 mt-8 flex justify-center items-center gap-3 text-xs tracking-[3px] uppercase font-bold hover:bg-[#1ebd59] transition-colors">
              <MessageCircle size={18} /> Asesor Privado
            </a>
            
            <NextLink href="/admin" onClick={() => setMobileMenuOpen(false)} className="text-[10px] tracking-[3px] uppercase text-white/50 hover:text-white mt-8 underline">
              Portal de Clientes
            </NextLink>
          </div>
        </div>
      )}

      {/* Quick View Modal */}
      {quickViewProduct && (
        <div className="fixed inset-0 z-[150] flex items-center justify-center p-4 sm:p-6">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-md transition-opacity" onClick={() => setQuickViewProduct(null)}></div>
          <div className="bg-white w-full max-w-5xl max-h-[90vh] overflow-y-auto relative z-10 flex flex-col md:flex-row shadow-2xl">
            <button onClick={() => setQuickViewProduct(null)} className="absolute top-4 right-4 z-20 bg-white/80 backdrop-blur-sm p-2 rounded-full text-charcoal hover:bg-charcoal hover:text-white transition-all shadow-sm">
              <X size={20} strokeWidth={1.5} />
            </button>
            <div className="w-full md:w-1/2 bg-[#fafafa] relative min-h-[300px] md:min-h-[500px] flex items-center justify-center p-8">
               <Image src={quickViewProduct.image} alt={quickViewProduct.name} fill className="object-cover mix-blend-multiply opacity-90" />
            </div>
            <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-[9px] tracking-[3px] uppercase text-rg">{quickViewProduct.category}</span>
                {quickViewProduct.badge && <span className="bg-charcoal text-white text-[8px] tracking-[2px] uppercase px-2 py-0.5">{quickViewProduct.badge}</span>}
              </div>
              <h2 className="font-serif text-3xl md:text-4xl text-charcoal mb-4 font-light leading-snug">{quickViewProduct.name}</h2>
              <p className="text-xl font-serif text-charcoal mb-6">${quickViewProduct.price.toLocaleString()}</p>
              <div className="w-12 h-[1px] bg-rg mb-6"></div>
              <p className="text-sm font-light text-charcoal/70 mb-8 leading-relaxed">
                {quickViewProduct.description}
              </p>
              <ul className="space-y-3 mb-10 border-t border-charcoal/10 pt-8">
                {quickViewProduct.details.map((detail: string, i: number) => (
                  <li key={i} className="flex items-start gap-3 text-xs text-charcoal/60 font-light">
                    <span className="w-1 h-1 rounded-full bg-rg mt-1.5 shrink-0"></span>
                    {detail}
                  </li>
                ))}
              </ul>
              <div className="grid grid-cols-2 gap-4 mt-auto">
                 <button 
                   onClick={() => { addToCart(quickViewProduct); setQuickViewProduct(null); }}
                   className="col-span-2 bg-charcoal text-white py-4 text-[10px] tracking-[3px] uppercase hover:bg-rg transition-colors flex items-center justify-center gap-2"
                 >
                   <ShoppingBag size={14} /> Añadir a la Cesta
                 </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
