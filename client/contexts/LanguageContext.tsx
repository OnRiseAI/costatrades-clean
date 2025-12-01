"use client";

import { createContext, useContext, useState, ReactNode } from "react";

export type Language = "en" | "es" | "de";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined,
);

export const translations = {
  en: {
    // Navigation
    "nav.findTrades": "Find Trades",
    "nav.howItWorks": "How it Works",
    "nav.forTradespeople": "For Professionals",
    "nav.blog": "Blog",
    "nav.login": "Login",
    "nav.signup": "Sign Up",

    // Hero
    "hero.title": "Costa del Sol's Home of Trusted Professionals",
    "hero.subtitle":
      "Connect with verified, reliable professionals for all your home improvement needs. Read reviews, compare quotes, and hire with confidence.",
    "hero.searchPlaceholder": "What trade do you need?",
    "hero.locationPlaceholder": "Where in Costa del Sol?",
    "hero.searchButton": "Search",

    // How it Works
    "how.title": "How It Works",
    "how.step1.title": "Search",
    "how.step1.desc":
      "Browse by trade or location to find the perfect professional",
    "how.step2.title": "Compare",
    "how.step2.desc": "Read verified reviews and view past work",
    "how.step3.title": "Hire",
    "how.step3.desc":
      "Request quotes and choose the best specialist for your job",

    // Categories
    "categories.title": "Popular Trade Categories",
    "categories.viewAll": "View All Categories",
    "category.poolMaintenance": "Pool Services",
    "category.airConditioning": "Air Con",
    "category.plumbers": "Plumbers",
    "category.electricians": "Electricians",
    "category.builders": "Builders & Renovations",
    "category.painters": "Painters & Decorators",
    "category.locksmiths": "Locksmiths",
    "category.gardeners": "Gardeners & Landscaping",
    "category.pestControl": "Pest Control",
    "category.propertyMaintenance": "Property Maintenance",
    "category.cleaning": "Cleaning Services",
    "category.handyman": "Handyman Services",

    // Stats
    "stats.tradespeople": "Verified Specialists",
    "stats.reviews": "Customer Reviews",
    "stats.jobs": "Jobs Completed",

    // Reviews
    "reviews.title": "What Our Customers Say",
    "reviews.verified": "Verified Job",

    // CTA
    "cta.homeowner.title": "Need a Professional?",
    "cta.homeowner.desc":
      "Post your job and receive quotes from verified professionals",
    "cta.homeowner.button": "Get Quotes Now",
    "cta.tradesperson.title": "Are You a Service Pro?",
    "cta.tradesperson.desc":
      "Join TradeFinder Costa del Sol and grow your business with quality leads",
    "cta.tradesperson.button": "Join Now",

    // Footer
    "footer.about": "About",
    "footer.contact": "Contact",
    "footer.terms": "Terms of Service",
    "footer.privacy": "Privacy Policy",
    "footer.help": "Help",
    "footer.allRights": "All rights reserved.",

    // Common
    "common.viewProfile": "View Profile",
    "common.readMore": "Read More",
    "common.professionals": "professionals",
    "common.rating": "Rating",
    "common.reviews": "Reviews",
  },
  es: {
    // Navigation
    "nav.findTrades": "Encontrar Profesionales",
    "nav.howItWorks": "Cómo Funciona",
    "nav.forTradespeople": "Para Profesionales",
    "nav.blog": "Blog",
    "nav.login": "Iniciar Sesi��n",
    "nav.signup": "Registrarse",

    // Hero
    "hero.title": "Encuentra Profesionales de Confianza en la Costa del Sol",
    "hero.subtitle":
      "Conecta con profesionales verificados y confiables para todas tus necesidades de mejoras del hogar. Lee reseñas, compara presupuestos y contrata con confianza.",
    "hero.searchPlaceholder": "¿Qué profesional necesitas?",
    "hero.locationPlaceholder": "¿Dónde en Costa del Sol?",
    "hero.searchButton": "Buscar",

    // How it Works
    "how.title": "Cómo Funciona",
    "how.step1.title": "Buscar",
    "how.step1.desc":
      "Navega por profesión o ubicación para encontrar el profesional perfecto",
    "how.step2.title": "Comparar",
    "how.step2.desc": "Lee reseñas verificadas y ve trabajos anteriores",
    "how.step3.title": "Contratar",
    "how.step3.desc":
      "Solicita presupuestos y elige el mejor profesional para tu trabajo",

    // Categories
    "categories.title": "Categorías Populares",
    "categories.viewAll": "Ver Todas las Categorías",
    "category.poolMaintenance": "Mantenimiento y Reparación de Piscinas",
    "category.airConditioning": "Aire Acondicionado",
    "category.plumbers": "Fontaneros",
    "category.electricians": "Electricistas",
    "category.builders": "Constructores y Reformas",
    "category.painters": "Pintores y Decoradores",
    "category.locksmiths": "Cerrajeros",
    "category.gardeners": "Jardineros y Paisajismo",
    "category.pestControl": "Control de Plagas",
    "category.propertyMaintenance": "Mantenimiento de Propiedades",
    "category.cleaning": "Servicios de Limpieza",
    "category.handyman": "Servicios de Mantenimiento General",

    // Stats
    "stats.tradespeople": "Profesionales Verificados",
    "stats.reviews": "Reseñas de Clientes",
    "stats.jobs": "Trabajos Completados",

    // Reviews
    "reviews.title": "Lo Que Dicen Nuestros Clientes",
    "reviews.verified": "Trabajo Verificado",

    // CTA
    "cta.homeowner.title": "¿Necesitas un Profesional?",
    "cta.homeowner.desc":
      "Publica tu trabajo y recibe presupuestos de profesionales verificados",
    "cta.homeowner.button": "Obtener Presupuestos",
    "cta.tradesperson.title": "¿Eres un Profesional?",
    "cta.tradesperson.desc":
      "Únete a TradeFinder Costa del Sol y haz crecer tu negocio con clientes de calidad",
    "cta.tradesperson.button": "Únete Ahora",

    // Footer
    "footer.about": "Acerca de",
    "footer.contact": "Contacto",
    "footer.terms": "Términos de Servicio",
    "footer.privacy": "Política de Privacidad",
    "footer.help": "Ayuda",
    "footer.allRights": "Todos los derechos reservados.",

    // Common
    "common.viewProfile": "Ver Perfil",
    "common.readMore": "Leer Más",
    "common.professionals": "profesionales",
    "common.rating": "Calificación",
    "common.reviews": "Reseñas",
  },
  de: {
    // Navigation
    "nav.findTrades": "Handwerker Finden",
    "nav.howItWorks": "So Funktioniert's",
    "nav.forTradespeople": "Für Handwerker",
    "nav.blog": "Blog",
    "nav.login": "Anmelden",
    "nav.signup": "Registrieren",

    // Hero
    "hero.title":
      "Finden Sie Vertrauenswürdige Handwerker an der Costa del Sol",
    "hero.subtitle":
      "Verbinden Sie sich mit verifizierten, zuverlässigen Fachleuten für alle Ihre Heimwerkerbedürfnisse. Lesen Sie Bewertungen, vergleichen Sie Angebote und beauftragen Sie mit Vertrauen.",
    "hero.searchPlaceholder": "Welchen Handwerker brauchen Sie?",
    "hero.locationPlaceholder": "Wo an der Costa del Sol?",
    "hero.searchButton": "Suchen",

    // How it Works
    "how.title": "So Funktioniert's",
    "how.step1.title": "Suchen",
    "how.step1.desc":
      "Durchsuchen Sie nach Handwerk oder Standort, um den perfekten Fachmann zu finden",
    "how.step2.title": "Vergleichen",
    "how.step2.desc":
      "Lesen Sie verifizierte Bewertungen und sehen Sie frühere Arbeiten",
    "how.step3.title": "Beauftragen",
    "how.step3.desc":
      "Fordern Sie Angebote an und wählen Sie den besten Handwerker für Ihren Auftrag",

    // Categories
    "categories.title": "Beliebte Handwerkskategorien",
    "categories.viewAll": "Alle Kategorien Anzeigen",
    "category.poolMaintenance": "Poolwartung & Reparatur",
    "category.airConditioning": "Klimaanlage",
    "category.plumbers": "Klempner",
    "category.electricians": "Elektriker",
    "category.builders": "Baumeister & Renovierungen",
    "category.painters": "Maler & Dekorateure",
    "category.locksmiths": "Schlosser",
    "category.gardeners": "Gärtner & Landschaftsbau",
    "category.pestControl": "Schädlingsbekämpfung",
    "category.propertyMaintenance": "Immobilienwartung",
    "category.cleaning": "Reinigungsdienste",
    "category.handyman": "Handyman-Dienste",

    // Stats
    "stats.tradespeople": "Verifizierte Handwerker",
    "stats.reviews": "Kundenbewertungen",
    "stats.jobs": "Abgeschlossene Aufträge",

    // Reviews
    "reviews.title": "Was Unsere Kunden Sagen",
    "reviews.verified": "Verifizierter Auftrag",

    // CTA
    "cta.homeowner.title": "Brauchen Sie einen Handwerker?",
    "cta.homeowner.desc":
      "Veröffentlichen Sie Ihren Auftrag und erhalten Sie Angebote von verifizierten Fachleuten",
    "cta.homeowner.button": "Jetzt Angebote Erhalten",
    "cta.tradesperson.title": "Sind Sie ein Handwerker?",
    "cta.tradesperson.desc":
      "Treten Sie TradeFinder Costa del Sol bei und wachsen Sie Ihr Geschäft mit Qualitätsaufträgen",
    "cta.tradesperson.button": "Jetzt Beitreten",

    // Footer
    "footer.about": "Über Uns",
    "footer.contact": "Kontakt",
    "footer.terms": "Nutzungsbedingungen",
    "footer.privacy": "Datenschutz",
    "footer.help": "Hilfe",
    "footer.allRights": "Alle Rechte vorbehalten.",

    // Common
    "common.viewProfile": "Profil Ansehen",
    "common.readMore": "Mehr Lesen",
    "common.professionals": "Fachleute",
    "common.rating": "Bewertung",
    "common.reviews": "Bewertungen",
  },
};

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("en");

  const t = (key: string): string => {
    return (
      translations[language][key as keyof (typeof translations)["en"]] || key
    );
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
