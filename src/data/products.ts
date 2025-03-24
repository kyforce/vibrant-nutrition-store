
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  color: string;
  colorClass: string;
  category: string;
  features: string[];
  dosage: string;
  ingredients: string[];
  stock: number;
}

export const products: Product[] = [
  {
    id: "trimtone",
    name: "Trimtone Enhancer",
    description: "Soutien à la gestion du poids. Aide à augmenter la combustion des graisses et à maintenir un niveau de sucre sanguin équilibré.",
    price: 24000,
    image: "public/lovable-uploads/ebe64ba8-b1de-43bd-8974-faaa8a5bdc96.png",
    color: "blue",
    colorClass: "bg-brand-blue",
    category: "Perte de poids",
    features: [
      "Aide à augmenter la combustion des graisses",
      "Aide à maintenir les niveaux de sucre",
      "Soutien à la gestion du poids"
    ],
    dosage: "1 capsule par jour",
    ingredients: ["Extrait de thé vert", "Caféine", "Grains de café vert", "Glucomannane"],
    stock: 15
  },
  {
    id: "resveratrol",
    name: "Resveratrol",
    description: "Super antioxydant. Favorise l'anti-âge et la longévité. Soutient la santé cardiovasculaire.",
    price: 22000,
    image: "public/lovable-uploads/244fae92-9668-44d3-89ba-afc75b168656.png",
    color: "red",
    colorClass: "bg-brand-red",
    category: "Anti-âge",
    features: [
      "Super antioxydant",
      "Favorise l'anti-âge et la longévité",
      "Soutient la santé cardiovasculaire"
    ],
    dosage: "1 capsule par jour",
    ingredients: ["Resveratrol", "Extrait de peau de raisin", "Polyphénols"],
    stock: 20
  },
  {
    id: "colon-detox",
    name: "Colon Detox",
    description: "Avec probiotiques. Aide à une meilleure absorption des nutriments. Laxatif naturel à base de plantes.",
    price: 20000,
    image: "public/lovable-uploads/b40794cb-f0f2-4d37-adf4-4ef9455c319e.png",
    color: "green",
    colorClass: "bg-brand-green",
    category: "Détox",
    features: [
      "Aide à une meilleure absorption des nutriments",
      "Laxatif naturel à base de plantes",
      "Avec probiotiques"
    ],
    dosage: "1 capsule par jour",
    ingredients: ["Probiotiques", "Fibres", "Extraits de plantes"],
    stock: 18
  },
  {
    id: "andro-t",
    name: "Andro-T",
    description: "Stimulant naturel de testostérone. Aide à augmenter la libido et à surcharger l'endurance. Aide à augmenter la vitalité et l'énergie.",
    price: 26000,
    image: "public/lovable-uploads/5d23019d-5081-469c-91bd-bcce08f5b8b0.png",
    color: "black",
    colorClass: "bg-black",
    category: "Énergie",
    features: [
      "Aide à augmenter la libido",
      "Aide à augmenter la vitalité et l'énergie",
      "Surcharge l'endurance"
    ],
    dosage: "1 capsule par jour",
    ingredients: ["Tribulus Terrestris", "Maca", "Ginseng", "Zinc"],
    stock: 10
  },
  {
    id: "liver-care",
    name: "Liver Care",
    description: "Avec curcuma. Soutient le processus de détoxification. Aide à renforcer la défense antioxydante. Soutient la santé globale.",
    price: 19000,
    image: "public/lovable-uploads/b58dcdee-5539-47a9-ab99-dfbc1c7e120c.png",
    color: "orange",
    colorClass: "bg-brand-orange",
    category: "Détox",
    features: [
      "Soutient le processus de détoxification",
      "Aide à renforcer la défense antioxydante",
      "Soutient la santé globale"
    ],
    dosage: "1 capsule par jour",
    ingredients: ["Curcuma", "Chardon-Marie", "Artichaut", "N-acétylcystéine"],
    stock: 22
  },
  {
    id: "muscle-bone-care",
    name: "Muscle-Bone Care",
    description: "Calcium, Magnésium, Zinc. Soutient les fonctions nerveuses et musculaires. Soutient des os et des dents solides.",
    price: 21000,
    image: "public/lovable-uploads/2c18a702-39d8-4e40-8bbd-0ee70f985980.png",
    color: "brown",
    colorClass: "bg-brand-brown",
    category: "Os et muscles",
    features: [
      "Soutient les fonctions nerveuses et musculaires",
      "Soutient des os et des dents solides",
      "Calcium, Magnésium, Zinc"
    ],
    dosage: "1 comprimé par jour",
    ingredients: ["Calcium", "Magnésium", "Zinc", "Vitamine D3"],
    stock: 25
  },
  {
    id: "hair-skin-nails",
    name: "Hair, Skin + Nails",
    description: "22 ingrédients clés. Soutient une peau plus saine. Favorise des cheveux plus épais. Soutient des ongles plus forts.",
    price: 23000,
    image: "public/lovable-uploads/b65c68e2-e595-4049-9cad-51abbae3c368.png",
    color: "pink",
    colorClass: "bg-brand-pink",
    category: "Beauté",
    features: [
      "Soutient une peau plus saine",
      "Favorise des cheveux plus épais",
      "Soutient des ongles plus forts"
    ],
    dosage: "1 capsule par jour",
    ingredients: ["Biotine", "Collagène", "Zinc", "Vitamines B", "Acide hyaluronique"],
    stock: 17
  },
  {
    id: "super-omega-3",
    name: "Super Omega-3",
    description: "1000 mg par portion. Favorise la santé cardiaque et cérébrale. Soutient la santé circulatoire. Favorise le bien-être global.",
    price: 25000,
    image: "public/lovable-uploads/25c10693-40f5-47c8-8b7c-3220ebb49116.png",
    color: "red",
    colorClass: "bg-brand-red",
    category: "Cœur et cerveau",
    features: [
      "Favorise la santé cardiaque et cérébrale",
      "Soutient la santé circulatoire",
      "Favorise le bien-être global"
    ],
    dosage: "1 capsule par jour",
    ingredients: ["EPA", "DHA", "Huile de poisson purifiée"],
    stock: 20
  },
  {
    id: "super-focus",
    name: "Super Focus",
    description: "Nootropique pour une réflexion claire. Soutient la concentration et la mémoire. Favorise une humeur positive. Peut aider à augmenter la concentration.",
    price: 28000,
    image: "public/lovable-uploads/30b9bf92-59f2-4fbf-ac63-40b8d050f046.png",
    color: "purple",
    colorClass: "bg-brand-purple",
    category: "Cerveau",
    features: [
      "Soutient la concentration et la mémoire",
      "Favorise une humeur positive",
      "Peut aider à augmenter la concentration"
    ],
    dosage: "1 gélule par jour",
    ingredients: ["Bacopa Monnieri", "L-Théanine", "Phosphatidylsérine", "Huperzine A"],
    stock: 15
  }
];

export const getProductById = (id: string): Product | undefined => {
  return products.find(product => product.id === id);
};

export const getProductsByCategory = (category: string): Product[] => {
  return products.filter(product => product.category === category);
};

export const getCategories = (): string[] => {
  return [...new Set(products.map(product => product.category))];
};
