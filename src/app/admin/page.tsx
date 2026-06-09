import { TrendingUp, Users, ShoppingBag, DollarSign, ArrowUpRight } from "lucide-react";
import { prisma } from "@/lib/db";
import DashboardChart from "@/components/DashboardChart";

export const dynamic = 'force-dynamic';

export default async function AdminDashboard() {
  const [orders, customersCount, totalRevenue, recentOrders, recentOrdersForChart] = await Promise.all([
    prisma.order.count(),
    prisma.customer.count(),
    prisma.order.aggregate({ _sum: { totalAmount: true } }),
    prisma.order.findMany({
      take: 3,
      orderBy: { createdAt: 'desc' },
      include: {
        customer: true,
        items: { include: { product: true } }
      }
    }),
    prisma.order.findMany({
      where: {
        createdAt: {
          gte: new Date(new Date().setDate(new Date().getDate() - 30)) // Fetch full 30 days always
        }
      },
      select: {
        createdAt: true,
        totalAmount: true
      }
    })
  ]);

  const revenue = totalRevenue._sum.totalAmount || 0;
  const avgTicket = orders > 0 ? Math.round(revenue / orders) : 0;

  return (
    <div>
      <header className="mb-12 flex justify-between items-end">
        <div>
          <h1 className="font-serif text-3xl md:text-4xl text-charcoal mb-2">Resumen Financiero</h1>
          <p className="text-charcoal/60 text-sm">Bienvenido de vuelta. Aquí está el rendimiento de Lumina en los últimos 30 días.</p>
        </div>
        <a href="/api/export" download className="bg-charcoal text-white text-[10px] tracking-[2px] uppercase px-6 py-3 flex items-center gap-2 hover:bg-rg transition-colors">
          Descargar Reporte <ArrowUpRight size={14} />
        </a>
      </header>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        
        {/* Card 1 */}
        <div className="bg-white p-6 border border-charcoal/10 shadow-sm flex flex-col relative overflow-hidden group hover:border-rg transition-colors">
          <div className="flex justify-between items-start mb-4 relative z-10">
            <div className="w-10 h-10 rounded-full bg-[#111] flex items-center justify-center text-rg">
              <DollarSign size={20} />
            </div>
            {revenue > 0 && (
              <span className="text-xs font-medium text-emerald-600 flex items-center gap-1 bg-emerald-50 px-2 py-1 rounded-full">
                +14.2% <TrendingUp size={12} />
              </span>
            )}
          </div>
          <p className="text-[10px] tracking-[2px] uppercase text-charcoal/50 mb-1 relative z-10">Ingresos Mensuales</p>
          <h2 className="font-serif text-3xl text-charcoal relative z-10">${revenue.toLocaleString()}</h2>
          <div className="absolute -bottom-4 -right-4 text-charcoal/5 group-hover:text-rg/5 transition-colors">
            <DollarSign size={100} />
          </div>
        </div>

        {/* Card 2 */}
        <div className="bg-white p-6 border border-charcoal/10 shadow-sm flex flex-col relative overflow-hidden group hover:border-rg transition-colors">
          <div className="flex justify-between items-start mb-4 relative z-10">
            <div className="w-10 h-10 rounded-full bg-[#111] flex items-center justify-center text-rg">
              <ShoppingBag size={20} />
            </div>
          </div>
          <p className="text-[10px] tracking-[2px] uppercase text-charcoal/50 mb-1 relative z-10">Órdenes Procesadas</p>
          <h2 className="font-serif text-3xl text-charcoal relative z-10">{orders}</h2>
          <div className="absolute -bottom-4 -right-4 text-charcoal/5 group-hover:text-rg/5 transition-colors">
            <ShoppingBag size={100} />
          </div>
        </div>

        {/* Card 3 */}
        <div className="bg-white p-6 border border-charcoal/10 shadow-sm flex flex-col relative overflow-hidden group hover:border-rg transition-colors">
          <div className="flex justify-between items-start mb-4 relative z-10">
            <div className="w-10 h-10 rounded-full bg-[#111] flex items-center justify-center text-rg">
              <Users size={20} />
            </div>
          </div>
          <p className="text-[10px] tracking-[2px] uppercase text-charcoal/50 mb-1 relative z-10">Total Clientes</p>
          <h2 className="font-serif text-3xl text-charcoal relative z-10">{customersCount}</h2>
          <div className="absolute -bottom-4 -right-4 text-charcoal/5 group-hover:text-rg/5 transition-colors">
            <Users size={100} />
          </div>
        </div>

        {/* Card 4 */}
        <div className="bg-white p-6 border border-charcoal/10 shadow-sm flex flex-col relative overflow-hidden group hover:border-rg transition-colors">
          <div className="flex justify-between items-start mb-4 relative z-10">
            <div className="w-10 h-10 rounded-full bg-[#111] flex items-center justify-center text-rg">
              <TrendingUp size={20} />
            </div>
          </div>
          <p className="text-[10px] tracking-[2px] uppercase text-charcoal/50 mb-1 relative z-10">Ticket Promedio</p>
          <h2 className="font-serif text-3xl text-charcoal relative z-10">${avgTicket.toLocaleString()}</h2>
          <div className="absolute -bottom-4 -right-4 text-charcoal/5 group-hover:text-rg/5 transition-colors">
            <TrendingUp size={100} />
          </div>
        </div>

      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Animated Client Chart Area */}
        <DashboardChart recentOrders={recentOrdersForChart} />

        {/* Recent Activity */}
        <div className="bg-white p-8 border border-charcoal/10 shadow-sm flex flex-col">
          <h3 className="font-serif text-xl text-charcoal mb-8">Ventas Recientes</h3>
          
          <div className="space-y-6 flex-1 overflow-y-auto pr-2">
            
            {recentOrders.length === 0 ? (
              <p className="text-sm text-charcoal/50">Aún no hay órdenes registradas.</p>
            ) : (
              recentOrders.map(order => (
                <div key={order.id} className="flex gap-4 items-start">
                  <div className="w-12 h-12 bg-[#fafafa] flex-shrink-0 flex items-center justify-center border border-charcoal/10">
                    <div className="w-2 h-2 bg-rg rounded-full"></div>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-charcoal">{order.items[0]?.product?.name || "Orden Lumina"} {order.items.length > 1 && `+${order.items.length - 1}`}</p>
                    <p className="text-xs text-charcoal/60">Cliente: {order.customer?.name}</p>
                    <p className="text-xs font-serif text-rg mt-1">${order.totalAmount.toLocaleString()} • {order.orderNumber}</p>
                  </div>
                </div>
              ))
            )}

          </div>
          
          <button className="w-full py-3 mt-6 border border-charcoal/20 text-xs tracking-[2px] uppercase hover:bg-charcoal hover:text-white transition-colors">
            Ver Todas las Órdenes
          </button>

        </div>
      </div>
    </div>
  );
}
