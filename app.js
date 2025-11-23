window.addEventListener("DOMContentLoaded", () => {
  const RecipeType = {
    VIANDE: "viande",
    POISSON: "poisson",
    VEGE: "vegetarien"
  };

  const DAYS = ["Lundi","Mardi","Mercredi","Jeudi","Vendredi","Samedi","Dimanche"];

  const baseRecipes = [
  {
    id: "r0",
    name: "Saumon au four soja-miel",
    type: RecipeType.POISSON,
    durationMinutes: 20,
    difficulty: "Facile",
    ingredients: [
        { name: "Poisson (saumon, cabillaud, thon\u2026)", quantity: "400 g", category: "Poisson" },
        { name: "L\u00e9gumes (carottes, chou, etc.)", quantity: "300 g", category: "L\u00e9gumes" },
        { name: "Riz ou nouilles", quantity: "300 g", category: "\u00c9picerie" },
        { name: "Sauce soja ou assaisonnement", quantity: "2 c\u00e0s", category: "\u00c9picerie" }
    ],
    steps: [
        "Pr\u00e9pare les ingr\u00e9dients (lave et coupe les l\u00e9gumes, pr\u00e9pare la viande ou le poisson si besoin).",
        "Fais cuire la base (riz, p\u00e2tes ou nouilles) selon les instructions du paquet.",
        "Dans une po\u00eale, fais revenir la viande, le poisson ou les l\u00e9gumes avec un peu d\u2019huile.",
        "Ajoute la sauce (soja, miso, tomates ou autre) et laisse mijoter quelques minutes.",
        "M\u00e9lange avec la base (ou sers \u00e0 c\u00f4t\u00e9) et d\u00e9guste."
    ]
  },
  {
    id: "r1",
    name: "Cabillaud citron miso",
    type: RecipeType.POISSON,
    durationMinutes: 20,
    difficulty: "Facile",
    ingredients: [
        { name: "Poisson (saumon, cabillaud, thon\u2026)", quantity: "400 g", category: "Poisson" },
        { name: "L\u00e9gumes (carottes, chou, etc.)", quantity: "300 g", category: "L\u00e9gumes" },
        { name: "Riz ou nouilles", quantity: "300 g", category: "\u00c9picerie" },
        { name: "Sauce soja ou assaisonnement", quantity: "2 c\u00e0s", category: "\u00c9picerie" }
    ],
    steps: [
        "Pr\u00e9pare les ingr\u00e9dients (lave et coupe les l\u00e9gumes, pr\u00e9pare la viande ou le poisson si besoin).",
        "Fais cuire la base (riz, p\u00e2tes ou nouilles) selon les instructions du paquet.",
        "Dans une po\u00eale, fais revenir la viande, le poisson ou les l\u00e9gumes avec un peu d\u2019huile.",
        "Ajoute la sauce (soja, miso, tomates ou autre) et laisse mijoter quelques minutes.",
        "M\u00e9lange avec la base (ou sers \u00e0 c\u00f4t\u00e9) et d\u00e9guste."
    ]
  },
  {
    id: "r2",
    name: "Sole beurre citron",
    type: RecipeType.POISSON,
    durationMinutes: 20,
    difficulty: "Facile",
    ingredients: [
        { name: "Poisson (saumon, cabillaud, thon\u2026)", quantity: "400 g", category: "Poisson" },
        { name: "L\u00e9gumes (carottes, chou, etc.)", quantity: "300 g", category: "L\u00e9gumes" },
        { name: "Riz ou nouilles", quantity: "300 g", category: "\u00c9picerie" },
        { name: "Sauce soja ou assaisonnement", quantity: "2 c\u00e0s", category: "\u00c9picerie" }
    ],
    steps: [
        "Pr\u00e9pare les ingr\u00e9dients (lave et coupe les l\u00e9gumes, pr\u00e9pare la viande ou le poisson si besoin).",
        "Fais cuire la base (riz, p\u00e2tes ou nouilles) selon les instructions du paquet.",
        "Dans une po\u00eale, fais revenir la viande, le poisson ou les l\u00e9gumes avec un peu d\u2019huile.",
        "Ajoute la sauce (soja, miso, tomates ou autre) et laisse mijoter quelques minutes.",
        "M\u00e9lange avec la base (ou sers \u00e0 c\u00f4t\u00e9) et d\u00e9guste."
    ]
  },
  {
    id: "r3",
    name: "Udon saut\u00e9s au chou chinois",
    type: RecipeType.VEGE,
    durationMinutes: 20,
    difficulty: "Facile",
    ingredients: [
        { name: "L\u00e9gumes vari\u00e9s", quantity: "400 g", category: "L\u00e9gumes" },
        { name: "Riz, p\u00e2tes ou nouilles", quantity: "300 g", category: "\u00c9picerie" },
        { name: "Tofu ou \u0153ufs (optionnel)", quantity: "200 g", category: "Frais" }
    ],
    steps: [
        "Pr\u00e9pare les ingr\u00e9dients (lave et coupe les l\u00e9gumes, pr\u00e9pare la viande ou le poisson si besoin).",
        "Fais cuire la base (riz, p\u00e2tes ou nouilles) selon les instructions du paquet.",
        "Dans une po\u00eale, fais revenir la viande, le poisson ou les l\u00e9gumes avec un peu d\u2019huile.",
        "Ajoute la sauce (soja, miso, tomates ou autre) et laisse mijoter quelques minutes.",
        "M\u00e9lange avec la base (ou sers \u00e0 c\u00f4t\u00e9) et d\u00e9guste."
    ]
  },
  {
    id: "r4",
    name: "Yakisoba express",
    type: RecipeType.VEGE,
    durationMinutes: 20,
    difficulty: "Facile",
    ingredients: [
        { name: "L\u00e9gumes vari\u00e9s", quantity: "400 g", category: "L\u00e9gumes" },
        { name: "Riz, p\u00e2tes ou nouilles", quantity: "300 g", category: "\u00c9picerie" },
        { name: "Tofu ou \u0153ufs (optionnel)", quantity: "200 g", category: "Frais" }
    ],
    steps: [
        "Pr\u00e9pare les ingr\u00e9dients (lave et coupe les l\u00e9gumes, pr\u00e9pare la viande ou le poisson si besoin).",
        "Fais cuire la base (riz, p\u00e2tes ou nouilles) selon les instructions du paquet.",
        "Dans une po\u00eale, fais revenir la viande, le poisson ou les l\u00e9gumes avec un peu d\u2019huile.",
        "Ajoute la sauce (soja, miso, tomates ou autre) et laisse mijoter quelques minutes.",
        "M\u00e9lange avec la base (ou sers \u00e0 c\u00f4t\u00e9) et d\u00e9guste."
    ]
  },
  {
    id: "r5",
    name: "Somen froids sauce soja",
    type: RecipeType.VEGE,
    durationMinutes: 20,
    difficulty: "Facile",
    ingredients: [
        { name: "L\u00e9gumes vari\u00e9s", quantity: "400 g", category: "L\u00e9gumes" },
        { name: "Riz, p\u00e2tes ou nouilles", quantity: "300 g", category: "\u00c9picerie" },
        { name: "Tofu ou \u0153ufs (optionnel)", quantity: "200 g", category: "Frais" }
    ],
    steps: [
        "Pr\u00e9pare les ingr\u00e9dients (lave et coupe les l\u00e9gumes, pr\u00e9pare la viande ou le poisson si besoin).",
        "Fais cuire la base (riz, p\u00e2tes ou nouilles) selon les instructions du paquet.",
        "Dans une po\u00eale, fais revenir la viande, le poisson ou les l\u00e9gumes avec un peu d\u2019huile.",
        "Ajoute la sauce (soja, miso, tomates ou autre) et laisse mijoter quelques minutes.",
        "M\u00e9lange avec la base (ou sers \u00e0 c\u00f4t\u00e9) et d\u00e9guste."
    ]
  },
  {
    id: "r6",
    name: "Riz saut\u00e9 poulet et l\u00e9gumes",
    type: RecipeType.VIANDE,
    durationMinutes: 20,
    difficulty: "Facile",
    ingredients: [
        { name: "Viande (poulet, porc ou b\u0153uf)", quantity: "400 g", category: "Viande" },
        { name: "L\u00e9gumes (carottes, chou, poivron\u2026)", quantity: "300 g", category: "L\u00e9gumes" },
        { name: "Riz, p\u00e2tes ou nouilles", quantity: "300 g", category: "\u00c9picerie" }
    ],
    steps: [
        "Pr\u00e9pare les ingr\u00e9dients (lave et coupe les l\u00e9gumes, pr\u00e9pare la viande ou le poisson si besoin).",
        "Fais cuire la base (riz, p\u00e2tes ou nouilles) selon les instructions du paquet.",
        "Dans une po\u00eale, fais revenir la viande, le poisson ou les l\u00e9gumes avec un peu d\u2019huile.",
        "Ajoute la sauce (soja, miso, tomates ou autre) et laisse mijoter quelques minutes.",
        "M\u00e9lange avec la base (ou sers \u00e0 c\u00f4t\u00e9) et d\u00e9guste."
    ]
  },
  {
    id: "r7",
    name: "Tonkatsu (porc pan\u00e9) rapide",
    type: RecipeType.VIANDE,
    durationMinutes: 20,
    difficulty: "Facile",
    ingredients: [
        { name: "Viande (poulet, porc ou b\u0153uf)", quantity: "400 g", category: "Viande" },
        { name: "L\u00e9gumes (carottes, chou, poivron\u2026)", quantity: "300 g", category: "L\u00e9gumes" },
        { name: "Riz, p\u00e2tes ou nouilles", quantity: "300 g", category: "\u00c9picerie" }
    ],
    steps: [
        "Pr\u00e9pare les ingr\u00e9dients (lave et coupe les l\u00e9gumes, pr\u00e9pare la viande ou le poisson si besoin).",
        "Fais cuire la base (riz, p\u00e2tes ou nouilles) selon les instructions du paquet.",
        "Dans une po\u00eale, fais revenir la viande, le poisson ou les l\u00e9gumes avec un peu d\u2019huile.",
        "Ajoute la sauce (soja, miso, tomates ou autre) et laisse mijoter quelques minutes.",
        "M\u00e9lange avec la base (ou sers \u00e0 c\u00f4t\u00e9) et d\u00e9guste."
    ]
  },
  {
    id: "r8",
    name: "Gyudon simplifi\u00e9 (b\u0153uf sur riz)",
    type: RecipeType.VIANDE,
    durationMinutes: 20,
    difficulty: "Facile",
    ingredients: [
        { name: "Viande (poulet, porc ou b\u0153uf)", quantity: "400 g", category: "Viande" },
        { name: "L\u00e9gumes (carottes, chou, poivron\u2026)", quantity: "300 g", category: "L\u00e9gumes" },
        { name: "Riz, p\u00e2tes ou nouilles", quantity: "300 g", category: "\u00c9picerie" }
    ],
    steps: [
        "Pr\u00e9pare les ingr\u00e9dients (lave et coupe les l\u00e9gumes, pr\u00e9pare la viande ou le poisson si besoin).",
        "Fais cuire la base (riz, p\u00e2tes ou nouilles) selon les instructions du paquet.",
        "Dans une po\u00eale, fais revenir la viande, le poisson ou les l\u00e9gumes avec un peu d\u2019huile.",
        "Ajoute la sauce (soja, miso, tomates ou autre) et laisse mijoter quelques minutes.",
        "M\u00e9lange avec la base (ou sers \u00e0 c\u00f4t\u00e9) et d\u00e9guste."
    ]
  },
  {
    id: "r9",
    name: "Thon frais po\u00eal\u00e9 s\u00e9same",
    type: RecipeType.POISSON,
    durationMinutes: 20,
    difficulty: "Facile",
    ingredients: [
        { name: "Poisson (saumon, cabillaud, thon\u2026)", quantity: "400 g", category: "Poisson" },
        { name: "L\u00e9gumes (carottes, chou, etc.)", quantity: "300 g", category: "L\u00e9gumes" },
        { name: "Riz ou nouilles", quantity: "300 g", category: "\u00c9picerie" },
        { name: "Sauce soja ou assaisonnement", quantity: "2 c\u00e0s", category: "\u00c9picerie" }
    ],
    steps: [
        "Pr\u00e9pare les ingr\u00e9dients (lave et coupe les l\u00e9gumes, pr\u00e9pare la viande ou le poisson si besoin).",
        "Fais cuire la base (riz, p\u00e2tes ou nouilles) selon les instructions du paquet.",
        "Dans une po\u00eale, fais revenir la viande, le poisson ou les l\u00e9gumes avec un peu d\u2019huile.",
        "Ajoute la sauce (soja, miso, tomates ou autre) et laisse mijoter quelques minutes.",
        "M\u00e9lange avec la base (ou sers \u00e0 c\u00f4t\u00e9) et d\u00e9guste."
    ]
  },
  {
    id: "r10",
    name: "Onigiri au thon",
    type: RecipeType.POISSON,
    durationMinutes: 20,
    difficulty: "Facile",
    ingredients: [
        { name: "Poisson (saumon, cabillaud, thon\u2026)", quantity: "400 g", category: "Poisson" },
        { name: "L\u00e9gumes (carottes, chou, etc.)", quantity: "300 g", category: "L\u00e9gumes" },
        { name: "Riz ou nouilles", quantity: "300 g", category: "\u00c9picerie" },
        { name: "Sauce soja ou assaisonnement", quantity: "2 c\u00e0s", category: "\u00c9picerie" }
    ],
    steps: [
        "Pr\u00e9pare les ingr\u00e9dients (lave et coupe les l\u00e9gumes, pr\u00e9pare la viande ou le poisson si besoin).",
        "Fais cuire la base (riz, p\u00e2tes ou nouilles) selon les instructions du paquet.",
        "Dans une po\u00eale, fais revenir la viande, le poisson ou les l\u00e9gumes avec un peu d\u2019huile.",
        "Ajoute la sauce (soja, miso, tomates ou autre) et laisse mijoter quelques minutes.",
        "M\u00e9lange avec la base (ou sers \u00e0 c\u00f4t\u00e9) et d\u00e9guste."
    ]
  },
  {
    id: "r11",
    name: "Chou pointu saut\u00e9 soja-beurre",
    type: RecipeType.VEGE,
    durationMinutes: 20,
    difficulty: "Facile",
    ingredients: [
        { name: "L\u00e9gumes vari\u00e9s", quantity: "400 g", category: "L\u00e9gumes" },
        { name: "Riz, p\u00e2tes ou nouilles", quantity: "300 g", category: "\u00c9picerie" },
        { name: "Tofu ou \u0153ufs (optionnel)", quantity: "200 g", category: "Frais" }
    ],
    steps: [
        "Pr\u00e9pare les ingr\u00e9dients (lave et coupe les l\u00e9gumes, pr\u00e9pare la viande ou le poisson si besoin).",
        "Fais cuire la base (riz, p\u00e2tes ou nouilles) selon les instructions du paquet.",
        "Dans une po\u00eale, fais revenir la viande, le poisson ou les l\u00e9gumes avec un peu d\u2019huile.",
        "Ajoute la sauce (soja, miso, tomates ou autre) et laisse mijoter quelques minutes.",
        "M\u00e9lange avec la base (ou sers \u00e0 c\u00f4t\u00e9) et d\u00e9guste."
    ]
  },
  {
    id: "r12",
    name: "Soupe miso tofu-l\u00e9gumes",
    type: RecipeType.VEGE,
    durationMinutes: 20,
    difficulty: "Facile",
    ingredients: [
        { name: "L\u00e9gumes vari\u00e9s", quantity: "400 g", category: "L\u00e9gumes" },
        { name: "Riz, p\u00e2tes ou nouilles", quantity: "300 g", category: "\u00c9picerie" },
        { name: "Tofu ou \u0153ufs (optionnel)", quantity: "200 g", category: "Frais" }
    ],
    steps: [
        "Pr\u00e9pare les ingr\u00e9dients (lave et coupe les l\u00e9gumes, pr\u00e9pare la viande ou le poisson si besoin).",
        "Fais cuire la base (riz, p\u00e2tes ou nouilles) selon les instructions du paquet.",
        "Dans une po\u00eale, fais revenir la viande, le poisson ou les l\u00e9gumes avec un peu d\u2019huile.",
        "Ajoute la sauce (soja, miso, tomates ou autre) et laisse mijoter quelques minutes.",
        "M\u00e9lange avec la base (ou sers \u00e0 c\u00f4t\u00e9) et d\u00e9guste."
    ]
  },
  {
    id: "r13",
    name: "P\u00e2tes beurre-soja-nori",
    type: RecipeType.VEGE,
    durationMinutes: 20,
    difficulty: "Facile",
    ingredients: [
        { name: "L\u00e9gumes vari\u00e9s", quantity: "400 g", category: "L\u00e9gumes" },
        { name: "Riz, p\u00e2tes ou nouilles", quantity: "300 g", category: "\u00c9picerie" },
        { name: "Tofu ou \u0153ufs (optionnel)", quantity: "200 g", category: "Frais" }
    ],
    steps: [
        "Pr\u00e9pare les ingr\u00e9dients (lave et coupe les l\u00e9gumes, pr\u00e9pare la viande ou le poisson si besoin).",
        "Fais cuire la base (riz, p\u00e2tes ou nouilles) selon les instructions du paquet.",
        "Dans une po\u00eale, fais revenir la viande, le poisson ou les l\u00e9gumes avec un peu d\u2019huile.",
        "Ajoute la sauce (soja, miso, tomates ou autre) et laisse mijoter quelques minutes.",
        "M\u00e9lange avec la base (ou sers \u00e0 c\u00f4t\u00e9) et d\u00e9guste."
    ]
  },
  {
    id: "r14",
    name: "Poulet r\u00f4ti carottes et pommes de terre",
    type: RecipeType.VIANDE,
    durationMinutes: 20,
    difficulty: "Facile",
    ingredients: [
        { name: "Viande (poulet, porc ou b\u0153uf)", quantity: "400 g", category: "Viande" },
        { name: "L\u00e9gumes (carottes, chou, poivron\u2026)", quantity: "300 g", category: "L\u00e9gumes" },
        { name: "Riz, p\u00e2tes ou nouilles", quantity: "300 g", category: "\u00c9picerie" }
    ],
    steps: [
        "Pr\u00e9pare les ingr\u00e9dients (lave et coupe les l\u00e9gumes, pr\u00e9pare la viande ou le poisson si besoin).",
        "Fais cuire la base (riz, p\u00e2tes ou nouilles) selon les instructions du paquet.",
        "Dans une po\u00eale, fais revenir la viande, le poisson ou les l\u00e9gumes avec un peu d\u2019huile.",
        "Ajoute la sauce (soja, miso, tomates ou autre) et laisse mijoter quelques minutes.",
        "M\u00e9lange avec la base (ou sers \u00e0 c\u00f4t\u00e9) et d\u00e9guste."
    ]
  },
  {
    id: "r15",
    name: "Poisson pan\u00e9 maison + riz",
    type: RecipeType.POISSON,
    durationMinutes: 20,
    difficulty: "Facile",
    ingredients: [
        { name: "Poisson (saumon, cabillaud, thon\u2026)", quantity: "400 g", category: "Poisson" },
        { name: "L\u00e9gumes (carottes, chou, etc.)", quantity: "300 g", category: "L\u00e9gumes" },
        { name: "Riz ou nouilles", quantity: "300 g", category: "\u00c9picerie" },
        { name: "Sauce soja ou assaisonnement", quantity: "2 c\u00e0s", category: "\u00c9picerie" }
    ],
    steps: [
        "Pr\u00e9pare les ingr\u00e9dients (lave et coupe les l\u00e9gumes, pr\u00e9pare la viande ou le poisson si besoin).",
        "Fais cuire la base (riz, p\u00e2tes ou nouilles) selon les instructions du paquet.",
        "Dans une po\u00eale, fais revenir la viande, le poisson ou les l\u00e9gumes avec un peu d\u2019huile.",
        "Ajoute la sauce (soja, miso, tomates ou autre) et laisse mijoter quelques minutes.",
        "M\u00e9lange avec la base (ou sers \u00e0 c\u00f4t\u00e9) et d\u00e9guste."
    ]
  },
  {
    id: "r16",
    name: "Sardines grill\u00e9es au four et riz",
    type: RecipeType.POISSON,
    durationMinutes: 20,
    difficulty: "Facile",
    ingredients: [
        { name: "Poisson (saumon, cabillaud, thon\u2026)", quantity: "400 g", category: "Poisson" },
        { name: "L\u00e9gumes (carottes, chou, etc.)", quantity: "300 g", category: "L\u00e9gumes" },
        { name: "Riz ou nouilles", quantity: "300 g", category: "\u00c9picerie" },
        { name: "Sauce soja ou assaisonnement", quantity: "2 c\u00e0s", category: "\u00c9picerie" }
    ],
    steps: [
        "Pr\u00e9pare les ingr\u00e9dients (lave et coupe les l\u00e9gumes, pr\u00e9pare la viande ou le poisson si besoin).",
        "Fais cuire la base (riz, p\u00e2tes ou nouilles) selon les instructions du paquet.",
        "Dans une po\u00eale, fais revenir la viande, le poisson ou les l\u00e9gumes avec un peu d\u2019huile.",
        "Ajoute la sauce (soja, miso, tomates ou autre) et laisse mijoter quelques minutes.",
        "M\u00e9lange avec la base (ou sers \u00e0 c\u00f4t\u00e9) et d\u00e9guste."
    ]
  },
  {
    id: "r17",
    name: "Ratatouille et saumon au four",
    type: RecipeType.POISSON,
    durationMinutes: 20,
    difficulty: "Facile",
    ingredients: [
        { name: "Poisson (saumon, cabillaud, thon\u2026)", quantity: "400 g", category: "Poisson" },
        { name: "L\u00e9gumes (carottes, chou, etc.)", quantity: "300 g", category: "L\u00e9gumes" },
        { name: "Riz ou nouilles", quantity: "300 g", category: "\u00c9picerie" },
        { name: "Sauce soja ou assaisonnement", quantity: "2 c\u00e0s", category: "\u00c9picerie" }
    ],
    steps: [
        "Pr\u00e9pare les ingr\u00e9dients (lave et coupe les l\u00e9gumes, pr\u00e9pare la viande ou le poisson si besoin).",
        "Fais cuire la base (riz, p\u00e2tes ou nouilles) selon les instructions du paquet.",
        "Dans une po\u00eale, fais revenir la viande, le poisson ou les l\u00e9gumes avec un peu d\u2019huile.",
        "Ajoute la sauce (soja, miso, tomates ou autre) et laisse mijoter quelques minutes.",
        "M\u00e9lange avec la base (ou sers \u00e0 c\u00f4t\u00e9) et d\u00e9guste."
    ]
  },
  {
    id: "r18",
    name: "Omelette fromage et nori",
    type: RecipeType.VEGE,
    durationMinutes: 20,
    difficulty: "Facile",
    ingredients: [
        { name: "L\u00e9gumes vari\u00e9s", quantity: "400 g", category: "L\u00e9gumes" },
        { name: "Riz, p\u00e2tes ou nouilles", quantity: "300 g", category: "\u00c9picerie" },
        { name: "Tofu ou \u0153ufs (optionnel)", quantity: "200 g", category: "Frais" }
    ],
    steps: [
        "Pr\u00e9pare les ingr\u00e9dients (lave et coupe les l\u00e9gumes, pr\u00e9pare la viande ou le poisson si besoin).",
        "Fais cuire la base (riz, p\u00e2tes ou nouilles) selon les instructions du paquet.",
        "Dans une po\u00eale, fais revenir la viande, le poisson ou les l\u00e9gumes avec un peu d\u2019huile.",
        "Ajoute la sauce (soja, miso, tomates ou autre) et laisse mijoter quelques minutes.",
        "M\u00e9lange avec la base (ou sers \u00e0 c\u00f4t\u00e9) et d\u00e9guste."
    ]
  },
  {
    id: "r19",
    name: "Gnocchis \u00e0 la tomate",
    type: RecipeType.VEGE,
    durationMinutes: 20,
    difficulty: "Facile",
    ingredients: [
        { name: "L\u00e9gumes vari\u00e9s", quantity: "400 g", category: "L\u00e9gumes" },
        { name: "Riz, p\u00e2tes ou nouilles", quantity: "300 g", category: "\u00c9picerie" },
        { name: "Tofu ou \u0153ufs (optionnel)", quantity: "200 g", category: "Frais" }
    ],
    steps: [
        "Pr\u00e9pare les ingr\u00e9dients (lave et coupe les l\u00e9gumes, pr\u00e9pare la viande ou le poisson si besoin).",
        "Fais cuire la base (riz, p\u00e2tes ou nouilles) selon les instructions du paquet.",
        "Dans une po\u00eale, fais revenir la viande, le poisson ou les l\u00e9gumes avec un peu d\u2019huile.",
        "Ajoute la sauce (soja, miso, tomates ou autre) et laisse mijoter quelques minutes.",
        "M\u00e9lange avec la base (ou sers \u00e0 c\u00f4t\u00e9) et d\u00e9guste."
    ]
  },
  {
    id: "r20",
    name: "Quiche poireau au miso l\u00e9ger",
    type: RecipeType.VEGE,
    durationMinutes: 20,
    difficulty: "Facile",
    ingredients: [
        { name: "L\u00e9gumes vari\u00e9s", quantity: "400 g", category: "L\u00e9gumes" },
        { name: "Riz, p\u00e2tes ou nouilles", quantity: "300 g", category: "\u00c9picerie" },
        { name: "Tofu ou \u0153ufs (optionnel)", quantity: "200 g", category: "Frais" }
    ],
    steps: [
        "Pr\u00e9pare les ingr\u00e9dients (lave et coupe les l\u00e9gumes, pr\u00e9pare la viande ou le poisson si besoin).",
        "Fais cuire la base (riz, p\u00e2tes ou nouilles) selon les instructions du paquet.",
        "Dans une po\u00eale, fais revenir la viande, le poisson ou les l\u00e9gumes avec un peu d\u2019huile.",
        "Ajoute la sauce (soja, miso, tomates ou autre) et laisse mijoter quelques minutes.",
        "M\u00e9lange avec la base (ou sers \u00e0 c\u00f4t\u00e9) et d\u00e9guste."
    ]
  },
  {
    id: "r21",
    name: "Riz saut\u00e9 \u0153uf et ma\u00efs",
    type: RecipeType.VEGE,
    durationMinutes: 20,
    difficulty: "Facile",
    ingredients: [
        { name: "L\u00e9gumes vari\u00e9s", quantity: "400 g", category: "L\u00e9gumes" },
        { name: "Riz, p\u00e2tes ou nouilles", quantity: "300 g", category: "\u00c9picerie" },
        { name: "Tofu ou \u0153ufs (optionnel)", quantity: "200 g", category: "Frais" }
    ],
    steps: [
        "Pr\u00e9pare les ingr\u00e9dients (lave et coupe les l\u00e9gumes, pr\u00e9pare la viande ou le poisson si besoin).",
        "Fais cuire la base (riz, p\u00e2tes ou nouilles) selon les instructions du paquet.",
        "Dans une po\u00eale, fais revenir la viande, le poisson ou les l\u00e9gumes avec un peu d\u2019huile.",
        "Ajoute la sauce (soja, miso, tomates ou autre) et laisse mijoter quelques minutes.",
        "M\u00e9lange avec la base (ou sers \u00e0 c\u00f4t\u00e9) et d\u00e9guste."
    ]
  },
  {
    id: "r22",
    name: "P\u00e2tes au pesto",
    type: RecipeType.VEGE,
    durationMinutes: 20,
    difficulty: "Facile",
    ingredients: [
        { name: "L\u00e9gumes vari\u00e9s", quantity: "400 g", category: "L\u00e9gumes" },
        { name: "Riz, p\u00e2tes ou nouilles", quantity: "300 g", category: "\u00c9picerie" },
        { name: "Tofu ou \u0153ufs (optionnel)", quantity: "200 g", category: "Frais" }
    ],
    steps: [
        "Pr\u00e9pare les ingr\u00e9dients (lave et coupe les l\u00e9gumes, pr\u00e9pare la viande ou le poisson si besoin).",
        "Fais cuire la base (riz, p\u00e2tes ou nouilles) selon les instructions du paquet.",
        "Dans une po\u00eale, fais revenir la viande, le poisson ou les l\u00e9gumes avec un peu d\u2019huile.",
        "Ajoute la sauce (soja, miso, tomates ou autre) et laisse mijoter quelques minutes.",
        "M\u00e9lange avec la base (ou sers \u00e0 c\u00f4t\u00e9) et d\u00e9guste."
    ]
  },
  {
    id: "r23",
    name: "Wraps jambon crudit\u00e9s",
    type: RecipeType.VIANDE,
    durationMinutes: 20,
    difficulty: "Facile",
    ingredients: [
        { name: "Viande (poulet, porc ou b\u0153uf)", quantity: "400 g", category: "Viande" },
        { name: "L\u00e9gumes (carottes, chou, poivron\u2026)", quantity: "300 g", category: "L\u00e9gumes" },
        { name: "Riz, p\u00e2tes ou nouilles", quantity: "300 g", category: "\u00c9picerie" }
    ],
    steps: [
        "Pr\u00e9pare les ingr\u00e9dients (lave et coupe les l\u00e9gumes, pr\u00e9pare la viande ou le poisson si besoin).",
        "Fais cuire la base (riz, p\u00e2tes ou nouilles) selon les instructions du paquet.",
        "Dans une po\u00eale, fais revenir la viande, le poisson ou les l\u00e9gumes avec un peu d\u2019huile.",
        "Ajoute la sauce (soja, miso, tomates ou autre) et laisse mijoter quelques minutes.",
        "M\u00e9lange avec la base (ou sers \u00e0 c\u00f4t\u00e9) et d\u00e9guste."
    ]
  },
  {
    id: "r24",
    name: "Croque-monsieur express",
    type: RecipeType.VIANDE,
    durationMinutes: 20,
    difficulty: "Facile",
    ingredients: [
        { name: "Viande (poulet, porc ou b\u0153uf)", quantity: "400 g", category: "Viande" },
        { name: "L\u00e9gumes (carottes, chou, poivron\u2026)", quantity: "300 g", category: "L\u00e9gumes" },
        { name: "Riz, p\u00e2tes ou nouilles", quantity: "300 g", category: "\u00c9picerie" }
    ],
    steps: [
        "Pr\u00e9pare les ingr\u00e9dients (lave et coupe les l\u00e9gumes, pr\u00e9pare la viande ou le poisson si besoin).",
        "Fais cuire la base (riz, p\u00e2tes ou nouilles) selon les instructions du paquet.",
        "Dans une po\u00eale, fais revenir la viande, le poisson ou les l\u00e9gumes avec un peu d\u2019huile.",
        "Ajoute la sauce (soja, miso, tomates ou autre) et laisse mijoter quelques minutes.",
        "M\u00e9lange avec la base (ou sers \u00e0 c\u00f4t\u00e9) et d\u00e9guste."
    ]
  },
  {
    id: "r25",
    name: "Pizza maison simple",
    type: RecipeType.VEGE,
    durationMinutes: 20,
    difficulty: "Facile",
    ingredients: [
        { name: "L\u00e9gumes vari\u00e9s", quantity: "400 g", category: "L\u00e9gumes" },
        { name: "Riz, p\u00e2tes ou nouilles", quantity: "300 g", category: "\u00c9picerie" },
        { name: "Tofu ou \u0153ufs (optionnel)", quantity: "200 g", category: "Frais" }
    ],
    steps: [
        "Pr\u00e9pare les ingr\u00e9dients (lave et coupe les l\u00e9gumes, pr\u00e9pare la viande ou le poisson si besoin).",
        "Fais cuire la base (riz, p\u00e2tes ou nouilles) selon les instructions du paquet.",
        "Dans une po\u00eale, fais revenir la viande, le poisson ou les l\u00e9gumes avec un peu d\u2019huile.",
        "Ajoute la sauce (soja, miso, tomates ou autre) et laisse mijoter quelques minutes.",
        "M\u00e9lange avec la base (ou sers \u00e0 c\u00f4t\u00e9) et d\u00e9guste."
    ]
  },
  {
    id: "r26",
    name: "Lentilles corail au lait de coco",
    type: RecipeType.VEGE,
    durationMinutes: 20,
    difficulty: "Facile",
    ingredients: [
        { name: "L\u00e9gumes vari\u00e9s", quantity: "400 g", category: "L\u00e9gumes" },
        { name: "Riz, p\u00e2tes ou nouilles", quantity: "300 g", category: "\u00c9picerie" },
        { name: "Tofu ou \u0153ufs (optionnel)", quantity: "200 g", category: "Frais" }
    ],
    steps: [
        "Pr\u00e9pare les ingr\u00e9dients (lave et coupe les l\u00e9gumes, pr\u00e9pare la viande ou le poisson si besoin).",
        "Fais cuire la base (riz, p\u00e2tes ou nouilles) selon les instructions du paquet.",
        "Dans une po\u00eale, fais revenir la viande, le poisson ou les l\u00e9gumes avec un peu d\u2019huile.",
        "Ajoute la sauce (soja, miso, tomates ou autre) et laisse mijoter quelques minutes.",
        "M\u00e9lange avec la base (ou sers \u00e0 c\u00f4t\u00e9) et d\u00e9guste."
    ]
  },
  {
    id: "r27",
    name: "Poisson blanc vapeur soja",
    type: RecipeType.POISSON,
    durationMinutes: 20,
    difficulty: "Facile",
    ingredients: [
        { name: "Poisson (saumon, cabillaud, thon\u2026)", quantity: "400 g", category: "Poisson" },
        { name: "L\u00e9gumes (carottes, chou, etc.)", quantity: "300 g", category: "L\u00e9gumes" },
        { name: "Riz ou nouilles", quantity: "300 g", category: "\u00c9picerie" },
        { name: "Sauce soja ou assaisonnement", quantity: "2 c\u00e0s", category: "\u00c9picerie" }
    ],
    steps: [
        "Pr\u00e9pare les ingr\u00e9dients (lave et coupe les l\u00e9gumes, pr\u00e9pare la viande ou le poisson si besoin).",
        "Fais cuire la base (riz, p\u00e2tes ou nouilles) selon les instructions du paquet.",
        "Dans une po\u00eale, fais revenir la viande, le poisson ou les l\u00e9gumes avec un peu d\u2019huile.",
        "Ajoute la sauce (soja, miso, tomates ou autre) et laisse mijoter quelques minutes.",
        "M\u00e9lange avec la base (ou sers \u00e0 c\u00f4t\u00e9) et d\u00e9guste."
    ]
  },
  {
    id: "r28",
    name: "Donburi saumon chou chinois",
    type: RecipeType.POISSON,
    durationMinutes: 20,
    difficulty: "Facile",
    ingredients: [
        { name: "Poisson (saumon, cabillaud, thon\u2026)", quantity: "400 g", category: "Poisson" },
        { name: "L\u00e9gumes (carottes, chou, etc.)", quantity: "300 g", category: "L\u00e9gumes" },
        { name: "Riz ou nouilles", quantity: "300 g", category: "\u00c9picerie" },
        { name: "Sauce soja ou assaisonnement", quantity: "2 c\u00e0s", category: "\u00c9picerie" }
    ],
    steps: [
        "Pr\u00e9pare les ingr\u00e9dients (lave et coupe les l\u00e9gumes, pr\u00e9pare la viande ou le poisson si besoin).",
        "Fais cuire la base (riz, p\u00e2tes ou nouilles) selon les instructions du paquet.",
        "Dans une po\u00eale, fais revenir la viande, le poisson ou les l\u00e9gumes avec un peu d\u2019huile.",
        "Ajoute la sauce (soja, miso, tomates ou autre) et laisse mijoter quelques minutes.",
        "M\u00e9lange avec la base (ou sers \u00e0 c\u00f4t\u00e9) et d\u00e9guste."
    ]
  },
  {
    id: "r29",
    name: "Udon miso-beurre et l\u00e9gumes",
    type: RecipeType.VEGE,
    durationMinutes: 20,
    difficulty: "Facile",
    ingredients: [
        { name: "L\u00e9gumes vari\u00e9s", quantity: "400 g", category: "L\u00e9gumes" },
        { name: "Riz, p\u00e2tes ou nouilles", quantity: "300 g", category: "\u00c9picerie" },
        { name: "Tofu ou \u0153ufs (optionnel)", quantity: "200 g", category: "Frais" }
    ],
    steps: [
        "Pr\u00e9pare les ingr\u00e9dients (lave et coupe les l\u00e9gumes, pr\u00e9pare la viande ou le poisson si besoin).",
        "Fais cuire la base (riz, p\u00e2tes ou nouilles) selon les instructions du paquet.",
        "Dans une po\u00eale, fais revenir la viande, le poisson ou les l\u00e9gumes avec un peu d\u2019huile.",
        "Ajoute la sauce (soja, miso, tomates ou autre) et laisse mijoter quelques minutes.",
        "M\u00e9lange avec la base (ou sers \u00e0 c\u00f4t\u00e9) et d\u00e9guste."
    ]
  },
  {
    id: "r30",
    name: "Poulet teriyaki au four",
    type: RecipeType.VIANDE,
    durationMinutes: 20,
    difficulty: "Facile",
    ingredients: [
        { name: "Viande (poulet, porc ou b\u0153uf)", quantity: "400 g", category: "Viande" },
        { name: "L\u00e9gumes (carottes, chou, poivron\u2026)", quantity: "300 g", category: "L\u00e9gumes" },
        { name: "Riz, p\u00e2tes ou nouilles", quantity: "300 g", category: "\u00c9picerie" }
    ],
    steps: [
        "Pr\u00e9pare les ingr\u00e9dients (lave et coupe les l\u00e9gumes, pr\u00e9pare la viande ou le poisson si besoin).",
        "Fais cuire la base (riz, p\u00e2tes ou nouilles) selon les instructions du paquet.",
        "Dans une po\u00eale, fais revenir la viande, le poisson ou les l\u00e9gumes avec un peu d\u2019huile.",
        "Ajoute la sauce (soja, miso, tomates ou autre) et laisse mijoter quelques minutes.",
        "M\u00e9lange avec la base (ou sers \u00e0 c\u00f4t\u00e9) et d\u00e9guste."
    ]
  },
  {
    id: "r31",
    name: "Boulettes de viande sauce tomate",
    type: RecipeType.VIANDE,
    durationMinutes: 20,
    difficulty: "Facile",
    ingredients: [
        { name: "Viande (poulet, porc ou b\u0153uf)", quantity: "400 g", category: "Viande" },
        { name: "L\u00e9gumes (carottes, chou, poivron\u2026)", quantity: "300 g", category: "L\u00e9gumes" },
        { name: "Riz, p\u00e2tes ou nouilles", quantity: "300 g", category: "\u00c9picerie" }
    ],
    steps: [
        "Pr\u00e9pare les ingr\u00e9dients (lave et coupe les l\u00e9gumes, pr\u00e9pare la viande ou le poisson si besoin).",
        "Fais cuire la base (riz, p\u00e2tes ou nouilles) selon les instructions du paquet.",
        "Dans une po\u00eale, fais revenir la viande, le poisson ou les l\u00e9gumes avec un peu d\u2019huile.",
        "Ajoute la sauce (soja, miso, tomates ou autre) et laisse mijoter quelques minutes.",
        "M\u00e9lange avec la base (ou sers \u00e0 c\u00f4t\u00e9) et d\u00e9guste."
    ]
  },
  {
    id: "r32",
    name: "Yaki udon aux l\u00e9gumes",
    type: RecipeType.VEGE,
    durationMinutes: 20,
    difficulty: "Facile",
    ingredients: [
        { name: "L\u00e9gumes vari\u00e9s", quantity: "400 g", category: "L\u00e9gumes" },
        { name: "Riz, p\u00e2tes ou nouilles", quantity: "300 g", category: "\u00c9picerie" },
        { name: "Tofu ou \u0153ufs (optionnel)", quantity: "200 g", category: "Frais" }
    ],
    steps: [
        "Pr\u00e9pare les ingr\u00e9dients (lave et coupe les l\u00e9gumes, pr\u00e9pare la viande ou le poisson si besoin).",
        "Fais cuire la base (riz, p\u00e2tes ou nouilles) selon les instructions du paquet.",
        "Dans une po\u00eale, fais revenir la viande, le poisson ou les l\u00e9gumes avec un peu d\u2019huile.",
        "Ajoute la sauce (soja, miso, tomates ou autre) et laisse mijoter quelques minutes.",
        "M\u00e9lange avec la base (ou sers \u00e0 c\u00f4t\u00e9) et d\u00e9guste."
    ]
  },
  {
    id: "r33",
    name: "Soba s\u00e9same et concombre",
    type: RecipeType.VEGE,
    durationMinutes: 20,
    difficulty: "Facile",
    ingredients: [
        { name: "L\u00e9gumes vari\u00e9s", quantity: "400 g", category: "L\u00e9gumes" },
        { name: "Riz, p\u00e2tes ou nouilles", quantity: "300 g", category: "\u00c9picerie" },
        { name: "Tofu ou \u0153ufs (optionnel)", quantity: "200 g", category: "Frais" }
    ],
    steps: [
        "Pr\u00e9pare les ingr\u00e9dients (lave et coupe les l\u00e9gumes, pr\u00e9pare la viande ou le poisson si besoin).",
        "Fais cuire la base (riz, p\u00e2tes ou nouilles) selon les instructions du paquet.",
        "Dans une po\u00eale, fais revenir la viande, le poisson ou les l\u00e9gumes avec un peu d\u2019huile.",
        "Ajoute la sauce (soja, miso, tomates ou autre) et laisse mijoter quelques minutes.",
        "M\u00e9lange avec la base (ou sers \u00e0 c\u00f4t\u00e9) et d\u00e9guste."
    ]
  },
  {
    id: "r34",
    name: "Thon grill\u00e9 et chou chinois",
    type: RecipeType.POISSON,
    durationMinutes: 20,
    difficulty: "Facile",
    ingredients: [
        { name: "Poisson (saumon, cabillaud, thon\u2026)", quantity: "400 g", category: "Poisson" },
        { name: "L\u00e9gumes (carottes, chou, etc.)", quantity: "300 g", category: "L\u00e9gumes" },
        { name: "Riz ou nouilles", quantity: "300 g", category: "\u00c9picerie" },
        { name: "Sauce soja ou assaisonnement", quantity: "2 c\u00e0s", category: "\u00c9picerie" }
    ],
    steps: [
        "Pr\u00e9pare les ingr\u00e9dients (lave et coupe les l\u00e9gumes, pr\u00e9pare la viande ou le poisson si besoin).",
        "Fais cuire la base (riz, p\u00e2tes ou nouilles) selon les instructions du paquet.",
        "Dans une po\u00eale, fais revenir la viande, le poisson ou les l\u00e9gumes avec un peu d\u2019huile.",
        "Ajoute la sauce (soja, miso, tomates ou autre) et laisse mijoter quelques minutes.",
        "M\u00e9lange avec la base (ou sers \u00e0 c\u00f4t\u00e9) et d\u00e9guste."
    ]
  },
  {
    id: "r35",
    name: "Nouilles miso rapides",
    type: RecipeType.VEGE,
    durationMinutes: 20,
    difficulty: "Facile",
    ingredients: [
        { name: "L\u00e9gumes vari\u00e9s", quantity: "400 g", category: "L\u00e9gumes" },
        { name: "Riz, p\u00e2tes ou nouilles", quantity: "300 g", category: "\u00c9picerie" },
        { name: "Tofu ou \u0153ufs (optionnel)", quantity: "200 g", category: "Frais" }
    ],
    steps: [
        "Pr\u00e9pare les ingr\u00e9dients (lave et coupe les l\u00e9gumes, pr\u00e9pare la viande ou le poisson si besoin).",
        "Fais cuire la base (riz, p\u00e2tes ou nouilles) selon les instructions du paquet.",
        "Dans une po\u00eale, fais revenir la viande, le poisson ou les l\u00e9gumes avec un peu d\u2019huile.",
        "Ajoute la sauce (soja, miso, tomates ou autre) et laisse mijoter quelques minutes.",
        "M\u00e9lange avec la base (ou sers \u00e0 c\u00f4t\u00e9) et d\u00e9guste."
    ]
  },
  {
    id: "r36",
    name: "Riz japonais et poisson blanc",
    type: RecipeType.POISSON,
    durationMinutes: 20,
    difficulty: "Facile",
    ingredients: [
        { name: "Poisson (saumon, cabillaud, thon\u2026)", quantity: "400 g", category: "Poisson" },
        { name: "L\u00e9gumes (carottes, chou, etc.)", quantity: "300 g", category: "L\u00e9gumes" },
        { name: "Riz ou nouilles", quantity: "300 g", category: "\u00c9picerie" },
        { name: "Sauce soja ou assaisonnement", quantity: "2 c\u00e0s", category: "\u00c9picerie" }
    ],
    steps: [
        "Pr\u00e9pare les ingr\u00e9dients (lave et coupe les l\u00e9gumes, pr\u00e9pare la viande ou le poisson si besoin).",
        "Fais cuire la base (riz, p\u00e2tes ou nouilles) selon les instructions du paquet.",
        "Dans une po\u00eale, fais revenir la viande, le poisson ou les l\u00e9gumes avec un peu d\u2019huile.",
        "Ajoute la sauce (soja, miso, tomates ou autre) et laisse mijoter quelques minutes.",
        "M\u00e9lange avec la base (ou sers \u00e0 c\u00f4t\u00e9) et d\u00e9guste."
    ]
  },
  {
    id: "r37",
    name: "Tofu grill\u00e9 sauce soja",
    type: RecipeType.VEGE,
    durationMinutes: 20,
    difficulty: "Facile",
    ingredients: [
        { name: "L\u00e9gumes vari\u00e9s", quantity: "400 g", category: "L\u00e9gumes" },
        { name: "Riz, p\u00e2tes ou nouilles", quantity: "300 g", category: "\u00c9picerie" },
        { name: "Tofu ou \u0153ufs (optionnel)", quantity: "200 g", category: "Frais" }
    ],
    steps: [
        "Pr\u00e9pare les ingr\u00e9dients (lave et coupe les l\u00e9gumes, pr\u00e9pare la viande ou le poisson si besoin).",
        "Fais cuire la base (riz, p\u00e2tes ou nouilles) selon les instructions du paquet.",
        "Dans une po\u00eale, fais revenir la viande, le poisson ou les l\u00e9gumes avec un peu d\u2019huile.",
        "Ajoute la sauce (soja, miso, tomates ou autre) et laisse mijoter quelques minutes.",
        "M\u00e9lange avec la base (ou sers \u00e0 c\u00f4t\u00e9) et d\u00e9guste."
    ]
  },
  {
    id: "r38",
    name: "Chou chinois brais\u00e9 au miso",
    type: RecipeType.VEGE,
    durationMinutes: 20,
    difficulty: "Facile",
    ingredients: [
        { name: "L\u00e9gumes vari\u00e9s", quantity: "400 g", category: "L\u00e9gumes" },
        { name: "Riz, p\u00e2tes ou nouilles", quantity: "300 g", category: "\u00c9picerie" },
        { name: "Tofu ou \u0153ufs (optionnel)", quantity: "200 g", category: "Frais" }
    ],
    steps: [
        "Pr\u00e9pare les ingr\u00e9dients (lave et coupe les l\u00e9gumes, pr\u00e9pare la viande ou le poisson si besoin).",
        "Fais cuire la base (riz, p\u00e2tes ou nouilles) selon les instructions du paquet.",
        "Dans une po\u00eale, fais revenir la viande, le poisson ou les l\u00e9gumes avec un peu d\u2019huile.",
        "Ajoute la sauce (soja, miso, tomates ou autre) et laisse mijoter quelques minutes.",
        "M\u00e9lange avec la base (ou sers \u00e0 c\u00f4t\u00e9) et d\u00e9guste."
    ]
  },
  {
    id: "r39",
    name: "Poulet saut\u00e9 au gingembre",
    type: RecipeType.VIANDE,
    durationMinutes: 20,
    difficulty: "Facile",
    ingredients: [
        { name: "Viande (poulet, porc ou b\u0153uf)", quantity: "400 g", category: "Viande" },
        { name: "L\u00e9gumes (carottes, chou, poivron\u2026)", quantity: "300 g", category: "L\u00e9gumes" },
        { name: "Riz, p\u00e2tes ou nouilles", quantity: "300 g", category: "\u00c9picerie" }
    ],
    steps: [
        "Pr\u00e9pare les ingr\u00e9dients (lave et coupe les l\u00e9gumes, pr\u00e9pare la viande ou le poisson si besoin).",
        "Fais cuire la base (riz, p\u00e2tes ou nouilles) selon les instructions du paquet.",
        "Dans une po\u00eale, fais revenir la viande, le poisson ou les l\u00e9gumes avec un peu d\u2019huile.",
        "Ajoute la sauce (soja, miso, tomates ou autre) et laisse mijoter quelques minutes.",
        "M\u00e9lange avec la base (ou sers \u00e0 c\u00f4t\u00e9) et d\u00e9guste."
    ]
  },
  {
    id: "r40",
    name: "B\u0153uf saut\u00e9 aux poireaux",
    type: RecipeType.VIANDE,
    durationMinutes: 20,
    difficulty: "Facile",
    ingredients: [
        { name: "Viande (poulet, porc ou b\u0153uf)", quantity: "400 g", category: "Viande" },
        { name: "L\u00e9gumes (carottes, chou, poivron\u2026)", quantity: "300 g", category: "L\u00e9gumes" },
        { name: "Riz, p\u00e2tes ou nouilles", quantity: "300 g", category: "\u00c9picerie" }
    ],
    steps: [
        "Pr\u00e9pare les ingr\u00e9dients (lave et coupe les l\u00e9gumes, pr\u00e9pare la viande ou le poisson si besoin).",
        "Fais cuire la base (riz, p\u00e2tes ou nouilles) selon les instructions du paquet.",
        "Dans une po\u00eale, fais revenir la viande, le poisson ou les l\u00e9gumes avec un peu d\u2019huile.",
        "Ajoute la sauce (soja, miso, tomates ou autre) et laisse mijoter quelques minutes.",
        "M\u00e9lange avec la base (ou sers \u00e0 c\u00f4t\u00e9) et d\u00e9guste."
    ]
  },
  {
    id: "r41",
    name: "Omelette l\u00e9gumes vari\u00e9s",
    type: RecipeType.VEGE,
    durationMinutes: 20,
    difficulty: "Facile",
    ingredients: [
        { name: "L\u00e9gumes vari\u00e9s", quantity: "400 g", category: "L\u00e9gumes" },
        { name: "Riz, p\u00e2tes ou nouilles", quantity: "300 g", category: "\u00c9picerie" },
        { name: "Tofu ou \u0153ufs (optionnel)", quantity: "200 g", category: "Frais" }
    ],
    steps: [
        "Pr\u00e9pare les ingr\u00e9dients (lave et coupe les l\u00e9gumes, pr\u00e9pare la viande ou le poisson si besoin).",
        "Fais cuire la base (riz, p\u00e2tes ou nouilles) selon les instructions du paquet.",
        "Dans une po\u00eale, fais revenir la viande, le poisson ou les l\u00e9gumes avec un peu d\u2019huile.",
        "Ajoute la sauce (soja, miso, tomates ou autre) et laisse mijoter quelques minutes.",
        "M\u00e9lange avec la base (ou sers \u00e0 c\u00f4t\u00e9) et d\u00e9guste."
    ]
  },
  {
    id: "r42",
    name: "Gratin de p\u00e2tes express",
    type: RecipeType.VEGE,
    durationMinutes: 20,
    difficulty: "Facile",
    ingredients: [
        { name: "L\u00e9gumes vari\u00e9s", quantity: "400 g", category: "L\u00e9gumes" },
        { name: "Riz, p\u00e2tes ou nouilles", quantity: "300 g", category: "\u00c9picerie" },
        { name: "Tofu ou \u0153ufs (optionnel)", quantity: "200 g", category: "Frais" }
    ],
    steps: [
        "Pr\u00e9pare les ingr\u00e9dients (lave et coupe les l\u00e9gumes, pr\u00e9pare la viande ou le poisson si besoin).",
        "Fais cuire la base (riz, p\u00e2tes ou nouilles) selon les instructions du paquet.",
        "Dans une po\u00eale, fais revenir la viande, le poisson ou les l\u00e9gumes avec un peu d\u2019huile.",
        "Ajoute la sauce (soja, miso, tomates ou autre) et laisse mijoter quelques minutes.",
        "M\u00e9lange avec la base (ou sers \u00e0 c\u00f4t\u00e9) et d\u00e9guste."
    ]
  },
  {
    id: "r43",
    name: "Curry doux de l\u00e9gumes",
    type: RecipeType.VEGE,
    durationMinutes: 20,
    difficulty: "Facile",
    ingredients: [
        { name: "L\u00e9gumes vari\u00e9s", quantity: "400 g", category: "L\u00e9gumes" },
        { name: "Riz, p\u00e2tes ou nouilles", quantity: "300 g", category: "\u00c9picerie" },
        { name: "Tofu ou \u0153ufs (optionnel)", quantity: "200 g", category: "Frais" }
    ],
    steps: [
        "Pr\u00e9pare les ingr\u00e9dients (lave et coupe les l\u00e9gumes, pr\u00e9pare la viande ou le poisson si besoin).",
        "Fais cuire la base (riz, p\u00e2tes ou nouilles) selon les instructions du paquet.",
        "Dans une po\u00eale, fais revenir la viande, le poisson ou les l\u00e9gumes avec un peu d\u2019huile.",
        "Ajoute la sauce (soja, miso, tomates ou autre) et laisse mijoter quelques minutes.",
        "M\u00e9lange avec la base (ou sers \u00e0 c\u00f4t\u00e9) et d\u00e9guste."
    ]
  },
  {
    id: "r44",
    name: "Riz cantonais maison",
    type: RecipeType.VIANDE,
    durationMinutes: 20,
    difficulty: "Facile",
    ingredients: [
        { name: "Viande (poulet, porc ou b\u0153uf)", quantity: "400 g", category: "Viande" },
        { name: "L\u00e9gumes (carottes, chou, poivron\u2026)", quantity: "300 g", category: "L\u00e9gumes" },
        { name: "Riz, p\u00e2tes ou nouilles", quantity: "300 g", category: "\u00c9picerie" }
    ],
    steps: [
        "Pr\u00e9pare les ingr\u00e9dients (lave et coupe les l\u00e9gumes, pr\u00e9pare la viande ou le poisson si besoin).",
        "Fais cuire la base (riz, p\u00e2tes ou nouilles) selon les instructions du paquet.",
        "Dans une po\u00eale, fais revenir la viande, le poisson ou les l\u00e9gumes avec un peu d\u2019huile.",
        "Ajoute la sauce (soja, miso, tomates ou autre) et laisse mijoter quelques minutes.",
        "M\u00e9lange avec la base (ou sers \u00e0 c\u00f4t\u00e9) et d\u00e9guste."
    ]
  },
  {
    id: "r45",
    name: "Poisson pan\u00e9 et petits pois",
    type: RecipeType.POISSON,
    durationMinutes: 20,
    difficulty: "Facile",
    ingredients: [
        { name: "Poisson (saumon, cabillaud, thon\u2026)", quantity: "400 g", category: "Poisson" },
        { name: "L\u00e9gumes (carottes, chou, etc.)", quantity: "300 g", category: "L\u00e9gumes" },
        { name: "Riz ou nouilles", quantity: "300 g", category: "\u00c9picerie" },
        { name: "Sauce soja ou assaisonnement", quantity: "2 c\u00e0s", category: "\u00c9picerie" }
    ],
    steps: [
        "Pr\u00e9pare les ingr\u00e9dients (lave et coupe les l\u00e9gumes, pr\u00e9pare la viande ou le poisson si besoin).",
        "Fais cuire la base (riz, p\u00e2tes ou nouilles) selon les instructions du paquet.",
        "Dans une po\u00eale, fais revenir la viande, le poisson ou les l\u00e9gumes avec un peu d\u2019huile.",
        "Ajoute la sauce (soja, miso, tomates ou autre) et laisse mijoter quelques minutes.",
        "M\u00e9lange avec la base (ou sers \u00e0 c\u00f4t\u00e9) et d\u00e9guste."
    ]
  },
  {
    id: "r46",
    name: "Salade thon ma\u00efs",
    type: RecipeType.POISSON,
    durationMinutes: 20,
    difficulty: "Facile",
    ingredients: [
        { name: "Poisson (saumon, cabillaud, thon\u2026)", quantity: "400 g", category: "Poisson" },
        { name: "L\u00e9gumes (carottes, chou, etc.)", quantity: "300 g", category: "L\u00e9gumes" },
        { name: "Riz ou nouilles", quantity: "300 g", category: "\u00c9picerie" },
        { name: "Sauce soja ou assaisonnement", quantity: "2 c\u00e0s", category: "\u00c9picerie" }
    ],
    steps: [
        "Pr\u00e9pare les ingr\u00e9dients (lave et coupe les l\u00e9gumes, pr\u00e9pare la viande ou le poisson si besoin).",
        "Fais cuire la base (riz, p\u00e2tes ou nouilles) selon les instructions du paquet.",
        "Dans une po\u00eale, fais revenir la viande, le poisson ou les l\u00e9gumes avec un peu d\u2019huile.",
        "Ajoute la sauce (soja, miso, tomates ou autre) et laisse mijoter quelques minutes.",
        "M\u00e9lange avec la base (ou sers \u00e0 c\u00f4t\u00e9) et d\u00e9guste."
    ]
  },
  {
    id: "r47",
    name: "Bolognaise rapide",
    type: RecipeType.VIANDE,
    durationMinutes: 20,
    difficulty: "Facile",
    ingredients: [
        { name: "Viande (poulet, porc ou b\u0153uf)", quantity: "400 g", category: "Viande" },
        { name: "L\u00e9gumes (carottes, chou, poivron\u2026)", quantity: "300 g", category: "L\u00e9gumes" },
        { name: "Riz, p\u00e2tes ou nouilles", quantity: "300 g", category: "\u00c9picerie" }
    ],
    steps: [
        "Pr\u00e9pare les ingr\u00e9dients (lave et coupe les l\u00e9gumes, pr\u00e9pare la viande ou le poisson si besoin).",
        "Fais cuire la base (riz, p\u00e2tes ou nouilles) selon les instructions du paquet.",
        "Dans une po\u00eale, fais revenir la viande, le poisson ou les l\u00e9gumes avec un peu d\u2019huile.",
        "Ajoute la sauce (soja, miso, tomates ou autre) et laisse mijoter quelques minutes.",
        "M\u00e9lange avec la base (ou sers \u00e0 c\u00f4t\u00e9) et d\u00e9guste."
    ]
  },
  {
    id: "r48",
    name: "P\u00e2tes jambon cr\u00e8me",
    type: RecipeType.VIANDE,
    durationMinutes: 20,
    difficulty: "Facile",
    ingredients: [
        { name: "Viande (poulet, porc ou b\u0153uf)", quantity: "400 g", category: "Viande" },
        { name: "L\u00e9gumes (carottes, chou, poivron\u2026)", quantity: "300 g", category: "L\u00e9gumes" },
        { name: "Riz, p\u00e2tes ou nouilles", quantity: "300 g", category: "\u00c9picerie" }
    ],
    steps: [
        "Pr\u00e9pare les ingr\u00e9dients (lave et coupe les l\u00e9gumes, pr\u00e9pare la viande ou le poisson si besoin).",
        "Fais cuire la base (riz, p\u00e2tes ou nouilles) selon les instructions du paquet.",
        "Dans une po\u00eale, fais revenir la viande, le poisson ou les l\u00e9gumes avec un peu d\u2019huile.",
        "Ajoute la sauce (soja, miso, tomates ou autre) et laisse mijoter quelques minutes.",
        "M\u00e9lange avec la base (ou sers \u00e0 c\u00f4t\u00e9) et d\u00e9guste."
    ]
  },
  {
    id: "r49",
    name: "Wok de l\u00e9gumes aux soba",
    type: RecipeType.VEGE,
    durationMinutes: 20,
    difficulty: "Facile",
    ingredients: [
        { name: "L\u00e9gumes vari\u00e9s", quantity: "400 g", category: "L\u00e9gumes" },
        { name: "Riz, p\u00e2tes ou nouilles", quantity: "300 g", category: "\u00c9picerie" },
        { name: "Tofu ou \u0153ufs (optionnel)", quantity: "200 g", category: "Frais" }
    ],
    steps: [
        "Pr\u00e9pare les ingr\u00e9dients (lave et coupe les l\u00e9gumes, pr\u00e9pare la viande ou le poisson si besoin).",
        "Fais cuire la base (riz, p\u00e2tes ou nouilles) selon les instructions du paquet.",
        "Dans une po\u00eale, fais revenir la viande, le poisson ou les l\u00e9gumes avec un peu d\u2019huile.",
        "Ajoute la sauce (soja, miso, tomates ou autre) et laisse mijoter quelques minutes.",
        "M\u00e9lange avec la base (ou sers \u00e0 c\u00f4t\u00e9) et d\u00e9guste."
    ]
  }
  ];


  function loadJSON(key, fallback) {
    try {
      const raw = localStorage.getItem(key);
      if (!raw) return fallback;
      const parsed = JSON.parse(raw);
      return parsed ?? fallback;
    } catch {
      return fallback;
    }
  }

  function saveJSON(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  let ratings = loadJSON("papacook_ratings", {});
  let customRecipes = loadJSON("papacook_custom_recipes", []);
  let recipeOverrides = loadJSON("papacook_recipe_overrides", {});
  let storedWeekPlanIds = loadJSON("papacook_week_plan_ids", null);
  let storedWeekIncluded = loadJSON("papacook_week_included", null);

  function saveWeekState() {
    const ids = currentWeekPlan.map(r => r ? r.id : null);
    saveJSON("papacook_week_plan_ids", ids);
    saveJSON("papacook_week_included", currentWeekIncluded);
  }

  function getRating(id) {
    return ratings[id] || "none";
  }

  function setRating(id, value) {
    ratings[id] = value;
    saveJSON("papacook_ratings", ratings);
  }

  function saveCustomRecipes() {
    saveJSON("papacook_custom_recipes", customRecipes);
  }

  function saveOverrides() {
    saveJSON("papacook_recipe_overrides", recipeOverrides);
  }

  function applyOverrides(recipe) {
    const o = recipeOverrides[recipe.id];
    if (!o) return recipe;
    return { ...recipe, ...o };
  }

  function getAllRecipes() {
    const base = baseRecipes.map(applyOverrides);
    const custom = customRecipes.map(applyOverrides);
    return base.concat(custom);
  }

  function shuffle(array) {
    const a = array.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  function generateWeekPlan() {
    const all = getAllRecipes();
    const usable = all.filter(r => getRating(r.id) !== "aOublier");
    const source = usable.length > 0 ? usable : all;

    const good = source.filter(r => getRating(r.id) === "aRefaire");
    const neutral = source.filter(r => getRating(r.id) === "none");

    let pool = [...shuffle(good), ...shuffle(neutral)];
    if (pool.length < DAYS.length) {
      pool = pool.concat(shuffle(source));
    }
    if (pool.length === 0) return new Array(DAYS.length).fill(null);

    const plan = [];
    for (let i = 0; i < DAYS.length; i++) {
      plan.push(pool[i % pool.length]);
    }
    return plan;
  }

  let currentWeekPlan;
  let currentWeekIncluded = new Array(DAYS.length).fill(false);

  function rebuildWeekFromStored() {
    if (!storedWeekPlanIds || !Array.isArray(storedWeekPlanIds) || storedWeekPlanIds.length !== DAYS.length) {
      return false;
    }
    const all = getAllRecipes();
    const byId = {};
    all.forEach(r => { byId[r.id] = r; });
    const plan = storedWeekPlanIds.map(id => (id && byId[id]) ? byId[id] : null);
    currentWeekPlan = plan;
    if (Array.isArray(storedWeekIncluded) && storedWeekIncluded.length === DAYS.length) {
      currentWeekIncluded = storedWeekIncluded.slice();
    } else {
      currentWeekIncluded = new Array(DAYS.length).fill(false);
    }
    return true;
  }

  if (!rebuildWeekFromStored()) {
    currentWeekPlan = generateWeekPlan();
    currentWeekIncluded = new Array(DAYS.length).fill(false);
    saveWeekState();
  }

  const contentDiv = document.getElementById("content");

  function labelType(type) {
    switch (type) {
      case RecipeType.VIANDE: return "Viande";
      case RecipeType.POISSON: return "Poisson";
      case RecipeType.VEGE: return "Végétarien";
      default: return "";
    }
  }

  function isCustom(recipe) {
    return recipe.id && recipe.id.startsWith("custom-");
  }

  function renderRecipeDetail(recipe, options = {}) {
    const rating = getRating(recipe.id);
    contentDiv.innerHTML = "";

    const card = document.createElement("div");
    card.className = "card";

    const headerRow = document.createElement("div");
    headerRow.className = "flex-between";

    const title = document.createElement("h2");
    title.textContent = recipe.name;
    headerRow.appendChild(title);
    card.appendChild(headerRow);

    if (options.fromWeek || options.fromForgotten) {
      const backRow = document.createElement("div");
      backRow.className = "button-row";
      const btnBack = document.createElement("button");
      btnBack.textContent = options.fromForgotten ? "Retour aux recettes oubliées" : "Retour au planning";
      btnBack.onclick = () => {
        if (options.fromForgotten) renderForgottenRecipes();
        else renderWeek();
      };
      backRow.appendChild(btnBack);
      card.appendChild(backRow);
    }

    const tagRow = document.createElement("div");
    tagRow.className = "tag-row";

    const tagInfo = document.createElement("span");
    tagInfo.className = "tag";
    tagInfo.textContent = (recipe.durationMinutes || 20) + " min • " + (recipe.difficulty || "Facile");

    const tagType = document.createElement("span");
    tagType.className = "tag type";
    tagType.textContent = labelType(recipe.type);

    tagRow.appendChild(tagInfo);
    tagRow.appendChild(tagType);

    if (rating === "aRefaire") {
      const t = document.createElement("span");
      t.className = "tag good";
      t.textContent = "À refaire";
      tagRow.appendChild(t);
    } else if (rating === "aOublier") {
      const t = document.createElement("span");
      t.className = "tag bad";
      t.textContent = "À oublier";
      tagRow.appendChild(t);
    }

    if (isCustom(recipe)) {
      const t = document.createElement("span");
      t.className = "tag custom";
      t.textContent = "Recette perso";
      tagRow.appendChild(t);
    }

    card.appendChild(tagRow);

    const ratingRow = document.createElement("div");
    ratingRow.className = "button-row";

    const btnGood = document.createElement("button");
    btnGood.className = "outline";
    btnGood.textContent = rating === "aRefaire" ? "Enlever 'À refaire'" : "Marquer 'À refaire'";
    btnGood.onclick = () => {
      const cur = getRating(recipe.id);
      const val = cur === "aRefaire" ? "none" : "aRefaire";
      setRating(recipe.id, val);
      currentWeekPlan = generateWeekPlan();
      saveWeekState();
      renderRecipeDetail(recipe, options);
    };

    const btnBad = document.createElement("button");
    btnBad.className = "danger";
    btnBad.textContent = rating === "aOublier" ? "Enlever 'À oublier'" : "Marquer 'À oublier'";
    btnBad.onclick = () => {
      const cur = getRating(recipe.id);
      const val = cur === "aOublier" ? "none" : "aOublier";
      setRating(recipe.id, val);
      currentWeekPlan = generateWeekPlan();
      saveWeekState();
      renderRecipeDetail(recipe, options);
    };

    ratingRow.appendChild(btnGood);
    ratingRow.appendChild(btnBad);

    if (options.showAnotherButton) {
      const btnAnother = document.createElement("button");
      btnAnother.className = "primary";
      btnAnother.textContent = "Autre idée";
      btnAnother.onclick = renderRandomRecipe;
      ratingRow.appendChild(btnAnother);
    }

    card.appendChild(ratingRow);

    const ingTitle = document.createElement("div");
    ingTitle.className = "section-title";
    ingTitle.textContent = "Ingrédients";
    card.appendChild(ingTitle);

    const ingList = document.createElement("ul");
    (recipe.ingredients || []).forEach(ing => {
      const li = document.createElement("li");
      const qty = ing.quantity ? ing.quantity + " " : "";
      li.textContent = qty + ing.name;
      ingList.appendChild(li);
    });
    card.appendChild(ingList);

    const stepsTitle = document.createElement("div");
    stepsTitle.className = "section-title";
    stepsTitle.textContent = "Étapes";
    card.appendChild(stepsTitle);

    const stepsList = document.createElement("ol");
    (recipe.steps || []).forEach(step => {
      const li = document.createElement("li");
      li.textContent = step;
      li.style.marginBottom = "0.3rem";
      stepsList.appendChild(li);
    });
    card.appendChild(stepsList);

    const editRow = document.createElement("div");
    editRow.className = "button-row";
    const btnEdit = document.createElement("button");
    btnEdit.textContent = "Modifier";
    btnEdit.onclick = () => {
      renderEditRecipe(recipe, options);
    };
    editRow.appendChild(btnEdit);
    card.appendChild(editRow);

    contentDiv.appendChild(card);
  }

  function renderRandomRecipe() {
    const all = getAllRecipes();
    const usable = all.filter(r => getRating(r.id) !== "aOublier");
    const source = usable.length > 0 ? usable : all;
    if (source.length === 0) {
      contentDiv.innerHTML = "<p>Aucune recette disponible.</p>";
      return;
    }
    const recipe = source[Math.floor(Math.random() * source.length)];
    renderRecipeDetail(recipe, { showAnotherButton: true });
  }

  function renderWeek() {
    contentDiv.innerHTML = "";

    const card = document.createElement("div");
    card.className = "card";

    const headerRow = document.createElement("div");
    headerRow.className = "flex-between";

    const title = document.createElement("h2");
    title.textContent = "Organisation de la semaine";
    headerRow.appendChild(title);
    card.appendChild(headerRow);

    const buttonBar = document.createElement("div");
    buttonBar.className = "button-row";

    const btnNewWeek = document.createElement("button");
    btnNewWeek.className = "outline";
    btnNewWeek.textContent = "Nouvelle proposition";
    btnNewWeek.onclick = () => {
      const newPlan = generateWeekPlan();
      for (let i = 0; i < DAYS.length; i++) {
        if (!currentWeekIncluded[i]) {
          currentWeekPlan[i] = newPlan[i];
        }
      }
      saveWeekState();
      renderWeek();
    };

    const btnList = document.createElement("button");
    btnList.className = "primary";
    btnList.textContent = "Voir la liste de courses";
    btnList.onclick = () => {
      renderShoppingList();
    };

    const btnForgotten = document.createElement("button");
    btnForgotten.textContent = "Recettes oubliées";
    btnForgotten.onclick = () => {
      renderForgottenRecipes();
    };

    buttonBar.appendChild(btnNewWeek);
    buttonBar.appendChild(btnList);
    buttonBar.appendChild(btnForgotten);
    card.appendChild(buttonBar);

    DAYS.forEach((dayName, index) => {
      const recipe = currentWeekPlan[index];

      const row = document.createElement("div");
      row.className = "day-row";

      const dName = document.createElement("div");
      dName.className = "day-name";
      dName.textContent = dayName;

      const dRecipe = document.createElement("div");
      dRecipe.className = "day-recipe";
      dRecipe.textContent = recipe ? recipe.name : "—";

      const controls = document.createElement("div");
      controls.style.display = "flex";
      controls.style.gap = "0.25rem";
      controls.style.alignItems = "center";

      const includeLabel = document.createElement("label");
      includeLabel.className = "small";
      const includeCheckbox = document.createElement("input");
      includeCheckbox.type = "checkbox";
      includeCheckbox.checked = currentWeekIncluded[index];
      includeCheckbox.onchange = () => {
        currentWeekIncluded[index] = includeCheckbox.checked;
        saveWeekState();
      };
      includeLabel.appendChild(includeCheckbox);
      const spanText = document.createElement("span");
      spanText.textContent = " Inclure";
      includeLabel.appendChild(spanText);

      const btnChange = document.createElement("button");
      btnChange.textContent = "Changer";
      btnChange.onclick = () => {
        const all = getAllRecipes().filter(r => getRating(r.id) !== "aOublier");
        const source = all.length > 0 ? all : getAllRecipes();
        if (source.length === 0) return;
        const newRecipe = source[Math.floor(Math.random() * source.length)];
        currentWeekPlan[index] = newRecipe;
        saveWeekState();
        renderWeek();
      };

      const btnDetail = document.createElement("button");
      btnDetail.textContent = "Voir";
      btnDetail.onclick = () => {
        if (!recipe) return;
        renderRecipeDetail(recipe, { fromWeek: true });
      };

      controls.appendChild(includeLabel);
      controls.appendChild(btnChange);
      controls.appendChild(btnDetail);

      row.appendChild(dName);
      row.appendChild(dRecipe);
      row.appendChild(controls);

      card.appendChild(row);
    });

    const footerButtons = document.createElement("div");
    footerButtons.className = "button-row";

    const btnAddRecipe = document.createElement("button");
    btnAddRecipe.textContent = "Ajouter une recette";
    btnAddRecipe.onclick = () => {
      renderAddRecipe();
    };

    footerButtons.appendChild(btnAddRecipe);
    card.appendChild(footerButtons);

    contentDiv.appendChild(card);
  }

  function renderShoppingList() {
    contentDiv.innerHTML = "";

    const card = document.createElement("div");
    card.className = "card";

    const headerRow = document.createElement("div");
    headerRow.className = "flex-between";

    const title = document.createElement("h2");
    title.textContent = "Liste de courses";
    headerRow.appendChild(title);
    card.appendChild(headerRow);

    const subtitle = document.createElement("div");
    subtitle.className = "small";
    subtitle.textContent = "Basée sur les jours cochés dans le planning.";
    card.appendChild(subtitle);

    const backRow = document.createElement("div");
    backRow.className = "button-row";
    const btnBack = document.createElement("button");
    btnBack.textContent = "Retour au planning";
    btnBack.onclick = () => {
      renderWeek();
    };
    backRow.appendChild(btnBack);
    card.appendChild(backRow);

    const map = {};

    currentWeekPlan.forEach((recipe, index) => {
      if (!recipe) return;
      if (!currentWeekIncluded[index]) return;
      (recipe.ingredients || []).forEach(ing => {
        const cat = ing.category || "Autre";
        if (!map[cat]) map[cat] = {};
        if (!map[cat][ing.name]) {
          map[cat][ing.name] = ing.quantity || "";
        } else {
          const existing = map[cat][ing.name];
          const add = ing.quantity || "";
          if (existing && add) {
            map[cat][ing.name] = existing + " + " + add;
          } else {
            map[cat][ing.name] = existing || add;
          }
        }
      });
    });

    const categories = Object.keys(map).sort();
    categories.forEach(cat => {
      const catTitle = document.createElement("div");
      catTitle.className = "section-title";
      catTitle.style.marginTop = "0.75rem";
      catTitle.textContent = cat;
      card.appendChild(catTitle);

      const ul = document.createElement("ul");
      const items = Object.keys(map[cat]).sort();
      items.forEach(name => {
        const li = document.createElement("li");
        const qty = map[cat][name];
        li.textContent = qty ? `${name} : ${qty}` : name;
        ul.appendChild(li);
      });
      card.appendChild(ul);
    });

    contentDiv.appendChild(card);
  }

  function renderForgottenRecipes() {
    contentDiv.innerHTML = "";

    const card = document.createElement("div");
    card.className = "card";

    const headerRow = document.createElement("div");
    headerRow.className = "flex-between";

    const title = document.createElement("h2");
    title.textContent = "Recettes oubliées";
    headerRow.appendChild(title);
    card.appendChild(headerRow);

    const subtitle = document.createElement("div");
    subtitle.className = "small";
    subtitle.textContent = "Recettes marquées 'À oublier' (tu peux les récupérer).";
    card.appendChild(subtitle);

    const backRow = document.createElement("div");
    backRow.className = "button-row";
    const btnBack = document.createElement("button");
    btnBack.textContent = "Retour au planning";
    btnBack.onclick = () => {
      renderWeek();
    };
    backRow.appendChild(btnBack);
    card.appendChild(backRow);

    const all = getAllRecipes();
    const forgotten = all.filter(r => getRating(r.id) === "aOublier");

    if (forgotten.length === 0) {
      const msg = document.createElement("p");
      msg.textContent = "Aucune recette marquée 'À oublier'.";
      card.appendChild(msg);
      contentDiv.appendChild(card);
      return;
    }

    forgotten.forEach(recipe => {
      const row = document.createElement("div");
      row.className = "day-row";

      const nameDiv = document.createElement("div");
      nameDiv.className = "day-recipe";
      nameDiv.textContent = recipe.name;

      const controls = document.createElement("div");
      controls.style.display = "flex";
      controls.style.gap = "0.25rem";
      controls.style.alignItems = "center";

      const btnView = document.createElement("button");
      btnView.textContent = "Voir";
      btnView.onclick = () => {
        renderRecipeDetail(recipe, { fromForgotten: true });
      };

      const btnRecover = document.createElement("button");
      btnRecover.textContent = "Récupérer";
      btnRecover.onclick = () => {
        setRating(recipe.id, "none");
        renderForgottenRecipes();
      };

      controls.appendChild(btnView);
      controls.appendChild(btnRecover);

      row.appendChild(nameDiv);
      row.appendChild(controls);

      card.appendChild(row);
    });

    contentDiv.appendChild(card);
  }

  function renderAddRecipe() {
    contentDiv.innerHTML = "";

    const card = document.createElement("div");
    card.className = "card";

    const title = document.createElement("h2");
    title.textContent = "Ajouter une recette";
    card.appendChild(title);

    const info = document.createElement("div");
    info.className = "small";
    info.textContent = "Format simple : pense à un repas réaliste de soir de semaine.";
    card.appendChild(info);

    const form = document.createElement("div");

    const groupName = document.createElement("div");
    groupName.className = "form-group";
    const labelName = document.createElement("label");
    labelName.textContent = "Nom de la recette";
    const inputName = document.createElement("input");
    inputName.type = "text";
    inputName.placeholder = "Ex : Gratin de pâtes aux légumes";
    groupName.appendChild(labelName);
    groupName.appendChild(inputName);
    form.appendChild(groupName);

    const groupType = document.createElement("div");
    groupType.className = "form-group";
    const labelTypeEl = document.createElement("label");
    labelTypeEl.textContent = "Type";
    const selectType = document.createElement("select");
    [
      { value: RecipeType.VIANDE, label: "Viande" },
      { value: RecipeType.POISSON, label: "Poisson" },
      { value: RecipeType.VEGE, label: "Végétarien" }
    ].forEach(opt => {
      const o = document.createElement("option");
      o.value = opt.value;
      o.textContent = opt.label;
      selectType.appendChild(o);
    });
    groupType.appendChild(labelTypeEl);
    groupType.appendChild(selectType);
    form.appendChild(groupType);

    const groupDuration = document.createElement("div");
    groupDuration.className = "form-group";
    const labelDur = document.createElement("label");
    labelDur.textContent = "Durée (minutes)";
    const inputDur = document.createElement("input");
    inputDur.type = "number";
    inputDur.min = "5";
    inputDur.max = "180";
    inputDur.value = "30";
    groupDuration.appendChild(labelDur);
    groupDuration.appendChild(inputDur);
    form.appendChild(groupDuration);

    const groupDiff = document.createElement("div");
    groupDiff.className = "form-group";
    const labelDiff = document.createElement("label");
    labelDiff.textContent = "Difficulté";
    const selectDiff = document.createElement("select");
    ["Très facile","Facile","Moyen"].forEach(l => {
      const o = document.createElement("option");
      o.value = l;
      o.textContent = l;
      selectDiff.appendChild(o);
    });
    groupDiff.appendChild(labelDiff);
    groupDiff.appendChild(selectDiff);
    form.appendChild(groupDiff);

    const groupIng = document.createElement("div");
    groupIng.className = "form-group";
    const labelIng = document.createElement("label");
    labelIng.textContent = "Ingrédients (1 par ligne : quantité - nom - catégorie)";
    const textareaIng = document.createElement("textarea");
    textareaIng.placeholder = "Ex :\n200 g - Pâtes - Épicerie\n2 - Carottes - Légumes";
    groupIng.appendChild(labelIng);
    groupIng.appendChild(textareaIng);
    form.appendChild(groupIng);

    const groupSteps = document.createElement("div");
    groupSteps.className = "form-group";
    const labelSteps = document.createElement("label");
    labelSteps.textContent = "Étapes (1 par ligne)";
    const textareaSteps = document.createElement("textarea");
    textareaSteps.placeholder = "Ex :\nFais cuire les pâtes.\nCoupe les légumes.\nMélange et sers.";
    groupSteps.appendChild(labelSteps);
    groupSteps.appendChild(textareaSteps);
    form.appendChild(groupSteps);

    const errorDiv = document.createElement("div");
    errorDiv.className = "error";
    form.appendChild(errorDiv);

    const buttons = document.createElement("div");
    buttons.className = "button-row";

    const btnSave = document.createElement("button");
    btnSave.className = "primary";
    btnSave.textContent = "Enregistrer la recette";
    btnSave.onclick = () => {
      errorDiv.textContent = "";
      const name = inputName.value.trim();
      const type = selectType.value;
      const duration = parseInt(inputDur.value, 10) || 30;
      const difficulty = selectDiff.value;
      const ingredientsText = textareaIng.value.trim();
      const stepsText = textareaSteps.value.trim();

      if (!name) {
        errorDiv.textContent = "Merci de donner un nom à la recette.";
        return;
      }
      if (!stepsText) {
        errorDiv.textContent = "Merci d’indiquer au moins une étape.";
        return;
      }

      const ingredients = [];
      if (ingredientsText) {
        const lines = ingredientsText.split("\n").map(l => l.trim()).filter(Boolean);
        lines.forEach(line => {
          const parts = line.split("-").map(p => p.trim());
          let quantity = "";
          let ingName = "";
          let category = "Autre";
          if (parts.length >= 3) {
            quantity = parts[0];
            ingName = parts[1];
            category = parts[2];
          } else if (parts.length === 2) {
            quantity = parts[0];
            ingName = parts[1];
          } else {
            ingName = line;
          }
          ingredients.push({ name: ingName, quantity, category });
        });
      }

      const steps = stepsText.split("\n").map(l => l.trim()).filter(Boolean);

      const newRecipe = {
        id: "custom-" + Date.now() + "-" + Math.floor(Math.random() * 100000),
        name,
        type,
        durationMinutes: duration,
        difficulty,
        ingredients,
        steps
      };

      customRecipes.push(newRecipe);
      saveCustomRecipes();
      currentWeekPlan = generateWeekPlan();
      currentWeekIncluded = new Array(DAYS.length).fill(false);
      saveWeekState();
      renderRecipeDetail(newRecipe, { showAnotherButton: true });
    };

    const btnCancel = document.createElement("button");
    btnCancel.textContent = "Annuler";
    btnCancel.onclick = () => {
      renderWeek();
    };

    buttons.appendChild(btnSave);
    buttons.appendChild(btnCancel);
    form.appendChild(buttons);

    card.appendChild(form);
    contentDiv.appendChild(card);
  }

  function renderEditRecipe(recipe, options = {}) {
    contentDiv.innerHTML = "";

    const card = document.createElement("div");
    card.className = "card";

    const title = document.createElement("h2");
    title.textContent = "Modifier la recette";
    card.appendChild(title);

    const info = document.createElement("div");
    info.className = "small";
    info.textContent = "Tes changements seront gardés sur cet appareil.";
    card.appendChild(info);

    const form = document.createElement("div");

    const groupName = document.createElement("div");
    groupName.className = "form-group";
    const labelName = document.createElement("label");
    labelName.textContent = "Nom de la recette";
    const inputName = document.createElement("input");
    inputName.type = "text";
    inputName.value = recipe.name || "";
    groupName.appendChild(labelName);
    groupName.appendChild(inputName);
    form.appendChild(groupName);

    const groupType = document.createElement("div");
    groupType.className = "form-group";
    const labelTypeEl = document.createElement("label");
    labelTypeEl.textContent = "Type";
    const selectType = document.createElement("select");
    [
      { value: RecipeType.VIANDE, label: "Viande" },
      { value: RecipeType.POISSON, label: "Poisson" },
      { value: RecipeType.VEGE, label: "Végétarien" }
    ].forEach(opt => {
      const o = document.createElement("option");
      o.value = opt.value;
      o.textContent = opt.label;
      if (recipe.type === opt.value) o.selected = true;
      selectType.appendChild(o);
    });
    groupType.appendChild(labelTypeEl);
    groupType.appendChild(selectType);
    form.appendChild(groupType);

    const groupDuration = document.createElement("div");
    groupDuration.className = "form-group";
    const labelDur = document.createElement("label");
    labelDur.textContent = "Durée (minutes)";
    const inputDur = document.createElement("input");
    inputDur.type = "number";
    inputDur.min = "5";
    inputDur.max = "180";
    inputDur.value = String(recipe.durationMinutes || 20);
    groupDuration.appendChild(labelDur);
    groupDuration.appendChild(inputDur);
    form.appendChild(groupDuration);

    const groupDiff = document.createElement("div");
    groupDiff.className = "form-group";
    const labelDiff = document.createElement("label");
    labelDiff.textContent = "Difficulté";
    const selectDiff = document.createElement("select");
    ["Très facile","Facile","Moyen"].forEach(l => {
      const o = document.createElement("option");
      o.value = l;
      o.textContent = l;
      if (recipe.difficulty === l) o.selected = true;
      selectDiff.appendChild(o);
    });
    groupDiff.appendChild(labelDiff);
    groupDiff.appendChild(selectDiff);
    form.appendChild(groupDiff);

    const groupIng = document.createElement("div");
    groupIng.className = "form-group";
    const labelIng = document.createElement("label");
    labelIng.textContent = "Ingrédients (1 par ligne : quantité - nom - catégorie)";
    const textareaIng = document.createElement("textarea");
    const ingLines = (recipe.ingredients || []).map(ing => {
      const qty = ing.quantity || "";
      const name = ing.name || "";
      const cat = ing.category || "";
      return (qty ? qty + " - " : "") + name + (cat ? " - " + cat : "");
    });
    textareaIng.value = ingLines.join("\n");
    groupIng.appendChild(labelIng);
    groupIng.appendChild(textareaIng);
    form.appendChild(groupIng);

    const groupSteps = document.createElement("div");
    groupSteps.className = "form-group";
    const labelSteps = document.createElement("label");
    labelSteps.textContent = "Étapes (1 par ligne)";
    const textareaSteps = document.createElement("textarea");
    textareaSteps.value = (recipe.steps || []).join("\n");
    groupSteps.appendChild(labelSteps);
    groupSteps.appendChild(textareaSteps);
    form.appendChild(groupSteps);

    const errorDiv = document.createElement("div");
    errorDiv.className = "error";
    form.appendChild(errorDiv);

    const buttons = document.createElement("div");
    buttons.className = "button-row";

    const btnSave = document.createElement("button");
    btnSave.className = "primary";
    btnSave.textContent = "Enregistrer les modifications";
    btnSave.onclick = () => {
      errorDiv.textContent = "";
      const name = inputName.value.trim();
      const type = selectType.value;
      const duration = parseInt(inputDur.value, 10) || 20;
      const difficulty = selectDiff.value;
      const ingredientsText = textareaIng.value.trim();
      const stepsText = textareaSteps.value.trim();

      if (!name) {
        errorDiv.textContent = "Merci de donner un nom à la recette.";
        return;
      }
      if (!stepsText) {
        errorDiv.textContent = "Merci d’indiquer au moins une étape.";
        return;
      }

      const ingredients = [];
      if (ingredientsText) {
        const lines = ingredientsText.split("\n").map(l => l.trim()).filter(Boolean);
        lines.forEach(line => {
          const parts = line.split("-").map(p => p.trim());
          let quantity = "";
          let ingName = "";
          let category = "Autre";
          if (parts.length >= 3) {
            quantity = parts[0];
            ingName = parts[1];
            category = parts[2];
          } else if (parts.length === 2) {
            quantity = parts[0];
            ingName = parts[1];
          } else {
            ingName = line;
          }
          ingredients.push({ name: ingName, quantity, category });
        });
      }

      const steps = stepsText.split("\n").map(l => l.trim()).filter(Boolean);

      const override = {
        name,
        type,
        durationMinutes: duration,
        difficulty,
        ingredients,
        steps
      };

      recipeOverrides[recipe.id] = override;
      saveOverrides();

      for (let i = 0; i < currentWeekPlan.length; i++) {
        const r = currentWeekPlan[i];
        if (r && r.id === recipe.id) {
          currentWeekPlan[i] = { ...r, ...override };
        }
      }
      saveWeekState();

      const updatedRecipe = { ...recipe, ...override };
      renderRecipeDetail(updatedRecipe, options);
    };

    const btnCancel = document.createElement("button");
    btnCancel.textContent = "Annuler";
    btnCancel.onclick = () => {
      renderRecipeDetail(recipe, options);
    };

    buttons.appendChild(btnSave);
    buttons.appendChild(btnCancel);
    form.appendChild(buttons);

    card.appendChild(form);
    contentDiv.appendChild(card);
  }

  document.getElementById("btn-random").onclick = renderRandomRecipe;
  document.getElementById("btn-planning").onclick = renderWeek;

  renderRandomRecipe();
});
