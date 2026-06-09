import { getProducts } from "@/app/actions";
import Storefront from "./HomePageClient";

export default async function Home() {
  const products = await getProducts();
  return <Storefront initialProducts={products} />;
}
