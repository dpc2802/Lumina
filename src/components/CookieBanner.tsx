"use client";

import { useState, useEffect } from "react";
import { X, Check } from "lucide-react";

export default function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);
  const [isConfiguring, setIsConfiguring] = useState(false);
  
  // Opciones de configuración
  const [preferences, setPreferences] = useState({
    essential: true, // Siempre true, no se puede cambiar
    analytics: true,
    marketing: false
  });

  useEffect(() => {
    // Revisar si ya aceptó cookies
    const cookieConsent = localStorage.getItem("lumina_cookies_consent");
    if (!cookieConsent) {
      // Pequeño delay para no abrumar al usuario al primer segundo
      const timer = setTimeout(() => setIsVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const acceptAll = () => {
    localStorage.setItem("lumina_cookies_consent", "all");
    setIsVisible(false);
  };

  const rejectAll = () => {
    localStorage.setItem("lumina_cookies_consent", "rejected");
    setIsVisible(false);
  };

  const savePreferences = () => {
    localStorage.setItem("lumina_cookies_consent", JSON.stringify(preferences));
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[150] p-4 md:p-6 flex justify-center pointer-events-none">
      <div className="bg-white/95 backdrop-blur-xl border border-charcoal/10 shadow-2xl p-6 md:p-8 max-w-4xl w-full flex flex-col pointer-events-auto animate-in slide-in-from-bottom-10 fade-in duration-700">
        
        {/* Cabecera */}
        <div className="flex justify-between items-start mb-4">
          <h3 className="font-serif text-2xl text-charcoal flex items-center gap-3">
            <span className="w-1.5 h-1.5 bg-rg rounded-full"></span>
            Privacidad y Cookies
          </h3>
          <button onClick={rejectAll} className="text-charcoal/40 hover:text-charcoal transition-colors">
            <X size={20} strokeWidth={1.5} />
          </button>
        </div>

        {!isConfiguring ? (
          // Vista Principal
          <div className="flex flex-col md:flex-row gap-8 items-end">
            <div className="flex-1">
              <p className="text-sm font-light text-charcoal/70 leading-relaxed">
                Utilizamos cookies propias y de terceros para garantizar el correcto funcionamiento de nuestra bóveda digital, analizar el tráfico y ofrecerle una experiencia de navegación personalizada a su altura. Puede aceptar todas las cookies, rechazarlas o configurar sus preferencias.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
              <button 
                onClick={() => setIsConfiguring(true)}
                className="text-[10px] tracking-[2px] uppercase text-charcoal border border-charcoal/20 px-6 py-3 hover:border-charcoal hover:bg-charcoal/5 transition-colors whitespace-nowrap"
              >
                Configurar
              </button>
              <button 
                onClick={rejectAll}
                className="text-[10px] tracking-[2px] uppercase text-charcoal border border-charcoal/20 px-6 py-3 hover:border-charcoal hover:bg-charcoal/5 transition-colors whitespace-nowrap"
              >
                Rechazar
              </button>
              <button 
                onClick={acceptAll}
                className="text-[10px] tracking-[2px] uppercase bg-charcoal text-white px-8 py-3 hover:bg-rg transition-colors whitespace-nowrap shadow-md"
              >
                Aceptar Todas
              </button>
            </div>
          </div>
        ) : (
          // Vista de Configuración
          <div className="flex flex-col animate-in fade-in duration-300">
            <div className="space-y-6 my-4 border-t border-charcoal/10 pt-6">
              
              <div className="flex items-start gap-4">
                <div className="mt-1 flex-shrink-0 w-5 h-5 rounded-sm bg-charcoal/20 flex items-center justify-center cursor-not-allowed">
                  <Check size={14} className="text-white" />
                </div>
                <div>
                  <h4 className="text-sm font-medium text-charcoal">Estrictamente Necesarias</h4>
                  <p className="text-xs text-charcoal/60 mt-1">Indispensables para que la tienda funcione correctamente (seguridad de pago, carrito de compras).</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <button 
                  onClick={() => setPreferences({...preferences, analytics: !preferences.analytics})}
                  className={`mt-1 flex-shrink-0 w-5 h-5 rounded-sm flex items-center justify-center transition-colors border ${preferences.analytics ? 'bg-charcoal border-charcoal' : 'border-charcoal/30 hover:border-charcoal'}`}
                >
                  {preferences.analytics && <Check size={14} className="text-white" />}
                </button>
                <div>
                  <h4 className="text-sm font-medium text-charcoal">Rendimiento y Analítica</h4>
                  <p className="text-xs text-charcoal/60 mt-1">Nos ayudan a entender cómo los clientes interactúan con nuestra joyería para mejorar la experiencia.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <button 
                  onClick={() => setPreferences({...preferences, marketing: !preferences.marketing})}
                  className={`mt-1 flex-shrink-0 w-5 h-5 rounded-sm flex items-center justify-center transition-colors border ${preferences.marketing ? 'bg-charcoal border-charcoal' : 'border-charcoal/30 hover:border-charcoal'}`}
                >
                  {preferences.marketing && <Check size={14} className="text-white" />}
                </button>
                <div>
                  <h4 className="text-sm font-medium text-charcoal">Publicidad y Marketing</h4>
                  <p className="text-xs text-charcoal/60 mt-1">Permiten mostrarle colecciones y piezas relevantes según sus gustos y preferencias.</p>
                </div>
              </div>

            </div>

            <div className="flex justify-end gap-4 border-t border-charcoal/10 pt-6">
              <button 
                onClick={() => setIsConfiguring(false)}
                className="text-[10px] tracking-[2px] uppercase text-charcoal/60 hover:text-charcoal px-4 py-3 transition-colors"
              >
                Volver
              </button>
              <button 
                onClick={savePreferences}
                className="text-[10px] tracking-[2px] uppercase bg-charcoal text-white px-8 py-3 hover:bg-rg transition-colors shadow-md"
              >
                Guardar Preferencias
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
