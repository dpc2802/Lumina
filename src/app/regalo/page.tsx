import { Suspense } from "react";
import RegaloClient from "./RegaloClient";

export default function RegaloPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-pearl flex items-center justify-center font-serif text-2xl text-charcoal">Preparando sorpresa...</div>}>
      <RegaloClient />
    </Suspense>
  );
}
