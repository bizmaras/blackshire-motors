import React from 'react';
import { X, CheckCircle2, ShieldCheck, MapPin, Phone } from 'lucide-react';
import { playHudClick } from '../utils/audio';
import { DEALERSHIP_INFO } from '../data/dealershipData';

interface AuditDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AuditDrawer: React.FC<AuditDrawerProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-xl overflow-y-auto">
      <div className="relative w-full max-w-4xl my-auto rounded-3xl glass-obsidian border border-white/15 shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="p-4 sm:p-6 border-b border-white/10 flex items-center justify-between bg-black/40">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-amber-400/15 border border-amber-400/30 text-amber-300">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif font-bold text-white text-lg tracking-wide uppercase">
                BLACKSHIRE 150-POINT LOT CERTIFICATION DOSSIER
              </h3>
              <p className="text-xs font-sans text-neutral-400 font-light">
                Rigorous mechanical audit standard for every vehicle sold at 154 S Dupont Hwy, New Castle, DE.
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

        {/* Body content */}
        <div className="p-6 sm:p-8 space-y-6 max-h-[75vh] overflow-y-auto font-sans text-xs">
          
          <div className="p-5 rounded-2xl bg-amber-950/20 border border-amber-500/30 flex items-center justify-between">
            <div>
              <h4 className="font-serif font-bold text-white text-base">
                Why Blackshire Certified Pre-Owned Stands Apart
              </h4>
              <p className="text-neutral-300 text-xs mt-1 font-light leading-relaxed">
                Unlike ordinary lots that simply wash vehicles, our ASE Master Technicians test compression, inspect high-voltage battery modules, scan electronic ECUs, and road-test every vehicle under realistic Delaware highway conditions.
              </p>
            </div>
            <div className="text-right shrink-0 font-sans hidden sm:block">
              <div className="text-2xl font-bold text-amber-300">100%</div>
              <div className="text-[10px] text-neutral-400 uppercase tracking-widest">ROAD READY</div>
            </div>
          </div>

          {/* Inspection Pillars */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              {
                category: 'Engine & Mechanical Powertrain (35 Points)',
                items: [
                  'Cylinder compression test across all combustion chambers',
                  'Turbocharger boost and wastegate actuator calibration',
                  'Timing belt / timing chain tensioner inspection',
                  'Radiator, water pump, and coolant pressure check',
                  'Alternator charging rate & starter cranking amperage',
                  'Exhaust manifold, catalytic converters & O2 sensors'
                ]
              },
              {
                category: 'Transmission & All-Wheel Drive (25 Points)',
                items: [
                  'Automatic / Dual-clutch gear engagement under load',
                  'AWD / 4x4 transfer case fluid clarity & actuator response',
                  'Front & rear differential gear lash inspection',
                  'CV boots, drive axles, and universal joints inspection',
                  'Transmission cooler line integrity & zero leaks'
                ]
              },
              {
                category: 'Chassis, Suspension & Hunter Alignment (30 Points)',
                items: [
                  'Hunter laser digital 4-wheel alignment verification',
                  'Front struts, coil springs, and rear multi-link bushings',
                  'Tie rods, drag links, and steering rack seal integrity',
                  'Sway bar links and control arm ball joints',
                  'Subframe torque specs & corrosion barrier check'
                ]
              },
              {
                category: 'Braking & Safety Electronics (30 Points)',
                items: [
                  'Brake rotor runout and thickness tolerance > manufacturer spec',
                  'Ceramic brake pad thickness measured (> 6mm guaranteed)',
                  'ABS pump, wheel speed sensors & traction control',
                  'Electronic parking brake caliper actuator test',
                  'Airbag deployment modules & pretensioner circuits'
                ]
              },
              {
                category: 'Tires & Road Contact (15 Points)',
                items: [
                  'Tread depth measured (> 5/32" uniform across all 4 tires)',
                  'Dynamic road-force wheel balancing',
                  'TPMS wireless pressure sensors programmed & verified',
                  'Spare tire inspection or inflator kit check'
                ]
              },
              {
                category: 'Delaware DMV Compliance & Comfort (15 Points)',
                items: [
                  'Delaware state emissions readiness drive cycle complete',
                  'Headlight alignment and LED matrix calibration',
                  'Dual-zone A/C refrigerant charge & cabin air filter',
                  'Windshield glass integrity & wiper system test'
                ]
              }
            ].map((pillar, idx) => (
              <div key={idx} className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 space-y-2.5">
                <h4 className="font-semibold text-white text-xs border-b border-white/5 pb-2 text-amber-300">
                  {pillar.category}
                </h4>
                <ul className="space-y-1.5">
                  {pillar.items.map((it, i) => (
                    <li key={i} className="flex items-start gap-2 text-neutral-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                      <span className="font-light">{it}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-neutral-400">
              <MapPin className="w-4 h-4 text-amber-400" />
              <span>Inspection Facility: 154 S Dupont Hwy, New Castle, DE 19720</span>
            </div>

            <a
              href={`tel:${DEALERSHIP_INFO.phones.telPrimary}`}
              className="px-4 py-2 rounded-xl bg-amber-400 text-black font-semibold uppercase tracking-wider flex items-center gap-2 text-xs hover:bg-amber-300 transition-colors"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Speak with Certified Tech</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuditDrawer;
