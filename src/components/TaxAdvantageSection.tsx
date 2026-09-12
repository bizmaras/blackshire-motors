import React, { useState } from 'react';
import { Percent, ArrowRight } from 'lucide-react';
import { formatNumber } from '../utils/formatters';
import { playTactileChime } from '../utils/audio';
import { useLanguage } from '../context/LanguageContext';

export const TaxAdvantageSection: React.FC<{ onOpenInventory: () => void }> = ({ onOpenInventory }) => {
  const { lang, t } = useLanguage();
  const [vehicleValuation, setVehicleValuation] = useState<number>(25000);

  // State comparisons
  const paTaxRate = 0.06; // 6% PA sales tax
  const njTaxRate = 0.06625; // 6.625% NJ sales tax
  const mdTaxRate = 0.06; // 6% MD excise tax

  const paTax = Math.round(vehicleValuation * paTaxRate);
  const njTax = Math.round(vehicleValuation * njTaxRate);
  const mdTax = Math.round(vehicleValuation * mdTaxRate);

  const averageNeighborTax = Math.round((paTax + njTax + mdTax) / 3);

  return (
    <section id="tax-advantage" className="scroll-mt-28 sm:scroll-mt-32 lg:scroll-mt-36 py-20 bg-[#09090e] border-t border-white/5 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-amber-500/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-sans tracking-widest uppercase mb-3 font-semibold">
            <Percent className="w-3.5 h-3.5 text-amber-400" />
            {t.tax.badge}
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight uppercase">
            {t.tax.title}
          </h2>
          <p className="mt-3 text-sm text-neutral-300 leading-relaxed font-light">
            {t.tax.subtitle}
          </p>
        </div>

        {/* Interactive Comparison Matrix & Calculator */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left: Interactive Valuation Slider */}
          <div className="lg:col-span-6 p-6 sm:p-8 rounded-3xl glass-obsidian border border-white/10 space-y-6">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <span className="text-xs font-sans uppercase tracking-wider text-neutral-400 font-medium">
                {t.tax.calcTitle}
              </span>
              <span className="text-xs font-sans text-amber-300 font-semibold tracking-wider uppercase">
                {t.tax.instantComp}
              </span>
            </div>

            <div>
              <div className="flex justify-between items-center text-xs font-sans mb-2">
                <span className="text-neutral-400 font-medium">{t.tax.selectedPrice}</span>
                <span className="text-2xl font-bold font-sans text-amber-300">
                  ${formatNumber(vehicleValuation)}
                </span>
              </div>
              <input
                type="range"
                min={10000}
                max={60000}
                step={1000}
                value={vehicleValuation}
                onChange={(e) => setVehicleValuation(Number(e.target.value))}
                className="w-full h-2.5 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-amber-400"
              />
              <div className="flex justify-between text-[11px] font-sans text-neutral-500 mt-2">
                <span>$10,000 ({lang === 'es' ? 'Entrada' : 'Entry'})</span>
                <span>$25,000 ({lang === 'es' ? 'Promedio' : 'Median'})</span>
                <span>$60,000 ({lang === 'es' ? 'Lujo' : 'Luxury'})</span>
              </div>
            </div>

            {/* Big Savings Callout */}
            <div className="p-5 rounded-2xl bg-amber-950/25 border border-amber-500/30 text-center space-y-1">
              <span className="text-[11px] font-sans text-amber-300 uppercase tracking-widest block font-medium">
                {t.tax.estimatedSavings}
              </span>
              <div className="text-4xl sm:text-5xl font-black font-sans text-white">
                ${formatNumber(averageNeighborTax)}
              </div>
              <span className="text-xs text-neutral-300 block font-light">
                {t.tax.comparedStates}
              </span>
            </div>

            <button
              onClick={() => { playTactileChime(); onOpenInventory(); }}
              className="w-full py-3.5 rounded-xl bg-[#D4AF37] hover:bg-[#c5a030] text-black font-bold font-sans text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-[#D4AF37]/20 active:scale-95"
            >
              <span>{t.tax.claimSavingsBtn}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Right: State Comparison Breakdown */}
          <div className="lg:col-span-6 space-y-4 font-sans text-xs">
            {/* Delaware */}
            <div className="p-4 rounded-2xl bg-amber-950/25 border border-amber-500/50 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-300 flex items-center justify-center font-bold text-sm">
                  DE
                </div>
                <div>
                  <div className="font-semibold text-white text-sm">{t.tax.delaware}</div>
                  <div className="text-amber-300 text-[11px]">{t.tax.delawareRate}</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-xl font-bold text-amber-300">$0.00 TAX</div>
                <div className="text-[10px] text-amber-200 font-semibold tracking-wide">{t.tax.delawareExempt}</div>
              </div>
            </div>

            {/* Pennsylvania */}
            <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-neutral-800 text-neutral-400 flex items-center justify-center font-bold text-sm">
                  PA
                </div>
                <div>
                  <div className="font-semibold text-neutral-200 text-sm">{t.tax.pennsylvania}</div>
                  <div className="text-neutral-400 text-[11px]">{t.tax.pennsylvaniaRate}</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-lg font-bold text-red-400">+${formatNumber(paTax)}</div>
                <div className="text-[10px] text-neutral-500">{t.tax.addedToPurchase}</div>
              </div>
            </div>

            {/* New Jersey */}
            <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-neutral-800 text-neutral-400 flex items-center justify-center font-bold text-sm">
                  NJ
                </div>
                <div>
                  <div className="font-semibold text-neutral-200 text-sm">{t.tax.newJersey}</div>
                  <div className="text-neutral-400 text-[11px]">{t.tax.newJerseyRate}</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-lg font-bold text-red-400">+${formatNumber(njTax)}</div>
                <div className="text-[10px] text-neutral-500">{t.tax.addedToPurchase}</div>
              </div>
            </div>

            {/* Maryland */}
            <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-neutral-800 text-neutral-400 flex items-center justify-center font-bold text-sm">
                  MD
                </div>
                <div>
                  <div className="font-semibold text-neutral-200 text-sm">{t.tax.maryland}</div>
                  <div className="text-neutral-400 text-[11px]">{t.tax.marylandRate}</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-lg font-bold text-red-400">+${formatNumber(mdTax)}</div>
                <div className="text-[10px] text-neutral-500">{t.tax.addedToPurchase}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TaxAdvantageSection;
