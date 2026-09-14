export type Size = { label: string; price: number };
export type Product = {
  name: string;
  desc: string;
  sizes: Size[];
  category: "Pickles" | "Spices" | "Snacks";
  image: string;
};

export const products: Product[] = [
  {
    name: "Avakaya Pickle",
    category: "Pickles",
    image: "avakaya",
    desc: "Raw mango cured in cold-pressed sesame oil, mustard and Guntur chilli.",
    sizes: [
      { label: "250g", price: 170 },
      { label: "500g", price: 330 },
      { label: "1Kg", price: 650 },
    ],
  },
  {
    name: "Tomato Pickle",
    category: "Pickles",
    image: "tomato",
    desc: "Sun-ripened tomatoes slow-cooked to a deep, tangy preserve.",
    sizes: [
      { label: "250g", price: 160 },
      { label: "500g", price: 310 },
      { label: "1Kg", price: 610 },
    ],
  },
  {
    name: "Gongura Pickle",
    category: "Pickles",
    image: "gongura",
    desc: "Andhra sorrel leaves, hand-ground with garlic for a sharp finish.",
    sizes: [
      { label: "250g", price: 150 },
      { label: "500g", price: 280 },
      { label: "1Kg", price: 560 },
    ],
  },
  {
    name: "Ginger Pickle",
    category: "Pickles",
    image: "ginger",
    desc: "Fresh ginger, tamarind and jaggery balanced the traditional way.",
    sizes: [
      { label: "250g", price: 150 },
      { label: "500g", price: 300 },
      { label: "1Kg", price: 590 },
    ],
  },
  {
    name: "Amla Pickle",
    category: "Pickles",
    image: "amla",
    desc: "Whole gooseberry preserved for its clean, mineral brightness.",
    sizes: [
      { label: "250g", price: 150 },
      { label: "500g", price: 300 },
      { label: "1Kg", price: 590 },
    ],
  },
  {
    name: "Lemon Pickle",
    category: "Pickles",
    image: "lemon",
    desc: "Salt-cured lemons matured slowly in earthen jars.",
    sizes: [{ label: "1Kg", price: 590 }],
  },
  {
    name: "Cauliflower Pickle",
    category: "Pickles",
    image: "cauliflower",
    desc: "Crisp florets, lightly spiced, retaining their natural bite.",
    sizes: [
      { label: "250g", price: 160 },
      { label: "500g", price: 320 },
      { label: "1Kg", price: 630 },
    ],
  },
  {
    name: "Kakarakaya Pickle",
    category: "Pickles",
    image: "kakarakaya-pickle",
    desc: "Bitter gourd tempered with jaggery — an heirloom Andhra recipe.",
    sizes: [
      { label: "250g", price: 160 },
      { label: "500g", price: 320 },
      { label: "1Kg", price: 630 },
    ],
  },
  {
    name: "Masala / Kurra Karam",
    category: "Spices",
    image: "masala-karam",
    desc: "The everyday house blend — roasted, stone-ground, never bleached.",
    sizes: [
      { label: "250g", price: 140 },
      { label: "500g", price: 270 },
      { label: "1Kg", price: 530 },
    ],
  },
  {
    name: "Red Chilli Powder",
    category: "Spices",
    image: "red-chilli",
    desc: "Single-origin Guntur chillies, sun-dried and milled cold.",
    sizes: [
      { label: "250g", price: 140 },
      { label: "500g", price: 270 },
      { label: "1Kg", price: 540 },
    ],
  },
  {
    name: "Nalla Karam / Idly Karam",
    category: "Spices",
    image: "nalla-karam",
    desc: "Black gram and chilli podi built for ghee and hot idly.",
    sizes: [
      { label: "250g", price: 90 },
      { label: "500g", price: 160 },
      { label: "1Kg", price: 320 },
    ],
  },
  {
    name: "Karivepaku Karam",
    category: "Spices",
    image: "karivepaku-karam",
    desc: "Curry leaf podi, roasted in small batches for aroma retention.",
    sizes: [
      { label: "250g", price: 140 },
      { label: "500g", price: 280 },
      { label: "1Kg", price: 560 },
    ],
  },
  {
    name: "Munagaku Karam",
    category: "Spices",
    image: "munagaku-karam",
    desc: "Moringa leaf powder blended with lentils and mild chilli.",
    sizes: [
      { label: "250g", price: 140 },
      { label: "500g", price: 280 },
      { label: "1Kg", price: 560 },
    ],
  },
  {
    name: "Kakarakaya Karam",
    category: "Spices",
    image: "kakarakaya-karam",
    desc: "Bitter gourd podi — earthy, restorative, deeply traditional.",
    sizes: [
      { label: "250g", price: 140 },
      { label: "500g", price: 280 },
      { label: "1Kg", price: 560 },
    ],
  },
  {
    name: "Turmeric Powder",
    category: "Spices",
    image: "turmeric",
    desc: "High-curcumin rhizomes, boiled, sun-dried and milled whole.",
    sizes: [
      { label: "250g", price: 90 },
      { label: "500g", price: 160 },
      { label: "1Kg", price: 310 },
    ],
  },
  {
    name: "Dhaniya Powder",
    category: "Spices",
    image: "dhaniya",
    desc: "Coriander seed, pan-roasted to release its citrus top note.",
    sizes: [
      { label: "250g", price: 90 },
      { label: "500g", price: 180 },
      { label: "1Kg", price: 360 },
    ],
  },
  {
    name: "Ghee Ariselu",
    category: "Snacks",
    image: "ghee-ariselu",
    desc: "Rice flour and jaggery, fried in pure cow ghee.",
    sizes: [{ label: "1Kg", price: 600 }],
  },
  {
    name: "Chekkalu",
    category: "Snacks",
    image: "chekkalu",
    desc: "Thin, crackling rice discs with chana dal and curry leaf.",
    sizes: [{ label: "1Kg", price: 450 }],
  },
  {
    name: "Chakralu",
    category: "Snacks",
    image: "chakralu",
    desc: "Hand-coiled spirals, crisp through the centre.",
    sizes: [{ label: "1Kg", price: 350 }],
  },
  {
    name: "Boondi Mixture",
    category: "Snacks",
    image: "boondi",
    desc: "Gram flour pearls, peanuts and curry leaf in balance.",
    sizes: [{ label: "1Kg", price: 450 }],
  },
  {
    name: "Bellam Gavvalu",
    category: "Snacks",
    image: "bellam-gavvalu",
    desc: "Jaggery-glazed shells, shaped by hand.",
    sizes: [{ label: "1Kg", price: 420 }],
  },
  {
    name: "Kajjikayalu",
    category: "Snacks",
    image: "kajjikayalu",
    desc: "Coconut and jaggery folded into a delicate pastry.",
    sizes: [{ label: "1Kg", price: 400 }],
  },
];

export const latestKgPrices: { name: string; price: number }[] = [
  { name: "Masala / Sambar Karam", price: 530 },
  { name: "Red Chilli Powder", price: 550 },
  { name: "Nalla Karam / Idly Karam", price: 530 },
  { name: "Kobbari Karam", price: 620 },
  { name: "Palli Karam Podi", price: 590 },
  { name: "Karivepaku Karam", price: 560 },
  { name: "Munagaku Karam", price: 580 },
  { name: "Kakarakaya Karam", price: 610 },
  { name: "Turmeric Powder", price: 300 },
  { name: "Dhaniya Powder", price: 480 },
  { name: "Jeera Powder", price: 545 },
];

export const CONTACT = {
  phone: "9441819057",
  email: "s2kspices@gmail.com",
  gst: "37CHDPK8893F1ZU",
  address: "4-142, Nutakki, Mangalagiri, Guntur District 522303",
  instagram: "https://www.instagram.com/s2kspices?igsh=aDk1dW0zazI0cnRu&utm_source=ig_contact_invite",
  youtube: "https://www.youtube.com/@S2KSpices",
  facebook: "https://www.facebook.com/share/14oaxwXjrtT/",
};