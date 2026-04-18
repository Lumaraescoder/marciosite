"use client";
import { tourData } from "@/data/tours";
import { useTranslation } from "./useLang";

export function useTranslatedTours() {
 const { t, lang } = useTranslation();

 // Mapeamento completo dos highlights para keys únicas
 const highlightMap = {
  // Tour 1 - Alfama
  "Guided walk through Alfama's historic streets": "highlight_guided_walk",
  "Discover hidden viewpoints for stunning photos": "highlight_discover_viewpoints",
  "Learn about Lisbon's history and local traditions": "highlight_learn_history",
  "Experience authentic Fado music in a local venue": "highlight_fado_music",

  // Tour 2 - Chiado & Bairro Alto
  "Stroll through the iconic streets of Chiado": "highlight_stroll_streets",
  "Discover local cafes, shops, and art galleries": "highlight_local_cafes",
  "Enjoy panoramic city views from Bairro Alto": "highlight_panoramic_views",
  "Learn about Lisbon's literary and cultural history": "highlight_literary_history",

  // Tour 3 - Belém
  "Visit Jerónimos Monastery and Belém Tower": "highlight_visit_monuments",
  "Taste traditional Portuguese pastries": "highlight_taste_pastries",
  "Walk along the scenic riverfront": "highlight_riverfront_walk",
  "Learn about Portugal's Age of Discoveries": "highlight_age_discoveries",

  // Tour 4 - Lisbon Full Day
  "Full-day guided tour across Lisbon's landmarks": "highlight_full_day_tour",
  "Kayak along the Tagus River for a unique perspective": "highlight_kayak_river",
  "See Belém Tower, Jerónimos Monastery, and Praça do Comércio": "highlight_see_landmarks",
  "Discover hidden streets and local culture in Alfama": "highlight_hidden_streets",

  // Tour 5 - Miradouros
  "Stop at top miradouros like Santa Luzia and São Pedro de Alcântara": "highlight_stop_viewpoints",
  "Capture panoramic city and river views": "highlight_capture_views",
  "Learn the history behind each viewpoint": "highlight_viewpoint_history",
  "Enjoy a walking tour with local guide insights": "highlight_walking_tour",

  // Tour 6 - Christmas Lights
  "Explore Lisbon's festive Christmas streets": "highlight_festive_lights",
  "See dazzling light displays in Chiado and Baixa": "highlight_light_displays",
  "Learn about local Christmas customs and traditions": "highlight_christmas_customs",
  "Perfect for evening strolls and photography": "highlight_evening_strolls",

  // Tour 7 - Sintra e Cascais
  "Visit Sintra's palaces and gardens": "highlight_visit_palaces",
  "Explore Cascais' coastal charm": "highlight_coastal_charm",
  "Enjoy scenic views along the route": "highlight_scenic_views",
  "Learn about Portuguese history and architecture": "highlight_architecture",

  // Tour 8 - Fatima, Batalha, Nazare e Obidos
  "Visit the Sanctuary of Fatima": "highlight_sanctuary",
  "Explore Batalha Monastery, a UNESCO site": "highlight_unesco_site",
  "See the stunning coastal views of Nazare": "highlight_coastal_views",
  "Walk through the medieval streets of Obidos": "highlight_medieval_streets"
 };

 const translatedTours = tourData.map(tour => {
  // Traduz os highlights
  const translatedHighlights = tour.overview.highlights.map(highlight => {
   const key = highlightMap[highlight];
   return key ? t(key) : highlight;
  });

  const translatedGroupSizeKey = `tour${tour.id}_group_size_value`;
  const translatedGroupSize = t(translatedGroupSizeKey);
  const groupSizeValue =
   translatedGroupSize === translatedGroupSizeKey
    ? tour.groupSize
    : translatedGroupSize;

  return {
   ...tour,
   title: t(`tour${tour.id}_title`) || tour.title,
   location: t(`tour${tour.id}_location`) || tour.location,
   duration: t(`tour${tour.id}_duration`) || tour.duration,
   groupSize: groupSizeValue,
   overview: {
    ...tour.overview,
    description: t(`tour${tour.id}_description`) || tour.overview.description,
    highlights: translatedHighlights
   }
  };
 });

 return translatedTours;
}
