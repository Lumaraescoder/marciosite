import FooterOne from "@/components/layout/footers/FooterOne";
import FooterTwo from "@/components/layout/footers/FooterTwo";
import Header1 from "@/components/layout/header/Header1";
import Header3 from "@/components/layout/header/Header3";
import Register from "@/components/pages/Register";
import React from "react";

export const metadata = {
  title: "Register || Golf colour tour - Travel & Tour",
  description:
    "Create your account on Golf colour tour and start exploring Lisbon and Portugal with guided tours and tuk-tuk adventures.",
};

export default function page() {
  return (
    <>
      <main>
        <Header3 />
        {/* <Register /> */}
        <FooterTwo />
      </main>
    </>
  );
}
