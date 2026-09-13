import React, { useState } from 'react';
import { VEHICLES_DATA } from './data/vehicles';
import { Vehicle } from './types';
import { LanguageProvider, useLanguage } from './context/LanguageContext';

// Components
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { VaultSection } from './components/VaultSection';
import { TaxAdvantageSection } from './components/TaxAdvantageSection';
import { FinanceCalculator } from './components/FinanceCalculator';
import { ValuationCalculator } from './components/ValuationCalculator';
import { ServicesSection } from './components/ServicesSection';
import { DealershipTeam } from './components/DealershipTeam';
import { CustomerReviewsSection } from './components/CustomerReviewsSection';
import { AeoFaqSection } from './components/AeoFaqSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';

// Drawers & Modals (Lazy Loaded for Fast Initial Page Load)
const VehicleModal = React.lazy(() => import('./components/VehicleModal').then(m => ({ default: m.VehicleModal })));
const BespokeStudio = React.lazy(() => import('./components/BespokeStudio').then(m => ({ default: m.BespokeStudio })));
const CompareDrawer = React.lazy(() => import('./components/CompareDrawer').then(m => ({ default: m.CompareDrawer })));
const AuditDrawer = React.lazy(() => import('./components/AuditDrawer').then(m => ({ default: m.AuditDrawer })));
const MakeOfferModal = React.lazy(() => import('./components/MakeOfferModal').then(m => ({ default: m.MakeOfferModal })));

import { Phone, MessageSquare, Percent, ShieldCheck } from 'lucide-react';
import { playHudClick, playTactileChime } from './utils/audio';

