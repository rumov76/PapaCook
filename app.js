
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
        { name: "Pavés de saumon", quantity: "2", category: "Poisson" },
        { name: "Sauce soja", quantity: "2 càs", category: "Épicerie" },
        { name: "Miel", quantity: "1 càs", category: "Épicerie" },
        { name: "Citron", quantity: "1", category: "Fruits" },
      ],
      steps: [
        "Préchauffer le four à 200°C.",
        "Mélanger sauce soja, miel et jus de citron.",
        "Déposer le saumon sur une plaque recouverte de papier cuisson.",
        "Badigeonner avec la sauce et cuire 12 à 15 minutes.",
        "Servir avec du riz ou des légumes vapeur.",
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
        { name: "Beurre", quantity: "20 g", category: "Épicerie" },
        { name: "Citron", quantity: "1", category: "Fruits" },
        { name: "Épicerie", quantity: "- Sel", category: "" },
        { name: "Épicerie", quantity: "- Poivre", category: "" },
      ],
      steps: [
        "Préchauffer le four à 190°C.",
        "Faire fondre le beurre et y ajouter le jus de citron.",
        "Saler et poivrer le cabillaud puis le déposer dans un plat.",
        "Napper avec le beurre citron et cuire 12 minutes.",
        "Servir avec des pommes de terre vapeur ou du riz.",
      ]
    },
    {
      id: "r3",
      name: "Riz sauté poulet-légumes",
      type: RecipeType.VIANDE,
      durationMinutes: 22,
      difficulty: "Facile",
      ingredients: [
        { name: "Riz cuit", quantity: "2 bols", category: "Épicerie" },
        { name: "Poulet en dés", quantity: "150 g", category: "Viande" },
        { name: "Carotte", quantity: "1", category: "Légumes" },
        { name: "Petits pois", quantity: "50 g", category: "Légumes" },
        { name: "Sauce soja", quantity: "1 à 2 càs", category: "Épicerie" },
      ],
      steps: [
        "Couper le poulet en petits dés.",
        "Éplucher et couper la carotte en petits morceaux.",
        "Faire revenir le poulet dans un peu d'huile jusqu'à légère coloration.",
        "Ajouter carotte, petits pois puis le riz.",
        "Assaisonner avec la sauce soja, mélanger et servir.",
      ]
    },
    {
      id: "r4",
      name: "Poulet teriyaki express",
      type: RecipeType.VIANDE,
      durationMinutes: 20,
      difficulty: "Facile",
      ingredients: [
        { name: "Poulet en dés", quantity: "300 g", category: "Viande" },
        { name: "Sauce soja", quantity: "2 càs", category: "Épicerie" },
        { name: "Sucre ou miel", quantity: "1 càs", category: "Épicerie" },
        { name: "Eau", quantity: "2 càs", category: "Épicerie" },
      ],
      steps: [
        "Mélanger sauce soja, sucre (ou miel) et eau dans un bol.",
        "Faire revenir le poulet dans une poêle jusqu'à légère coloration.",
        "Verser la sauce sur le poulet.",
        "Laisser réduire quelques minutes jusqu'à ce que la sauce nappe bien le poulet.",
        "Servir avec du riz.",
      ]
    },
    {
      id: "r5",
      name: "Soupe miso tofu-légumes",
      type: RecipeType.VEGE,
      durationMinutes: 15,
      difficulty: "Facile",
      ingredients: [
        { name: "Eau", quantity: "800 ml", category: "Épicerie" },
        { name: "Pâte miso", quantity: "2 càs", category: "Asie" },
        { name: "Tofu", quantity: "100 g", category: "Frais" },
        { name: "Carotte", quantity: "1", category: "Légumes" },
        { name: "Poireau ou oignon nouveau", quantity: "1", category: "Légumes" },
      ],
      steps: [
        "Couper le tofu en petits dés et les légumes en fines rondelles.",
        "Porter l'eau à frémissement dans une casserole.",
        "Ajouter les légumes et cuire 5 à 7 minutes jusqu'à ce qu'ils soient tendres.",
        "Prélever un peu d'eau chaude dans un bol et y dissoudre la pâte miso.",
        "Verser le miso dissous dans la casserole (sans faire bouillir fort).",
        "Ajouter le tofu, chauffer encore 1 minute et servir.",
      ]
    },
    {
      id: "r6",
      name: "Gratin de pâtes express",
      type: RecipeType.VEGE,
      durationMinutes: 23,
      difficulty: "Facile",
      ingredients: [
        { name: "Pâtes", quantity: "250 g", category: "Pâtes" },
        { name: "Crème liquide", quantity: "15 cl", category: "Crèmerie" },
        { name: "Fromage râpé", quantity: "60 g", category: "Crèmerie" },
        { name: "Épicerie", quantity: "- Sel, poivre", category: "" },
      ],
      steps: [
        "Préchauffer le four à 200°C.",
        "Cuire les pâtes dans une grande casserole d'eau salée selon les indications du paquet.",
        "Égoutter les pâtes et les remettre dans la casserole.",
        "Ajouter la crème et la moitié du fromage râpé, saler et poivrer, puis mélanger.",
        "Verser dans un plat à gratin, parsemer du reste de fromage.",
        "Gratiner 8 à 10 minutes au four jusqu'à ce que ce soit bien doré.",
      ]
    },
    {
      id: "r7",
      name: "Udon sautés au chou chinois",
      type: RecipeType.VEGE,
      durationMinutes: 20,
      difficulty: "Facile",
      ingredients: [
        { name: "Udon frais", quantity: "300 g", category: "Pâtes" },
        { name: "Chou chinois", quantity: "1/2", category: "Légumes" },
        { name: "Carotte", quantity: "1", category: "Légumes" },
        { name: "Sauce soja", quantity: "1 càs", category: "Épicerie" },
      ],
      steps: [
        "Cuire les udon dans une casserole d'eau bouillante selon les indications du paquet.",
        "Égoutter les udon et réserver.",
        "Émincer finement le chou chinois et la carotte.",
        "Faire chauffer un peu d'huile dans une poêle ou un wok.",
        "Faire revenir les légumes 5 minutes à feu moyen en remuant.",
        "Ajouter les udon et la sauce soja, mélanger encore 1 à 2 minutes et servir.",
      ]
    },
    {
      id: "r8",
      name: "Omelette fromage-nori",
      type: RecipeType.VEGE,
      durationMinutes: 10,
      difficulty: "Très facile",
      ingredients: [
        { name: "Oeufs", quantity: "3", category: "Frais" },
        { name: "Fromage râpé", quantity: "40 g", category: "Crèmerie" },
        { name: "Feuille de nori", quantity: "1", category: "Asie" },
      ],
      steps: [
        "Casser les œufs dans un bol, saler légèrement et bien battre.",
        "Ajouter le fromage râpé et mélanger.",
        "Faire chauffer un peu d'huile ou de beurre dans une petite poêle.",
        "Verser les œufs battus et cuire l’omelette à feu moyen.",
        "Couper la feuille de nori en fines lamelles et les parsemer sur l’omelette au moment de servir.",
      ]
    },
    {
      id: "r9",
      name: "Riz sauté au thon et maïs",
      type: RecipeType.POISSON,
      durationMinutes: 15,
      difficulty: "Très facile",
      ingredients: [
        { name: "Riz cuit", quantity: "2 bols", category: "Épicerie" },
        { name: "Thon en boîte", quantity: "1", category: "Conserve" },
        { name: "Maïs", quantity: "100 g", category: "Conserve" },
        { name: "Beurre", quantity: "1 càs", category: "Épicerie" },
      ],
      steps: [
        "Égoutter le thon et le maïs.",
        "Faire fondre le beurre dans une grande poêle.",
        "Ajouter le riz cuit et le faire chauffer 1 à 2 minutes en remuant.",
        "Ajouter le thon émietté et le maïs, bien mélanger.",
        "Laisser chauffer encore quelques minutes et servir.",
      ]
    },
    {
      id: "r10",
      name: "Chou chinois braisé au miso",
      type: RecipeType.VEGE,
      durationMinutes: 18,
      difficulty: "Facile",
      ingredients: [
        { name: "Chou chinois", quantity: "1/2", category: "Légumes" },
        { name: "Pâte miso", quantity: "1 càs", category: "Asie" },
        { name: "Eau", quantity: "100 ml", category: "Épicerie" },
        { name: "Huile", quantity: "1 càs", category: "Épicerie" },
      ],
      steps: [
        "Couper le chou chinois en lanières.",
        "Faire chauffer l’huile dans une grande poêle.",
        "Ajouter le chou et le faire revenir 2 à 3 minutes.",
        "Mélanger la pâte miso avec l'eau dans un bol jusqu'à dissolution.",
        "Verser le mélange miso-eau sur le chou, couvrir et cuire 8 à 10 minutes à feu doux.",
      ]
    },
    {
      id: "r11",
      name: "Gratin de courgettes au parmesan",
      type: RecipeType.VEGE,
      durationMinutes: 25,
      difficulty: "Facile",
      ingredients: [
        { name: "Courgettes", quantity: "2", category: "Légumes" },
        { name: "Parmesan râpé", quantity: "40 g", category: "Crèmerie" },
        { name: "Crème fraîche", quantity: "1 càs", category: "Crèmerie" },
        { name: "Épicerie", quantity: "- Sel, poivre", category: "" },
      ],
      steps: [
        "Préchauffer le four à 200°C.",
        "Laver et couper les courgettes en demi‑rondelles.",
        "Les faire revenir 5 minutes dans une poêle avec un peu d’huile.",
        "Mettre les courgettes dans un plat, ajouter la crème, sel et poivre.",
        "Mélanger, parsemer de parmesan et gratiner 10 minutes.",
      ]
    },
    {
      id: "r12",
      name: "Saumon grillé et brocoli vapeur",
      type: RecipeType.POISSON,
      durationMinutes: 20,
      difficulty: "Facile",
      ingredients: [
        { name: "Pavés de saumon", quantity: "2", category: "Poisson" },
        { name: "Brocoli", quantity: "1", category: "Légumes" },
        { name: "Huile d’olive", quantity: "1 càs", category: "Épicerie" },
        { name: "Épicerie", quantity: "- Sel, poivre", category: "" },
      ],
      steps: [
        "Couper le brocoli en petits bouquets.",
        "Le cuire 8 minutes à la vapeur ou dans l’eau bouillante.",
        "Chauffer une poêle avec un peu d’huile.",
        "Saisir le saumon 3 minutes côté peau, puis 2 minutes de l’autre côté.",
        "Assaisonner et servir avec le brocoli.",
      ]
    },
    {
      id: "r13",
      name: "Poulet rôti minute aux herbes",
      type: RecipeType.VIANDE,
      durationMinutes: 25,
      difficulty: "Facile",
      ingredients: [
        { name: "Blanc de poulet", quantity: "300 g", category: "Viande" },
        { name: "Herbes de Provence", quantity: "1 càs", category: "Épicerie" },
        { name: "Tomate", quantity: "1", category: "Légumes" },
        { name: "Oignon", quantity: "1", category: "Légumes" },
      ],
      steps: [
        "Préchauffer le four à 210°C.",
        "Couper l’oignon et la tomate en morceaux.",
        "Placer le poulet et les légumes dans un plat.",
        "Arroser d’huile, assaisonner et mettre les herbes.",
        "Cuire 18 à 20 minutes.",
      ]
    },
    {
      id: "r14",
      name: "Pâtes à la sauce tomate maison",
      type: RecipeType.VEGE,
      durationMinutes: 18,
      difficulty: "Très facile",
      ingredients: [
        { name: "Pâtes", quantity: "250 g", category: "Pâtes" },
        { name: "Sauce tomate", quantity: "200 ml", category: "Conserve" },
        { name: "Oignon", quantity: "1", category: "Légumes" },
        { name: "Ail", quantity: "1 gousse", category: "Épicerie" },
      ],
      steps: [
        "Cuire les pâtes dans une grande casserole d’eau salée.",
        "Émincer l’oignon et hacher l’ail.",
        "Les faire revenir dans une poêle avec un filet d’huile.",
        "Ajouter la sauce tomate et mijoter 5 minutes.",
        "Mélanger avec les pâtes égouttées.",
      ]
    },
    {
      id: "r15",
      name: "Soba froids concombre‑sésame",
      type: RecipeType.VEGE,
      durationMinutes: 18,
      difficulty: "Facile",
      ingredients: [
        { name: "Soba", quantity: "250 g", category: "Pâtes" },
        { name: "Concombre", quantity: "1", category: "Légumes" },
        { name: "Graines de sésame", quantity: "1 càs", category: "Épicerie" },
        { name: "Sauce soja", quantity: "1 càs", category: "Asie" },
      ],
      steps: [
        "Cuire les soba dans l’eau bouillante selon le paquet.",
        "Rincer à l’eau froide et égoutter.",
        "Couper le concombre en fins bâtonnets.",
        "Mélanger soba, concombre, sésame et sauce soja.",
        "Servir bien frais.",
      ]
    },
    {
      id: "r16",
      name: "Bœuf sauté aux oignons",
      type: RecipeType.VIANDE,
      durationMinutes: 20,
      difficulty: "Facile",
      ingredients: [
        { name: "Bœuf en lamelles", quantity: "250 g", category: "Viande" },
        { name: "Oignons", quantity: "2", category: "Légumes" },
        { name: "Sauce soja", quantity: "1 càs", category: "Asie" },
        { name: "Huile", quantity: "1 càs", category: "Épicerie" },
      ],
      steps: [
        "Émincer finement les oignons.",
        "Faire chauffer l’huile dans une poêle.",
        "Saisir le bœuf à feu vif 2 minutes.",
        "Ajouter les oignons et cuire encore 5 minutes.",
        "Assaisonner avec la sauce soja et servir.",
      ]
    },
    {
      id: "r17",
      name: "Riz sauté légumes et œuf",
      type: RecipeType.VEGE,
      durationMinutes: 18,
      difficulty: "Très facile",
      ingredients: [
        { name: "Riz cuit", quantity: "2 bols", category: "Épicerie" },
        { name: "Carotte", quantity: "1", category: "Légumes" },
        { name: "Oeuf", quantity: "1", category: "Frais" },
        { name: "Petits pois", quantity: "50 g", category: "Légumes" },
      ],
      steps: [
        "Éplucher et couper la carotte en petits cubes.",
        "Faire revenir carotte et petits pois 3 minutes.",
        "Ajouter le riz et mélanger.",
        "Casser l'œuf au centre et remuer jusqu’à cuisson.",
        "Servir aussitôt.",
      ]
    },
    {
      id: "r18",
      name: "Poisson pané maison rapide",
      type: RecipeType.POISSON,
      durationMinutes: 20,
      difficulty: "Facile",
      ingredients: [
        { name: "Filets de poisson blanc", quantity: "2", category: "Poisson" },
        { name: "Chapelure", quantity: "3 càs", category: "Épicerie" },
        { name: "Oeuf", quantity: "1", category: "Frais" },
        { name: "Épicerie", quantity: "- Sel, poivre", category: "" },
      ],
      steps: [
        "Battre l’œuf dans une assiette.",
        "Tremper les filets dans l’œuf puis dans la chapelure.",
        "Faire chauffer un peu d’huile dans une poêle.",
        "Cuire le poisson 3 à 4 minutes par côté.",
        "Servir avec une salade ou du riz.",
      ]
    },
    {
      id: "r19",
      name: "Wok de légumes de saison",
      type: RecipeType.VEGE,
      durationMinutes: 15,
      difficulty: "Très facile",
      ingredients: [
        { name: "Légumes variés", quantity: "300 g", category: "Légumes" },
        { name: "Huile", quantity: "1 càs", category: "Épicerie" },
        { name: "Sauce soja", quantity: "1 càs", category: "Asie" },
        { name: "Épicerie", quantity: "- Sel, poivre", category: "" },
      ],
      steps: [
        "Laver et couper les légumes en lamelles.",
        "Faire chauffer l’huile dans un wok ou une grande poêle.",
        "Sauter les légumes 5 à 7 minutes.",
        "Ajouter la sauce soja et mélanger.",
        "Servir chaud.",
      ]
    },
    {
      id: "r20",
      name: "Tartines au thon et tomate",
      type: RecipeType.POISSON,
      durationMinutes: 10,
      difficulty: "Très facile",
      ingredients: [
        { name: "Tranches de pain", quantity: "4", category: "Boulangerie" },
        { name: "Boîte de thon", quantity: "1", category: "Conserve" },
        { name: "Tomate", quantity: "1", category: "Légumes" },
        { name: "Mayonnaise", quantity: "1 càs", category: "Épicerie" },
      ],
      steps: [
        "Émietter le thon dans un bol et mélanger avec la mayonnaise.",
        "Couper la tomate en fines rondelles.",
        "Tartiner le pain avec le thon.",
        "Ajouter les rondelles de tomate.",
        "Servir immédiatement.",
      ]
    },
    {
      id: "r21",
      name: "Quiche lorraine simplifiée",
      type: RecipeType.VIANDE,
      durationMinutes: 30,
      difficulty: "Facile",
      ingredients: [
        { name: "Pâte brisée", quantity: "1 pâte", category: "Boulangerie" },
        { name: "Lardons", quantity: "150 g", category: "Viande" },
        { name: "Oeufs", quantity: "2", category: "Frais" },
        { name: "Crème fraîche", quantity: "15 cl", category: "Crèmerie" },
        { name: "Fromage râpé", quantity: "50 g", category: "Crèmerie" },
      ],
      steps: [
        "Préchauffer le four à 200°C.",
        "Faire revenir les lardons 3 minutes.",
        "Battre les œufs avec la crème et le fromage.",
        "Dérouler la pâte dans un moule et piquer le fond.",
        "Ajouter les lardons, verser l’appareil et cuire 20 à 25 minutes.",
      ]
    },
    {
      id: "r22",
      name: "Curry doux au poulet",
      type: RecipeType.VIANDE,
      durationMinutes: 25,
      difficulty: "Facile",
      ingredients: [
        { name: "Poulet", quantity: "300 g", category: "Viande" },
        { name: "Carotte", quantity: "1", category: "Légumes" },
        { name: "Pomme de terre", quantity: "1", category: "Légumes" },
        { name: "Lait de coco", quantity: "150 ml", category: "Conserve" },
        { name: "Curry doux", quantity: "1 càs", category: "Épicerie" },
      ],
      steps: [
        "Couper le poulet en morceaux.",
        "Éplucher et couper carotte et pomme de terre.",
        "Faire revenir le poulet 3 minutes.",
        "Ajouter les légumes, le curry et le lait de coco.",
        "Couvrir et cuire 15 minutes à feu doux.",
      ]
    },
    {
      id: "r23",
      name: "Pâtes jambon-fromage",
      type: RecipeType.VIANDE,
      durationMinutes: 15,
      difficulty: "Très facile",
      ingredients: [
        { name: "Pâtes", quantity: "250 g", category: "Pâtes" },
        { name: "Jambon", quantity: "2 tranches", category: "Viande" },
        { name: "Fromage râpé", quantity: "50 g", category: "Crèmerie" },
        { name: "Crème liquide", quantity: "10 cl", category: "Crèmerie" },
      ],
      steps: [
        "Cuire les pâtes dans de l’eau bouillante salée.",
        "Couper le jambon en petits carrés.",
        "Mélanger crème, fromage et jambon dans une casserole.",
        "Faire chauffer doucement.",
        "Égoutter les pâtes et mélanger avec la sauce.",
      ]
    },
    {
      id: "r24",
      name: "Saumon vapeur citron",
      type: RecipeType.POISSON,
      durationMinutes: 15,
      difficulty: "Très facile",
      ingredients: [
        { name: "Pavés de saumon", quantity: "2", category: "Poisson" },
        { name: "Courgette", quantity: "1", category: "Légumes" },
        { name: "Citron", quantity: "1", category: "Fruits" },
        { name: "Épicerie", quantity: "- Sel, poivre", category: "" },
      ],
      steps: [
        "Couper la courgette en rondelles.",
        "Placer saumon et courgette dans un panier vapeur.",
        "Assaisonner et ajouter quelques gouttes de citron.",
        "Cuire 10 minutes.",
        "Servir chaud.",
      ]
    },
    {
      id: "r25",
      name: "Gratin de chou-fleur express",
      type: RecipeType.VEGE,
      durationMinutes: 25,
      difficulty: "Facile",
      ingredients: [
        { name: "Chou-fleur", quantity: "1", category: "Légumes" },
        { name: "Crème", quantity: "10 cl", category: "Crèmerie" },
        { name: "Fromage râpé", quantity: "50 g", category: "Crèmerie" },
        { name: "Épicerie", quantity: "- Sel, poivre", category: "" },
      ],
      steps: [
        "Préchauffer le four à 200°C.",
        "Cuire le chou-fleur 8 minutes dans l’eau bouillante.",
        "Égoutter et mettre dans un plat.",
        "Ajouter la crème, assaisonner, parsemer de fromage.",
        "Gratiner 10 minutes.",
      ]
    },
    {
      id: "r26",
      name: "Bœuf et brocoli sautés",
      type: RecipeType.VIANDE,
      durationMinutes: 18,
      difficulty: "Facile",
      ingredients: [
        { name: "Bœuf en lamelles", quantity: "250 g", category: "Viande" },
        { name: "Brocoli", quantity: "1", category: "Légumes" },
        { name: "Sauce soja", quantity: "1 càs", category: "Asie" },
        { name: "Huile", quantity: "1 càs", category: "Épicerie" },
      ],
      steps: [
        "Couper le brocoli en petits bouquets.",
        "Saisir le bœuf 2 minutes à feu vif.",
        "Ajouter le brocoli et un peu d’eau.",
        "Cuire 5 minutes en remuant.",
        "Assaisonner avec la sauce soja.",
      ]
    },
    {
      id: "r27",
      name: "Omelette aux légumes",
      type: RecipeType.VEGE,
      durationMinutes: 12,
      difficulty: "Très facile",
      ingredients: [
        { name: "Oeufs", quantity: "3", category: "Frais" },
        { name: "Poivron", quantity: "1", category: "Légumes" },
        { name: "Oignon", quantity: "1", category: "Légumes" },
        { name: "Fromage râpé", quantity: "40 g", category: "Crèmerie" },
      ],
      steps: [
        "Émincer poivron et oignon.",
        "Les faire revenir 3 minutes.",
        "Battre les œufs dans un bol.",
        "Verser sur les légumes et ajouter le fromage.",
        "Cuire à feu moyen jusqu’à prise complète.",
      ]
    },
    {
      id: "r28",
      name: "Somen sautés aux légumes",
      type: RecipeType.VEGE,
      durationMinutes: 18,
      difficulty: "Facile",
      ingredients: [
        { name: "Somen", quantity: "200 g", category: "Pâtes" },
        { name: "Courgette", quantity: "1", category: "Légumes" },
        { name: "Carotte", quantity: "1", category: "Légumes" },
        { name: "Sauce soja", quantity: "1 càs", category: "Asie" },
      ],
      steps: [
        "Cuire les somen selon le paquet.",
        "Couper courgette et carotte en lamelles.",
        "Sauter les légumes 4 minutes.",
        "Ajouter les somen et la sauce soja.",
        "Mélanger 1 minute et servir.",
      ]
    },
    {
      id: "r29",
      name: "Salade de riz japonais au concombre",
      type: RecipeType.VEGE,
      durationMinutes: 15,
      difficulty: "Très facile",
      ingredients: [
        { name: "Riz japonais cuit", quantity: "2 bols", category: "Épicerie" },
        { name: "Concombre", quantity: "1", category: "Légumes" },
        { name: "Nori", quantity: "1 feuille", category: "Asie" },
        { name: "Vinaigre de riz", quantity: "1 càs", category: "Asie" },
      ],
      steps: [
        "Couper le concombre en petits cubes.",
        "Couper la feuille de nori en fines lamelles.",
        "Mélanger riz, concombre et nori.",
        "Ajouter le vinaigre de riz.",
        "Servir frais.",
      ]
    },
    {
      id: "r30",
      name: "Galettes de pommes de terre",
      type: RecipeType.VEGE,
      durationMinutes: 20,
      difficulty: "Facile",
      ingredients: [
        { name: "Pommes de terre", quantity: "2", category: "Légumes" },
        { name: "Oeuf", quantity: "1", category: "Frais" },
        { name: "Farine", quantity: "1 càs", category: "Épicerie" },
        { name: "Huile", quantity: "1 càs", category: "Épicerie" },
      ],
      steps: [
        "Râper les pommes de terre.",
        "Mélanger avec l’œuf et la farine.",
        "Former des petites galettes.",
        "Faire chauffer l’huile dans une poêle.",
        "Cuire 3 minutes de chaque côté.",
      ]
    },
    {
      id: "r31",
      name: "One‑pot pâtes aux légumes",
      type: RecipeType.VEGE,
      durationMinutes: 18,
      difficulty: "Très facile",
      ingredients: [
        { name: "Pâtes", quantity: "200 g", category: "Pâtes" },
        { name: "Courgette", quantity: "1", category: "Légumes" },
        { name: "Tomate", quantity: "1", category: "Légumes" },
        { name: "Huile d’olive", quantity: "1 càs", category: "Épicerie" },
      ],
      steps: [
        "Couper courgette et tomate en petits dés.",
        "Mettre pâtes, légumes et huile dans une casserole.",
        "Recouvrir d’eau et saler légèrement.",
        "Cuire 10 à 12 minutes en remuant de temps en temps.",
        "Servir chaud.",
      ]
    },
    {
      id: "r32",
      name: "Poulet au citron express",
      type: RecipeType.VIANDE,
      durationMinutes: 20,
      difficulty: "Facile",
      ingredients: [
        { name: "Poulet en morceaux", quantity: "300 g", category: "Viande" },
        { name: "Citron", quantity: "1", category: "Fruits" },
        { name: "Miel", quantity: "1 càs", category: "Épicerie" },
        { name: "Sauce soja", quantity: "1 càs", category: "Asie" },
      ],
      steps: [
        "Presser le citron et mélanger avec miel et sauce soja.",
        "Faire revenir le poulet dans une poêle.",
        "Verser la sauce sur le poulet.",
        "Cuire 6 à 8 minutes en remuant.",
        "Servir avec du riz.",
      ]
    },
    {
      id: "r33",
      name: "Saumon teriyaki maison",
      type: RecipeType.POISSON,
      durationMinutes: 18,
      difficulty: "Facile",
      ingredients: [
        { name: "Pavés de saumon", quantity: "2", category: "Poisson" },
        { name: "Sauce soja", quantity: "2 càs", category: "Asie" },
        { name: "Sucre", quantity: "1 càs", category: "Épicerie" },
        { name: "Mirin ou eau", quantity: "1 càs", category: "Asie" },
      ],
      steps: [
        "Mélanger sauce soja, sucre et mirin.",
        "Faire chauffer une poêle.",
        "Saisir le saumon 2 minutes côté peau.",
        "Verser la sauce et laisser réduire 3 à 4 minutes.",
        "Retourner le saumon et napper de sauce.",
      ]
    },
    {
      id: "r34",
      name: "Purée maison rapide",
      type: RecipeType.VEGE,
      durationMinutes: 20,
      difficulty: "Très facile",
      ingredients: [
        { name: "Pommes de terre", quantity: "3", category: "Légumes" },
        { name: "Beurre", quantity: "20 g", category: "Crèmerie" },
        { name: "Lait", quantity: "10 cl", category: "Crèmerie" },
      ],
      steps: [
        "Éplucher et couper les pommes de terre en morceaux.",
        "Cuire dans l’eau bouillante 12 minutes.",
        "Égoutter puis écraser en purée.",
        "Ajouter lait et beurre.",
        "Mélanger et servir.",
      ]
    },
    {
      id: "r35",
      name: "Riz sauté au tofu",
      type: RecipeType.VEGE,
      durationMinutes: 15,
      difficulty: "Très facile",
      ingredients: [
        { name: "Riz cuit", quantity: "2 bols", category: "Épicerie" },
        { name: "Tofu ferme", quantity: "100 g", category: "Frais" },
        { name: "Carotte", quantity: "1", category: "Légumes" },
        { name: "Sauce soja", quantity: "1 càs", category: "Asie" },
      ],
      steps: [
        "Couper le tofu en petits cubes.",
        "Râper ou couper la carotte.",
        "Faire revenir carotte et tofu 3 minutes.",
        "Ajouter le riz et la sauce soja.",
        "Mélanger et servir.",
      ]
    },
    {
      id: "r36",
      name: "Sardines grillées et pommes de terre vapeur",
      type: RecipeType.POISSON,
      durationMinutes: 20,
      difficulty: "Facile",
      ingredients: [
        { name: "Sardines fraîches", quantity: "4", category: "Poisson" },
        { name: "Pommes de terre", quantity: "2", category: "Légumes" },
        { name: "Citron", quantity: "1", category: "Fruits" },
      ],
      steps: [
        "Cuire les pommes de terre 12 minutes dans l’eau bouillante.",
        "Chauffer une poêle grill.",
        "Griller les sardines 2 à 3 minutes par côté.",
        "Arroser de citron.",
        "Servir avec les pommes de terre.",
      ]
    },
    {
      id: "r37",
      name: "Pâtes crème-champignons",
      type: RecipeType.VEGE,
      durationMinutes: 17,
      difficulty: "Facile",
      ingredients: [
        { name: "Pâtes", quantity: "250 g", category: "Pâtes" },
        { name: "Champignons", quantity: "150 g", category: "Légumes" },
        { name: "Crème liquide", quantity: "10 cl", category: "Crèmerie" },
      ],
      steps: [
        "Cuire les pâtes.",
        "Couper les champignons en lamelles.",
        "Les faire revenir 3 à 4 minutes.",
        "Ajouter la crème.",
        "Mélanger avec les pâtes.",
      ]
    },
    {
      id: "r38",
      name: "Nouilles sautées au bœuf",
      type: RecipeType.VIANDE,
      durationMinutes: 20,
      difficulty: "Facile",
      ingredients: [
        { name: "Nouilles", quantity: "200 g", category: "Pâtes" },
        { name: "Bœuf en lamelles", quantity: "150 g", category: "Viande" },
        { name: "Carotte", quantity: "1", category: "Légumes" },
        { name: "Sauce soja", quantity: "1 càs", category: "Asie" },
      ],
      steps: [
        "Cuire les nouilles.",
        "Émincer la carotte.",
        "Saisir le bœuf 2 minutes.",
        "Ajouter la carotte, puis les nouilles.",
        "Assaisonner avec la sauce soja.",
      ]
    },
    {
      id: "r39",
      name: "Poisson au four tomate-oignon",
      type: RecipeType.POISSON,
      durationMinutes: 22,
      difficulty: "Facile",
      ingredients: [
        { name: "Filets de poisson blanc", quantity: "2", category: "Poisson" },
        { name: "Tomate", quantity: "1", category: "Légumes" },
        { name: "Oignon", quantity: "1", category: "Légumes" },
      ],
      steps: [
        "Préchauffer le four à 200°C.",
        "Couper tomate et oignon en lamelles.",
        "Déposer le poisson dans un plat.",
        "Ajouter tomate et oignon par-dessus.",
        "Cuire 15 minutes.",
      ]
    },
    {
      id: "r40",
      name: "Riz sauté œufs-chou chinois",
      type: RecipeType.VEGE,
      durationMinutes: 16,
      difficulty: "Très facile",
      ingredients: [
        { name: "Riz cuit", quantity: "2 bols", category: "Épicerie" },
        { name: "Chou chinois", quantity: "2 feuilles", category: "Légumes" },
        { name: "Oeuf", quantity: "1", category: "Frais" },
        { name: "Sauce soja", quantity: "1 càs", category: "Asie" },
      ],
      steps: [
        "Émincer le chou chinois.",
        "Le faire revenir 2 minutes.",
        "Ajouter le riz et mélanger.",
        "Casser un œuf et remuer jusqu’à cuisson.",
        "Ajouter la sauce soja et servir.",
      ]
    },
    {
      id: "r41",
      name: "Pâtes au thon crémeuses",
      type: RecipeType.POISSON,
      durationMinutes: 15,
      difficulty: "Très facile",
      ingredients: [
        { name: "Pâtes", quantity: "250 g", category: "Pâtes" },
        { name: "Thon", quantity: "1 boîte", category: "Conserve" },
        { name: "Crème liquide", quantity: "10 cl", category: "Crèmerie" },
        { name: "Épicerie", quantity: "- Sel, poivre", category: "" },
      ],
      steps: [
        "Cuire les pâtes dans une casserole d’eau salée.",
        "Égoutter le thon et l’émietter.",
        "Chauffer la crème dans une petite casserole.",
        "Ajouter le thon et assaisonner.",
        "Mélanger la sauce avec les pâtes.",
      ]
    },
    {
      id: "r42",
      name: "Tofu poêlé au sésame",
      type: RecipeType.VEGE,
      durationMinutes: 12,
      difficulty: "Très facile",
      ingredients: [
        { name: "Tofu ferme", quantity: "150 g", category: "Frais" },
        { name: "Sauce soja", quantity: "1 càs", category: "Asie" },
        { name: "Graines de sésame", quantity: "1 càs", category: "Épicerie" },
        { name: "Huile", quantity: "1 càs", category: "Épicerie" },
      ],
      steps: [
        "Couper le tofu en petits carrés.",
        "Chauffer l’huile dans une poêle.",
        "Faire dorer le tofu 3 minutes.",
        "Ajouter sauce soja et graines de sésame.",
        "Mélanger et servir.",
      ]
    },
    {
      id: "r43",
      name: "Poulet sauté au chou chinois",
      type: RecipeType.VIANDE,
      durationMinutes: 18,
      difficulty: "Facile",
      ingredients: [
        { name: "Poulet en lamelles", quantity: "300 g", category: "Viande" },
        { name: "Chou chinois", quantity: "2 feuilles", category: "Légumes" },
        { name: "Sauce soja", quantity: "1 càs", category: "Asie" },
        { name: "Huile", quantity: "1 càs", category: "Épicerie" },
      ],
      steps: [
        "Émincer le chou chinois.",
        "Faire chauffer l’huile dans une poêle.",
        "Faire revenir le poulet 3 minutes.",
        "Ajouter le chou et la sauce soja.",
        "Cuire encore 3 minutes en remuant.",
      ]
    },
    {
      id: "r44",
      name: "Nouilles udon au poulet et carotte",
      type: RecipeType.VIANDE,
      durationMinutes: 20,
      difficulty: "Facile",
      ingredients: [
        { name: "Udon frais", quantity: "300 g", category: "Pâtes" },
        { name: "Poulet en dés", quantity: "150 g", category: "Viande" },
        { name: "Carotte", quantity: "1", category: "Légumes" },
        { name: "Sauce soja", quantity: "1 càs", category: "Asie" },
      ],
      steps: [
        "Cuire les udon selon le paquet.",
        "Couper la carotte en fins bâtonnets.",
        "Faire revenir le poulet dans une poêle.",
        "Ajouter la carotte puis les udon.",
        "Assaisonner avec la sauce soja.",
      ]
    },
    {
      id: "r45",
      name: "Riz sauté au saumon",
      type: RecipeType.POISSON,
      durationMinutes: 15,
      difficulty: "Facile",
      ingredients: [
        { name: "Saumon cuit ou restant", quantity: "1 pavé", category: "Poisson" },
        { name: "Riz cuit", quantity: "2 bols", category: "Épicerie" },
        { name: "Oeuf", quantity: "1", category: "Frais" },
        { name: "Sauce soja", quantity: "1 càs", category: "Asie" },
      ],
      steps: [
        "Émietter grossièrement le saumon.",
        "Faire chauffer une poêle et ajouter le riz.",
        "Casser un œuf et mélanger rapidement.",
        "Ajouter le saumon puis la sauce soja.",
        "Mélanger et servir.",
      ]
    },
    {
      id: "r46",
      name: "Poisson en papillote au citron",
      type: RecipeType.POISSON,
      durationMinutes: 20,
      difficulty: "Facile",
      ingredients: [
        { name: "Filets de poisson blanc", quantity: "2", category: "Poisson" },
        { name: "Citron", quantity: "1", category: "Fruits" },
        { name: "Tomate", quantity: "1", category: "Légumes" },
        { name: "Épicerie", quantity: "- Sel, poivre", category: "" },
      ],
      steps: [
        "Préchauffer le four à 200°C.",
        "Couper la tomate en rondelles.",
        "Poser chaque filet sur du papier cuisson.",
        "Ajouter tomate et citron par-dessus.",
        "Fermer la papillote et cuire 12 à 15 minutes.",
      ]
    },
    {
      id: "r47",
      name: "Pâtes au pesto maison rapide",
      type: RecipeType.VEGE,
      durationMinutes: 15,
      difficulty: "Facile",
      ingredients: [
        { name: "Pâtes", quantity: "250 g", category: "Pâtes" },
        { name: "Basilic", quantity: "1 poignée", category: "Légumes" },
        { name: "Parmesan", quantity: "1 càs", category: "Crèmerie" },
        { name: "Huile d’olive", quantity: "1 càs", category: "Épicerie" },
      ],
      steps: [
        "Cuire les pâtes.",
        "Mixer basilic, parmesan et huile.",
        "Égoutter les pâtes.",
        "Mélanger avec le pesto.",
        "Servir aussitôt.",
      ]
    },
    {
      id: "r48",
      name: "Nouilles sautées au tofu et brocoli",
      type: RecipeType.VEGE,
      durationMinutes: 18,
      difficulty: "Facile",
      ingredients: [
        { name: "Nouilles", quantity: "200 g", category: "Pâtes" },
        { name: "Tofu ferme", quantity: "100 g", category: "Frais" },
        { name: "Brocoli", quantity: "1", category: "Légumes" },
        { name: "Sauce soja", quantity: "1 càs", category: "Asie" },
      ],
      steps: [
        "Cuire les nouilles.",
        "Couper tofu et brocoli en petits morceaux.",
        "Faire revenir le tofu 2 minutes.",
        "Ajouter le brocoli et cuire 5 minutes.",
        "Ajouter les nouilles et la sauce soja.",
      ]
    },
    {
      id: "r49",
      name: "Omelette pommes de terre-oignon",
      type: RecipeType.VEGE,
      durationMinutes: 20,
      difficulty: "Facile",
      ingredients: [
        { name: "Pommes de terre", quantity: "2", category: "Légumes" },
        { name: "Oignon", quantity: "1", category: "Légumes" },
        { name: "Oeufs", quantity: "3", category: "Frais" },
        { name: "Épicerie", quantity: "- Sel, poivre", category: "" },
      ],
      steps: [
        "Couper pommes de terre et oignon en fines lamelles.",
        "Les faire revenir 8 minutes.",
        "Battre les œufs dans un bol.",
        "Verser sur les légumes.",
        "Cuire jusqu’à prise complète.",
      ]
    },
    {
      id: "r50",
      name: "Riz sauté au porc et chou chinois",
      type: RecipeType.VIANDE,
      durationMinutes: 18,
      difficulty: "Facile",
      ingredients: [
        { name: "Porc émincé", quantity: "200 g", category: "Viande" },
        { name: "Chou chinois", quantity: "2 feuilles", category: "Légumes" },
        { name: "Riz cuit", quantity: "2 bols", category: "Épicerie" },
        { name: "Sauce soja", quantity: "1 càs", category: "Asie" },
      ],
      steps: [
        "Émincer le chou chinois.",
        "Faire revenir le porc dans une poêle.",
        "Ajouter le chou et cuire 2 minutes.",
        "Ajouter le riz puis la sauce soja.",
        "Mélanger et servir.",
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

    let anotherRow = null;
    if (options.showAnotherButton) {
      anotherRow = document.createElement("div");
      anotherRow.className = "button-row";

      const btnAnother = document.createElement("button");
      btnAnother.className = "primary";
      btnAnother.textContent = "Autre idée";
      btnAnother.onclick = renderRandomRecipe;
      anotherRow.appendChild(btnAnother);

      const btnTransfer = document.createElement("button");
      btnTransfer.className = "secondary";
      btnTransfer.textContent = "Transférer à Ma semaine";
      btnTransfer.onclick = () => {
        let freeIndex = -1;
        for (let i = 0; i < DAYS.length; i++) {
          if (!currentWeekIncluded[i]) {
            freeIndex = i;
            break;
          }
        }

        if (freeIndex === -1) {
          contentDiv.innerHTML = "";
          const cardMsg = document.createElement("div");
          cardMsg.className = "card";

          const titleMsg = document.createElement("h2");
          titleMsg.textContent = "Semaine déjà pleine";
          cardMsg.appendChild(titleMsg);

          const msg = document.createElement("p");
          msg.textContent = "Semaine déjà pleine, décocher d'abord un jour de la semaine.";
          cardMsg.appendChild(msg);

          const rowButtons = document.createElement("div");
          rowButtons.className = "button-row";

          const btnBackRecipe = document.createElement("button");
          btnBackRecipe.textContent = "Retour à la recette";
          btnBackRecipe.onclick = () => {
            renderRecipeDetail(recipe, options);
          };
          rowButtons.appendChild(btnBackRecipe);

          const btnGotoWeek = document.createElement("button");
          btnGotoWeek.className = "primary";
          btnGotoWeek.textContent = "Retour à la semaine";
          btnGotoWeek.onclick = () => {
            setActiveView("week");
            renderWeek();
          };
          rowButtons.appendChild(btnGotoWeek);

          cardMsg.appendChild(rowButtons);
          contentDiv.appendChild(cardMsg);
          return;
        }

        currentWeekPlan[freeIndex] = recipe;
        currentWeekIncluded[freeIndex] = true;
        saveWeekState();
        setActiveView("week");
        renderWeek();
      };
      anotherRow.appendChild(btnTransfer);
    }

    const ingTitle = document.createElement("div");
    ingTitle.className = "section-title";
    ingTitle.textContent = "Ingrédients";
    card.appendChild(ingTitle);

    if (anotherRow) {
      card.appendChild(anotherRow);
    }

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

    card.appendChild(ratingRow);

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

  const btnRandom = document.getElementById("btn-random");
  const btnPlanning = document.getElementById("btn-planning");

  function setActiveView(view) {
    if (btnRandom) btnRandom.classList.toggle("is-active", view === "random");
    if (btnPlanning) btnPlanning.classList.toggle("is-active", view === "week");
  }

  if (btnRandom) {
    btnRandom.onclick = () => {
      setActiveView("random");
      renderRandomRecipe();
    };
  }

  if (btnPlanning) {
    btnPlanning.onclick = () => {
      setActiveView("week");
      renderWeek();
    };
  }

  setActiveView("random");
  renderRandomRecipe();
});
