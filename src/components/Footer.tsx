import React from 'react';
import { DEALERSHIP_INFO } from '../data/dealershipData';
import { BlackshireLogo } from './BlackshireLogo';
import { MapPin, Phone, Mail, ArrowUp, ShieldCheck, Facebook, Twitter, Youtube } from 'lucide-react';
import { playHudClick } from '../utils/audio';
import { useLanguage } from '../context/LanguageContext';

export const Footer: React.FC<{ onOpenAudit: () => void }> = ({ onOpenAudit }) => {
  const { lang } = useLanguage();

  const scrollToTop = () => {
    playHudClick();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#040406] border-t border-white/10 pt-16 pb-12 relative overflow-hidden font-sans">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Main 4-Column Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-white/10">
          
          {/* Col 1: Brand, Delaware Statement & Social */}
          <div className="lg:col-span-2 space-y-4">
            <BlackshireLogo size="lg" variant="horizontal" color="gold" />
            <p className="text-xs text-neutral-400 font-light leading-relaxed max-w-sm mt-3">
              {lang === 'es'
                ? 'Concesionario de vehículos usados selectos y taller mecánico en New Castle, Delaware. Su refugio con 0% de impuesto estatal sobre ventas con certificación de 150 puntos y financiamiento ágil.'
                : 'Premier pre-owned luxury car dealership and full-service mechanical repair facility located at 154 S Dupont Hwy, New Castle, DE. Delaware 0% sales tax haven with certified 150-point inspection.'}
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                onClick={() => { playHudClick(); onOpenAudit(); }}
                className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-amber-400 text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>{lang === 'es' ? 'Certificación 150 Puntos' : '150-Point Certified Standard'}</span>
              </button>

              {/* Social Channels */}
              <div className="flex items-center gap-2">
                <a
                  href={DEALERSHIP_INFO.social.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="p-2 rounded-xl bg-white/5 hover:bg-amber-400/20 hover:text-amber-300 text-neutral-400 border border-white/10 transition-colors"
                >
                  <Facebook className="w-4 h-4" />
                </a>
                <a
                  href={DEALERSHIP_INFO.social.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Twitter / X"
                  className="p-2 rounded-xl bg-white/5 hover:bg-amber-400/20 hover:text-amber-300 text-neutral-400 border border-white/10 transition-colors"
                >
                  <Twitter className="w-4 h-4" />
                </a>
                <a
                  href={DEALERSHIP_INFO.social.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="YouTube"
                  className="p-2 rounded-xl bg-white/5 hover:bg-amber-400/20 hover:text-amber-300 text-neutral-400 border border-white/10 transition-colors"
                >
                  <Youtube className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase tracking-widest text-neutral-300 font-semibold">
              {lang === 'es' ? 'NAVEGACIÓN' : 'INVENTORY & LOT'}
            </h4>
            <ul className="space-y-2 text-xs text-neutral-400 font-light">
              <li>
                <a href="#inventory" className="hover:text-amber-300 transition-colors">
                  {lang === 'es' ? 'Todo el Inventario' : 'All Certified Inventory'}
                </a>
              </li>
              <li>
                <a href="#tax-advantage" className="hover:text-amber-300 transition-colors">
                  {lang === 'es' ? '0% Impuesto de Delaware' : '0% Delaware Tax Haven'}
                </a>
              </li>
              <li>
                <a href="#financing" className="hover:text-amber-300 transition-colors">
                  {lang === 'es' ? 'Calculadora de Financiamiento' : 'Bespoke Auto Financing'}
                </a>
              </li>
              <li>
                <a href="#trade" className="hover:text-amber-300 transition-colors">
                  {lang === 'es' ? 'Tasación de Trade-In' : 'Instant Trade-In Valuation'}
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-amber-300 transition-colors">
                  {lang === 'es' ? 'Taller Mecánico ASE' : 'ASE Service & Repair'}
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Hours & Dealership Schedule */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase tracking-widest text-neutral-300 font-semibold">
              {lang === 'es' ? 'HORARIOS DE ATENCIÓN' : 'SHOWROOM HOURS'}
            </h4>
            <div className="space-y-2 text-xs text-neutral-400 font-light">
              <div>
                <span className="text-neutral-300 block font-medium">Mon – Sat:</span>
                <span>{DEALERSHIP_INFO.hours.weekday}</span>
              </div>
              <div>
                <span className="text-neutral-300 block font-medium">Sunday:</span>
                <span>{DEALERSHIP_INFO.hours.sunday}</span>
              </div>
              <div className="pt-1 text-[11px] text-amber-300">
                {lang === 'es' ? 'Atención en Inglés y Español' : 'Bilingual Concierge on Site'}
              </div>
            </div>
          </div>

          {/* Col 4: Location & Phone */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase tracking-widest text-neutral-300 font-semibold">
              {lang === 'es' ? 'UBICACIÓN & CONTACTO' : 'LOCATION & CONTACT'}
            </h4>
            <div className="space-y-2 text-xs text-neutral-400 font-light">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>
                  {DEALERSHIP_INFO.street}<br />
                  {DEALERSHIP_INFO.city}, {DEALERSHIP_INFO.state} {DEALERSHIP_INFO.zip}
                </span>
              </div>

              <div className="flex items-center gap-2 pt-1">
                <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                <a href={`tel:${DEALERSHIP_INFO.phones.telPrimary}`} className="text-white hover:text-amber-300">
                  {DEALERSHIP_INFO.phones.primary}
                </a>
              </div>

              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-amber-400 shrink-0" />
                <span className="text-neutral-300 font-mono text-[11px]">{DEALERSHIP_INFO.email}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Strip */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-400 font-light">
          <div>
            © {new Date().getFullYear()} Blackshire Motors LLC. All Rights Reserved. 154 S Dupont Hwy, New Castle, DE 19720.
          </div>

          <div className="flex items-center gap-4">
            <span className="text-neutral-400">Delaware Dealer License Verified</span>
            <button
              onClick={scrollToTop}
              className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-neutral-300 hover:text-white border border-white/10 transition-colors cursor-pointer flex items-center gap-1 text-xs"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
