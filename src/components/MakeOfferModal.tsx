import React, { useState, useEffect } from 'react';
import { Vehicle } from '../types';
import { DEALERSHIP_INFO } from '../data/dealershipData';
import { formatNumber, formatPrice } from '../utils/formatters';
import { playHudClick, playTactileChime } from '../utils/audio';
import { useLanguage } from '../context/LanguageContext';
import { 
  X, 
  Tag, 
  DollarSign, 
  Percent, 
  Clock, 
  CheckCircle2, 
  Phone, 
  ShieldCheck, 
  ArrowRight,
  TrendingDown,
  Building2,
  Calendar
} from 'lucide-react';

interface MakeOfferModalProps {
  vehicle: Vehicle | null;
  currency: 'USD' | 'EUR' | 'BTC';
  onClose: () => void;
}

export const MakeOfferModal: React.FC<MakeOfferModalProps> = ({
  vehicle,
  currency,
  onClose,
}) => {
  const { lang } = useLanguage();

  const [offerPrice, setOfferPrice] = useState<number>(0);
  const [purchaseType, setPurchaseType] = useState<'cash' | 'finance' | 'trade'>('cash');
  const [buyerName, setBuyerName] = useState('');
  const [buyerPhone, setBuyerPhone] = useState('');
  const [buyerEmail, setBuyerEmail] = useState('');
  const [timeframe, setTimeframe] = useState('24-48-hours');
  const [buyerNotes, setBuyerNotes] = useState('');
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [referenceId, setReferenceId] = useState('');
  const [honeypot, setHoneypot] = useState('');

  useEffect(() => {
    if (vehicle) {
      // Default initial offer: ~5% below sticker rounded to nearest 250
      const initialOffer = Math.round((vehicle.price * 0.95) / 250) * 250;
      setOfferPrice(initialOffer);
      setHasSubmitted(false);
      setReferenceId(`BM-${vehicle.stockNumber}-${Math.floor(1000 + Math.random() * 9000)}`);
    }
  }, [vehicle]);

  if (!vehicle) return null;

  const priceDiff = vehicle.price - offerPrice;
  const percentDiff = ((priceDiff / vehicle.price) * 100).toFixed(1);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (honeypot) return;
    playTactileChime();
    setHasSubmitted(true);
  };

  return (
    <div
      id="make-offer-modal"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-xl overflow-y-auto"
      itemScope
      itemType="https://schema.org/Offer"
    >
      <meta itemProp="price" content={vehicle.price.toString()} />
      <meta itemProp="priceCurrency" content="USD" />
      <meta itemProp="availability" content="https://schema.org/InStock" />
      <meta itemProp="itemCondition" content="https://schema.org/UsedCondition" />

      <div className="relative w-full max-w-2xl my-auto rounded-3xl glass-obsidian border border-white/15 shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
        
        {/* Modal Top Header */}
        <div className="p-4 sm:p-5 border-b border-white/10 flex items-center justify-between bg-black/50">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-400/20 border border-amber-400/40 text-amber-300 flex items-center justify-center">
              <Tag className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-serif font-bold text-white leading-tight">
                {lang === 'es' ? 'Presentar Oferta por Vehículo' : 'Submit Private Vehicle Offer'}
              </h2>
              <p className="text-xs font-sans text-neutral-400">
                {vehicle.year} {vehicle.name} • VIN: <span className="font-mono text-neutral-300">{vehicle.vinCode}</span>
              </p>
            </div>
          </div>

          <button
            onClick={() => { playHudClick(); onClose(); }}
            className="p-2 rounded-xl bg-white/5 hover:bg-white/15 text-neutral-300 hover:text-white transition-colors cursor-pointer"
            aria-label="Close offer modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-7 max-h-[80vh] overflow-y-auto space-y-6">
          
          {hasSubmitted ? (
            /* Success Feedback State */
            <div className="text-center py-6 sm:py-8 space-y-5">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-emerald-400 flex items-center justify-center mx-auto animate-bounce">
                <CheckCircle2 className="w-9 h-9" />
              </div>

              <div>
                <span className="text-[11px] font-mono uppercase tracking-widest text-amber-400 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/20">
                  {lang === 'es' ? 'OFERTA REGISTRADA' : 'OFFICIAL OFFER REGISTERED'}
                </span>
                <h3 className="text-xl sm:text-2xl font-serif font-bold text-white mt-3">
                  {lang === 'es' ? '¡Oferta Recibida con Éxito!' : 'Your Offer Has Been Submitted!'}
                </h3>
                <p className="text-xs sm:text-sm text-neutral-300 max-w-md mx-auto mt-2 leading-relaxed font-light">
                  {lang === 'es'
                    ? `Hemos transmitido su oferta de $${formatNumber(offerPrice)} para el ${vehicle.year} ${vehicle.name} a la mesa de ventas de Blackshire Motors.`
                    : `We have transmitted your offer of $${formatNumber(offerPrice)} for the ${vehicle.year} ${vehicle.name} to the Blackshire Motors sales desk.`}
                </p>
              </div>

              {/* Reference Details Box */}
              <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 max-w-md mx-auto text-left space-y-2 text-xs font-sans">
                <div className="flex justify-between py-1 border-b border-white/5">
                  <span className="text-neutral-400">{lang === 'es' ? 'Código de Referencia:' : 'Offer Reference:'}</span>
                  <span className="font-mono text-amber-300 font-bold">{referenceId}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-white/5">
                  <span className="text-neutral-400">{lang === 'es' ? 'Vehículo:' : 'Vehicle:'}</span>
                  <span className="text-white font-medium">{vehicle.year} {vehicle.name}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-white/5">
                  <span className="text-neutral-400">{lang === 'es' ? 'Monto Ofertado:' : 'Offered Amount:'}</span>
                  <span className="text-emerald-400 font-bold">${formatNumber(offerPrice)} (0% DE Tax)</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-neutral-400">{lang === 'es' ? 'Tiempo Estimado de Respuesta:' : 'Response Window:'}</span>
                  <span className="text-neutral-200">{lang === 'es' ? '< 2 horas en horario comercial' : '< 2 hours during business hours'}</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                <a
                  href={`tel:${DEALERSHIP_INFO.phones.telPrimary}`}
                  className="w-full sm:w-auto px-5 py-3 rounded-xl bg-white/10 hover:bg-white/15 text-white font-sans text-xs tracking-wider uppercase border border-white/15 flex items-center justify-center gap-2 font-semibold"
                >
                  <Phone className="w-4 h-4 text-amber-400" />
                  <span>{lang === 'es' ? 'Llamar a Ventas Directamente' : 'Call Desk Immediately'}</span>
                </a>
                <button
                  onClick={() => { playHudClick(); onClose(); }}
                  className="w-full sm:w-auto px-6 py-3 rounded-xl bg-[#D4AF37] hover:bg-[#c5a030] text-black font-bold text-xs font-sans tracking-wider uppercase cursor-pointer"
                >
                  {lang === 'es' ? 'Cerrar y Volver al Lote' : 'Done & Return to Lot'}
                </button>
              </div>
            </div>
          ) : (
            /* Active Form State */
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Spam Honeypot Field */}
              <div className="hidden" aria-hidden="true">
                <input
                  type="text"
                  name="website_hp"
                  tabIndex={-1}
                  autoComplete="off"
                  value={honeypot}
                  onChange={(e) => setHoneypot(e.target.value)}
                />
              </div>
              
              {/* Vehicle Snapshot Card */}
              <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center gap-4">
                <img
                  src={vehicle.heroImage || vehicle.gallery?.[0]}
                  alt={vehicle.name}
                  className="w-24 h-16 rounded-xl object-cover border border-white/10 shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <div className="text-[10px] text-amber-400 font-semibold tracking-wider uppercase">
                    STOCK #{vehicle.stockNumber} • {vehicle.drivetrain}
                  </div>
                  <h3 className="text-sm sm:text-base font-serif font-bold text-white truncate">
                    {vehicle.year} {vehicle.name}
                  </h3>
                  <div className="flex items-center gap-3 mt-1 text-xs">
                    <span className="text-neutral-400">{lang === 'es' ? 'Precio de Lista DE:' : 'Delaware Asking Price:'}</span>
                    <strong className="text-white font-bold">{formatPrice(vehicle.price, currency)}</strong>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      0% Sales Tax
                    </span>
                  </div>
                </div>
              </div>

              {/* Offer Amount Input & Difference Indicator */}
              <div className="p-4 sm:p-5 rounded-2xl bg-neutral-900/90 border border-amber-400/20 space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <label className="text-xs font-sans uppercase tracking-wider text-neutral-300 font-semibold flex items-center gap-2">
                    <DollarSign className="w-4 h-4 text-amber-400" />
                    {lang === 'es' ? 'SU OFERTA PROPUESTA ($ USD)' : 'YOUR PROPOSED CASH / PURCHASE OFFER ($ USD)'}
                  </label>
                  <span className="text-xs font-mono text-neutral-400">
                    {lang === 'es' ? 'MSRP de Lista:' : 'Asking:'} ${formatNumber(vehicle.price)}
                  </span>
                </div>

                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-xl font-bold text-amber-400">
                    $
                  </div>
                  <input
                    type="number"
                    min={Math.round(vehicle.price * 0.6)}
                    max={vehicle.price * 1.2}
                    step={100}
                    required
                    value={offerPrice || ''}
                    onChange={(e) => setOfferPrice(Number(e.target.value))}
                    className="w-full pl-10 pr-4 py-3.5 rounded-xl bg-black/60 border border-amber-400/40 text-2xl font-bold font-sans text-amber-300 focus:outline-none focus:border-amber-300 transition-colors shadow-inner"
                    placeholder="Enter your offer"
                  />
                </div>

                {/* Live Analysis Pill */}
                <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-sans pt-1">
                  {priceDiff > 0 ? (
                    <div className="flex items-center gap-1.5 text-emerald-400">
                      <TrendingDown className="w-4 h-4" />
                      <span>
                        ${formatNumber(priceDiff)} ({percentDiff}%) {lang === 'es' ? 'por debajo del precio de lista' : 'below dealership asking'}
                      </span>
                    </div>
                  ) : priceDiff === 0 ? (
                    <div className="text-amber-300">
                      {lang === 'es' ? 'Oferta igual al precio Delaware listado (Prioridad máxima)' : 'Full list price offer (Immediate fast-track priority)'}
                    </div>
                  ) : (
                    <div className="text-neutral-400">
                      ${formatNumber(Math.abs(priceDiff))} {lang === 'es' ? 'por encima del precio base' : 'above asking price'}
                    </div>
                  )}

                  <div className="text-neutral-400 text-[11px]">
                    {lang === 'es' ? 'Sin comisiones ocultas • 0% impuesto DE' : 'No hidden fees • 0% Delaware sales tax'}
                  </div>
                </div>
              </div>

              {/* Purchase Method Selection */}
              <div className="space-y-2">
                <label className="block text-xs font-sans text-neutral-400 uppercase tracking-wider font-semibold">
                  {lang === 'es' ? 'MÉTODO DE COMPRA PREVISTO' : 'INTENDED PAYMENT METHOD'}
                </label>
                <div className="grid grid-cols-3 gap-2.5">
                  {[
                    { id: 'cash', label: lang === 'es' ? 'Contado / Wire' : 'Cash / Wire Transfer', icon: DollarSign },
                    { id: 'finance', label: lang === 'es' ? 'Financiamiento' : 'Dealership Finance', icon: Building2 },
                    { id: 'trade', label: lang === 'es' ? 'Takas + Saldo' : 'Trade-In + Balance', icon: Tag },
                  ].map((method) => {
                    const Icon = method.icon;
                    const isActive = purchaseType === method.id;
                    return (
                      <button
                        key={method.id}
                        type="button"
                        onClick={() => { playHudClick(); setPurchaseType(method.id as any); }}
                        className={`p-3 rounded-xl border text-xs font-sans font-medium flex flex-col items-center justify-center gap-1.5 transition-all cursor-pointer ${
                          isActive
                            ? 'bg-amber-400/15 border-amber-400 text-amber-300 shadow-sm shadow-amber-400/20'
                            : 'bg-white/[0.02] border-white/10 text-neutral-400 hover:text-white hover:border-white/20'
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                        <span className="text-center truncate w-full">{method.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Buyer Contact Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-sans text-neutral-400 uppercase tracking-wider mb-1 font-medium">
                    {lang === 'es' ? 'Nombre Completo *' : 'Full Name *'}
                  </label>
                  <input
                    type="text"
                    required
                    maxLength={100}
                    value={buyerName}
                    onChange={(e) => setBuyerName(e.target.value)}
                    placeholder="e.g. Michael Jordan"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs font-sans text-white focus:outline-none focus:border-amber-400 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-sans text-neutral-400 uppercase tracking-wider mb-1 font-medium">
                    {lang === 'es' ? 'Teléfono Directo *' : 'Phone Number *'}
                  </label>
                  <input
                    type="tel"
                    required
                    maxLength={25}
                    pattern="[0-9+()-\s]+"
                    value={buyerPhone}
                    onChange={(e) => setBuyerPhone(e.target.value)}
                    placeholder="(302) 555-0199"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs font-sans text-white focus:outline-none focus:border-amber-400 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-sans text-neutral-400 uppercase tracking-wider mb-1 font-medium">
                    {lang === 'es' ? 'Correo Electrónico *' : 'Email Address *'}
                  </label>
                  <input
                    type="email"
                    required
                    maxLength={100}
                    value={buyerEmail}
                    onChange={(e) => setBuyerEmail(e.target.value)}
                    placeholder="you@domain.com"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs font-sans text-white focus:outline-none focus:border-amber-400 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-sans text-neutral-400 uppercase tracking-wider mb-1 font-medium">
                    {lang === 'es' ? 'Plazo Deseado' : 'Target Purchase Timeline'}
                  </label>
                  <select
                    value={timeframe}
                    onChange={(e) => setTimeframe(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-900 border border-white/10 text-xs font-sans text-white focus:outline-none focus:border-amber-400 cursor-pointer"
                  >
                    <option value="24-48-hours">Immediate (Next 24-48 Hours)</option>
                    <option value="this-weekend">This Coming Weekend</option>
                    <option value="within-week">Within 7 Days</option>
                    <option value="this-month">Ready This Month</option>
                  </select>
                </div>
              </div>

              {/* Notes / Special Terms */}
              <div>
                <label className="block text-xs font-sans text-neutral-400 uppercase tracking-wider mb-1 font-medium">
                  {lang === 'es' ? 'Comentarios o Condiciones (Opcional)' : 'Comments or Conditions (Optional)'}
                </label>
                <textarea
                  rows={2}
                  maxLength={500}
                  value={buyerNotes}
                  onChange={(e) => setBuyerNotes(e.target.value)}
                  placeholder={lang === 'es' ? 'Ej. Viajo desde Pensilvania, quisiera cerrar trato hoy...' : 'e.g. Traveling from PA/NJ, ready to leave a deposit upon offer acceptance...'}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs font-sans text-white focus:outline-none focus:border-amber-400 transition-colors resize-none"
                />
              </div>

              {/* Guarantee and Submission Button */}
              <div className="pt-2 space-y-3">
                <div className="flex items-center gap-2 text-[11px] text-neutral-400">
                  <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>
                    {lang === 'es'
                      ? 'Sin compromiso de compra. Revisado personalmente por la gerencia de Blackshire Motors en New Castle, DE.'
                      : 'No obligation to purchase. All offers reviewed directly by Blackshire Motors lot management.'}
                  </span>
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-[#D4AF37] hover:bg-[#c5a030] text-black font-bold text-xs font-sans tracking-wider uppercase active:scale-98 transition-all shadow-lg shadow-[#D4AF37]/20 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>{lang === 'es' ? `TRANSMITIR OFERTA DE $${formatNumber(offerPrice)}` : `TRANSMIT $${formatNumber(offerPrice)} OFFICIAL OFFER`}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          )}

        </div>
      </div>
    </div>
  );
};

export default MakeOfferModal;
