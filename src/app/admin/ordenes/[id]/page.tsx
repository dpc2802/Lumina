import { ArrowLeft, Package, User, MapPin, CheckCircle2, Clock, Truck, CreditCard } from "lucide-react";
import NextLink from "next/link";
import { prisma } from "@/lib/db";
import { notFound } from "next/navigation";
import Image from "next/image";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { OrderStatusSelect } from "@/components/OrderStatusSelect";
import { DeleteOrderButton } from "@/components/DeleteOrderButton";

export default async function OrderDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  
  const order = await prisma.order.findUnique({
    where: { id: resolvedParams.id },
    include: {
      customer: true,
      items: {
        include: { product: true }
      }
    }
  });

  if (!order) {
    notFound();
  }

  return (
    <div>
      <header className="mb-8">
        <NextLink href="/admin/ordenes" className="text-xs text-charcoal/50 flex items-center gap-2 hover:text-rg mb-6 w-max">
          <ArrowLeft size={12} /> Volver a Órdenes
        </NextLink>
        <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-6">
          <div>
            <h1 className="font-serif text-3xl md:text-4xl text-charcoal mb-2">Orden {order.orderNumber}</h1>
            <p className="text-charcoal/60 text-sm">Realizada el {format(new Date(order.createdAt), "d 'de' MMMM, yyyy 'a las' HH:mm", { locale: es })}</p>
          </div>
          <div className="flex items-center">
            <OrderStatusSelect orderId={order.id} initialStatus={order.status} />
            <DeleteOrderButton orderId={order.id} />
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Detalle de Productos (2/3) */}
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white border border-charcoal/10 shadow-sm p-8">
            <h2 className="text-xs tracking-[2px] uppercase font-medium text-charcoal mb-6 border-b border-charcoal/10 pb-4 flex items-center gap-2">
              <Package size={14} className="text-charcoal/50" /> Artículos Adquiridos
            </h2>
            
            <div className="space-y-6">
              {order.items.map((item) => (
                <div key={item.id} className="flex gap-4 items-center">
                  <div className="relative w-20 h-20 bg-[#fafafa] border border-charcoal/5 flex-shrink-0">
                    <Image src={item.product.image} alt={item.product.name} fill className="object-cover mix-blend-multiply p-2" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-charcoal text-sm">{item.product.name}</h3>
                    <p className="text-xs text-charcoal/50 mt-1">{item.product.category}</p>
                    <p className="text-xs font-medium mt-2">Cantidad: {item.quantity}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-serif font-medium text-charcoal">${(item.priceAtPurchase * item.quantity).toLocaleString()}</p>
                    {item.quantity > 1 && (
                      <p className="text-xs text-charcoal/50 mt-1">${item.priceAtPurchase.toLocaleString()} c/u</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 pt-6 border-t border-charcoal/10 space-y-3">
              <div className="flex justify-between text-sm text-charcoal/60">
                <span>Subtotal</span>
                <span>${order.totalAmount.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm text-charcoal/60">
                <span>Envío Blindado</span>
                <span>Gratis</span>
              </div>
              <div className="flex justify-between text-lg font-serif font-medium text-charcoal pt-3 border-t border-charcoal/10">
                <span>Total</span>
                <span className="text-rg">${order.totalAmount.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Información Adicional (1/3) */}
        <div className="space-y-6">
          <div className="bg-white border border-charcoal/10 shadow-sm p-6">
            <h2 className="text-xs tracking-[2px] uppercase font-medium text-charcoal mb-6 flex items-center gap-2">
              <User size={14} className="text-charcoal/50" /> Información del Cliente
            </h2>
            <div className="space-y-4">
              <div>
                <p className="text-xs text-charcoal/50 uppercase tracking-[1px] mb-1">Nombre</p>
                <p className="text-sm font-medium">{order.customer.name}</p>
              </div>
              <div>
                <p className="text-xs text-charcoal/50 uppercase tracking-[1px] mb-1">Email</p>
                <p className="text-sm">{order.customer.email}</p>
              </div>
              {order.customer.phone && (
                <div>
                  <p className="text-xs text-charcoal/50 uppercase tracking-[1px] mb-1">Teléfono</p>
                  <p className="text-sm">{order.customer.phone}</p>
                </div>
              )}
            </div>
          </div>

          <div className="bg-white border border-charcoal/10 shadow-sm p-6">
            <h2 className="text-xs tracking-[2px] uppercase font-medium text-charcoal mb-6 flex items-center gap-2">
              <CreditCard size={14} className="text-charcoal/50" /> Método de Pago
            </h2>
            <div className="space-y-4">
              <div>
                <p className="text-xs text-charcoal/50 uppercase tracking-[1px] mb-1">Transacción</p>
                <p className="text-sm font-medium">{order.payment}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
