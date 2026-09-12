import React, { createContext, useContext, useState, useEffect } from 'react';

export type Language = 'en' | 'es';

export interface Translations {
  header: {
    inventory: string;
    taxBenefit: string;
    financing: string;
    services: string;
    aboutUs: string;
    contact: string;
    preApproval: string;
    showroomPreferences: string;
    typography: string;
    acousticAudio: string;
    soundActive: string;
    soundMuted: string;
    compareVehicles: string;
    standardsAudit: string;
    viewMode: string;
    whiteTheme: string;
    darkTheme: string;
    lightMode: string;
    darkMode: string;
    salesTaxBadge: string;
    changeLanguage: string;
  };
  hero: {
    badge1: string;
    title1Line1: string;
    title1Line2: string;
    subtitle1: string;
    ctaExplore: string;
    ctaFinance: string;
    badge2: string;
    title2Line1: string;
    title2Line2: string;
    subtitle2: string;
    ctaTrucks: string;
    ctaTrade: string;
    badge3: string;
    title3Line1: string;
    title3Line2: string;
    subtitle3: string;
    ctaService: string;
    ctaPrivileges: string;
    featuredSelection: string;
    certified150Point: string;
    viewSpecsGallery: string;
    taxAssuranceBanner: string;
    searchInventory: string;
    makeLabel: string;
    allMakes: string;
    bodyStyleLabel: string;
    allBodyStyles: string;
    luxurySedans: string;
    premiumSuvs: string;
    trucks: string;
    sportsCoupe: string;
    budgetLabel: string;
    anyPrice: string;
    slide1Luxury: string;
    slide2Trucks: string;
    slide3Service: string;
  };
  inventory: {
    lotStatus: string;
    sectionTitle: string;
    sectionSubtitle: string;
    delawareTaxCallout: string;
    searchPlaceholder: string;
    sortPriceLow: string;
    sortPriceHigh: string;
    sortMileageLow: string;
    sortYearNew: string;
    showing: string;
    certifiedVehicles: string;
    lotStatusBadge: string;
    compareBtn: string;
    addedBtn: string;
    taxSavings: string;
    taxSavingsSub: string;
    mileage: string;
    drive: string;
    carfax: string;
    oneOwner: string;
    cleanTitle: string;
    delawarePrice: string;
    estMonthly: string;
    monthlyUnit: string;
    configureBtn: string;
    exploreBtn: string;
    makeOfferBtn: string;
    noVehiclesFound: string;
  };
  tax: {
    badge: string;
    title: string;
    subtitle: string;
    calcTitle: string;
    instantComp: string;
    selectedPrice: string;
    estimatedSavings: string;
    comparedStates: string;
    claimSavingsBtn: string;
    delaware: string;
    delawareRate: string;
    delawareExempt: string;
    pennsylvania: string;
    pennsylvaniaRate: string;
    newJersey: string;
    newJerseyRate: string;
    maryland: string;
    marylandRate: string;
    addedToPurchase: string;
  };
  services: {
    atelierBadge: string;
    sectionTitle: string;
    sectionSubtitle: string;
    serviceHours: string;
    bookThisService: string;
    rapidBooking: string;
    scheduleTitle: string;
    scheduleDesc: string;
    yourName: string;
    phoneNum: string;
    carYearMakeModel: string;
    requestAppointmentBtn: string;
  };
  financing: {
    badge: string;
    title: string;
    subtitle: string;
    creditProfile: string;
    tierPrime: string;
    tierStandard: string;
    tierSpecialized: string;
    vehiclePrice: string;
    downPayment: string;
    zeroDown: string;
    termDuration: string;
    months: string;
    taxAdvantageNote: string;
    estimatedInvestment: string;
    delawareTaxApplied: string;
    estimatedMonthly: string;
    ledgerVehicleValuation: string;
    ledgerDownPayment: string;
    ledgerTotalFinanced: string;
    ledgerDeTax: string;
    ledgerTermHorizon: string;
    requestProposal: string;
  };
  valuation: {
    badge: string;
    title: string;
    subtitle: string;
    benefit1: string;
    benefit2: string;
    benefit3: string;
    vehicleMake: string;
    modelTrim: string;
    year: string;
    currentOdometer: string;
    condition: string;
    conditionClean: string;
    conditionGood: string;
    conditionFair: string;
    vinOptional: string;
    calculateTradeValue: string;
    blackshireOffer: string;
    taxCreditNotice: string;
    salesTaxReduced: string;
    bringTitle: string;
    lockInOffer: string;
  };
  team: {
    badge: string;
    title: string;
    subtitle: string;
    onSiteConcierge: string;
  };
  reviews: {
    badge: string;
    title: string;
    subtitle: string;
    verifiedRatings: string;
    googleCargurus: string;
    allReviews: string;
  };
  faq: {
    badge: string;
    title: string;
    subtitle: string;
  };
  contact: {
    showroomBadge: string;
    visitShowroom: string;
    locationDesc: string;
    showroomServiceCenter: string;
    taxHavenNote: string;
    openGoogleMaps: string;
    directLines: string;
    directGuidance: string;
    hoursOfOperation: string;
    monSatSchedule: string;
    sundaySchedule: string;
    outOfStateNote: string;
    inquiryReceived: string;
    thankYouTitle: string;
    sendAnother: string;
    formBadge: string;
    formTitle: string;
    inquiryCategory: string;
    catTestDrive: string;
    catFinance: string;
    catTradeIn: string;
    catRepair: string;
    catGeneral: string;
    fullName: string;
    phoneNumber: string;
    emailAddress: string;
    prefDateTime: string;
    vehicleOfInterest: string;
    additionalNotes: string;
    notesPlaceholder: string;
    submitInquiryBtn: string;
  };
  footer: {
    description: string;
    delawareTaxTitle: string;
    taxSavingsNote: string;
    inventoryCol: string;
    servicesCol: string;
    locationCol: string;
    linkSedans: string;
    linkTrucks: string;
    linkSuvs: string;
    linkUnder20k: string;
    linkCarfax: string;
    linkFinancing: string;
    linkTrade: string;
    linkInspection: string;
    linkBrakes: string;
    linkClientCare: string;
    monSatHours: string;
    allRightsReserved: string;
    auditStandards: string;
    licensedDealer: string;
  };
}

