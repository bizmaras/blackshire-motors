import React, { useState } from 'react';
import { Vehicle } from '../types';
import { formatPrice, formatNumber } from '../utils/formatters';
import { 
  X, 
  Volume2, 
  Check, 
  Phone, 
  Sparkles, 
  CheckCircle2, 
  ChevronLeft, 
  ChevronRight,
  MapPin,
  Tag
} from 'lucide-react';
import { playHudClick, playEngineRev, playTactileChime } from '../utils/audio';
import { DEALERSHIP_INFO } from '../data/dealershipData';
import { useLanguage } from '../context/LanguageContext';

interface VehicleModalProps {
  vehicle: Vehicle | null;
  currency: 'USD' | 'EUR' | 'BTC';
  onClose: () => void;
  onOpenBespoke: (vehicle: Vehicle) => void;
  onBookTestDrive: (vehicle: Vehicle) => void;
  onMakeOffer?: (vehicle: Vehicle) => void;
}

export const VehicleModal: React.FC<VehicleModalProps> = ({
  vehicle,
  currency,
  onClose,
  onOpenBespoke,
  onBookTestDrive,
  onMakeOffer,
}) => {
  if (!vehicle) return null;

  const { lang } = useLanguage();
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [activeTab, setActiveTab] = useState<'overview' | 'inspection' | 'carfax' | 'inquire'>('overview');
  
  // Lead form states
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [preferredDay, setPreferredDay] = useState('Tomorrow');
  const [leadSuccess, setLeadSuccess] = useState(false);
  const [honeypot, setHoneypot] = useState('');

  const currentImage = vehicle.gallery[activeImageIndex] || vehicle.heroImage;

  const handleRevAudio = () => {
    playEngineRev(vehicle.soundType);
  };

  const handleNextPhoto = () => {
    playHudClick();
    setActiveImageIndex((prev) => (prev + 1) % vehicle.gallery.length);
  };

  const handlePrevPhoto = () => {
    playHudClick();
    setActiveImageIndex((prev) => (prev - 1 + vehicle.gallery.length) % vehicle.gallery.length);
  };

  const handleSubmitLead = (e: React.FormEvent) => {
    e.preventDefault();
    if (honeypot) return;
    playTactileChime();
    setLeadSuccess(true);
  };

  return (
    <div id="vehicle-modal" className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-xl overflow-y-auto">
      <div className="relative w-full max-w-5xl my-auto rounded-3xl glass-obsidian border border-white/15 shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
        
        {/* Modal Top Bar */}
        <div className="p-4 sm:p-5 border-b border-white/10 flex items-center justify-between bg-black/50">
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-[10px] font-sans px-3 py-1 rounded-full bg-amber-400/15 text-amber-300 border border-amber-400/30 font-semibold tracking-wider uppercase">
              {vehicle.badge}
            </span>
            <span className="text-xs font-sans text-neutral-400 hidden sm:inline">
              VIN: <strong className="text-neutral-200 font-mono">{vehicle.vinCode}</strong>
            </span>
            <span className="text-xs font-sans text-neutral-400 hidden sm:inline">
              STOCK #{vehicle.stockNumber}
            </span>
          </div>

          <button
            onClick={() => { playHudClick(); onClose(); }}
            className="p-2 rounded-xl bg-white/5 hover:bg-white/15 text-neutral-300 hover:text-white transition-colors cursor-pointer"
            aria-label="Close vehicle details"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body Container */}
        <div className="p-5 sm:p-8 space-y-6 max-h-[82vh] overflow-y-auto">
          
          {/* Top Gallery Slider */}
          <div className="space-y-3">
            <div className="relative aspect-[16/9] rounded-2xl overflow-hidden border border-white/10 bg-neutral-950">
              <img
                src={currentImage}
                alt={`${vehicle.name} photo ${activeImageIndex + 1} at Blackshire Motors New Castle DE`}
                referrerPolicy="no-referrer"
                onError={(e) => {
                  const target = e.currentTarget as HTMLImageElement;
                  const fallback = 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80';
                  if (target.src !== fallback) {
                    target.src = fallback;
                  }
                }}
                className="w-full h-full object-cover object-center"
              />

              {/* Prev / Next photo arrows */}
              {vehicle.gallery.length > 1 && (
                <>
                  <button
                    onClick={handlePrevPhoto}
                    className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/60 hover:bg-black/90 text-white border border-white/20 transition-all cursor-pointer"
                    aria-label="Previous photo"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={handleNextPhoto}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/60 hover:bg-black/90 text-white border border-white/20 transition-all cursor-pointer"
                    aria-label="Next photo"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </>
              )}

              {/* Acoustic Sound preview button */}
              <button
                onClick={handleRevAudio}
                className="absolute bottom-4 right-4 z-10 px-4 py-2 rounded-full bg-black/80 border border-amber-400/50 hover:border-amber-400 text-neutral-200 hover:text-white text-xs font-sans tracking-wide flex items-center gap-2 backdrop-blur-md transition-all cursor-pointer"
              >
                <Volume2 className="w-4 h-4 text-amber-400" />
                <span>ACOUSTIC SOUND ({vehicle.engine.split(' ')[0]})</span>
              </button>

              {/* Photo counter */}
              <div className="absolute top-4 left-4 z-10 px-3 py-1 rounded-full bg-black/70 border border-white/15 text-[11px] font-sans text-white backdrop-blur-sm">
                Photo {activeImageIndex + 1} of {vehicle.gallery.length}
              </div>
            </div>

            {/* Thumbnail selector */}
            {vehicle.gallery.length > 1 && (
              <div className="flex items-center gap-2.5 overflow-x-auto pb-1">
                {vehicle.gallery.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => { playHudClick(); setActiveImageIndex(idx); }}
                    className={`relative w-20 sm:w-24 h-14 sm:h-16 rounded-xl overflow-hidden border-2 shrink-0 transition-all cursor-pointer ${
                      activeImageIndex === idx ? 'border-amber-400 scale-105' : 'border-white/10 opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={img}
                      alt={`Thumbnail ${idx + 1}`}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Vehicle Name, Tagline & Pricing */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-5 border-b border-white/10">
            <div>
              <div className="text-xs font-sans uppercase tracking-widest text-amber-400 font-semibold">
                {vehicle.year} • {vehicle.make} • {vehicle.category}
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-white tracking-wide mt-1">
                {vehicle.name}
              </h2>
              <p className="text-neutral-300 text-sm mt-2 max-w-2xl leading-relaxed font-light">
                {vehicle.description}
              </p>
            </div>

            <div className="text-left md:text-right shrink-0 flex flex-col items-start md:items-end gap-1.5">
              <span className="text-[10px] font-sans text-neutral-400 uppercase tracking-wider block font-semibold">
                DELAWARE OUT-THE-DOOR PRICE
              </span>
              <span className="text-3xl font-bold font-sans text-amber-300">
                {formatPrice(vehicle.price, currency)}
              </span>
              <div className="text-xs font-sans text-amber-300 mt-0.5 flex items-center md:justify-end gap-1.5 font-medium">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>0% DE Tax • Save ${formatNumber(vehicle.taxSavingsEstimate)} vs PA/NJ/MD</span>
              </div>
              {onMakeOffer && (
                <button
                  onClick={() => {
                    playTactileChime();
                    onClose();
                    onMakeOffer(vehicle);
                  }}
                  data-action="make-offer"
                  title={`Make an offer on ${vehicle.year} ${vehicle.name}`}
                  className="mt-1 px-3.5 py-1.5 rounded-lg bg-amber-400/15 hover:bg-amber-400 hover:text-black text-amber-300 border border-amber-400/30 text-xs font-bold font-sans tracking-wide uppercase flex items-center gap-1.5 transition-all cursor-pointer shadow-sm"
                >
                  <Tag className="w-3.5 h-3.5" />
                  <span>{lang === 'es' ? 'Hacer una Oferta' : 'Make an Offer'}</span>
                </button>
              )}
            </div>
          </div>

          {/* Modal Section Tabs */}
          <div className="flex items-center gap-2 border-b border-white/10 pb-2 overflow-x-auto">
            {[
              { id: 'overview', label: lang === 'es' ? 'Especificaciones' : 'Specifications' },
              { id: 'inspection', label: lang === 'es' ? 'Certificación 150 Puntos' : '150-Point Certification' },
              { id: 'carfax', label: lang === 'es' ? 'Historial CARFAX' : 'CARFAX Dossier' },
              { id: 'inquire', label: lang === 'es' ? 'Cita con Asesor' : 'Concierge Appointment' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => { playHudClick(); setActiveTab(tab.id as any); }}
                className={`px-4 py-2 rounded-xl text-xs font-sans uppercase tracking-wider transition-all cursor-pointer whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'bg-[#D4AF37] hover:bg-[#c5a030] text-black font-bold shadow-md shadow-[#D4AF37]/20'
                    : 'bg-white/5 text-neutral-300 hover:text-white hover:bg-white/10 font-medium'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* TAB 1: Specs & Overview */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Core Specifications Table */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-sans text-xs">
                <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/5">
                  <div className="text-[10px] text-neutral-500 uppercase tracking-wider font-medium">{lang === 'es' ? 'MILLAJE' : 'MILEAGE'}</div>
                  <div className="font-semibold text-white text-sm mt-0.5">{vehicle.formattedMileage}</div>
                </div>

                <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/5">
                  <div className="text-[10px] text-neutral-500 uppercase tracking-wider font-medium">{lang === 'es' ? 'MOTOR' : 'ENGINE'}</div>
                  <div className="font-semibold text-white text-sm mt-0.5 truncate">{vehicle.engine}</div>
                </div>

                <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/5">
                  <div className="text-[10px] text-neutral-500 uppercase tracking-wider font-medium">{lang === 'es' ? 'TRANSMISIÓN' : 'TRANSMISSION'}</div>
                  <div className="font-semibold text-white text-sm mt-0.5 truncate">{vehicle.transmission}</div>
                </div>

                <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/5">
                  <div className="text-[10px] text-neutral-500 uppercase tracking-wider font-medium">{lang === 'es' ? 'TRACCIÓN' : 'DRIVETRAIN'}</div>
                  <div className="font-semibold text-white text-sm mt-0.5">{vehicle.drivetrain}</div>
                </div>

                <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/5">
                  <div className="text-[10px] text-neutral-500 uppercase tracking-wider font-medium">{lang === 'es' ? 'COLOR EXTERIOR' : 'EXTERIOR COLOR'}</div>
                  <div className="font-semibold text-white text-sm mt-0.5 truncate">{vehicle.exteriorColor}</div>
                </div>

                <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/5">
                  <div className="text-[10px] text-neutral-500 uppercase tracking-wider font-medium">{lang === 'es' ? 'COLOR INTERIOR' : 'INTERIOR COLOR'}</div>
                  <div className="font-semibold text-white text-sm mt-0.5 truncate">{vehicle.interiorColor}</div>
                </div>

                <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/5">
                  <div className="text-[10px] text-neutral-500 uppercase tracking-wider font-medium">{lang === 'es' ? 'CONSUMO COMBUSTIBLE' : 'FUEL ECONOMY'}</div>
                  <div className="font-semibold text-white text-sm mt-0.5">{vehicle.fuelEconomy}</div>
                </div>

                <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/5">
                  <div className="text-[10px] text-neutral-500 uppercase tracking-wider font-medium">{lang === 'es' ? 'MSRP ORIGINAL' : 'ORIGINAL MSRP'}</div>
                  <div className="font-semibold text-neutral-400 text-sm mt-0.5">
                    {vehicle.originalMSRP ? `$${formatNumber(vehicle.originalMSRP)}` : 'N/A'}
                  </div>
                </div>
              </div>

              {/* Key Features Bullet List */}
              <div>
                <h3 className="text-xs font-sans uppercase tracking-wider text-neutral-400 mb-3 flex items-center gap-2 font-semibold">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  {lang === 'es' ? 'EQUIPAMIENTO DESTACADO DEL VEHÍCULO' : 'KEY VEHICLE HIGHLIGHTS & EQUIPMENT'}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {vehicle.keyFeatures.map((feat, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-xl bg-white/[0.02] border border-white/5 flex items-start gap-2.5 text-xs text-neutral-200"
                    >
                      <Check className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: 150-Point Certified Inspection */}
          {activeTab === 'inspection' && (
            <div className="space-y-4">
              <div className="p-5 rounded-2xl bg-amber-500/10 border border-amber-400/30 flex items-center justify-between">
                <div>
                  <h4 className="font-serif font-bold text-white text-base">
                    Blackshire 150-Point Mechanical & Safety Certification
                  </h4>
                  <p className="text-xs text-neutral-300 mt-0.5 font-light">
                    Conducted by our ASE certified master technicians at our 154 S Dupont Hwy facility.
                  </p>
                </div>
                <div className="text-right font-sans">
                  <div className="text-2xl font-bold text-amber-300">150 / 150</div>
                  <div className="text-[10px] text-neutral-400 uppercase tracking-widest font-semibold">POINTS VERIFIED</div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs font-sans">
                {[
                  { section: 'Powertrain & Engine Compression', check: 'Oil pressure, cooling system, belts, spark plugs, and computer codes verified clean.' },
                  { section: 'Transmission & Drivetrain', check: 'Fluid condition, smooth gear shifting under load, AWD/4x4 transfer case engagement tested.' },
                  { section: 'Braking System & ABS Sensors', check: 'Brake pads measured > 6mm, rotors inspected, lines bled, parking brake adjusted.' },
                  { section: 'Steering, Suspension & Alignment', check: 'Tie rods, ball joints, control arms, shocks, and 4-wheel alignment verified.' },
                  { section: 'Tires & Wheel Assemblies', check: 'Tread depth measured > 5/32", wheels balanced, TPMS tire pressure sensors matched.' },
                  { section: 'Electrical & Delaware State Compliance', check: 'Headlights, wipers, horn, battery health, alternator output, and emissions verified.' },
                ].map((item, i) => (
                  <div key={i} className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5 flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <div>
                      <div className="font-semibold text-white">{item.section}</div>
                      <div className="text-neutral-400 mt-0.5 text-[11px] font-light leading-relaxed">{item.check}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: CARFAX Report */}
          {activeTab === 'carfax' && (
            <div className="space-y-4">
              <div className="p-5 rounded-2xl bg-neutral-900 border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3.5">
                  <div className="w-11 h-11 rounded-xl bg-amber-400/20 text-amber-300 flex items-center justify-center font-bold font-sans text-sm">
                    CF
                  </div>
                  <div>
                    <h4 className="font-serif font-bold text-white text-base">
                      CARFAX Vehicle History Dossier
                    </h4>
                    <p className="text-xs text-neutral-400 font-light">
                      Clean title authenticated, no salvage/flood history, certified odometer veracity.
                    </p>
                  </div>
                </div>

                <div className="px-3.5 py-1.5 rounded-full bg-amber-950/70 border border-amber-500/40 text-amber-200 text-xs font-sans font-semibold tracking-wide">
                  CARFAX BUYBACK GUARANTEE INCLUDED
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-sans text-xs">
                <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/5">
                  <div className="text-[10px] text-neutral-500 uppercase tracking-wider font-medium">OWNERSHIP</div>
                  <div className="font-semibold text-white text-base mt-0.5">
                    {vehicle.carfax.oneOwner ? '1 Owner Only' : '2 Owners'}
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/5">
                  <div className="text-[10px] text-neutral-500 uppercase tracking-wider font-medium">ACCIDENT RECORD</div>
                  <div className="font-semibold text-amber-300 text-base mt-0.5">
                    {vehicle.carfax.noAccidents ? 'No Accidents' : 'Minor Record'}
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/5">
                  <div className="text-[10px] text-neutral-500 uppercase tracking-wider font-medium">SERVICE RECORDS</div>
                  <div className="font-semibold text-white text-base mt-0.5">
                    {vehicle.carfax.serviceRecordsCount} Records
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/5">
                  <div className="text-[10px] text-neutral-500 uppercase tracking-wider font-medium">TITLE STATUS</div>
                  <div className="font-semibold text-amber-300 text-base mt-0.5">
                    Clean & Clear
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: Concierge Test Drive Booking */}
          {activeTab === 'inquire' && (
            <div className="p-6 rounded-2xl bg-neutral-900/80 border border-white/10 space-y-4">
              {leadSuccess ? (
                <div className="p-6 rounded-2xl bg-amber-950/40 border border-amber-500/50 text-amber-200 text-sm font-sans text-center space-y-2">
                  <CheckCircle2 className="w-8 h-8 text-amber-400 mx-auto" />
                  <h4 className="font-serif text-lg font-bold text-white">
                    Private Concierge Appointment Reserved
                  </h4>
                  <p className="text-neutral-300 text-xs max-w-md mx-auto font-light leading-relaxed">
                    Thank you {fullName}. The team at Blackshire Motors (154 S Dupont Hwy, New Castle) has prepared the {vehicle.name} for your inspection. We will contact you at {phone} to confirm.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmitLead} className="space-y-4 font-sans">
                  <input
                    type="text"
                    value={honeypot}
                    onChange={(e) => setHoneypot(e.target.value)}
                    className="hidden"
                    tabIndex={-1}
                    autoComplete="off"
                  />

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-sans text-neutral-400 uppercase tracking-wider mb-1 font-medium">Full Name</label>
                      <input
                        type="text"
                        required
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="e.g. Michael Taylor"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs font-sans text-white focus:outline-none focus:border-amber-400 transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-sans text-neutral-400 uppercase tracking-wider mb-1 font-medium">Phone Number</label>
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="(302) 555-0199"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs font-sans text-white focus:outline-none focus:border-amber-400 transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-sans text-neutral-400 uppercase tracking-wider mb-1 font-medium">Email Address</label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@domain.com"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs font-sans text-white focus:outline-none focus:border-amber-400 transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-sans text-neutral-400 uppercase tracking-wider mb-1 font-medium">Preferred Schedule</label>
                      <select
                        value={preferredDay}
                        onChange={(e) => setPreferredDay(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-900 border border-white/10 text-xs font-sans text-white focus:outline-none focus:border-amber-400 cursor-pointer"
                      >
                        <option value="Today">Today (During Business Hours)</option>
                        <option value="Tomorrow">Tomorrow</option>
                        <option value="This Saturday">This Saturday</option>
                        <option value="Next Week">Next Week</option>
                      </select>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-xl bg-[#D4AF37] hover:bg-[#c5a030] text-black font-bold text-xs font-sans tracking-wider uppercase active:scale-95 transition-all shadow-lg shadow-[#D4AF37]/20 cursor-pointer"
                  >
                    CONFIRM CONCIERGE TEST DRIVE
                  </button>
                </form>
              )}
            </div>
          )}

          {/* Action Bar Footer */}
          <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-xs font-sans text-neutral-400">
              <MapPin className="w-4 h-4 text-amber-400" />
              <span>154 S Dupont Hwy, New Castle, DE 19720</span>
            </div>

            <div className="flex flex-wrap sm:flex-nowrap items-center gap-2.5 w-full sm:w-auto">
              <a
                href={`tel:${DEALERSHIP_INFO.phones.telPrimary}`}
                className="px-3.5 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white font-sans text-xs tracking-wider uppercase border border-white/15 flex items-center justify-center gap-1.5 font-medium"
              >
                <Phone className="w-3.5 h-3.5 text-amber-400" />
                <span>(302) 276-2427</span>
              </a>

              {onMakeOffer && (
                <button
                  onClick={() => {
                    playTactileChime();
                    onClose();
                    onMakeOffer(vehicle);
                  }}
                  className="flex-1 sm:flex-initial px-4 py-2.5 rounded-xl bg-amber-400/15 hover:bg-amber-400 hover:text-black text-amber-300 border border-amber-400/40 hover:border-amber-400 font-bold font-sans text-xs tracking-wider uppercase cursor-pointer flex items-center justify-center gap-1.5 transition-all active:scale-95 shadow-sm"
                >
                  <Tag className="w-3.5 h-3.5" />
                  <span>{lang === 'es' ? 'HACER OFERTA' : 'MAKE AN OFFER'}</span>
                </button>
              )}

              <button
                onClick={() => {
                  playTactileChime();
                  onClose();
                  onOpenBespoke(vehicle);
                }}
                className="flex-1 sm:flex-initial px-4 sm:px-5 py-2.5 rounded-xl bg-[#D4AF37] hover:bg-[#c5a030] text-black font-bold font-sans text-xs tracking-wider uppercase cursor-pointer flex items-center justify-center gap-1.5 shadow-md shadow-[#D4AF37]/20 active:scale-95 transition-all"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>{lang === 'es' ? 'FINANCIAMIENTO' : 'CALCULATE FINANCING'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VehicleModal;
