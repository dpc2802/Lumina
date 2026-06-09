import NextLink from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#111] text-white pt-32 pb-12 mt-auto z-10 relative">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-24">
          <div className="col-span-1 md:col-span-2">
            <h2 className="font-serif text-3xl tracking-[0.2em] uppercase mb-6">Lumina</h2>
            <p className="text-white/50 text-sm font-light max-w-sm mb-8 leading-relaxed">
              Suscríbete al Club Lumina para recibir invitaciones privadas a nuevos lanzamientos y acceso exclusivo a piezas de edición limitada.
            </p>
            <div className="flex w-full max-w-md">
              <input 
                type="email" 
                placeholder="Tu correo electrónico" 
                className="bg-transparent border-b border-white/20 text-white p-3 w-full outline-none focus:border-rg transition-colors text-sm font-light"
              />
              <button className="border-b border-white/20 hover:border-rg text-rg text-[10px] tracking-[2px] uppercase px-4 transition-colors">
                Suscribir
              </button>
            </div>
          </div>
          
          <div>
            <h4 className="text-[10px] tracking-[3px] uppercase text-white/40 mb-8">Descubrir</h4>
            <ul className="space-y-4 text-sm font-light text-white/70">
              <li><NextLink href="/nosotros" className="hover:text-rg transition-colors">Nuestra Historia</NextLink></li>
              <li><NextLink href="/coleccion" className="hover:text-rg transition-colors">Todas las Colecciones</NextLink></li>
              <li><NextLink href="/coleccion" className="hover:text-rg transition-colors">Cadenas Fina</NextLink></li>
              <li><NextLink href="/coleccion" className="hover:text-rg transition-colors">Brazaletes</NextLink></li>
              <li><NextLink href="/coleccion" className="hover:text-rg transition-colors">Anillos</NextLink></li>
              <li><NextLink href="/coleccion" className="hover:text-rg transition-colors">Guía de Regalos</NextLink></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-[10px] tracking-[3px] uppercase text-white/40 mb-8">Asistencia</h4>
            <ul className="space-y-4 text-sm font-light text-white/70">
              <li><NextLink href="/contacto" className="hover:text-rg transition-colors">Contáctanos</NextLink></li>
              <li><NextLink href="/envios" className="hover:text-rg transition-colors">Envíos y Devoluciones</NextLink></li>
              <li><NextLink href="/cuidado" className="hover:text-rg transition-colors">Cuidado de Joyas</NextLink></li>
              <li><NextLink href="/faq" className="hover:text-rg transition-colors">Preguntas Frecuentes</NextLink></li>
            </ul>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/10 text-[10px] tracking-[2px] text-white/40 uppercase text-center md:text-left gap-4 md:gap-0">
          <p>© 2026 Lumina Joyas. Todos los derechos reservados.</p>
          <div className="flex items-center gap-6 mt-4 md:mt-0">
            <span className="text-white/40 flex items-center gap-1.5">
              Diseñado por <a href="https://wa.link/2tyflm" target="_blank" rel="noopener noreferrer" className="text-rg font-serif tracking-[3px] drop-shadow-[0_0_10px_rgba(212,175,55,0.3)] hover:text-white transition-colors cursor-pointer">DPALACIOS</a>
            </span>
            <span className="w-[1px] h-3 bg-white/20"></span>
            <NextLink href="/legales" className="hover:text-white transition-colors">Privacidad y Términos</NextLink>
          </div>
        </div>
      </div>
    </footer>
  );
}
