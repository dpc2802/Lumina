import { getProductBySlug } from "@/app/actions";
import { notFound } from "next/navigation";
import ProductoClient from "./ProductoClient";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const product = await getProductBySlug(resolvedParams.slug);
  if (!product) return { title: "Producto no encontrado | Lumina" };
  return { title: `${product.name} | Lumina Joyas` };
}

export default async function ProductoPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const product = await getProductBySlug(resolvedParams.slug);

  if (!product) {
    notFound();
  }

  return <ProductoClient product={product} />;
}