export const EN_TRANSLATIONS: Translations = {
  header: {
    inventory: 'Inventory',
    taxBenefit: '0% Tax Benefit',
    financing: 'Financing',
    services: 'Service Atelier',
    aboutUs: 'Dealership',
    contact: 'Location & Contact',
    preApproval: 'Pre-Approval',
    showroomPreferences: 'Preferences',
    typography: 'Typography Theme',
    acousticAudio: 'Acoustic Sound',
    soundActive: 'Active',
    soundMuted: 'Muted',
    compareVehicles: 'Compare Vehicles',
    standardsAudit: 'Audit & Standards',
    viewMode: 'Theme Palette',
    whiteTheme: 'White Theme',
    darkTheme: 'Dark Theme',
    lightMode: 'Light Mode',
    darkMode: 'Dark Mode',
    salesTaxBadge: '0% DE Sales Tax',
    changeLanguage: 'Language',
  },
  hero: {
    badge1: '0% Delaware Sales Tax • 154 S Dupont Hwy, New Castle DE',
    title1Line1: 'QUALITY USED CARS.',
    title1Line2: '0% DELAWARE SALES TAX.',
    subtitle1: 'Reliable pre-owned sedans, family SUVs, and work-ready pickup trucks with clean CARFAX histories, low mileage, and easy financing for all credit types.',
    ctaExplore: 'View All Cars & Trucks',
    ctaFinance: 'Get Pre-Approved',
    badge2: 'Work-Ready Pickup Trucks • 4x4 & V8 Power',
    title2Line1: 'DEPENDABLE TRUCKS.',
    title2Line2: 'WORKHORSE POWER.',
    subtitle2: 'High-utility Ford F-150, Chevrolet Silverado, and RAM 1500 trucks safety-checked and priced to save you thousands in New Castle, DE.',
    ctaTrucks: 'Browse Pickup Trucks',
    ctaTrade: 'Value Your Trade-In',
    badge3: 'Full Auto Repair & Inspection • 154 S Dupont Hwy',
    title3Line1: 'EXPERT SERVICE.',
    title3Line2: '150-POINT INSPECTED.',
    subtitle3: 'Every vehicle passes our rigorous 150-point safety inspection before hitting the lot. Full service and maintenance facility on-site.',
    ctaService: 'Schedule Repair / Service',
    ctaPrivileges: 'Our Guarantee',
    featuredSelection: 'FEATURED VEHICLE',
    certified150Point: '150-POINT INSPECTED',
    viewSpecsGallery: 'View Photos & Full Details',
    taxAssuranceBanner: 'Zero State Sales Tax in Delaware • Save $1,000 to $2,500+ vs PA/NJ/MD',
    searchInventory: 'Search Inventory',
    makeLabel: 'SELECT VEHICLE MAKE',
    allMakes: 'All Available Makes',
    bodyStyleLabel: 'BODY STYLE',
    allBodyStyles: 'All Body Styles',
    luxurySedans: 'Sedans & Compacts',
    premiumSuvs: 'SUVs & Crossovers',
    trucks: 'Pickup Trucks & 4x4',
    sportsCoupe: 'Coupes & Convertibles',
    budgetLabel: 'BUDGET CEILING',
    anyPrice: 'Any Price Range',
    slide1Luxury: 'Sedans & SUVs',
    slide2Trucks: 'Pickup Trucks',
    slide3Service: 'Service Center',
  },
  inventory: {
    lotStatus: 'CURRENT LIVE LOT INVENTORY',
    sectionTitle: 'QUALITY PRE-OWNED CARS, SUVS & TRUCKS',
    sectionSubtitle: 'Explore our hand-checked used car inventory in New Castle, DE. Every vehicle includes free vehicle history, transparent pricing, and 0% Delaware sales tax.',
    delawareTaxCallout: 'Delaware 0% Sales Tax applied automatically on every vehicle.',
    searchPlaceholder: 'Search by make, model, V8, AWD, trim, color...',
    sortPriceLow: 'Price: Lowest First',
    sortPriceHigh: 'Price: Highest First',
    sortMileageLow: 'Mileage: Lowest First',
    sortYearNew: 'Year: Newest First',
    showing: 'Showing',
    certifiedVehicles: 'certified vehicles on lot',
    lotStatusBadge: 'Lot Inspected',
    compareBtn: '+ Compare',
    addedBtn: 'Added ✓',
    taxSavings: 'Save',
    taxSavingsSub: '(0% DE Tax)',
    mileage: 'MILEAGE',
    drive: 'DRIVE',
    carfax: 'CARFAX',
    oneOwner: '1-Owner Clean',
    cleanTitle: 'Clean Record',
    delawarePrice: 'DELAWARE PRICE',
    estMonthly: 'Est.',
    monthlyUnit: '/mo',
    configureBtn: 'Financing Calculator',
    exploreBtn: 'Inspect',
    makeOfferBtn: 'Make Offer',
    noVehiclesFound: 'No vehicles match your current search criteria.',
  },
  tax: {
    badge: 'DELAWARE ADVANTAGE',
    title: 'THE 0% DELAWARE SALES TAX ADVANTAGE',
    subtitle: 'Why smart car buyers travel from Pennsylvania, New Jersey, New York, and Maryland to purchase their vehicles at Blackshire Motors in New Castle, DE.',
    calcTitle: 'INTERACTIVE TAX SAVINGS CALCULATOR',
    instantComp: 'INSTANT STATE COMPARISON',
    selectedPrice: 'Vehicle Purchase Price:',
    estimatedSavings: 'YOUR ESTIMATED CASH SAVINGS',
    comparedStates: 'vs. neighboring Pennsylvania (6%), New Jersey (6.625%), and Maryland (6%)',
    claimSavingsBtn: 'Claim 0% Tax Savings on Inventory',
    delaware: 'Delaware (Blackshire Motors)',
    delawareRate: 'State Sales Tax Rate: 0.0%',
    delawareExempt: 'TAX EXEMPTION HAVEN',
    pennsylvania: 'Pennsylvania (Neighboring)',
    pennsylvaniaRate: 'State Sales Tax Rate: 6.0%',
    newJersey: 'New Jersey (Neighboring)',
    newJerseyRate: 'State Sales Tax Rate: 6.625%',
    maryland: 'Maryland (Neighboring)',
    marylandRate: 'State Excise Tax Rate: 6.0%',
    addedToPurchase: 'Added to your purchase out-of-pocket',
  },
  services: {
    atelierBadge: 'ON-SITE REPAIR & SERVICE ATELIER',
    sectionTitle: 'CERTIFIED REPAIR & STATE INSPECTION',
    sectionSubtitle: 'Our dedicated master service center at 154 S Dupont Hwy guarantees every vehicle is safe, road-ready, and backed by ongoing maintenance discounts.',
    serviceHours: 'Monday – Saturday: 10:00 AM – 7:00 PM',
    bookThisService: 'Book This Service',
    rapidBooking: 'RAPID SERVICE RESERVATION',
    scheduleTitle: 'SCHEDULE YOUR APPOINTMENT',
    scheduleDesc: 'Bring your vehicle to 154 S Dupont Hwy for factory-grade diagnostics, brake replacement, or Delaware safety inspections.',
    yourName: 'Your Full Name',
    phoneNum: 'Phone Number',
    carYearMakeModel: 'Vehicle Year, Make, Model',
    requestAppointmentBtn: 'REQUEST SERVICE APPOINTMENT',
  },
  financing: {
    badge: 'TRANSPARENT AUTO FINANCING',
    title: 'TAILORED AUTO LOAN CALCULATOR',
    subtitle: 'Calculate your exact monthly payments with real interest rates and $0 Delaware sales tax.',
    creditProfile: 'SELECT YOUR CREDIT PROFILE (ESTIMATED APR)',
    tierPrime: 'Prime (720+)',
    tierStandard: 'Good (660-719)',
    tierSpecialized: 'Second Chance (Rebuild)',
    vehiclePrice: 'Vehicle Purchase Price',
    downPayment: 'Cash Down Payment or Trade Equity',
    zeroDown: '$0 Down Available',
    termDuration: 'Financing Term Duration',
    months: 'Months',
    taxAdvantageNote: 'Calculated with 0.0% Delaware sales tax. No hidden doc fees or surprises.',
    estimatedInvestment: 'ESTIMATED FINANCING TERMS',
    delawareTaxApplied: '0% DE Sales Tax',
    estimatedMonthly: 'Estimated Monthly Payment',
    ledgerVehicleValuation: 'Vehicle Price',
    ledgerDownPayment: 'Down Payment / Equity',
    ledgerTotalFinanced: 'Financed Principal',
    ledgerDeTax: 'Delaware State Sales Tax',
    ledgerTermHorizon: 'Term Horizon',
    requestProposal: 'Apply for Pre-Approval Now',
  },
  valuation: {
    badge: 'INSTANT TRADE-IN ESTIMATOR',
    title: 'WE BUY LUXURY CARS & TRUCKS FOR TOP DOLLAR',
    subtitle: 'Get an instant Kelley Blue Book / Black Book trade valuation. Trade equity reduces your taxable basis and down payment.',
    benefit1: 'Guaranteed trade valuation honored for 7 business days',
    benefit2: 'Instant Delaware trade-in equity tax credit',
    benefit3: 'We buy cars outright with on-the-spot bank wire or certified check',
    vehicleMake: 'VEHICLE MAKE',
    modelTrim: 'MODEL & TRIM',
    year: 'YEAR',
    currentOdometer: 'ODOMETER (MILES)',
    condition: 'CONDITION',
    conditionClean: 'Clean / Excellent',
    conditionGood: 'Good',
    conditionFair: 'Fair',
    vinOptional: '17-DIGIT VIN (OPTIONAL FOR HIGHER ACCURACY)',
    calculateTradeValue: 'CALCULATE ESTIMATED TRADE VALUE',
    blackshireOffer: 'Estimated instant trade-in value from Blackshire Motors',
    taxCreditNotice: 'ESTIMATED TAX CREDIT',
    salesTaxReduced: 'Reduces your purchase balance',
    bringTitle: 'Bring your vehicle & title to 154 S Dupont Hwy for immediate verification.',
    lockInOffer: 'Lock In Appraisal Offer',
  },
  team: {
    badge: 'BLACKSHIRE LEADERSHIP',
    title: 'MEET OUR DEDICATED TEAM',
    subtitle: 'Experienced automotive professionals committed to honesty, transparency, and top-tier service in New Castle, Delaware.',
    onSiteConcierge: 'On-Site in New Castle, DE',
  },
  reviews: {
    badge: 'VERIFIED CUSTOMER REVIEWS',
    title: 'WHAT OUR CLIENTS SAY',
    subtitle: 'Read genuine reviews from local Delaware buyers and out-of-state drivers who saved thousands with Blackshire Motors.',
    verifiedRatings: 'Verified 4.8 / 5.0 Star Rating',
    googleCargurus: 'Google, CarGurus & DealerRater reviews',
    allReviews: 'All Reviews',
  },
  faq: {
    badge: 'FREQUENTLY ASKED QUESTIONS',
    title: 'EVERYTHING YOU NEED TO KNOW',
    subtitle: 'Clear, straightforward answers regarding Delaware 0% sales tax, auto financing, trade-ins, and on-site repair services.',
  },
  contact: {
    showroomBadge: 'NEW CASTLE, DE SHOWROOM',
    visitShowroom: 'VISIT OUR SHOWROOM & LOT',
    locationDesc: 'Conveniently located on Route 13 (S Dupont Hwy) in New Castle, Delaware. Just 10 minutes from Wilmington and minutes from I-95 / I-295.',
    showroomServiceCenter: 'SHOWROOM & SERVICE CENTER',
    taxHavenNote: 'Delaware 0% Sales Tax Destination',
    openGoogleMaps: 'Open Navigation in Google Maps',
    directLines: 'DIRECT PHONE LINES',
    directGuidance: 'Call for immediate inventory status & test drives',
    hoursOfOperation: 'HOURS OF OPERATION',
    monSatSchedule: 'Monday – Saturday: 10:00 AM – 7:00 PM',
    sundaySchedule: 'Sunday: Closed (Private Consultations by Appointment)',
    outOfStateNote: 'Out-of-state buyers: We provide temporary 30-day transit tags so you can drive home with complete peace of mind.',
    inquiryReceived: 'INQUIRY RECEIVED',
    thankYouTitle: 'THANK YOU',
    sendAnother: 'SUBMIT ANOTHER INQUIRY',
    formBadge: 'CLIENT CONCIERGE',
    formTitle: 'SCHEDULE A TEST DRIVE OR INQUIRY',
    inquiryCategory: 'SELECT INQUIRY CATEGORY',
    catTestDrive: 'Schedule Vehicle Test Drive',
    catFinance: 'Pre-Approval Financing Consultation',
    catTradeIn: 'Trade-In Valuation Appraisal',
    catRepair: 'In-House Auto Repair Estimate',
    catGeneral: 'General Inventory Question',
    fullName: 'FULL NAME',
    phoneNumber: 'PHONE NUMBER',
    emailAddress: 'EMAIL ADDRESS',
    prefDateTime: 'PREFERRED DATE & TIME',
    vehicleOfInterest: 'VEHICLE OF INTEREST',
    additionalNotes: 'ADDITIONAL NOTES OR QUESTIONS',
    notesPlaceholder: 'Mention trade-in details, financing preferences, or specific questions...',
    submitInquiryBtn: 'SUBMIT CONCIERGE INQUIRY',
  },
  footer: {
    description: 'Premier independent luxury & pre-owned dealership and certified auto service center in New Castle, DE. Enjoy 0% Delaware sales tax and hand-inspected vehicles.',
    delawareTaxTitle: 'Delaware 0% Sales Tax Haven',
    taxSavingsNote: 'Save $1,200 – $4,000+ vs PA, NJ, and MD',
    inventoryCol: 'INVENTORY SHOWCASE',
    servicesCol: 'DEALERSHIP & SERVICE',
    locationCol: 'LOCATION & CONTACT',
    linkSedans: 'Luxury Sedans',
    linkTrucks: '4x4 Trucks & HEMI',
    linkSuvs: 'Premium Family SUVs',
    linkUnder20k: 'Under $20k Values',
    linkCarfax: 'CARFAX Verified Vehicles',
    linkFinancing: 'Auto Loan Calculator',
    linkTrade: 'Trade-In Appraisal',
    linkInspection: '150-Point Inspection',
    linkBrakes: 'Brake & Alignment Service',
    linkClientCare: 'Lifetime Buyer Program',
    monSatHours: 'Mon - Sat: 10:00 AM - 7:00 PM',
    allRightsReserved: 'ALL RIGHTS RESERVED',
    auditStandards: 'Dealership Audit & Standards',
    licensedDealer: 'DELAWARE LICENSED INDEPENDENT MOTOR VEHICLE DEALER',
  },
};

