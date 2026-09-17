"use client";
import { useState } from "react";
import { useCart } from "@/components/CartContext";
import { Gift, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";

export default function ShareCartButton() {
  const { cartItems } = useCart();
  const [copied, setCopied] = useState(false);

  const handleShare = () => {
    if (cartItems.length === 0) {
      toast.error("La cesta está vacía");
      return;
    }

    // Simplificamos los datos para que la URL no sea infinita
    const minifiedItems = cartItems.map(item => ({
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.image,
      category: item.category,
      material: item.material
    }));

    const dataString = btoa(encodeURIComponent(JSON.stringify(minifiedItems)));
    const url = `${window.location.origin}/regalo?d=${dataString}`;

    navigator.clipboard.writeText(url).then(() => {
      setCopied(true);
      toast.success("Enlace de regalo copiado", {
        description: "Envíalo por WhatsApp a quien te lo va a regalar. 😉"
      });
      setTimeout(() => setCopied(false), 3000);
    });
  };

  return (
    <button 
      onClick={handleShare}
      className="w-full flex items-center justify-center gap-3 py-3 border border-charcoal/20 hover:border-charcoal text-[10px] tracking-[3px] uppercase font-bold text-charcoal transition-all mb-4"
    >
      {copied ? (
        <>
          <CheckCircle2 size={16} className="text-green-600" /> ¡Enlace Copiado!
        </>
      ) : (
        <>
          <Gift size={16} /> Enviar como Indirecta
        </>
      )}
    </button>
  );
}
