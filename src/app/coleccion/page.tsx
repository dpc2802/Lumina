import { getProducts } from "@/app/actions";
import Catalog from "./ColeccionClient";

export default async function Coleccion() {
  const products = await getProducts();
  return <Catalog initialProducts={products} />;
}
