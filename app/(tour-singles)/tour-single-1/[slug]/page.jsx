import FooterTwo from "@/components/layout/footers/FooterTwo";
import Header3 from "@/components/layout/header/Header3";
import PageHeader from "@/components/tourSingle/PageHeader";
import TourSlider from "@/components/tourSingle/TourSlider";
import SingleOne from "@/components/tourSingle/pages/SingleOne";
import TestimonialsThree from "@/components/homes/testimonials/TestimonialsThree";
import { allTour } from "@/data/tours";

// ✅ Metadata DINÂMICA com FALLBACK SEGURO
export async function generateMetadata({ params }) {
  const { slug } = params; // ✅ MUDADO: id → slug

  // ✅ Busca pelo SLUG - se não achar o tour, usa o primeiro
  const tour = allTour.find((item) => item.slug === slug) || allTour[0];

  // ✅ Se nem allTour[0] existir, usa valores padrão
  if (!tour) {
    return {
      title: "Tour Not Found | Tuk-Tuk Tours Lisbon",
      description: "Discover amazing tuk-tuk tours in Lisbon, Portugal.",
    };
  }

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const canonicalUrl = `${baseUrl}/tour-single-1/${tour.slug}`;

  return {
    title: tour.metaTitle || `${tour.title} | Tuk-Tuk Tours Lisbon`,
    description:
      tour.metaDescription ||
      tour.overview?.description ||
      "Discover amazing tuk-tuk tours in Lisbon, Portugal.",
    keywords:
      tour.keywords?.join(", ") || "lisbon tour, tuk-tuk, portugal tourism",

    // ✅ Open Graph com fallbacks
    openGraph: {
      title: tour.metaTitle || tour.title,
      description:
        tour.metaDescription ||
        tour.overview?.description ||
        "Discover amazing tuk-tuk tours in Lisbon, Portugal.",
      images: [
        {
          url: tour.imageSrc || "/img/default-tour.jpg",
          width: 1200,
          height: 630,
          alt: tour.imageAlt || tour.title,
        },
        ...(tour.gallery?.map((img) => ({
          url: img.image,
          width: 800,
          height: 600,
          alt: img.alt || tour.title,
        })) || []),
      ],
      url: canonicalUrl,
      type: "website",
      siteName: "Tuk-Tuk Tours Lisbon",
      locale: "en_US",
    },

    // ✅ Twitter Card com fallbacks
    twitter: {
      card: "summary_large_image",
      title: tour.metaTitle || tour.title,
      description:
        tour.metaDescription ||
        tour.overview?.description ||
        "Discover amazing tuk-tuk tours in Lisbon, Portugal.",
      images: [tour.imageSrc || "/img/default-tour.jpg"],
      site: "@tuktuklisbon",
      creator: "@tuktuklisbon",
    },

    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },

    alternates: {
      canonical: canonicalUrl,
    },

    verification: {
      google: "your-google-verification-code",
    },
  };
}

// ✅ Structured Data com fallbacks
function addTourJsonLd(tour) {
  if (!tour) return { __html: "{}" };

  return {
    __html: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "TouristAttraction",
      name: tour.title,
      description:
        tour.metaDescription ||
        tour.overview?.description ||
        "Discover amazing tuk-tuk tours in Lisbon, Portugal.",
      image: [tour.imageSrc, ...(tour.gallery?.map((img) => img.image) || [])],
      address: {
        "@type": "PostalAddress",
        addressLocality: tour.location,
        addressCountry: "PT",
      },
      offers: {
        "@type": "Offer",
        price: tour.price,
        priceCurrency: "EUR",
        availability: "https://schema.org/InStock",
        validFrom: new Date().toISOString().split("T")[0],
      },
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: tour.rating,
        reviewCount: tour.ratingCount,
        bestRating: "5",
        worstRating: "1",
      },
      touristType: tour.feature,
      duration: tour.duration,
      includes: tour.included || [],
      meetingPoint: tour.meetingPoint,
      availableLanguage: tour.languages || ["English", "Portuguese"],
    }),
  };
}

// ✅ Componente principal com FALLBACK SEGURO
export default function Page({ params }) {
  const { slug } = params; // ✅ MUDADO: id → slug

  // ✅ Busca pelo SLUG
  const tour = allTour.find((item) => item.slug === slug) || allTour[0];

  // ✅ Se nem allTour[0] existir, mostra página de erro
  if (!tour) {
    return (
      <main>
        <Header3 />
        <div className="container text-center py-20">
          <h1>Tour Not Found</h1>
          <p>The requested tour could not be found.</p>
          <a
            href="/tours"
            className="button -md -dark-1 bg-accent-1 text-white"
          >
            Browse All Tours
          </a>
        </div>
        <FooterTwo />
      </main>
    );
  }

  return (
    <>
      {/* ✅ Structured Data para SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={addTourJsonLd(tour)}
      />

      <main>
        <Header3 />
        <PageHeader />
        <div className="mb-50">
          <SingleOne tour={tour} />
        </div>
        <TestimonialsThree />
        <TourSlider />

        <FooterTwo />
      </main>
    </>
  );
}
