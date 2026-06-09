import { Plus, Search, Filter, AlertCircle, CheckCircle2, Edit2 } from "lucide-react";
import Image from "next/image";
import NextLink from "next/link";
import { prisma } from "@/lib/db";
import { deleteProduct } from "@/app/actions";
import { DeleteButton } from "@/components/DeleteButton";

export default async function Inventario() {
  const products = await prisma.product.findMany({
    orderBy: { createdAt: 'desc' }
  });
  return (
    <div>
      <header className="mb-12 flex flex-col md:flex-row md:justify-between md:items-end gap-6">
        <div>
          <h1 className="font-serif text-3xl md:text-4xl text-charcoal mb-2">Inventario</h1>
          <p className="text-charcoal/60 text-sm">Gestiona tu catálogo de joyas, actualiza precios y controla el stock.</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-charcoal/40" />
            <input 
              type="text" 
              placeholder="Buscar joya..." 
              className="pl-12 pr-4 py-3 bg-white border border-charcoal/10 outline-none text-sm w-48 focus:border-rg transition-colors"
            />
          </div>
          <NextLink href="/admin/inventario/nuevo" className="bg-charcoal text-white text-[10px] tracking-[2px] uppercase px-6 py-3 flex items-center gap-2 hover:bg-rg transition-colors">
            <Plus size={14} /> Añadir Pieza
          </NextLink>
        </div>
      </header>

      {/* Table Container */}
      <div className="bg-white border border-charcoal/10 shadow-sm overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[800px]">
          <thead>
            <tr className="bg-[#fafafa] border-b border-charcoal/10 text-[10px] tracking-[2px] uppercase text-charcoal/60">
              <th className="font-medium px-8 py-5">Producto</th>
              <th className="font-medium px-8 py-5">Categoría</th>
              <th className="font-medium px-8 py-5 text-center">Stock</th>
              <th className="font-medium px-8 py-5 text-right">Precio Público</th>
              <th className="font-medium px-8 py-5 text-center">Acción</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id} className="border-b border-charcoal/5 hover:bg-[#fafafa]/50 transition-colors group">
                <td className="px-8 py-6">
                  <div className="flex items-center gap-4">
                    <div className="relative w-12 h-12 bg-[#fafafa] border border-charcoal/10 overflow-hidden flex-shrink-0">
                      <Image src={product.image} alt={product.name} fill className="object-cover mix-blend-multiply" />
                    </div>
                    <div>
                      <p className="font-serif text-sm text-charcoal">{product.name}</p>
                      <p className="text-[10px] tracking-[1px] uppercase text-charcoal/50">{product.material}</p>
                    </div>
                  </div>
                </td>
                <td className="px-8 py-6 text-sm text-charcoal/80">{product.category}</td>
                <td className="px-8 py-6 text-center">
                  {product.stock === 0 ? (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-red-50 text-red-700 border border-red-200 rounded-full text-xs font-medium">
                      <AlertCircle size={12} /> Agotado
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-full text-xs font-medium">
                      <CheckCircle2 size={12} /> {product.stock} uds
                    </span>
                  )}
                </td>
                <td className="px-8 py-6 text-sm font-serif font-medium text-right">${product.price.toLocaleString()}</td>
                <td className="px-8 py-6 text-center">
                  <div className="flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                    <NextLink href={`/admin/inventario/editar/${product.id}`} className="p-2 text-charcoal/50 hover:text-charcoal bg-charcoal/5 rounded transition-colors" title="Editar">
                      <Edit2 size={16} />
                    </NextLink>
                    <form action={async () => {
                      "use server";
                      await deleteProduct(product.id);
                    }}>
                      <DeleteButton />
                    </form>
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
