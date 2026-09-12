import React, { useState } from 'react';
import { formatNumber } from '../utils/formatters';
import { Calculator, CheckCircle2, TrendingUp } from 'lucide-react';
import { playHudClick, playTactileChime } from '../utils/audio';
import { useLanguage } from '../context/LanguageContext';

interface ValuationCalculatorProps {
  currency?: 'USD' | 'EUR' | 'BTC';
}

const COMMON_MAKES = [
  'BMW',
  'Mercedes-Benz',
  'RAM',
  'Ford',
  'Chevrolet',
  'Audi',
  'Infiniti',
  'Jeep',
  'Cadillac',
  'Toyota',
  'Honda',
  'Nissan',
  'Porsche',
  'Lexus',
  'Other Make',
];

export const ValuationCalculator: React.FC<ValuationCalculatorProps> = () => {
  const { lang, t } = useLanguage();
  const [make, setMake] = useState('BMW');
  const [modelName, setModelName] = useState('328i / 428i');
  const [year, setYear] = useState(2017);
  const [mileage, setMileage] = useState(65000);
  const [condition, setCondition] = useState<'Clean / Excellent' | 'Good' | 'Fair'>('Clean / Excellent');
  const [vinNumber, setVinNumber] = useState('');
  
  const [hasCalculated, setHasCalculated] = useState(false);
  const [estimatedValue, setEstimatedValue] = useState(14500);
  const [tradeInTaxCredit, setTradeInTaxCredit] = useState(870);

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    playTactileChime();

    let base = 22000;
    if (['BMW', 'Mercedes-Benz', 'Audi', 'Porsche'].includes(make)) {
      base = 26000;
    } else if (['RAM', 'Ford', 'Chevrolet'].includes(make)) {
      base = 28000;
    } else if (['Toyota', 'Honda', 'Lexus'].includes(make)) {
      base = 24000;
    }

    const yearFactor = Math.max(0.35, 1 - (2026 - year) * 0.07);
    const mileageFactor = Math.max(0.4, 1 - (mileage / 120000) * 0.45);
    const conditionFactor = condition === 'Clean / Excellent' ? 1.1 : condition === 'Good' ? 1.0 : 0.85;

    const calculated = Math.round((base * yearFactor * mileageFactor * conditionFactor) / 250) * 250;
    const taxCreditSavings = Math.round(calculated * 0.06);

    setEstimatedValue(calculated);
    setTradeInTaxCredit(taxCreditSavings);
    setHasCalculated(true);
  };

  return (
    <section id="trade" className="scroll-mt-28 sm:scroll-mt-32 lg:scroll-mt-36 py-24 relative bg-[#070709] border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Context */}
          <div className="lg:col-span-5 space-y-6 font-sans">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/30 text-[11px] font-sans tracking-widest text-amber-300 uppercase font-semibold">
              <TrendingUp className="w-3.5 h-3.5 text-amber-400" />
              {t.valuation.badge}
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white uppercase tracking-tight leading-tight">
              {t.valuation.title}
            </h2>

            <p className="text-neutral-300 text-sm leading-relaxed font-light">
              {t.valuation.subtitle}
            </p>

            <div className="space-y-3 font-sans text-xs text-neutral-300">
              <div className="flex items-center gap-3 p-3.5 rounded-xl bg-white/[0.02] border border-white/5">
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                <span>{t.valuation.benefit1}</span>
              </div>
              <div className="flex items-center gap-3 p-3.5 rounded-xl bg-white/[0.02] border border-white/5">
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                <span>{t.valuation.benefit2}</span>
              </div>
              <div className="flex items-center gap-3 p-3.5 rounded-xl bg-white/[0.02] border border-white/5">
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                <span>{t.valuation.benefit3}</span>
              </div>
            </div>
          </div>

          {/* Right Column: Calculator Form */}
          <div className="lg:col-span-7">
            <div className="p-6 sm:p-8 rounded-3xl glass-obsidian border border-white/10 shadow-2xl">
              <form onSubmit={handleCalculate} className="space-y-4 font-sans">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-sans text-neutral-400 uppercase tracking-wider mb-1 font-medium">
                      {t.valuation.vehicleMake}
                    </label>
                    <select
                      value={make}
                      onChange={(e) => { playHudClick(); setMake(e.target.value); }}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-900 border border-white/10 text-xs font-sans text-white focus:outline-none focus:border-amber-400 cursor-pointer"
                    >
                      {COMMON_MAKES.map((m) => (
                        <option key={m} value={m}>{m}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-[10px] font-sans text-neutral-400 uppercase tracking-wider mb-1 font-medium">
                      {t.valuation.modelTrim}
                    </label>
                    <input
                      type="text"
                      required
                      value={modelName}
                      onChange={(e) => setModelName(e.target.value)}
                      placeholder="e.g. 428i Gran Coupe / F-150 XLT"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs font-sans text-white focus:outline-none focus:border-amber-400"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-[10px] font-sans text-neutral-400 uppercase tracking-wider mb-1 font-medium">
                      {t.valuation.year}
                    </label>
                    <input
                      type="number"
                      min={2000}
                      max={2026}
                      value={year}
                      onChange={(e) => setYear(Number(e.target.value))}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs font-sans text-white focus:outline-none focus:border-amber-400"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-sans text-neutral-400 uppercase tracking-wider mb-1 font-medium">
                      {t.valuation.currentOdometer}
                    </label>
                    <input
                      type="number"
                      min={0}
                      value={mileage}
                      onChange={(e) => setMileage(Number(e.target.value))}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs font-sans text-white focus:outline-none focus:border-amber-400"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-sans text-neutral-400 uppercase tracking-wider mb-1 font-medium">
                      {t.valuation.condition}
                    </label>
                    <select
                      value={condition}
                      onChange={(e) => { playHudClick(); setCondition(e.target.value as any); }}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-900 border border-white/10 text-xs font-sans text-white focus:outline-none focus:border-amber-400 cursor-pointer"
                    >
                      <option value="Clean / Excellent">{t.valuation.conditionClean}</option>
                      <option value="Good">{t.valuation.conditionGood}</option>
                      <option value="Fair">{t.valuation.conditionFair}</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-sans text-neutral-400 uppercase tracking-wider mb-1 font-medium">
                    {t.valuation.vinOptional}
                  </label>
                  <input
                    type="text"
                    value={vinNumber}
                    onChange={(e) => setVinNumber(e.target.value)}
                    placeholder={lang === 'es' ? 'Número de Identificación del Vehículo de 17 dígitos...' : '17-Digit Vehicle Identification Number...'}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs font-sans text-white focus:outline-none focus:border-amber-400"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-[#D4AF37] hover:bg-[#c5a030] text-black font-bold text-xs font-sans tracking-wider uppercase active:scale-[0.99] transition-all shadow-md shadow-[#D4AF37]/20 cursor-pointer flex items-center justify-center gap-2"
                >
                  <Calculator className="w-4 h-4" />
                  <span>{t.valuation.calculateTradeValue}</span>
                </button>
              </form>

              {/* Appraisal Output Box */}
              {hasCalculated && (
                <div className="mt-6 p-5 rounded-2xl bg-amber-400/5 border border-amber-400/30 animate-in fade-in duration-300 font-sans">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
                    <div>
                      <span className="text-[10px] font-sans text-amber-400 uppercase tracking-wider font-semibold">
                        {lang === 'es' ? `VALOR ESTIMADO PARA ${year} ${make} ${modelName}` : `ESTIMATED TRADE VALUE FOR ${year} ${make} ${modelName}`}
                      </span>
                      <div className="text-3xl font-bold font-sans text-white mt-1">
                        ${formatNumber(estimatedValue)}
                      </div>
                      <span className="text-[11px] font-sans text-neutral-400">
                        {t.valuation.blackshireOffer}
                      </span>
                    </div>

                    <div className="p-3.5 rounded-xl bg-amber-400/10 border border-amber-400/30 text-left sm:text-right">
                      <span className="text-[10px] font-sans text-amber-300 uppercase font-semibold">
                        {t.valuation.taxCreditNotice}
                      </span>
                      <div className="text-xl font-bold font-sans text-amber-300">
                        +${formatNumber(tradeInTaxCredit)}
                      </div>
                      <span className="text-[10px] font-sans text-neutral-400">
                        {t.valuation.salesTaxReduced}
                      </span>
                    </div>
                  </div>

                  <div className="mt-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-sans">
                    <span className="text-neutral-400 text-[11px] font-light">
                      {t.valuation.bringTitle}
                    </span>
                    <a
                      href="#contact"
                      className="px-4 py-2 rounded-xl bg-[#D4AF37] hover:bg-[#c5a030] text-black font-bold uppercase tracking-wider text-[11px] transition-all cursor-pointer whitespace-nowrap shadow-md shadow-[#D4AF37]/20 active:scale-95"
                    >
                      {t.valuation.lockInOffer} →
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ValuationCalculator;
