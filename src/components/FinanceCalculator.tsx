import React, { useState, useMemo } from 'react';
import { formatNumber } from '../utils/formatters';
import { Landmark, ArrowRight, CheckCircle2 } from 'lucide-react';
import { playHudClick } from '../utils/audio';
import { useLanguage } from '../context/LanguageContext';

interface FinanceCalculatorProps {
  currency?: 'USD' | 'EUR' | 'BTC';
}

export const FinanceCalculator: React.FC<FinanceCalculatorProps> = () => {
  const { lang, t } = useLanguage();
  const [vehiclePrice, setVehiclePrice] = useState(24995);
  const [downPayment, setDownPayment] = useState(3000);
  const [termMonths, setTermMonths] = useState(60);
  const [creditTier, setCreditTier] = useState<'prime' | 'standard' | 'rebuilding'>('prime');

  const aprRate = creditTier === 'prime' ? 5.9 : creditTier === 'standard' ? 8.9 : 13.9;
  const financedPrincipal = Math.max(0, vehiclePrice - downPayment);

  const monthlyPayment = useMemo(() => {
    if (financedPrincipal <= 0) return 0;
    const monthlyRate = aprRate / 100 / 12;
    const payment =
      (financedPrincipal * (monthlyRate * Math.pow(1 + monthlyRate, termMonths))) /
      (Math.pow(1 + monthlyRate, termMonths) - 1);
    return Math.round(payment);
  }, [financedPrincipal, aprRate, termMonths]);

  return (
    <section id="financing" className="scroll-mt-28 sm:scroll-mt-32 lg:scroll-mt-36 py-24 relative bg-[#060608] border-t border-white/5 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-400/10 border border-amber-400/30 text-xs font-sans tracking-widest text-amber-300 uppercase mb-3 font-semibold">
            <Landmark className="w-3.5 h-3.5 text-amber-400" />
            {t.financing.badge}
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-white uppercase tracking-tight">
            {t.financing.title}
          </h2>
          <p className="mt-3 text-sm sm:text-base text-neutral-300 font-light leading-relaxed">
            {t.financing.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Controls Column */}
          <div className="lg:col-span-7 p-6 sm:p-8 rounded-3xl glass-obsidian border border-white/10 flex flex-col justify-between">
            <div className="space-y-6">
              
              {/* Credit Tier Selector */}
              <div>
                <span className="block text-xs font-sans text-neutral-400 uppercase tracking-wider mb-2 font-medium">
                  {t.financing.creditProfile}
                </span>
                <div className="grid grid-cols-3 gap-2 font-sans text-xs">
                  <button
                    type="button"
                    onClick={() => { playHudClick(); setCreditTier('prime'); }}
                    className={`py-2.5 px-3 rounded-xl border text-center transition-all cursor-pointer ${
                      creditTier === 'prime'
                        ? 'bg-[#D4AF37] hover:bg-[#c5a030] text-black font-bold border-amber-400 shadow-md shadow-[#D4AF37]/20 ring-1 ring-[#D4AF37]'
                        : 'bg-white/5 border-white/10 text-neutral-300 hover:text-white font-medium'
                    }`}
                  >
                    <div>{t.financing.tierPrime}</div>
                    <div className="text-[10px] opacity-85">5.9% APR est.</div>
                  </button>

                  <button
                    type="button"
                    onClick={() => { playHudClick(); setCreditTier('standard'); }}
                    className={`py-2.5 px-3 rounded-xl border text-center transition-all cursor-pointer ${
                      creditTier === 'standard'
                        ? 'bg-[#D4AF37] hover:bg-[#c5a030] text-black font-bold border-amber-400 shadow-md shadow-[#D4AF37]/20 ring-1 ring-[#D4AF37]'
                        : 'bg-white/5 border-white/10 text-neutral-300 hover:text-white font-medium'
                    }`}
                  >
                    <div>{t.financing.tierStandard}</div>
                    <div className="text-[10px] opacity-85">8.9% APR est.</div>
                  </button>

                  <button
                    type="button"
                    onClick={() => { playHudClick(); setCreditTier('rebuilding'); }}
                    className={`py-2.5 px-3 rounded-xl border text-center transition-all cursor-pointer ${
                      creditTier === 'rebuilding'
                        ? 'bg-[#D4AF37] hover:bg-[#c5a030] text-black font-bold border-amber-400 shadow-md shadow-[#D4AF37]/20 ring-1 ring-[#D4AF37]'
                        : 'bg-white/5 border-white/10 text-neutral-300 hover:text-white font-medium'
                    }`}
                  >
                    <div>{t.financing.tierSpecialized}</div>
                    <div className="text-[10px] opacity-85">13.9% APR est.</div>
                  </button>
                </div>
              </div>

              {/* Slider 1: Vehicle Price */}
              <div>
                <div className="flex justify-between items-center text-xs font-sans mb-2">
                  <span className="text-neutral-400 uppercase tracking-wider font-medium">{t.financing.vehiclePrice}</span>
                  <span className="text-lg font-bold text-white font-sans">
                    ${formatNumber(vehiclePrice)}
                  </span>
                </div>
                <input
                  type="range"
                  min={8000}
                  max={60000}
                  step={500}
                  value={vehiclePrice}
                  onChange={(e) => setVehiclePrice(Number(e.target.value))}
                  aria-label={t.financing.vehiclePrice}
                  className="w-full h-2 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-amber-400"
                />
                <div className="flex justify-between text-[10px] font-sans text-neutral-500 mt-1">
                  <span>$8,000</span>
                  <span>$30,000</span>
                  <span>$60,000</span>
                </div>
              </div>

              {/* Slider 2: Down Payment / Trade Equity */}
              <div>
                <div className="flex justify-between items-center text-xs font-sans mb-2">
                  <span className="text-neutral-400 uppercase tracking-wider font-medium">{t.financing.downPayment}</span>
                  <span className="text-lg font-bold text-amber-300 font-sans">
                    ${formatNumber(downPayment)}
                  </span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={vehiclePrice * 0.75}
                  step={250}
                  value={downPayment}
                  onChange={(e) => setDownPayment(Number(e.target.value))}
                  aria-label={t.financing.downPayment}
                  className="w-full h-2 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-amber-400"
                />
                <div className="flex justify-between text-[10px] font-sans text-neutral-500 mt-1">
                  <span>$0 ({t.financing.zeroDown})</span>
                  <span>$5,000</span>
                  <span>${formatNumber(Math.round(vehiclePrice * 0.75))}</span>
                </div>
              </div>

              {/* Term Selection */}
              <div>
                <span className="block text-xs font-sans text-neutral-400 uppercase tracking-wider mb-2 font-medium">
                  {t.financing.termDuration}
                </span>
                <div className="grid grid-cols-4 gap-2 font-sans text-xs">
                  {[36, 48, 60, 72].map((m) => (
                    <button
                      key={m}
                      type="button"
                      onClick={() => { playHudClick(); setTermMonths(m); }}
                      className={`py-2.5 rounded-xl border text-center transition-all cursor-pointer ${
                        termMonths === m
                          ? 'bg-neutral-900 border-amber-400 text-amber-300 font-bold'
                          : 'bg-white/[0.02] border-white/10 text-neutral-400 hover:text-white font-medium'
                      }`}
                    >
                      {m} {t.financing.months}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-white/10 text-xs font-sans text-neutral-400 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
              <span>{t.financing.taxAdvantageNote}</span>
            </div>
          </div>

          {/* Results Display Column */}
          <div className="lg:col-span-5 p-6 sm:p-8 rounded-3xl glass-obsidian border border-amber-400/30 flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 right-0 w-48 h-48 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

            <div>
              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <span className="text-xs font-sans text-amber-400 uppercase tracking-widest font-semibold">
                  {t.financing.estimatedInvestment}
                </span>
                <span className="text-[10px] font-sans text-amber-300 bg-amber-950/60 border border-amber-500/30 px-2.5 py-1 rounded-full font-semibold">
                  {t.financing.delawareTaxApplied}
                </span>
              </div>

              {/* Big Monthly Number */}
              <div className="my-8">
                <span className="text-xs font-sans text-neutral-400 uppercase tracking-wider block font-medium">
                  {t.financing.estimatedMonthly}
                </span>
                <div className="text-4xl sm:text-5xl font-bold font-sans text-white mt-1">
                  ${formatNumber(monthlyPayment)}
                  <span className="text-sm text-neutral-400 font-normal"> /MO</span>
                </div>
                <div className="text-xs font-sans text-amber-300 mt-2 flex items-center gap-1.5">
                  <span>
                    {lang === 'es'
                      ? `Calculado sobre ${termMonths} meses @ ${aprRate}% APR`
                      : `Calculated on ${termMonths} months @ ${aprRate}% APR`}
                  </span>
                </div>
              </div>

              {/* Breakdown Ledger */}
              <div className="space-y-3 font-sans text-xs divide-y divide-white/5 pt-2">
                <div className="flex justify-between py-1.5">
                  <span className="text-neutral-400">{t.financing.ledgerVehicleValuation}</span>
                  <span className="text-white font-semibold">${formatNumber(vehiclePrice)}</span>
                </div>

                <div className="flex justify-between py-1.5">
                  <span className="text-neutral-400">{t.financing.ledgerDownPayment}</span>
                  <span className="text-amber-300 font-semibold">${formatNumber(downPayment)}</span>
                </div>

                <div className="flex justify-between py-1.5">
                  <span className="text-neutral-400">{t.financing.ledgerTotalFinanced}</span>
                  <span className="text-white font-semibold">${formatNumber(financedPrincipal)}</span>
                </div>

                <div className="flex justify-between py-1.5">
                  <span className="text-neutral-400">{t.financing.ledgerDeTax}</span>
                  <span className="text-amber-300 font-semibold">$0.00 (0% Rate)</span>
                </div>

                <div className="flex justify-between py-1.5">
                  <span className="text-neutral-400">{t.financing.ledgerTermHorizon}</span>
                  <span className="text-white font-semibold">{termMonths} {t.financing.months}</span>
                </div>
              </div>
            </div>

            <div className="pt-6">
              <a
                href="#contact"
                className="w-full py-3.5 rounded-xl bg-[#D4AF37] hover:bg-[#c5a030] text-black font-bold text-xs font-sans tracking-wider uppercase flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-[#D4AF37]/25 active:scale-95 transition-all"
              >
                <span>{t.financing.requestProposal}</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FinanceCalculator;
