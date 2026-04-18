// Itinerário específico para o tour de Alfama
export const roadmapAlfama = [
  { id: 1, icon: "icon-pin", title: "Encontro na Praça do Comércio", content: "Ponto de partida no coração de Lisboa, com apresentação do guia e breve introdução sobre Alfama." },
  { id: 2, title: "Passeio pelas ruas históricas de Alfama", content: "Exploração das vielas, becos e escadarias típicas, sentindo a atmosfera autêntica do bairro mais antigo de Lisboa." },
  { id: 3, title: "Parada no Miradouro de Santa Luzia", content: "Vista panorâmica sobre Alfama e o rio Tejo, com tempo para fotos e explicação sobre a história local." },
  { id: 4, title: "Visita à Sé Catedral de Lisboa", content: "Conheça a catedral mais antiga da cidade e descubra curiosidades sobre sua construção e importância." },
  { id: 5, title: "Experiência de Fado", content: "Breve parada em uma casa de Fado tradicional para sentir a música típica portuguesa (opcional)." },
  { id: 6, title: "Degustação de Ginjinha", content: "Prove o famoso licor de ginja em um comércio local, tradição lisboeta." },
  { id: 7, icon: "icon-flag", title: "Fim do tour em Alfama", content: "O passeio termina em um dos miradouros ou retorna ao ponto inicial, conforme preferência do grupo." },
];
export const included = [
  { id: 1, text: "Tuk-tuk city transportation" },
  { id: 2, text: "Pickup and drop-off at hotel, cruise ship or agreed location" },
  { id: 3, text: "Local tour guide" },
  { id: 4, text: "Stops at tourist spots and viewpoints" },
];

export const excluded = [
  { id: 5, text: "Tips" },
  { id: 6, text: "Tickets for paid attractions" },
  { id: 7, text: "Drinks or snacks" },
];

export const roadmapData = [
  { id: 1, icon: "icon-pin", title: "Day 1: Pickup at agreed location" },
  {
    id: 2,
    title: "Tuk-tuk tour through historic neighborhoods",
    content:
      "Explore the city with stops at viewpoints and historic neighborhoods. Enjoy amazing photo opportunities while the guide shares interesting facts.",
  },
  { id: 3, title: "Strategic photo stops" },
  { id: 4, title: "Cultural and historical exploration" },
  { id: 5, title: "Discover authentic local spots" },
  { id: 6, title: "Riverside tour" },
  { id: 7, icon: "icon-flag", title: "End of tour and drop-off" },
];

export const roadmapData2 = [
  {
    id: 1,
    icon: "icon-pin",
    title: "Pickup at agreed location",
    content:
      "We pick you up wherever you are: hotel, cruise ship, or another agreed location. Let's explore the city stress-free!",
  },
  {
    id: 2,
    title: "City tour",
    content:
      "Pass through historic neighborhoods, famous squares, and charming streets while the guide explains stories and curiosities.",
  },
  {
    id: 3,
    title: "Strategic stops",
    content:
      "Take photos at viewpoints and discover secret corners of the city.",
  },
  {
    id: 4,
    title: "Cultural exploration",
    content:
      "Learn interesting facts about Lisbon and its culture while having fun on the tuk-tuk.",
  },
  {
    id: 5,
    title: "Discover authentic locations",
    content:
      "Explore typical streets and neighborhoods, with time for photos and short walks.",
  },
  {
    id: 6,
    title: "Riverside tour",
    content:
      "Enjoy views of the Tagus River and famous viewpoints with commentary from the guide.",
  },
  {
    id: 7,
    icon: "icon-flag",
    title: "End of tour",
    content:
      "The tour ends at the starting point or another agreed location.",
  },
];

export const faqData = [
  {
    question: "Do you pick me up wherever I am?",
    answer:
      "Yes! We can pick you up at any hotel, cruise ship, or agreed location in Greater Lisbon.",
  },
  {
    question: "Can I cancel and get a refund?",
    answer:
      "To receive a full refund, please cancel at least 24 hours before the tour starts.",
  },
  {
    question: "Can I change the tour date?",
    answer:
      "Yes, changes are possible as long as you notify us at least 24 hours in advance.",
  },
  {
    question: "Where does the tour end?",
    answer:
      "We can drop you off at the starting point or another agreed location.",
  },
];

export const overallRatingData = [
  {
    id: 1,
    category: "Overall Rating",
    icon: "icon-star-2",
    rating: "5.0",
    comment: "Excellent",
  },
  {
    id: 2,
    category: "Location",
    icon: "icon-pin-2",
    rating: "5.0",
    comment: "Excellent",
  },
  {
    id: 3,
    category: "Tuk-Tuk Comfort",
    icon: "icon-application",
    rating: "5.0",
    comment: "Excellent",
  },
  {
    id: 4,
    category: "Tour Guide",
    icon: "icon-online-support-2",
    rating: "5.0",
    comment: "Excellent",
  },
  {
    id: 5,
    category: "Price",
    icon: "icon-price-tag",
    rating: "5.0",
    comment: "Excellent",
  },
];

export const reviews = [
  {
    id: 1,
    avatar: "/img/reviews/avatars/1.png",
    name: "Maria Silva",
    date: "October 2024",
    stars: 5,
    reviewText: "Amazing tuk-tuk tour!",
    desc: `A fun way to explore Lisbon. The guide was very friendly and took us to incredible spots, including secret viewpoints.`,
    images: [
      "/img/reviews/1/1.png",
      "/img/reviews/1/2.png",
      "/img/reviews/1/3.png",
    ],
  },
  {
    id: 2,
    avatar: "/img/reviews/avatars/1.png",
    name: "João Pereira",
    date: "November 2024",
    stars: 5,
    reviewText: "Highly recommended!",
    desc: `We saw the city in a relaxed way, learned local curiosities, and had plenty of time for photos at amazing spots.`,
    images: [
      "/img/reviews/1/1.png",
      "/img/reviews/1/2.png",
      "/img/reviews/1/3.png",
    ],
  },
];

export const times = [
  "09:00",
  "10:00",
  "11:00",
  "12:00",
  "14:00",
  "15:00",
  "16:00",
];
