import { ArrowLeft } from "lucide-react";
import NextLink from "next/link";
import { updateProduct } from "@/app/actions";
import { redirect, notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import { ImagePreviewInput } from "@/components/ImagePreviewInput";

export default async function EditarProducto({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const product = await prisma.product.findUnique({
    where: { id: resolvedParams.id }
  });

  if (!product) {
    notFound();
  }

  async function submitAction(formData: FormData) {
    "use server";
    await updateProduct(product!.id, formData);
    redirect('/admin/inventario');
  }

  return (
    <div>
      <header className="mb-12 flex flex-col md:flex-row md:justify-between md:items-end gap-6">
        <div>
          <NextLink href="/admin/inventario" className="text-xs text-charcoal/50 flex items-center gap-2 hover:text-rg mb-4">
            <ArrowLeft size={12} /> Volver al Inventario
          </NextLink>
          <h1 className="font-serif text-3xl md:text-4xl text-charcoal mb-2">Editar Joya</h1>
          <p className="text-charcoal/60 text-sm">Modifica los detalles de esta pieza en el catálogo.</p>
        </div>
      </header>

      <div className="bg-white border border-charcoal/10 shadow-sm p-8 max-w-2xl">
        <form action={submitAction} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-medium uppercase tracking-[1px] text-charcoal/70">Nombre de la Joya</label>
              <input required name="name" defaultValue={product.name} type="text" className="w-full border border-charcoal/20 p-3 outline-none focus:border-rg transition-colors text-sm" />
            </div>
            
            <div className="space-y-2">
              <label className="text-xs font-medium uppercase tracking-[1px] text-charcoal/70">Categoría</label>
              <select required name="category" defaultValue={product.category} className="w-full border border-charcoal/20 p-3 outline-none focus:border-rg transition-colors text-sm bg-transparent">
                <option value="Anillos">Anillos</option>
                <option value="Collares">Collares</option>
                <option value="Brazaletes">Brazaletes</option>
                <option value="Aretes">Aretes</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-medium uppercase tracking-[1px] text-charcoal/70">Material</label>
              <input required name="material" defaultValue={product.material} type="text" className="w-full border border-charcoal/20 p-3 outline-none focus:border-rg transition-colors text-sm" />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-medium uppercase tracking-[1px] text-charcoal/70">Precio (USD)</label>
              <input required name="price" defaultValue={product.price} type="number" min="0" className="w-full border border-charcoal/20 p-3 outline-none focus:border-rg transition-colors text-sm" />
            </div>

            <div className="space-y-2 md:col-span-2">
              <label className="text-xs font-medium uppercase tracking-[1px] text-charcoal/70">Foto de la Joya (Subir nueva reemplazará la actual)</label>
              <ImagePreviewInput defaultImage={product.image} />
            </div>

            <div className="space-y-2 md:col-span-2">
              <label className="text-xs font-medium uppercase tracking-[1px] text-charcoal/70">Descripción</label>
              <textarea required name="description" defaultValue={product.description} rows={4} className="w-full border border-charcoal/20 p-3 outline-none focus:border-rg transition-colors text-sm resize-none"></textarea>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-medium uppercase tracking-[1px] text-charcoal/70">Unidades en Stock</label>
              <input required name="stock" defaultValue={product.stock} type="number" min="0" className="w-full border border-charcoal/20 p-3 outline-none focus:border-rg transition-colors text-sm" />
            </div>

            <div className="flex items-center gap-3 mt-8">
              <input type="checkbox" name="isFeatured" defaultChecked={product.isFeatured} id="featured" className="accent-rg w-4 h-4" />
              <label htmlFor="featured" className="text-sm text-charcoal cursor-pointer">Destacar en la página principal</label>
            </div>
          </div>

          <div className="pt-8 mt-8 border-t border-charcoal/10 flex justify-end">
            <button type="submit" className="bg-charcoal text-white text-[10px] tracking-[2px] uppercase px-8 py-4 hover:bg-rg transition-colors">
              Actualizar Joya
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
