import React from "react";
import Firstpage from "app/(homes)/home-4/page.jsx";
import { LanguageProvider } from "../hooks/useLang";

export const metadata = {
  // TÍTULOS
  title: {
    default: "Tuk Tuk Tour Lisbon – Exclusive Tours in Lisbon",
    template: "%s | Golf colour tour",
  },

  // DESCRIÇÃO (155-160 caracteres ideal para Google)
  description:
    "Discover Lisbon in a fun and exclusive way with Golf colour tour's Tuk Tuk Tours. Guided tours through the city's main attractions.",

  // KEYWORDS (Expandido e multilíngue)
  keywords: [
    // English
    "Tuk Tuk Lisbon",
    "Lisbon Tuk Tuk tours",
    "Lisbon city tours",
    "private tours Lisbon",
    "guided tours Lisbon",
    "Alfama tours",
    "Belém Lisbon",
    "Lisbon sightseeing",
    "Portugal tourism",
    "things to do Lisbon",
    "Lisbon tourist attractions",
    "eco-friendly tours Lisbon",
    // Português
    "passeios tuk tuk Lisboa",
    "tours Lisboa",
    "visitas guiadas Lisboa",
    "turismo Lisboa",
    // Español
    "tours tuk tuk Lisboa",
    "visitas guiadas Lisboa",
    "turismo Portugal",
    // Brand
    "Golf Color Tour",
    "Golf Colour Tour",
  ],

  // BASE URL (CORRIGIDO - estava com easytuk.pt)
  metadataBase: new URL("https://www.kmhillsadventures.com"),

  // CANONICAL E ALTERNATES (Ajustado para site sem rotas)
  alternates: {
    canonical: "https://www.kmhillsadventures.com/",
    // Se não tem rotas de idioma, remova ou use mesma URL
    languages: {
      "x-default": "https://www.kmhillsadventures.com/",
      en: "https://www.kmhillsadventures.com/",
      pt: "https://www.kmhillsadventures.com/",
      es: "https://www.kmhillsadventures.com/",
      fr: "https://www.kmhillsadventures.com/",
      de: "https://www.kmhillsadventures.com/",
    },
  },

  // ROBOTS
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      maxVideoPreview: -1,
      maxImagePreview: "large",
      maxSnippet: -1,
    },
  },

  // INFORMAÇÕES DO APP
  applicationName: "Golf Color Tour",
  generator: "Next.js",
    authors: [
    {
      name: "Golf Color Tour",
      url: "https://www.kmhillsadventures.com", // CORRIGIDO
    },
  ],
  creator: "Golf Color Tour",
  publisher: "Golf Color Tour",

  // OPEN GRAPH (Facebook, LinkedIn, WhatsApp)
  openGraph: {
    title: "Authentic Tuk Tuk Tours in Lisbon | Golf Color Tour",
    description:
      "Discover Lisbon's hidden gems with expert-guided Tuk Tuk tours. Explore historic neighborhoods, iconic landmarks, and breathtaking viewpoints. Private tours with flexible routes.",
    url: "https://www.kmhillsadventures.com/",
    siteName: "Golf Color Tour",
    locale: "en_US",
    alternateLocale: ["pt_PT", "es_ES", "fr_FR", "de_DE"],
    type: "website",
    images: [
      {
        url: "https://www.kmhillsadventures.com/img/general/generallogo.png",
        width: 1200,
        height: 630,
        alt: "Golf Color Tour Tuk Tuk exploring historic Lisbon streets with tourists",
        type: "image/jpeg",
      },
      {
        url: "https://www.kmhillsadventures.com/img/general/generallogo.png",
        width: 1200,
        height: 1200,
        alt: "Golf Color Tour Tuk Tuk in front of Lisbon landmarks",
        type: "image/jpeg",
      },
    ],
  },

  // TWITTER CARDS
  twitter: {
    card: "summary_large_image",
    site: "@golfcolortour", // ATUALIZAR com handle real
    creator: "@golfcolortour",
    title: "Tuk Tuk Tours Lisbon | Authentic Guided Experiences",
    description:
      "Explore Lisbon's charm with authentic Tuk Tuk experiences. Private tours, expert guides, unforgettable memories. Book now!",
    images: [
      {
        url: "https://www.kmhillsadventures.com/img/general/generallogo.png",
        alt: "Golf Color Tour Tuk Tuk in Lisbon",
      },
    ],
  },

  // ÍCONES E FAVICONS
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    other: [
      { rel: "mask-icon", url: "/safari-pinned-tab.svg", color: "#5bbad5" },
      { rel: "manifest", url: "/site.webmanifest" },
    ],
  },

  // THEME COLOR
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#1a1a1a" },
  ],

  // VERIFICATION CODES
  verification: {
    google: "YOUR_GOOGLE_VERIFICATION_CODE", // SUBSTITUIR pelo código real
    yandex: "YOUR_YANDEX_VERIFICATION_CODE", // Opcional
    bing: "YOUR_BING_VERIFICATION_CODE", // Opcional
  },

  // OUTROS META TAGS
  other: {
    "facebook-domain-verification": "YOUR_FACEBOOK_VERIFICATION_CODE", // Opcional
    "msapplication-TileColor": "#da532c",
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "black-translucent",
    "format-detection": "telephone=no",
  },

  // VIEWPORT
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 5,
    userScalable: true,
  },

  // REFERRER POLICY
  referrer: "origin-when-cross-origin",

  // CATEGORY (para classificação)
  category: "Travel & Tourism",
};

export default function page() {
  return (
    <LanguageProvider>
      <Firstpage />
    </LanguageProvider>
  );
}
