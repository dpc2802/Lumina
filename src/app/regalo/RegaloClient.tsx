"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useCart } from "@/components/CartContext";
import { Gift, ArrowRight } from "lucide-react";
import NextLink from "next/link";
import Image from "next/image";

export default function RegaloClient() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { clearCart, addToCart } = useCart();
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [accepted, setAccepted] = useState(false);

  useEffect(() => {
    const data = searchParams.get('d');
    if (data) {
      try {
        const decoded = JSON.parse(decodeURIComponent(atob(data)));
        if (Array.isArray(decoded) && decoded.length > 0) {
          setItems(decoded);
          setLoading(false);
        } else {
          setError(true);
          setLoading(false);
        }
      } catch (e) {
        setError(true);
        setLoading(false);
      }
    } else {
      setError(true);
      setLoading(false);
    }
  }, [searchParams]);

  const handleAccept = () => {
    // Limpiar carrito actual y cargar el de la indirecta
    clearCart();
    items.forEach(item => {
      addToCart(item);
    });
    setAccepted(true);
    
    // Redirigir al catálogo después de 2 segundos
    setTimeout(() => {
      router.push("/coleccion");
    }, 2000);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-pearl flex items-center justify-center font-serif text-2xl text-charcoal">
        <div className="animate-pulse">Desempaquetando sorpresa...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-pearl flex flex-col items-center justify-center p-6 text-center">
        <h1 className="font-serif text-4xl text-charcoal mb-4">El enlace ha caducado</h1>
        <p className="text-sm font-light text-charcoal3 mb-8">No pudimos recuperar la lista de deseos.</p>
        <NextLink href="/" className="px-8 py-3 bg-charcoal text-white text-[10px] tracking-[3px] uppercase">
          Volver al Inicio
        </NextLink>
      </div>
    );
  }

  const total = items.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="min-h-screen bg-pearl flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-rg-pale/20 rounded-full blur-[100px] -z-10" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-charcoal/5 rounded-full blur-[100px] -z-10" />

      {accepted ? (
        <div className="text-center animate-in zoom-in-95 duration-500">
          <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6 text-green-600">
            <Gift size={32} />
          </div>
          <h1 className="font-serif text-4xl text-charcoal mb-4">Selección Añadida</h1>
          <p className="text-charcoal3 font-light">Redirigiendo a tu cesta para finalizar la sorpresa...</p>
        </div>
      ) : (
        <div className="w-full max-w-2xl bg-white p-8 md:p-12 shadow-2xl animate-in slide-in-from-bottom-8 duration-700">
          <div className="flex justify-center mb-8 text-rg">
            <Gift size={48} strokeWidth={1} />
          </div>
          <div className="text-center mb-10">
            <span className="text-[10px] tracking-[5px] uppercase text-rg font-bold mb-4 block">Alguien te ha enviado una indirecta</span>
            <h1 className="font-serif text-4xl md:text-5xl text-charcoal font-light leading-tight">
              Una Selección <br /> <em className="text-charcoal3">Muy Especial</em>
            </h1>
          </div>

          <div className="space-y-4 mb-10 max-h-[40vh] overflow-y-auto pr-2 scrollbar-hide">
            {items.map((item, idx) => (
              <div key={idx} className="flex gap-4 p-4 border border-charcoal/10 bg-[#fafafa]">
                <div className="w-20 h-24 relative bg-white shrink-0">
                  <Image src={item.image} alt={item.name} fill className="object-cover mix-blend-multiply" />
                </div>
                <div className="flex-1 flex flex-col justify-center">
                  <h3 className="font-serif text-lg text-charcoal leading-snug mb-1">{item.name}</h3>
                  <p className="text-[9px] tracking-widest uppercase text-charcoal3 mb-2">{item.category}</p>
                  <p className="text-sm font-bold text-rg">${item.price.toLocaleString('es-ES')}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between border-t border-charcoal/10 pt-6 mb-8">
            <span className="text-[10px] tracking-[3px] uppercase text-charcoal3 font-bold">Valor Total Estimado</span>
            <span className="font-serif text-2xl text-charcoal">${total.toLocaleString('es-ES')}</span>
          </div>

          <button 
            onClick={handleAccept}
            className="w-full bg-charcoal text-white py-5 text-[11px] tracking-[4px] uppercase font-bold hover:bg-rg transition-colors flex items-center justify-center gap-3 shadow-lg"
          >
            Aceptar y Proceder al Pago <ArrowRight size={16} />
          </button>
          
          <p className="text-center text-xs text-charcoal3 font-light mt-6">
            Al aceptar, esta selección reemplazará cualquier artículo que tuvieras previamente en tu cesta.
          </p>
        </div>
      )}
    </div>
  );
}
