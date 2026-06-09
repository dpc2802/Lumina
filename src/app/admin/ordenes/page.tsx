import { Search, Filter, MoreHorizontal, FileText } from "lucide-react";
import { prisma } from "@/lib/db";
import { formatDistanceToNow } from "date-fns";
import { es } from "date-fns/locale";
import { OrderStatusSelect } from "@/components/OrderStatusSelect";
import NextLink from "next/link";

export default async function OrdenesVIP() {
  const dbOrders = await prisma.order.findMany({
    orderBy: { createdAt: 'desc' },
    include: {
      customer: true
    }
  });

  return (
    <div>
      <header className="mb-12 flex flex-col md:flex-row md:justify-between md:items-end gap-6">
        <div>
          <h1 className="font-serif text-3xl md:text-4xl text-charcoal mb-2">Órdenes VIP</h1>
          <p className="text-charcoal/60 text-sm">Gestiona y rastrea el estatus de las joyas despachadas.</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-charcoal/40" />
            <input 
              type="text" 
              placeholder="Buscar por ID o cliente..." 
              className="pl-12 pr-4 py-3 bg-white border border-charcoal/10 outline-none text-sm w-64 focus:border-rg transition-colors"
            />
          </div>
          <button className="bg-white border border-charcoal/10 text-charcoal p-3 hover:border-rg hover:text-rg transition-colors">
            <Filter size={18} />
          </button>
        </div>
      </header>

      {/* Table Container */}
      <div className="bg-white border border-charcoal/10 shadow-sm overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-[#fafafa] border-b border-charcoal/10 text-[10px] tracking-[2px] uppercase text-charcoal/60">
              <th className="font-medium px-8 py-5">Order ID</th>
              <th className="font-medium px-8 py-5">Cliente</th>
              <th className="font-medium px-8 py-5">Fecha</th>
              <th className="font-medium px-8 py-5">Estado Logístico</th>
              <th className="font-medium px-8 py-5">Método de Pago</th>
              <th className="font-medium px-8 py-5 text-right">Total</th>
              <th className="font-medium px-8 py-5 text-center">Acción</th>
            </tr>
          </thead>
          <tbody>
            {dbOrders.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-8 py-12 text-center text-charcoal/50">No hay órdenes registradas todavía.</td>
              </tr>
            ) : (
              dbOrders.map((order) => (
                <tr key={order.id} className="border-b border-charcoal/5 hover:bg-[#fafafa]/50 transition-colors group">
                  <td className="px-8 py-6 font-serif text-sm">{order.orderNumber}</td>
                  <td className="px-8 py-6 text-sm font-medium">
                    {order.customer.name}
                    <span className="block text-xs font-light text-charcoal/50 mt-0.5">{order.customer.email}</span>
                  </td>
                  <td className="px-8 py-6 text-sm text-charcoal/60 capitalize">
                    {formatDistanceToNow(new Date(order.createdAt), { addSuffix: true, locale: es })}
                  </td>
                  <td className="px-8 py-6">
                    <OrderStatusSelect orderId={order.id} initialStatus={order.status} />
                  </td>
                  <td className="px-8 py-6 text-sm text-charcoal/60">{order.payment}</td>
                  <td className="px-8 py-6 text-sm font-serif font-medium text-right">${order.totalAmount.toLocaleString()}</td>
                  <td className="px-8 py-6 text-center">
                    <NextLink href={`/admin/ordenes/${order.id}`} className="p-2 text-charcoal/50 hover:text-charcoal bg-charcoal/5 rounded transition-colors mx-auto block w-max opacity-0 group-hover:opacity-100" title="Ver Detalles">
                      <FileText size={16} />
                    </NextLink>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="mt-8 flex justify-between items-center text-sm text-charcoal/50">
        <p>Mostrando {dbOrders.length} órdenes en total</p>
        <div className="flex gap-2">
          <button className="px-4 py-2 bg-white border border-charcoal/10 hover:border-rg transition-colors disabled:opacity-50">Anterior</button>
          <button className="px-4 py-2 bg-white border border-charcoal/10 hover:border-rg transition-colors text-charcoal">Siguiente</button>
        </div>
      </div>
    </div>
  );
}
