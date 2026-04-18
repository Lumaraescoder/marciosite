"use client";
import PopulerDestinations from "@/components/homes/destinations/PopulerDestinations";
import { LanguageProvider } from "../hooks/useLang";

export default function PopulerDestinationsTranslated() {
  return (
    <LanguageProvider>
      <PopulerDestinations />
    </LanguageProvider>
  );
}
