import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Vehicle, VehicleCategory } from '../types';
import { VehicleCard } from './VehicleCard';
import { 
  Search, 
  Percent, 
  ArrowUpDown, 
  Grid, 
  Columns, 
  ChevronLeft, 
  ChevronRight, 
  SlidersHorizontal,
  Camera
} from 'lucide-react';
import { playHudClick } from '../utils/audio';
import { formatNumber } from '../utils/formatters';
import { useLanguage } from '../context/LanguageContext';

interface VaultSectionProps {
  vehicles: Vehicle[];
  currency: 'USD' | 'EUR' | 'BTC';
  comparedVehicles: Vehicle[];
  onToggleCompare: (vehicle: Vehicle) => void;
  onSelectVehicle: (vehicle: Vehicle) => void;
  onConfigureSpec: (vehicle: Vehicle) => void;
  onMakeOffer: (vehicle: Vehicle) => void;
  filterMake?: string;
  filterBodyStyle?: string;
  filterMaxPrice?: string;
  onResetFilters?: () => void;
}

const CATEGORIES: VehicleCategory[] = [
  'All',
  'Under $15k',
  'Trucks & 4x4',
  'Family SUVs',
  'Reliable Sedans',
  'Under $20k',
];

const categoryLabels: Record<VehicleCategory, { en: string; es: string }> = {
  'All': { en: 'All Cars & Trucks', es: 'Todos los Vehículos' },
  'Under $15k': { en: 'Under $15k', es: 'Menos de $15k' },
  'Trucks & 4x4': { en: 'Trucks & 4x4', es: 'Camionetas 4x4' },
  'Family SUVs': { en: 'SUVs & Crossovers', es: 'SUVs y Crossovers' },
  'Reliable Sedans': { en: 'Sedans & Compacts', es: 'Sedanes y Autos' },
  'Under $20k': { en: 'Under $20k', es: 'Menos de $20k' },
};

