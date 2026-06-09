import ConfigClient from "@/components/ConfigClient";
import { getStoreSettings } from "@/app/actions";

export default async function Configuracion() {
  const settings = await getStoreSettings();

  return (
    <ConfigClient settings={settings} />
  );
}
