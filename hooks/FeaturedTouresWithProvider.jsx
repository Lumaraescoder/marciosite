"use client";
import { LanguageProvider } from "../hooks/useLang";
import FeaturedToures from "@/components/homes/tours/FeaturedToures";

export default function FeaturedTouresWithProvider() {
  return (
    <LanguageProvider>
      <FeaturedToures />
    </LanguageProvider>
  );
}
