import FooterOne from "@/components/layout/footers/FooterOne";
import FooterTwo from "@/components/layout/footers/FooterTwo";
import Header1 from "@/components/layout/header/Header1";
import Header3 from "@/components/layout/header/Header3";
import Login from "@/components/pages/Login";
import React from "react";

export const metadata = {
  title: "Login || Golf colour tour - Travel & Tour",
  description:
    "Log in to your Golf colour tour account to manage bookings and explore guided tuk-tuk tours in Lisbon and Portugal.",
};

export default function page() {
  return (
    <>
      <main>
        <Header3 />
        {/* <Login /> */}
        <FooterTwo />
      </main>
    </>
  );
}
