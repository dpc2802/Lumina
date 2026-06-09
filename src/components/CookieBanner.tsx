"use client";

import { useState, useEffect } from "react";
import { X, Check, Cookie } from "lucide-react";

export default function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);
  const [isConfiguring, setIsConfiguring] = useState(false);
  
  // Opciones de configuración
  const [preferences, setPreferences] = useState({
    essential: true, 
    analytics: true,
    marketing: false
  });

  useEffect(() => {
    const cookieConsent = localStorage.getItem("lumina_cookies_consent");
    if (!cookieConsent) {
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
    <div className="fixed bottom-6 left-6 z-[150] w-[calc(100%-3rem)] md:w-[320px] flex flex-col pointer-events-none">
      <div className="bg-charcoal/95 backdrop-blur-xl border border-white/10 shadow-2xl p-6 flex flex-col pointer-events-auto animate-in slide-in-from-bottom-10 fade-in duration-700">
        
        {!isConfiguring ? (
          // Vista Minimalista
          <>
            <div className="flex justify-between items-start mb-4">
              <h3 className="font-serif text-lg text-white flex items-center gap-2">
                <Cookie size={16} className="text-rg" />
                Privacidad
              </h3>
              <button onClick={rejectAll} className="text-white/40 hover:text-white transition-colors">
                <X size={16} strokeWidth={1.5} />
              </button>
            </div>
            
            <p className="text-[11px] font-light text-white/60 leading-relaxed mb-6">
              Utilizamos cookies para garantizar la mejor experiencia en nuestra bóveda digital y personalizar su visita.
            </p>
            
            <div className="flex flex-col gap-2">
              <button 
                onClick={acceptAll}
                className="w-full text-[10px] tracking-[2px] uppercase bg-white text-charcoal px-4 py-3 hover:bg-rg hover:text-white transition-colors font-medium"
              >
                Aceptar Todas
              </button>
              <div className="flex gap-2">
                <button 
                  onClick={() => setIsConfiguring(true)}
                  className="w-1/2 text-[9px] tracking-[1px] uppercase text-white/70 border border-white/20 py-2 hover:bg-white/10 transition-colors"
                >
                  Configurar
                </button>
                <button 
                  onClick={rejectAll}
                  className="w-1/2 text-[9px] tracking-[1px] uppercase text-white/70 border border-white/20 py-2 hover:bg-white/10 transition-colors"
                >
                  Rechazar
                </button>
              </div>
            </div>
          </>
        ) : (
          // Vista de Configuración
          <div className="flex flex-col animate-in fade-in duration-300">
            <h3 className="font-serif text-lg text-white mb-4">Preferencias</h3>
            <div className="space-y-4 mb-6">
              
              <div className="flex items-start gap-3">
                <div className="mt-0.5 flex-shrink-0 w-4 h-4 rounded-sm bg-white/10 flex items-center justify-center cursor-not-allowed border border-white/20">
                  <Check size={12} className="text-white/50" />
                </div>
                <div>
                  <h4 className="text-xs font-medium text-white">Esenciales</h4>
                  <p className="text-[10px] text-white/40 mt-1">Requeridas para el funcionamiento.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <button 
                  onClick={() => setPreferences({...preferences, analytics: !preferences.analytics})}
                  className={`mt-0.5 flex-shrink-0 w-4 h-4 rounded-sm flex items-center justify-center transition-colors border ${preferences.analytics ? 'bg-rg border-rg' : 'border-white/30 hover:border-white/50'}`}
                >
                  {preferences.analytics && <Check size={12} className="text-white" />}
                </button>
                <div>
                  <h4 className="text-xs font-medium text-white">Analítica</h4>
                  <p className="text-[10px] text-white/40 mt-1">Para mejorar su experiencia.</p>
                </div>
              </div>

            </div>

            <div className="flex flex-col gap-2">
              <button 
                onClick={savePreferences}
                className="w-full text-[10px] tracking-[2px] uppercase bg-rg text-white px-4 py-3 hover:bg-rg-lt transition-colors"
              >
                Guardar
              </button>
              <button 
                onClick={() => setIsConfiguring(false)}
                className="w-full text-[9px] tracking-[1px] uppercase text-white/60 py-2 hover:text-white transition-colors"
              >
                Volver
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
