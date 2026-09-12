import React, { useState, useMemo, useEffect, useRef } from 'react';
import { Vehicle } from '../types';
import { formatPrice, formatNumber } from '../utils/formatters';
import { Volume2, Scale, Check, ArrowRight, Sparkles, Tag, ChevronLeft, ChevronRight, Camera } from 'lucide-react';
import { playHudClick, playTactileChime, playEngineRev } from '../utils/audio';
import { useLanguage } from '../context/LanguageContext';

interface VehicleCardProps {
  vehicle: Vehicle;
  currency: 'USD' | 'EUR' | 'BTC';
  isCompared: boolean;
  onToggleCompare: (vehicle: Vehicle) => void;
  onSelect: (vehicle: Vehicle) => void;
  onConfigureSpec: (vehicle: Vehicle) => void;
  onMakeOffer: (vehicle: Vehicle) => void;
}

export const VehicleCard: React.FC<VehicleCardProps> = ({
  vehicle,
  currency,
  isCompared,
  onToggleCompare,
  onSelect,
  onConfigureSpec,
  onMakeOffer,
}) => {
  const { t } = useLanguage();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const touchStartX = useRef<number | null>(null);

  // Compile list of unique images for this vehicle
  const images = useMemo(() => {
    const list: string[] = [];
    if (vehicle.heroImage) list.push(vehicle.heroImage);
    if (vehicle.gallery && Array.isArray(vehicle.gallery)) {
      vehicle.gallery.forEach((url) => {
        if (url && !list.includes(url)) {
          list.push(url);
        }
      });
    }
    return list.length > 0
      ? list
      : ['https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80'];
  }, [vehicle.heroImage, vehicle.gallery]);

  // Reset image index when vehicle changes
  useEffect(() => {
    setCurrentImageIndex(0);
  }, [vehicle.id]);

  // Preload next and previous images for instant cycling
  useEffect(() => {
    if (images.length > 1) {
      const nextIdx = (currentImageIndex + 1) % images.length;
      const prevIdx = (currentImageIndex - 1 + images.length) % images.length;
      const img1 = new Image();
      img1.src = images[nextIdx];
      const img2 = new Image();
      img2.src = images[prevIdx];
    }
  }, [currentImageIndex, images]);

  const handlePrevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    playHudClick();
    setCurrentImageIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1));
  };

  const handleNextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    playHudClick();
    setCurrentImageIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0));
  };

  const handleDotClick = (e: React.MouseEvent, index: number) => {
    e.stopPropagation();
    playHudClick();
    setCurrentImageIndex(index);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) {
      if (diff > 0) {
        // Swipe Left -> Next Image
        setCurrentImageIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0));
      } else {
        // Swipe Right -> Prev Image
        setCurrentImageIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1));
      }
    }
    touchStartX.current = null;
  };

  const handleSoundPreview = (e: React.MouseEvent) => {
    e.stopPropagation();
    playEngineRev(vehicle.soundType);
  };

  const handleCompareClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    playHudClick();
    onToggleCompare(vehicle);
  };

  const currentImage = images[currentImageIndex] || vehicle.heroImage;

  return (
    <div
      id={`vehicle-card-${vehicle.id}`}
      onClick={() => { playHudClick(); onSelect(vehicle); }}
      itemScope
      itemType="https://schema.org/Car"
      className="group relative rounded-2xl glass-card overflow-hidden transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-amber-500/10 cursor-pointer flex flex-col justify-between border border-white/10 h-full"
    >
      <meta itemProp="name" content={`${vehicle.year} ${vehicle.make} ${vehicle.model} ${vehicle.trim}`} />
      <meta itemProp="vehicleModelDate" content={vehicle.year.toString()} />
      <meta itemProp="mileageFromOdometer" content={vehicle.mileage.toString()} />
      <meta itemProp="vehicleIdentificationNumber" content={vehicle.vinCode} />
      <meta itemProp="itemCondition" content="https://schema.org/UsedCondition" />

      {/* Top Image Carousel Container */}
      <div 
        className="relative aspect-[16/10] overflow-hidden bg-neutral-950 select-none"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <img
          key={currentImage}
          src={currentImage}
          alt={`${vehicle.year} ${vehicle.make} ${vehicle.model} ${vehicle.trim} - Photo ${currentImageIndex + 1} of ${images.length} at Blackshire Motors New Castle DE`}
          loading="lazy"
          decoding="async"
          referrerPolicy="no-referrer"
          onError={(e) => {
            const target = e.currentTarget as HTMLImageElement;
            const fallback = 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80';
            if (target.src !== fallback) {
              target.src = fallback;
            }
          }}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-all duration-500 ease-out filter brightness-95 group-hover:brightness-105"
        />

        {/* Carousel Cycling Controls */}
        {images.length > 1 && (
          <>
            <button
              type="button"
              onClick={handlePrevImage}
              aria-label={`Previous photo of ${vehicle.name}`}
              title="Previous photo"
              className="absolute left-2.5 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-black/70 hover:bg-black/95 backdrop-blur-md text-white hover:text-amber-300 border border-white/20 hover:border-amber-400/60 transition-all flex items-center justify-center opacity-90 sm:opacity-0 sm:group-hover:opacity-100 shadow-lg active:scale-90 cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4 stroke-[2.5]" />
            </button>

            <button
              type="button"
              onClick={handleNextImage}
              aria-label={`Next photo of ${vehicle.name}`}
              title="Next photo"
              className="absolute right-2.5 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-black/70 hover:bg-black/95 backdrop-blur-md text-white hover:text-amber-300 border border-white/20 hover:border-amber-400/60 transition-all flex items-center justify-center opacity-90 sm:opacity-0 sm:group-hover:opacity-100 shadow-lg active:scale-90 cursor-pointer"
            >
              <ChevronRight className="w-4 h-4 stroke-[2.5]" />
            </button>

            {/* Micro Dot Navigation Indicators */}
            <div className="absolute bottom-9 left-0 right-0 z-20 flex items-center justify-center gap-1 pointer-events-auto px-4">
              {images.slice(0, 8).map((_, dotIdx) => (
                <button
                  key={dotIdx}
                  type="button"
                  onClick={(e) => handleDotClick(e, dotIdx)}
                  aria-label={`View photo ${dotIdx + 1} of ${vehicle.name}`}
                  className="p-2 -m-1.5 inline-flex items-center justify-center cursor-pointer"
                >
                  <span
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      currentImageIndex === dotIdx
                        ? 'w-4 bg-amber-400 shadow-sm shadow-amber-400/80'
                        : 'w-1.5 bg-white/40 hover:bg-white/80'
                    }`}
                  />
                </button>
              ))}
              {images.length > 8 && (
                <span className="text-[9px] font-mono text-white/70 ml-0.5">+{images.length - 8}</span>
              )}
            </div>
          </>
        )}

        {/* Subtle vignette gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0c0c10] via-transparent to-black/60 pointer-events-none" />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10">
          <span className="px-3 py-1 rounded-full bg-black/80 backdrop-blur-md border border-amber-400/40 text-[10px] font-sans tracking-widest uppercase text-amber-300 font-semibold shadow-md">
            {vehicle.badge}
          </span>

          <div className="flex items-center gap-1.5">
            {/* Multi-Photo Counter Pill */}
            {images.length > 1 && (
              <span 
                title={`${images.length} vehicle photos available`}
                className="px-2 py-1 rounded-lg bg-black/80 backdrop-blur-md border border-white/20 text-[10px] font-mono text-neutral-200 flex items-center gap-1 shadow-sm"
              >
                <Camera className="w-3 h-3 text-amber-400 shrink-0" />
                <span>{currentImageIndex + 1}/{images.length}</span>
              </span>
            )}

            {/* Audio acoustic engine preview */}
            <button
              onClick={handleSoundPreview}
              title={`Acoustic engine preview (${vehicle.engine})`}
              className="p-1.5 rounded-lg bg-black/80 backdrop-blur-md border border-white/20 text-neutral-300 hover:text-amber-400 hover:border-amber-400 transition-colors"
            >
              <Volume2 className="w-3.5 h-3.5" />
            </button>

            {/* Compare Toggle */}
            <button
              onClick={handleCompareClick}
              title={isCompared ? 'Remove from comparison' : 'Add to side-by-side comparison'}
              className={`px-2.5 py-1 rounded-lg backdrop-blur-md border text-[10px] font-sans tracking-wider uppercase flex items-center gap-1 transition-all ${
                isCompared
                  ? 'bg-amber-400 text-black border-amber-300 font-bold'
                  : 'bg-black/80 text-neutral-300 border-white/20 hover:border-amber-400/50 font-medium'
              }`}
            >
              {isCompared ? <Check className="w-3 h-3 stroke-[3]" /> : <Scale className="w-3 h-3" />}
              <span>{isCompared ? t.inventory.addedBtn : t.inventory.compareBtn}</span>
            </button>
          </div>
        </div>

        {/* Delaware 0% Tax Savings Callout Badge */}
        <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between z-10 text-[10px] font-sans pointer-events-none">
          <div className="px-2.5 py-0.8 rounded-full bg-amber-950/85 text-amber-200 border border-amber-500/40 backdrop-blur-sm flex items-center gap-1.5 font-medium shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
            <span>{t.inventory.taxSavings} ${formatNumber(vehicle.taxSavingsEstimate)} {t.inventory.taxSavingsSub}</span>
          </div>

          <span className="text-neutral-300 bg-black/80 px-2.5 py-0.8 rounded-full backdrop-blur-sm border border-white/15 font-medium tracking-wide shadow-sm">
            {vehicle.category}
          </span>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div>
          {/* Year & Make & Stock Number */}
          <div className="flex items-center justify-between text-[11px] font-sans uppercase tracking-wider text-neutral-400 mb-1">
            <span className="font-medium">{vehicle.year} • {vehicle.make}</span>
            <span className="text-neutral-500">STOCK #{vehicle.stockNumber}</span>
          </div>

          {/* Model Name & Trim */}
          <h3 className="font-serif text-lg font-bold text-white tracking-wide group-hover:text-amber-300 transition-colors line-clamp-1">
            {vehicle.name}
          </h3>

          <p className="mt-1 text-xs text-neutral-400 line-clamp-2 leading-relaxed font-light">
            {vehicle.tagline}
          </p>

          {/* Vehicle Key Specs Matrix */}
          <div className="mt-3.5 grid grid-cols-3 gap-2 p-2.5 rounded-xl bg-white/[0.03] border border-white/5 font-sans text-xs">
            <div>
              <div className="text-[10px] text-neutral-500 uppercase tracking-wider font-medium">{t.inventory.mileage}</div>
              <div className="font-semibold text-white mt-0.5">{vehicle.formattedMileage}</div>
            </div>

            <div>
              <div className="text-[10px] text-neutral-500 uppercase tracking-wider font-medium">{t.inventory.drive}</div>
              <div className="font-semibold text-white mt-0.5 truncate">{vehicle.drivetrain.split(' ')[0]}</div>
            </div>

            <div>
              <div className="text-[10px] text-neutral-500 uppercase tracking-wider font-medium">{t.inventory.carfax}</div>
              <div className="font-semibold text-amber-300 mt-0.5">
                {vehicle.carfax.oneOwner ? t.inventory.oneOwner : t.inventory.cleanTitle}
              </div>
            </div>
          </div>
        </div>

        {/* Pricing and Action Footer */}
        <div className="pt-3 border-t border-white/10 flex flex-col gap-2.5">
          <div className="flex items-center justify-between">
            <div itemProp="offers" itemScope itemType="https://schema.org/Offer">
              <meta itemProp="priceCurrency" content="USD" />
              <meta itemProp="price" content={vehicle.price.toString()} />
              <meta itemProp="availability" content="https://schema.org/InStock" />
              <meta itemProp="itemCondition" content="https://schema.org/UsedCondition" />

              <div className="text-[10px] font-sans tracking-wider text-neutral-400 uppercase font-medium">
                {t.inventory.delawarePrice}
              </div>
              <div className="text-xl font-bold font-sans text-amber-300 leading-tight">
                {formatPrice(vehicle.price, currency)}
              </div>
              <div className="text-[11px] font-sans text-neutral-400">
                {t.inventory.estMonthly} ${vehicle.monthlyEstimate}{t.inventory.monthlyUnit}
              </div>
            </div>

            <div className="flex items-center gap-1.5">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  playTactileChime();
                  onConfigureSpec(vehicle);
                }}
                title={t.inventory.configureBtn}
                className="p-2.5 rounded-xl bg-white/5 hover:bg-amber-400/20 text-neutral-300 hover:text-amber-300 border border-white/10 hover:border-amber-400/50 transition-colors cursor-pointer"
              >
                <Sparkles className="w-4 h-4" />
              </button>

              <button
                onClick={() => {
                  playHudClick();
                  onSelect(vehicle);
                }}
                className="px-3.5 py-2 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-white font-sans text-xs tracking-wider uppercase border border-white/15 hover:border-white/30 transition-all font-semibold flex items-center gap-1.5 cursor-pointer"
              >
                <span>{t.inventory.exploreBtn}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Dedicated SEO & High-Conversion Make Offer Trigger */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              playTactileChime();
              onMakeOffer(vehicle);
            }}
            data-action="make-offer"
            title={`${t.inventory.makeOfferBtn} - ${vehicle.year} ${vehicle.name}`}
            aria-label={`${t.inventory.makeOfferBtn} - ${vehicle.year} ${vehicle.name}`}
            className="w-full py-2 px-3 rounded-xl bg-amber-400/10 hover:bg-amber-400 hover:text-black text-amber-300 border border-amber-400/30 hover:border-amber-400 font-sans text-xs tracking-wider uppercase font-bold flex items-center justify-center gap-1.5 transition-all shadow-sm hover:shadow-amber-400/25 active:scale-[0.98] cursor-pointer"
          >
            <Tag className="w-3.5 h-3.5 shrink-0" />
            <span>{t.inventory.makeOfferBtn}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default VehicleCard;
