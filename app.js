
window.addEventListener("DOMContentLoaded", () => {
  const RecipeType = {
    VIANDE: "viande",
    POISSON: "poisson",
    VEGE: "vegetarien"
  };

  const DAYS = ["Lundi","Mardi","Mercredi","Jeudi","Vendredi","Samedi","Dimanche"];
const CATEGORY_ALL = "Tout";
let currentCategoryFilter = CATEGORY_ALL;
let allCategories = [CATEGORY_ALL];

function computeAllCategories() {
  const all = getAllRecipes();
  const set = new Set();
  all.forEach(r => {
    if (r.cuisineCategory) {
      set.add(r.cuisineCategory);
    }
  });
  return [CATEGORY_ALL, ...Array.from(set).sort()];
}

function ensureCategoriesInitialized() {
  if (!allCategories || allCategories.length <= 1) {
    allCategories = computeAllCategories();
  }
  if (!allCategories.includes(currentCategoryFilter)) {
    currentCategoryFilter = CATEGORY_ALL;
  }
}


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
    ],
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
    ],
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
    ],
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
    ],
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
    ],
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
    ],
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
    ],
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
    ],
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
    ],
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
    ],
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
    ],
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
    ],
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
    ],
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
    ],
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
    ],
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
    ],
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
    ],
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
    ],
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
    ],
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
    ],
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
    ],
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
    ],
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
    ],
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
    ],
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
    ],
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
    ],
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
    ],
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
    ],
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
    ],
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
    ],
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
    ],
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
    ],
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
    ],
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
    ],
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
    ],
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
    ],
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
    ],
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
    ],
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
    ],
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
    ],
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
    ],
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
    ],
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
    ],
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
    ],
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
    ],
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
    ],
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
    ],
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
    ],
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
    ],
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
    ],
  },
  {
    id: "r51",
    name: "Omelette nature rapide",
    type: RecipeType.VEGE,
    durationMinutes: 10,
    difficulty: "Facile",
    ingredients: [
      { name: "Œufs", quantity: "4", category: "" },
      { name: "Lait (optionnel)", quantity: "1 càs", category: "" },
      { name: "Sel", quantity: "1 pincée", category: "" },
      { name: "Poivre", quantity: "1 pincée", category: "" },
      { name: "Beurre ou huile", quantity: "1 càs", category: "" },
    ],
    steps: [
      "Battre les œufs.",
      "Chauffer poêle.",
      "Cuire omelette.",
      "Servir.",
    ],
  },
  {
    id: "r52",
    name: "Salade César poulet simplifiée",
    type: RecipeType.VIANDE,
    durationMinutes: 20,
    difficulty: "Facile",
    ingredients: [
      { name: "Blancs de poulet", quantity: "2", category: "" },
      { name: "Salade", quantity: "1", category: "" },
      { name: "Tomate", quantity: "1", category: "" },
      { name: "Fromage râpé", quantity: "30 g", category: "" },
      { name: "Huile d’olive", quantity: "", category: "" },
      { name: "Citron", quantity: "", category: "" },
    ],
    steps: [
      "Cuire poulet.",
      "Préparer légumes.",
      "Assembler salade.",
      "Assaisonner.",
    ],
  },
  {
    id: "r53",
    name: "Poêlée légumes + œufs brouillés",
    type: RecipeType.VEGE,
    durationMinutes: 20,
    difficulty: "Facile",
    ingredients: [
      { name: "Œufs", quantity: "3", category: "" },
      { name: "Légumes", quantity: "200 g", category: "" },
      { name: "Huile d’olive", quantity: "1 càs", category: "" },
      { name: "Sel", quantity: "", category: "" },
      { name: "Poivre", quantity: "", category: "" },
    ],
    steps: [
      "Cuire légumes.",
      "Ajouter œufs.",
      "Brouiller.",
      "Servir.",
    ],
  },
  {
    id: "r54",
    name: "Gnocchis crème de poivron",
    type: RecipeType.VEGE,
    durationMinutes: 25,
    difficulty: "Facile",
    ingredients: [
      { name: "Gnocchis", quantity: "500 g", category: "" },
      { name: "Poivrons", quantity: "2", category: "" },
      { name: "Oignon", quantity: "1", category: "" },
      { name: "Crème", quantity: "10 cl", category: "" },
    ],
    steps: [
      "Cuire gnocchis.",
      "Cuire légumes.",
      "Ajouter crème.",
      "Mélanger.",
    ],
  },
  {
    id: "r55",
    name: "Pâtes sauce tomate express",
    type: RecipeType.VEGE,
    durationMinutes: 25,
    difficulty: "Facile",
    ingredients: [
      { name: "Pâtes", quantity: "350 g", category: "" },
      { name: "Tomates", quantity: "1 boîte", category: "" },
      { name: "Oignon", quantity: "1", category: "" },
      { name: "Gousse d’ail", quantity: "1", category: "" },
    ],
    steps: [
      "Cuire pâtes.",
      "Faire sauce.",
      "Mélanger.",
    ],
  },
  {
    id: "r56",
    name: "Omelette roulée aux légumes",
    type: RecipeType.VEGE,
    durationMinutes: 20,
    difficulty: "Facile",
    ingredients: [
      { name: "Œufs", quantity: "4", category: "" },
      { name: "Légumes", quantity: "150 g", category: "" },
      { name: "Sel", quantity: "", category: "" },
      { name: "Poivre", quantity: "", category: "" },
    ],
    steps: [
      "Battre œufs.",
      "Cuire omelette.",
      "Rouler.",
    ],
  },
  {
    id: "r57",
    name: "Wraps thon-légumes",
    type: RecipeType.VIANDE,
    durationMinutes: 15,
    difficulty: "Facile",
    ingredients: [
      { name: "Tortillas", quantity: "4", category: "" },
      { name: "Thon", quantity: "1 boîte", category: "" },
      { name: "Tomate", quantity: "1", category: "" },
      { name: "Concombre", quantity: "1/2", category: "" },
      { name: "Yaourt", quantity: "", category: "" },
    ],
    steps: [
      "Préparer sauce thon.",
      "Couper légumes.",
      "Garnir tortillas.",
    ],
  },
  {
    id: "r58",
    name: "Tortilla pommes de terre rapide",
    type: RecipeType.VEGE,
    durationMinutes: 25,
    difficulty: "Facile",
    ingredients: [
      { name: "Pommes de terre", quantity: "5", category: "" },
      { name: "Œufs", quantity: "4", category: "" },
      { name: "Oignon", quantity: "1", category: "" },
    ],
    steps: [
      "Cuire pommes de terre.",
      "Ajouter œufs.",
      "Cuire des deux côtés.",
    ],
  },
  {
    id: "r59",
    name: "Riz + légumes + œuf mollet",
    type: RecipeType.VEGE,
    durationMinutes: 25,
    difficulty: "Facile",
    ingredients: [
      { name: "Riz", quantity: "200 g", category: "" },
      { name: "Légumes", quantity: "200 g", category: "" },
      { name: "Œufs", quantity: "2", category: "" },
    ],
    steps: [
      "Cuire riz.",
      "Poêler légumes.",
      "Cuire œufs mollets.",
    ],
  },
  {
    id: "r60",
    name: "Pâtes/gnocchis sauce légère",
    type: RecipeType.VEGE,
    durationMinutes: 20,
    difficulty: "Facile",
    ingredients: [
      { name: "Pâtes", quantity: "300 g", category: "" },
      { name: "Légumes", quantity: "200 g", category: "" },
      { name: "Yaourt", quantity: "1", category: "" },
    ],
    steps: [
      "Cuire pâtes.",
      "Cuire légumes.",
      "Ajouter yaourt.",
    ],
  },
  {
    id: "r61",
    name: "Spaghetti ail, huile et piment",
    type: RecipeType.VEGE,
    durationMinutes: 20,
    difficulty: "Facile",
    ingredients: [
      { name: "Spaghetti", quantity: "300 g", category: "" },
      { name: "Gousses d’ail", quantity: "3", category: "" },
      { name: "Huile d’olive", quantity: "3 càs", category: "" },
      { name: "Piment en flocons ou poivre", quantity: "1 pincée", category: "" },
      { name: "Sel", quantity: "1 pincée", category: "" },
      { name: "Persil (optionnel)", quantity: "1 càs", category: "" },
    ],
    steps: [
      "Cuire les spaghetti dans une grande casserole d’eau salée.",
      "Égoutter en gardant une petite louche d’eau de cuisson.",
      "Pendant ce temps, éplucher et émincer l’ail.",
      "Faire revenir l’ail dans l’huile à feu doux sans le brûler.",
      "Ajouter le piment (ou poivre) et un peu d’eau de cuisson.",
      "Mélanger les spaghetti avec l’huile parfumée.",
      "Parsemer de persil avant de servir.",
    ],
  },
  {
    id: "r62",
    name: "Pâtes au pesto rouge et tomates séchées",
    type: RecipeType.VEGE,
    durationMinutes: 25,
    difficulty: "Facile",
    ingredients: [
      { name: "Pâtes courtes (penne ou rigatoni)", quantity: "300 g", category: "" },
      { name: "Tomates séchées", quantity: "80 g", category: "" },
      { name: "Huile d’olive", quantity: "2 càs", category: "" },
      { name: "Parmesan râpé (optionnel)", quantity: "20 g", category: "" },
      { name: "Sel", quantity: "1 pincée", category: "" },
      { name: "Poivre", quantity: "1 pincée", category: "" },
    ],
    steps: [
      "Cuire les pâtes dans une grande casserole d’eau salée.",
      "Égoutter et garder un peu d’eau de cuisson.",
      "Pendant ce temps, hacher les tomates séchées.",
      "Mélanger tomates séchées, huile d’olive, sel et poivre dans un bol.",
      "Ajouter un peu d’eau de cuisson pour assouplir la sauce.",
      "Mélanger les pâtes avec la sauce.",
      "Ajouter le parmesan avant de servir si désiré.",
    ],
  },
  {
    id: "r63",
    name: "Pâtes aux courgettes et fromage frais",
    type: RecipeType.VEGE,
    durationMinutes: 25,
    difficulty: "Facile",
    ingredients: [
      { name: "Pâtes", quantity: "300 g", category: "" },
      { name: "Courgettes", quantity: "2", category: "" },
      { name: "Oignon", quantity: "1", category: "" },
      { name: "Fromage frais type stracchino ou fromage à tartiner", quantity: "100 g", category: "" },
      { name: "Huile d’olive", quantity: "1 càs", category: "" },
      { name: "Sel", quantity: "1 pincée", category: "" },
      { name: "Poivre", quantity: "1 pincée", category: "" },
    ],
    steps: [
      "Cuire les pâtes dans de l’eau salée.",
      "Égoutter en gardant un peu d’eau de cuisson.",
      "Pendant ce temps, émincer l’oignon et couper les courgettes en dés ou rondelles.",
      "Faire revenir oignon et courgettes dans l’huile d’olive 7 à 8 minutes.",
      "Saler, poivrer.",
      "Ajouter le fromage frais dans la poêle pour qu’il fonde doucement.",
      "Mélanger les pâtes avec la sauce aux courgettes.",
      "Ajouter un peu d’eau de cuisson si besoin pour lier le tout.",
    ],
  },
  {
    id: "r64",
    name: "Spaghetti aux palourdes simplifiés",
    type: RecipeType.POISSON,
    durationMinutes: 25,
    difficulty: "Facile",
    ingredients: [
      { name: "Spaghetti", quantity: "300 g", category: "" },
      { name: "Palourdes (ou moules)", quantity: "600 g", category: "" },
      { name: "Gousses d’ail", quantity: "2", category: "" },
      { name: "Huile d’olive", quantity: "2 càs", category: "" },
      { name: "Persil haché", quantity: "1 càs", category: "" },
      { name: "Sel", quantity: "1 pincée", category: "" },
      { name: "Poivre", quantity: "1 pincée", category: "" },
    ],
    steps: [
      "Laver les palourdes rapidement sous l’eau froide.",
      "Mettre les palourdes dans une grande poêle avec un fond d’eau et l’ail émincé.",
      "Couvrir et laisser ouvrir les palourdes à feu moyen.",
      "Retirer les coquilles si souhaité et garder le jus de cuisson.",
      "Cuire les spaghetti dans de l’eau salée.",
      "Égoutter les pâtes et les verser dans la poêle avec les palourdes et leur jus.",
      "Ajouter l’huile d’olive, le persil, sel et poivre.",
      "Mélanger 1 à 2 minutes sur feu doux avant de servir.",
    ],
  },
  {
    id: "r65",
    name: "Gnocchis à la tomate façon Sorrentina",
    type: RecipeType.VEGE,
    durationMinutes: 25,
    difficulty: "Facile",
    ingredients: [
      { name: "Gnocchis", quantity: "500 g", category: "" },
      { name: "Tomates concassées en boîte", quantity: "400 g", category: "" },
      { name: "Oignon", quantity: "1", category: "" },
      { name: "Gousse d’ail", quantity: "1", category: "" },
      { name: "Huile d’olive", quantity: "1 càs", category: "" },
      { name: "Mozzarella ou fromage râpé (optionnel)", quantity: "80 g", category: "" },
      { name: "Sel", quantity: "1 pincée", category: "" },
      { name: "Poivre", quantity: "1 pincée", category: "" },
      { name: "Basilic (frais ou séché)", quantity: "1 càs", category: "" },
    ],
    steps: [
      "Cuire les gnocchis dans une casserole d’eau salée jusqu’à ce qu’ils remontent à la surface.",
      "Égoutter les gnocchis.",
      "Pendant ce temps, émincer l’oignon et l’ail.",
      "Faire revenir oignon et ail dans l’huile d’olive.",
      "Ajouter les tomates concassées, sel, poivre et basilic.",
      "Laisser mijoter 5 à 8 minutes.",
      "Mélanger les gnocchis avec la sauce tomate.",
      "Ajouter la mozzarella ou le fromage râpé juste avant de servir.",
    ],
  },
  {
    id: "r66",
    name: "Penne aux champignons et crème légère",
    type: RecipeType.VEGE,
    durationMinutes: 25,
    difficulty: "Facile",
    ingredients: [
      { name: "Penne", quantity: "300 g", category: "" },
      { name: "Champignons de Paris", quantity: "200 g", category: "" },
      { name: "Oignon", quantity: "1", category: "" },
      { name: "Crème légère ou crème végétale", quantity: "15 cl", category: "" },
      { name: "Huile d’olive", quantity: "1 càs", category: "" },
      { name: "Sel", quantity: "1 pincée", category: "" },
      { name: "Poivre", quantity: "1 pincée", category: "" },
    ],
    steps: [
      "Cuire les penne dans une grande casserole d’eau salée.",
      "Égoutter les pâtes.",
      "Pendant ce temps, émincer l’oignon et les champignons.",
      "Faire revenir l’oignon dans l’huile d’olive.",
      "Ajouter les champignons et cuire 5 à 7 minutes.",
      "Saler, poivrer.",
      "Verser la crème et laisser mijoter 2 à 3 minutes.",
      "Mélanger les penne avec la sauce aux champignons avant de servir.",
    ],
  },
  {
    id: "r67",
    name: "Pâtes primavera aux légumes verts",
    type: RecipeType.VEGE,
    durationMinutes: 25,
    difficulty: "Facile",
    ingredients: [
      { name: "Pâtes", quantity: "300 g", category: "" },
      { name: "Asperges ou courgettes", quantity: "200 g", category: "" },
      { name: "Épinards frais ou surgelés", quantity: "100 g", category: "" },
      { name: "Oignon", quantity: "1", category: "" },
      { name: "Huile d’olive", quantity: "1 càs", category: "" },
      { name: "Sel", quantity: "1 pincée", category: "" },
      { name: "Poivre", quantity: "1 pincée", category: "" },
      { name: "Parmesan râpé (optionnel)", quantity: "1 càs", category: "" },
    ],
    steps: [
      "Cuire les pâtes dans de l’eau salée.",
      "Égoutter les pâtes.",
      "Pendant ce temps, couper les asperges ou courgettes en petits morceaux.",
      "Émincer l’oignon.",
      "Faire revenir l’oignon et les légumes dans l’huile d’olive environ 5 minutes.",
      "Ajouter les épinards et cuire jusqu’à ce qu’ils tombent.",
      "Saler, poivrer.",
      "Mélanger les pâtes avec les légumes.",
      "Ajouter le parmesan avant de servir si souhaité.",
    ],
  },
  {
    id: "r68",
    name: "One‑pot pâtes saucisse et champignons",
    type: RecipeType.VIANDE,
    durationMinutes: 30,
    difficulty: "Facile",
    ingredients: [
      { name: "Pâtes", quantity: "300 g", category: "" },
      { name: "Saucisses type chipolata ou 200 g de poulet", quantity: "2", category: "" },
      { name: "Champignons", quantity: "200 g", category: "" },
      { name: "Oignon", quantity: "1", category: "" },
      { name: "Crème légère", quantity: "15 cl", category: "" },
      { name: "Huile d’olive", quantity: "1 càs", category: "" },
      { name: "Sel", quantity: "1 pincée", category: "" },
      { name: "Poivre", quantity: "1 pincée", category: "" },
      { name: "Eau (environ)", quantity: "600 ml", category: "" },
    ],
    steps: [
      "Émincer l’oignon et couper la saucisse ou le poulet en morceaux.",
      "Couper les champignons.",
      "Dans une grande poêle ou un faitout, faire revenir oignon, saucisse ou poulet et champignons dans l’huile.",
      "Ajouter les pâtes crues et l’eau pour juste couvrir.",
      "Saler, poivrer.",
      "Laisser cuire en remuant de temps en temps jusqu’à ce que l’eau soit presque absorbée et que les pâtes soient cuites.",
      "Ajouter la crème, mélanger encore 1 à 2 minutes.",
      "Servir immédiatement.",
    ],
  },
  {
    id: "r69",
    name: "Bruschetta tomates et mozzarella",
    type: RecipeType.VEGE,
    durationMinutes: 15,
    difficulty: "Facile",
    ingredients: [
      { name: "Tranches de pain", quantity: "6", category: "" },
      { name: "Tomates", quantity: "3", category: "" },
      { name: "Boule de mozzarella", quantity: "1", category: "" },
      { name: "Huile d’olive", quantity: "2 càs", category: "" },
      { name: "Sel", quantity: "1 pincée", category: "" },
      { name: "Poivre", quantity: "1 pincée", category: "" },
      { name: "Basilic", quantity: "1 càs", category: "" },
    ],
    steps: [
      "Griller légèrement les tranches de pain au grille‑pain ou au four.",
      "Couper les tomates en petits dés.",
      "Couper la mozzarella en petits cubes.",
      "Mélanger tomates, mozzarella, huile d’olive, sel, poivre et basilic dans un bol.",
      "Répartir le mélange sur les tranches de pain grillé.",
      "Servir immédiatement en entrée ou en repas léger.",
    ],
  },
  {
    id: "r70",
    name: "Minestrone de légumes rapide",
    type: RecipeType.VEGE,
    durationMinutes: 25,
    difficulty: "Facile",
    ingredients: [
      { name: "Carotte", quantity: "1", category: "" },
      { name: "Courgette", quantity: "1", category: "" },
      { name: "Branche de céleri ou poireau", quantity: "1", category: "" },
      { name: "Tomate", quantity: "1", category: "" },
      { name: "Haricots en boîte ou pois chiches", quantity: "150 g", category: "" },
      { name: "Eau ou bouillon", quantity: "750 ml", category: "" },
      { name: "Huile d’olive", quantity: "1 càs", category: "" },
      { name: "Sel", quantity: "1 pincée", category: "" },
      { name: "Poivre", quantity: "1 pincée", category: "" },
      { name: "Herbes (thym, origan, basilic)", quantity: "1 càs", category: "" },
    ],
    steps: [
      "Éplucher et couper les légumes en petits dés.",
      "Rincer les haricots ou pois chiches si en boîte.",
      "Dans une casserole, faire revenir les légumes dans l’huile d’olive 5 minutes.",
      "Ajouter l’eau ou le bouillon, les haricots, le sel, le poivre et les herbes.",
      "Porter à ébullition puis laisser mijoter 10 à 15 minutes.",
      "Vérifier la cuisson des légumes.",
      "Servir bien chaud.",
    ],
  },
  {
    id: "r71",
    name: "Tamago Kake Gohan",
    type: RecipeType.VEGE,
    durationMinutes: 10,
    difficulty: "Facile",
    ingredients: [
      { name: "Riz cuit", quantity: "200 g", category: "" },
      { name: "Œufs", quantity: "2", category: "" },
      { name: "Sauce soja", quantity: "1 càs", category: "" },
      { name: "Ciboule hachée (optionnel)", quantity: "1 càs", category: "" },
    ],
    steps: [
      "Cuire le riz.",
      "Mettre le riz chaud dans un bol.",
      "Casser un œuf dessus.",
      "Ajouter un filet de sauce soja.",
      "Mélanger vigoureusement avant de manger.",
      "Ajouter ciboule si désiré.",
    ],
  },
  {
    id: "r72",
    name: "Soupe miso rapide",
    type: RecipeType.VEGE,
    durationMinutes: 15,
    difficulty: "Facile",
    ingredients: [
      { name: "Eau", quantity: "500 ml", category: "" },
      { name: "Pâte miso", quantity: "2 càs", category: "" },
      { name: "Tofu en cubes", quantity: "200 g", category: "" },
      { name: "Wakamé réhydraté", quantity: "1 càs", category: "" },
      { name: "Ciboule", quantity: "1 càs", category: "" },
    ],
    steps: [
      "Faire chauffer l’eau sans bouillir.",
      "Dissoudre la pâte miso.",
      "Ajouter tofu et wakamé.",
      "Cuire 2 minutes.",
      "Ajouter ciboule avant de servir.",
    ],
  },
  {
    id: "r73",
    name: "Yakisoba rapide",
    type: RecipeType.VIANDE,
    durationMinutes: 25,
    difficulty: "Facile",
    ingredients: [
      { name: "Nouilles sautées ou soba", quantity: "300 g", category: "" },
      { name: "Légumes variés", quantity: "200 g", category: "" },
      { name: "Viande ou tofu", quantity: "150 g", category: "" },
      { name: "Sauce soja", quantity: "2 càs", category: "" },
      { name: "Huile", quantity: "1 càs", category: "" },
    ],
    steps: [
      "Cuire ou réchauffer les nouilles.",
      "Faire sauter légumes et viande/tofu.",
      "Ajouter nouilles et sauce soja.",
      "Mélanger et cuire 2 minutes.",
    ],
  },
  {
    id: "r74",
    name: "Yakitori express",
    type: RecipeType.VIANDE,
    durationMinutes: 20,
    difficulty: "Facile",
    ingredients: [
      { name: "Poulet en morceaux", quantity: "400 g", category: "" },
      { name: "Oignon ou poireau", quantity: "1", category: "" },
      { name: "Sauce soja", quantity: "2 càs", category: "" },
      { name: "Sucre ou miel", quantity: "1 càs", category: "" },
    ],
    steps: [
      "Couper poulet et oignon.",
      "Embrocher.",
      "Faire cuire à la poêle.",
      "Arroser de sauce soja + miel.",
      "Cuire jusqu’à caramélisation légère.",
    ],
  },
  {
    id: "r75",
    name: "Gyudon simplifié",
    type: RecipeType.VIANDE,
    durationMinutes: 25,
    difficulty: "Facile",
    ingredients: [
      { name: "Riz cuit", quantity: "200 g", category: "" },
      { name: "Bœuf en fines tranches", quantity: "300 g", category: "" },
      { name: "Oignon", quantity: "1", category: "" },
      { name: "Sauce soja", quantity: "2 càs", category: "" },
      { name: "Sucre", quantity: "1 càs", category: "" },
      { name: "Mirin ou eau", quantity: "1 càs", category: "" },
    ],
    steps: [
      "Faire revenir l’oignon.",
      "Ajouter le bœuf.",
      "Ajouter sauce soja, sucre et mirin.",
      "Laisser mijoter 5 minutes.",
      "Servir sur le riz.",
    ],
  },
  {
    id: "r76",
    name: "Œufs marinés Ajitsuke Tamago",
    type: RecipeType.VEGE,
    durationMinutes: 15,
    difficulty: "Facile",
    ingredients: [
      { name: "Œufs", quantity: "4", category: "" },
      { name: "Sauce soja", quantity: "3 càs", category: "" },
      { name: "Sucre", quantity: "1 càs", category: "" },
      { name: "Eau", quantity: "100 ml", category: "" },
    ],
    steps: [
      "Cuire les œufs 7 minutes.",
      "Les écaler.",
      "Mélanger sauce soja, sucre, eau.",
      "Faire mariner minimum 30 minutes.",
    ],
  },
  {
    id: "r77",
    name: "Agedashi Dōfu simplifié",
    type: RecipeType.VEGE,
    durationMinutes: 20,
    difficulty: "Facile",
    ingredients: [
      { name: "Tofu ferme", quantity: "300 g", category: "" },
      { name: "Fécule", quantity: "2 càs", category: "" },
      { name: "Sauce soja", quantity: "2 càs", category: "" },
      { name: "Bouillon chaud", quantity: "200 ml", category: "" },
      { name: "Ciboule", quantity: "1 càs", category: "" },
    ],
    steps: [
      "Couper le tofu en cubes.",
      "Les fariner légèrement.",
      "Faire frire dans un peu d’huile.",
      "Ajouter bouillon + sauce soja.",
      "Servir avec ciboule.",
    ],
  },
  {
    id: "r78",
    name: "Onigiri simples",
    type: RecipeType.VEGE,
    durationMinutes: 20,
    difficulty: "Facile",
    ingredients: [
      { name: "Riz cuit", quantity: "300 g", category: "" },
      { name: "Garniture (thon mayo, saumon, légumes)", quantity: "100 g", category: "" },
      { name: "Nori (optionnel)", quantity: "1 feuille", category: "" },
    ],
    steps: [
      "Mouiller les mains.",
      "Former un triangle de riz.",
      "Ajouter la garniture au centre.",
      "Refermer et former l’onigiri.",
      "Ajouter nori si désiré.",
    ],
  },
  {
    id: "r79",
    name: "Yaki Udon simplifié",
    type: RecipeType.VEGE,
    durationMinutes: 25,
    difficulty: "Facile",
    ingredients: [
      { name: "Nouilles udon", quantity: "300 g", category: "" },
      { name: "Légumes variés", quantity: "200 g", category: "" },
      { name: "Tofu", quantity: "200 g", category: "" },
      { name: "Sauce soja", quantity: "2 càs", category: "" },
      { name: "Huile", quantity: "1 càs", category: "" },
    ],
    steps: [
      "Faire sauter tofu et légumes.",
      "Ajouter udon.",
      "Ajouter sauce soja.",
      "Mélanger et cuire 2 minutes.",
    ],
  },
  {
    id: "r80",
    name: "Curry japonais rapide",
    type: RecipeType.VIANDE,
    durationMinutes: 30,
    difficulty: "Facile",
    ingredients: [
      { name: "Riz cuit", quantity: "300 g", category: "" },
      { name: "Poulet", quantity: "300 g", category: "" },
      { name: "Carotte", quantity: "1", category: "" },
      { name: "Pomme de terre", quantity: "1", category: "" },
      { name: "Oignon", quantity: "1", category: "" },
      { name: "Pâte de curry", quantity: "1 càs", category: "" },
    ],
    steps: [
      "Couper légumes et poulet.",
      "Faire revenir oignon + poulet.",
      "Ajouter légumes + eau.",
      "Cuire 10 à 15 minutes.",
      "Ajouter pâte de curry.",
      "Servir sur riz.",
    ],
  },
  {
    id: "r81",
    name: "Dal Tadka rapide",
    type: RecipeType.VEGE,
    durationMinutes: 25,
    difficulty: "Facile",
    ingredients: [
      { name: "Lentilles jaunes (moong dal)", quantity: "200 g", category: "" },
      { name: "Eau", quantity: "600 ml", category: "" },
      { name: "Oignon", quantity: "1", category: "" },
      { name: "Tomate", quantity: "1", category: "" },
      { name: "Ail", quantity: "2 gousses", category: "" },
      { name: "Huile", quantity: "1 càs", category: "" },
      { name: "Curcuma", quantity: "1 càc", category: "" },
      { name: "Cumin", quantity: "1 càc", category: "" },
    ],
    steps: [
      "Rincer les lentilles.",
      "Cuire dans l’eau avec curcuma 15 minutes.",
      "Faire revenir oignon, ail, tomate et cumin.",
      "Mélanger avec le dal.",
      "Servir chaud.",
    ],
  },
  {
    id: "r82",
    name: "Aloo Jeera (pommes de terre au cumin)",
    type: RecipeType.VEGE,
    durationMinutes: 20,
    difficulty: "Facile",
    ingredients: [
      { name: "Pommes de terre", quantity: "4", category: "" },
      { name: "Huile", quantity: "2 càs", category: "" },
      { name: "Graines de cumin", quantity: "1 càc", category: "" },
      { name: "Curcuma", quantity: "1 càc", category: "" },
      { name: "Sel", quantity: "1 pincée", category: "" },
    ],
    steps: [
      "Cuire et couper les pommes de terre.",
      "Chauffer l’huile, ajouter cumin.",
      "Ajouter pommes de terre et curcuma.",
      "Saler et sauter 5 minutes.",
    ],
  },
  {
    id: "r83",
    name: "Chicken Masala express",
    type: RecipeType.VIANDE,
    durationMinutes: 30,
    difficulty: "Facile",
    ingredients: [
      { name: "Poulet en dés", quantity: "300 g", category: "" },
      { name: "Oignon", quantity: "1", category: "" },
      { name: "Tomate", quantity: "1", category: "" },
      { name: "Ail", quantity: "2 gousses", category: "" },
      { name: "Garam masala", quantity: "1 càc", category: "" },
      { name: "Curry", quantity: "1 càc", category: "" },
      { name: "Huile", quantity: "1 càs", category: "" },
    ],
    steps: [
      "Faire revenir oignon + ail.",
      "Ajouter poulet.",
      "Ajouter tomate et épices.",
      "Cuire 15 minutes à feu moyen.",
    ],
  },
  {
    id: "r84",
    name: "Chana Masala rapide",
    type: RecipeType.VEGE,
    durationMinutes: 25,
    difficulty: "Facile",
    ingredients: [
      { name: "Pois chiches", quantity: "1 boîte", category: "" },
      { name: "Oignon", quantity: "1", category: "" },
      { name: "Tomate", quantity: "1", category: "" },
      { name: "Garam masala", quantity: "1 càc", category: "" },
      { name: "Cumin", quantity: "1 càc", category: "" },
      { name: "Huile", quantity: "1 càs", category: "" },
    ],
    steps: [
      "Faire revenir oignon.",
      "Ajouter tomates et épices.",
      "Ajouter pois chiches.",
      "Cuire 10 minutes.",
    ],
  },
  {
    id: "r85",
    name: "Riz Jeera (riz au cumin)",
    type: RecipeType.VEGE,
    durationMinutes: 15,
    difficulty: "Facile",
    ingredients: [
      { name: "Riz basmati", quantity: "200 g", category: "" },
      { name: "Graines de cumin", quantity: "1 càc", category: "" },
      { name: "Huile", quantity: "1 càs", category: "" },
      { name: "Eau", quantity: "400 ml", category: "" },
      { name: "Sel", quantity: "1 pincée", category: "" },
    ],
    steps: [
      "Rincer le riz.",
      "Chauffer huile, ajouter cumin.",
      "Ajouter riz et eau.",
      "Cuire 12 minutes.",
    ],
  },
  {
    id: "r86",
    name: "Curry de légumes express",
    type: RecipeType.VEGE,
    durationMinutes: 25,
    difficulty: "Facile",
    ingredients: [
      { name: "Légumes variés", quantity: "300 g", category: "" },
      { name: "Oignon", quantity: "1", category: "" },
      { name: "Curry", quantity: "1 càc", category: "" },
      { name: "Lait de coco", quantity: "150 ml", category: "" },
      { name: "Huile", quantity: "1 càs", category: "" },
      { name: "Sel", quantity: "1 pincée", category: "" },
    ],
    steps: [
      "Faire revenir oignon.",
      "Ajouter légumes et curry.",
      "Ajouter lait de coco.",
      "Cuire 15 minutes.",
    ],
  },
  {
    id: "r87",
    name: "Chapati rapide",
    type: RecipeType.VEGE,
    durationMinutes: 20,
    difficulty: "Facile",
    ingredients: [
      { name: "Farine", quantity: "200 g", category: "" },
      { name: "Eau", quantity: "100 ml", category: "" },
      { name: "Sel", quantity: "1 pincée", category: "" },
    ],
    steps: [
      "Mélanger farine, eau et sel.",
      "Pétrir.",
      "Former des boules et étaler.",
      "Cuire à la poêle 1 min de chaque côté.",
    ],
  },
  {
    id: "r88",
    name: "Tandoori poulet poêle express",
    type: RecipeType.VIANDE,
    durationMinutes: 25,
    difficulty: "Facile",
    ingredients: [
      { name: "Poulet", quantity: "300 g", category: "" },
      { name: "Épices tandoori", quantity: "1 càc", category: "" },
      { name: "Yaourt", quantity: "2 càs", category: "" },
      { name: "Citron", quantity: "1 càs", category: "" },
    ],
    steps: [
      "Mélanger poulet, yaourt, épices.",
      "Laisser mariner 10 minutes.",
      "Cuire à la poêle 10 minutes.",
    ],
  },
  {
    id: "r89",
    name: "Curry œufs (Egg Curry) rapide",
    type: RecipeType.VIANDE,
    durationMinutes: 20,
    difficulty: "Facile",
    ingredients: [
      { name: "Œufs durs", quantity: "4", category: "" },
      { name: "Oignon", quantity: "1", category: "" },
      { name: "Tomate", quantity: "1", category: "" },
      { name: "Curry", quantity: "1 càc", category: "" },
      { name: "Huile", quantity: "1 càs", category: "" },
    ],
    steps: [
      "Faire revenir oignon.",
      "Ajouter tomate et curry.",
      "Ajouter œufs durs coupés.",
      "Cuire 5 minutes.",
    ],
  },
  {
    id: "r90",
    name: "Upma (semoule salée) express",
    type: RecipeType.VEGE,
    durationMinutes: 20,
    difficulty: "Facile",
    ingredients: [
      { name: "Semoule", quantity: "150 g", category: "" },
      { name: "Oignon", quantity: "1", category: "" },
      { name: "Moutarde en graines", quantity: "1 càc", category: "" },
      { name: "Cumin", quantity: "1 càc", category: "" },
      { name: "Huile", quantity: "1 càs", category: "" },
      { name: "Eau", quantity: "300 ml", category: "" },
    ],
    steps: [
      "Faire revenir oignon, cumin, moutarde.",
      "Ajouter semoule.",
      "Ajouter eau.",
      "Cuire 5 minutes.",
    ],
  },
  {
    id: "r91",
    name: "Salade méditerranéenne feta & zaatar",
    type: RecipeType.VEGE,
    durationMinutes: 20,
    difficulty: "Facile",
    ingredients: [
      { name: "Concombres", quantity: "2", category: "" },
      { name: "Tomates", quantity: "3", category: "" },
      { name: "Feta", quantity: "100 g", category: "" },
      { name: "Zaatar", quantity: "1 càs", category: "" },
      { name: "Huile d’olive", quantity: "2 càs", category: "" },
      { name: "Citron", quantity: "1 càs", category: "" },
      { name: "Sel", quantity: "1 pincée", category: "" },
    ],
    steps: [
      "Couper concombres et tomates.",
      "Émietter la feta.",
      "Mélanger tous les ingrédients.",
      "Assaisonner et servir.",
    ],
  },
  {
    id: "r92",
    name: "Pois chiches rôtis paprika & citron",
    type: RecipeType.VEGE,
    durationMinutes: 25,
    difficulty: "Facile",
    ingredients: [
      { name: "Pois chiches", quantity: "1 boîte", category: "" },
      { name: "Paprika", quantity: "1 càs", category: "" },
      { name: "Huile d’olive", quantity: "1 càs", category: "" },
      { name: "Citron", quantity: "1 càs", category: "" },
      { name: "Sel", quantity: "1 pincée", category: "" },
    ],
    steps: [
      "Égoutter pois chiches.",
      "Mélanger avec huile, paprika, citron.",
      "Cuire 20 min au four ou 10 min à la poêle.",
    ],
  },
  {
    id: "r93",
    name: "Poulet citron & sumac express",
    type: RecipeType.VIANDE,
    durationMinutes: 25,
    difficulty: "Facile",
    ingredients: [
      { name: "Poulet", quantity: "300 g", category: "" },
      { name: "Sumac", quantity: "1 càs", category: "" },
      { name: "Huile d’olive", quantity: "1 càs", category: "" },
      { name: "Citron", quantity: "1 càs", category: "" },
      { name: "Sel", quantity: "1 pincée", category: "" },
    ],
    steps: [
      "Mélanger poulet avec huile, citron, sumac.",
      "Cuire à la poêle 10–12 minutes.",
    ],
  },
  {
    id: "r94",
    name: "Aubergines grillées tahini",
    type: RecipeType.VEGE,
    durationMinutes: 25,
    difficulty: "Facile",
    ingredients: [
      { name: "Aubergine", quantity: "1", category: "" },
      { name: "Tahini", quantity: "2 càs", category: "" },
      { name: "Citron", quantity: "1 càs", category: "" },
      { name: "Huile d’olive", quantity: "1 càs", category: "" },
      { name: "Sel", quantity: "1 pincée", category: "" },
    ],
    steps: [
      "Couper l’aubergine.",
      "Griller.",
      "Mélanger tahini et citron.",
      "Servir avec la sauce.",
    ],
  },
  {
    id: "r95",
    name: "Salade de lentilles façon Ottolenghi",
    type: RecipeType.VEGE,
    durationMinutes: 25,
    difficulty: "Facile",
    ingredients: [
      { name: "Lentilles cuites", quantity: "200 g", category: "" },
      { name: "Oignon rouge", quantity: "1", category: "" },
      { name: "Herbes fraîches", quantity: "", category: "" },
      { name: "Huile d’olive", quantity: "2 càs", category: "" },
      { name: "Vinaigre", quantity: "1 càs", category: "" },
    ],
    steps: [
      "Mélanger lentilles, oignon et herbes.",
      "Assaisonner huile + vinaigre.",
    ],
  },
  {
    id: "r96",
    name: "Carottes rôties cumin & miel",
    type: RecipeType.VEGE,
    durationMinutes: 25,
    difficulty: "Facile",
    ingredients: [
      { name: "Carottes", quantity: "4", category: "" },
      { name: "Cumin", quantity: "1 càc", category: "" },
      { name: "Miel", quantity: "1 càs", category: "" },
      { name: "Huile d’olive", quantity: "1 càs", category: "" },
      { name: "Sel", quantity: "1 pincée", category: "" },
    ],
    steps: [
      "Mélanger carottes, cumin, miel.",
      "Cuire 20 minutes.",
    ],
  },
  {
    id: "r97",
    name: "Taboulé vert rapide",
    type: RecipeType.VEGE,
    durationMinutes: 20,
    difficulty: "Facile",
    ingredients: [
      { name: "Semoule", quantity: "150 g", category: "" },
      { name: "Persil", quantity: "", category: "" },
      { name: "Menthe", quantity: "", category: "" },
      { name: "Citrons", quantity: "2", category: "" },
      { name: "Huile d’olive", quantity: "2 càs", category: "" },
      { name: "Sel", quantity: "1 pincée", category: "" },
    ],
    steps: [
      "Cuire semoule.",
      "Hacher herbes.",
      "Mélanger avec citron et huile.",
    ],
  },
  {
    id: "r98",
    name: "Poêlée tomates & halloumi",
    type: RecipeType.VEGE,
    durationMinutes: 15,
    difficulty: "Facile",
    ingredients: [
      { name: "Halloumi", quantity: "200 g", category: "" },
      { name: "Tomates", quantity: "2", category: "" },
      { name: "Zaatar", quantity: "1 càs", category: "" },
      { name: "Huile d’olive", quantity: "1 càs", category: "" },
    ],
    steps: [
      "Griller halloumi.",
      "Ajouter tomates et zaatar.",
    ],
  },
  {
    id: "r99",
    name: "Riz pilaf méditerranéen",
    type: RecipeType.VEGE,
    durationMinutes: 20,
    difficulty: "Facile",
    ingredients: [
      { name: "Riz", quantity: "200 g", category: "" },
      { name: "Oignon", quantity: "1", category: "" },
      { name: "Bouillon cube", quantity: "1", category: "" },
      { name: "Huile d’olive", quantity: "1 càs", category: "" },
    ],
    steps: [
      "Faire revenir oignon.",
      "Ajouter riz.",
      "Ajouter eau + bouillon.",
      "Cuire 12 minutes.",
    ],
  },
  {
    id: "r100",
    name: "Poisson grillé citron & herbes",
    type: RecipeType.POISSON,
    durationMinutes: 20,
    difficulty: "Facile",
    ingredients: [
      { name: "Filets de poisson", quantity: "2", category: "" },
      { name: "Huile d’olive", quantity: "1 càs", category: "" },
      { name: "Citron", quantity: "1 càs", category: "" },
      { name: "Herbes fraîches", quantity: "", category: "" },
    ],
    steps: [
      "Assaisonner poisson.",
      "Cuire 3–4 minutes par face.",
    ],
  },
  {
    id: "r101",
    name: "Tacos de poulet rapides",
    type: RecipeType.VIANDE,
    durationMinutes: 20,
    difficulty: "Facile",
    ingredients: [
      { name: "Poulet", quantity: "300 g", category: "" },
      { name: "Tortillas", quantity: "4", category: "" },
      { name: "Oignon", quantity: "1", category: "" },
      { name: "Tomate", quantity: "1", category: "" },
      { name: "Paprika", quantity: "1 càc", category: "" },
      { name: "Cumin", quantity: "1 càc", category: "" },
      { name: "Huile", quantity: "1 càs", category: "" },
    ],
    steps: [
      "Couper poulet et légumes.",
      "Faire revenir poulet avec épices.",
      "Ajouter légumes.",
      "Chauffer tortillas.",
      "Assembler tacos.",
    ],
  },
  {
    id: "r102",
    name: "Quesadillas fromage & légumes",
    type: RecipeType.VEGE,
    durationMinutes: 15,
    difficulty: "Facile",
    ingredients: [
      { name: "Tortillas", quantity: "4", category: "" },
      { name: "Fromage râpé", quantity: "150 g", category: "" },
      { name: "Poivron", quantity: "1", category: "" },
      { name: "Oignon", quantity: "1", category: "" },
      { name: "Huile", quantity: "1 càs", category: "" },
    ],
    steps: [
      "Émincer légumes.",
      "Les faire revenir.",
      "Ajouter fromage sur tortilla.",
      "Plier et cuire 2 min par côté.",
    ],
  },
  {
    id: "r103",
    name: "Guacamole express",
    type: RecipeType.VEGE,
    durationMinutes: 10,
    difficulty: "Facile",
    ingredients: [
      { name: "Avocats", quantity: "2", category: "" },
      { name: "Tomate", quantity: "1", category: "" },
      { name: "Citron vert", quantity: "1", category: "" },
      { name: "Sel", quantity: "1 pincée", category: "" },
      { name: "Poivre", quantity: "1 pincée", category: "" },
    ],
    steps: [
      "Écraser avocats.",
      "Ajouter tomate en dés.",
      "Ajouter citron, sel, poivre.",
      "Bien mélanger.",
    ],
  },
  {
    id: "r104",
    name: "Fajitas de bœuf rapides",
    type: RecipeType.VIANDE,
    durationMinutes: 25,
    difficulty: "Facile",
    ingredients: [
      { name: "Bœuf en lamelles", quantity: "300 g", category: "" },
      { name: "Poivron", quantity: "1", category: "" },
      { name: "Oignon", quantity: "1", category: "" },
      { name: "Paprika", quantity: "1 càc", category: "" },
      { name: "Cumin", quantity: "1 càc", category: "" },
      { name: "Tortillas", quantity: "4", category: "" },
    ],
    steps: [
      "Faire revenir bœuf avec épices.",
      "Ajouter légumes.",
      "Cuire 10 min.",
      "Servir dans tortillas.",
    ],
  },
  {
    id: "r105",
    name: "Soupe mexicaine express",
    type: RecipeType.VEGE,
    durationMinutes: 25,
    difficulty: "Facile",
    ingredients: [
      { name: "Haricots rouges", quantity: "1 boîte", category: "" },
      { name: "Maïs", quantity: "1 boîte", category: "" },
      { name: "Tomate", quantity: "1", category: "" },
      { name: "Bouillon", quantity: "500 ml", category: "" },
      { name: "Paprika", quantity: "1 càc", category: "" },
    ],
    steps: [
      "Faire revenir tomate.",
      "Ajouter haricots, maïs, paprika.",
      "Ajouter bouillon.",
      "Cuire 10 min.",
    ],
  },
  {
    id: "r106",
    name: "Salade maïs, haricots & coriandre",
    type: RecipeType.VEGE,
    durationMinutes: 15,
    difficulty: "Facile",
    ingredients: [
      { name: "Maïs", quantity: "1 boîte", category: "" },
      { name: "Haricots rouges", quantity: "1 boîte", category: "" },
      { name: "Citron vert", quantity: "1", category: "" },
      { name: "Coriandre", quantity: "1 poignée", category: "" },
      { name: "Huile", quantity: "1 càs", category: "" },
    ],
    steps: [
      "Mélanger maïs et haricots.",
      "Ajouter coriandre.",
      "Assaisonner huile + citron.",
    ],
  },
  {
    id: "r107",
    name: "Burrito végétarien simple",
    type: RecipeType.VEGE,
    durationMinutes: 20,
    difficulty: "Facile",
    ingredients: [
      { name: "Tortillas", quantity: "4", category: "" },
      { name: "Haricots noirs", quantity: "1 boîte", category: "" },
      { name: "Riz cuit", quantity: "100 g", category: "" },
      { name: "Tomate", quantity: "1", category: "" },
      { name: "Épices mexicaines", quantity: "1 càs", category: "" },
    ],
    steps: [
      "Mélanger riz, haricots, tomate.",
      "Assaisonner.",
      "Rouler dans tortillas.",
    ],
  },
  {
    id: "r108",
    name: "Poulet chipotle rapide",
    type: RecipeType.VIANDE,
    durationMinutes: 25,
    difficulty: "Facile",
    ingredients: [
      { name: "Poulet", quantity: "300 g", category: "" },
      { name: "Sauce chipotle", quantity: "1 càs", category: "" },
      { name: "Oignon", quantity: "1", category: "" },
      { name: "Huile", quantity: "1 càs", category: "" },
    ],
    steps: [
      "Faire revenir oignon.",
      "Ajouter poulet.",
      "Ajouter chipotle.",
      "Cuire 10–12 min.",
    ],
  },
  {
    id: "r109",
    name: "Tostadas express",
    type: RecipeType.VEGE,
    durationMinutes: 15,
    difficulty: "Facile",
    ingredients: [
      { name: "Tortillas", quantity: "4", category: "" },
      { name: "Haricots noirs", quantity: "1 boîte", category: "" },
      { name: "Avocat", quantity: "1", category: "" },
      { name: "Tomate", quantity: "1", category: "" },
    ],
    steps: [
      "Griller tortillas.",
      "Étaler haricots écrasés.",
      "Ajouter avocat et tomate.",
    ],
  },
  {
    id: "r110",
    name: "Œufs mexicains (Huevos a la Mexicana)",
    type: RecipeType.VEGE,
    durationMinutes: 15,
    difficulty: "Facile",
    ingredients: [
      { name: "Œufs", quantity: "3", category: "" },
      { name: "Tomate", quantity: "1", category: "" },
      { name: "Oignon", quantity: "1", category: "" },
      { name: "Piment doux (optionnel)", quantity: "1", category: "" },
      { name: "Huile", quantity: "1 càs", category: "" },
    ],
    steps: [
      "Faire revenir oignon et tomate.",
      "Ajouter piment.",
      "Ajouter œufs et brouiller.",
    ],
  },
  {
    id: "r111",
    name: "Tortilla española rapide",
    type: RecipeType.VEGE,
    durationMinutes: 25,
    difficulty: "Facile",
    ingredients: [
      { name: "Pommes de terre", quantity: "4", category: "" },
      { name: "Oignon", quantity: "1", category: "" },
      { name: "Œufs", quantity: "4", category: "" },
      { name: "Huile d’olive", quantity: "2 càs", category: "" },
      { name: "Sel", quantity: "1 pincée", category: "" },
    ],
    steps: [
      "Couper pommes de terre et oignon.",
      "Cuire dans huile.",
      "Battre œufs.",
      "Mélanger et cuire en omelette épaisse.",
    ],
  },
  {
    id: "r112",
    name: "Pan con tomate",
    type: RecipeType.VEGE,
    durationMinutes: 10,
    difficulty: "Facile",
    ingredients: [
      { name: "Tranches de pain", quantity: "4", category: "" },
      { name: "Tomates", quantity: "2", category: "" },
      { name: "Ail", quantity: "1 gousse", category: "" },
      { name: "Huile d’olive", quantity: "2 càs", category: "" },
      { name: "Sel", quantity: "1 pincée", category: "" },
    ],
    steps: [
      "Griller pain.",
      "Frotter avec ail.",
      "Écraser tomate dessus.",
      "Ajouter huile et sel.",
    ],
  },
  {
    id: "r113",
    name: "Gambas al ajillo",
    type: RecipeType.POISSON,
    durationMinutes: 15,
    difficulty: "Facile",
    ingredients: [
      { name: "Crevettes", quantity: "300 g", category: "" },
      { name: "Gousses d’ail", quantity: "3", category: "" },
      { name: "Piment doux", quantity: "1", category: "" },
      { name: "Huile d’olive", quantity: "2 càs", category: "" },
      { name: "Sel", quantity: "1 pincée", category: "" },
    ],
    steps: [
      "Faire revenir ail et piment.",
      "Ajouter crevettes.",
      "Cuire 3 minutes.",
    ],
  },
  {
    id: "r114",
    name: "Salmorejo express",
    type: RecipeType.VEGE,
    durationMinutes: 15,
    difficulty: "Facile",
    ingredients: [
      { name: "Tomates", quantity: "4", category: "" },
      { name: "Gousse d’ail", quantity: "1", category: "" },
      { name: "Huile d’olive", quantity: "2 càs", category: "" },
      { name: "Pain", quantity: "1 tranche", category: "" },
      { name: "Sel", quantity: "1 pincée", category: "" },
    ],
    steps: [
      "Mixer tomates, pain, ail, huile et sel.",
      "Servir frais.",
    ],
  },
  {
    id: "r115",
    name: "Patatas bravas rapides",
    type: RecipeType.VEGE,
    durationMinutes: 25,
    difficulty: "Facile",
    ingredients: [
      { name: "Pommes de terre", quantity: "4", category: "" },
      { name: "Paprika", quantity: "1 càc", category: "" },
      { name: "Piment doux", quantity: "1 càc", category: "" },
      { name: "Huile d’olive", quantity: "1 càs", category: "" },
      { name: "Sel", quantity: "1 pincée", category: "" },
    ],
    steps: [
      "Couper pommes de terre.",
      "Cuire au four ou poêle.",
      "Assaisonner paprika et piment.",
    ],
  },
  {
    id: "r116",
    name: "Champiñones al ajillo",
    type: RecipeType.VEGE,
    durationMinutes: 15,
    difficulty: "Facile",
    ingredients: [
      { name: "Champignons", quantity: "200 g", category: "" },
      { name: "Gousses d’ail", quantity: "2", category: "" },
      { name: "Persil", quantity: "1 càs", category: "" },
      { name: "Huile d’olive", quantity: "1 càs", category: "" },
    ],
    steps: [
      "Faire revenir ail.",
      "Ajouter champignons.",
      "Cuire 5–7 minutes.",
      "Ajouter persil.",
    ],
  },
  {
    id: "r117",
    name: "Poulet à la paprika (Pollo al pimentón)",
    type: RecipeType.VIANDE,
    durationMinutes: 25,
    difficulty: "Facile",
    ingredients: [
      { name: "Poulet", quantity: "300 g", category: "" },
      { name: "Paprika", quantity: "1 càc", category: "" },
      { name: "Oignon", quantity: "1", category: "" },
      { name: "Huile", quantity: "1 càs", category: "" },
    ],
    steps: [
      "Faire revenir oignon.",
      "Ajouter poulet et paprika.",
      "Cuire 10–12 min.",
    ],
  },
  {
    id: "r118",
    name: "Empanadillas rapides",
    type: RecipeType.VIANDE,
    durationMinutes: 25,
    difficulty: "Facile",
    ingredients: [
      { name: "Feuilletée", quantity: "1 pâte", category: "" },
      { name: "Oignon", quantity: "1", category: "" },
      { name: "Tomate", quantity: "1", category: "" },
      { name: "Bœuf haché", quantity: "100 g", category: "" },
    ],
    steps: [
      "Faire revenir bœuf + oignon + tomate.",
      "Garnir pâte.",
      "Cuire 12 min.",
    ],
  },
  {
    id: "r119",
    name: "Salade andalouse",
    type: RecipeType.VEGE,
    durationMinutes: 15,
    difficulty: "Facile",
    ingredients: [
      { name: "Tomates", quantity: "2", category: "" },
      { name: "Poivron", quantity: "1", category: "" },
      { name: "Oignon", quantity: "1", category: "" },
      { name: "Huile d’olive", quantity: "2 càs", category: "" },
      { name: "Vinaigre", quantity: "1 càs", category: "" },
    ],
    steps: [
      "Couper légumes.",
      "Assaisonner huile + vinaigre.",
    ],
  },
  {
    id: "r120",
    name: "Merlu à la plancha citron & ail",
    type: RecipeType.POISSON,
    durationMinutes: 15,
    difficulty: "Facile",
    ingredients: [
      { name: "Filets de merlu", quantity: "2", category: "" },
      { name: "Ail", quantity: "2 gousses", category: "" },
      { name: "Huile d’olive", quantity: "1 càs", category: "" },
      { name: "Citron", quantity: "1 càs", category: "" },
    ],
    steps: [
      "Assaisonner poisson.",
      "Cuire 2–3 min par face.",
      "Ajouter ail + citron.",
    ],
  },
  {
    id: "r121",
    name: "Bibimbap rapide",
    type: RecipeType.VIANDE,
    durationMinutes: 25,
    difficulty: "Facile",
    ingredients: [
      { name: "Riz", quantity: "200 g", category: "" },
      { name: "Bœuf haché", quantity: "150 g", category: "" },
      { name: "Carotte", quantity: "1", category: "" },
      { name: "Courgette", quantity: "1", category: "" },
      { name: "Œuf", quantity: "1", category: "" },
      { name: "Sauce soja", quantity: "1 càs", category: "" },
      { name: "Gochujang (optionnel)", quantity: "1 càc", category: "" },
    ],
    steps: [
      "Cuire riz.",
      "Faire revenir légumes séparément.",
      "Cuire bœuf avec sauce soja.",
      "Cuire œuf au plat.",
      "Assembler et ajouter gochujang.",
    ],
  },
  {
    id: "r122",
    name: "Tteokbokki express",
    type: RecipeType.VEGE,
    durationMinutes: 20,
    difficulty: "Facile",
    ingredients: [
      { name: "Gâteaux de riz tteok", quantity: "200 g", category: "" },
      { name: "Gochujang", quantity: "1 càs", category: "" },
      { name: "Sucre", quantity: "1 càs", category: "" },
      { name: "Sauce soja", quantity: "1 càs", category: "" },
      { name: "Eau", quantity: "200 ml", category: "" },
    ],
    steps: [
      "Mélanger eau, gochujang, sucre, soja.",
      "Ajouter tteok.",
      "Cuire jusqu’à épaississement.",
    ],
  },
  {
    id: "r123",
    name: "Poulet bulgogi rapide",
    type: RecipeType.VIANDE,
    durationMinutes: 20,
    difficulty: "Facile",
    ingredients: [
      { name: "Poulet", quantity: "300 g", category: "" },
      { name: "Sauce soja", quantity: "1 càs", category: "" },
      { name: "Sucre", quantity: "1 càs", category: "" },
      { name: "Ail", quantity: "1 càc", category: "" },
      { name: "Huile de sésame", quantity: "1 càc", category: "" },
    ],
    steps: [
      "Mélanger poulet et marinade.",
      "Cuire à la poêle 10 min.",
    ],
  },
  {
    id: "r124",
    name: "Kimchi fried rice simplifié",
    type: RecipeType.VEGE,
    durationMinutes: 20,
    difficulty: "Facile",
    ingredients: [
      { name: "Riz cuit", quantity: "200 g", category: "" },
      { name: "Kimchi", quantity: "100 g", category: "" },
      { name: "Œuf", quantity: "1", category: "" },
      { name: "Sauce soja", quantity: "1 càs", category: "" },
    ],
    steps: [
      "Faire sauter kimchi.",
      "Ajouter riz.",
      "Ajouter soja.",
      "Cuire œuf au plat dessus.",
    ],
  },
  {
    id: "r125",
    name: "Japchae rapide",
    type: RecipeType.VEGE,
    durationMinutes: 25,
    difficulty: "Facile",
    ingredients: [
      { name: "Nouilles de patate douce", quantity: "200 g", category: "" },
      { name: "Carotte", quantity: "1", category: "" },
      { name: "Oignon", quantity: "1", category: "" },
      { name: "Épinards", quantity: "1 poignée", category: "" },
      { name: "Sauce soja", quantity: "2 càs", category: "" },
    ],
    steps: [
      "Cuire nouilles.",
      "Faire sauter légumes.",
      "Ajouter soja et nouilles.",
    ],
  },
  {
    id: "r126",
    name: "Soupe tofu coréenne (Sundubu-light)",
    type: RecipeType.VEGE,
    durationMinutes: 20,
    difficulty: "Facile",
    ingredients: [
      { name: "Tofu doux", quantity: "200 g", category: "" },
      { name: "Gochugaru", quantity: "1 càc", category: "" },
      { name: "Oignon", quantity: "1", category: "" },
      { name: "Bouillon", quantity: "400 ml", category: "" },
    ],
    steps: [
      "Faire revenir oignon.",
      "Ajouter bouillon et épices.",
      "Ajouter tofu.",
      "Cuire 10 minutes.",
    ],
  },
  {
    id: "r127",
    name: "Gimbap express",
    type: RecipeType.VIANDE,
    durationMinutes: 20,
    difficulty: "Facile",
    ingredients: [
      { name: "Feuilles nori", quantity: "2", category: "" },
      { name: "Riz", quantity: "200 g", category: "" },
      { name: "Carotte", quantity: "1", category: "" },
      { name: "Concombre", quantity: "1", category: "" },
      { name: "Jambon ou tofu", quantity: "50 g", category: "" },
    ],
    steps: [
      "Cuire riz.",
      "Couper légumes.",
      "Étaler riz sur nori.",
      "Ajouter garniture et rouler.",
    ],
  },
  {
    id: "r128",
    name: "Poulet frit coréen simplifié",
    type: RecipeType.VIANDE,
    durationMinutes: 25,
    difficulty: "Facile",
    ingredients: [
      { name: "Poulet", quantity: "300 g", category: "" },
      { name: "Fécule", quantity: "2 càs", category: "" },
      { name: "Sauce soja", quantity: "1 càs", category: "" },
      { name: "Miel", quantity: "1 càs", category: "" },
      { name: "Ketchup", quantity: "1 càs", category: "" },
    ],
    steps: [
      "Enrober poulet de fécule.",
      "Frire.",
      "Mélanger sauce soja, miel, ketchup.",
      "Enrober poulet.",
    ],
  },
  {
    id: "r129",
    name: "Tofu sauté sauce soja",
    type: RecipeType.VEGE,
    durationMinutes: 15,
    difficulty: "Facile",
    ingredients: [
      { name: "Tofu", quantity: "200 g", category: "" },
      { name: "Sauce soja", quantity: "1 càs", category: "" },
      { name: "Huile", quantity: "1 càs", category: "" },
      { name: "Ail", quantity: "1 càc", category: "" },
    ],
    steps: [
      "Couper tofu.",
      "Faire revenir.",
      "Ajouter soja et ail.",
    ],
  },
  {
    id: "r130",
    name: "Soupe noodles coréenne rapide",
    type: RecipeType.VEGE,
    durationMinutes: 15,
    difficulty: "Facile",
    ingredients: [
      { name: "Nouilles instantanées", quantity: "1 paquet", category: "" },
      { name: "Œuf", quantity: "1", category: "" },
      { name: "Légumes", quantity: "1 poignée", category: "" },
      { name: "Sauce soja", quantity: "1 càc", category: "" },
    ],
    steps: [
      "Cuire nouilles.",
      "Ajouter légumes.",
      "Ajouter œuf en fin de cuisson.",
    ],
  },
  {
    id: "r131",
    name: "Pad Thaï rapide au poulet",
    type: RecipeType.VIANDE,
    durationMinutes: 25,
    difficulty: "Facile",
    ingredients: [
      { name: "Nouilles de riz", quantity: "200 g", category: "" },
      { name: "Poulet", quantity: "200 g", category: "" },
      { name: "Œuf", quantity: "1", category: "" },
      { name: "Carotte", quantity: "1", category: "" },
      { name: "Sauce soja", quantity: "1 càs", category: "" },
      { name: "Jus de citron", quantity: "1 càs", category: "" },
      { name: "Sucre", quantity: "1 càc", category: "" },
    ],
    steps: [
      "Cuire nouilles.",
      "Faire revenir poulet.",
      "Ajouter carotte et œuf.",
      "Ajouter nouilles, soja, citron, sucre.",
      "Mélanger.",
    ],
  },
  {
    id: "r132",
    name: "Pad Thaï végétarien express",
    type: RecipeType.VEGE,
    durationMinutes: 20,
    difficulty: "Facile",
    ingredients: [
      { name: "Nouilles de riz", quantity: "200 g", category: "" },
      { name: "Tofu", quantity: "100 g", category: "" },
      { name: "Œuf (optionnel)", quantity: "1", category: "" },
      { name: "Germes de soja", quantity: "1 poignée", category: "" },
      { name: "Sauce soja", quantity: "1 càs", category: "" },
    ],
    steps: [
      "Cuire nouilles.",
      "Faire sauter tofu.",
      "Ajouter germes et œuf.",
      "Ajouter nouilles + sauce.",
    ],
  },
  {
    id: "r133",
    name: "Soupe thaï au lait de coco",
    type: RecipeType.VEGE,
    durationMinutes: 20,
    difficulty: "Facile",
    ingredients: [
      { name: "Lait de coco", quantity: "400 ml", category: "" },
      { name: "Bouillon", quantity: "200 ml", category: "" },
      { name: "Carotte", quantity: "1", category: "" },
      { name: "Champignons", quantity: "1", category: "" },
      { name: "Curry rouge", quantity: "1 càc", category: "" },
      { name: "Citron", quantity: "1 càs", category: "" },
    ],
    steps: [
      "Faire revenir légumes.",
      "Ajouter lait de coco, bouillon, curry.",
      "Cuire 10 min.",
      "Ajouter citron.",
    ],
  },
  {
    id: "r134",
    name: "Poulet basilic (Kaï Pad Krapao light)",
    type: RecipeType.VIANDE,
    durationMinutes: 20,
    difficulty: "Facile",
    ingredients: [
      { name: "Poulet haché", quantity: "300 g", category: "" },
      { name: "Oignon", quantity: "1", category: "" },
      { name: "Sauce soja", quantity: "1 càc", category: "" },
      { name: "Basilic", quantity: "1 càs", category: "" },
      { name: "Huile", quantity: "1 càs", category: "" },
    ],
    steps: [
      "Faire revenir oignon.",
      "Ajouter poulet.",
      "Ajouter soja et basilic.",
      "Cuire 10 minutes.",
    ],
  },
  {
    id: "r135",
    name: "Riz frit thaï",
    type: RecipeType.VIANDE,
    durationMinutes: 15,
    difficulty: "Facile",
    ingredients: [
      { name: "Riz cuit", quantity: "200 g", category: "" },
      { name: "Œuf", quantity: "1", category: "" },
      { name: "Carotte", quantity: "1", category: "" },
      { name: "Sauce soja", quantity: "1 càs", category: "" },
    ],
    steps: [
      "Faire revenir carotte.",
      "Ajouter riz.",
      "Ajouter œuf.",
      "Ajouter sauce soja.",
    ],
  },
  {
    id: "r136",
    name: "Nouilles sautées curry rouge",
    type: RecipeType.VEGE,
    durationMinutes: 20,
    difficulty: "Facile",
    ingredients: [
      { name: "Nouilles", quantity: "200 g", category: "" },
      { name: "Pâte curry rouge", quantity: "1 càc", category: "" },
      { name: "Poivron", quantity: "1", category: "" },
      { name: "Lait de coco", quantity: "1 càs", category: "" },
    ],
    steps: [
      "Cuire nouilles.",
      "Faire revenir poivron.",
      "Ajouter curry + coco.",
      "Ajouter nouilles.",
    ],
  },
  {
    id: "r137",
    name: "Poulet citronnelle express",
    type: RecipeType.VIANDE,
    durationMinutes: 25,
    difficulty: "Facile",
    ingredients: [
      { name: "Poulet", quantity: "300 g", category: "" },
      { name: "Citronnelle", quantity: "1 tige", category: "" },
      { name: "Oignon", quantity: "1", category: "" },
      { name: "Huile", quantity: "1 càs", category: "" },
    ],
    steps: [
      "Émincer citronnelle.",
      "Faire revenir oignon.",
      "Ajouter poulet + citronnelle.",
      "Cuire 12 min.",
    ],
  },
  {
    id: "r138",
    name: "Salade thaïe concombre & cacahuètes",
    type: RecipeType.VEGE,
    durationMinutes: 10,
    difficulty: "Facile",
    ingredients: [
      { name: "Concombres", quantity: "2", category: "" },
      { name: "Citron vert", quantity: "1", category: "" },
      { name: "Cacahuètes", quantity: "1 càs", category: "" },
      { name: "Sauce soja", quantity: "1 càc", category: "" },
    ],
    steps: [
      "Couper concombres.",
      "Ajouter citron + soja.",
      "Ajouter cacahuètes.",
    ],
  },
  {
    id: "r139",
    name: "Crevettes sautées coco-citron",
    type: RecipeType.POISSON,
    durationMinutes: 15,
    difficulty: "Facile",
    ingredients: [
      { name: "Crevettes", quantity: "200 g", category: "" },
      { name: "Lait de coco", quantity: "100 ml", category: "" },
      { name: "Citron", quantity: "1 càs", category: "" },
      { name: "Curry rouge", quantity: "1 càc", category: "" },
    ],
    steps: [
      "Faire revenir crevettes.",
      "Ajouter coco, citron, curry.",
      "Cuire 5 minutes.",
    ],
  },
  {
    id: "r140",
    name: "Soupe noodles thaï rapide",
    type: RecipeType.VEGE,
    durationMinutes: 15,
    difficulty: "Facile",
    ingredients: [
      { name: "Nouilles", quantity: "1 paquet", category: "" },
      { name: "Bouillon", quantity: "400 ml", category: "" },
      { name: "Curry rouge", quantity: "1 càc", category: "" },
      { name: "Légumes", quantity: "1 poignée", category: "" },
    ],
    steps: [
      "Faire bouillir bouillon.",
      "Ajouter légumes et curry.",
      "Ajouter nouilles.",
      "Cuire 3 minutes.",
    ],
  },
  {
    id: "r141",
    name: "Nouilles sautées chinoises",
    type: RecipeType.VEGE,
    durationMinutes: 20,
    difficulty: "Facile",
    ingredients: [
      { name: "Nouilles", quantity: "200 g", category: "" },
      { name: "Carotte", quantity: "1", category: "" },
      { name: "Oignon", quantity: "1", category: "" },
      { name: "Sauce soja", quantity: "2 càs", category: "" },
      { name: "Huile", quantity: "1 càs", category: "" },
    ],
    steps: [
      "Cuire nouilles.",
      "Faire revenir légumes.",
      "Ajouter sauce soja.",
      "Ajouter nouilles et mélanger.",
    ],
  },
  {
    id: "r142",
    name: "Poulet kung pao simplifié",
    type: RecipeType.VIANDE,
    durationMinutes: 20,
    difficulty: "Facile",
    ingredients: [
      { name: "Poulet", quantity: "300 g", category: "" },
      { name: "Poivron", quantity: "1", category: "" },
      { name: "Sauce soja", quantity: "2 càs", category: "" },
      { name: "Vinaigre", quantity: "1 càs", category: "" },
      { name: "Cacahuètes", quantity: "1 càs", category: "" },
    ],
    steps: [
      "Faire revenir poulet.",
      "Ajouter poivron.",
      "Ajouter soja + vinaigre.",
      "Ajouter cacahuètes.",
    ],
  },
  {
    id: "r143",
    name: "Riz sauté chinois",
    type: RecipeType.VEGE,
    durationMinutes: 15,
    difficulty: "Facile",
    ingredients: [
      { name: "Riz cuit", quantity: "200 g", category: "" },
      { name: "Œuf", quantity: "1", category: "" },
      { name: "Carotte", quantity: "1", category: "" },
      { name: "Sauce soja", quantity: "1 càs", category: "" },
    ],
    steps: [
      "Faire revenir carotte.",
      "Ajouter riz.",
      "Ajouter œuf.",
      "Assaisonner avec sauce soja.",
    ],
  },
  {
    id: "r144",
    name: "Bœuf sauté aux oignons",
    type: RecipeType.VIANDE,
    durationMinutes: 20,
    difficulty: "Facile",
    ingredients: [
      { name: "Bœuf", quantity: "300 g", category: "" },
      { name: "Oignons", quantity: "2", category: "" },
      { name: "Sauce soja", quantity: "2 càs", category: "" },
      { name: "Huile", quantity: "1 càs", category: "" },
    ],
    steps: [
      "Faire revenir oignons.",
      "Ajouter bœuf.",
      "Ajouter sauce soja.",
      "Cuire 5 minutes.",
    ],
  },
  {
    id: "r145",
    name: "Poulet aigre-doux express",
    type: RecipeType.VIANDE,
    durationMinutes: 20,
    difficulty: "Facile",
    ingredients: [
      { name: "Poulet", quantity: "300 g", category: "" },
      { name: "Poivron", quantity: "1", category: "" },
      { name: "Ketchup", quantity: "1 càs", category: "" },
      { name: "Sauce soja", quantity: "1 càs", category: "" },
      { name: "Vinaigre", quantity: "1 càs", category: "" },
    ],
    steps: [
      "Faire revenir poulet.",
      "Ajouter poivron.",
      "Ajouter ketchup, soja, vinaigre.",
      "Cuire 5 minutes.",
    ],
  },
  {
    id: "r146",
    name: "Chou sauté à l’ail",
    type: RecipeType.VEGE,
    durationMinutes: 10,
    difficulty: "Facile",
    ingredients: [
      { name: "Chou chinois", quantity: "1/2", category: "" },
      { name: "Ail", quantity: "2 gousses", category: "" },
      { name: "Huile", quantity: "1 càs", category: "" },
      { name: "Sauce soja", quantity: "1 càc", category: "" },
    ],
    steps: [
      "Faire revenir ail.",
      "Ajouter chou.",
      "Ajouter sauce soja.",
    ],
  },
  {
    id: "r147",
    name: "Soupe chinoise rapide",
    type: RecipeType.VEGE,
    durationMinutes: 15,
    difficulty: "Facile",
    ingredients: [
      { name: "Bouillon", quantity: "400 ml", category: "" },
      { name: "Nouilles", quantity: "1 poignée", category: "" },
      { name: "Carotte", quantity: "1", category: "" },
      { name: "Sauce soja", quantity: "1 càs", category: "" },
    ],
    steps: [
      "Faire bouillir bouillon.",
      "Ajouter légumes.",
      "Ajouter nouilles.",
      "Ajouter sauce soja.",
    ],
  },
  {
    id: "r148",
    name: "Porc caramélisé express",
    type: RecipeType.VIANDE,
    durationMinutes: 20,
    difficulty: "Facile",
    ingredients: [
      { name: "Porc", quantity: "300 g", category: "" },
      { name: "Sucre", quantity: "1 càs", category: "" },
      { name: "Sauce soja", quantity: "2 càs", category: "" },
      { name: "Huile", quantity: "1 càs", category: "" },
    ],
    steps: [
      "Faire revenir porc.",
      "Ajouter sucre.",
      "Ajouter sauce soja.",
      "Laisser caraméliser.",
    ],
  },
  {
    id: "r149",
    name: "Crevettes sautées gingembre",
    type: RecipeType.POISSON,
    durationMinutes: 15,
    difficulty: "Facile",
    ingredients: [
      { name: "Crevettes", quantity: "200 g", category: "" },
      { name: "Gingembre", quantity: "1 càc", category: "" },
      { name: "Sauce soja", quantity: "1 càs", category: "" },
      { name: "Huile", quantity: "1 càs", category: "" },
    ],
    steps: [
      "Faire revenir crevettes.",
      "Ajouter gingembre.",
      "Ajouter sauce soja.",
    ],
  },
  {
    id: "r150",
    name: "Tofu sauté sauce soja",
    type: RecipeType.VEGE,
    durationMinutes: 15,
    difficulty: "Facile",
    ingredients: [
      { name: "Tofu", quantity: "200 g", category: "" },
      { name: "Sauce soja", quantity: "1 càs", category: "" },
      { name: "Ail", quantity: "1 càc", category: "" },
      { name: "Huile", quantity: "1 càs", category: "" },
    ],
    steps: [
      "Faire revenir tofu.",
      "Ajouter ail et soja.",
      "Cuire 3 minutes.",
    ],
  },
];

 
    const recipeCategories = {
    "r1": "Fusion Japonaise",
    "r2": "France",
    "r3": "Fusion Japonaise",
    "r4": "Fusion Japonaise",
    "r5": "Fusion Japonaise",
    "r6": "France",
    "r7": "Fusion Japonaise",
    "r8": "France",
    "r9": "France",
    "r10": "Fusion Japonaise",
    "r11": "France",
    "r12": "France",
    "r13": "France",
    "r14": "France",
    "r15": "Fusion Japonaise",
    "r16": "Fusion Japonaise",
    "r17": "France",
    "r18": "France",
    "r19": "Fusion Japonaise",
    "r20": "France",
    "r21": "France",
    "r22": "France",
    "r23": "France",
    "r24": "France",
    "r25": "France",
    "r26": "Fusion Japonaise",
    "r27": "France",
    "r28": "Fusion Japonaise",
    "r29": "France",
    "r30": "France",
    "r31": "France",
    "r32": "Fusion Japonaise",
    "r33": "Fusion Japonaise",
    "r34": "France",
    "r35": "Fusion Japonaise",
    "r36": "France",
    "r37": "France",
    "r38": "Fusion Japonaise",
    "r39": "France",
    "r40": "Fusion Japonaise",
    "r41": "France",
    "r42": "Fusion Japonaise",
    "r43": "Fusion Japonaise",
    "r44": "Fusion Japonaise",
    "r45": "Fusion Japonaise",
    "r46": "France",
    "r47": "France",
    "r48": "Fusion Japonaise",
    "r49": "France",
    "r50": "Fusion Japonaise",
    "r51": "France",
    "r52": "France",
    "r53": "France",
    "r54": "France",
    "r55": "France",
    "r56": "France",
    "r57": "France",
    "r58": "France",
    "r59": "France",
    "r60": "France",
    "r61": "Italie",
    "r62": "Italie",
    "r63": "Italie",
    "r64": "Italie",
    "r65": "Italie",
    "r66": "Italie",
    "r67": "Italie",
    "r68": "Italie",
    "r69": "Italie",
    "r70": "Italie",
    "r71": "Japon",
    "r72": "Japon",
    "r73": "Japon",
    "r74": "Japon",
    "r75": "Japon",
    "r76": "Japon",
    "r77": "Japon",
    "r78": "Japon",
    "r79": "Japon",
    "r80": "Japon",
    "r81": "Inde",
    "r82": "Inde",
    "r83": "Inde",
    "r84": "Inde",
    "r85": "Inde",
    "r86": "Inde",
    "r87": "Inde",
    "r88": "Inde",
    "r89": "Inde",
    "r90": "Inde",
    "r91": "Méditerranée",
    "r92": "Méditerranée",
    "r93": "Méditerranée",
    "r94": "Méditerranée",
    "r95": "Méditerranée",
    "r96": "Méditerranée",
    "r97": "Méditerranée",
    "r98": "Méditerranée",
    "r99": "Méditerranée",
    "r100": "Méditerranée",
    "r101": "Mexique",
    "r102": "Mexique",
    "r103": "Mexique",
    "r104": "Mexique",
    "r105": "Mexique",
    "r106": "Mexique",
    "r107": "Mexique",
    "r108": "Mexique",
    "r109": "Mexique",
    "r110": "Mexique",
    "r111": "Espagne",
    "r112": "Espagne",
    "r113": "Espagne",
    "r114": "Espagne",
    "r115": "Espagne",
    "r116": "Espagne",
    "r117": "Espagne",
    "r118": "Espagne",
    "r119": "Espagne",
    "r120": "Espagne",
    "r121": "Corée",
    "r122": "Corée",
    "r123": "Corée",
    "r124": "Corée",
    "r125": "Corée",
    "r126": "Corée",
    "r127": "Corée",
    "r128": "Corée",
    "r129": "Corée",
    "r130": "Corée",
    "r131": "Thaïlande",
    "r132": "Thaïlande",
    "r133": "Thaïlande",
    "r134": "Thaïlande",
    "r135": "Thaïlande",
    "r136": "Thaïlande",
    "r137": "Thaïlande",
    "r138": "Thaïlande",
    "r139": "Thaïlande",
    "r140": "Thaïlande",
    "r141": "Chine",
    "r142": "Chine",
    "r143": "Chine",
    "r144": "Chine",
    "r145": "Chine",
    "r146": "Chine",
    "r147": "Chine",
    "r148": "Chine",
    "r149": "Chine",
    "r150": "Chine",
  };

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

  function withCategory(recipe) {
  const cat = recipeCategories[recipe.id];
  if (cat) {
    return { ...recipe, cuisineCategory: cat };
  }
  return recipe;
}

