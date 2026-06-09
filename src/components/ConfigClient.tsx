"use client";

import { useState } from "react";
import { Save, Store, CreditCard, Bell, ShieldCheck, Check, AlertTriangle, Smartphone, MapPin } from "lucide-react";
import { toast } from "sonner";
import { updateStoreSettings } from "@/app/actions";

export default function ConfigClient({ settings }: { settings: any }) {
  const [activeTab, setActiveTab] = useState('detalles');
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState(settings);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await updateStoreSettings(formData);
      toast.success('Configuración guardada exitosamente.', { description: 'Los cambios se han aplicado en vivo a tu tienda.' });
    } catch (error) {
      toast.error('Error al guardar la configuración.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div>
      <header className="mb-12 flex flex-col md:flex-row md:justify-between md:items-end gap-6">
        <div>
          <h1 className="font-serif text-3xl md:text-4xl text-charcoal mb-2">Configuración</h1>
          <p className="text-charcoal/60 text-sm">Administra las preferencias de la tienda, pasarelas de pago y notificaciones.</p>
        </div>
        <button 
          onClick={handleSave}
          disabled={isSaving}
          className={`bg-charcoal text-white text-[10px] tracking-[2px] uppercase px-8 py-3 flex items-center gap-2 hover:bg-rg transition-colors shadow-sm ${isSaving ? 'opacity-70 cursor-wait' : ''}`}
        >
          <Save size={14} /> {isSaving ? 'Guardando...' : 'Guardar Cambios'}
        </button>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Sidebar Nav */}
        <div className="lg:col-span-1 space-y-2">
          <button 
            onClick={() => setActiveTab('detalles')}
            className={`w-full flex items-center gap-3 px-6 py-4 text-sm text-left transition-colors ${activeTab === 'detalles' ? 'bg-white border border-charcoal/10 font-medium text-rg border-l-4 border-l-rg shadow-sm' : 'bg-transparent border border-transparent text-charcoal/60 hover:text-charcoal hover:bg-white/50'}`}
          >
            <Store size={18} /> Detalles de la Boutique
          </button>
          
          <button 
            onClick={() => setActiveTab('pagos')}
            className={`w-full flex items-center gap-3 px-6 py-4 text-sm text-left transition-colors ${activeTab === 'pagos' ? 'bg-white border border-charcoal/10 font-medium text-rg border-l-4 border-l-rg shadow-sm' : 'bg-transparent border border-transparent text-charcoal/60 hover:text-charcoal hover:bg-white/50'}`}
          >
            <CreditCard size={18} /> Pasarelas de Pago
          </button>

          <button 
            onClick={() => setActiveTab('notificaciones')}
            className={`w-full flex items-center gap-3 px-6 py-4 text-sm text-left transition-colors ${activeTab === 'notificaciones' ? 'bg-white border border-charcoal/10 font-medium text-rg border-l-4 border-l-rg shadow-sm' : 'bg-transparent border border-transparent text-charcoal/60 hover:text-charcoal hover:bg-white/50'}`}
          >
            <Bell size={18} /> Notificaciones SMS / Email
          </button>

          <button 
            onClick={() => setActiveTab('legal')}
            className={`w-full flex items-center gap-3 px-6 py-4 text-sm text-left transition-colors ${activeTab === 'legal' ? 'bg-white border border-charcoal/10 font-medium text-rg border-l-4 border-l-rg shadow-sm' : 'bg-transparent border border-transparent text-charcoal/60 hover:text-charcoal hover:bg-white/50'}`}
          >
            <ShieldCheck size={18} /> Privacidad y Legal
          </button>
        </div>

        {/* Content Area */}
        <div className="lg:col-span-2 space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
          
          {/* TAB 1: DETALLES DE BOUTIQUE */}
          {activeTab === 'detalles' && (
            <>
              <section className="bg-white p-8 border border-charcoal/10 shadow-sm">
                <h3 className="font-serif text-xl text-charcoal mb-6 border-b border-charcoal/10 pb-4">Identidad de Marca</h3>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-[10px] tracking-[2px] uppercase text-charcoal/60 mb-2">Nombre de la Tienda</label>
                      <input name="storeName" value={formData.storeName} onChange={handleChange} type="text" className="w-full px-4 py-3 bg-[#fafafa] border border-charcoal/10 outline-none text-sm text-charcoal focus:border-rg transition-colors" />
                    </div>
                    <div>
                      <label className="block text-[10px] tracking-[2px] uppercase text-charcoal/60 mb-2">Teléfono Principal (WhatsApp)</label>
                      <input name="whatsappNumber" value={formData.whatsappNumber} onChange={handleChange} type="text" className="w-full px-4 py-3 bg-[#fafafa] border border-charcoal/10 outline-none text-sm text-charcoal focus:border-rg transition-colors" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[10px] tracking-[2px] uppercase text-charcoal/60 mb-2">Mensaje de Bienvenida (Checkout)</label>
                    <textarea name="checkoutMessage" value={formData.checkoutMessage} onChange={handleChange} rows={3} className="w-full px-4 py-3 bg-[#fafafa] border border-charcoal/10 outline-none text-sm text-charcoal focus:border-rg transition-colors resize-none"></textarea>
                  </div>
                </div>
              </section>

              <section className="bg-white p-8 border border-charcoal/10 shadow-sm opacity-50">
                <h3 className="font-serif text-xl text-charcoal mb-6 border-b border-charcoal/10 pb-4">Cuentas Sociales Vinculadas</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border border-charcoal/10 bg-[#fafafa]">
                    <div>
                      <p className="font-medium text-sm text-charcoal">Instagram</p>
                      <p className="text-xs text-charcoal/50 mt-1">@luminajoyas</p>
                    </div>
                    <button className="text-xs border border-charcoal/20 px-4 py-2 hover:bg-charcoal hover:text-white transition-colors" disabled>Próximamente</button>
                  </div>
                </div>
              </section>
            </>
          )}

          {/* TAB 2: PASARELAS DE PAGO */}
          {activeTab === 'pagos' && (
            <div className="space-y-6">
              <section className="bg-white p-8 border border-charcoal/10 shadow-sm">
                <h3 className="font-serif text-xl text-charcoal mb-6 border-b border-charcoal/10 pb-4">Tarjetas Bancarias (Vía Stripe / PayPal)</h3>
                <div className="space-y-6">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <p className="font-medium text-charcoal text-lg">Integración API Global</p>
                      <p className="text-sm text-charcoal/60 mt-1">Procesamiento de Visa, Mastercard y AMEX mediante Stripe y redirecciones de PayPal.</p>
                    </div>
                    <span className="flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-full text-[10px] uppercase tracking-[1px] font-medium">
                      <Check size={12} /> Activo
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-[10px] tracking-[2px] uppercase text-charcoal/60 mb-2">Stripe Secret Key</label>
                      <input name="stripeSecretKey" value={formData.stripeSecretKey} onChange={handleChange} type="password" placeholder="sk_live_..." className="w-full px-4 py-3 bg-[#fafafa] border border-charcoal/10 outline-none text-sm text-charcoal focus:border-rg transition-colors font-mono" />
                    </div>
                    <div>
                      <label className="block text-[10px] tracking-[2px] uppercase text-charcoal/60 mb-2">PayPal Client ID</label>
                      <input name="paypalClientId" value={formData.paypalClientId} onChange={handleChange} type="password" placeholder="AW..." className="w-full px-4 py-3 bg-[#fafafa] border border-charcoal/10 outline-none text-sm text-charcoal focus:border-rg transition-colors font-mono" />
                    </div>
                  </div>
                </div>
              </section>

              <section className="bg-white p-8 border border-charcoal/10 shadow-sm">
                <h3 className="font-serif text-xl text-charcoal mb-6 border-b border-charcoal/10 pb-4">Transferencias Directas y Manuales</h3>
                <div className="space-y-4">
                  
                  <div className="p-6 border border-emerald-500/20 bg-emerald-50/30 relative overflow-hidden">
                    <div className="absolute top-4 right-4 text-xs text-emerald-600 flex items-center gap-1">
                      <Check size={14}/> Activo
                    </div>
                    <div className="flex items-center gap-3 mb-2">
                      <MapPin size={18} className="text-charcoal" />
                      <p className="font-medium text-sm text-charcoal">PayID (Mercado Australiano)</p>
                    </div>
                    <p className="text-xs text-charcoal/60 mb-4 w-3/4">Los clientes verán este correo corporativo y un código de referencia único para transferir fondos directamente en Australia.</p>
                    <div>
                      <label className="block text-[10px] tracking-[2px] uppercase text-charcoal/60 mb-2">Correo Vinculado a PayID</label>
                      <input name="payIdEmail" value={formData.payIdEmail} onChange={handleChange} type="text" className="w-full md:w-1/2 px-4 py-2 bg-white border border-charcoal/10 outline-none text-sm text-charcoal focus:border-rg transition-colors font-mono" />
                    </div>
                  </div>

                  <div className="p-6 border border-[#25D366]/20 bg-[#25D366]/5 relative overflow-hidden">
                     <div className="absolute top-4 right-4 text-xs text-[#128C7E] flex items-center gap-1">
                      <Check size={14}/> Activo
                    </div>
                    <div className="flex items-center gap-3 mb-2">
                      <Smartphone size={18} className="text-charcoal" />
                      <p className="font-medium text-sm text-charcoal">WhatsApp Direct Transfer</p>
                    </div>
                    <p className="text-xs text-charcoal/60 mb-4 w-3/4">El cliente asegura su orden y es redirigido a este número de WhatsApp para recibir los datos de transferencia y concretar la compra.</p>
                    <div>
                      <label className="block text-[10px] tracking-[2px] uppercase text-charcoal/60 mb-2">Número de WhatsApp Business</label>
                      <input name="whatsappNumber" value={formData.whatsappNumber} onChange={handleChange} type="text" className="w-full md:w-1/2 px-4 py-2 bg-white border border-charcoal/10 outline-none text-sm text-charcoal focus:border-rg transition-colors font-mono" />
                    </div>
                  </div>

                </div>
              </section>
            </div>
          )}

          {/* TAB 3: NOTIFICACIONES SMS / EMAIL */}
          {activeTab === 'notificaciones' && (
            <>
              <section className="bg-white p-8 border border-charcoal/10 shadow-sm">
                <h3 className="font-serif text-xl text-charcoal mb-6 border-b border-charcoal/10 pb-4">Automatización de Correos</h3>
                <div className="space-y-6">
                  
                  <div className="flex items-center gap-4 border-b border-charcoal/5 pb-4">
                    <input type="checkbox" defaultChecked className="w-5 h-5 accent-rg cursor-pointer" />
                    <div>
                      <p className="font-medium text-sm text-charcoal">Confirmación de Orden VIP</p>
                      <p className="text-xs text-charcoal/60 mt-1">Se envía un recibo elegante al cliente al aprobarse el pago.</p>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] tracking-[2px] uppercase text-charcoal/60 mb-2 mt-2">Proveedor SMTP (SendGrid / AWS SES)</label>
                    <input name="smtpProvider" value={formData.smtpProvider} onChange={handleChange} type="password" placeholder="SG.xxxxxxxxxxxxxxxxxxxxxxxxxxxxx" className="w-full px-4 py-3 bg-[#fafafa] border border-charcoal/10 outline-none text-sm text-charcoal focus:border-rg transition-colors font-mono" />
                  </div>

                </div>
              </section>

              <section className="bg-white p-8 border border-charcoal/10 shadow-sm">
                <h3 className="font-serif text-xl text-charcoal mb-6 border-b border-charcoal/10 pb-4">Alertas SMS (Twilio)</h3>
                <p className="text-sm text-charcoal/60 mb-6">Mantenemos informados a nuestros clientes de alto perfil mediante SMS para asegurar que estén en casa para firmar la entrega.</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[10px] tracking-[2px] uppercase text-charcoal/60 mb-2">Account SID</label>
                    <input name="twilioSid" value={formData.twilioSid} onChange={handleChange} type="password" placeholder="ACxxxxxxxxxxxxxxxx" className="w-full px-4 py-3 bg-[#fafafa] border border-charcoal/10 outline-none text-sm text-charcoal focus:border-rg transition-colors font-mono" />
                  </div>
                  <div>
                    <label className="block text-[10px] tracking-[2px] uppercase text-charcoal/60 mb-2">Auth Token</label>
                    <input name="twilioToken" value={formData.twilioToken} onChange={handleChange} type="password" placeholder="xxxxxxxxxxxxxxxxxxxx" className="w-full px-4 py-3 bg-[#fafafa] border border-charcoal/10 outline-none text-sm text-charcoal focus:border-rg transition-colors font-mono" />
                  </div>
                </div>
              </section>
            </>
          )}

          {/* TAB 4: PRIVACIDAD Y LEGAL */}
          {activeTab === 'legal' && (
            <>
              <section className="bg-white p-8 border border-charcoal/10 shadow-sm">
                <h3 className="font-serif text-xl text-charcoal mb-6 border-b border-charcoal/10 pb-4">Políticas Legales de la Marca</h3>
                <p className="text-sm text-charcoal/60 mb-8">Estos textos legales se muestran en el Footer (Pie de página) de la tienda pública y protegen legalmente tus transacciones de alto valor.</p>
                
                <div className="space-y-6">
                  <div>
                    <label className="block text-[10px] tracking-[2px] uppercase text-charcoal/60 mb-2">Términos y Condiciones</label>
                    <textarea name="termsText" value={formData.termsText} onChange={handleChange} rows={6} placeholder="Lumina Joyas se reserva el derecho..." className="w-full px-4 py-3 bg-[#fafafa] border border-charcoal/10 outline-none text-sm text-charcoal focus:border-rg transition-colors text-charcoal/80"></textarea>
                  </div>
                  
                  <div>
                    <label className="block text-[10px] tracking-[2px] uppercase text-charcoal/60 mb-2">Política de Privacidad y Anonimato</label>
                    <textarea name="privacyText" value={formData.privacyText} onChange={handleChange} rows={6} placeholder="Garantizamos el absoluto secreto comercial..." className="w-full px-4 py-3 bg-[#fafafa] border border-charcoal/10 outline-none text-sm text-charcoal focus:border-rg transition-colors text-charcoal/80"></textarea>
                  </div>

                  <div>
                    <label className="block text-[10px] tracking-[2px] uppercase text-charcoal/60 mb-2">Política de Devoluciones (High-Ticket)</label>
                    <textarea name="returnsText" value={formData.returnsText} onChange={handleChange} rows={4} placeholder="Dada la exclusividad de las piezas..." className="w-full px-4 py-3 bg-[#fafafa] border border-charcoal/10 outline-none text-sm text-charcoal focus:border-rg transition-colors text-charcoal/80"></textarea>
                  </div>
                </div>
              </section>
            </>
          )}

        </div>

      </div>
    </div>
  );
}
