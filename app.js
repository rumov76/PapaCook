
window.addEventListener("DOMContentLoaded", () => {
  const RecipeType = {
    VIANDE: "viande",
    POISSON: "poisson",
    VEGE: "vegetarien"
  };

  const DAYS = ["Lundi","Mardi","Mercredi","Jeudi","Vendredi","Samedi","Dimanche"];

  const baseRecipes = [
    {
      id: "r1",
      name: "Saumon au four soja-miel",
      type: RecipeType.POISSON,
      durationMinutes: 18,
      difficulty: "Facile",
      ingredients: [
        { name: "Pav\u00e9s de saumon", quantity: "2", category: "Poisson" },
        { name: "Sauce soja", quantity: "2 c\u00e0s", category: "\u00c9picerie" },
        { name: "Miel", quantity: "1 c\u00e0s", category: "\u00c9picerie" },
        { name: "Citron", quantity: "1", category: "Fruits" }
      ],
      steps: [
        "Pr\u00e9chauffer le four \u00e0 200\u00b0C.",
        "M\u00e9langer sauce soja, miel et jus de citron.",
        "D\u00e9poser le saumon sur une plaque recouverte de papier cuisson.",
        "Badigeonner avec la sauce et cuire 12 \u00e0 15 minutes.",
        "Servir avec du riz ou des l\u00e9gumes vapeur."
      ]
    },
    {
      id: "r2",
      name: "Cabillaud citron-beurre",
      type: RecipeType.POISSON,
      durationMinutes: 17,
      difficulty: "Facile",
      ingredients: [
        { name: "Filets de cabillaud", quantity: "2", category: "Poisson" },
        { name: "Beurre", quantity: "20 g", category: "\u00c9picerie" },
        { name: "Citron", quantity: "1", category: "Fruits" },
        { name: "Sel", quantity: "", category: "\u00c9picerie" },
        { name: "Poivre", quantity: "", category: "\u00c9picerie" }
      ],
      steps: [
        "Pr\u00e9chauffer le four \u00e0 190\u00b0C.",
        "Faire fondre le beurre et y ajouter le jus de citron.",
        "Saler et poivrer le cabillaud puis le d\u00e9poser dans un plat.",
        "Napper avec le beurre citron et cuire 12 minutes.",
        "Servir avec des pommes de terre vapeur ou du riz."
      ]
    },
    {
      id: "r3",
      name: "Riz saut\u00e9 poulet-l\u00e9gumes",
      type: RecipeType.VIANDE,
      durationMinutes: 22,
      difficulty: "Facile",
      ingredients: [
        { name: "Riz cuit", quantity: "2 bols", category: "\u00c9picerie" },
        { name: "Poulet en d\u00e9s", quantity: "150 g", category: "Viande" },
        { name: "Carotte", quantity: "1", category: "L\u00e9gumes" },
        { name: "Petits pois", quantity: "50 g", category: "L\u00e9gumes" },
        { name: "Sauce soja", quantity: "1 \u00e0 2 c\u00e0s", category: "\u00c9picerie" }
      ],
      steps: [
        "Couper le poulet en petits d\u00e9s.",
        "\u00c9plucher et couper la carotte.",
        "Faire revenir le poulet dans un peu d'huile.",
        "Ajouter carotte, petits pois puis le riz.",
        "Assaisonner avec la sauce soja et servir."
      ]
    },
    {
      id: "r4",
      name: "Poulet teriyaki express",
      type: RecipeType.VIANDE,
      durationMinutes: 20,
      difficulty: "Facile",
      ingredients: [
        { name: "Poulet en d\u00e9s", quantity: "300 g", category: "Viande" },
        { name: "Sauce soja", quantity: "2 c\u00e0s", category: "\u00c9picerie" },
        { name: "Sucre ou miel", quantity: "1 c\u00e0s", category: "\u00c9picerie" },
        { name: "Eau", quantity: "2 c\u00e0s", category: "\u00c9picerie" }
      ],
      steps: [
        "M\u00e9langer sauce soja, sucre (ou miel) et eau.",
        "Faire revenir le poulet jusqu'\u00e0 l\u00e9g\u00e8re coloration.",
        "Verser la sauce et laisser r\u00e9duire.",
        "Cuire jusqu'\u00e0 ce que la sauce nappe le poulet.",
        "Servir avec du riz."
      ]
    },
    {
      id: "r5",
      name: "Soupe miso tofu-l\u00e9gumes",
      type: RecipeType.VEGE,
      durationMinutes: 15,
      difficulty: "Facile",
      ingredients: [
        { name: "Eau", quantity: "800 ml", category: "\u00c9picerie" },
        { name: "P\u00e2te miso", quantity: "2 c\u00e0s", category: "Asie" },
        { name: "Tofu", quantity: "100 g", category: "Frais" },
        { name: "Carotte", quantity: "1", category: "L\u00e9gumes" },
        { name: "Poireau ou oignon nouveau", quantity: "1", category: "L\u00e9gumes" }
      ],
      steps: [
        "Couper le tofu et les l\u00e9gumes en petits morceaux.",
        "Faire chauffer l'eau et y cuire les l\u00e9gumes 5 \u00e0 7 minutes.",
        "Pr\u00e9lever un peu d'eau chaude et y dissoudre le miso.",
        "Ajouter le miso sans faire bouillir fortement.",
        "Ajouter le tofu, chauffer 1 minute et servir."
      ]
    },
    {
      id: "r6",
      name: "Gratin de p\u00e2tes express",
      type: RecipeType.VEGE,
      durationMinutes: 23,
      difficulty: "Facile",
      ingredients: [
        { name: "P\u00e2tes", quantity: "250 g", category: "P\u00e2tes" },
        { name: "Cr\u00e8me liquide", quantity: "15 cl", category: "Cr\u00e8merie" },
        { name: "Fromage r\u00e2p\u00e9", quantity: "60 g", category: "Cr\u00e8merie" },
        { name: "Sel, poivre", quantity: "", category: "\u00c9picerie" }
      ],
      steps: [
        "Cuire les p\u00e2tes al dente.",
        "M\u00e9langer avec la cr\u00e8me et la moiti\u00e9 du fromage.",
        "Verser dans un plat \u00e0 gratin.",
        "Parsemer du reste de fromage.",
        "Gratiner 8 \u00e0 10 minutes au four."
      ]
    },
    {
      id: "r7",
      name: "Udon saut\u00e9s au chou chinois",
      type: RecipeType.VEGE,
      durationMinutes: 20,
      difficulty: "Facile",
      ingredients: [
        { name: "Udon frais", quantity: "300 g", category: "P\u00e2tes" },
        { name: "Chou chinois", quantity: "1/2", category: "L\u00e9gumes" },
        { name: "Carotte", quantity: "1", category: "L\u00e9gumes" },
        { name: "Sauce soja", quantity: "1 c\u00e0s", category: "\u00c9picerie" }
      ],
      steps: [
        "Cuire les udon selon le paquet.",
        "\u00c9mincer chou et carotte.",
        "Faire revenir les l\u00e9gumes 5 minutes.",
        "Ajouter udon et sauce soja.",
        "M\u00e9langer et servir."
      ]
    },
    {
      id: "r8",
      name: "Omelette fromage-nori",
      type: RecipeType.VEGE,
      durationMinutes: 10,
      difficulty: "Tr\u00e8s facile",
      ingredients: [
        { name: "Oeufs", quantity: "3", category: "Frais" },
        { name: "Fromage r\u00e2p\u00e9", quantity: "40 g", category: "Cr\u00e8merie" },
        { name: "Feuille de nori", quantity: "1", category: "Asie" }
      ],
      steps: [
        "Battre les \u0153ufs avec une pinc\u00e9e de sel.",
        "Ajouter le fromage r\u00e2p\u00e9.",
        "Cuire l\u2019omelette dans une po\u00eale.",
        "Parsemer de nori coup\u00e9 finement et servir."
      ]
    },
    {
      id: "r9",
      name: "Riz saut\u00e9 au thon et ma\u00efs",
      type: RecipeType.POISSON,
      durationMinutes: 15,
      difficulty: "Tr\u00e8s facile",
      ingredients: [
        { name: "Riz cuit", quantity: "2 bols", category: "\u00c9picerie" },
        { name: "Thon en bo\u00eete", quantity: "1", category: "Conserve" },
        { name: "Ma\u00efs", quantity: "100 g", category: "Conserve" },
        { name: "Beurre", quantity: "1 c\u00e0s", category: "\u00c9picerie" }
      ],
      steps: [
        "\u00c9goutter le thon et le ma\u00efs.",
        "Faire fondre le beurre dans une po\u00eale.",
        "Ajouter riz, thon et ma\u00efs.",
        "M\u00e9langer 3 minutes et servir."
      ]
    },
    {
      id: "r10",
      name: "Chou chinois brais\u00e9 au miso",
      type: RecipeType.VEGE,
      durationMinutes: 18,
      difficulty: "Facile",
      ingredients: [
        { name: "Chou chinois", quantity: "1/2", category: "L\u00e9gumes" },
        { name: "P\u00e2te miso", quantity: "1 c\u00e0s", category: "Asie" },
        { name: "Eau", quantity: "100 ml", category: "\u00c9picerie" },
        { name: "Huile", quantity: "1 c\u00e0s", category: "\u00c9picerie" }
      ],
      steps: [
        "Couper le chou chinois en lani\u00e8res.",
        "Faire revenir le chou dans l\u2019huile 2 \u00e0 3 minutes.",
        "M\u00e9langer miso et eau dans un bol.",
        "Verser sur le chou, couvrir et cuire 8 \u00e0 10 minutes \u00e0 feu doux."
      ]
    },
    {
      id: "r11",
      name: "Yakisoba rapide au chou pointu",
      type: RecipeType.VEGE,
      durationMinutes: 20,
      difficulty: "Facile",
      ingredients: [
        { name: "Nouilles soba", quantity: "200 g", category: "P\u00e2tes" },
        { name: "Chou pointu", quantity: "1", category: "L\u00e9gumes" },
        { name: "Carotte", quantity: "1", category: "L\u00e9gumes" },
        { name: "Sauce soja", quantity: "1 c\u00e0s", category: "\u00c9picerie" }
      ],
      steps: [
        "Pr\u00e9parer les ingr\u00e9dients (les couper si n\u00e9cessaire).",
        "Cuire nouilles soba selon les indications.",
        "Dans une po\u00eale, faire revenir les l\u00e9gumes avec un peu d\u2019huile.",
        "Ajouter chou pointu et les assaisonnements.",
        "M\u00e9langer quelques minutes et servir chaud."
      ]
    },
    {
      id: "r12",
      name: "Somen froids sauce soja",
      type: RecipeType.VEGE,
      durationMinutes: 15,
      difficulty: "Facile",
      ingredients: [
        { name: "Somen", quantity: "200 g", category: "P\u00e2tes" },
        { name: "Concombre", quantity: "1", category: "L\u00e9gumes" },
        { name: "Sauce soja", quantity: "2 c\u00e0s", category: "\u00c9picerie" }
      ],
      steps: [
        "Pr\u00e9parer les ingr\u00e9dients (les couper si n\u00e9cessaire).",
        "Cuire somen selon les indications.",
        "Dans une po\u00eale, faire revenir les l\u00e9gumes avec un peu d\u2019huile.",
        "Ajouter concombre et les assaisonnements.",
        "M\u00e9langer quelques minutes et servir chaud."
      ]
    },
    {
      id: "r13",
      name: "Tonkatsu simplifi\u00e9 au four",
      type: RecipeType.VIANDE,
      durationMinutes: 25,
      difficulty: "Moyen",
      ingredients: [
        { name: "Escalope de porc", quantity: "200 g", category: "Viande" },
        { name: "Chou blanc", quantity: "1", category: "L\u00e9gumes" },
        { name: "Chapelure", quantity: "3 c\u00e0s", category: "\u00c9picerie" },
        { name: "Oeuf", quantity: "1", category: "Frais" }
      ],
      steps: [
        "Pr\u00e9parer les ingr\u00e9dients (les couper si n\u00e9cessaire).",
        "Cuire la garniture principale selon les indications.",
        "Dans une po\u00eale, faire revenir escalope de porc avec un peu d\u2019huile.",
        "Ajouter chou blanc et les assaisonnements.",
        "M\u00e9langer quelques minutes et servir chaud."
      ]
    },
    {
      id: "r14",
      name: "Poulet r\u00f4ti minute au four",
      type: RecipeType.VIANDE,
      durationMinutes: 25,
      difficulty: "Facile",
      ingredients: [
        { name: "Blanc de poulet", quantity: "200 g", category: "Viande" },
        { name: "Tomates cerises", quantity: "1", category: "L\u00e9gumes" },
        { name: "Herbes de Provence", quantity: "1 c\u00e0s", category: "\u00c9picerie" }
      ],
      steps: [
        "Pr\u00e9parer les ingr\u00e9dients (les couper si n\u00e9cessaire).",
        "Cuire la garniture principale selon les indications.",
        "Dans une po\u00eale, faire revenir blanc de poulet avec un peu d\u2019huile.",
        "Ajouter tomates cerises et les assaisonnements.",
        "M\u00e9langer quelques minutes et servir chaud."
      ]
    },
    {
      id: "r15",
      name: "Curry doux de l\u00e9gumes",
      type: RecipeType.VEGE,
      durationMinutes: 25,
      difficulty: "Facile",
      ingredients: [
        { name: "Riz", quantity: "200 g", category: "P\u00e2tes" },
        { name: "Carotte", quantity: "1", category: "L\u00e9gumes" },
        { name: "Pomme de terre", quantity: "1", category: "L\u00e9gumes" },
        { name: "Lait de coco", quantity: "150 ml", category: "Conserve" },
        { name: "Curry doux", quantity: "1 c\u00e0s", category: "\u00c9picerie" }
      ],
      steps: [
        "Pr\u00e9parer les ingr\u00e9dients (les couper si n\u00e9cessaire).",
        "Cuire riz selon les indications.",
        "Dans une po\u00eale, faire revenir les l\u00e9gumes avec un peu d\u2019huile.",
        "Ajouter carotte et les assaisonnements.",
        "M\u00e9langer quelques minutes et servir chaud."
      ]
    },
    {
      id: "r16",
      name: "Po\u00eal\u00e9e de cabillaud aux l\u00e9gumes",
      type: RecipeType.POISSON,
      durationMinutes: 18,
      difficulty: "Facile",
      ingredients: [
        { name: "Cabillaud", quantity: "200 g", category: "Poisson" },
        { name: "Courgette", quantity: "1", category: "L\u00e9gumes" },
        { name: "Carotte", quantity: "1", category: "L\u00e9gumes" }
      ],
      steps: [
        "Pr\u00e9parer les ingr\u00e9dients (les couper si n\u00e9cessaire).",
        "Cuire la garniture principale selon les indications.",
        "Dans une po\u00eale, faire revenir cabillaud avec un peu d\u2019huile.",
        "Ajouter courgette et les assaisonnements.",
        "M\u00e9langer quelques minutes et servir chaud."
      ]
    },
    {
      id: "r17",
      name: "Saumon grill\u00e9 et brocoli",
      type: RecipeType.POISSON,
      durationMinutes: 18,
      difficulty: "Facile",
      ingredients: [
        { name: "Saumon", quantity: "200 g", category: "Poisson" },
        { name: "Brocoli", quantity: "1", category: "L\u00e9gumes" },
        { name: "Citron", quantity: "1/2", category: "Fruits" }
      ],
      steps: [
        "Pr\u00e9parer les ingr\u00e9dients (les couper si n\u00e9cessaire).",
        "Cuire la garniture principale selon les indications.",
        "Dans une po\u00eale, faire revenir saumon avec un peu d\u2019huile.",
        "Ajouter brocoli et les assaisonnements.",
        "M\u00e9langer quelques minutes et servir chaud."
      ]
    },
    {
      id: "r18",
      name: "B\u0153uf saut\u00e9 aux oignons",
      type: RecipeType.VIANDE,
      durationMinutes: 20,
      difficulty: "Facile",
      ingredients: [
        { name: "B\u0153uf en lamelles", quantity: "200 g", category: "Viande" },
        { name: "Riz", quantity: "200 g", category: "P\u00e2tes" },
        { name: "Oignon", quantity: "1", category: "L\u00e9gumes" },
        { name: "Sauce soja", quantity: "1 c\u00e0s", category: "\u00c9picerie" }
      ],
      steps: [
        "Pr\u00e9parer les ingr\u00e9dients (les couper si n\u00e9cessaire).",
        "Cuire riz selon les indications.",
        "Dans une po\u00eale, faire revenir b\u0153uf en lamelles avec un peu d\u2019huile.",
        "Ajouter oignon et les assaisonnements.",
        "M\u00e9langer quelques minutes et servir chaud."
      ]
    },
    {
      id: "r19",
      name: "Bol riz \u0153uf et sauce soja",
      type: RecipeType.VEGE,
      durationMinutes: 10,
      difficulty: "Tr\u00e8s facile",
      ingredients: [
        { name: "Riz", quantity: "200 g", category: "P\u00e2tes" },
        { name: "Oeuf", quantity: "2", category: "Frais" },
        { name: "Sauce soja", quantity: "1 c\u00e0s", category: "\u00c9picerie" }
      ],
      steps: [
        "Pr\u00e9parer les ingr\u00e9dients (les couper si n\u00e9cessaire).",
        "Cuire riz selon les indications.",
        "Dans une po\u00eale, faire revenir les l\u00e9gumes avec un peu d\u2019huile.",
        "Ajouter les autres ingr\u00e9dients et les assaisonnements.",
        "M\u00e9langer quelques minutes et servir chaud."
      ]
    },
    {
      id: "r20",
      name: "Tofu croustillant au four",
      type: RecipeType.VEGE,
      durationMinutes: 20,
      difficulty: "Facile",
      ingredients: [
        { name: "Tofu ferme", quantity: "200 g", category: "Frais" },
        { name: "Carotte", quantity: "1", category: "L\u00e9gumes" },
        { name: "Ma\u00efzena", quantity: "1 c\u00e0s", category: "\u00c9picerie" },
        { name: "Sauce soja", quantity: "1 c\u00e0s", category: "\u00c9picerie" }
      ],
      steps: [
        "Pr\u00e9parer les ingr\u00e9dients (les couper si n\u00e9cessaire).",
        "Cuire la garniture principale selon les indications.",
        "Dans une po\u00eale, faire revenir tofu ferme avec un peu d\u2019huile.",
        "Ajouter carotte et les assaisonnements.",
        "M\u00e9langer quelques minutes et servir chaud."
      ]
    },
    {
      id: "r21",
      name: "P\u00e2tes \u00e0 la sauce tomate rapide",
      type: RecipeType.VEGE,
      durationMinutes: 18,
      difficulty: "Tr\u00e8s facile",
      ingredients: [
        { name: "P\u00e2tes", quantity: "200 g", category: "P\u00e2tes" },
        { name: "Oignon", quantity: "1", category: "L\u00e9gumes" },
        { name: "Sauce tomate", quantity: "200 ml", category: "Conserve" }
      ],
      steps: [
        "Pr\u00e9parer les ingr\u00e9dients (les couper si n\u00e9cessaire).",
        "Cuire p\u00e2tes selon les indications.",
        "Dans une po\u00eale, faire revenir les l\u00e9gumes avec un peu d\u2019huile.",
        "Ajouter oignon et les assaisonnements.",
        "M\u00e9langer quelques minutes et servir chaud."
      ]
    },
    {
      id: "r22",
      name: "P\u00e2tes au thon et courgette",
      type: RecipeType.POISSON,
      durationMinutes: 20,
      difficulty: "Facile",
      ingredients: [
        { name: "Thon en bo\u00eete", quantity: "200 g", category: "Poisson" },
        { name: "P\u00e2tes", quantity: "200 g", category: "P\u00e2tes" },
        { name: "Courgette", quantity: "1", category: "L\u00e9gumes" },
        { name: "Cr\u00e8me liquide", quantity: "10 cl", category: "Cr\u00e8merie" }
      ],
      steps: [
        "Pr\u00e9parer les ingr\u00e9dients (les couper si n\u00e9cessaire).",
        "Cuire p\u00e2tes selon les indications.",
        "Dans une po\u00eale, faire revenir thon en bo\u00eete avec un peu d\u2019huile.",
        "Ajouter courgette et les assaisonnements.",
        "M\u00e9langer quelques minutes et servir chaud."
      ]
    },
    {
      id: "r23",
      name: "Poulet au four moutarde-miel",
      type: RecipeType.VIANDE,
      durationMinutes: 30,
      difficulty: "Facile",
      ingredients: [
        { name: "Pilons de poulet", quantity: "200 g", category: "Viande" },
        { name: "Carotte", quantity: "1", category: "L\u00e9gumes" },
        { name: "Moutarde", quantity: "1 c\u00e0s", category: "\u00c9picerie" },
        { name: "Miel", quantity: "1 c\u00e0s", category: "\u00c9picerie" }
      ],
      steps: [
        "Pr\u00e9parer les ingr\u00e9dients (les couper si n\u00e9cessaire).",
        "Cuire la garniture principale selon les indications.",
        "Dans une po\u00eale, faire revenir pilons de poulet avec un peu d\u2019huile.",
        "Ajouter carotte et les assaisonnements.",
        "M\u00e9langer quelques minutes et servir chaud."
      ]
    },
    {
      id: "r24",
      name: "Omelette aux l\u00e9gumes et fromage",
      type: RecipeType.VEGE,
      durationMinutes: 15,
      difficulty: "Tr\u00e8s facile",
      ingredients: [
        { name: "Poivron", quantity: "1", category: "L\u00e9gumes" },
        { name: "Oeufs", quantity: "3", category: "Frais" },
        { name: "Fromage r\u00e2p\u00e9", quantity: "40 g", category: "Cr\u00e8merie" }
      ],
      steps: [
        "Pr\u00e9parer les ingr\u00e9dients (les couper si n\u00e9cessaire).",
        "Cuire la garniture principale selon les indications.",
        "Dans une po\u00eale, faire revenir les l\u00e9gumes avec un peu d\u2019huile.",
        "Ajouter poivron et les assaisonnements.",
        "M\u00e9langer quelques minutes et servir chaud."
      ]
    },
    {
      id: "r25",
      name: "Riz saut\u00e9 au tofu et chou chinois",
      type: RecipeType.VEGE,
      durationMinutes: 20,
      difficulty: "Facile",
      ingredients: [
        { name: "Tofu ferme", quantity: "200 g", category: "Frais" },
        { name: "Riz", quantity: "200 g", category: "P\u00e2tes" },
        { name: "Chou chinois", quantity: "1", category: "L\u00e9gumes" },
        { name: "Sauce soja", quantity: "1 c\u00e0s", category: "\u00c9picerie" }
      ],
      steps: [
        "Pr\u00e9parer les ingr\u00e9dients (les couper si n\u00e9cessaire).",
        "Cuire riz selon les indications.",
        "Dans une po\u00eale, faire revenir tofu ferme avec un peu d\u2019huile.",
        "Ajouter chou chinois et les assaisonnements.",
        "M\u00e9langer quelques minutes et servir chaud."
      ]
    },
    {
      id: "r26",
      name: "Po\u00eal\u00e9e sardines et tomates",
      type: RecipeType.POISSON,
      durationMinutes: 14,
      difficulty: "Tr\u00e8s facile",
      ingredients: [
        { name: "Sardines en bo\u00eete", quantity: "200 g", category: "Poisson" },
        { name: "Tomate", quantity: "1", category: "L\u00e9gumes" },
        { name: "Oignon", quantity: "1", category: "L\u00e9gumes" }
      ],
      steps: [
        "Pr\u00e9parer les ingr\u00e9dients (les couper si n\u00e9cessaire).",
        "Cuire la garniture principale selon les indications.",
        "Dans une po\u00eale, faire revenir sardines en bo\u00eete avec un peu d\u2019huile.",
        "Ajouter tomate et les assaisonnements.",
        "M\u00e9langer quelques minutes et servir chaud."
      ]
    },
    {
      id: "r27",
      name: "Nouilles udon au b\u0153uf",
      type: RecipeType.VIANDE,
      durationMinutes: 20,
      difficulty: "Facile",
      ingredients: [
        { name: "B\u0153uf en lamelles", quantity: "200 g", category: "Viande" },
        { name: "Udon", quantity: "200 g", category: "P\u00e2tes" },
        { name: "Poivron", quantity: "1", category: "L\u00e9gumes" },
        { name: "Sauce soja", quantity: "1 c\u00e0s", category: "\u00c9picerie" }
      ],
      steps: [
        "Pr\u00e9parer les ingr\u00e9dients (les couper si n\u00e9cessaire).",
        "Cuire udon selon les indications.",
        "Dans une po\u00eale, faire revenir b\u0153uf en lamelles avec un peu d\u2019huile.",
        "Ajouter poivron et les assaisonnements.",
        "M\u00e9langer quelques minutes et servir chaud."
      ]
    },
    {
      id: "r28",
      name: "Gratin de chou-fleur express",
      type: RecipeType.VEGE,
      durationMinutes: 25,
      difficulty: "Facile",
      ingredients: [
        { name: "Chou-fleur", quantity: "1", category: "L\u00e9gumes" },
        { name: "Cr\u00e8me liquide", quantity: "10 cl", category: "Cr\u00e8merie" },
        { name: "Fromage r\u00e2p\u00e9", quantity: "50 g", category: "Cr\u00e8merie" }
      ],
      steps: [
        "Pr\u00e9parer les ingr\u00e9dients (les couper si n\u00e9cessaire).",
        "Cuire la garniture principale selon les indications.",
        "Dans une po\u00eale, faire revenir les l\u00e9gumes avec un peu d\u2019huile.",
        "Ajouter chou-fleur et les assaisonnements.",
        "M\u00e9langer quelques minutes et servir chaud."
      ]
    },
    {
      id: "r29",
      name: "Bol de riz japonais nature + accompagnement",
      type: RecipeType.VEGE,
      durationMinutes: 15,
      difficulty: "Tr\u00e8s facile",
      ingredients: [
        { name: "Riz japonais", quantity: "200 g", category: "P\u00e2tes" },
        { name: "Concombre", quantity: "1", category: "L\u00e9gumes" },
        { name: "Nori", quantity: "1 feuille", category: "Asie" }
      ],
      steps: [
        "Pr\u00e9parer les ingr\u00e9dients (les couper si n\u00e9cessaire).",
        "Cuire riz japonais selon les indications.",
        "Dans une po\u00eale, faire revenir les l\u00e9gumes avec un peu d\u2019huile.",
        "Ajouter concombre et les assaisonnements.",
        "M\u00e9langer quelques minutes et servir chaud."
      ]
    },
    {
      id: "r30",
      name: "Tonkatsu de poulet au four",
      type: RecipeType.VIANDE,
      durationMinutes: 25,
      difficulty: "Moyen",
      ingredients: [
        { name: "Blanc de poulet", quantity: "200 g", category: "Viande" },
        { name: "Chou pointu", quantity: "1", category: "L\u00e9gumes" },
        { name: "Chapelure", quantity: "3 c\u00e0s", category: "\u00c9picerie" },
        { name: "Oeuf", quantity: "1", category: "Frais" }
      ],
      steps: [
        "Pr\u00e9parer les ingr\u00e9dients (les couper si n\u00e9cessaire).",
        "Cuire la garniture principale selon les indications.",
        "Dans une po\u00eale, faire revenir blanc de poulet avec un peu d\u2019huile.",
        "Ajouter chou pointu et les assaisonnements.",
        "M\u00e9langer quelques minutes et servir chaud."
      ]
    },
    {
      id: "r31",
      name: "Curry doux poulet et l\u00e9gumes",
      type: RecipeType.VIANDE,
      durationMinutes: 25,
      difficulty: "Facile",
      ingredients: [
        { name: "Poulet en d\u00e9s", quantity: "200 g", category: "Viande" },
        { name: "Riz", quantity: "200 g", category: "P\u00e2tes" },
        { name: "Carotte", quantity: "1", category: "L\u00e9gumes" },
        { name: "Pomme de terre", quantity: "1", category: "L\u00e9gumes" },
        { name: "Lait de coco", quantity: "150 ml", category: "Conserve" }
      ],
      steps: [
        "Pr\u00e9parer les ingr\u00e9dients (les couper si n\u00e9cessaire).",
        "Cuire riz selon les indications.",
        "Dans une po\u00eale, faire revenir poulet en d\u00e9s avec un peu d\u2019huile.",
        "Ajouter carotte et les assaisonnements.",
        "M\u00e9langer quelques minutes et servir chaud."
      ]
    },
    {
      id: "r32",
      name: "Po\u00eal\u00e9e de l\u00e9gumes au tofu",
      type: RecipeType.VEGE,
      durationMinutes: 18,
      difficulty: "Facile",
      ingredients: [
        { name: "Tofu ferme", quantity: "200 g", category: "Frais" },
        { name: "Brocoli", quantity: "1", category: "L\u00e9gumes" },
        { name: "Carotte", quantity: "1", category: "L\u00e9gumes" }
      ],
      steps: [
        "Pr\u00e9parer les ingr\u00e9dients (les couper si n\u00e9cessaire).",
        "Cuire la garniture principale selon les indications.",
        "Dans une po\u00eale, faire revenir tofu ferme avec un peu d\u2019huile.",
        "Ajouter brocoli et les assaisonnements.",
        "M\u00e9langer quelques minutes et servir chaud."
      ]
    },
    {
      id: "r33",
      name: "Saumon vapeur au citron",
      type: RecipeType.POISSON,
      durationMinutes: 15,
      difficulty: "Facile",
      ingredients: [
        { name: "Saumon", quantity: "200 g", category: "Poisson" },
        { name: "Courgette", quantity: "1", category: "L\u00e9gumes" },
        { name: "Citron", quantity: "1", category: "Fruits" }
      ],
      steps: [
        "Pr\u00e9parer les ingr\u00e9dients (les couper si n\u00e9cessaire).",
        "Cuire la garniture principale selon les indications.",
        "Dans une po\u00eale, faire revenir saumon avec un peu d\u2019huile.",
        "Ajouter courgette et les assaisonnements.",
        "M\u00e9langer quelques minutes et servir chaud."
      ]
    },
    {
      id: "r34",
      name: "P\u00e2tes jambon-fromage",
      type: RecipeType.VIANDE,
      durationMinutes: 18,
      difficulty: "Tr\u00e8s facile",
      ingredients: [
        { name: "Jambon", quantity: "200 g", category: "Viande" },
        { name: "P\u00e2tes", quantity: "200 g", category: "P\u00e2tes" },
        { name: "Fromage r\u00e2p\u00e9", quantity: "50 g", category: "Cr\u00e8merie" },
        { name: "Cr\u00e8me", quantity: "10 cl", category: "Cr\u00e8merie" }
      ],
      steps: [
        "Pr\u00e9parer les ingr\u00e9dients (les couper si n\u00e9cessaire).",
        "Cuire p\u00e2tes selon les indications.",
        "Dans une po\u00eale, faire revenir jambon avec un peu d\u2019huile.",
        "Ajouter les autres ingr\u00e9dients et les assaisonnements.",
        "M\u00e9langer quelques minutes et servir chaud."
      ]
    },
    {
      id: "r35",
      name: "Tortilla de pommes de terre",
      type: RecipeType.VEGE,
      durationMinutes: 25,
      difficulty: "Moyen",
      ingredients: [
        { name: "Pomme de terre", quantity: "1", category: "L\u00e9gumes" },
        { name: "Oeufs", quantity: "3", category: "Frais" },
        { name: "Oignon", quantity: "1", category: "L\u00e9gumes" }
      ],
      steps: [
        "Pr\u00e9parer les ingr\u00e9dients (les couper si n\u00e9cessaire).",
        "Cuire la garniture principale selon les indications.",
        "Dans une po\u00eale, faire revenir les l\u00e9gumes avec un peu d\u2019huile.",
        "Ajouter pomme de terre et les assaisonnements.",
        "M\u00e9langer quelques minutes et servir chaud."
      ]
    },
    {
      id: "r36",
      name: "Chili doux haricots rouges",
      type: RecipeType.VEGE,
      durationMinutes: 25,
      difficulty: "Facile",
      ingredients: [
        { name: "Riz", quantity: "200 g", category: "P\u00e2tes" },
        { name: "Poivron", quantity: "1", category: "L\u00e9gumes" },
        { name: "Haricots rouges en bo\u00eete", quantity: "1", category: "Conserve" },
        { name: "Sauce tomate", quantity: "200 ml", category: "Conserve" }
      ],
      steps: [
        "Pr\u00e9parer les ingr\u00e9dients (les couper si n\u00e9cessaire).",
        "Cuire riz selon les indications.",
        "Dans une po\u00eale, faire revenir les l\u00e9gumes avec un peu d\u2019huile.",
        "Ajouter poivron et les assaisonnements.",
        "M\u00e9langer quelques minutes et servir chaud."
      ]
    },
    {
      id: "r37",
      name: "B\u0153uf et brocoli saut\u00e9s",
      type: RecipeType.VIANDE,
      durationMinutes: 20,
      difficulty: "Facile",
      ingredients: [
        { name: "B\u0153uf en lamelles", quantity: "200 g", category: "Viande" },
        { name: "Riz", quantity: "200 g", category: "P\u00e2tes" },
        { name: "Brocoli", quantity: "1", category: "L\u00e9gumes" },
        { name: "Sauce soja", quantity: "1 c\u00e0s", category: "\u00c9picerie" }
      ],
      steps: [
        "Pr\u00e9parer les ingr\u00e9dients (les couper si n\u00e9cessaire).",
        "Cuire riz selon les indications.",
        "Dans une po\u00eale, faire revenir b\u0153uf en lamelles avec un peu d\u2019huile.",
        "Ajouter brocoli et les assaisonnements.",
        "M\u00e9langer quelques minutes et servir chaud."
      ]
    },
    {
      id: "r38",
      name: "Cabillaud au four et tomates",
      type: RecipeType.POISSON,
      durationMinutes: 18,
      difficulty: "Facile",
      ingredients: [
        { name: "Cabillaud", quantity: "200 g", category: "Poisson" },
        { name: "Tomate", quantity: "1", category: "L\u00e9gumes" },
        { name: "Huile d'olive", quantity: "1 c\u00e0s", category: "\u00c9picerie" }
      ],
      steps: [
        "Pr\u00e9parer les ingr\u00e9dients (les couper si n\u00e9cessaire).",
        "Cuire la garniture principale selon les indications.",
        "Dans une po\u00eale, faire revenir cabillaud avec un peu d\u2019huile.",
        "Ajouter tomate et les assaisonnements.",
        "M\u00e9langer quelques minutes et servir chaud."
      ]
    },
    {
      id: "r39",
      name: "Poisson pan\u00e9 maison rapide",
      type: RecipeType.POISSON,
      durationMinutes: 20,
      difficulty: "Facile",
      ingredients: [
        { name: "Filets de poisson blanc", quantity: "200 g", category: "Poisson" },
        { name: "Chapelure", quantity: "3 c\u00e0s", category: "\u00c9picerie" },
        { name: "Oeuf", quantity: "1", category: "Frais" }
      ],
      steps: [
        "Pr\u00e9parer les ingr\u00e9dients (les couper si n\u00e9cessaire).",
        "Cuire la garniture principale selon les indications.",
        "Dans une po\u00eale, faire revenir filets de poisson blanc avec un peu d\u2019huile.",
        "Ajouter les autres ingr\u00e9dients et les assaisonnements.",
        "M\u00e9langer quelques minutes et servir chaud."
      ]
    },
    {
      id: "r40",
      name: "Somen saut\u00e9s l\u00e9gumes",
      type: RecipeType.VEGE,
      durationMinutes: 18,
      difficulty: "Facile",
      ingredients: [
        { name: "Somen", quantity: "200 g", category: "P\u00e2tes" },
        { name: "Courgette", quantity: "1", category: "L\u00e9gumes" },
        { name: "Carotte", quantity: "1", category: "L\u00e9gumes" },
        { name: "Sauce soja", quantity: "1 c\u00e0s", category: "\u00c9picerie" }
      ],
      steps: [
        "Pr\u00e9parer les ingr\u00e9dients (les couper si n\u00e9cessaire).",
        "Cuire somen selon les indications.",
        "Dans une po\u00eale, faire revenir les l\u00e9gumes avec un peu d\u2019huile.",
        "Ajouter courgette et les assaisonnements.",
        "M\u00e9langer quelques minutes et servir chaud."
      ]
    },
    {
      id: "r41",
      name: "Riz saut\u00e9 b\u0153uf et chou",
      type: RecipeType.VIANDE,
      durationMinutes: 20,
      difficulty: "Facile",
      ingredients: [
        { name: "B\u0153uf hach\u00e9", quantity: "200 g", category: "Viande" },
        { name: "Riz", quantity: "200 g", category: "P\u00e2tes" },
        { name: "Chou blanc", quantity: "1", category: "L\u00e9gumes" },
        { name: "Sauce soja", quantity: "1 c\u00e0s", category: "\u00c9picerie" }
      ],
      steps: [
        "Pr\u00e9parer les ingr\u00e9dients (les couper si n\u00e9cessaire).",
        "Cuire riz selon les indications.",
        "Dans une po\u00eale, faire revenir b\u0153uf hach\u00e9 avec un peu d\u2019huile.",
        "Ajouter chou blanc et les assaisonnements.",
        "M\u00e9langer quelques minutes et servir chaud."
      ]
    },
    {
      id: "r42",
      name: "Soupe de nouilles au poulet",
      type: RecipeType.VIANDE,
      durationMinutes: 22,
      difficulty: "Facile",
      ingredients: [
        { name: "Poulet en d\u00e9s", quantity: "200 g", category: "Viande" },
        { name: "Nouilles", quantity: "200 g", category: "P\u00e2tes" },
        { name: "Carotte", quantity: "1", category: "L\u00e9gumes" },
        { name: "Bouillon", quantity: "500 ml", category: "\u00c9picerie" }
      ],
      steps: [
        "Pr\u00e9parer les ingr\u00e9dients (les couper si n\u00e9cessaire).",
        "Cuire nouilles selon les indications.",
        "Dans une po\u00eale, faire revenir poulet en d\u00e9s avec un peu d\u2019huile.",
        "Ajouter carotte et les assaisonnements.",
        "M\u00e9langer quelques minutes et servir chaud."
      ]
    },
    {
      id: "r43",
      name: "Soupe de nouilles au tofu",
      type: RecipeType.VEGE,
      durationMinutes: 20,
      difficulty: "Facile",
      ingredients: [
        { name: "Tofu ferme", quantity: "200 g", category: "Frais" },
        { name: "Nouilles", quantity: "200 g", category: "P\u00e2tes" },
        { name: "Pak cho\u00ef", quantity: "1", category: "L\u00e9gumes" },
        { name: "Bouillon", quantity: "500 ml", category: "\u00c9picerie" }
      ],
      steps: [
        "Pr\u00e9parer les ingr\u00e9dients (les couper si n\u00e9cessaire).",
        "Cuire nouilles selon les indications.",
        "Dans une po\u00eale, faire revenir tofu ferme avec un peu d\u2019huile.",
        "Ajouter pak cho\u00ef et les assaisonnements.",
        "M\u00e9langer quelques minutes et servir chaud."
      ]
    },
    {
      id: "r44",
      name: "Riz saut\u00e9 l\u00e9gumes et \u0153uf",
      type: RecipeType.VEGE,
      durationMinutes: 18,
      difficulty: "Tr\u00e8s facile",
      ingredients: [
        { name: "Riz", quantity: "200 g", category: "P\u00e2tes" },
        { name: "Petits pois", quantity: "1", category: "L\u00e9gumes" },
        { name: "Oeuf", quantity: "1", category: "Frais" },
        { name: "Carotte", quantity: "1", category: "L\u00e9gumes" }
      ],
      steps: [
        "Pr\u00e9parer les ingr\u00e9dients (les couper si n\u00e9cessaire).",
        "Cuire riz selon les indications.",
        "Dans une po\u00eale, faire revenir les l\u00e9gumes avec un peu d\u2019huile.",
        "Ajouter petits pois et les assaisonnements.",
        "M\u00e9langer quelques minutes et servir chaud."
      ]
    },
    {
      id: "r45",
      name: "Salade de p\u00e2tes thon-ma\u00efs",
      type: RecipeType.POISSON,
      durationMinutes: 18,
      difficulty: "Tr\u00e8s facile",
      ingredients: [
        { name: "Thon en bo\u00eete", quantity: "200 g", category: "Poisson" },
        { name: "P\u00e2tes", quantity: "200 g", category: "P\u00e2tes" },
        { name: "Tomate", quantity: "1", category: "L\u00e9gumes" },
        { name: "Ma\u00efs", quantity: "50 g", category: "Conserve" }
      ],
      steps: [
        "Pr\u00e9parer les ingr\u00e9dients (les couper si n\u00e9cessaire).",
        "Cuire p\u00e2tes selon les indications.",
        "Dans une po\u00eale, faire revenir thon en bo\u00eete avec un peu d\u2019huile.",
        "Ajouter tomate et les assaisonnements.",
        "M\u00e9langer quelques minutes et servir chaud."
      ]
    },
    {
      id: "r46",
      name: "Salade de riz japonais et saumon",
      type: RecipeType.POISSON,
      durationMinutes: 18,
      difficulty: "Facile",
      ingredients: [
        { name: "Saumon cuit", quantity: "200 g", category: "Poisson" },
        { name: "Riz japonais", quantity: "200 g", category: "P\u00e2tes" },
        { name: "Concombre", quantity: "1", category: "L\u00e9gumes" },
        { name: "Nori", quantity: "1 feuille", category: "Asie" }
      ],
      steps: [
        "Pr\u00e9parer les ingr\u00e9dients (les couper si n\u00e9cessaire).",
        "Cuire riz japonais selon les indications.",
        "Dans une po\u00eale, faire revenir saumon cuit avec un peu d\u2019huile.",
        "Ajouter concombre et les assaisonnements.",
        "M\u00e9langer quelques minutes et servir chaud."
      ]
    },
    {
      id: "r47",
      name: "Po\u00eal\u00e9e de l\u00e9gumes de saison",
      type: RecipeType.VEGE,
      durationMinutes: 15,
      difficulty: "Tr\u00e8s facile",
      ingredients: [
        { name: "L\u00e9gumes vari\u00e9s", quantity: "1", category: "L\u00e9gumes" },
        { name: "Huile d'olive", quantity: "1 c\u00e0s", category: "\u00c9picerie" }
      ],
      steps: [
        "Pr\u00e9parer les ingr\u00e9dients (les couper si n\u00e9cessaire).",
        "Cuire la garniture principale selon les indications.",
        "Dans une po\u00eale, faire revenir les l\u00e9gumes avec un peu d\u2019huile.",
        "Ajouter l\u00e9gumes vari\u00e9s et les assaisonnements.",
        "M\u00e9langer quelques minutes et servir chaud."
      ]
    },
    {
      id: "r48",
      name: "Poulet yakitori simplifi\u00e9",
      type: RecipeType.VIANDE,
      durationMinutes: 18,
      difficulty: "Facile",
      ingredients: [
        { name: "Poulet en d\u00e9s", quantity: "200 g", category: "Viande" },
        { name: "Sauce soja", quantity: "2 c\u00e0s", category: "\u00c9picerie" },
        { name: "Sucre", quantity: "1 c\u00e0s", category: "\u00c9picerie" }
      ],
      steps: [
        "Pr\u00e9parer les ingr\u00e9dients (les couper si n\u00e9cessaire).",
        "Cuire la garniture principale selon les indications.",
        "Dans une po\u00eale, faire revenir poulet en d\u00e9s avec un peu d\u2019huile.",
        "Ajouter les autres ingr\u00e9dients et les assaisonnements.",
        "M\u00e9langer quelques minutes et servir chaud."
      ]
    },
    {
      id: "r49",
      name: "Bol de riz \u0153uf brouill\u00e9 et l\u00e9gumes",
      type: RecipeType.VEGE,
      durationMinutes: 15,
      difficulty: "Tr\u00e8s facile",
      ingredients: [
        { name: "Riz", quantity: "200 g", category: "P\u00e2tes" },
        { name: "Carotte", quantity: "1", category: "L\u00e9gumes" },
        { name: "Oeufs", quantity: "2", category: "Frais" }
      ],
      steps: [
        "Pr\u00e9parer les ingr\u00e9dients (les couper si n\u00e9cessaire).",
        "Cuire riz selon les indications.",
        "Dans une po\u00eale, faire revenir les l\u00e9gumes avec un peu d\u2019huile.",
        "Ajouter carotte et les assaisonnements.",
        "M\u00e9langer quelques minutes et servir chaud."
      ]
    },
    {
      id: "r50",
      name: "Couscous simplifi\u00e9 l\u00e9gumes-pois chiches",
      type: RecipeType.VEGE,
      durationMinutes: 25,
      difficulty: "Facile",
      ingredients: [
        { name: "Semoule", quantity: "200 g", category: "P\u00e2tes" },
        { name: "Carotte", quantity: "1", category: "L\u00e9gumes" },
        { name: "Pois chiches en bo\u00eete", quantity: "1", category: "Conserve" },
        { name: "Courgette", quantity: "1", category: "L\u00e9gumes" }
      ],
      steps: [
        "Pr\u00e9parer les ingr\u00e9dients (les couper si n\u00e9cessaire).",
        "Cuire semoule selon les indications.",
        "Dans une po\u00eale, faire revenir les l\u00e9gumes avec un peu d\u2019huile.",
        "Ajouter carotte et les assaisonnements.",
        "M\u00e9langer quelques minutes et servir chaud."
      ]
    },
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
    textareaIng.placeholder = "Ex :\n200 g - Pâtes - Pâtes\n2 - Carottes - Légumes";
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
