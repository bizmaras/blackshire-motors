import React, { useState, useMemo } from 'react';
import { Vehicle } from '../types';
import { formatPrice, formatNumber } from '../utils/formatters';
import { 
  X, 
  CheckCircle2, 
  Car,
  FileCheck
} from 'lucide-react';
import { playHudClick, playTactileChime } from '../utils/audio';
import { BlackshireLogo } from './BlackshireLogo';
import { useLanguage } from '../context/LanguageContext';

interface BespokeStudioProps {
  isOpen: boolean;
  onClose: () => void;
  vehicles: Vehicle[];
  selectedVehicle: Vehicle | null;
  currency: 'USD' | 'EUR' | 'BTC';
}

export const BespokeStudio: React.FC<BespokeStudioProps> = ({
  isOpen,
  onClose,
  vehicles,
  selectedVehicle,
  currency,
}) => {
  if (!isOpen) return null;

  const { lang } = useLanguage();

  const [activeVehicleId, setActiveVehicleId] = useState<string>(
    selectedVehicle ? selectedVehicle.id : (vehicles[0]?.id || '')
  );

  const activeVehicle = useMemo(() => {
    return vehicles.find((v) => v.id === activeVehicleId) || vehicles[0];
  }, [vehicles, activeVehicleId]);

  // Financing state
  const [downPayment, setDownPayment] = useState<number>(2500);
  const [termMonths, setTermMonths] = useState<number>(60);
  const [creditTier, setCreditTier] = useState<'excellent' | 'good' | 'fair' | 'rebuilding'>('good');
  
  // Trade-In module
  const [hasTradeIn, setHasTradeIn] = useState<boolean>(false);
  const [tradeInMake, setTradeInMake] = useState('Honda Accord');
  const [tradeInMileage, setTradeInMileage] = useState('85000');
  const [tradeInValue, setTradeInValue] = useState<number>(4500);

  // Application form
  const [buyerName, setBuyerName] = useState('');
  const [buyerPhone, setBuyerPhone] = useState('');
  const [buyerEmail, setBuyerEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const aprMap = {
    excellent: 5.9,
    good: 7.9,
    fair: 11.9,
    rebuilding: 14.9,
  };

  const currentApr = aprMap[creditTier];

  const calculations = useMemo(() => {
    if (!activeVehicle) return { monthlyPayment: 0, totalFinanced: 0, interestPaid: 0, taxSavings: 0, principal: 0 };

    const vehiclePrice = activeVehicle.price;
    const effectiveTrade = hasTradeIn ? tradeInValue : 0;
    const totalDown = downPayment + effectiveTrade;
    const principal = Math.max(0, vehiclePrice - totalDown);

    const monthlyRate = currentApr / 100 / 12;
    let monthlyPayment = 0;

    if (monthlyRate === 0 || principal === 0) {
      monthlyPayment = principal / termMonths;
    } else {
      monthlyPayment =
        (principal * (monthlyRate * Math.pow(1 + monthlyRate, termMonths))) /
        (Math.pow(1 + monthlyRate, termMonths) - 1);
    }

    const totalCost = monthlyPayment * termMonths;
    const interestPaid = Math.max(0, totalCost - principal);
    const taxSavings = Math.round(vehiclePrice * 0.06);

    return {
      principal,
      monthlyPayment: Math.round(monthlyPayment),
      totalFinanced: Math.round(totalCost),
      interestPaid: Math.round(interestPaid),
      taxSavings,
    };
  }, [activeVehicle, downPayment, termMonths, currentApr, hasTradeIn, tradeInValue]);

  const handlePreApprovalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    playTactileChime();
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-xl overflow-y-auto">
      <div className="relative w-full max-w-5xl my-auto rounded-3xl glass-obsidian border border-white/15 shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
        
        {/* Top Header Strip */}
        <div className="p-4 sm:p-6 border-b border-white/10 flex items-center justify-between bg-black/40">
          <div className="flex items-center gap-3">
            <BlackshireLogo size="md" variant="crest-only" color="gold" />
            <div>
              <h3 className="font-serif font-bold text-white text-lg tracking-wide uppercase">
                {lang === 'es' ? 'CENTRO DE FINANCIAMIENTO Y PRE-APROBACIÓN' : 'BLACKSHIRE FINANCING & PRE-APPROVAL CENTER'}
              </h3>
              <p className="text-xs font-sans text-neutral-400 font-light">
                {lang === 'es' 
                  ? 'Cálculos transparentes • 0% Impuesto sobre Ventas Delaware • Aprobaciones para todo tipo de crédito'
                  : 'Transparent calculations • Delaware 0% Sales Tax Savings • Approvals for all credit profiles'}
              </p>
            </div>
          </div>

          <button
            onClick={() => { playHudClick(); onClose(); }}
            className="p-2 rounded-xl bg-white/5 hover:bg-white/15 text-neutral-300 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Studio Content Grid */}
        <div className="p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 max-h-[80vh] overflow-y-auto font-sans">
          
          {/* Left Column: Interactive Calculators */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Step 1: Select Vehicle */}
            <div>
              <label htmlFor="bespoke-select-vehicle" className="block text-xs font-sans uppercase tracking-wider text-neutral-400 mb-2 font-medium">
                {lang === 'es' ? '1. Seleccionar Vehículo del Inventario' : '1. Select Vehicle from Inventory'}
              </label>
              <select
                id="bespoke-select-vehicle"
                value={activeVehicleId}
                onChange={(e) => {
                  playHudClick();
                  setActiveVehicleId(e.target.value);
                }}
                className="w-full px-4 py-3 rounded-xl bg-neutral-900 border border-white/15 text-sm font-sans text-white focus:outline-none focus:border-amber-400 cursor-pointer"
              >
                {vehicles.map((v) => (
                  <option key={v.id} value={v.id} className="bg-neutral-900 text-white">
                    {v.year} {v.make} {v.name} — {formatPrice(v.price, 'USD')} ({v.formattedMileage})
                  </option>
                ))}
              </select>
            </div>

            {/* Step 2: Down Payment Slider */}
            <div>
              <div className="flex justify-between items-center text-xs font-sans mb-2">
                <label htmlFor="bespoke-down-payment-range" className="text-neutral-400 uppercase font-medium">
                  {lang === 'es' ? '2. Pago Inicial en Efectivo' : '2. Cash Down Payment'}
                </label>
                <span className="text-amber-300 font-bold text-sm">${formatNumber(downPayment)}</span>
              </div>
              <input
                id="bespoke-down-payment-range"
                type="range"
                min={0}
                max={Math.min(15000, activeVehicle ? activeVehicle.price : 10000)}
                step={250}
                value={downPayment}
                onChange={(e) => setDownPayment(Number(e.target.value))}
                aria-label={lang === 'es' ? 'Pago inicial en efectivo' : 'Cash down payment'}
                className="w-full h-2 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-amber-400"
              />
              <div className="flex justify-between text-[10px] font-sans text-neutral-500 mt-1">
                <span>$0</span>
                <span>$5,000</span>
                <span>$10,000+</span>
              </div>
            </div>

            {/* Step 3: Loan Term Selector */}
            <div>
              <label className="block text-xs font-sans uppercase tracking-wider text-neutral-400 mb-2 font-medium">
                {lang === 'es' ? '3. Plazo del Financiamiento' : '3. Preferred Term Duration'}
              </label>
              <div className="grid grid-cols-4 gap-2">
                {[36, 48, 60, 72].map((months) => (
                  <button
                    key={months}
                    type="button"
                    onClick={() => { playHudClick(); setTermMonths(months); }}
                    className={`py-2.5 rounded-xl text-xs font-sans uppercase font-bold transition-all cursor-pointer ${
                      termMonths === months
                        ? 'bg-[#D4AF37] hover:bg-[#c5a030] text-black shadow-md shadow-[#D4AF37]/20 ring-1 ring-[#D4AF37]'
                        : 'bg-white/5 text-neutral-300 hover:text-white hover:bg-white/10 border border-white/5'
                    }`}
                  >
                    {months} {lang === 'es' ? 'Meses' : 'Mo'}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 4: Credit Tier & Est. APR */}
            <div>
              <label className="block text-xs font-sans uppercase tracking-wider text-neutral-400 mb-2 font-medium">
                {lang === 'es' ? '4. Perfil Crediticio (APR Estimado)' : '4. Credit Profile (Estimated APR)'}
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center">
                {[
                  { id: 'excellent', title: lang === 'es' ? 'Excelente (720+)' : 'Tier 1 (720+)', rate: '5.9% APR' },
                  { id: 'good', title: lang === 'es' ? 'Bueno (660-719)' : 'Tier 2 (660-719)', rate: '7.9% APR' },
                  { id: 'fair', title: lang === 'es' ? 'Regular (600-659)' : 'Tier 3 (600-659)', rate: '11.9% APR' },
                  { id: 'rebuilding', title: lang === 'es' ? 'Segunda Oportunidad' : 'Second Chance', rate: '14.9% APR' },
                ].map((tier) => (
                  <button
                    key={tier.id}
                    type="button"
                    onClick={() => { playHudClick(); setCreditTier(tier.id as any); }}
                    className={`p-2.5 rounded-xl border text-xs font-sans transition-all cursor-pointer ${
                      creditTier === tier.id
                        ? 'bg-amber-400/15 border-amber-400 text-amber-300 font-bold'
                        : 'bg-white/5 border-white/10 text-neutral-400 hover:text-white'
                    }`}
                  >
                    <div className="text-[11px] font-semibold">{tier.title}</div>
                    <div className="text-[10px] text-amber-400/90 mt-0.5">{tier.rate}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 5: Optional Trade-In Estimator */}
            <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/10 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Car className="w-4 h-4 text-amber-400" />
                  <span className="text-xs font-sans text-white font-semibold uppercase tracking-wider">
                    {lang === 'es' ? '¿Tiene un Auto para Entregar en Parte de Pago?' : 'Have a Trade-In Vehicle?'}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => { playHudClick(); setHasTradeIn(!hasTradeIn); }}
                  className={`px-3 py-1 rounded-lg text-xs font-sans font-bold transition-all cursor-pointer ${
                    hasTradeIn
                      ? 'bg-amber-400 text-black'
                      : 'bg-white/10 text-neutral-300 hover:text-white'
                  }`}
                >
                  {hasTradeIn ? (lang === 'es' ? 'APLICADO ✓' : 'APPLIED ✓') : (lang === 'es' ? '+ AGREGAR TRADE-IN' : '+ ADD TRADE')}
                </button>
              </div>

              {hasTradeIn && (
                <div className="pt-2 grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="text-[10px] font-sans text-neutral-400 font-medium">
                      {lang === 'es' ? 'Año y Marca' : 'Trade Year & Make'}
                    </label>
                    <input
                      type="text"
                      value={tradeInMake}
                      onChange={(e) => setTradeInMake(e.target.value)}
                      placeholder="e.g. 2016 Honda Accord"
                      className="w-full px-3 py-2 rounded-lg bg-neutral-900 border border-white/15 text-xs text-white"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-sans text-neutral-400 font-medium">
                      {lang === 'es' ? 'Millaje' : 'Mileage'}
                    </label>
                    <input
                      type="text"
                      value={tradeInMileage}
                      onChange={(e) => setTradeInMileage(e.target.value)}
                      placeholder="85,000"
                      className="w-full px-3 py-2 rounded-lg bg-neutral-900 border border-white/15 text-xs text-white"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-sans text-neutral-400 font-medium">
                      {lang === 'es' ? 'Valor Estimado Trade-In' : 'Est. Trade Allowance'}
                    </label>
                    <input
                      type="number"
                      step={250}
                      value={tradeInValue}
                      onChange={(e) => setTradeInValue(Number(e.target.value))}
                      className="w-full px-3 py-2 rounded-lg bg-neutral-900 border border-white/15 text-xs text-amber-300 font-bold"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Financial Summary & Concierge Pre-Approval */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            
            {/* Payment Summary Card */}
            <div className="p-6 rounded-2xl bg-neutral-900 border border-amber-400/30 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />

              <div className="text-[11px] font-sans uppercase tracking-widest text-neutral-400 font-medium">
                {lang === 'es' ? 'INVERSIÓN MENSUAL ESTIMADA' : 'ESTIMATED MONTHLY INVESTMENT'}
              </div>

              <div className="mt-2 flex items-baseline gap-2">
                <span className="text-4xl sm:text-5xl font-bold font-sans text-amber-300">
                  ${calculations.monthlyPayment}
                </span>
                <span className="text-neutral-400 font-sans text-sm">
                  {lang === 'es' ? '/ mes' : '/ month'}
                </span>
              </div>

              {/* Tax Savings Callout */}
              <div className="mt-4 p-3 rounded-xl bg-amber-400/10 border border-amber-400/30 flex items-center gap-2.5 text-xs text-amber-200 font-sans">
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                <span>
                  {lang === 'es'
                    ? `¡Ahorra ~$${formatNumber(calculations.taxSavings)} con el 0% de Impuesto de Delaware!`
                    : `You save ~$${formatNumber(calculations.taxSavings)} in 0% DE Sales Tax!`}
                </span>
              </div>

              {/* Calculation Rows */}
              <div className="mt-5 space-y-2 border-t border-white/10 pt-4 font-sans text-xs">
                <div className="flex justify-between text-neutral-400">
                  <span>{lang === 'es' ? 'Precio del Vehículo' : 'Vehicle Price'}</span>
                  <span className="text-white">${formatNumber(activeVehicle?.price || 0)}</span>
                </div>
                <div className="flex justify-between text-neutral-400">
                  <span>{lang === 'es' ? 'Enganche + Trade-In' : 'Cash Down + Trade'}</span>
                  <span className="text-amber-300">-${formatNumber(downPayment + (hasTradeIn ? tradeInValue : 0))}</span>
                </div>
                <div className="flex justify-between text-neutral-400">
                  <span>{lang === 'es' ? 'Monto Financiado' : 'Financed Principal'}</span>
                  <span className="text-white">${formatNumber(calculations.principal)}</span>
                </div>
                <div className="flex justify-between text-neutral-400">
                  <span>{lang === 'es' ? 'Tasa Estimada APR' : 'Est. APR Rate'}</span>
                  <span className="text-white">{currentApr}%</span>
                </div>
                <div className="flex justify-between text-neutral-400">
                  <span>{lang === 'es' ? 'Plazo' : 'Term Length'}</span>
                  <span className="text-white">{termMonths} {lang === 'es' ? 'Meses' : 'Months'}</span>
                </div>
              </div>
            </div>

            {/* Instant Pre-Approval Submission */}
            <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/10">
              {submitted ? (
                <div className="p-5 rounded-xl bg-amber-400/10 border border-amber-400/40 text-amber-200 text-xs font-sans text-center space-y-2">
                  <CheckCircle2 className="w-6 h-6 text-amber-400 mx-auto" />
                  <div className="font-semibold text-white text-sm">
                    {lang === 'es' ? '¡Solicitud de Precalificación Recibida!' : 'Pre-Qualification Application Received!'}
                  </div>
                  <p className="text-neutral-300 text-[11px] font-light">
                    {lang === 'es'
                      ? `Nuestro equipo en Blackshire Motors (154 S Dupont Hwy) revisará su escenario con nuestra red de bancos aliados y se comunicará al ${buyerPhone}. Sin impacto negativo en su puntaje crediticio para evaluación inicial.`
                      : `The team at Blackshire Motors (154 S Dupont Hwy) will review your scenario with our network of local banks and contact you at ${buyerPhone}. No impact to your credit score for preliminary review.`}
                  </p>
                </div>
              ) : (
                <form onSubmit={handlePreApprovalSubmit} className="space-y-3 font-sans">
                  <div className="text-xs font-sans uppercase tracking-wider text-neutral-300 font-semibold flex items-center gap-2">
                    <FileCheck className="w-4 h-4 text-amber-400" />
                    <span>{lang === 'es' ? 'Precalifícate con esta Estimación' : 'Get Pre-Approved with this Estimate'}</span>
                  </div>

                  <input
                    type="text"
                    required
                    value={buyerName}
                    onChange={(e) => setBuyerName(e.target.value)}
                    placeholder={lang === 'es' ? 'Su Nombre Completo' : 'Your Full Name'}
                    className="w-full px-3.5 py-2 rounded-xl bg-neutral-900 border border-white/10 text-xs font-sans text-white focus:outline-none focus:border-amber-400"
                  />

                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="tel"
                      required
                      value={buyerPhone}
                      onChange={(e) => setBuyerPhone(e.target.value)}
                      placeholder="(302) 555-0123"
                      className="w-full px-3.5 py-2 rounded-xl bg-neutral-900 border border-white/10 text-xs font-sans text-white focus:outline-none focus:border-amber-400"
                    />
                    <input
                      type="email"
                      required
                      value={buyerEmail}
                      onChange={(e) => setBuyerEmail(e.target.value)}
                      placeholder="email@domain.com"
                      className="w-full px-3.5 py-2 rounded-xl bg-neutral-900 border border-white/10 text-xs font-sans text-white focus:outline-none focus:border-amber-400"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 rounded-xl bg-[#D4AF37] hover:bg-[#c5a030] text-black font-bold font-sans text-xs tracking-wider uppercase active:scale-95 transition-all shadow-md shadow-[#D4AF37]/20 cursor-pointer"
                  >
                    {lang === 'es' ? 'ENVIAR SOLICITUD DE PRECALIFICACIÓN' : 'SUBMIT PRE-APPROVAL REQUEST (NO HARD INQUIRY)'}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BespokeStudio;
