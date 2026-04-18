import FooterOne from "@/components/layout/footers/FooterOne";
import FooterTwo from "@/components/layout/footers/FooterTwo";
import Header1 from "@/components/layout/header/Header1";
import Header3 from "@/components/layout/header/Header3";
import ContactForm from "@/components/pages/contact/ContactForm";
import Locations from "@/components/pages/contact/Locations";
import Map from "@/components/pages/contact/Map";
import React from "react";

export const metadata = {
  title: "Contact || Golf colour tour - Travel & Tour",
  description:
    "Get in touch with Golf colour tour for inquiries, bookings, and information about guided tuk-tuk tours in Lisbon and Portugal.",
};

export default function page() {
  return (
    <>
      <main>
        <Header3 />
        {/* <Map /> */}
        {/* <Locations /> */}
        <div className="mt-50">
          <ContactForm />
        </div>

        <FooterTwo />
      </main>
    </>
  );
}
