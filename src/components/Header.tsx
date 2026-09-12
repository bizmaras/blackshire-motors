import React, { useState, useEffect, useRef } from 'react';
import { 
  Volume2, 
  VolumeX, 
  Sparkles, 
  Menu, 
  X, 
  Scale, 
  Phone, 
  CheckCircle2, 
  Type, 
  Check, 
  SlidersHorizontal, 
  Sun, 
  Moon, 
  Globe 
} from 'lucide-react';
import { toggleMute, getMuteStatus, playHudClick, playTactileChime } from '../utils/audio';
import { DEALERSHIP_INFO } from '../data/dealershipData';
import { BlackshireLogo } from './BlackshireLogo';
import { useLanguage } from '../context/LanguageContext';

export type FontPresetId = 'modern' | 'heritage' | 'montserrat' | 'outfit';

interface FontPreset {
  id: FontPresetId;
  name: string;
  fontFamily: string;
  description: string;
}

export const FONT_PRESETS: FontPreset[] = [
  {
    id: 'modern',
    name: 'Modern Executive',
    fontFamily: 'Plus Jakarta Sans',
    description: 'Sleek, balanced, modern luxury automotive',
  },
  {
    id: 'heritage',
    name: 'Heritage Elegance',
    fontFamily: 'Playfair Display',
    description: 'Timeless luxury editorial serif',
  },
  {
    id: 'montserrat',
    name: 'Grand Tourer',
    fontFamily: 'Montserrat',
    description: 'Bold architectural geometric luxury',
  },
  {
    id: 'outfit',
    name: 'Avant-Garde Studio',
    fontFamily: 'Outfit',
    description: 'Clean Scandinavian automotive minimalism',
  },
];

