import Invoice from "@/components/Invoice";
import React from "react";

export const metadata = {
  title: "Invoice || Golf colour tour - Travel & Tour",
  description:
    "View and manage your Golf colour tour invoices for bookings and guided tuk-tuk tours in Lisbon and across Portugal.",
};

export default function page() {
  return (
    <>
      <main>
        <Invoice />
      </main>
    </>
  );
}
