import React, { useState } from 'react';
import { DEALERSHIP_FAQS } from '../data/dealershipData';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { playHudClick } from '../utils/audio';
import { useLanguage } from '../context/LanguageContext';

const SPANISH_FAQS = [
  {
    question: '¿Dónde está ubicado Blackshire Motors y cuáles son sus horarios?',
    answer: 'Blackshire Motors está ubicado en 154 S Dupont Hwy, New Castle, DE 19720 (en la Ruta 13, a solo 10 minutos al sur de Wilmington y a 25 minutos del Aeropuerto Internacional de Filadelfia). Abrimos de lunes a sábado de 10:00 AM a 7:00 PM (domingos cerrado).'
  },
  {
    question: '¿Delaware cobra impuesto sobre ventas en autos usados en Blackshire Motors?',
    answer: '¡Delaware tiene un 0.0% de impuesto estatal sobre ventas! Al comprar un vehículo en Blackshire Motors en Delaware, usted disfruta del paraíso fiscal del 0%, ahorrando miles de dólares en comparación con estados vecinos como Pensilvania (6%), Nueva Jersey (6.625%) o Maryland (6%).'
  },
  {
    question: '¿Qué opciones de financiamiento ofrece Blackshire Motors?',
    answer: 'Ofrecemos financiamiento automotriz integral para todos los perfiles de crédito: crédito excelente (prime), compradores de primer auto, programas de segunda oportunidad para reconstruir crédito y alianzas con cooperativas de ahorro y crédito locales y bancos nacionales. Aceptamos trade-ins para reducir su pago inicial.'
  },
  {
    question: '¿Blackshire Motors ofrece servicios de reparación y mantenimiento mecánico?',
    answer: '¡Sí! Blackshire Motors cuenta con un taller certificado de servicio mecánico completo en 154 S Dupont Hwy. Todos los clientes que adquieren un vehículo con nosotros reciben tarifas con descuento permanente en mano de obra y mantenimiento futuro: cambios de aceite, frenos y diagnósticos.'
  },
  {
    question: '¿Los vehículos están inspeccionados y cuentan con reportes CARFAX?',
    answer: 'Cada uno de los vehículos de nuestro inventario pasa por una rigurosa inspección mecánica y de seguridad de 150 puntos antes de ponerse a la venta. Proporcionamos informes transparentes de historial CARFAX, millaje verificado y títulos garantizados.'
  }
];

export const AeoFaqSection: React.FC = () => {
  const { lang, t } = useLanguage();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    playHudClick();
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqs = lang === 'es' ? SPANISH_FAQS : DEALERSHIP_FAQS;

  return (
    <section id="faq" className="scroll-mt-28 sm:scroll-mt-32 lg:scroll-mt-36 py-20 bg-[#07070b] border-t border-white/5 relative">
      <div className="max-w-5xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-300 text-xs font-sans tracking-widest uppercase mb-3 font-semibold">
            <HelpCircle className="w-3.5 h-3.5 text-amber-400" />
            {t.faq.badge}
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight uppercase">
            {t.faq.title}
          </h2>
          <p className="mt-3 text-sm text-neutral-300 leading-relaxed font-light">
            {t.faq.subtitle}
          </p>
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl glass-card border border-white/10 overflow-hidden transition-all duration-200"
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-white/[0.02] transition-colors"
                >
                  <span className="font-serif font-bold text-white text-base sm:text-lg">
                    {faq.question}
                  </span>
                  <div className={`p-2 rounded-xl bg-white/5 text-amber-400 transition-transform duration-200 shrink-0 ${isOpen ? 'rotate-180 bg-[#D4AF37] text-black font-bold' : ''}`}>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 text-xs sm:text-sm text-neutral-300 leading-relaxed font-sans border-t border-white/5 pt-3 animate-in fade-in duration-150">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default AeoFaqSection;
