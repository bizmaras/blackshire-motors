import React from 'react';
import { Vehicle } from '../types';
import { formatPrice } from '../utils/formatters';
import { X, Scale, Sparkles, Trash2 } from 'lucide-react';
import { playHudClick } from '../utils/audio';
import { useLanguage } from '../context/LanguageContext';

interface CompareDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  vehicles: Vehicle[];
  onRemoveVehicle: (vehicleId: string) => void;
  onClearAll: () => void;
  onSelectVehicle: (vehicle: Vehicle) => void;
  currency: 'USD' | 'EUR' | 'BTC';
}

export const CompareDrawer: React.FC<CompareDrawerProps> = ({
  isOpen,
  onClose,
  vehicles,
  onRemoveVehicle,
  onClearAll,
  onSelectVehicle,
  currency,
}) => {
  if (!isOpen) return null;

  const { lang } = useLanguage();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-xl overflow-y-auto">
      <div className="relative w-full max-w-6xl my-auto rounded-3xl glass-obsidian border border-white/15 shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="p-4 sm:p-6 border-b border-white/10 flex items-center justify-between bg-black/40">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-amber-400/15 border border-amber-400/30 text-amber-300">
              <Scale className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif font-bold text-white text-lg tracking-wide uppercase">
                {lang === 'es' ? 'COMPARACIÓN DE VEHÍCULOS' : 'SIDE-BY-SIDE COMPARISON'} ({vehicles.length}/3)
              </h3>
              <p className="text-xs font-sans text-neutral-400 font-light">
                {lang === 'es'
                  ? 'Compare especificaciones mecánicas, millaje y ahorro de impuestos de Delaware'
                  : 'Compare technical specifications, verified odometer, and Delaware tax savings'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {vehicles.length > 0 && (
              <button
                onClick={() => { playHudClick(); onClearAll(); }}
                className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-neutral-400 hover:text-white text-xs font-sans flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>{lang === 'es' ? 'Limpiar Todo' : 'Clear All'}</span>
              </button>
            )}
            <button
              onClick={() => { playHudClick(); onClose(); }}
              className="p-2 rounded-xl bg-white/5 hover:bg-white/15 text-neutral-300 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8 max-h-[75vh] overflow-y-auto">
          {vehicles.length === 0 ? (
            <div className="text-center py-12 text-neutral-400 font-sans text-xs space-y-2">
              <Scale className="w-10 h-10 mx-auto text-neutral-600 mb-2" />
              <p className="text-sm text-neutral-300">
                {lang === 'es' ? 'No hay vehículos seleccionados para comparar' : 'No vehicles currently in comparison'}
              </p>
              <p className="font-light">
                {lang === 'es'
                  ? 'Haga clic en "+ Comparar" en cualquier tarjeta del inventario para contrastar especificaciones lado a lado.'
                  : 'Click "+ Compare" on any vehicle card in the inventory vault to evaluate up to 3 models simultaneously.'}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-sans">
              {vehicles.map((v) => (
                <div
                  key={v.id}
                  className="rounded-2xl bg-neutral-900/90 border border-white/10 p-5 flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-4">
                    <div className="relative aspect-video rounded-xl overflow-hidden bg-neutral-950 border border-white/10">
                      <img
                        src={v.heroImage}
                        alt={v.name}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover"
                      />
                      <button
                        onClick={() => { playHudClick(); onRemoveVehicle(v.id); }}
                        className="absolute top-2 right-2 p-1.5 rounded-lg bg-black/80 hover:bg-red-500/80 text-white transition-colors cursor-pointer"
                        title={lang === 'es' ? 'Remover' : 'Remove'}
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div>
                      <div className="text-[10px] uppercase font-semibold text-amber-400">
                        {v.year} • {v.make}
                      </div>
                      <h4 className="font-serif font-bold text-white text-base mt-0.5">
                        {v.name}
                      </h4>
                      <div className="text-lg font-bold text-amber-300 mt-1 font-sans">
                        {formatPrice(v.price, currency)}
                      </div>
                    </div>

                    {/* Comparison Specifications Matrix */}
                    <div className="space-y-2 text-xs border-t border-white/10 pt-3">
                      <div className="flex justify-between py-1 border-b border-white/5">
                        <span className="text-neutral-400">{lang === 'es' ? 'Millaje' : 'Mileage'}</span>
                        <span className="text-white font-medium">{v.formattedMileage}</span>
                      </div>
                      <div className="flex justify-between py-1 border-b border-white/5">
                        <span className="text-neutral-400">{lang === 'es' ? 'Motor' : 'Engine'}</span>
                        <span className="text-white font-medium truncate max-w-[140px]">{v.engine}</span>
                      </div>
                      <div className="flex justify-between py-1 border-b border-white/5">
                        <span className="text-neutral-400">{lang === 'es' ? 'Tracción' : 'Drivetrain'}</span>
                        <span className="text-white font-medium">{v.drivetrain}</span>
                      </div>
                      <div className="flex justify-between py-1 border-b border-white/5">
                        <span className="text-neutral-400">{lang === 'es' ? 'Consumo' : 'Economy'}</span>
                        <span className="text-white font-medium">{v.fuelEconomy}</span>
                      </div>
                      <div className="flex justify-between py-1 border-b border-white/5">
                        <span className="text-neutral-400">CARFAX</span>
                        <span className="text-amber-300 font-medium">
                          {v.carfax.oneOwner ? (lang === 'es' ? '1 Dueño' : '1 Owner') : (lang === 'es' ? 'Historial Limpio' : 'Clean History')}
                        </span>
                      </div>
                      <div className="flex justify-between py-1">
                        <span className="text-neutral-400">{lang === 'es' ? 'Est. Mensual' : 'Est. Monthly'}</span>
                        <span className="text-white font-semibold">${v.monthlyEstimate}{lang === 'es' ? '/mes' : '/mo'}</span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      onClose();
                      onSelectVehicle(v);
                    }}
                    className="w-full py-2.5 rounded-xl bg-[#D4AF37] hover:bg-[#c5a030] text-black font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-md shadow-[#D4AF37]/20 active:scale-95"
                  >
                    <span>{lang === 'es' ? 'Ver Detalles' : 'Inspect Vehicle'}</span>
                    <Sparkles className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CompareDrawer;