interface HeaderProps {
  currency: 'USD' | 'EUR' | 'BTC';
  setCurrency: (currency: 'USD' | 'EUR' | 'BTC') => void;
  comparedCount: number;
  onOpenCompare: () => void;
  onOpenBespoke: () => void;
  onOpenAudit: () => void;
  onScrollToInventory: () => void;
  theme?: 'light' | 'dark';
  onToggleTheme?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  comparedCount,
  onOpenCompare,
  onOpenBespoke,
  onOpenAudit,
  onScrollToInventory,
  theme = 'light',
  onToggleTheme,
}) => {
  const { lang, setLang, t } = useLanguage();
  const [muted, setMuted] = useState(getMuteStatus());
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [optionsMenuOpen, setOptionsMenuOpen] = useState(false);
  const [activeFontPreset, setActiveFontPreset] = useState<FontPresetId>('modern');
  const optionsDropdownRef = useRef<HTMLDivElement>(null);

  // Initialize and persist font preset
  useEffect(() => {
    const saved = localStorage.getItem('blackshire_font_preset') as FontPresetId | null;
    const initialPreset = saved && FONT_PRESETS.some(p => p.id === saved) ? saved : 'modern';
    setActiveFontPreset(initialPreset);
    document.documentElement.setAttribute('data-font-preset', initialPreset);
  }, []);

  const handleSelectFontPreset = (presetId: FontPresetId) => {
    playTactileChime();
    setActiveFontPreset(presetId);
    document.documentElement.setAttribute('data-font-preset', presetId);
    localStorage.setItem('blackshire_font_preset', presetId);
  };

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (optionsDropdownRef.current && !optionsDropdownRef.current.contains(event.target as Node)) {
        setOptionsMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Subtle scroll listener
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleMuteToggle = () => {
    const next = toggleMute();
    setMuted(next);
    if (!next) {
      playTactileChime();
    }
  };

  const navLinks = [
    { label: t.header.inventory, href: '#inventory', onClick: onScrollToInventory },
    { label: t.header.taxBenefit, href: '#tax-advantage' },
    { label: t.header.financing, href: '#financing' },
    { label: t.header.services, href: '#services' },
    { label: t.header.aboutUs, href: '#team' },
    { label: t.header.contact, href: '#contact' },
  ];

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string, customClick?: () => void) => {
    playHudClick();
    if (customClick) {
      e.preventDefault();
      customClick();
      return;
    }
    if (href.startsWith('#')) {
      e.preventDefault();
      const targetId = href.slice(1);
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        const headerEl = document.getElementById('main-header');
        const headerHeight = headerEl ? headerEl.getBoundingClientRect().height : 100;
        const elementPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
        const offsetPosition = elementPosition - headerHeight - 24;
        window.scrollTo({
          top: Math.max(0, offsetPosition),
          behavior: 'smooth'
        });
        window.history.pushState(null, '', href);
      }
    }
  };

  return (
    <header
      id="main-header"
      className={`sticky top-0 z-40 w-full transition-all duration-300 ${
        scrolled
          ? 'bg-[#08080c]/98 backdrop-blur-2xl border-b border-amber-500/25 py-3 sm:py-4 shadow-2xl shadow-black/90'
          : 'bg-gradient-to-b from-[#08080c] via-[#08080c]/95 to-[#0b0b12]/90 backdrop-blur-xl border-b border-white/10 py-5 sm:py-6 md:py-7 lg:py-8 shadow-xl shadow-black/60'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between min-h-[72px] sm:min-h-[84px] md:min-h-[100px]">
        {/* Brand Logo with Official Stallion Crest - Expanded & Calibrated for Dark Header */}
        <a
          href="#"
          onClick={() => playHudClick()}
          className="group flex items-center select-none shrink-0 py-1"
          aria-label="Blackshire Motors Home"
        >
          <BlackshireLogo size="xl" variant="horizontal" color="gold" />
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => scrollToSection(e, link.href, link.onClick)}
              className="relative text-xs tracking-wider uppercase font-semibold text-neutral-300 hover:text-amber-300 transition-colors py-1 group cursor-pointer"
            >
              {link.label}
              <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-gradient-to-r from-amber-400 to-amber-200 transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </nav>

        {/* Action Controls */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          {/* Vehicle Comparison Button (active indicator) */}
          {comparedCount > 0 && (
            <button
              id="compare-toggle-btn"
              onClick={() => { playHudClick(); onOpenCompare(); }}
              className="p-2 sm:px-3 sm:py-2 rounded-xl bg-amber-400/15 border border-amber-400/40 text-amber-300 hover:bg-amber-400/25 transition-all flex items-center gap-1.5 cursor-pointer shadow-md shadow-amber-500/10"
              title={t.header.compareVehicles}
            >
              <Scale className="w-4 h-4" />
              <span className="text-xs font-semibold">{comparedCount}</span>
            </button>
          )}

          {/* Language Switcher (EN / ES) */}
          <div 
            id="header-language-switcher"
            className="flex items-center rounded-xl p-1 border border-neutral-200 dark:border-white/10 bg-white/90 dark:bg-neutral-900/80 shadow-sm"
          >
            <Globe className="w-3.5 h-3.5 mx-1 text-neutral-400 dark:text-neutral-500 hidden sm:inline" />
            <button
              id="lang-btn-en"
              onClick={() => { playHudClick(); setLang('en'); }}
              className={`px-2 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                lang === 'en'
                  ? 'bg-[#D4AF37] text-black shadow-xs font-black'
                  : 'text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white'
              }`}
              title="Switch to English"
            >
              EN
            </button>
            <button
              id="lang-btn-es"
              onClick={() => { playHudClick(); setLang('es'); }}
              className={`px-2 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                lang === 'es'
                  ? 'bg-[#D4AF37] text-black shadow-xs font-black'
                  : 'text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white'
              }`}
              title="Cambiar a Español"
            >
              ES
            </button>
          </div>

          {/* Theme Toggle Button (Light/Dark Luxury) */}
          {onToggleTheme && (
            <button
              id="theme-toggle-btn"
              onClick={() => { playHudClick(); onToggleTheme(); }}
              title={theme === 'light' ? (lang === 'es' ? 'Cambiar a Modo Oscuro' : 'Switch to Dark Mode') : (lang === 'es' ? 'Cambiar a Modo Claro' : 'Switch to Light Mode')}
              className={`p-2 sm:px-3 sm:py-2 rounded-xl transition-all flex items-center gap-1.5 cursor-pointer text-xs font-semibold shadow-sm border ${
                theme === 'light'
                  ? 'bg-neutral-100 hover:bg-neutral-200 border-neutral-300 text-neutral-800'
                  : 'bg-neutral-900/80 hover:bg-neutral-800 border-white/10 text-neutral-200'
              }`}
            >
              {theme === 'light' ? (
                <>
                  <Sun className="w-4 h-4 text-amber-500" />
                  <span className="hidden md:inline text-[11px] font-medium tracking-wide">
                    {t.header.lightMode}
                  </span>
                </>
              ) : (
                <>
                  <Moon className="w-4 h-4 text-amber-400" />
                  <span className="hidden md:inline text-[11px] font-medium tracking-wide">
                    {t.header.darkMode}
                  </span>
                </>
              )}
            </button>
          )}

          {/* Sleek Primary Pre-Approval CTA */}
          <button
            id="header-finance-btn"
            onClick={() => { playTactileChime(); onOpenBespoke(); }}
            className="hidden sm:flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#D4AF37] hover:bg-[#c5a030] text-black font-semibold text-xs tracking-wider uppercase active:scale-95 transition-all shadow-md shadow-[#D4AF37]/20 cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 text-black" />
            <span>{t.header.preApproval}</span>
          </button>

          {/* Showroom Preferences Dropdown */}
          <div className="relative" ref={optionsDropdownRef}>
            <button
              id="options-toggle-btn"
              onClick={() => { playHudClick(); setOptionsMenuOpen(!optionsMenuOpen); }}
              title={t.header.showroomPreferences}
              className="p-2 sm:p-2.5 rounded-xl bg-neutral-900/80 border border-white/10 hover:border-amber-400/40 text-neutral-300 hover:text-white transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <SlidersHorizontal className="w-4 h-4 text-amber-400" />
            </button>

            {optionsMenuOpen && (
              <div className="absolute right-0 mt-2 w-72 rounded-2xl bg-[#0e0e14]/98 border border-white/15 p-3.5 shadow-2xl backdrop-blur-2xl z-50 animate-in fade-in zoom-in-95 duration-150 space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-white/10 text-[10px] font-sans uppercase tracking-widest text-neutral-400 font-semibold">
                  <span>{t.header.showroomPreferences}</span>
                  <span className="text-amber-400">Settings</span>
                </div>

                {/* Language Switch */}
                <div>
                  <div className="text-[11px] font-medium text-neutral-300 mb-1.5 flex items-center gap-1.5">
                    <Globe className="w-3.5 h-3.5 text-amber-400" />
                    <span>{t.header.changeLanguage}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-1.5">
                    <button
                      onClick={() => { playHudClick(); setLang('en'); }}
                      className={`p-2 rounded-xl text-left text-xs transition-all cursor-pointer flex items-center justify-between ${
                        lang === 'en'
                          ? 'bg-amber-400/20 border border-amber-400/50 text-white font-semibold'
                          : 'bg-white/5 border border-transparent text-neutral-400 hover:text-white hover:bg-white/10'
                      }`}
                    >
                      <span>English</span>
                      {lang === 'en' && <Check className="w-3.5 h-3.5 text-amber-400" />}
                    </button>
                    <button
                      onClick={() => { playHudClick(); setLang('es'); }}
                      className={`p-2 rounded-xl text-left text-xs transition-all cursor-pointer flex items-center justify-between ${
                        lang === 'es'
                          ? 'bg-amber-400/20 border border-amber-400/50 text-white font-semibold'
                          : 'bg-white/5 border border-transparent text-neutral-400 hover:text-white hover:bg-white/10'
                      }`}
                    >
                      <span>Español</span>
                      {lang === 'es' && <Check className="w-3.5 h-3.5 text-amber-400" />}
                    </button>
                  </div>
                </div>

                {/* Typography Selector */}
                <div>
                  <div className="text-[11px] font-medium text-neutral-300 mb-1.5 flex items-center gap-1.5">
                    <Type className="w-3.5 h-3.5 text-amber-400" />
                    <span>{t.header.typography}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-1.5">
                    {FONT_PRESETS.map((preset) => (
                      <button
                        key={preset.id}
                        onClick={() => handleSelectFontPreset(preset.id)}
                        className={`p-2 rounded-xl text-left text-xs transition-all cursor-pointer ${
                          activeFontPreset === preset.id
                            ? 'bg-amber-400/20 border border-amber-400/50 text-white font-semibold'
                            : 'bg-white/5 border border-transparent text-neutral-400 hover:text-white hover:bg-white/10'
                        }`}
                      >
                        <div className="truncate">{preset.name.split(' ')[0]}</div>
                        <div className="text-[9px] text-neutral-400 opacity-80 truncate">{preset.fontFamily}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Sound Toggle */}
                <div className="pt-2 border-t border-white/10 flex items-center justify-between">
                  <div className="text-[11px] font-medium text-neutral-300 flex items-center gap-1.5">
                    {muted ? <VolumeX className="w-3.5 h-3.5 text-neutral-500" /> : <Volume2 className="w-3.5 h-3.5 text-amber-400" />}
                    <span>{t.header.acousticAudio}</span>
                  </div>
                  <button
                    onClick={handleMuteToggle}
                    className={`px-3 py-1 rounded-lg text-xs font-medium cursor-pointer transition-all ${
                      muted ? 'bg-white/5 text-neutral-400 hover:text-white' : 'bg-amber-400/20 text-amber-300 border border-amber-400/30'
                    }`}
                  >
                    {muted ? t.header.soundMuted : t.header.soundActive}
                  </button>
                </div>

                {/* Standards & Audit Action */}
                <div className="pt-1 border-t border-white/10">
                  <button
                    onClick={() => { setOptionsMenuOpen(false); onOpenAudit(); }}
                    className="w-full py-2 px-3 rounded-xl bg-amber-400/10 hover:bg-amber-400/20 text-amber-300 border border-amber-400/30 text-xs font-medium flex items-center justify-between cursor-pointer transition-all"
                  >
                    <span className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" />
                      <span>{t.header.standardsAudit}</span>
                    </span>
                    <span className="text-[10px] text-amber-400 font-bold">100% PASS</span>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button
            id="mobile-menu-btn"
            onClick={() => { playHudClick(); setMobileMenuOpen(!mobileMenuOpen); }}
            className="lg:hidden p-2 rounded-xl bg-neutral-900/80 border border-white/10 text-neutral-300 hover:text-white cursor-pointer"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden mt-3 px-6 py-5 bg-[#0a0a10]/98 backdrop-blur-2xl border-b border-white/10 animate-in fade-in slide-in-from-top-3 duration-200">
          <div className="flex flex-col gap-3 font-sans text-xs">
            <div className="pb-3 border-b border-white/10 text-neutral-300 flex items-center justify-between">
              <a
                href={`tel:${DEALERSHIP_INFO.phones.telPrimary}`}
                className="flex items-center gap-2 text-white font-semibold text-sm"
              >
                <Phone className="w-4 h-4 text-amber-400" />
                <span>(302) 276-2427</span>
              </a>
              <span className="text-[11px] text-amber-300 bg-amber-400/10 px-2.5 py-0.5 rounded-full border border-amber-400/20 font-medium">
                {t.header.salesTaxBadge}
              </span>
            </div>

            {/* Mobile Language Switcher */}
            <div className="flex items-center justify-between py-2 border-b border-white/5">
              <span className="text-neutral-300 flex items-center gap-2">
                <Globe className="w-4 h-4 text-amber-400" />
                <span>{t.header.changeLanguage}</span>
              </span>
              <div className="flex gap-1">
                <button
                  onClick={() => { playHudClick(); setLang('en'); }}
                  className={`px-3 py-1 rounded-lg font-bold text-xs cursor-pointer ${
                    lang === 'en' ? 'bg-[#D4AF37] text-black' : 'bg-white/5 text-neutral-400'
                  }`}
                >
                  English
                </button>
                <button
                  onClick={() => { playHudClick(); setLang('es'); }}
                  className={`px-3 py-1 rounded-lg font-bold text-xs cursor-pointer ${
                    lang === 'es' ? 'bg-[#D4AF37] text-black' : 'bg-white/5 text-neutral-400'
                  }`}
                >
                  Español
                </button>
              </div>
            </div>

            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => {
                  setMobileMenuOpen(false);
                  scrollToSection(e, link.href, link.onClick);
                }}
                className="py-2.5 text-neutral-200 hover:text-amber-300 uppercase tracking-wider flex items-center justify-between border-b border-white/5 text-xs font-medium cursor-pointer"
              >
                <span>{link.label}</span>
                <span className="text-amber-400/60 text-xs">→</span>
              </a>
            ))}

            <button
              onClick={() => { playTactileChime(); setMobileMenuOpen(false); onOpenBespoke(); }}
              className="mt-2 w-full py-3 rounded-xl bg-[#D4AF37] hover:bg-[#c5a030] text-black font-semibold text-xs tracking-wider uppercase flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-[#D4AF37]/20"
            >
              <Sparkles className="w-4 h-4" />
              {t.header.preApproval.toUpperCase()}
            </button>

            {onToggleTheme && (
              <button
                onClick={() => { playHudClick(); onToggleTheme(); }}
                className="w-full py-2.5 px-3 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between text-xs cursor-pointer"
              >
                <span className="flex items-center gap-2 text-neutral-300">
                  {theme === 'light' ? <Sun className="w-4 h-4 text-amber-500" /> : <Moon className="w-4 h-4 text-amber-400" />}
                  <span>{t.header.viewMode}</span>
                </span>
                <span className="font-semibold text-amber-400">
                  {theme === 'light' ? t.header.whiteTheme : t.header.darkTheme}
                </span>
              </button>
            )}

            <div className="pt-2 flex items-center justify-between text-[11px] text-neutral-400">
              <button
                onClick={() => { setMobileMenuOpen(false); onOpenAudit(); }}
                className="text-amber-300 hover:underline flex items-center gap-1.5 cursor-pointer"
              >
                <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" />
                <span>{t.header.standardsAudit}</span>
              </button>

              <button
                onClick={handleMuteToggle}
                className="text-neutral-400 hover:text-white flex items-center gap-1 cursor-pointer"
              >
                {muted ? <VolumeX className="w-3.5 h-3.5 text-neutral-500" /> : <Volume2 className="w-3.5 h-3.5 text-amber-400" />}
                <span>{muted ? t.header.soundMuted : t.header.soundActive}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
