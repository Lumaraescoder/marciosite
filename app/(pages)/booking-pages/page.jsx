import FooterOne from "@/components/layout/footers/FooterOne";
import FooterTwo from "@/components/layout/footers/FooterTwo";
import Header1 from "@/components/layout/header/Header1";
import Header3 from "@/components/layout/header/Header3";
import BookingPages from "@/components/pages/BookingPages";
import React from "react";

export const metadata = {
  title: "Booking Page || Golf colour tour - Travel & Tour",
  description:
    "Book your guided tuk-tuk tours in Lisbon and Portugal with Golf colour tour. Choose your date, time, and tour options easily online.",
};

export default function page() {
  return (
    <>
      <main>
        <Header3 />
        <BookingPages />
        <FooterTwo />
      </main>
    </>
  );
}
