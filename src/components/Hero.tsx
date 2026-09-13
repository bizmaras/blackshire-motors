import React, { useState, useEffect, useRef, useMemo } from 'react';
import { 
  Sparkles, 
  ArrowRight, 
  Play, 
  Pause, 
  ChevronLeft, 
  ChevronRight, 
  CheckCircle2, 
  Search, 
  Volume2 
} from 'lucide-react';
import { playHudClick, playTactileChime, playEngineRev } from '../utils/audio';
import { useLanguage } from '../context/LanguageContext';

interface HeroProps {
  onOpenBespoke: () => void;
  onExploreVault: () => void;
  onSelectVehicleById: (vehicleId: string) => void;
  onQuickSearch: (make: string, bodyStyle: string, maxPrice: string) => void;
}

interface HeroSlide {
  id: string;
  badge: string;
  badgeType: 'luxury' | 'truck' | 'service';
  titleLine1: string;
  titleLine2: string;
  subtitle: string;
  ctaText: string;
  secondaryCtaText: string;
  featuredVehicleId?: string;
  featuredCarName?: string;
  featuredPrice?: string;
  featuredMonthly?: string;
  featuredSpecs?: { label: string; value: string }[];
  bgImage: string;
  soundType: 'twin-turbo' | 'v12-roar' | 'v16-thunder' | 'v8-rumble';
  soundLabel: string;
}