function AppContent() {
  const { lang, t } = useLanguage();

  // App-wide state
  const [currency, setCurrency] = useState<'USD' | 'EUR' | 'BTC'>('USD');
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
  const [offerVehicle, setOfferVehicle] = useState<Vehicle | null>(null);
  const [comparedVehicles, setComparedVehicles] = useState<Vehicle[]>([]);
  const [isCompareOpen, setIsCompareOpen] = useState(false);
  const [isBespokeOpen, setIsBespokeOpen] = useState(false);
  const [isAuditOpen, setIsAuditOpen] = useState(false);

  // Active filters passed from Hero quick search to Vault
  const [heroFilterMake, setHeroFilterMake] = useState('All');
  const [heroFilterBody, setHeroFilterBody] = useState('All');
  const [heroFilterMaxPrice, setHeroFilterMaxPrice] = useState('All');

  // Handle Quick Search from Hero
  const handleHeroSearch = (make: string, bodyStyle: string, maxPrice: string) => {
    setHeroFilterMake(make);
    setHeroFilterBody(bodyStyle);
    setHeroFilterMaxPrice(maxPrice);
    const el = document.getElementById('inventory');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleResetFilters = () => {
    setHeroFilterMake('All');
    setHeroFilterBody('All');
    setHeroFilterMaxPrice('All');
  };

  // Compare Toggle Handler
  const handleToggleCompare = (vehicle: Vehicle) => {
    setComparedVehicles((prev) => {
      const exists = prev.some((v) => v.id === vehicle.id);
      if (exists) {
        return prev.filter((v) => v.id !== vehicle.id);
      }
      if (prev.length >= 3) {
        return [prev[1], prev[2], vehicle];
      }
      return [...prev, vehicle];
    });
  };

  const handleRemoveCompare = (vehicleId: string) => {
    setComparedVehicles((prev) => prev.filter((v) => v.id !== vehicleId));
  };

  const handleClearCompare = () => {
    setComparedVehicles([]);
  };

  return (
    <div className="min-h-screen bg-[#070709] text-neutral-100 flex flex-col selection:bg-amber-400 selection:text-black font-sans relative w-full max-w-full overflow-x-clip">
      
      {/* Top Delaware 0% Tax Notice Bar */}
      <div className="bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 text-black py-1.5 px-3 sm:px-4 text-center text-[11px] sm:text-xs font-sans font-bold tracking-wide flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 shadow-sm relative z-50">
        <Percent className="w-3.5 h-3.5 fill-black stroke-amber-500 shrink-0" />
        <span>
          {lang === 'es'
            ? '¡REFUGIO FISCAL DE DELAWARE: 0.0% DE IMPUESTO SOBRE VENTAS EN TODOS LOS VEHÍCULOS! AHORRA HASTA $3,500 FRENTE A PA, NJ Y MD.'
            : 'DELAWARE 0.0% SALES TAX HAVEN: PAY ZERO SALES TAX ON ANY CAR! SAVE UP TO $3,500+ VS. PA, NJ & MD.'}
        </span>
        <a
          href="#tax-advantage"
          onClick={(e) => {
            playHudClick();
            e.preventDefault();
            const targetElement = document.getElementById('tax-advantage');
            if (targetElement) {
              const headerEl = document.getElementById('main-header');
              const headerHeight = headerEl ? headerEl.getBoundingClientRect().height : 100;
              const elementPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
              window.scrollTo({
                top: Math.max(0, elementPosition - headerHeight - 24),
                behavior: 'smooth'
              });
              window.history.pushState(null, '', '#tax-advantage');
            }
          }}
          className="underline ml-1 hover:text-white transition-colors cursor-pointer whitespace-nowrap"
        >
          {lang === 'es' ? 'Ver Detalles →' : 'Learn More →'}
        </a>
      </div>

      {/* Primary Sticky Header */}
      <Header
        comparedCount={comparedVehicles.length}
        onOpenCompare={() => setIsCompareOpen(true)}
        onOpenBespoke={() => setIsBespokeOpen(true)}
        currency={currency}
        onCurrencyChange={setCurrency}
      />

      {/* Main Content Sections */}
      <main className="flex-1 w-full max-w-full overflow-x-clip">
        {/* Cinematic Hero */}
        <Hero
          onExploreVault={() => {
            const el = document.getElementById('inventory');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
          onOpenBespoke={() => setIsBespokeOpen(true)}
          onSelectVehicleById={(vehicleId) => {
            const v = VEHICLES_DATA.find((x) => x.id === vehicleId);
            if (v) setSelectedVehicle(v);
          }}
          onQuickSearch={handleHeroSearch}
        />

        {/* Certified Inventory Showcase */}
        <VaultSection
          vehicles={VEHICLES_DATA}
          currency={currency}
          comparedVehicles={comparedVehicles}
          onToggleCompare={handleToggleCompare}
          onSelectVehicle={(vehicle) => setSelectedVehicle(vehicle)}
          onConfigureSpec={(vehicle) => {
            setSelectedVehicle(vehicle);
            setIsBespokeOpen(true);
          }}
          onMakeOffer={(vehicle) => setOfferVehicle(vehicle)}
          filterMake={heroFilterMake}
          filterBodyStyle={heroFilterBody}
          filterMaxPrice={heroFilterMaxPrice}
          onResetFilters={handleResetFilters}
        />

        {/* Delaware 0% Sales Tax Savings Comparison */}
        <TaxAdvantageSection
          onOpenInventory={() => {
            const el = document.getElementById('inventory');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
        />

        {/* Bespoke Auto Financing Calculator */}
        <FinanceCalculator currency={currency} />

        {/* Instant Trade-In Valuation Calculator */}
        <ValuationCalculator currency={currency} />

        {/* ASE Certified Repair Atelier & 150-Point Center */}
        <ServicesSection />

        {/* Staff Leadership & Concierge */}
        <DealershipTeam />

        {/* Verified Customer Reviews */}
        <CustomerReviewsSection />

        {/* Delaware & Dealership AEO FAQ */}
        <AeoFaqSection />

        {/* Physical Showroom & Contact Lead Desk */}
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer onOpenAudit={() => setIsAuditOpen(true)} />

      {/* Floating Action Buttons for Mobile / Quick Contact */}
      <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end gap-2.5">
        {/* Compare Floating Badge */}
        {comparedVehicles.length > 0 && (
          <button
            onClick={() => { playHudClick(); setIsCompareOpen(true); }}
            className="px-4 py-2.5 rounded-full bg-[#D4AF37] text-black font-bold text-xs font-sans tracking-wide uppercase shadow-2xl flex items-center gap-2 hover:scale-105 active:scale-95 transition-all cursor-pointer border border-amber-300"
          >
            <span>{lang === 'es' ? 'Comparar' : 'Compare'}</span>
            <span className="w-5 h-5 rounded-full bg-black text-amber-300 text-[11px] flex items-center justify-center font-bold">
              {comparedVehicles.length}
            </span>
          </button>
        )}

        {/* Direct Call Floating Trigger */}
        <a
          href="tel:3022762427"
          onClick={() => playTactileChime()}
          className="px-4 py-2.5 rounded-full bg-black/90 hover:bg-black text-amber-300 border border-amber-400/50 text-xs font-sans font-semibold tracking-wider uppercase shadow-xl flex items-center gap-2 backdrop-blur-md transition-transform hover:scale-105 active:scale-95"
        >
          <Phone className="w-4 h-4 text-amber-400" />
          <span>(302) 276-2427</span>
        </a>
      </div>

      {/* Modals & Drawers with Suspense */}
      <React.Suspense fallback={null}>
        {/* Vehicle Dossier Details Modal */}
        {selectedVehicle && (
          <VehicleModal
            vehicle={selectedVehicle}
            currency={currency}
            onClose={() => setSelectedVehicle(null)}
            onOpenBespoke={(v) => {
              setSelectedVehicle(v);
              setIsBespokeOpen(true);
            }}
            onBookTestDrive={(v) => {
              setSelectedVehicle(v);
            }}
            onMakeOffer={(v) => {
              setOfferVehicle(v);
            }}
          />
        )}

        {/* Make an Offer Modal */}
        {offerVehicle && (
          <MakeOfferModal
            vehicle={offerVehicle}
            currency={currency}
            onClose={() => setOfferVehicle(null)}
          />
        )}

        {/* Bespoke Financing & Loan Application Studio */}
        {isBespokeOpen && (
          <BespokeStudio
            isOpen={isBespokeOpen}
            onClose={() => setIsBespokeOpen(false)}
            vehicles={VEHICLES_DATA}
            selectedVehicle={selectedVehicle}
            currency={currency}
          />
        )}

        {/* Side-by-Side Comparison Drawer */}
        {isCompareOpen && (
          <CompareDrawer
            isOpen={isCompareOpen}
            onClose={() => setIsCompareOpen(false)}
            vehicles={comparedVehicles}
            onRemoveVehicle={handleRemoveCompare}
            onClearAll={handleClearCompare}
            onSelectVehicle={(v) => {
              setIsCompareOpen(false);
              setSelectedVehicle(v);
            }}
            currency={currency}
          />
        )}

        {/* 150-Point Lot Certification Audit Details */}
        {isAuditOpen && (
          <AuditDrawer
            isOpen={isAuditOpen}
            onClose={() => setIsAuditOpen(false)}
          />
        )}
      </React.Suspense>
    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
}
