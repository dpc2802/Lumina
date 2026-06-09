"use client";

import NextLink from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, ShoppingBag, Users, PackageSearch, LogOut, Settings } from "lucide-react";
import { logoutAdmin } from "@/app/actions";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const menu = [
    { name: "Resumen", href: "/admin", icon: LayoutDashboard },
    { name: "Órdenes VIP", href: "/admin/ordenes", icon: ShoppingBag },
    { name: "Inventario", href: "/admin/inventario", icon: PackageSearch },
    { name: "Clientes", href: "/admin/clientes", icon: Users },
    { name: "Configuración", href: "/admin/configuracion", icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-[#FAFAFA] font-sans flex text-charcoal">
      {/* Sidebar */}
      <aside className="w-64 bg-[#111] text-white flex flex-col sticky top-0 h-screen z-50 flex-shrink-0">
        <div className="p-8 border-b border-white/10 flex justify-center">
          <NextLink href="/" className="font-serif text-2xl tracking-[0.2em] uppercase hover:text-rg transition-colors text-center">
            Lumina
            <span className="block text-[8px] tracking-[4px] text-rg mt-2">Admin Portal</span>
          </NextLink>
        </div>
        
        <div className="px-6 py-8">
          <span className="text-[9px] tracking-[3px] uppercase text-white/40 mb-6 block font-medium">Panel Principal</span>
          <nav className="space-y-2">
            {menu.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <NextLink 
                  key={item.name} 
                  href={item.href}
                  className={`flex items-center gap-4 px-4 py-3 text-sm transition-all ${isActive ? 'bg-white/10 text-rg font-medium border-l-2 border-rg' : 'text-white/60 hover:text-white hover:bg-white/5 border-l-2 border-transparent'}`}
                >
                  <Icon size={18} strokeWidth={isActive ? 2 : 1.5} />
                  {item.name}
                </NextLink>
              );
            })}
          </nav>
        </div>

        <div className="mt-auto p-6 border-t border-white/10">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-10 h-10 rounded-full bg-rg text-white flex items-center justify-center font-serif text-lg">
              A
            </div>
            <div>
              <p className="text-xs font-medium">ADMIN</p>
              <p className="text-[10px] tracking-[1px] text-white/50 uppercase">Propietario</p>
            </div>
          </div>
          <button 
            onClick={async () => {
              await logoutAdmin();
              window.location.href = "/";
            }} 
            className="flex items-center gap-3 text-xs text-white/50 hover:text-white transition-colors w-full text-left"
          >
            <LogOut size={16} /> Cerrar Bóveda
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-8 md:p-12 overflow-x-hidden min-h-screen">
        <div className="max-w-6xl mx-auto animate-in fade-in duration-700 slide-in-from-bottom-4">
          {children}
        </div>
      </main>
    </div>
  );
}