export const VaultSection: React.FC<VaultSectionProps> = ({
  vehicles,
  currency,
  comparedVehicles,
  onToggleCompare,
  onSelectVehicle,
  onConfigureSpec,
  onMakeOffer,
  filterMake = 'All',
  filterBodyStyle = 'All',
  filterMaxPrice = 'All',
  onResetFilters,
}) => {
  const { lang, t } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<VehicleCategory>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMake, setSelectedMake] = useState(filterMake);
  const [selectedBodyStyle, setSelectedBodyStyle] = useState(filterBodyStyle);
  const [selectedMaxPrice, setSelectedMaxPrice] = useState(filterMaxPrice);
  const [sortBy, setSortBy] = useState<'price-asc' | 'price-desc' | 'mileage-asc' | 'year-desc'>('price-asc');
  const [viewMode, setViewMode] = useState<'grid' | 'carousel'>('grid');
  const [carouselIndex, setCarouselIndex] = useState(0);

  // Synchronize when parent passes filters from Hero search
  useEffect(() => {
    if (filterMake !== undefined) setSelectedMake(filterMake);
    if (filterBodyStyle !== undefined) setSelectedBodyStyle(filterBodyStyle);
    if (filterMaxPrice !== undefined) setSelectedMaxPrice(filterMaxPrice);
  }, [filterMake, filterBodyStyle, filterMaxPrice]);

  const hasActiveQuickFilter = selectedMake !== 'All' || selectedBodyStyle !== 'All' || selectedMaxPrice !== 'All';

  const handleResetFilters = () => {
    playHudClick();
    setSelectedMake('All');
    setSelectedBodyStyle('All');
    setSelectedMaxPrice('All');
    setSelectedCategory('All');
    setSearchQuery('');
    if (onResetFilters) onResetFilters();
  };

  const filteredVehicles = useMemo(() => {
    return vehicles
      .filter((vehicle) => {
        // Category tab filter
        const matchesCategory =
          selectedCategory === 'All' ||
          vehicle.category === selectedCategory ||
          (selectedCategory === 'Under $20k' && vehicle.price <= 20000);

        // Make filter
        const matchesMake =
          selectedMake === 'All' ||
          vehicle.make.toLowerCase() === selectedMake.toLowerCase() ||
          vehicle.brand.toLowerCase() === selectedMake.toLowerCase() ||
          vehicle.name.toLowerCase().includes(selectedMake.toLowerCase());

        // Body Style filter
        let matchesBody = true;
        if (selectedBodyStyle !== 'All') {
          const bodyLower = selectedBodyStyle.toLowerCase();
          if (bodyLower === 'sedan') {
            matchesBody =
              vehicle.category === 'Reliable Sedans' ||
              vehicle.name.toLowerCase().includes('sedan') ||
              vehicle.name.toLowerCase().includes('accord') ||
              vehicle.name.toLowerCase().includes('civic') ||
              vehicle.name.toLowerCase().includes('malibu') ||
              vehicle.name.toLowerCase().includes('corolla') ||
              vehicle.trim.toLowerCase().includes('sedan');
          } else if (bodyLower === 'suv') {
            matchesBody =
              vehicle.category === 'Family SUVs' ||
              vehicle.name.toLowerCase().includes('suv') ||
              vehicle.name.toLowerCase().includes('cr-v') ||
              vehicle.name.toLowerCase().includes('sportage') ||
              vehicle.name.toLowerCase().includes('terrain') ||
              vehicle.name.toLowerCase().includes('cherokee') ||
              vehicle.name.toLowerCase().includes('explorer');
          } else if (bodyLower === 'truck') {
            matchesBody =
              vehicle.category === 'Trucks & 4x4' ||
              vehicle.make.toLowerCase() === 'ram' ||
              vehicle.name.toLowerCase().includes('1500') ||
              vehicle.name.toLowerCase().includes('f-150') ||
              vehicle.name.toLowerCase().includes('silverado') ||
              vehicle.name.toLowerCase().includes('canyon') ||
              vehicle.name.toLowerCase().includes('truck');
          } else if (bodyLower === 'coupe') {
            matchesBody =
              vehicle.name.toLowerCase().includes('coupe') ||
              vehicle.trim.toLowerCase().includes('coupe');
          }
        }

        // Max price filter
        const matchesPrice =
          selectedMaxPrice === 'All' || vehicle.price <= Number(selectedMaxPrice);

        // Text search query
        const query = searchQuery.toLowerCase().trim();
        const matchesSearch =
          !query ||
          vehicle.name.toLowerCase().includes(query) ||
          vehicle.make.toLowerCase().includes(query) ||
          vehicle.model.toLowerCase().includes(query) ||
          vehicle.drivetrain.toLowerCase().includes(query) ||
          vehicle.engine.toLowerCase().includes(query) ||
          vehicle.exteriorColor.toLowerCase().includes(query);

        return matchesCategory && matchesMake && matchesBody && matchesPrice && matchesSearch;
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') return a.price - b.price;
        if (sortBy === 'price-desc') return b.price - a.price;
        if (sortBy === 'mileage-asc') return a.mileage - b.mileage;
        if (sortBy === 'year-desc') return b.year - a.year;
        return 0;
      });
  }, [vehicles, selectedCategory, selectedMake, selectedBodyStyle, selectedMaxPrice, searchQuery, sortBy]);

  const handleNextCarousel = () => {
    playHudClick();
    setCarouselIndex((prev) => (prev + 1) % Math.max(1, filteredVehicles.length - 2));
  };

  const handlePrevCarousel = () => {
    playHudClick();
    setCarouselIndex((prev) => Math.max(0, prev - 1));
  };

  return (
    <section id="inventory" className="scroll-mt-28 sm:scroll-mt-32 lg:scroll-mt-36 py-20 sm:py-24 relative bg-[#08080a] border-t border-white/5">
      {/* Background glow accents */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-amber-500/5 blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Header & Delaware Advantage Banner */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-8 border-b border-white/10">
          <div>
            <div className="flex items-center gap-2 text-xs font-sans tracking-widest text-amber-400 uppercase mb-2 font-medium">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              {t.inventory.lotStatus}
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight uppercase">
              {t.inventory.sectionTitle}
            </h2>
            <p className="mt-2 text-sm text-neutral-300 max-w-2xl leading-relaxed font-light">
              {t.inventory.sectionSubtitle}
            </p>
          </div>

          {/* Delaware Tax Callout Box */}
          <div className="p-4 rounded-2xl bg-amber-950/20 border border-amber-500/30 flex items-center gap-3.5 max-w-sm">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-300 flex items-center justify-center shrink-0">
              <Percent className="w-5 h-5" />
            </div>
            <div className="text-xs font-sans">
              <span className="text-amber-300 font-semibold tracking-wide block">{t.tax.title}</span>
              <span className="text-neutral-300 text-[11px] leading-relaxed block mt-0.5">
                {t.inventory.delawareTaxCallout}
              </span>
            </div>
          </div>
        </div>

        {/* Filter and Search Bar */}
        <div className="mt-8 space-y-4">
          
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  playHudClick();
                  setSelectedCategory(cat);
                  setCarouselIndex(0);
                }}
                className={`px-4 py-2.5 rounded-xl text-xs font-sans tracking-wider whitespace-nowrap uppercase transition-all cursor-pointer shrink-0 ${
                  selectedCategory === cat
                    ? 'bg-[#D4AF37] hover:bg-[#c5a030] text-black font-bold shadow-md shadow-[#D4AF37]/20 ring-1 ring-[#D4AF37]'
                    : 'bg-white/5 text-neutral-300 hover:text-white hover:bg-white/10 border border-white/5 font-medium'
                }`}
              >
                {categoryLabels[cat] ? categoryLabels[cat][lang] : cat}
              </button>
            ))}
          </div>

          {/* Search, Sort & View Controls */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-1">
            {/* Search Input */}
            <div className="relative flex-1 sm:max-w-md">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-500 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t.inventory.searchPlaceholder}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs font-sans text-white placeholder-neutral-500 focus:outline-none focus:border-[#D4AF37] transition-colors"
              />
            </div>

            {/* Sort & View Mode Controls */}
            <div className="flex items-center gap-3 self-end sm:self-auto">
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => {
                    playHudClick();
                    setSortBy(e.target.value as any);
                  }}
                  className="appearance-none pl-3.5 pr-8 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs font-sans text-neutral-200 focus:outline-none focus:border-[#D4AF37] cursor-pointer"
                >
                  <option value="price-asc" className="bg-neutral-900 text-white">{t.inventory.sortPriceLow}</option>
                  <option value="price-desc" className="bg-neutral-900 text-white">{t.inventory.sortPriceHigh}</option>
                  <option value="mileage-asc" className="bg-neutral-900 text-white">{t.inventory.sortMileageLow}</option>
                  <option value="year-desc" className="bg-neutral-900 text-white">{t.inventory.sortYearNew}</option>
                </select>
                <ArrowUpDown className="w-3.5 h-3.5 absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500 pointer-events-none" />
              </div>

              {/* View Mode Toggle */}
              <div className="flex items-center gap-1 p-1 bg-white/5 rounded-xl border border-white/10">
                <button
                  onClick={() => { playHudClick(); setViewMode('grid'); }}
                  title="Grid View"
                  className={`p-1.5 rounded-lg text-xs transition-colors cursor-pointer ${
                    viewMode === 'grid' ? 'bg-[#d4af37] text-black font-semibold' : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  <Grid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => { playHudClick(); setViewMode('carousel'); }}
                  title="Slider View"
                  className={`p-1.5 rounded-lg text-xs transition-colors cursor-pointer ${
                    viewMode === 'carousel' ? 'bg-[#d4af37] text-black font-semibold' : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  <Columns className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Active Quick Filters Bar */}
        {hasActiveQuickFilter && (
          <div className="mt-4 p-3.5 rounded-xl bg-amber-500/10 border border-amber-400/30 flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <span className="text-amber-400 font-semibold uppercase tracking-wider flex items-center gap-1.5">
                <SlidersHorizontal className="w-3.5 h-3.5" />
                Active Filters:
              </span>
              {selectedMake !== 'All' && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-black/60 border border-amber-400/40 text-amber-300">
                  <span>Make: <strong>{selectedMake}</strong></span>
                  <button
                    onClick={() => { playHudClick(); setSelectedMake('All'); }}
                    className="text-neutral-400 hover:text-white cursor-pointer ml-1 font-bold"
                    title="Remove make filter"
                  >
                    ✕
                  </button>
                </span>
              )}
              {selectedBodyStyle !== 'All' && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-black/60 border border-amber-400/40 text-amber-300">
                  <span>Style: <strong>{selectedBodyStyle}</strong></span>
                  <button
                    onClick={() => { playHudClick(); setSelectedBodyStyle('All'); }}
                    className="text-neutral-400 hover:text-white cursor-pointer ml-1 font-bold"
                    title="Remove body style filter"
                  >
                    ✕
                  </button>
                </span>
              )}
              {selectedMaxPrice !== 'All' && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-black/60 border border-amber-400/40 text-amber-300">
                  <span>Max Budget: <strong>${formatNumber(Number(selectedMaxPrice))}</strong></span>
                  <button
                    onClick={() => { playHudClick(); setSelectedMaxPrice('All'); }}
                    className="text-neutral-400 hover:text-white cursor-pointer ml-1 font-bold"
                    title="Remove price filter"
                  >
                    ✕
                  </button>
                </span>
              )}
              <span className="text-neutral-400 ml-1">
                ({filteredVehicles.length} {filteredVehicles.length === 1 ? (lang === 'es' ? 'vehículo' : 'vehicle') : (lang === 'es' ? 'vehículos' : 'vehicles')} {lang === 'es' ? 'encontrados' : 'found'})
              </span>
            </div>

            <button
              onClick={handleResetFilters}
              className="px-3 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-neutral-300 hover:text-white text-xs font-sans tracking-wide transition-colors cursor-pointer"
            >
              {lang === 'es' ? 'Limpiar Filtros' : 'Clear All Filters'}
            </button>
          </div>
        )}

        {/* Results Counter */}
        <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-xs font-sans text-neutral-400">
          <div className="flex items-center gap-2.5 flex-wrap">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[11px] font-semibold tracking-wide">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              {t.inventory.lotStatusBadge}
            </span>
            <span>
              {t.inventory.showing} <strong className="text-white font-semibold">{filteredVehicles.length}</strong> {t.inventory.certifiedVehicles}
            </span>
            <span className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/5 text-[11px] text-neutral-300 border border-white/10">
              <Camera className="w-3 h-3 text-amber-400 shrink-0" />
              <span>{lang === 'es' ? 'Haga clic en las flechas o deslice para ver más fotos de cada auto' : 'Cycle photos directly on any vehicle card with arrows or swipe'}</span>
            </span>
          </div>
          {viewMode === 'carousel' && filteredVehicles.length > 3 && (
            <div className="flex items-center gap-2">
              <button
                onClick={handlePrevCarousel}
                disabled={carouselIndex === 0}
                className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-white disabled:opacity-30 cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <span>{carouselIndex + 1} / {Math.max(1, filteredVehicles.length - 2)}</span>
              <button
                onClick={handleNextCarousel}
                disabled={carouselIndex >= filteredVehicles.length - 3}
                className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-white disabled:opacity-30 cursor-pointer"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>

        {/* View Mode 1: Responsive Grid with Subtle Motion Entry */}
        {viewMode === 'grid' && (
          <motion.div
            layout
            className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            <AnimatePresence mode="popLayout">
              {filteredVehicles.map((vehicle, index) => {
                const isCompared = comparedVehicles.some((v) => v.id === vehicle.id);
                return (
                  <motion.div
                    key={vehicle.id}
                    layout
                    initial={{ opacity: 0, y: 16, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.96, transition: { duration: 0.18 } }}
                    transition={{
                      duration: 0.38,
                      delay: Math.min(index * 0.04, 0.24),
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="h-full"
                  >
                    <VehicleCard
                      vehicle={vehicle}
                      currency={currency}
                      isCompared={isCompared}
                      onToggleCompare={onToggleCompare}
                      onSelect={onSelectVehicle}
                      onConfigureSpec={onConfigureSpec}
                      onMakeOffer={onMakeOffer}
                    />
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>
        )}

        {/* View Mode 2: Interactive Slider */}
        {viewMode === 'carousel' && (
          <div className="mt-6 relative overflow-hidden">
            <div
              className="flex gap-6 transition-transform duration-500 ease-out"
              style={{
                transform: `translateX(-${carouselIndex * (100 / (typeof window !== 'undefined' && window.innerWidth > 1024 ? 3 : typeof window !== 'undefined' && window.innerWidth > 768 ? 2 : 1))}%)`
              }}
            >
              {filteredVehicles.map((vehicle, index) => {
                const isCompared = comparedVehicles.some((v) => v.id === vehicle.id);
                return (
                  <motion.div
                    key={vehicle.id}
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.32,
                      delay: Math.min(index * 0.03, 0.2),
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="min-w-full md:min-w-[calc(50%-12px)] lg:min-w-[calc(33.333%-16px)] shrink-0"
                  >
                    <VehicleCard
                      vehicle={vehicle}
                      currency={currency}
                      isCompared={isCompared}
                      onToggleCompare={onToggleCompare}
                      onSelect={onSelectVehicle}
                      onConfigureSpec={onConfigureSpec}
                      onMakeOffer={onMakeOffer}
                    />
                  </motion.div>
                );
              })}
            </div>
          </div>
        )}

        {/* Empty State */}
        {filteredVehicles.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="mt-12 p-12 text-center rounded-2xl border border-white/10 glass-card"
          >
            <p className="text-neutral-300 text-sm font-sans font-light">
              {t.inventory.noVehiclesFound}
            </p>
            <button
              onClick={handleResetFilters}
              className="mt-4 px-5 py-2.5 rounded-xl bg-[#D4AF37] hover:bg-[#c5a030] text-black font-sans text-xs font-semibold uppercase tracking-wider cursor-pointer active:scale-95 transition-all shadow-md shadow-[#D4AF37]/20"
            >
              {lang === 'es' ? 'RESTABLECER TODOS LOS FILTROS' : 'RESET ALL INVENTORY FILTERS'}
            </button>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default VaultSection;
