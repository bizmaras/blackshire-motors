import React, { useState } from 'react';
import { Wrench, ShieldCheck, Gauge, CheckCircle2, ArrowUpRight, Sparkles, Clock } from 'lucide-react';
import { playTactileChime } from '../utils/audio';
import { useLanguage } from '../context/LanguageContext';

export const ServicesSection: React.FC = () => {
  const { lang, t } = useLanguage();
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [serviceName, setServiceName] = useState('');
  const [servicePhone, setServicePhone] = useState('');
  const [serviceCar, setServiceCar] = useState('');
  const [serviceNeed, setServiceNeed] = useState('Oil & Filter Service + Inspection');

  const services = [
    {
      id: 'diagnostics',
      title: lang === 'es' ? 'Diagnóstico Mecánico y Computarizado' : 'Precision Mechanical & Computer Diagnostics',
      subtitle: lang === 'es' ? 'PROTOCOLO OEM DE FÁBRICA' : 'FACTORY OEM DIAGNOSTIC PROTOCOL',
      icon: Gauge,
      description: lang === 'es'
        ? 'Escáneres de diagnóstico de nivel de fábrica para BMW, Mercedes-Benz, RAM, Ford, GM e importados. Análisis exhaustivo de luces Check Engine, transmisión, módulos ABS y códigos de falla eléctrica.'
        : 'Factory-level diagnostic scanners for BMW, Mercedes-Benz, RAM, Ford, GM, and Asian imports. Pinpoint analysis of check engine lights, transmission shift patterns, ABS modules, and electrical fault codes.',
      features: lang === 'es'
        ? [
            'Diagnóstico computarizado de sensores OBD-II en tiempo real',
            'Pruebas de compresión de motor y fugas de presión en cilindros',
            'Verificación de inyección de combustible y presión de turbo',
            'Prueba completa de carga eléctrica en batería, alternador y arranque'
          ]
        : [
            'Multi-protocol computerized live OBD-II sensor diagnostics',
            'Engine compression & cylinder pressure leak-down tests',
            'Fuel injection and turbocharger boost pressure verification',
            'Complete battery, alternator, and starter electrical load testing'
          ],
      badge: lang === 'es' ? 'Certificación ASE Master' : 'ASE Master Certified'
    },
    {
      id: 'brakes-suspension',
      title: lang === 'es' ? 'Sistemas de Frenos y Alineación Láser Hunter' : 'Braking Systems & Hunter 4-Wheel Alignment',
      subtitle: lang === 'es' ? 'POTENCIA DE FRENADO Y ESTABILIDAD' : 'SURGICAL STOPPING POWER & STABILITY',
      icon: Wrench,
      description: lang === 'es'
        ? 'Pastillas cerámicas de alto rendimiento y OEM, rectificación de rotores ranurados/ventilados, purga de líneas y alineación láser digital Hunter para maximizar vida de neumáticos.'
        : 'High-performance and OEM ceramic brake pad replacements, slotted & ventilated rotor resurfacing, brake line bleeding, and Hunter digital laser alignment to maximize tire life and highway tracking.',
      features: lang === 'es'
        ? [
            'Instalación de pastillas cerámicas de bajo polvo y alta exigencia',
            'Alineación láser digital computarizada en bancos Hunter',
            'Reemplazo de amortiguadores, puntales y brazos de control',
            'Montaje de neumáticos, balanceo dinámico y calibración TPMS'
          ]
        : [
            'Ceramic low-dust and severe-duty brake pad installations',
            'Precision digital 4-wheel laser alignment on Hunter racks',
            'Shock absorber, strut assembly, and control arm replacement',
            'Tire mounting, road-force dynamic balancing, and TPMS programming'
          ],
      badge: lang === 'es' ? 'Precisión Digital Hunter' : 'Hunter Digital Precision'
    },
    {
      id: 'delaware-inspection',
      title: lang === 'es' ? 'Inspección Estatal de Seguridad y Emisiones DE' : 'Delaware State Safety & Emissions Inspection',
      subtitle: lang === 'es' ? 'CERTIFICACIÓN OFICIAL DE SALIDA' : 'OFFICIAL LOT CERTIFICATION',
      icon: ShieldCheck,
      description: lang === 'es'
        ? 'Pre-inspecciones completas para cumplir con las normas del DMV de Delaware. Revisamos monitores de emisiones, escape, integridad estructural, iluminación y cinturones para garantizar su aprobación.'
        : 'Full Delaware DMV compliance pre-inspections. We inspect emissions readiness monitors, exhaust systems, structural integrity, lighting, glass, and safety restraints to guarantee an effortless Delaware DMV pass.',
      features: lang === 'es'
        ? [
            'Ciclos de prueba de preparación de monitores OBD-II',
            'Auditoría integral de 150 puntos según estándares de DE',
            'Verificación de tolerancia en rótulas y terminales de dirección',
            'Alineación de faros, espesor de pastillas y profundidad de huella'
          ]
        : [
            'OBD-II emissions monitor readiness drive cycles',
            'Delaware safety standard 150-point comprehensive audit',
            'Suspension ball-joint and steering tie-rod play tolerance checks',
            'Headlight aiming, brake pad thickness, and tire tread depth compliance'
          ],
      badge: lang === 'es' ? 'Garantía de Aprobación DMV' : '100% DMV Pass Guarantee'
    },
    {
      id: 'buyer-perks',
      title: lang === 'es' ? 'Programa de Cuidado Vitalicio para Compradores' : 'Blackshire Buyer Lifetime Care Program',
      subtitle: lang === 'es' ? 'VALOR PERMANENTE PARA CLIENTES' : 'LIFELONG CLIENT VALUE PROPOSITION',
      icon: Sparkles,
      description: lang === 'es'
        ? 'Al adquirir cualquier vehículo en Blackshire Motors en 154 S Dupont Hwy, disfruta de tarifas preferenciales permanentes de reparación, mano de obra con descuento y revisiones periódicas de cortesía.'
        : 'When you purchase any vehicle from Blackshire Motors at 154 S Dupont Hwy, you receive access to our permanent preferred customer repair rates, discounted mechanical labor, and complimentary multi-point checkups.',
      features: lang === 'es'
        ? [
            'Descuento permanente del 15% en mano de obra mecánica',
            'Inspección estacional gratuita de 150 puntos antes de verano e invierno',
            'Recarga de fluidos de cortesía (refrigerante, líquido de frenos, limpiavidrios)',
            'Turnos prioritarios en nuestras bahías de servicio dedicadas'
          ]
        : [
            'Permanent 15% discount on all mechanical labor rates',
            'Free 150-point seasonal inspection before summer and winter',
            'Complimentary fluid top-offs (coolant, brake fluid, windshield washer)',
            'Priority appointment scheduling in our dedicated service bays'
          ],
      badge: lang === 'es' ? 'Privilegio Vitalicio de Comprador' : 'Lifetime Buyer Privilege'
    }
  ];

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    playTactileChime();
    setBookingSuccess(true);
  };

  return (
    <section id="services" className="scroll-mt-28 sm:scroll-mt-32 lg:scroll-mt-36 py-24 relative bg-[#08080a] border-t border-white/5 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-8 border-b border-white/10 mb-12">
          <div>
            <div className="flex items-center gap-2 text-xs font-sans tracking-widest text-amber-400 uppercase mb-2 font-semibold">
              <Wrench className="w-4 h-4 text-amber-400" />
              {t.services.atelierBadge}
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white uppercase tracking-tight">
              {t.services.sectionTitle}
            </h2>
            <p className="mt-2 text-sm text-neutral-300 max-w-2xl leading-relaxed font-light">
              {t.services.sectionSubtitle}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 text-xs font-sans text-neutral-300">
            <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 border border-white/10">
              <Clock className="w-4 h-4 text-amber-400" />
              <span>{t.services.serviceHours}</span>
            </div>
          </div>
        </div>

        {/* Services 2x2 Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((srv) => {
            const Icon = srv.icon;
            return (
              <div
                key={srv.id}
                className="p-8 rounded-3xl glass-obsidian border border-white/10 hover:border-amber-400/40 transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 rounded-2xl bg-white/5 border border-white/10 text-amber-400 group-hover:scale-110 transition-transform">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[11px] font-sans px-3 py-1 rounded-full bg-amber-400/10 text-amber-300 border border-amber-400/30 uppercase font-semibold">
                      {srv.badge}
                    </span>
                  </div>

                  <div className="text-[10px] font-sans uppercase tracking-widest text-amber-400 font-semibold mb-1">
                    {srv.subtitle}
                  </div>
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-white mb-3 group-hover:text-amber-300 transition-colors">
                    {srv.title}
                  </h3>
                  <p className="text-xs text-neutral-300 font-light leading-relaxed mb-6">
                    {srv.description}
                  </p>

                  <div className="space-y-2 border-t border-white/10 pt-4">
                    {srv.features.map((feat, idx) => (
                      <div key={idx} className="flex items-center gap-2.5 text-xs text-neutral-300 font-sans">
                        <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-between">
                  <span className="text-xs font-sans text-neutral-400">154 S Dupont Hwy</span>
                  <a
                    href="tel:3022762427"
                    className="inline-flex items-center gap-1.5 text-xs font-sans font-semibold text-amber-300 hover:text-white uppercase tracking-wider transition-colors"
                  >
                    <span>{t.services.bookThisService}</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        {/* Quick Service Reservation Box */}
        <div className="mt-12 p-6 sm:p-8 rounded-3xl glass-card border border-white/10 bg-neutral-950/60">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="max-w-lg space-y-2">
              <span className="text-xs font-sans text-amber-400 uppercase tracking-widest font-semibold">
                {t.services.rapidBooking}
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white">
                {t.services.scheduleTitle}
              </h3>
              <p className="text-xs text-neutral-300 font-light leading-relaxed">
                {t.services.scheduleDesc}
              </p>
            </div>

            <div className="w-full lg:max-w-md">
              {bookingSuccess ? (
                <div className="p-4 rounded-2xl bg-amber-950/40 border border-amber-500/40 text-amber-200 text-xs font-sans flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-amber-400 shrink-0" />
                  <span>
                    {lang === 'es'
                      ? `¡Gracias ${serviceName}! Nuestro taller ha recibido su solicitud. Nos comunicaremos con usted al ${servicePhone} para confirmar el horario de su cita.`
                      : `Thank you ${serviceName}! Our service department has received your request. We will contact you at ${servicePhone} to confirm your appointment time.`
                    }
                  </span>
                </div>
              ) : (
                <form onSubmit={handleBookingSubmit} className="space-y-3 font-sans">
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="text"
                      required
                      value={serviceName}
                      onChange={(e) => setServiceName(e.target.value)}
                      placeholder={t.services.yourName}
                      className="px-3.5 py-2.5 rounded-xl bg-neutral-900 border border-white/15 text-xs text-white focus:outline-none focus:border-amber-400"
                    />
                    <input
                      type="tel"
                      required
                      value={servicePhone}
                      onChange={(e) => setServicePhone(e.target.value)}
                      placeholder={t.services.phoneNum}
                      className="px-3.5 py-2.5 rounded-xl bg-neutral-900 border border-white/15 text-xs text-white focus:outline-none focus:border-amber-400"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="text"
                      required
                      value={serviceCar}
                      onChange={(e) => setServiceCar(e.target.value)}
                      placeholder={t.services.carYearMakeModel}
                      className="px-3.5 py-2.5 rounded-xl bg-neutral-900 border border-white/15 text-xs text-white focus:outline-none focus:border-amber-400"
                    />
                    <select
                      value={serviceNeed}
                      onChange={(e) => setServiceNeed(e.target.value)}
                      className="px-3.5 py-2.5 rounded-xl bg-neutral-900 border border-white/15 text-xs text-white focus:outline-none focus:border-amber-400 cursor-pointer"
                    >
                      <option value="Oil & Filter Service">{lang === 'es' ? 'Cambio de Aceite y Filtro' : 'Oil & Filter Service'}</option>
                      <option value="Brake Pad & Rotor Replacement">{lang === 'es' ? 'Frenos y Rotores' : 'Brake Service'}</option>
                      <option value="Hunter 4-Wheel Alignment">{lang === 'es' ? 'Alineación Láser Hunter' : 'Wheel Alignment'}</option>
                      <option value="Delaware State Inspection">{lang === 'es' ? 'Inspección Estatal DE' : 'DE State Inspection'}</option>
                      <option value="Check Engine Diagnostic">{lang === 'es' ? 'Diagnóstico Check Engine' : 'Engine Diagnostic'}</option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 rounded-xl bg-[#D4AF37] hover:bg-[#c5a030] text-black font-bold text-xs font-sans uppercase tracking-wider transition-all cursor-pointer shadow-md shadow-[#D4AF37]/20 active:scale-95"
                  >
                    {t.services.requestAppointmentBtn}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
