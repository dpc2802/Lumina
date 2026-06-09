"use client";

import { useState } from "react";
import { loginAdmin } from "@/app/actions";
import { useRouter } from "next/navigation";
import { Lock, ArrowRight, ShieldCheck } from "lucide-react";
import Image from "next/image";

export default function LoginPage() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await loginAdmin(password);
      if (res.success) {
        // Redirigir al admin de manera forzada para limpiar cualquier caché
        window.location.href = "/admin";
      } else {
        setError(res.error || "Error de autenticación");
        setLoading(false);
      }
    } catch (err) {
      setError("Error de red");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-pearl font-sans relative overflow-hidden">
      {/* Background Graphic */}
      <div className="absolute inset-0 z-0 opacity-10 mix-blend-multiply pointer-events-none">
         <Image src="/chain.png" alt="Lumina Security" fill className="object-cover" />
      </div>

      <div className="relative z-10 w-full max-w-md bg-white p-12 border border-charcoal/10 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)]">
        
        <div className="flex flex-col items-center mb-10">
          <div className="w-12 h-12 bg-charcoal rounded-full flex items-center justify-center text-rg mb-6">
            <ShieldCheck size={24} strokeWidth={1.5} />
          </div>
          <h1 className="font-serif text-3xl text-charcoal mb-2 tracking-tight">Bóveda Administrativa</h1>
          <p className="text-[10px] tracking-[3px] uppercase text-charcoal/50">Acceso Restringido</p>
        </div>

        <form onSubmit={handleLogin} className="flex flex-col gap-6">
          <div className="relative">
            <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-charcoal/40" />
            <input 
              type="password"
              placeholder="Contraseña Maestra"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-[#fafafa] border border-charcoal/20 pl-12 pr-4 py-4 text-sm text-charcoal outline-none focus:border-rg transition-colors"
              autoFocus
            />
          </div>

          {error && (
            <p className="text-xs text-red-600 font-medium text-center">{error}</p>
          )}

          <button 
            disabled={loading || !password}
            type="submit"
            className="w-full bg-charcoal text-white py-4 text-[11px] tracking-[3px] uppercase flex justify-center items-center gap-3 hover:bg-rg transition-colors disabled:opacity-50 disabled:cursor-not-allowed group"
          >
            {loading ? 'Verificando...' : 'Desbloquear Panel'}
            {!loading && <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />}
          </button>
        </form>

        <div className="mt-8 text-center border-t border-charcoal/10 pt-6">
          <button onClick={() => router.push('/')} className="text-[10px] tracking-[2px] uppercase text-charcoal/40 hover:text-charcoal transition-colors">
            ← Volver a la Tienda
          </button>
        </div>
      </div>
    </div>
  );
}
