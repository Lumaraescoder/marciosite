import FooterOne from "@/components/layout/footers/FooterOne";
import FooterTwo from "@/components/layout/footers/FooterTwo";
import Header1 from "@/components/layout/header/Header1";
import Header3 from "@/components/layout/header/Header3";
import Content from "@/components/pages/terms/Content";
import PageHeader from "@/components/pages/terms/PageHeader";
import React from "react";

export const metadata = {
  title: "Terms & Conditions || Golf colour tour - Travel & Tour",
  description:
    "Read the Terms and Conditions of Golf colour tour, your trusted travel and tour platform. Learn about usage, privacy, and booking policies.",
};

export default function page() {
  return (
    <>
      <main>
        <Header3 />
        {/* <PageHeader /> */}
        <Content />
        <FooterTwo />
      </main>
    </>
  );
}
