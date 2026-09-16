import { getProducts } from "@/app/actions";
import Catalog from "./ColeccionClient";

export default async function Coleccion({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const resolvedParams = await searchParams;
  const category = typeof resolvedParams.categoria === 'string' ? resolvedParams.categoria : undefined;
  const material = typeof resolvedParams.material === 'string' ? resolvedParams.material : undefined;

  const products = await getProducts({ category, material });
  
  return <Catalog initialProducts={products} />;
}
