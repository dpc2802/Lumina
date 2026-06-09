import { Search, Filter, MoreHorizontal, Mail, Phone, Star } from "lucide-react";
import { prisma } from "@/lib/db";
import { formatDistanceToNow } from "date-fns";
import { es } from "date-fns/locale";
import DeleteCustomerButton from "@/components/DeleteCustomerButton";

export default async function ClientesVIP() {
  const dbCustomers = await prisma.customer.findMany({
    include: {
      orders: {
        orderBy: { createdAt: 'desc' },
        take: 1
      }
    },
    orderBy: { spent: 'desc' }
  });

  const getTier = (spent: number) => {
    if (spent >= 50000) return "Black";
    if (spent >= 20000) return "Diamante";
    if (spent >= 5000) return "Platino";
    return "Oro";
  };

  const clients = dbCustomers.map(c => ({
    id: c.id,
    name: c.name,
    email: c.email,
    phone: c.phone || "Sin teléfono",
    tier: getTier(c.spent),
    spent: `$${c.spent.toLocaleString()}`,
    lastOrder: c.orders.length > 0 
      ? `Hace ${formatDistanceToNow(new Date(c.orders[0].createdAt), { locale: es }).replace('alrededor de ', '')}` 
      : "Sin órdenes"
  }));

  const getTierColor = (tier: string) => {
    switch(tier) {
      case 'Black':
        return 'bg-black text-white border-black';
      case 'Diamante':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'Platino':
        return 'bg-slate-100 text-slate-700 border-slate-300';
      case 'Oro':
        return 'bg-yellow-50 text-yellow-700 border-yellow-300';
      default:
        return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  return (
    <div>
      <header className="mb-12 flex flex-col md:flex-row md:justify-between md:items-end gap-6">
        <div>
          <h1 className="font-serif text-3xl md:text-4xl text-charcoal mb-2">Cartera de Clientes</h1>
          <p className="text-charcoal/60 text-sm">Gestiona la información, historial y niveles de lealtad de tu cartera VIP.</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-charcoal/40" />
            <input 
              type="text" 
              placeholder="Buscar cliente..." 
              className="pl-12 pr-4 py-3 bg-white border border-charcoal/10 outline-none text-sm w-64 focus:border-rg transition-colors"
            />
          </div>
          <button className="bg-white border border-charcoal/10 text-charcoal p-3 hover:border-rg hover:text-rg transition-colors">
            <Filter size={18} />
          </button>
        </div>
      </header>

      {/* Clients Table */}
      <div className="bg-white border border-charcoal/10 shadow-sm overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[900px]">
          <thead>
            <tr className="bg-[#fafafa] border-b border-charcoal/10 text-[10px] tracking-[2px] uppercase text-charcoal/60">
              <th className="font-medium px-8 py-5">Cliente</th>
              <th className="font-medium px-8 py-5">Contacto</th>
              <th className="font-medium px-8 py-5 text-center">Nivel VIP</th>
              <th className="font-medium px-8 py-5 text-right">Total Invertido</th>
              <th className="font-medium px-8 py-5 text-right">Última Compra</th>
              <th className="font-medium px-8 py-5 text-center">Acción</th>
            </tr>
          </thead>
          <tbody>
            {clients.map((client, i) => (
              <tr key={i} className="border-b border-charcoal/5 hover:bg-[#fafafa]/50 transition-colors group">
                <td className="px-8 py-6">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-charcoal text-white flex items-center justify-center font-serif text-lg">
                      {client.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-medium text-sm text-charcoal">{client.name}</p>
                      <p className="text-[10px] tracking-[1px] uppercase text-charcoal/40">ID: {client.id}</p>
                    </div>
                  </div>
                </td>
                <td className="px-8 py-6">
                  <div className="space-y-1.5">
                    <p className="text-xs text-charcoal/70 flex items-center gap-2"><Mail size={12} className="text-charcoal/40" /> {client.email}</p>
                    <p className="text-xs text-charcoal/70 flex items-center gap-2"><Phone size={12} className="text-charcoal/40" /> {client.phone}</p>
                  </div>
                </td>
                <td className="px-8 py-6 text-center">
                  <span className={`inline-flex items-center px-3 py-1 text-[10px] uppercase tracking-[1px] border rounded-full ${getTierColor(client.tier)}`}>
                    {client.tier === 'Black' && <Star size={10} className="mr-1.5 fill-white" />}
                    {client.tier}
                  </span>
                </td>
                <td className="px-8 py-6 text-sm font-serif font-medium text-right text-rg">{client.spent}</td>
                <td className="px-8 py-6 text-sm text-charcoal/60 text-right">{client.lastOrder}</td>
                <td className="px-8 py-6">
                  <div className="flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                    <a 
                      href={`mailto:${client.email}`}
                      className="p-2 text-charcoal bg-[#fafafa] border border-charcoal/10 hover:bg-charcoal hover:text-white transition-colors"
                      title="Enviar Correo"
                    >
                      <Mail size={14} />
                    </a>
                    {client.phone !== "Sin teléfono" && (
                      <a 
                        href={`https://wa.me/${client.phone.replace(/\D/g, '')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 text-[#25D366] bg-[#fafafa] border border-[#25D366]/20 hover:bg-[#25D366] hover:text-white transition-colors"
                        title="Contactar por WhatsApp"
                      >
                        <Phone size={14} />
                      </a>
                    )}
                    <DeleteCustomerButton id={client.id} customerName={client.name} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
}
