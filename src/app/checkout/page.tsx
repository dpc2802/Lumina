"use client";

import { useState, useEffect } from "react";
import NextLink from "next/link";
import Image from "next/image";
import { ArrowLeft, Lock, ShieldCheck, CreditCard, Loader2, CheckCircle, X } from "lucide-react";
import { createOrder, getStoreSettings } from "@/app/actions";
import { useCart } from "@/components/CartContext";

export default function Checkout() {
  const [step, setStep] = useState<'form' | 'processing' | 'success'>('form');
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'payid' | 'whatsapp'>('card');
  const [orderId, setOrderId] = useState<string>('');
  const [settings, setSettings] = useState<any>(null);
  const { cartItems, removeFromCart, cartTotal, clearCart } = useCart();

  useEffect(() => {
    getStoreSettings().then(setSettings);
  }, []);

  const handlePayment = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (cartItems.length === 0) {
      alert("El carrito está vacío.");
      return;
    }

    setStep('processing');
    
    // Simulate gateway redirect if not card
    if (paymentMethod !== 'card') {
      await new Promise(resolve => setTimeout(resolve, 2000));
    }
    
    const formData = new FormData(e.currentTarget);
    const customerInfo = {
      email: formData.get('email') as string,
      name: formData.get('firstName') + ' ' + formData.get('lastName'),
      phone: formData.get('phone') as string
    };

    try {
      const result = await createOrder(cartItems, customerInfo, total);
      if (result.success) {
        setOrderId(result.orderNumber);
        clearCart();
        setStep('success');
      }
    } catch (error) {
      console.error(error);
      alert("Error procesando orden");
      setStep('form');
    }
  };

  const subtotal = cartTotal;
  const shipping = subtotal > 0 ? 45 : 0;
  const total = subtotal + shipping;

  if (step === 'success') {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#FAFAFA] font-sans px-6 text-center animate-in fade-in duration-1000">
        <div className="bg-white p-12 md:p-16 border border-charcoal/10 shadow-[0_30px_60px_rgba(0,0,0,0.05)] max-w-2xl relative overflow-hidden">
          <div className="absolute top-4 left-4 w-4 h-4 border-t border-l border-rg"></div>
          <div className="absolute top-4 right-4 w-4 h-4 border-t border-r border-rg"></div>
          <div className="absolute bottom-4 left-4 w-4 h-4 border-b border-l border-rg"></div>
          <div className="absolute bottom-4 right-4 w-4 h-4 border-b border-r border-rg"></div>
          
          <CheckCircle size={64} className="text-[#25D366] mx-auto mb-8" strokeWidth={1} />
          <span className="text-[10px] tracking-[4px] uppercase text-rg mb-4 block">Orden Confirmada</span>
          <h1 className="font-serif text-4xl md:text-5xl font-light tracking-tight mb-6 text-charcoal">Gracias por su compra</h1>
          <p className="text-charcoal/70 font-light mb-12 text-sm md:text-base leading-relaxed">
            Su orden de alta joyería ha sido procesada con éxito bajo la referencia <strong className="font-medium text-charcoal text-lg">#{orderId}</strong>.<br/><br/>Hemos enviado un correo con el certificado de autenticidad digital y los detalles del seguimiento de nuestra mensajería blindada.
          </p>
          <NextLink href="/coleccion" className="inline-block bg-charcoal text-white py-4 px-12 text-[10px] tracking-[3px] uppercase hover:bg-rg transition-colors duration-300">
            Continuar Explorando
          </NextLink>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white font-sans flex flex-col md:flex-row text-charcoal">
      
      {step === 'processing' && (
        <div className="fixed inset-0 z-50 bg-white/90 backdrop-blur-md flex flex-col items-center justify-center animate-in fade-in">
          <Loader2 size={48} className="text-rg animate-spin mb-6" strokeWidth={1} />
          <h2 className="font-serif text-2xl text-charcoal mb-2">
            {paymentMethod === 'payid' ? 'Procesando PayID...' : 
             paymentMethod === 'whatsapp' ? 'Generando Orden Manual...' : 
             'Autorizando Tarjeta...'}
          </h2>
          <p className="text-xs text-charcoal/50 uppercase tracking-[2px]">Por favor no cierre ni recargue esta ventana</p>
        </div>
      )}

      {/* Left Column: Form */}
      <div className="w-full md:w-1/2 lg:w-7/12 pt-12 pb-24 px-6 md:px-12 lg:px-24 xl:px-32 flex flex-col border-r border-charcoal/5 overflow-y-auto">
        <NextLink href="/" className="font-serif text-3xl tracking-[0.2em] uppercase mb-16 inline-block w-fit text-charcoal">
          Lumina
        </NextLink>
        
        <div className="flex items-center gap-2 text-[9px] uppercase tracking-[2px] text-charcoal/40 mb-12 flex-wrap">
          <NextLink href="/coleccion" className="hover:text-rg transition-colors">Catálogo</NextLink>
          <span>/</span>
          <span className="text-charcoal font-medium">Información</span>
          <span>/</span>
          <span>Envío</span>
          <span>/</span>
          <span>Pago Seguro</span>
        </div>

        <form onSubmit={handlePayment} className="flex-1 flex flex-col space-y-16 max-w-xl">
          
          <section>
            <h2 className="font-serif text-2xl mb-8 border-b border-charcoal/10 pb-4">1. Información de Contacto</h2>
            <div className="space-y-4">
              <input required name="email" type="email" placeholder="Correo Electrónico" className="w-full border border-charcoal/20 bg-transparent p-4 outline-none focus:border-rg transition-colors text-sm font-light" />
              <div className="flex items-center gap-3 text-xs text-charcoal/60 mt-4">
                <input type="checkbox" id="news" className="accent-rg w-4 h-4 cursor-pointer" />
                <label htmlFor="news" className="cursor-pointer">Deseo recibir invitaciones privadas y acceso a piezas de edición limitada.</label>
              </div>
            </div>
          </section>

          <section>
            <h2 className="font-serif text-2xl mb-8 border-b border-charcoal/10 pb-4">2. Dirección de Entrega</h2>
            <div className="grid grid-cols-2 gap-4">
              <input required name="firstName" type="text" placeholder="Nombre" className="col-span-1 border border-charcoal/20 bg-transparent p-4 outline-none focus:border-rg transition-colors text-sm font-light" />
              <input required name="lastName" type="text" placeholder="Apellidos" className="col-span-1 border border-charcoal/20 bg-transparent p-4 outline-none focus:border-rg transition-colors text-sm font-light" />
              <input required name="address" type="text" placeholder="Dirección Postal" className="col-span-2 border border-charcoal/20 bg-transparent p-4 outline-none focus:border-rg transition-colors text-sm font-light" />
              <input type="text" placeholder="Apartamento, suite, etc. (opcional)" className="col-span-2 border border-charcoal/20 bg-transparent p-4 outline-none focus:border-rg transition-colors text-sm font-light" />
              <input required name="city" type="text" placeholder="Ciudad" className="col-span-1 border border-charcoal/20 bg-transparent p-4 outline-none focus:border-rg transition-colors text-sm font-light" />
              <input required name="zip" type="text" placeholder="Código Postal" className="col-span-1 border border-charcoal/20 bg-transparent p-4 outline-none focus:border-rg transition-colors text-sm font-light" />
              <input required name="phone" type="tel" placeholder="Teléfono Móvil (para logística)" className="col-span-2 border border-charcoal/20 bg-transparent p-4 outline-none focus:border-rg transition-colors text-sm font-light" />
            </div>
          </section>

          <section>
            <h2 className="font-serif text-2xl mb-4 border-b border-charcoal/10 pb-4">3. Pago Seguro</h2>
            <p className="text-xs text-charcoal/50 mb-8 flex items-center gap-2">
              <Lock size={12} className="text-rg" /> Transacciones encriptadas con seguridad bancaria de grado militar.
            </p>

            <div className="flex gap-2 mb-6 overflow-x-auto pb-2 border-b border-charcoal/10">
              <div className="h-8 px-3 flex items-center justify-center grayscale opacity-40" title="Stripe">
                <span className="font-bold text-lg tracking-tighter text-[#5433FF]">stripe</span>
              </div>
              <div className="h-8 px-3 flex items-center justify-center grayscale opacity-40">
                <svg viewBox="0 0 50 16" width="30" className="fill-charcoal"><path d="M22.84 0.16L15.02 15.69H9.76L5.97 3.39C5.69 2.5 5.48 2.15 4.7 1.7C3.51 1.05 1.67 0.53 0 0.25L0.1 0.16H8.22C9.28 0.16 10.22 0.85 10.5 2.01L12.55 10.9L17.7 0.16H22.84ZM36.08 10.74C36.1 6.55 30.12 6.32 30.15 4.54C30.16 3.99 30.68 3.39 31.86 3.23C32.45 3.14 34.25 3.09 36.13 3.97L36.88 0.44C35.87 0.08 34.54 -0.15 32.96 0.1C28.08 0.87 24.76 3.54 24.73 7.21C24.7 9.92 27.28 11.43 29.23 12.39C31.23 13.37 31.9 13.98 31.88 14.86C31.86 16.2 30.3 16.79 28.84 16.82C26.54 16.87 25.26 16.2 24.16 15.69L23.38 19.34C24.49 19.86 26.39 20.26 28.38 20.29C33.6 20.29 36.88 17.71 36.93 14.05C36.93 12.92 36.78 11.51 36.08 10.74ZM47.88 15.69H52.54L49.33 0.16H45.02C44.15 0.16 43.43 0.69 43.08 1.51L36.8 15.69H42.17L43.24 12.75H49.77L48.51 15.69H47.88ZM44.75 8.76L47.45 1.54L48.86 8.76H44.75ZM15.82 15.69H10.6L12.56 0.16H17.76L15.82 15.69Z" /></svg>
              </div>
              <div className="h-8 px-3 flex items-center justify-center grayscale opacity-40">
                <svg viewBox="0 0 50 30" width="30"><circle cx="15" cy="15" r="15" fill="#111"/><circle cx="35" cy="15" r="15" fill="#555"/><path d="M25 15C25 9.77 28.1 5.27 32.5 3.12C28.1 0.97 25 5.47 25 10.7C25 15.93 28.1 20.43 32.5 18.28C28.1 16.13 25 10.23 25 15Z" fill="#333" opacity="0.8"/></svg>
              </div>
              <div className="h-8 px-3 flex items-center justify-center grayscale opacity-40">
                 <span className="font-bold italic text-[#003087] text-sm">PayPal</span>
              </div>
              <div className="h-8 px-3 flex items-center justify-center grayscale opacity-40">
                 <span className="font-bold text-[#00B41E] text-xs">WhatsApp</span>
              </div>
            </div>

            <div className="space-y-4">
              {/* Opcion 1: Tarjeta (Stripe/PayPal) */}
              <div className={`border transition-colors ${paymentMethod === 'card' ? 'border-rg bg-[#fafafa]' : 'border-charcoal/20 bg-white hover:border-charcoal/40'} p-6 shadow-inner cursor-pointer`} onClick={() => setPaymentMethod('card')}>
                <div className="flex items-center justify-between">
                   <div className="flex items-center gap-3">
                     <input type="radio" name="paymentType" value="card" checked={paymentMethod === 'card'} onChange={() => setPaymentMethod('card')} className="accent-rg w-4 h-4" />
                     <div className="flex flex-col">
                       <label className="text-sm font-medium tracking-wide cursor-pointer">Tarjeta de Crédito / Débito</label>
                       <span className="text-[10px] text-charcoal/50">Vía Stripe / PayPal</span>
                     </div>
                   </div>
                   <CreditCard size={20} className={paymentMethod === 'card' ? 'text-rg' : 'text-charcoal/40'} />
                </div>
                
                {paymentMethod === 'card' && (
                  <div className="space-y-4 mt-6 pt-6 border-t border-charcoal/10 animate-in slide-in-from-top-2">
                    <input required type="text" placeholder="Número de Tarjeta" className="w-full border border-charcoal/20 bg-white p-4 outline-none focus:border-rg transition-colors text-sm font-light tracking-widest font-mono" />
                    <div className="grid grid-cols-2 gap-4">
                       <input required type="text" placeholder="MM / AA" className="border border-charcoal/20 bg-white p-4 outline-none focus:border-rg transition-colors text-sm font-light tracking-widest font-mono text-center" />
                       <input required type="text" placeholder="CVV" className="border border-charcoal/20 bg-white p-4 outline-none focus:border-rg transition-colors text-sm font-light tracking-widest font-mono text-center" />
                    </div>
                    <input required type="text" placeholder="Nombre impreso en la tarjeta" className="w-full border border-charcoal/20 bg-white p-4 outline-none focus:border-rg transition-colors text-sm font-light" />
                  </div>
                )}
              </div>

              {/* Opcion 2: PayID */}
              <div className={`border transition-colors ${paymentMethod === 'payid' ? 'border-rg bg-[#fafafa]' : 'border-charcoal/20 bg-white hover:border-charcoal/40'} p-6 shadow-inner cursor-pointer`} onClick={() => setPaymentMethod('payid')}>
                <div className="flex items-center justify-between">
                   <div className="flex items-center gap-3">
                     <input type="radio" name="paymentType" value="payid" checked={paymentMethod === 'payid'} onChange={() => setPaymentMethod('payid')} className="accent-rg w-4 h-4" />
                     <span className="font-semibold text-[#00b0b9] text-sm flex items-center gap-1 cursor-pointer">
                       PayID
                     </span>
                   </div>
                </div>
                {paymentMethod === 'payid' && (
                  <div className="mt-6 pt-6 border-t border-charcoal/10 animate-in slide-in-from-top-2 text-sm text-charcoal/80">
                    <p className="mb-4">Por favor realiza la transferencia a nuestra cuenta corporativa en Australia:</p>
                    <div className="bg-white border border-charcoal/20 p-4 font-mono text-xs">
                      <p><span className="text-charcoal/50">PayID (Email):</span> {settings?.payIdEmail || "payments@luminajewelry.com.au"}</p>
                      <p className="mt-2"><span className="text-charcoal/50">Reference:</span> {`LUM-${Math.floor(1000 + Math.random() * 9000)}`}</p>
                    </div>
                    <p className="text-[10px] text-charcoal/50 mt-4 uppercase tracking-[1px]">Tu orden será procesada una vez se confirme la recepción de los fondos.</p>
                  </div>
                )}
              </div>

              {/* Opcion 3: WhatsApp Transfer */}
              <div className={`border transition-colors ${paymentMethod === 'whatsapp' ? 'border-rg bg-[#fafafa]' : 'border-charcoal/20 bg-white hover:border-charcoal/40'} p-6 shadow-inner cursor-pointer`} onClick={() => setPaymentMethod('whatsapp')}>
                <div className="flex items-center justify-between">
                   <div className="flex items-center gap-3">
                     <input type="radio" name="paymentType" value="whatsapp" checked={paymentMethod === 'whatsapp'} onChange={() => setPaymentMethod('whatsapp')} className="accent-rg w-4 h-4" />
                     <span className="font-bold text-[#00B41E] text-sm cursor-pointer">Transferencia Directa (WhatsApp)</span>
                   </div>
                </div>
                {paymentMethod === 'whatsapp' && (
                  <div className="mt-6 pt-6 border-t border-charcoal/10 animate-in slide-in-from-top-2 text-sm text-charcoal/80">
                    <p className="mb-4">Completa tu orden para asegurar tu pieza y contáctanos por WhatsApp para recibir los detalles bancarios.</p>
                    <a href={`https://wa.me/${(settings?.whatsappNumber || "+1234567890").replace(/\D/g, '')}`} target="_blank" rel="noopener noreferrer" className="inline-block bg-[#25D366] text-white px-6 py-3 font-medium text-xs uppercase tracking-[2px] hover:bg-[#128C7E] transition-colors" onClick={(e) => e.stopPropagation()}>
                      Abrir WhatsApp
                    </a>
                  </div>
                )}
              </div>
            </div>
          </section>

          <div className="pt-8 pb-4 flex flex-col-reverse md:flex-row items-center justify-between gap-6 border-t border-charcoal/10">
            <NextLink href="/coleccion" className="text-[10px] tracking-[2px] uppercase text-charcoal flex items-center gap-2 hover:text-rg transition-colors w-full md:w-auto justify-center">
              <ArrowLeft size={12} /> Volver al Catálogo
            </NextLink>
            <button 
              type="submit" 
              disabled={cartItems.length === 0}
              className={`w-full md:w-auto text-white py-5 px-12 text-[10px] tracking-[3px] uppercase transition-colors duration-300 flex justify-center items-center gap-3 ${cartItems.length === 0 ? 'bg-charcoal/40 cursor-not-allowed' : 'bg-charcoal hover:bg-rg'}`}
            >
              Completar Orden <Lock size={12} />
            </button>
          </div>
          
        </form>
        
        <div className="mt-8 flex justify-center md:justify-start gap-4 text-[9px] tracking-[2px] uppercase text-charcoal/40">
          <NextLink href="/envios" className="hover:text-charcoal transition-colors">Reembolsos</NextLink>
          <NextLink href="/legales" className="hover:text-charcoal transition-colors">Privacidad</NextLink>
          <NextLink href="/legales" className="hover:text-charcoal transition-colors">Términos</NextLink>
        </div>
      </div>

      {/* Right Column: Order Summary */}
      <div className="w-full md:w-1/2 lg:w-5/12 bg-[#fafafa] pt-12 pb-24 px-6 md:px-12 lg:px-16 border-t md:border-t-0 md:border-l border-charcoal/10 sticky top-0 md:h-screen overflow-y-auto">
         <div className="max-w-md mx-auto md:mx-0 w-full">
           
           <h3 className="font-serif text-2xl text-charcoal mb-8">Resumen de Orden</h3>

           {cartItems.length === 0 ? (
             <div className="text-center py-12 border border-dashed border-charcoal/20">
               <p className="text-charcoal/50 text-sm mb-4">Su carrito está vacío</p>
               <NextLink href="/coleccion" className="text-[10px] tracking-[2px] uppercase border-b border-charcoal pb-1 hover:text-rg hover:border-rg transition-colors">
                 Explorar Colección
               </NextLink>
             </div>
           ) : (
             <>
               <div className="space-y-6 mb-8 border-b border-charcoal/10 pb-8">
                 {cartItems.map(item => (
                   <div key={item.cartId} className="flex gap-6 items-center group">
                     <div className="relative w-20 h-20 bg-white border border-charcoal/10 p-2 shrink-0">
                       <span className="absolute -top-2 -right-2 w-5 h-5 bg-charcoal rounded-full text-white text-[10px] flex items-center justify-center z-10 shadow-md">{item.quantity}</span>
                       <div className="relative w-full h-full">
                         <Image src={item.image} alt={item.name} fill className="object-cover mix-blend-multiply opacity-70" />
                       </div>
                     </div>
                     <div className="flex-1">
                       <h4 className="font-serif text-base text-charcoal leading-snug">{item.name}</h4>
                       <p className="text-[9px] uppercase tracking-[2px] text-charcoal/50 mt-1">{item.category}</p>
                     </div>
                     <div className="flex flex-col items-end gap-2">
                       <p className="text-sm font-medium text-charcoal">${item.price.toLocaleString()}</p>
                       <button 
                         type="button"
                         onClick={() => removeFromCart(item.cartId)}
                         className="text-charcoal/30 hover:text-red-500 transition-colors p-1"
                         title="Eliminar del carrito"
                       >
                         <X size={14} />
                       </button>
                     </div>
                   </div>
                 ))}
               </div>

               <div className="space-y-4 text-sm font-light text-charcoal/70 mb-8 border-b border-charcoal/10 pb-8">
                 <div className="flex justify-between items-center">
                   <span>Subtotal</span>
                   <span className="font-medium text-charcoal">${subtotal.toLocaleString()}</span>
                 </div>
                 <div className="flex justify-between items-center">
                   <span>Envío (Mensajería Blindada)</span>
                   <span className="font-medium text-charcoal">${shipping.toLocaleString()}</span>
                 </div>
               </div>

               <div className="flex justify-between items-center mb-12">
                 <span className="text-lg">Total</span>
                 <div className="flex items-baseline gap-2">
                   <span className="text-xs text-charcoal/40">USD</span>
                   <span className="font-serif text-4xl font-medium text-charcoal">${total.toLocaleString()}</span>
                 </div>
               </div>
             </>
           )}

           <div className="bg-white border border-charcoal/10 p-6 shadow-sm">
             <div className="flex items-start gap-4 text-sm font-light text-charcoal/70">
               <ShieldCheck size={28} className="text-rg shrink-0" strokeWidth={1} />
               <div>
                 <h5 className="font-medium text-charcoal text-[11px] uppercase tracking-[2px] mb-2">Garantía Lumina</h5>
                 <p className="leading-relaxed text-xs">
                   Todas las piezas incluyen certificado de autenticidad impreso. El envío viaja asegurado por el 100% de su valor comercial mediante nuestro partner logístico especializado.
                 </p>
               </div>
             </div>
           </div>
           
         </div>
      </div>
      
    </div>
  );
}
