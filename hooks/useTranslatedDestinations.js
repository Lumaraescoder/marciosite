"use client";
import { destinationsFive } from "@/data/destinations";
import { useTranslation } from "./useLang";

export function useTranslatedDestinations() {
 const { t } = useTranslation();

 const translatedDestinations = destinationsFive.map(destination => ({
  ...destination,
  title: t(`destination${destination.id}_title`) || destination.title
 }));

 return translatedDestinations;
}