import React, { useState } from 'react';
import { STAFF_MEMBERS } from '../data/dealershipData';
import { Phone, Mail, CheckCircle2, ShieldCheck, MapPin } from 'lucide-react';
import { playHudClick } from '../utils/audio';
import { useLanguage } from '../context/LanguageContext';

export const DealershipTeam: React.FC = () => {
  const { lang, t } = useLanguage();
  const [imgErrors, setImgErrors] = useState<Record<string, boolean>>({});

  const handleImgError = (name: string) => {
    setImgErrors((prev) => ({ ...prev, [name]: true }));
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .substring(0, 2)
      .toUpperCase();
  };

  return (
    <section id="team" className="scroll-mt-28 sm:scroll-mt-32 lg:scroll-mt-36 py-20 bg-[#0a0a0e] border-t border-white/5 relative">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-300 text-xs font-sans tracking-widest uppercase mb-3 font-semibold">
            <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
            <span>{t.team.badge}</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight uppercase">
            {t.team.title}
          </h2>
          <p className="mt-3 text-sm text-neutral-300 leading-relaxed font-light">
            {lang === 'es'
              ? 'Equipo real que encontrará directamente en nuestro lote de 154 S Dupont Hwy en New Castle, Delaware. Compromiso con la honestidad, transparencia y precios directos.'
              : 'The real automotive professionals who run our lot and showroom at 154 S Dupont Hwy in New Castle, Delaware. Transparent pricing, zero hidden fees, and dedicated service.'}
          </p>
        </div>

        {/* Staff Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {STAFF_MEMBERS.map((member) => {
            const hasError = imgErrors[member.name];

            return (
              <div
                key={member.name}
                className="rounded-2xl glass-card border border-white/10 p-6 flex flex-col justify-between hover:border-amber-400/40 transition-all duration-300 group shadow-lg"
              >
                <div>
                  <div className="flex items-start gap-4 mb-4">
                    {/* Member Photo or Fallback Avatar */}
                    <div className="relative w-16 h-16 rounded-2xl overflow-hidden border-2 border-amber-400/40 shrink-0 bg-neutral-900 flex items-center justify-center shadow-md">
                      {!hasError && member.photo ? (
                        <img
                          src={member.photo}
                          alt={`${member.name} - ${member.role} at Blackshire Motors`}
                          referrerPolicy="no-referrer"
                          onError={() => handleImgError(member.name)}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-amber-500/20 to-neutral-900 flex items-center justify-center">
                          <span className="font-serif text-xl font-bold text-amber-300 tracking-wider">
                            {getInitials(member.name)}
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="font-serif font-bold text-white text-lg group-hover:text-amber-300 transition-colors truncate">
                          {member.name}
                        </h3>
                        {member.badge && (
                          <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium tracking-wide ${
                            member.badge.includes('Español')
                              ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-bold'
                              : 'bg-amber-400/10 text-amber-300 border border-amber-400/25'
                          }`}>
                            {member.badge}
                          </span>
                        )}
                      </div>

                      <div className="text-xs font-sans text-amber-400 font-semibold tracking-wide mt-0.5">
                        {lang === 'es' && member.name === 'Fazal'
                          ? 'Gerente General y de Finanzas'
                          : lang === 'es' && member.name === 'Sajid'
                          ? 'Gerente de Lote e Inspección'
                          : lang === 'es' && member.name === 'Cristal Gomez'
                          ? 'Especialista en Ventas (Bilingüe)'
                          : lang === 'es'
                          ? 'Especialista en Ventas de Autos'
                          : member.role}
                      </div>

                      <div className="text-[11px] font-sans text-neutral-400 mt-0.5">
                        {lang === 'es' ? member.experience.replace('Experience', 'de Experiencia') : member.experience}
                      </div>
                    </div>
                  </div>

                  <p className="text-xs text-neutral-300 leading-relaxed font-light mt-2">
                    {member.bio}
                  </p>
                </div>

                <div className="mt-5 pt-3.5 border-t border-white/5 space-y-2 text-xs font-sans text-neutral-400">
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <a
                      href={`tel:${member.directPhone.replace(/[^0-9]/g, '')}`}
                      onClick={() => playHudClick()}
                      title={`Call ${member.name} directly`}
                      className="flex items-center gap-1.5 hover:text-amber-300 transition-colors cursor-pointer"
                    >
                      <Phone className="w-3.5 h-3.5 text-amber-400" />
                      <span className="font-mono text-[11px]">{member.directPhone}</span>
                    </a>

                    <span className="text-[11px] text-amber-300 flex items-center gap-1 font-medium">
                      <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" />
                      <span>{t.team.onSiteConcierge}</span>
                    </span>
                  </div>

                  {member.email && (
                    <div className="pt-1 flex items-center gap-1.5 text-[11px] text-neutral-400 truncate">
                      <Mail className="w-3.5 h-3.5 text-neutral-500 shrink-0" />
                      <a
                        href={`mailto:${member.email}`}
                        title={`Send an email to ${member.name}`}
                        className="hover:text-amber-300 transition-colors truncate font-mono text-[11px]"
                      >
                        {member.email}
                      </a>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Assurance Bar */}
        <div className="mt-12 p-4 rounded-2xl bg-white/[0.03] border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-400 text-center sm:text-left">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-amber-400/10 border border-amber-400/30 flex items-center justify-center shrink-0">
              <MapPin className="w-4 h-4 text-amber-400" />
            </div>
            <div>
              <p className="text-white font-medium">
                {lang === 'es' ? '154 S Dupont Hwy, New Castle, DE 19720' : '154 S Dupont Hwy, New Castle, DE 19720'}
              </p>
              <p className="text-[11px] text-neutral-400">
                {lang === 'es' 
                  ? 'Abierto de Lunes a Sábado de 10:00 AM a 7:00 PM • Se Habla Español • Aprobaciones directas' 
                  : 'Open Monday – Saturday 10:00 AM – 7:00 PM • Se Habla Español • Honest Car Buying'}
              </p>
            </div>
          </div>

          <a
            href="tel:3022762427"
            onClick={() => playHudClick()}
            className="px-4 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-black font-semibold text-xs tracking-wider uppercase transition-all duration-200 active:scale-95 shrink-0"
          >
            {lang === 'es' ? 'Llamar al Equipo (302) 276-2427' : 'Call Our Team (302) 276-2427'}
          </a>
        </div>

      </div>
    </section>
  );
};

export default DealershipTeam;