export const ES_TRANSLATIONS: Translations = {
  header: {
    inventory: 'Inventario',
    taxBenefit: 'Beneficio 0% Impuestos',
    financing: 'Financiamiento',
    services: 'Taller Mecánico',
    aboutUs: 'Concesionario',
    contact: 'Ubicación y Contacto',
    preApproval: 'Precalificación',
    showroomPreferences: 'Preferencias',
    typography: 'Tipografía',
    acousticAudio: 'Audio de Motor',
    soundActive: 'Activo',
    soundMuted: 'Silenciado',
    compareVehicles: 'Comparar Autos',
    standardsAudit: 'Auditoría y Normas',
    viewMode: 'Modo Visual',
    whiteTheme: 'Modo Blanco',
    darkTheme: 'Modo Oscuro',
    lightMode: 'Modo Claro',
    darkMode: 'Modo Oscuro',
    salesTaxBadge: '0% Impuesto Delaware',
    changeLanguage: 'Idioma',
  },
  hero: {
    badge1: '0% Impuesto sobre Ventas en Delaware • 154 S Dupont Hwy',
    title1Line1: 'LUJO SELECCIONADO.',
    title1Line2: '0% IMPUESTO EN DE.',
    subtitle1: 'Descubra sedanes de alto rendimiento, camionetas familiares de lujo y pickups 4x4 con historial CARFAX certificado y el beneficio de cero impuestos de Delaware.',
    ctaExplore: 'Ver Inventario',
    ctaFinance: 'Calcular Financiamiento',
    badge2: 'Camionetas 4x4 de Trabajo • Potencia HEMI y V8',
    title2Line1: 'LISTO PARA REMOLCAR.',
    title2Line2: 'CERTIFICADO 100%.',
    subtitle2: 'RAM 1500, Chevrolet Silverado Z71 y Ford Serie F inspeccionados por mecánicos maestros certificados ASE.',
    ctaTrucks: 'Ver Camionetas 4x4',
    ctaTrade: 'Valuar mi Auto',
    badge3: 'Taller Certificado en el Lugar • 154 S Dupont Hwy',
    title3Line1: 'SERVICIO MAESTRO.',
    title3Line2: '150 PUNTOS CERTIFICADO.',
    subtitle3: 'Cada automóvil pasa por nuestra estricta auditoría mecánica de 150 puntos en nuestro taller en New Castle, Delaware.',
    ctaService: 'Agendar Servicio',
    ctaPrivileges: 'Privilegios de Cliente',
    featuredSelection: 'VEHÍCULO DESTACADO',
    certified150Point: 'INSPECCIÓN DE 150 PUNTOS',
    viewSpecsGallery: 'Ver Especificaciones y Fotos',
    taxAssuranceBanner: 'Cero Impuesto sobre Ventas en Delaware • Ahorre de $1,200 a $3,500+ vs PA/NJ/MD',
    searchInventory: 'Buscar en Inventario',
    makeLabel: 'MARCA DEL VEHÍCULO',
    allMakes: 'Todas las Marcas de Lujo y 4x4',
    bodyStyleLabel: 'TIPO DE CARROCERÍA',
    allBodyStyles: 'Todos los Modelos',
    luxurySedans: 'Sedanes de Lujo',
    premiumSuvs: 'SUVs & Crossovers',
    trucks: 'Camionetas 4x4',
    sportsCoupe: 'Coupés Deportivos',
    budgetLabel: 'PRESUPUESTO MÁXIMO',
    anyPrice: 'Cualquier Rango de Precio',
    slide1Luxury: 'Sedanes Lujo',
    slide2Trucks: 'Camionetas 4x4',
    slide3Service: 'Taller Mecánico',
  },
  inventory: {
    lotStatus: 'INVENTARIO DISPONIBLE EN EL LOTE',
    sectionTitle: 'AUTOS, SUVS Y CAMIONETAS USADAS DE CONFIANZA',
    sectionSubtitle: 'Explore nuestro inventario verificado en New Castle, DE. Cada auto incluye historial detallado, precios claros y 0% de impuesto de Delaware.',
    delawareTaxCallout: 'El 0% de impuesto de Delaware se aplica automáticamente a cada auto.',
    searchPlaceholder: 'Buscar por marca, modelo, V8, tracción 4x4, color...',
    sortPriceLow: 'Precio: Menor a Mayor',
    sortPriceHigh: 'Precio: Mayor a Menor',
    sortMileageLow: 'Millaje: Menor Primero',
    sortYearNew: 'Año: Más Reciente',
    showing: 'Mostrando',
    certifiedVehicles: 'vehículos certificados en el lote',
    lotStatusBadge: 'Inspeccionado',
    compareBtn: '+ Comparar',
    addedBtn: 'Agregado ✓',
    taxSavings: 'Ahorro',
    taxSavingsSub: '(0% Impuesto DE)',
    mileage: 'MILLAJE',
    drive: 'TRACCIÓN',
    carfax: 'CARFAX',
    oneOwner: '1 Dueño Limpio',
    cleanTitle: 'Título Limpio',
    delawarePrice: 'PRECIO DELAWARE',
    estMonthly: 'Est.',
    monthlyUnit: '/mes',
    configureBtn: 'Calculadora de Préstamo',
    exploreBtn: 'Inspeccionar',
    makeOfferBtn: 'Hacer Oferta',
    noVehiclesFound: 'No se encontraron vehículos con los criterios seleccionados.',
  },
  tax: {
    badge: 'VENTAJA FISCAL DELAWARE',
    title: 'LA VENTAJA DEL 0% DE IMPUESTOS EN DELAWARE',
    subtitle: 'Por qué los compradores inteligentes viajan desde Pensilvania, Nueva Jersey, Nueva York y Maryland para comprar en Blackshire Motors en New Castle, DE.',
    calcTitle: 'CALCULADORA INTERACTIVA DE AHORRO FISCAL',
    instantComp: 'COMPARATIVA EN TIEMPO REAL',
    selectedPrice: 'Precio de Compra del Vehículo:',
    estimatedSavings: 'SU AHORRO EN DINERO EN EFECTIVO',
    comparedStates: 'frente a Pensilvania (6%), Nueva Jersey (6.625%) y Maryland (6%)',
    claimSavingsBtn: 'Aprovechar Ahorro de Impuestos',
    delaware: 'Delaware (Blackshire Motors)',
    delawareRate: 'Tasa Estatal de Impuesto: 0.0%',
    delawareExempt: 'PARAÍSO LIBRE DE IMPUESTOS',
    pennsylvania: 'Pensilvania (Vecino)',
    pennsylvaniaRate: 'Tasa Estatal de Impuesto: 6.0%',
    newJersey: 'Nueva Jersey (Vecino)',
    newJerseyRate: 'Tasa Estatal de Impuesto: 6.625%',
    maryland: 'Maryland (Vecino)',
    marylandRate: 'Impuesto de Traspaso: 6.0%',
    addedToPurchase: 'Costo extra que sale de su bolsillo',
  },
  services: {
    atelierBadge: 'TALLER MECÁNICO Y CENTRO DE SERVICIO',
    sectionTitle: 'REPARACIÓN CERTIFICADA E INSPECCIÓN ESTATAL',
    sectionSubtitle: 'Nuestro taller en 154 S Dupont Hwy cuenta con mecánicos certificados ASE para diagnósticos por computadora, frenos y mantenimiento continuo.',
    serviceHours: 'Lunes a Sábado: 10:00 AM – 7:00 PM',
    bookThisService: 'Agendar este Servicio',
    rapidBooking: 'RESERVA RÁPIDA DE SERVICIO',
    scheduleTitle: 'AGENDE SU CITA EN EL TALLER',
    scheduleDesc: 'Traiga su vehículo a 154 S Dupont Hwy para diagnóstico computarizado, reemplazo de frenos o inspección del estado de Delaware.',
    yourName: 'Nombre Completo',
    phoneNum: 'Número de Teléfono',
    carYearMakeModel: 'Año, Marca y Modelo del Auto',
    requestAppointmentBtn: 'SOLICITAR CITA DE SERVICIO',
  },
  financing: {
    badge: 'FINANCIAMIENTO TRANSPARENTE',
    title: 'CALCULADORA DE PRÉSTAMO AUTOMOTRIZ',
    subtitle: 'Calcule su pago mensual exacto con tasas de interés transparentes y 0% de impuesto sobre ventas de Delaware.',
    creditProfile: 'SELECCIONE SU PERFIL CREDITICIO (APR ESTIMADO)',
    tierPrime: 'Excelente (720+)',
    tierStandard: 'Bueno (660-719)',
    tierSpecialized: 'Segunda Oportunidad',
    vehiclePrice: 'Precio del Vehículo',
    downPayment: 'Enganche en Efectivo o Valor de Trade-In',
    zeroDown: 'Opciones sin enganche disponibles',
    termDuration: 'Plazo del Préstamo',
    months: 'Meses',
    taxAdvantageNote: 'Calculado con 0.0% de impuesto de Delaware. Sin comisiones sorpresa.',
    estimatedInvestment: 'ESTIMACIÓN DE FINANCIAMIENTO',
    delawareTaxApplied: '0% Impuesto DE Aplicado',
    estimatedMonthly: 'Pago Mensual Estimado',
    ledgerVehicleValuation: 'Precio del Auto',
    ledgerDownPayment: 'Enganche / Trade-In',
    ledgerTotalFinanced: 'Monto a Financiar',
    ledgerDeTax: 'Impuesto Estatal de Delaware',
    ledgerTermHorizon: 'Plazo en Meses',
    requestProposal: 'Solicitar Precalificación Ahora',
  },
  valuation: {
    badge: 'VALUACIÓN DE AUTOS USADOS',
    title: 'COMPRAMOS SU AUTO AL MEJOR PRECIO DEL MERCADO',
    subtitle: 'Obtenga una cotización inmediata. El valor de su auto actual se descuenta de su nuevo pago inicial y reduce impuestos.',
    benefit1: 'Oferta garantizada durante 7 días hábiles',
    benefit2: 'Crédito fiscal instantáneo en Delaware',
    benefit3: 'Compramos su auto de inmediato con cheque certificado o transferencia',
    vehicleMake: 'MARCA DEL VEHÍCULO',
    modelTrim: 'MODELO Y VERSIÓN',
    year: 'AÑO',
    currentOdometer: 'MILLAJE ACTUAL',
    condition: 'ESTADO GENERAL',
    conditionClean: 'Excelente / Impecable',
    conditionGood: 'Bueno',
    conditionFair: 'Regular',
    vinOptional: 'VIN DE 17 DÍGITOS (OPCIONAL PARA MÁS PRECISIÓN)',
    calculateTradeValue: 'CALCULAR VALOR ESTIMADO DE RETOMA',
    blackshireOffer: 'Oferta estimada de retoma de Blackshire Motors',
    taxCreditNotice: 'CRÉDITO FISCAL ESTIMADO',
    salesTaxReduced: 'Reduce su saldo a pagar',
    bringTitle: 'Traiga su auto y título a 154 S Dupont Hwy para verificación inmediata.',
    lockInOffer: 'Asegurar Oferta de Valuación',
  },
  team: {
    badge: 'LIDERAZGO BLACKSHIRE',
    title: 'CONOZCA A NUESTRO EQUIPO',
    subtitle: 'Profesionales dedicados a brindarle transparencia, honestidad y el mejor servicio en New Castle, Delaware.',
    onSiteConcierge: 'En Persona en New Castle, DE',
  },
  reviews: {
    badge: 'OPINIONES DE CLIENTES VERIFICADAS',
    title: 'LO QUE DICEN NUESTROS CLIENTES',
    subtitle: 'Lea testimonios reales de conductores locales y de otros estados que ahorraron miles de dólares en Blackshire Motors.',
    verifiedRatings: 'Calificación Verificada de 4.8 / 5.0 Estrellas',
    googleCargurus: 'Reseñas en Google, CarGurus y DealerRater',
    allReviews: 'Todas las Reseñas',
  },
  faq: {
    badge: 'PREGUNTAS FRECUENTES',
    title: 'TODO LO QUE NECESITA SABER',
    subtitle: 'Respuestas claras sobre el 0% de impuestos en Delaware, financiamiento, retoma de autos e inspecciones.',
  },
  contact: {
    showroomBadge: 'SALA DE VENTAS EN NEW CASTLE, DE',
    visitShowroom: 'VISITE NUESTRO LOTE Y SALA DE EXHIBICIÓN',
    locationDesc: 'Convenientemente ubicado sobre la Ruta 13 (S Dupont Hwy) en New Castle, Delaware. A solo 10 minutos de Wilmington y minutos de la I-95 e I-295.',
    showroomServiceCenter: 'SALA DE EXHIBICIÓN Y TALLER',
    taxHavenNote: 'Destino Libre de Impuesto sobre Ventas',
    openGoogleMaps: 'Abrir Ruta en Google Maps',
    directLines: 'TELÉFONOS DIRECTOS',
    directGuidance: 'Llámenos para consultar autos disponibles o agendar pruebas de manejo',
    hoursOfOperation: 'HORARIOS DE ATENCIÓN',
    monSatSchedule: 'Lunes a Sábado: 10:00 AM – 7:00 PM',
    sundaySchedule: 'Domingo: Cerrado (Citas Privadas Disponibles)',
    outOfStateNote: 'Para compradores de otros estados: otorgamos placas de tránsito temporal de 30 días para que maneje a casa con total tranquilidad legal.',
    inquiryReceived: 'SOLICITUD RECIBIDA',
    thankYouTitle: 'MUCHAS GRACIAS',
    sendAnother: 'ENVIAR OTRA CONSULTA',
    formBadge: 'ATENCIÓN AL CLIENTE',
    formTitle: 'AGENDE SU PRUEBA DE MANEJO O CONSULTA',
    inquiryCategory: 'CATEGORÍA DE CONSULTA',
    catTestDrive: 'Agendar Prueba de Manejo',
    catFinance: 'Consulta de Financiamiento y Precalificación',
    catTradeIn: 'Valuación de mi Auto Usado',
    catRepair: 'Presupuesto de Taller Mecánico',
    catGeneral: 'Pregunta General sobre el Inventario',
    fullName: 'NOMBRE COMPLETO',
    phoneNumber: 'NÚMERO DE TELÉFONO',
    emailAddress: 'CORREO ELECTRÓNICO',
    prefDateTime: 'FECHA Y HORA PREFERIDA',
    vehicleOfInterest: 'VEHÍCULO DE INTERÉS',
    additionalNotes: 'NOTAS ADICIONALES O PREGUNTAS',
    notesPlaceholder: 'Mencione detalles de su auto en parte de pago, preferencias de pago o preguntas específicas...',
    submitInquiryBtn: 'ENVIAR SOLICITUD DE CONTACTO',
  },
  footer: {
    description: 'Concesionario independiente de autos de lujo y seminuevos certificados en New Castle, DE. Disfrute del 0% de impuesto sobre ventas de Delaware y taller certificado.',
    delawareTaxTitle: 'Paraíso Fiscal 0% Delaware',
    taxSavingsNote: 'Ahorre de $1,200 a $4,000+ vs PA, NJ y MD',
    inventoryCol: 'INVENTARIO DESTACADO',
    servicesCol: 'CONCESIONARIO Y TALLER',
    locationCol: 'UBICACIÓN Y CONTACTO',
    linkSedans: 'Sedanes de Lujo',
    linkTrucks: 'Camionetas 4x4 y HEMI',
    linkSuvs: 'SUVs Familiares',
    linkUnder20k: 'Menos de $20,000',
    linkCarfax: 'Autos con CARFAX Limpio',
    linkFinancing: 'Calculadora de Préstamo',
    linkTrade: 'Valuación de Trade-In',
    linkInspection: 'Inspección de 150 Puntos',
    linkBrakes: 'Frenos y Alineación',
    linkClientCare: 'Programa Vitalicio de Cliente',
    monSatHours: 'Lun - Sáb: 10:00 AM - 7:00 PM',
    allRightsReserved: 'TODOS LOS DERECHOS RESERVADOS',
    auditStandards: 'Auditoría y Normas del Concesionario',
    licensedDealer: 'CONCESIONARIO INDEPENDIENTE LICENCIADO EN DELAWARE',
  },
};

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  t: Translations;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lang, setLangState] = useState<Language>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('blackshire_lang') as Language | null;
      if (saved === 'en' || saved === 'es') return saved;
      if (navigator.language.startsWith('es')) return 'es';
    }
    return 'en';
  });

  const setLang = (newLang: Language) => {
    setLangState(newLang);
    if (typeof window !== 'undefined') {
      localStorage.setItem('blackshire_lang', newLang);
      document.documentElement.lang = newLang;
    }
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      document.documentElement.lang = lang;
    }
  }, [lang]);

  const t = lang === 'es' ? ES_TRANSLATIONS : EN_TRANSLATIONS;

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return ctx;
};
