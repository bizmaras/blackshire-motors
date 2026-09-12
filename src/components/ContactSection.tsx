import React, { useState } from 'react';
import { DEALERSHIP_INFO } from '../data/dealershipData';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Navigation, 
  CheckCircle2, 
  Send 
} from 'lucide-react';
import { playTactileChime } from '../utils/audio';
import { useLanguage } from '../context/LanguageContext';

export const ContactSection: React.FC = () => {
  const { lang, t } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    subject: 'Schedule Private Test Drive',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [honeypot, setHoneypot] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (honeypot) return;
    playTactileChime();
    setSubmitted(true);
  };

  return (
    <section id="contact" className="scroll-mt-28 sm:scroll-mt-32 lg:scroll-mt-36 py-20 bg-[#060609] border-t border-white/5 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-300 text-xs font-sans tracking-widest uppercase mb-3 font-semibold">
            <MapPin className="w-3.5 h-3.5 text-amber-400" />
            {t.contact.showroomBadge}
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight uppercase">
            {t.contact.visitShowroom}
          </h2>
          <p className="mt-3 text-sm text-neutral-300 leading-relaxed font-light">
            {t.contact.locationDesc}
          </p>
        </div>

        {/* 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch font-sans">
          
          {/* Left Column: Dealership Address, Phone & Interactive Map */}
          <div className="lg:col-span-6 space-y-6 flex flex-col justify-between">
            
            {/* Quick Contact Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-5 rounded-2xl glass-card border border-white/10 space-y-2">
                <div className="flex items-center gap-2 text-amber-400 text-xs font-semibold uppercase tracking-wider">
                  <MapPin className="w-4 h-4" />
                  <span>{t.contact.showroomServiceCenter}</span>
                </div>
                <div className="text-sm font-semibold text-white">
                  {DEALERSHIP_INFO.street}
                </div>
                <div className="text-xs text-neutral-400 font-light">
                  {DEALERSHIP_INFO.city}, {DEALERSHIP_INFO.state} {DEALERSHIP_INFO.zip}
                </div>
                <div className="text-[11px] text-amber-300 pt-1 font-medium">
                  {t.contact.taxHavenNote}
                </div>
              </div>

              <div className="p-5 rounded-2xl glass-card border border-white/10 space-y-2">
                <div className="flex items-center gap-2 text-amber-400 text-xs font-semibold uppercase tracking-wider">
                  <Phone className="w-4 h-4" />
                  <span>{t.contact.directLines}</span>
                </div>
                <a
                  href={`tel:${DEALERSHIP_INFO.phones.telPrimary}`}
                  className="text-lg font-bold text-white hover:text-amber-300 block transition-colors"
                >
                  {DEALERSHIP_INFO.phones.primary}
                </a>
                <div className="text-xs text-neutral-400 font-light">
                  {DEALERSHIP_INFO.phones.secondary} (Sales)
                </div>
                <div className="text-[11px] text-amber-300 pt-1 font-medium">
                  {t.contact.directGuidance}
                </div>
              </div>

              <div className="p-5 rounded-2xl glass-card border border-white/10 space-y-2">
                <div className="flex items-center gap-2 text-amber-400 text-xs font-semibold uppercase tracking-wider">
                  <Clock className="w-4 h-4" />
                  <span>{t.contact.hoursOfOperation}</span>
                </div>
                <div className="text-xs text-neutral-200">
                  <strong className="text-white block font-medium">Mon – Sat:</strong>
                  <span>{DEALERSHIP_INFO.hours.weekday}</span>
                </div>
                <div className="text-xs text-neutral-400">
                  <strong className="text-neutral-300 block font-medium">Sunday:</strong>
                  <span>{DEALERSHIP_INFO.hours.sunday}</span>
                </div>
              </div>

              <div className="p-5 rounded-2xl glass-card border border-white/10 space-y-2">
                <div className="flex items-center gap-2 text-amber-400 text-xs font-semibold uppercase tracking-wider">
                  <Mail className="w-4 h-4" />
                  <span>Digital Concierge</span>
                </div>
                <div className="text-xs font-mono text-white truncate">
                  {DEALERSHIP_INFO.email}
                </div>
                <div className="text-[11px] text-neutral-400 pt-1">
                  Response within 60 minutes
                </div>
                <div className="text-[10px] text-amber-300/80">
                  {t.contact.outOfStateNote}
                </div>
              </div>
            </div>

            {/* Google Maps / Directions Embed Box */}
            <div className="rounded-2xl overflow-hidden border border-white/10 relative h-64 bg-neutral-900">
              <iframe
                title="Blackshire Motors Location 154 S Dupont Hwy New Castle DE"
                src="https://maps.google.com/maps?q=154%20S%20Dupont%20Hwy,%20New%20Castle,%20DE%2019720&t=&z=15&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg) brightness(95%) contrast(90%)' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
              <div className="absolute bottom-3 right-3">
                <a
                  href={`https://www.google.com/maps/dir/?api=1&destination=154+S+Dupont+Hwy+New+Castle+DE+19720`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-2 rounded-xl bg-black/90 hover:bg-black text-amber-300 border border-amber-400/40 text-xs font-sans font-semibold uppercase tracking-wider flex items-center gap-1.5 shadow-lg backdrop-blur-md transition-all"
                >
                  <Navigation className="w-3.5 h-3.5" />
                  <span>{t.contact.openGoogleMaps}</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Lead Form */}
          <div className="lg:col-span-6 p-6 sm:p-8 rounded-3xl glass-obsidian border border-white/10 shadow-2xl flex flex-col justify-between">
            {submitted ? (
              <div className="my-auto p-8 rounded-2xl bg-amber-950/40 border border-amber-500/40 text-center space-y-4">
                <CheckCircle2 className="w-12 h-12 text-amber-400 mx-auto" />
                <h3 className="font-serif text-2xl font-bold text-white">
                  {t.contact.thankYouTitle}
                </h3>
                <p className="text-xs text-neutral-300 leading-relaxed font-light max-w-md mx-auto">
                  {t.contact.inquiryReceived.replace('{name}', formData.name).replace('{phone}', formData.phone)}
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-5 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs uppercase tracking-wider cursor-pointer"
                >
                  {t.contact.sendAnother}
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <span className="text-[10px] font-sans text-amber-400 uppercase tracking-wider font-semibold">
                    {t.contact.formBadge}
                  </span>
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-white uppercase tracking-wide mt-0.5">
                    {t.contact.formTitle}
                  </h3>
                </div>

                <input
                  type="text"
                  value={honeypot}
                  onChange={(e) => setHoneypot(e.target.value)}
                  className="hidden"
                  tabIndex={-1}
                  autoComplete="off"
                />

                <div>
                  <label className="block text-[11px] font-sans text-neutral-400 uppercase tracking-wider mb-1 font-medium">
                    {t.contact.fullName}
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Johnathan Vance"
                    className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs font-sans text-white focus:outline-none focus:border-amber-400 transition-colors"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-sans text-neutral-400 uppercase tracking-wider mb-1 font-medium">
                      {t.contact.phoneNumber}
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="(302) 276-2427"
                      className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs font-sans text-white focus:outline-none focus:border-amber-400 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-sans text-neutral-400 uppercase tracking-wider mb-1 font-medium">
                      {t.contact.emailAddress}
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="client@domain.com"
                      className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs font-sans text-white focus:outline-none focus:border-amber-400 transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-sans text-neutral-400 uppercase tracking-wider mb-1 font-medium">
                    {t.contact.inquiryCategory}
                  </label>
                  <select
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-neutral-900 border border-white/10 text-xs font-sans text-white focus:outline-none focus:border-amber-400 cursor-pointer"
                  >
                    <option value="Schedule Private Test Drive">{t.contact.catTestDrive}</option>
                    <option value="Pre-Approval Financing Consultation">{t.contact.catFinance}</option>
                    <option value="Trade-In Instant Appraisal">{t.contact.catTradeIn}</option>
                    <option value="ASE Service Department Booking">{t.contact.catRepair}</option>
                    <option value="General Inventory Inquiries">{t.contact.catGeneral}</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-sans text-neutral-400 uppercase tracking-wider mb-1 font-medium">
                    {t.contact.additionalNotes}
                  </label>
                  <textarea
                    rows={3}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder={t.contact.notesPlaceholder}
                    className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs font-sans text-white focus:outline-none focus:border-amber-400 transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-[#D4AF37] hover:bg-[#c5a030] text-black font-bold text-xs font-sans tracking-wider uppercase active:scale-95 transition-all shadow-md shadow-[#D4AF37]/20 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>{t.contact.submitInquiryBtn}</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