export const Hero: React.FC<HeroProps> = ({
  onOpenBespoke,
  onExploreVault,
  onSelectVehicleById,
  onQuickSearch,
}) => {
  const { lang, t } = useLanguage();
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(0);

  // Quick search form states
  const [selectedMake, setSelectedMake] = useState('All');
  const [selectedBodyStyle, setSelectedBodyStyle] = useState('All');
  const [selectedMaxPrice, setSelectedMaxPrice] = useState('All');

  const slides: HeroSlide[] = useMemo(() => [
    {
      id: 'slide-luxury',
      badge: t.hero.badge1,
      badgeType: 'luxury',
      titleLine1: t.hero.title1Line1,
      titleLine2: t.hero.title1Line2,
      subtitle: t.hero.subtitle1,
      ctaText: t.hero.ctaExplore,
      secondaryCtaText: t.hero.ctaFinance,
      featuredVehicleId: 'bm-24156930',
      featuredCarName: '2018 Honda Accord Sedan Sport',
      featuredPrice: '$19,995',
      featuredMonthly: '$295/mo',
      featuredSpecs: [
        { label: lang === 'es' ? 'MOTOR' : 'ENGINE', value: '1.5T I-4 DOHC Turbo' },
        { label: lang === 'es' ? 'TRANSMISIÓN' : 'TRANSMISSION', value: 'CVT w/ Sport Mode' },
        { label: lang === 'es' ? 'MILLAJE' : 'MILEAGE', value: '80,804 Miles' },
        { label: lang === 'es' ? 'AHORRO IMPUESTOS' : 'TAX SAVING', value: '$1,300 (0% DE Tax)' }
      ],
      bgImage: 'https://imagescdn.dealercarsearch.com/Media/7194/24156930/639213915277816957.jpg',
      soundType: 'twin-turbo',
      soundLabel: lang === 'es' ? 'Honda 1.5T Turbo' : 'Honda 1.5T Turbo Engine'
    },
    {
      id: 'slide-trucks',
      badge: t.hero.badge2,
      badgeType: 'truck',
      titleLine1: t.hero.title2Line1,
      titleLine2: t.hero.title2Line2,
      subtitle: t.hero.subtitle2,
      ctaText: t.hero.ctaTrucks,
      secondaryCtaText: t.hero.ctaTrade,
      featuredVehicleId: 'bm-24280000',
      featuredCarName: '2013 Ford F-150 4WD SuperCrew',
      featuredPrice: '$15,995',
      featuredMonthly: '$236/mo',
      featuredSpecs: [
        { label: lang === 'es' ? 'MOTOR' : 'ENGINE', value: '5.0L V8 Flex Fuel' },
        { label: lang === 'es' ? 'TRACCIÓN' : 'DRIVETRAIN', value: '4WD SuperCrew' },
        { label: lang === 'es' ? 'ESTADO' : 'STATUS', value: 'Clean CARFAX 1-Owner' },
        { label: lang === 'es' ? 'AHORRO IMPUESTOS' : 'TAX SAVING', value: '$1,040 (0% DE Tax)' }
      ],
      bgImage: 'https://imagescdn.dealercarsearch.com/Media/7194/24280000/639245163404732411.jpg',
      soundType: 'v12-roar',
      soundLabel: lang === 'es' ? 'Ford 5.0L V8 Sonido' : 'Ford 5.0L V8 Engine Note'
    },
    {
      id: 'slide-service',
      badge: t.hero.badge3,
      badgeType: 'service',
      titleLine1: t.hero.title3Line1,
      titleLine2: t.hero.title3Line2,
      subtitle: t.hero.subtitle3,
      ctaText: t.hero.ctaService,
      secondaryCtaText: t.hero.ctaPrivileges,
      featuredCarName: lang === 'es' ? 'Taller Privado Certificado ASE' : 'Private ASE Diagnostic Workshop',
      featuredPrice: lang === 'es' ? 'Tarifas Preferenciales' : 'Preferred Rates',
      featuredMonthly: lang === 'es' ? 'Inspección 150 Puntos' : '150-Point Certificate',
      featuredSpecs: [
        { label: lang === 'es' ? 'UBICACIÓN' : 'LOCATION', value: '154 S Dupont Hwy' },
        { label: lang === 'es' ? 'MAESTRÍA' : 'MASTERY', value: 'ASE Certified Techs' },
        { label: lang === 'es' ? 'DIAGNÓSTICO' : 'DIAGNOSTICS', value: 'Factory Multi-Protocol' },
        { label: lang === 'es' ? 'ESTÁNDARES' : 'STANDARDS', value: '150-Point Inspection' }
      ],
      bgImage: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1920&q=85',
      soundType: 'v16-thunder',
      soundLabel: lang === 'es' ? 'Estándar Diagnóstico' : 'Workshop Diagnostic Standards'
    }
  ], [lang, t]);

  const currentSlide = slides[currentSlideIndex] || slides[0];
  const slideDuration = 6500;
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Carousel autoplay timer and progress bar
  useEffect(() => {
    if (!isPlaying) return;

    setProgress(0);
    const stepTime = 50;
    const increment = (stepTime / slideDuration) * 100;

    progressIntervalRef.current = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) return 100;
        return prev + increment;
      });
    }, stepTime);

    timerRef.current = setTimeout(() => {
      setCurrentSlideIndex((prev) => (prev + 1) % slides.length);
    }, slideDuration);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
    };
  }, [currentSlideIndex, isPlaying, slides.length]);

  const handleNextSlide = () => {
    playHudClick();
    setCurrentSlideIndex((prev) => (prev + 1) % slides.length);
    setProgress(0);
  };

  const handlePrevSlide = () => {
    playHudClick();
    setCurrentSlideIndex((prev) => (prev - 1 + slides.length) % slides.length);
    setProgress(0);
  };

  const handleSelectSlide = (index: number) => {
    playHudClick();
    setCurrentSlideIndex(index);
    setProgress(0);
  };

  const handleRevEngine = () => {
    playEngineRev(currentSlide.soundType);
  };

  const handleQuickSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    playHudClick();
    onQuickSearch(selectedMake, selectedBodyStyle, selectedMaxPrice);
  };

  return (
    <section id="hero" className="relative min-h-[90vh] flex flex-col justify-between pt-8 sm:pt-12 pb-12 overflow-hidden">
      {/* Background Image Carousel with Smooth Fade */}
      <div className="absolute inset-0 z-0">
        {slides.map((slide, idx) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              idx === currentSlideIndex ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
            }`}
            style={{
              transition: 'opacity 1s ease-in-out, transform 8s ease-out',
            }}
          >
            <img
              src={slide.bgImage}
              alt={slide.titleLine1}
              loading={idx === 0 ? 'eager' : 'lazy'}
              fetchPriority={idx === 0 ? 'high' : 'auto'}
              className="w-full h-full object-cover object-center filter brightness-[0.40] contrast-[1.12]"
            />
          </div>
        ))}

        {/* Multi-layer luxury dark scrim gradients */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#08080a] via-[#08080a]/60 to-[#08080a]/80" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#08080a] via-[#08080a]/70 to-transparent" />
        <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-[#08080a] to-transparent" />
      </div>

      {/* Main Content Area */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full pt-8 sm:pt-14 my-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Left Column: Headline and Badges */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Delaware Tax Advantage Badge */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-amber-400/10 border border-amber-400/30 backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
              <span className="text-[11px] font-sans font-semibold tracking-wider text-amber-300 uppercase">
                {currentSlide.badge}
              </span>
            </div>

            {/* Display Headings */}
            <div className="space-y-1">
              <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl xl:text-7xl font-black tracking-tight text-white uppercase leading-[1.08] drop-shadow-2xl">
                {currentSlide.titleLine1} <br />
                {currentSlide.titleLine2}
              </h1>
            </div>

            {/* Subtitle */}
            <p className="text-neutral-300 text-sm sm:text-base md:text-lg font-light tracking-wide max-w-xl leading-relaxed">
              {currentSlide.subtitle}
            </p>

            {/* CTAs and Sound Preview */}
            <div className="pt-2 flex flex-wrap items-center gap-3.5">
              <button
                id="hero-explore-inventory-btn"
                onClick={() => { playHudClick(); onExploreVault(); }}
                className="px-6 sm:px-8 py-3.5 rounded-xl bg-[#D4AF37] hover:bg-[#c5a030] text-black font-bold text-xs sm:text-sm tracking-wider uppercase active:scale-95 transition-all shadow-xl shadow-[#D4AF37]/25 flex items-center gap-2.5 cursor-pointer"
              >
                <span>{currentSlide.ctaText}</span>
                <ArrowRight className="w-4 h-4 stroke-[2.5]" />
              </button>

              <button
                id="hero-finance-cta-btn"
                onClick={() => { playTactileChime(); onOpenBespoke(); }}
                className="px-6 py-3.5 rounded-xl bg-neutral-900/90 hover:bg-neutral-800 text-white font-medium text-xs sm:text-sm tracking-wider uppercase border border-white/20 hover:border-amber-400/60 transition-all backdrop-blur-md flex items-center gap-2 cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>{currentSlide.secondaryCtaText}</span>
              </button>

              {/* Engine Sound Preview Button */}
              <button
                onClick={handleRevEngine}
                title={lang === 'es' ? 'Escuchar nota de motor' : 'Acoustic engine note preview'}
                aria-label={lang === 'es' ? 'Escuchar nota de motor' : 'Acoustic engine note preview'}
                className="px-4 py-3.5 rounded-xl bg-black/60 hover:bg-black/90 border border-white/15 hover:border-amber-400/50 text-neutral-300 hover:text-amber-300 text-xs font-sans tracking-wide flex items-center gap-2 transition-all cursor-pointer"
              >
                <Volume2 className="w-4 h-4 text-amber-400" />
                <span className="hidden sm:inline">{currentSlide.soundLabel}</span>
              </button>
            </div>
          </div>

          {/* Right Column: Live Showcase Interactive Holographic Glass Card */}
          <div className="lg:col-span-5">
            <div className="relative p-6 sm:p-7 rounded-3xl glass-obsidian border border-white/15 shadow-2xl overflow-hidden backdrop-blur-xl group hover:border-amber-400/40 transition-all duration-500">
              
              {/* Card Ambient Glow Accent */}
              <div className="absolute -top-24 -right-24 w-48 h-48 bg-amber-400/15 rounded-full blur-3xl pointer-events-none" />

              {/* Status Pill Header */}
              <div className="flex items-center justify-between text-xs font-sans border-b border-white/10 pb-4">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-amber-400" />
                  <span className="text-neutral-400 font-medium tracking-wide">{t.hero.featuredSelection}</span>
                </div>
                <span className="text-amber-300 font-semibold tracking-wide">{t.hero.certified150Point}</span>
              </div>

              {/* Featured Vehicle Name and Price */}
              <div className="mt-4 flex items-start justify-between gap-4">
                <div>
                  <h2 className="font-serif text-lg sm:text-xl font-bold text-white tracking-wide">
                    {currentSlide.featuredCarName}
                  </h2>
                  <div className="text-xs text-neutral-400 font-sans mt-1 flex items-center gap-2">
                    <span>Delaware Certified</span>
                    <span>•</span>
                    <span className="text-amber-300">Clean CARFAX</span>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <div className="text-xl sm:text-2xl font-bold font-sans text-amber-300">
                    {currentSlide.featuredPrice}
                  </div>
                  <div className="text-xs text-neutral-400 font-sans">
                    Est. {currentSlide.featuredMonthly}
                  </div>
                </div>
              </div>

              {/* Specs Grid */}
              {currentSlide.featuredSpecs && (
                <div className="mt-5 grid grid-cols-2 gap-2.5 font-sans text-xs">
                  {currentSlide.featuredSpecs.map((spec, sIdx) => (
                    <div key={sIdx} className="p-2.5 rounded-xl bg-white/[0.03] border border-white/5">
                      <div className="text-[10px] text-neutral-500 uppercase tracking-wider font-medium">{spec.label}</div>
                      <div className="text-xs sm:text-sm font-semibold text-white mt-0.5">{spec.value}</div>
                    </div>
                  ))}
                </div>
              )}

              {/* Action Button for Featured Vehicle */}
              {currentSlide.featuredVehicleId ? (
                <button
                  onClick={() => {
                    playHudClick();
                    if (currentSlide.featuredVehicleId) {
                      onSelectVehicleById(currentSlide.featuredVehicleId);
                    }
                  }}
                  className="mt-5 w-full py-2.5 rounded-xl bg-white/10 hover:bg-[#d4af37] hover:text-black text-white font-sans text-xs tracking-wider uppercase border border-white/10 transition-all font-semibold cursor-pointer flex items-center justify-center gap-2"
                >
                  <span>{t.hero.viewSpecsGallery}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              ) : (
                <a
                  href="#services"
                  onClick={() => playHudClick()}
                  className="mt-5 w-full py-2.5 rounded-xl bg-white/10 hover:bg-[#d4af37] hover:text-black text-white font-sans text-xs tracking-wider uppercase border border-white/10 transition-all font-semibold cursor-pointer flex items-center justify-center gap-2 text-center"
                >
                  <span>{lang === 'es' ? 'EXPLORAR PRIVILEGIOS DE TALLER' : 'EXPLORE SERVICE PRIVILEGES'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              )}

              {/* Delaware 0% Tax Assurance Banner inside Card */}
              <div className="mt-4 p-2.5 rounded-xl bg-amber-950/20 border border-amber-500/20 flex items-center gap-2.5 text-xs text-amber-200/90">
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                <span>{t.hero.taxAssuranceBanner}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Inventory Finder Bar */}
        <div className="mt-8 p-4 rounded-2xl glass-obsidian border border-white/10 shadow-xl">
          <form onSubmit={handleQuickSearchSubmit} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 items-center">
            
            {/* Make Selector */}
            <div>
              <label htmlFor="hero-select-make" className="block text-[11px] font-sans uppercase tracking-wider text-neutral-400 mb-1">{t.hero.makeLabel}</label>
              <select
                id="hero-select-make"
                value={selectedMake}
                onChange={(e) => setSelectedMake(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-neutral-900 border border-white/15 text-xs font-sans text-white focus:outline-none focus:border-amber-400 cursor-pointer"
              >
                <option value="All">{t.hero.allMakes}</option>
                <option value="Honda">Honda (Accord, Civic, CR-V)</option>
                <option value="Ford">Ford (F-150, Explorer, Flex, Escape)</option>
                <option value="Chevrolet">Chevrolet (Silverado, Malibu)</option>
                <option value="RAM">RAM (1500, 2500)</option>
                <option value="GMC">GMC (Sierra, Canyon, Terrain)</option>
                <option value="Jeep">Jeep (Wrangler, Grand Cherokee)</option>
                <option value="Dodge">Dodge (Grand Caravan, Journey)</option>
                <option value="Cadillac">Cadillac (ATS)</option>
                <option value="Lexus">Lexus (IS, NX)</option>
                <option value="Chrysler">Chrysler (Pacifica)</option>
                <option value="Kia">Kia (Sportage, Sedona)</option>
                <option value="Nissan">Nissan (Murano, Pathfinder)</option>
                <option value="BMW">BMW (4 Series)</option>
                <option value="Mercedes-Benz">Mercedes-Benz (CLA-Class)</option>
                <option value="Infiniti">Infiniti (QX50)</option>
              </select>
            </div>

            {/* Body Style Selector */}
            <div>
              <label htmlFor="hero-select-bodystyle" className="block text-[11px] font-sans uppercase tracking-wider text-neutral-400 mb-1">{t.hero.bodyStyleLabel}</label>
              <select
                id="hero-select-bodystyle"
                value={selectedBodyStyle}
                onChange={(e) => setSelectedBodyStyle(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-neutral-900 border border-white/15 text-xs font-sans text-white focus:outline-none focus:border-amber-400 cursor-pointer"
              >
                <option value="All">{t.hero.allBodyStyles}</option>
                <option value="Sedan">{t.hero.luxurySedans}</option>
                <option value="SUV">{t.hero.premiumSuvs}</option>
                <option value="Truck">{t.hero.trucks}</option>
                <option value="Coupe">{t.hero.sportsCoupe}</option>
              </select>
            </div>

            {/* Max Price Selector */}
            <div>
              <label htmlFor="hero-select-price" className="block text-[11px] font-sans uppercase tracking-wider text-neutral-400 mb-1">{t.hero.budgetLabel}</label>
              <select
                id="hero-select-price"
                value={selectedMaxPrice}
                onChange={(e) => setSelectedMaxPrice(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-neutral-900 border border-white/15 text-xs font-sans text-white focus:outline-none focus:border-amber-400 cursor-pointer"
              >
                <option value="All">{t.hero.anyPrice}</option>
                <option value="18000">{lang === 'es' ? 'Menos de $18,000' : 'Under $18,000'}</option>
                <option value="25000">{lang === 'es' ? 'Menos de $25,000' : 'Under $25,000'}</option>
                <option value="35000">{lang === 'es' ? 'Menos de $35,000' : 'Under $35,000'}</option>
              </select>
            </div>

            {/* Submit Button */}
            <div className="flex items-end">
              <button
                type="submit"
                id="hero-quick-search-submit"
                className="w-full py-2.5 rounded-xl bg-[#D4AF37] hover:bg-[#c5a030] text-black font-sans text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-[#D4AF37]/25 active:scale-[0.98]"
              >
                <Search className="w-4 h-4" />
                <span>{t.hero.searchInventory}</span>
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Slider Controls & Progress Bar */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 w-full flex items-center justify-between pt-4 border-t border-white/10 gap-2">
        
        {/* Slide Indicators with Progress Fill */}
        <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
          {slides.map((slide, idx) => (
            <button
              key={slide.id}
              onClick={() => handleSelectSlide(idx)}
              aria-label={`Slide ${idx + 1}: ${slide.titleLine1} ${slide.titleLine2}`}
              className="group flex flex-col gap-1 cursor-pointer text-left"
            >
              <div className="w-8 sm:w-28 h-1.5 bg-white/10 rounded-full overflow-hidden">
                <div
                  className="h-full bg-amber-400 transition-all duration-75"
                  style={{
                    width: idx === currentSlideIndex ? `${progress}%` : idx < currentSlideIndex ? '100%' : '0%'
                  }}
                />
              </div>
              <span className={`text-[11px] font-sans tracking-wider uppercase hidden sm:inline transition-colors ${
                idx === currentSlideIndex ? 'text-amber-300 font-semibold' : 'text-neutral-500 group-hover:text-neutral-300'
              }`}>
                0{idx + 1} {idx === 0 ? t.hero.slide1Luxury : idx === 1 ? t.hero.slide2Trucks : t.hero.slide3Service}
              </span>
            </button>
          ))}
        </div>

        {/* Carousel Navigation Arrows & Play/Pause */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            title={isPlaying ? 'Pause carousel' : 'Resume carousel'}
            aria-label={isPlaying ? 'Pause hero carousel' : 'Resume hero carousel'}
            className="p-2 rounded-xl bg-white/5 hover:bg-white/15 text-neutral-400 hover:text-white transition-colors cursor-pointer"
          >
            {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
          </button>

          <button
            onClick={handlePrevSlide}
            title={lang === 'es' ? 'Colección anterior' : 'Previous collection'}
            aria-label={lang === 'es' ? 'Colección anterior' : 'Previous slide'}
            className="p-2 rounded-xl bg-white/5 hover:bg-white/15 text-neutral-300 hover:text-white transition-colors cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <button
            onClick={handleNextSlide}
            title={lang === 'es' ? 'Siguiente colección' : 'Next collection'}
            aria-label={lang === 'es' ? 'Siguiente colección' : 'Next slide'}
            className="p-2 rounded-xl bg-white/5 hover:bg-white/15 text-neutral-300 hover:text-white transition-colors cursor-pointer"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
