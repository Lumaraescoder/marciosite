import ScrollToTop from "@/components/common/ScrollToTop";
import "../public/css/style.css";
import { DM_Sans } from "next/font/google";
import ScrollTopBehaviour from "@/components/common/ScrollTopBehavier";
import Wrapper from "@/components/layout/Wrapper";
import Script from "next/script";
import { LanguageProvider } from "../hooks/useLang";

const dmsans = DM_Sans({
  weight: ["400", "500", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
});

if (typeof window !== "undefined") {
  import("bootstrap");
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* PRECONNECT PARA PERFORMANCE */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />
        <link rel="dns-prefetch" href="https://connect.facebook.net" />

        {/* HREFLANG TAGS (mesma URL para todas as línguas) */}
        <link rel="alternate" hrefLang="x-default" href="https://www.golfcolortour.com/" />
        <link rel="alternate" hrefLang="en" href="https://www.golfcolortour.com/" />
        <link rel="alternate" hrefLang="pt" href="https://www.golfcolortour.com/" />
        <link rel="alternate" hrefLang="es" href="https://www.golfcolortour.com/" />
        <link rel="alternate" hrefLang="fr" href="https://www.golfcolortour.com/" />
        <link rel="alternate" hrefLang="de" href="https://www.golfcolortour.com/" />

        {/* SCHEMA.ORG: LOCAL BUSINESS */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "TouristAttractionService",
              "@id": "https://www.golfcolortour.com/#business",
              "name": "Golf Color Tour",
              "alternateName": "Golf Color Tuk Tuk Tours Lisbon",
              "description": "Premium Tuk Tuk tour company offering personalized guided tours through Lisbon's most iconic neighborhoods, historic sites, and panoramic viewpoints.",
              "url": "https://www.golfcolortour.com",
              "logo": {
                "@type": "ImageObject",
                "url": "https://www.golfcolortour.com/img/general/generallogo.png",
                "width": 256,
                "height": 256
              },
              "image": [
                "https://www.golfcolortour.com/img/general/generallogo.png",
                "https://www.golfcolortour.com/img/general/generallogo.png"
              ],
              "priceRange": "€€",
              "telephone": "+351928346074",
              "email": "info@golfcolortour.com",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "Rua Example, 123",
                "addressLocality": "Lisboa",
                "addressRegion": "Lisboa",
                "postalCode": "1000-000",
                "addressCountry": "PT"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": "38.7223",
                "longitude": "-9.1393"
              },
              "openingHoursSpecification": [
                {
                  "@type": "OpeningHoursSpecification",
                  "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
                  "opens": "09:00",
                  "closes": "19:00"
                }
              ],
              "sameAs": [
                "https://www.instagram.com/golfcolor.tuk/",
                "https://www.getyourguide.com/golf-color-tour-s423513/",
                "https://www.facebook.com/profile.php?id=61585111760542"
              ],
              "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "4.9",
                "reviewCount": "150",
                "bestRating": "5",
                "worstRating": "1"
              }
            })
          }}
        />

        {/* SCHEMA.ORG: FAQ */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              "mainEntity": [
                {
                  "@type": "Question",
                  "name": "How long is a typical Tuk Tuk tour in Lisbon?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Our Tuk Tuk tours range from 1 to 4 hours depending on the route. Most popular tours are 2-3 hours, covering major attractions like Alfama, Belém, and panoramic viewpoints."
                  }
                },
                {
                  "@type": "Question",
                  "name": "How many people fit in a Tuk Tuk?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Each Tuk Tuk comfortably accommodates up to 6 passengers, perfect for families or small groups."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Do you offer private Tuk Tuk tours?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Yes! All our tours are private with flexible routes and personalized experiences."
                  }
                }
              ]
            })
          }}
        />

        {/* SCHEMA.ORG: WEBSITE */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "Golf Color Tour",
              "url": "https://www.golfcolortour.com/",
              "description": "Premium Tuk Tuk tours in Lisbon",
              "publisher": {
                "@type": "Organization",
                "name": "Golf Color Tour"
              },
              "inLanguage": ["en", "pt", "es", "fr", "de"]
            })
          }}
        />

        {/* SCHEMA.ORG: ORGANIZATION */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Golf Color Tour",
              "url": "https://www.golfcolortour.com",
              "logo": "https://www.golfcolortour.com/img/general/semfundo.png",
              "sameAs": [
                "https://www.instagram.com/golfcolor.tuk/",
                "https://www.getyourguide.com/golf-color-tour-s423513/",
                "https://www.facebook.com/profile.php?id=61585111760542"
              ],
              "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "+351-929-130-155",
                "contactType": "customer service",
                "areaServed": "PT",
                "availableLanguage": ["Portuguese", "English", "Spanish", "French", "German"]
              }
            })
          }}
        />

        {/* GOOGLE TAG MANAGER */}
        <Script id="gtm-head" strategy="afterInteractive">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-XXXXXXX');
          `}
        </Script>

        {/* GOOGLE ADS */}
        <Script
          id="google-ads"
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=AW-17724680705"
        />
        <Script id="google-ads-config" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'AW-17724680705');
          `}
        </Script>

        {/* MICROSOFT CLARITY */}
        <Script id="clarity" strategy="afterInteractive">
          {`(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);})(window,document,"clarity","script","u7wx9vttyd");`}
        </Script>
      </head>

      <body className={dmsans.className}>
        <noscript>
          <iframe src="https://www.googletagmanager.com/ns.html?id=GTM-XXXXXXX" height="0" width="0" style={{ display: "none", visibility: "hidden" }}></iframe>
        </noscript>

        {/* GOOGLE ANALYTICS 4 - DUAL TAGS */}
        {/* Carrega o script do GTAG para ambas as tags */}
        <Script strategy="afterInteractive" src="https://www.googletagmanager.com/gtag/js?id=G-B98K5YT6R5" />
        <Script id="ga4" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            
            // Configura ambas as propriedades do GA4
            gtag('config', 'G-B98K5YT6R5');  // Tag original
            gtag('config', 'G-01Q654Z3WN');  // Nova tag
          `}
        </Script>

        {/* FACEBOOK PIXEL */}
        <Script id="fb-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', 'SEU_PIXEL_ID_AQUI');
            fbq('track', 'PageView');
          `}
        </Script>

        {/* TIKTOK PIXEL */}
        <Script id="tiktok-pixel" strategy="afterInteractive">
          {`
            !function(w,d,t){w.TiktokAnalyticsObject=t;var ttq=w[t]=w[t]||[];ttq.methods=["page","track","identify","instances","debug","on","off","once","ready","alias","group","enableCookie","disableCookie"];ttq.setAndDefer=function(t,e){t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}};for(var i=0;i<ttq.methods.length;i++)ttq.setAndDefer(ttq,ttq.methods[i]);ttq.instance=function(t){for(var e=ttq._i[t]||[],n=0;n<ttq.methods.length;n++)ttq.setAndDefer(e,ttq.methods[n]);return e};ttq.load=function(e,n){var i="https://analytics.tiktok.com/i18n/pixel/events.js";ttq._i=ttq._i||{},ttq._i[e]=[],ttq._i[e]._u=i;var o=document.createElement("script");o.type="text/javascript",o.async=!0,o.src=i+"?sdkid="+e+"&lib="+t;var a=document.getElementsByTagName("script")[0];a.parentNode.insertBefore(o,a)};ttq.load('SEU_TIKTOK_PIXEL_AQUI');ttq.page()}(window,document,'ttq');
          `}
        </Script>

        <LanguageProvider>
          <Wrapper>{children}</Wrapper>
          <ScrollToTop />
          <ScrollTopBehaviour />
        </LanguageProvider>
      </body>
    </html>
  );
}