function getAllRecipes() {
  const base = baseRecipes.map(r => withCategory(applyOverrides(r)));
  const custom = customRecipes.map(r => withCategory(applyOverrides(r)));
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
    if (recipe.cuisineCategory) {
      const tagCuisine = document.createElement("span");
      tagCuisine.className = "tag";
      tagCuisine.textContent = recipe.cuisineCategory;
      tagRow.appendChild(tagCuisine);
    }

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

  ensureCategoriesInitialized();
  const selectCategory = document.createElement("select");
  allCategories.forEach(cat => {
    const opt = document.createElement("option");
    opt.value = cat;
    opt.textContent = cat;
    selectCategory.appendChild(opt);
  });
  selectCategory.value = currentCategoryFilter;
  selectCategory.onchange = () => {
    currentCategoryFilter = selectCategory.value;
  };
  anotherRow.appendChild(selectCategory);

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

if (anotherRow) {
  card.appendChild(anotherRow);
}

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
    ensureCategoriesInitialized();
    const all = getAllRecipes();
    const usable = all.filter(r => getRating(r.id) !== "aOublier");
    let source = usable.length > 0 ? usable : all;
    if (source.length === 0) {
      contentDiv.innerHTML = "<p>Aucune recette disponible.</p>";
      return;
    }
    if (currentCategoryFilter !== CATEGORY_ALL) {
      const filtered = source.filter(r => r.cuisineCategory === currentCategoryFilter);
      if (filtered.length > 0) {
        source = filtered;
      }
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
