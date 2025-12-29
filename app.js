
window.addEventListener("DOMContentLoaded", () => {
  const RecipeType = {
    VIANDE: "viande",
    POISSON: "poisson",
    VEGE: "vegetarien"
  };

  const DAYS = ["Lundi","Mardi","Mercredi","Jeudi","Vendredi","Samedi","Dimanche"];
const CATEGORY_ALL = "Tout"; // valeur legacy, non utilisée directement pour le filtrage
// Filtre par "famille" de recettes (Quotidien, Monde, Saisons)
let currentCategoryFilter = "Quotidien";
let currentSubCategoryFilter = ""; // pays (Monde) ou saison (Saisons)

// Historique "Ce soir" (pour revenir aux recettes précédentes)
let ceSoirHistory = []; // pile: { recipe, categoryFilter, subCategoryFilter }
let ceSoirCurrentRecipe = null;
// État des filtres au moment où la recette "Ce soir" a été choisie (pour historique retour)
let ceSoirCurrentRecipeState = { categoryFilter: currentCategoryFilter, subCategoryFilter: currentSubCategoryFilter };
let allCategories = ["Quotidien", "Monde", "Saisons"];

function computeAllCategories() {
  // Familles fixes, basées sur le fichier Excel (Quotidien / Monde / Saisons)
  return ["Quotidien", "Monde", "Saisons"];
}

function ensureCategoriesInitialized() {
  allCategories = computeAllCategories();
  if (!allCategories.includes(currentCategoryFilter)) {
    currentCategoryFilter = "Quotidien";
  }
}


const baseRecipes = [
    {
      id: "v1",
      photo: "images/v1.webp",
      name: "Poulet citron & thym (poêle express)",
      type: RecipeType.VIANDE,
      durationMinutes: 25,
      difficulty: "Facile",
      ingredients: [
        { name: "Blancs de poulet", quantity: "600 g", category: "" },
        { name: "Citron (jus + zeste)", quantity: "1", category: "" },
        { name: "Thym", quantity: "1 càc", category: "" },
        { name: "Huile d’olive", quantity: "1 càs", category: "" },
        { name: "Sel", quantity: "", category: "" },
        { name: "Poivre", quantity: "", category: "" },
      ],
      steps: [
        "Couper le poulet en morceaux moyens.",
        "Presser le citron et prélever le zeste.",
        "Chauffer l’huile dans une poêle à feu moyen.",
        "Ajouter le poulet et cuire 5 min sans trop remuer.",
        "Ajouter jus de citron, thym, sel et poivre.",
        "Cuire encore 7–8 min jusqu’à poulet doré.",
        "Hors du feu, ajouter le zeste.",
        "Servir avec du riz ou une salade verte.",
      ],
    },
    {
      id: "v2",
      name: "Bœuf sauté aux oignons",
      type: RecipeType.VIANDE,
      durationMinutes: 20,
      difficulty: "Facile",
      ingredients: [
        { name: "Bœuf émincé", quantity: "500 g", category: "" },
        { name: "Oignons", quantity: "2", category: "" },
        { name: "Huile", quantity: "1 càs", category: "" },
        { name: "Sauce soja", quantity: "1 càs", category: "" },
        { name: "Poivre", quantity: "", category: "" },
      ],
      steps: [
        "Émincer les oignons.",
        "Chauffer l’huile à feu vif.",
        "Ajouter le bœuf et saisir 2–3 min sans trop remuer.",
        "Ajouter les oignons.",
        "Cuire 5 min jusqu’à oignons fondants.",
        "Ajouter la sauce soja et poivrer.",
        "Servir avec du riz ou des nouilles.",
      ],
    },
    {
      id: "v3",
      name: "Porc moutarde",
      type: RecipeType.VIANDE,
      durationMinutes: 25,
      difficulty: "Facile",
      ingredients: [
        { name: "Escalopes de porc", quantity: "500 g", category: "" },
        { name: "Moutarde", quantity: "2 càs", category: "" },
        { name: "Crème", quantity: "1 càs", category: "" },
        { name: "Huile", quantity: "1 càs", category: "" },
        { name: "Sel", quantity: "", category: "" },
        { name: "Poivre", quantity: "", category: "" },
      ],
      steps: [
        "Saler et poivrer la viande.",
        "Chauffer l’huile à feu moyen.",
        "Cuire le porc 4–5 min par face.",
        "Retirer la viande.",
        "Ajouter moutarde et crème.",
        "Chauffer 2 min à feu doux.",
        "Remettre la viande.",
        "Servir avec pommes de terre vapeur ou haricots verts.",
      ],
    },
    {
      id: "v4",
      name: "Poulet curry doux rapide",
      type: RecipeType.VIANDE,
      durationMinutes: 25,
      difficulty: "Facile",
      ingredients: [
        { name: "Poulet", quantity: "600 g", category: "" },
        { name: "Oignon", quantity: "1", category: "" },
        { name: "Curry doux", quantity: "1 càs", category: "" },
        { name: "Lait de coco", quantity: "20 cl", category: "" },
        { name: "Huile", quantity: "1 càs", category: "" },
      ],
      steps: [
        "Couper le poulet en dés.",
        "Émincer l’oignon.",
        "Chauffer l’huile à feu moyen.",
        "Faire revenir l’oignon 3 min.",
        "Ajouter le poulet et le curry.",
        "Cuire 5 min.",
        "Ajouter le lait de coco.",
        "Mijoter 10 min.",
        "En fin de cuisson, ajouter quelques gouttes de citron si souhaité.",
        "Servir avec du riz.",
      ],
    },
    {
      id: "v5",
      name: "Steak haché sauce tomate maison",
      type: RecipeType.VIANDE,
      durationMinutes: 20,
      difficulty: "Facile",
      ingredients: [
        { name: "Bœuf haché", quantity: "500 g", category: "" },
        { name: "Tomates concassées", quantity: "1 boîte", category: "" },
        { name: "Oignon", quantity: "1", category: "" },
        { name: "Huile", quantity: "1 càs", category: "" },
        { name: "Sel", quantity: "", category: "" },
        { name: "Origan (optionnel)", quantity: "", category: "" },
      ],
      steps: [
        "Émincer l’oignon.",
        "Chauffer l’huile.",
        "Faire revenir l’oignon 3 min.",
        "Ajouter les tomates, sel et origan.",
        "Mijoter 10 min.",
        "Cuire la viande 3 min par face.",
        "Servir nappé de sauce avec des pâtes.",
      ],
    },
    {
      id: "v6",
      name: "Poulet rôti paprika (four)",
      type: RecipeType.VIANDE,
      durationMinutes: 30,
      difficulty: "Facile",
      ingredients: [
        { name: "Cuisses de poulet", quantity: "600 g", category: "" },
        { name: "Paprika", quantity: "1 càs", category: "" },
        { name: "Huile", quantity: "1 càs", category: "" },
        { name: "Sel", quantity: "", category: "" },
        { name: "Poivre", quantity: "", category: "" },
      ],
      steps: [
        "Préchauffer le four à 200°C.",
        "Mélanger huile, paprika, sel et poivre.",
        "Enrober le poulet.",
        "Déposer dans un plat (pas trop haut dans le four).",
        "Enfourner 35 min.",
        "Retourner à mi-cuisson.",
        "Servir avec légumes rôtis ou salade.",
      ],
    },
    {
      id: "v7",
      name: "Boulettes de bœuf express",
      type: RecipeType.VIANDE,
      durationMinutes: 25,
      difficulty: "Facile",
      ingredients: [
        { name: "Bœuf haché", quantity: "500 g", category: "" },
        { name: "Œuf", quantity: "1", category: "" },
        { name: "Chapelure", quantity: "2 càs", category: "" },
        { name: "Huile", quantity: "1 càs", category: "" },
        { name: "Sel", quantity: "", category: "" },
        { name: "Poivre", quantity: "", category: "" },
      ],
      steps: [
        "Mélanger bœuf, œuf, chapelure, sel et poivre.",
        "Former des boulettes.",
        "Chauffer l’huile à feu moyen.",
        "Cuire 10 min en retournant.",
        "Servir avec une purée ou des pâtes.",
      ],
    },
    {
      id: "v8",
      name: "Poulet soja–miel",
      type: RecipeType.VIANDE,
      durationMinutes: 20,
      difficulty: "Facile",
      ingredients: [
        { name: "Poulet", quantity: "600 g", category: "" },
        { name: "Sauce soja", quantity: "2 càs", category: "" },
        { name: "Miel", quantity: "1 càs", category: "" },
        { name: "Huile", quantity: "1 càs", category: "" },
      ],
      steps: [
        "Couper le poulet.",
        "Chauffer l’huile à feu moyen.",
        "Cuire le poulet 5 min.",
        "Ajouter soja et miel.",
        "Laisser caraméliser 5 min.",
        "Servir avec du riz.",
      ],
    },
    {
      id: "v9",
      name: "Saucisses poêlées aux herbes",
      type: RecipeType.VIANDE,
      durationMinutes: 20,
      difficulty: "Facile",
      ingredients: [
        { name: "Saucisses", quantity: "500–600 g", category: "" },
        { name: "Herbes de Provence", quantity: "1 càc", category: "" },
        { name: "Huile", quantity: "1 càs", category: "" },
      ],
      steps: [
        "Chauffer l’huile à feu moyen.",
        "Ajouter les saucisses.",
        "Les dorer légèrement.",
        "Baisser le feu et cuire 10 min.",
        "Ajouter les herbes.",
        "Servir avec légumes verts ou salade.",
      ],
    },
    {
      id: "v10",
      name: "Poulet pané maison",
      type: RecipeType.VIANDE,
      durationMinutes: 30,
      difficulty: "Facile",
      ingredients: [
        { name: "Blancs de poulet", quantity: "600 g", category: "" },
        { name: "Œuf", quantity: "1", category: "" },
        { name: "Chapelure", quantity: "80 g", category: "" },
        { name: "Huile", quantity: "1 càs", category: "" },
        { name: "Sel", quantity: "", category: "" },
      ],
      steps: [
        "Couper le poulet.",
        "Battre l’œuf.",
        "Tremper le poulet dans l’œuf puis la chapelure.",
        "Chauffer l’huile (chaude mais non fumante).",
        "Cuire 4–5 min par face.",
        "Servir avec salade verte ou légumes vapeur.",
      ],
    },
    {
      id: "p1",
      name: "Saumon poêlé citron & aneth",
      type: RecipeType.POISSON,
      durationMinutes: 20,
      difficulty: "Facile",
      ingredients: [
        { name: "Filet de saumon", quantity: "450 g", category: "" },
        { name: "Citron (jus + zeste)", quantity: "1", category: "" },
        { name: "Aneth", quantity: "1 càs", category: "" },
        { name: "Beurre", quantity: "20 g", category: "" },
        { name: "Huile d’olive", quantity: "1 càs", category: "" },
        { name: "Sel", quantity: "", category: "" },
        { name: "Poivre", quantity: "", category: "" },
      ],
      steps: [
        "Couper le saumon en pavés.",
        "Presser le citron et prélever le zeste.",
        "Chauffer l’huile à feu moyen.",
        "Déposer le saumon côté chair sans bouger 3 min.",
        "Retourner et cuire 2–3 min (centre légèrement nacré).",
        "Hors du feu, ajouter beurre, jus et zeste de citron, aneth.",
        "Saler, poivrer.",
        "Servir avec du riz et des légumes verts.",
      ],
    },
    {
      id: "p2",
      name: "Cabillaud au four moutarde & citron",
      type: RecipeType.POISSON,
      durationMinutes: 30,
      difficulty: "Facile",
      ingredients: [
        { name: "Dos de cabillaud", quantity: "500 g", category: "" },
        { name: "Moutarde", quantity: "1 càs", category: "" },
        { name: "Citron", quantity: "1", category: "" },
        { name: "Huile d’olive", quantity: "1 càs", category: "" },
        { name: "Sel", quantity: "", category: "" },
        { name: "Poivre", quantity: "", category: "" },
      ],
      steps: [
        "Préchauffer le four à 190°C.",
        "Déposer le poisson dans un plat.",
        "Mélanger moutarde, citron et huile.",
        "Napper le poisson.",
        "Saler, poivrer.",
        "Cuire 18–20 min jusqu’à chair opaque.",
        "Servir avec pommes de terre vapeur ou riz.",
      ],
    },
    {
      id: "p3",
      name: "Thon frais poêlé rapide",
      type: RecipeType.POISSON,
      durationMinutes: 15,
      difficulty: "Facile",
      ingredients: [
        { name: "Thon frais", quantity: "450 g", category: "" },
        { name: "Huile", quantity: "1 càs", category: "" },
        { name: "Sel", quantity: "", category: "" },
        { name: "Poivre", quantity: "", category: "" },
      ],
      steps: [
        "Couper le thon en pavés épais.",
        "Chauffer l’huile à feu vif.",
        "Saisir 1 min par face.",
        "Saler, poivrer hors du feu.",
        "Servir avec salade et pain.",
      ],
    },
    {
      id: "p4",
      name: "Colin poêlé ail & persil",
      type: RecipeType.POISSON,
      durationMinutes: 20,
      difficulty: "Facile",
      ingredients: [
        { name: "Filets de colin", quantity: "500 g", category: "" },
        { name: "Gousses d’ail", quantity: "2", category: "" },
        { name: "Persil", quantity: "1 càs", category: "" },
        { name: "Huile", quantity: "1 càs", category: "" },
        { name: "Sel", quantity: "", category: "" },
      ],
      steps: [
        "Chauffer l’huile à feu moyen.",
        "Cuire le poisson 3–4 min par face.",
        "Baisser le feu.",
        "Ajouter l’ail 30 secondes.",
        "Ajouter persil et sel.",
        "Servir avec riz ou légumes.",
      ],
    },
    {
      id: "p5",
      name: "Saumon au four miel & soja",
      type: RecipeType.POISSON,
      durationMinutes: 25,
      difficulty: "Facile",
      ingredients: [
        { name: "Saumon", quantity: "450 g", category: "" },
        { name: "Sauce soja", quantity: "1 càs", category: "" },
        { name: "Miel", quantity: "1 càc", category: "" },
        { name: "Huile", quantity: "1 càs", category: "" },
      ],
      steps: [
        "Préchauffer le four à 200°C.",
        "Mélanger soja, miel et huile.",
        "Déposer le saumon dans un plat.",
        "Napper de sauce.",
        "Cuire 15 min : la sauce doit napper sans brûler.",
        "Hors du four, ajouter quelques gouttes de citron.",
        "Servir avec du riz et des brocolis.",
      ],
    },
    {
      id: "p6",
      name: "Poisson blanc en papillote citron & herbes",
      type: RecipeType.POISSON,
      durationMinutes: 30,
      difficulty: "Facile",
      ingredients: [
        { name: "Poisson blanc", quantity: "500 g", category: "" },
        { name: "Citron", quantity: "1", category: "" },
        { name: "Herbes", quantity: "1 càs", category: "" },
        { name: "Huile", quantity: "1 càs", category: "" },
        { name: "Sel", quantity: "", category: "" },
      ],
      steps: [
        "Préchauffer le four à 180°C.",
        "Déposer le poisson sur papier cuisson.",
        "Ajouter citron, herbes, huile, sel.",
        "Fermer hermétiquement.",
        "Cuire 20 min.",
        "Servir avec riz ou légumes vapeur.",
      ],
    },
    {
      id: "p7",
      name: "Sardines poêlées express",
      type: RecipeType.POISSON,
      durationMinutes: 15,
      difficulty: "Facile",
      ingredients: [
        { name: "Sardines", quantity: "500 g", category: "" },
        { name: "Huile", quantity: "1 càs", category: "" },
        { name: "Sel", quantity: "", category: "" },
        { name: "Poivre", quantity: "", category: "" },
      ],
      steps: [
        "Chauffer l’huile à feu moyen.",
        "Déposer les sardines sans bouger 3 min.",
        "Retourner et cuire 2 min.",
        "Saler, poivrer hors du feu.",
        "Servir avec salade et pain.",
      ],
    },
    {
      id: "p8",
      name: "Lieu noir poêlé beurre & citron",
      type: RecipeType.POISSON,
      durationMinutes: 20,
      difficulty: "Facile",
      ingredients: [
        { name: "Lieu noir", quantity: "500 g", category: "" },
        { name: "Beurre", quantity: "20 g", category: "" },
        { name: "Citron", quantity: "1", category: "" },
        { name: "Sel", quantity: "", category: "" },
        { name: "Poivre", quantity: "", category: "" },
      ],
      steps: [
        "Chauffer une poêle à feu moyen.",
        "Ajouter le beurre.",
        "Cuire le poisson 3–4 min par face.",
        "Hors du feu, ajouter le citron.",
        "Saler, poivrer.",
        "Servir avec riz ou purée.",
      ],
    },
    {
      id: "p9",
      name: "Poisson pané maison",
      type: RecipeType.POISSON,
      durationMinutes: 30,
      difficulty: "Facile",
      ingredients: [
        { name: "Poisson blanc", quantity: "500 g", category: "" },
        { name: "Œuf", quantity: "1", category: "" },
        { name: "Chapelure", quantity: "80 g", category: "" },
        { name: "Huile", quantity: "1 càs", category: "" },
        { name: "Sel", quantity: "", category: "" },
      ],
      steps: [
        "Couper le poisson.",
        "Battre l’œuf.",
        "Paner le poisson.",
        "Chauffer l’huile non fumante.",
        "Cuire 3–4 min par face.",
        "Servir avec salade ou légumes vapeur.",
      ],
    },
    {
      id: "p10",
      name: "Dos de colin sauce yaourt citron",
      type: RecipeType.POISSON,
      durationMinutes: 20,
      difficulty: "Facile",
      ingredients: [
        { name: "Dos de colin", quantity: "500 g", category: "" },
        { name: "Yaourt nature", quantity: "1", category: "" },
        { name: "Citron (jus + zeste)", quantity: "1", category: "" },
        { name: "Huile", quantity: "1 càs", category: "" },
        { name: "Persil ou aneth", quantity: "1 càs", category: "" },
        { name: "Sel", quantity: "", category: "" },
        { name: "Poivre", quantity: "", category: "" },
      ],
      steps: [
        "Cuire le poisson à la poêle 3–4 min par face à feu moyen.",
        "Mélanger yaourt, jus et zeste de citron, sel et poivre.",
        "Chauffer doucement la sauce sans jamais bouillir.",
        "Napper le poisson hors du feu.",
        "Ajouter herbes.",
        "Servir avec du riz et des légumes verts.",
      ],
    },
    {
      id: "vg1",
      name: "Omelette pommes de terre (chair ferme) & oignons",
      type: RecipeType.VEGE,
      durationMinutes: 25,
      difficulty: "Facile",
      ingredients: [
        { name: "Œufs", quantity: "6", category: "" },
        { name: "Pommes de terre chair ferme", quantity: "400 g", category: "" },
        { name: "Oignon", quantity: "1", category: "" },
        { name: "Huile", quantity: "2 càs", category: "" },
        { name: "Thym", quantity: "1 càc", category: "" },
        { name: "Sel", quantity: "", category: "" },
        { name: "Poivre", quantity: "", category: "" },
      ],
      steps: [
        "Éplucher les pommes de terre et les couper en petits dés réguliers.",
        "Émincer l’oignon.",
        "Chauffer l’huile à feu moyen.",
        "Ajouter les pommes de terre, saler légèrement et cuire 10–12 min jusqu’à tendres et dorées.",
        "Ajouter l’oignon et cuire 3 min.",
        "Battre les œufs avec sel, poivre et thym.",
        "Verser les œufs, baisser à feu doux.",
        "Cuire 5 min sans remuer.",
        "Servir avec une salade verte.",
      ],
    },
    {
      id: "vg2",
      name: "Pâtes crème, champignons & parmesan",
      type: RecipeType.VEGE,
      durationMinutes: 20,
      difficulty: "Facile",
      ingredients: [
        { name: "Pâtes", quantity: "300 g", category: "" },
        { name: "Champignons de Paris", quantity: "250 g", category: "" },
        { name: "Crème", quantity: "20 cl", category: "" },
        { name: "Parmesan râpé", quantity: "40 g", category: "" },
        { name: "Huile", quantity: "1 càs", category: "" },
        { name: "Sel", quantity: "", category: "" },
        { name: "Poivre", quantity: "", category: "" },
        { name: "Muscade (optionnel)", quantity: "", category: "" },
      ],
      steps: [
        "Cuire les pâtes dans une grande eau salée.",
        "Émincer les champignons.",
        "Chauffer l’huile à feu moyen.",
        "Cuire les champignons 5–7 min jusqu’à évaporation de l’eau.",
        "Ajouter la crème, sel, poivre et muscade.",
        "Chauffer 3 min.",
        "Ajouter les pâtes égouttées.",
        "Incorporer le parmesan.",
        "Servir immédiatement.",
      ],
    },
    {
      id: "vg3",
      name: "Riz sauté aux œufs & légumes",
      type: RecipeType.VEGE,
      durationMinutes: 20,
      difficulty: "Facile",
      ingredients: [
        { name: "Riz cuit froid", quantity: "300 g", category: "" },
        { name: "Œufs", quantity: "4", category: "" },
        { name: "Légumes surgelés", quantity: "200 g", category: "" },
        { name: "Huile", quantity: "1 càs", category: "" },
        { name: "Sauce soja", quantity: "1 càs", category: "" },
        { name: "Poivre", quantity: "", category: "" },
      ],
      steps: [
        "Chauffer l’huile à feu moyen.",
        "Cuire les légumes 5 min.",
        "Ajouter le riz et le chauffer jusqu’à légèrement doré.",
        "Pousser le riz sur le côté.",
        "Brouiller les œufs 1–2 min.",
        "Mélanger avec le riz.",
        "Ajouter la sauce soja.",
        "Poivrer.",
        "Servir tel quel.",
      ],
    },
    {
      id: "vg4",
      name: "Gratin de courgettes express",
      type: RecipeType.VEGE,
      durationMinutes: 30,
      difficulty: "Facile",
      ingredients: [
        { name: "Courgettes", quantity: "600 g", category: "" },
        { name: "Crème", quantity: "20 cl", category: "" },
        { name: "Fromage râpé", quantity: "80 g", category: "" },
        { name: "Herbes de Provence", quantity: "1 càc", category: "" },
        { name: "Sel", quantity: "", category: "" },
        { name: "Poivre", quantity: "", category: "" },
      ],
      steps: [
        "Préchauffer le four à 200°C.",
        "Couper les courgettes en fines rondelles.",
        "Saler légèrement et laisser dégorger 5 min.",
        "Déposer dans un plat.",
        "Ajouter la crème, poivre et herbes.",
        "Mélanger.",
        "Parsemer de fromage.",
        "Cuire 30 min jusqu’à gratin doré.",
        "Servir avec du riz ou du pain.",
      ],
    },
    {
      id: "vg5",
      name: "Chili végétarien express",
      type: RecipeType.VEGE,
      durationMinutes: 25,
      difficulty: "Facile",
      ingredients: [
        { name: "Haricots rouges égouttés", quantity: "400 g", category: "" },
        { name: "Tomates concassées", quantity: "1 boîte", category: "" },
        { name: "Oignon", quantity: "1", category: "" },
        { name: "Cumin", quantity: "1 càc", category: "" },
        { name: "Paprika", quantity: "1 càc", category: "" },
        { name: "Huile", quantity: "1 càs", category: "" },
        { name: "Sel", quantity: "", category: "" },
        { name: "Jus de citron", quantity: "", category: "" },
      ],
      steps: [
        "Émincer l’oignon.",
        "Chauffer l’huile à feu moyen.",
        "Faire revenir l’oignon 3 min.",
        "Ajouter tomates, cumin, paprika et sel.",
        "Ajouter les haricots rouges.",
        "Mijoter 15 min à feu doux.",
        "Ajouter un trait de citron hors du feu.",
        "Servir avec du riz.",
      ],
    },
    {
      id: "vg6",
      name: "Œufs brouillés crémeux & épinards",
      type: RecipeType.VEGE,
      durationMinutes: 15,
      difficulty: "Facile",
      ingredients: [
        { name: "Œufs", quantity: "6", category: "" },
        { name: "Épinards", quantity: "150 g", category: "" },
        { name: "Crème", quantity: "1 càs", category: "" },
        { name: "Fromage râpé", quantity: "30 g", category: "" },
        { name: "Sel", quantity: "", category: "" },
        { name: "Poivre", quantity: "", category: "" },
      ],
      steps: [
        "Battre les œufs avec sel et poivre.",
        "Chauffer une poêle à feu doux.",
        "Cuire les œufs en remuant.",
        "Ajouter la crème après 2 min.",
        "Ajouter les épinards.",
        "Ajouter le fromage hors du feu.",
        "Mélanger jusqu’à texture crémeuse.",
        "Servir avec du pain.",
      ],
    },
    {
      id: "vg7",
      name: "Poêlée pois chiches & légumes épicés",
      type: RecipeType.VEGE,
      durationMinutes: 20,
      difficulty: "Facile",
      ingredients: [
        { name: "Pois chiches égouttés", quantity: "400 g", category: "" },
        { name: "Poivron", quantity: "1", category: "" },
        { name: "Courgette", quantity: "1", category: "" },
        { name: "Ail", quantity: "1 gousse", category: "" },
        { name: "Cumin", quantity: "1 càc", category: "" },
        { name: "Huile", quantity: "1 càs", category: "" },
        { name: "Sel", quantity: "", category: "" },
        { name: "Jus de citron", quantity: "", category: "" },
      ],
      steps: [
        "Couper les légumes en dés.",
        "Chauffer l’huile à feu moyen.",
        "Cuire les légumes 7 min.",
        "Ajouter ail et cumin.",
        "Cuire 1 min.",
        "Ajouter pois chiches.",
        "Cuire 5 min.",
        "Ajouter un filet de citron hors du feu.",
        "Servir avec du riz ou de la semoule.",
      ],
    },
    {
      id: "vg8",
      name: "Croque fromage & tomate",
      type: RecipeType.VEGE,
      durationMinutes: 15,
      difficulty: "Facile",
      ingredients: [
        { name: "Pain de mie", quantity: "6 tranches", category: "" },
        { name: "Fromage", quantity: "150 g", category: "" },
        { name: "Tomate", quantity: "1", category: "" },
        { name: "Beurre", quantity: "", category: "" },
      ],
      steps: [
        "Couper la tomate en fines rondelles.",
        "Garnir le pain.",
        "Beurrer l’extérieur.",
        "Cuire 3–4 min par face à feu moyen.",
        "Servir avec une salade.",
      ],
    },
    {
      id: "vg9",
      name: "Lentilles mijotées tomate & oignon",
      type: RecipeType.VEGE,
      durationMinutes: 30,
      difficulty: "Facile",
      ingredients: [
        { name: "Lentilles vertes cuites", quantity: "250 g", category: "" },
        { name: "Tomates concassées", quantity: "1 boîte", category: "" },
        { name: "Oignon", quantity: "1", category: "" },
        { name: "Laurier", quantity: "1 feuille", category: "" },
        { name: "Huile", quantity: "1 càs", category: "" },
        { name: "Sel", quantity: "", category: "" },
      ],
      steps: [
        "Émincer l’oignon.",
        "Chauffer l’huile à feu moyen.",
        "Cuire l’oignon 3 min.",
        "Ajouter tomates, lentilles et laurier.",
        "Saler.",
        "Mijoter 20 min à feu doux.",
        "Retirer le laurier.",
        "Servir avec du riz.",
      ],
    },
    {
      id: "vg10",
      name: "Quesadillas fromage & poivron",
      type: RecipeType.VEGE,
      durationMinutes: 20,
      difficulty: "Facile",
      ingredients: [
        { name: "Tortillas", quantity: "4", category: "" },
        { name: "Fromage râpé", quantity: "150 g", category: "" },
        { name: "Poivron", quantity: "1", category: "" },
        { name: "Huile", quantity: "1 càs", category: "" },
        { name: "Herbes (optionnel)", quantity: "", category: "" },
      ],
      steps: [
        "Couper le poivron en petits dés.",
        "Chauffer l’huile à feu moyen.",
        "Cuire le poivron 5 min.",
        "Garnir les tortillas.",
        "Ajouter herbes si souhaité.",
        "Plier.",
        "Cuire 2–3 min par face.",
        "Servir avec une salade.",
      ],
    },
    {
      id: "fm1",
      name: "Crevettes sautées ail & citron",
      type: RecipeType.VEGE,
      durationMinutes: 15,
      difficulty: "Facile",
      ingredients: [
        { name: "Crevettes crues décortiquées", quantity: "400 g", category: "" },
        { name: "Gousses d’ail", quantity: "2", category: "" },
        { name: "Citron (jus + zeste)", quantity: "1", category: "" },
        { name: "Huile", quantity: "1 càs", category: "" },
        { name: "Sel", quantity: "", category: "" },
        { name: "Poivre", quantity: "", category: "" },
      ],
      steps: [
        "Sécher les crevettes avec du papier absorbant.",
        "Hacher finement l’ail.",
        "Chauffer l’huile à feu moyen-vif.",
        "Ajouter les crevettes en une seule couche.",
        "Cuire 2 min sans remuer jusqu’à coloration.",
        "Retourner et cuire 1–2 min.",
        "Ajouter l’ail 30 s.",
        "Hors du feu, ajouter jus et zeste de citron.",
        "Saler, poivrer.",
        "Servir avec du riz et des légumes verts.",
      ],
    },
    {
      id: "fm2",
      name: "Spaghetti aux palourdes express",
      type: RecipeType.VEGE,
      durationMinutes: 25,
      difficulty: "Facile",
      ingredients: [
        { name: "Spaghetti", quantity: "300 g", category: "" },
        { name: "Palourdes fraîches", quantity: "1 kg", category: "" },
        { name: "Gousses d’ail", quantity: "2", category: "" },
        { name: "Huile", quantity: "2 càs", category: "" },
        { name: "Poivre", quantity: "", category: "" },
      ],
      steps: [
        "Rincer soigneusement les palourdes à l’eau froide.",
        "Cuire les pâtes dans une grande eau salée.",
        "Émincer l’ail.",
        "Chauffer l’huile à feu moyen.",
        "Ajouter l’ail 30 s.",
        "Ajouter les palourdes, couvrir.",
        "Cuire 4–5 min jusqu’à ouverture.",
        "Jeter toute palourde non ouverte.",
        "Égoutter les pâtes et les ajouter.",
        "Poivrer et servir immédiatement.",
      ],
    },
    {
      id: "fm3",
      name: "Moules marinières simplifiées",
      type: RecipeType.VEGE,
      durationMinutes: 20,
      difficulty: "Facile",
      ingredients: [
        { name: "Moules fraîches", quantity: "1,5 kg", category: "" },
        { name: "Échalote", quantity: "1", category: "" },
        { name: "Vin blanc", quantity: "20 cl", category: "" },
        { name: "Huile", quantity: "1 càs", category: "" },
        { name: "Poivre", quantity: "", category: "" },
        { name: "Persil", quantity: "", category: "" },
      ],
      steps: [
        "Nettoyer soigneusement les moules.",
        "Émincer l’échalote.",
        "Chauffer l’huile à feu moyen.",
        "Cuire l’échalote 2 min.",
        "Ajouter moules et vin blanc.",
        "Couvrir et cuire 5–6 min.",
        "Jeter toute moule non ouverte.",
        "Ajouter persil hors du feu.",
        "Poivrer.",
        "Servir avec frites ou pain.",
      ],
    },
    {
      id: "fm4",
      name: "Crevettes coco & curry doux",
      type: RecipeType.VEGE,
      durationMinutes: 25,
      difficulty: "Facile",
      ingredients: [
        { name: "Crevettes crues", quantity: "400 g", category: "" },
        { name: "Lait de coco", quantity: "20 cl", category: "" },
        { name: "Curry doux", quantity: "1 càc", category: "" },
        { name: "Huile", quantity: "1 càs", category: "" },
        { name: "Sel", quantity: "", category: "" },
        { name: "Citron vert", quantity: "", category: "" },
      ],
      steps: [
        "Sécher les crevettes.",
        "Chauffer l’huile à feu moyen.",
        "Cuire les crevettes 2 min par face.",
        "Retirer les crevettes.",
        "Ajouter le curry 30 s.",
        "Ajouter le lait de coco, saler.",
        "Remettre les crevettes et cuire 5 min à feu doux.",
        "Ajouter un filet de citron vert hors du feu.",
        "Servir avec du riz.",
      ],
    },
    {
      id: "fm5",
      name: "Encornets poêlés ail & persil",
      type: RecipeType.VEGE,
      durationMinutes: 20,
      difficulty: "Facile",
      ingredients: [
        { name: "Encornets nettoyés", quantity: "500 g", category: "" },
        { name: "Gousses d’ail", quantity: "2", category: "" },
        { name: "Persil", quantity: "1 càs", category: "" },
        { name: "Huile", quantity: "1 càs", category: "" },
        { name: "Sel", quantity: "", category: "" },
        { name: "Citron", quantity: "", category: "" },
      ],
      steps: [
        "Sécher soigneusement les encornets.",
        "Couper en anneaux réguliers.",
        "Chauffer l’huile à feu vif.",
        "Cuire les encornets 2–3 min maximum.",
        "Ajouter l’ail 30 s.",
        "Hors du feu, ajouter persil et citron.",
        "Saler.",
        "Servir avec riz ou salade.",
      ],
    },
    {
      id: "fm6",
      name: "Riz sauté aux crevettes",
      type: RecipeType.VEGE,
      durationMinutes: 20,
      difficulty: "Facile",
      ingredients: [
        { name: "Riz cuit froid", quantity: "300 g", category: "" },
        { name: "Crevettes crues", quantity: "300 g", category: "" },
        { name: "Œufs", quantity: "2", category: "" },
        { name: "Huile", quantity: "1 càs", category: "" },
        { name: "Sauce soja", quantity: "1 càs", category: "" },
        { name: "Poivre", quantity: "", category: "" },
        { name: "Huile de sésame", quantity: "", category: "" },
      ],
      steps: [
        "Chauffer l’huile à feu moyen-vif.",
        "Cuire les crevettes 2 min.",
        "Ajouter le riz et séparer les grains.",
        "Pousser sur le côté.",
        "Brouiller les œufs 1–2 min.",
        "Mélanger le tout.",
        "Ajouter sauce soja et quelques gouttes d’huile de sésame.",
        "Poivrer.",
        "Servir tel quel.",
      ],
    },
    {
      id: "fm7",
      name: "Saint-Jacques poêlées beurre citron",
      type: RecipeType.VEGE,
      durationMinutes: 15,
      difficulty: "Facile",
      ingredients: [
        { name: "Noix de Saint-Jacques", quantity: "12", category: "" },
        { name: "Beurre", quantity: "20 g", category: "" },
        { name: "Citron", quantity: "1", category: "" },
        { name: "Sel", quantity: "", category: "" },
        { name: "Poivre", quantity: "", category: "" },
      ],
      steps: [
        "Sécher soigneusement les noix.",
        "Chauffer une poêle à feu vif.",
        "Ajouter le beurre.",
        "Déposer les noix sans les toucher.",
        "Cuire 1 min 30 par face.",
        "Hors du feu, ajouter le jus de citron.",
        "Saler, poivrer.",
        "Servir avec purée ou riz.",
      ],
    },
    {
      id: "fm8",
      name: "Pâtes crevettes & tomates",
      type: RecipeType.VEGE,
      durationMinutes: 25,
      difficulty: "Facile",
      ingredients: [
        { name: "Pâtes", quantity: "300 g", category: "" },
        { name: "Crevettes crues", quantity: "400 g", category: "" },
        { name: "Tomates concassées", quantity: "1 boîte", category: "" },
        { name: "Ail", quantity: "1 gousse", category: "" },
        { name: "Huile", quantity: "1 càs", category: "" },
        { name: "Sel", quantity: "", category: "" },
        { name: "Herbes", quantity: "", category: "" },
      ],
      steps: [
        "Cuire les pâtes dans une eau salée.",
        "Chauffer l’huile à feu moyen.",
        "Ajouter l’ail 30 s.",
        "Ajouter les crevettes, cuire 2 min.",
        "Ajouter les tomates, sel et herbes.",
        "Mijoter 10 min.",
        "Ajouter les pâtes égouttées.",
        "Mélanger et servir.",
      ],
    },
    {
      id: "fm9",
      name: "Moules à la crème rapide",
      type: RecipeType.VEGE,
      durationMinutes: 20,
      difficulty: "Facile",
      ingredients: [
        { name: "Moules fraîches", quantity: "1,5 kg", category: "" },
        { name: "Crème", quantity: "20 cl", category: "" },
        { name: "Échalote", quantity: "1", category: "" },
        { name: "Huile", quantity: "1 càs", category: "" },
        { name: "Poivre", quantity: "", category: "" },
        { name: "Persil", quantity: "", category: "" },
      ],
      steps: [
        "Nettoyer les moules.",
        "Émincer l’échalote.",
        "Chauffer l’huile à feu moyen.",
        "Cuire l’échalote 2 min.",
        "Ajouter les moules, couvrir.",
        "Cuire 5 min jusqu’à ouverture.",
        "Jeter toute moule non ouverte.",
        "Ajouter la crème sans faire bouillir.",
        "Poivrer et ajouter persil.",
        "Servir avec pain ou frites.",
      ],
    },
    {
      id: "fm10",
      name: "Calamars mijotés à la tomate",
      type: RecipeType.VEGE,
      durationMinutes: 30,
      difficulty: "Facile",
      ingredients: [
        { name: "Calamars nettoyés", quantity: "500 g", category: "" },
        { name: "Tomates concassées", quantity: "1 boîte", category: "" },
        { name: "Oignon", quantity: "1", category: "" },
        { name: "Huile", quantity: "1 càs", category: "" },
        { name: "Sel", quantity: "", category: "" },
      ],
      steps: [
        "Couper les calamars en anneaux.",
        "Émincer l’oignon.",
        "Chauffer l’huile à feu moyen.",
        "Cuire l’oignon 3 min.",
        "Ajouter les tomates et sel.",
        "Ajouter les calamars.",
        "Mijoter 20 min à feu doux (cuisson longue = tendreté).",
        "Servir avec du riz.",
      ],
    },
    {
      id: "pa1",
      name: "Spaghetti tomate & basilic",
      type: RecipeType.VEGE,
      durationMinutes: 20,
      difficulty: "Facile",
      ingredients: [
        { name: "Spaghetti", quantity: "300 g", category: "" },
        { name: "Tomates concassées", quantity: "1 boîte", category: "" },
        { name: "Ail", quantity: "1 gousse", category: "" },
        { name: "Huile d’olive", quantity: "1 càs", category: "" },
        { name: "Sel", quantity: "", category: "" },
        { name: "Basilic", quantity: "", category: "" },
        { name: "Sucre ou vinaigre balsamique", quantity: "", category: "" },
      ],
      steps: [
        "Cuire les spaghetti dans une grande eau salée.",
        "Hacher l’ail.",
        "Chauffer l’huile à feu moyen.",
        "Ajouter l’ail 30 s sans coloration.",
        "Ajouter les tomates et le sel.",
        "Ajouter une pincée de sucre ou un trait de vinaigre.",
        "Mijoter 10 min à feu doux.",
        "Égoutter les pâtes et les ajouter.",
        "Ajouter basilic et un filet d’huile hors feu.",
        "Servir immédiatement.",
      ],
    },
    {
      id: "pa2",
      name: "Pâtes carbonara (familiale)",
      type: RecipeType.VEGE,
      durationMinutes: 20,
      difficulty: "Facile",
      ingredients: [
        { name: "Pâtes", quantity: "300 g", category: "" },
        { name: "Lardons", quantity: "150 g", category: "" },
        { name: "Œufs", quantity: "3", category: "" },
        { name: "Parmesan râpé", quantity: "40 g", category: "" },
        { name: "Poivre", quantity: "", category: "" },
      ],
      steps: [
        "Cuire les pâtes dans une grande eau salée.",
        "Cuire les lardons à feu moyen 5–6 min.",
        "Battre les œufs avec parmesan et poivre.",
        "Égoutter les pâtes en gardant un peu d’eau.",
        "Ajouter les pâtes aux lardons hors du feu.",
        "Feu coupé, ajouter le mélange œufs/fromage.",
        "Mélanger vivement.",
        "Ajuster avec eau de cuisson si besoin.",
        "Servir immédiatement.",
      ],
    },
    {
      id: "pa3",
      name: "Penne crème & jambon",
      type: RecipeType.VEGE,
      durationMinutes: 20,
      difficulty: "Facile",
      ingredients: [
        { name: "Penne", quantity: "300 g", category: "" },
        { name: "Jambon blanc", quantity: "150 g", category: "" },
        { name: "Crème", quantity: "20 cl", category: "" },
        { name: "Fromage râpé", quantity: "40 g", category: "" },
        { name: "Poivre", quantity: "", category: "" },
        { name: "Muscade", quantity: "", category: "" },
      ],
      steps: [
        "Cuire les pâtes dans une eau salée.",
        "Couper le jambon en lanières.",
        "Chauffer la crème à feu doux.",
        "Ajouter jambon, poivre et muscade.",
        "Chauffer 3 min sans bouillir.",
        "Égoutter les pâtes et les ajouter.",
        "Ajouter le fromage hors du feu.",
        "Mélanger.",
        "Servir chaud.",
      ],
    },
    {
      id: "pa4",
      name: "Spaghetti bolognaise rapide",
      type: RecipeType.VEGE,
      durationMinutes: 30,
      difficulty: "Facile",
      ingredients: [
        { name: "Spaghetti", quantity: "300 g", category: "" },
        { name: "Bœuf haché", quantity: "400 g", category: "" },
        { name: "Tomates concassées", quantity: "1 boîte", category: "" },
        { name: "Oignon", quantity: "1", category: "" },
        { name: "Carotte", quantity: "1", category: "" },
        { name: "Herbes sèches", quantity: "", category: "" },
        { name: "Huile", quantity: "1 càs", category: "" },
        { name: "Sel", quantity: "", category: "" },
      ],
      steps: [
        "Émincer l’oignon et râper la carotte.",
        "Chauffer l’huile à feu moyen.",
        "Cuire l’oignon 3 min.",
        "Ajouter viande et cuire 5 min.",
        "Ajouter carotte, tomates, herbes et sel.",
        "Mijoter 15 min à feu doux.",
        "Cuire les pâtes.",
        "Égoutter et servir avec la sauce.",
      ],
    },
    {
      id: "pa5",
      name: "Pâtes au pesto & tomates cerises",
      type: RecipeType.VEGE,
      durationMinutes: 15,
      difficulty: "Facile",
      ingredients: [
        { name: "Pâtes", quantity: "300 g", category: "" },
        { name: "Pesto", quantity: "3 càs", category: "" },
        { name: "Tomates cerises", quantity: "200 g", category: "" },
        { name: "Eau de cuisson", quantity: "", category: "" },
      ],
      steps: [
        "Cuire les pâtes dans une eau salée.",
        "Couper les tomates cerises en deux.",
        "Égoutter les pâtes en gardant un peu d’eau.",
        "Hors du feu, ajouter le pesto.",
        "Ajouter un peu d’eau de cuisson.",
        "Ajouter les tomates.",
        "Mélanger pour obtenir une sauce brillante.",
        "Servir immédiatement.",
      ],
    },
    {
      id: "pa6",
      name: "Coquillettes jambon & fromage",
      type: RecipeType.VEGE,
      durationMinutes: 15,
      difficulty: "Facile",
      ingredients: [
        { name: "Coquillettes", quantity: "300 g", category: "" },
        { name: "Jambon", quantity: "150 g", category: "" },
        { name: "Fromage râpé", quantity: "100 g", category: "" },
        { name: "Poivre", quantity: "", category: "" },
      ],
      steps: [
        "Cuire les coquillettes dans une eau salée.",
        "Couper le jambon en petits morceaux.",
        "Égoutter les pâtes.",
        "Ajouter jambon et fromage hors du feu.",
        "Poivrer.",
        "Mélanger jusqu’à fromage fondu.",
        "Servir immédiatement.",
      ],
    },
    {
      id: "pa7",
      name: "Pâtes crème & saumon fumé",
      type: RecipeType.VEGE,
      durationMinutes: 20,
      difficulty: "Facile",
      ingredients: [
        { name: "Pâtes", quantity: "300 g", category: "" },
        { name: "Saumon fumé", quantity: "150 g", category: "" },
        { name: "Crème", quantity: "20 cl", category: "" },
        { name: "Citron", quantity: "", category: "" },
        { name: "Poivre", quantity: "", category: "" },
      ],
      steps: [
        "Cuire les pâtes dans une eau salée.",
        "Chauffer la crème à feu doux sans saler.",
        "Ajouter le saumon hors du feu.",
        "Poivrer et ajouter un filet de citron.",
        "Égoutter les pâtes et les ajouter.",
        "Mélanger délicatement.",
        "Servir chaud.",
      ],
    },
    {
      id: "pa8",
      name: "Pâtes thon & tomate",
      type: RecipeType.VEGE,
      durationMinutes: 20,
      difficulty: "Facile",
      ingredients: [
        { name: "Pâtes", quantity: "300 g", category: "" },
        { name: "Thon naturel", quantity: "2 boîtes", category: "" },
        { name: "Tomates concassées", quantity: "1 boîte", category: "" },
        { name: "Ail", quantity: "1 gousse", category: "" },
        { name: "Herbes", quantity: "", category: "" },
        { name: "Sel", quantity: "", category: "" },
      ],
      steps: [
        "Cuire les pâtes dans une eau salée.",
        "Hacher l’ail.",
        "Chauffer les tomates avec ail et herbes 5 min.",
        "Ajouter le thon égoutté.",
        "Chauffer 3 min.",
        "Égoutter les pâtes et mélanger.",
        "Ajuster en sel.",
        "Servir chaud.",
      ],
    },
    {
      id: "pa9",
      name: "Pâtes crème & courgettes",
      type: RecipeType.VEGE,
      durationMinutes: 25,
      difficulty: "Facile",
      ingredients: [
        { name: "Pâtes", quantity: "300 g", category: "" },
        { name: "Courgettes", quantity: "2", category: "" },
        { name: "Crème", quantity: "20 cl", category: "" },
        { name: "Ail", quantity: "1 gousse", category: "" },
        { name: "Poivre", quantity: "", category: "" },
        { name: "Fromage râpé", quantity: "", category: "" },
      ],
      steps: [
        "Couper les courgettes en petits dés.",
        "Chauffer l’huile à feu moyen.",
        "Cuire les courgettes 8–10 min.",
        "Ajouter l’ail 30 s.",
        "Ajouter la crème et poivre.",
        "Chauffer 3 min.",
        "Cuire les pâtes.",
        "Égoutter et mélanger.",
        "Ajouter fromage hors du feu.",
        "Servir chaud.",
      ],
    },
    {
      id: "pa10",
      name: "Pâtes ail & huile (sécurisée)",
      type: RecipeType.VEGE,
      durationMinutes: 15,
      difficulty: "Facile",
      ingredients: [
        { name: "Pâtes", quantity: "300 g", category: "" },
        { name: "Ail", quantity: "2 gousses", category: "" },
        { name: "Huile d’olive", quantity: "4 càs", category: "" },
        { name: "Persil", quantity: "", category: "" },
        { name: "Sel", quantity: "", category: "" },
      ],
      steps: [
        "Cuire les pâtes dans une eau salée.",
        "Émincer finement l’ail.",
        "Chauffer l’huile à feu doux.",
        "Ajouter l’ail et cuire 1 min sans coloration.",
        "Égoutter les pâtes et les ajouter.",
        "Ajouter persil hors du feu.",
        "Mélanger.",
        "Servir immédiatement.",
      ],
    },
    {
      id: "it1",
      name: "Escalopes de poulet à la milanaise",
      type: RecipeType.VIANDE,
      durationMinutes: 25,
      difficulty: "Facile",
      ingredients: [
        { name: "Escalopes de poulet fines", quantity: "3", category: "" },
        { name: "Œufs", quantity: "2", category: "" },
        { name: "Chapelure", quantity: "60 g", category: "" },
        { name: "Parmesan râpé", quantity: "40 g", category: "" },
        { name: "Huile", quantity: "3 càs", category: "" },
        { name: "Sel", quantity: "", category: "" },
        { name: "Poivre", quantity: "", category: "" },
        { name: "Citron", quantity: "", category: "" },
      ],
      steps: [
        "Battre les œufs avec sel et poivre.",
        "Mélanger chapelure et parmesan.",
        "Paner le poulet.",
        "Chauffer l’huile à feu moyen.",
        "Cuire 4–5 min par face jusqu’à doré.",
        "Égoutter.",
        "Servir avec un quartier de citron.",
      ],
    },
    {
      id: "it2",
      name: "Spaghetti cacio e pepe (simplifiée)",
      type: RecipeType.VEGE,
      durationMinutes: 20,
      difficulty: "Facile",
      ingredients: [
        { name: "Spaghetti", quantity: "300 g", category: "" },
        { name: "Pecorino râpé fin", quantity: "60 g", category: "" },
        { name: "Poivre noir", quantity: "", category: "" },
        { name: "Eau de cuisson", quantity: "", category: "" },
      ],
      steps: [
        "Cuire les pâtes dans une eau peu salée.",
        "Poivrer généreusement.",
        "Égoutter en gardant beaucoup d’eau.",
        "Feu coupé, ajouter le fromage.",
        "Ajouter l’eau petit à petit.",
        "Mélanger jusqu’à sauce crémeuse.",
        "Servir immédiatement.",
      ],
    },
    {
      id: "it3",
      name: "Penne arrabbiata",
      type: RecipeType.VEGE,
      durationMinutes: 20,
      difficulty: "Facile",
      ingredients: [
        { name: "Penne", quantity: "300 g", category: "" },
        { name: "Tomates concassées", quantity: "1 boîte", category: "" },
        { name: "Ail", quantity: "1 gousse", category: "" },
        { name: "Piment", quantity: "", category: "" },
        { name: "Huile", quantity: "1 càs", category: "" },
        { name: "Sel", quantity: "", category: "" },
      ],
      steps: [
        "Cuire les pâtes.",
        "Hacher l’ail.",
        "Chauffer l’huile.",
        "Ajouter ail et piment 30 s.",
        "Ajouter tomates et sel.",
        "Mijoter 10 min.",
        "Mélanger avec les pâtes.",
        "Ajouter un filet d’huile hors feu.",
      ],
    },
    {
      id: "it4",
      name: "Risotto express aux champignons",
      type: RecipeType.VEGE,
      durationMinutes: 30,
      difficulty: "Facile",
      ingredients: [
        { name: "Riz arborio", quantity: "250 g", category: "" },
        { name: "Champignons", quantity: "250 g", category: "" },
        { name: "Oignon", quantity: "1", category: "" },
        { name: "Bouillon chaud", quantity: "70 cl", category: "" },
        { name: "Parmesan", quantity: "30 g", category: "" },
        { name: "Beurre", quantity: "20 g", category: "" },
        { name: "Huile", quantity: "1 càs", category: "" },
      ],
      steps: [
        "Émincer oignon et champignons.",
        "Chauffer l’huile.",
        "Cuire l’oignon 2 min.",
        "Ajouter champignons 5 min.",
        "Ajouter riz.",
        "Ajouter bouillon louche par louche.",
        "Cuire 18–20 min.",
        "Ajouter beurre et parmesan hors feu.",
      ],
    },
    {
      id: "it5",
      name: "Gnocchi tomate & mozzarella",
      type: RecipeType.VEGE,
      durationMinutes: 20,
      difficulty: "Facile",
      ingredients: [
        { name: "Gnocchi frais", quantity: "500 g", category: "" },
        { name: "Tomates concassées", quantity: "1 boîte", category: "" },
        { name: "Mozzarella", quantity: "1 boule", category: "" },
        { name: "Sel", quantity: "", category: "" },
        { name: "Basilic", quantity: "", category: "" },
      ],
      steps: [
        "Chauffer tomates 10 min.",
        "Cuire les gnocchi.",
        "Mélanger avec la sauce.",
        "Ajouter mozzarella hors feu.",
        "Ajouter basilic.",
      ],
    },
    {
      id: "it6",
      name: "Saltimbocca de veau",
      type: RecipeType.VIANDE,
      durationMinutes: 20,
      difficulty: "Facile",
      ingredients: [
        { name: "Escalopes de veau", quantity: "3", category: "" },
        { name: "Jambon cru", quantity: "3 tranches", category: "" },
        { name: "Sauge", quantity: "", category: "" },
        { name: "Beurre", quantity: "20 g", category: "" },
      ],
      steps: [
        "Déposer jambon et sauge sur le veau.",
        "Chauffer le beurre.",
        "Cuire côté jambon 3 min.",
        "Retourner 2 min.",
        "Servir chaud.",
      ],
    },
    {
      id: "it7",
      name: "Pâtes thon, câpres & tomate",
      type: RecipeType.POISSON,
      durationMinutes: 20,
      difficulty: "Facile",
      ingredients: [
        { name: "Pâtes", quantity: "300 g", category: "" },
        { name: "Thon", quantity: "2 boîtes", category: "" },
        { name: "Tomates", quantity: "1 boîte", category: "" },
        { name: "Câpres", quantity: "1 càs", category: "" },
        { name: "Ail", quantity: "1 gousse", category: "" },
        { name: "Huile d’olive", quantity: "", category: "" },
      ],
      steps: [
        "Cuire les pâtes.",
        "Chauffer tomates avec ail 5 min.",
        "Ajouter thon et câpres.",
        "Chauffer 3 min.",
        "Mélanger avec pâtes.",
        "Ajouter huile hors feu.",
      ],
    },
    {
      id: "it8",
      name: "Pizza express à la poêle",
      type: RecipeType.VEGE,
      durationMinutes: 25,
      difficulty: "Facile",
      ingredients: [
        { name: "Wraps", quantity: "3", category: "" },
        { name: "Sauce tomate", quantity: "", category: "" },
        { name: "Fromage râpé", quantity: "", category: "" },
        { name: "Garniture au choix", quantity: "", category: "" },
      ],
      steps: [
        "Garnir les wraps.",
        "Cuire couvert à feu doux 10 min.",
        "Fromage fondu.",
        "Servir chaud.",
      ],
    },
    {
      id: "it9",
      name: "Aubergines tomate & parmesan",
      type: RecipeType.VEGE,
      durationMinutes: 30,
      difficulty: "Facile",
      ingredients: [
        { name: "Aubergines", quantity: "2", category: "" },
        { name: "Tomates", quantity: "1 boîte", category: "" },
        { name: "Parmesan", quantity: "40 g", category: "" },
        { name: "Huile", quantity: "2 càs", category: "" },
        { name: "Sel", quantity: "", category: "" },
      ],
      steps: [
        "Couper aubergines.",
        "Cuire dans l’huile 10 min.",
        "Ajouter tomates.",
        "Mijoter 10 min.",
        "Ajouter parmesan hors feu.",
      ],
    },
    {
      id: "it10",
      name: "Frittata courgettes & fromage",
      type: RecipeType.VEGE,
      durationMinutes: 25,
      difficulty: "Facile",
      ingredients: [
        { name: "Œufs", quantity: "6", category: "" },
        { name: "Courgettes", quantity: "2", category: "" },
        { name: "Fromage râpé", quantity: "60 g", category: "" },
        { name: "Huile", quantity: "1 càs", category: "" },
        { name: "Sel", quantity: "", category: "" },
        { name: "Poivre", quantity: "", category: "" },
        { name: "Herbes", quantity: "", category: "" },
      ],
      steps: [
        "Cuire courgettes 8 min.",
        "Battre œufs avec fromage.",
        "Verser sur courgettes.",
        "Cuire 10 min à feu doux couvert.",
        "Ajouter herbes.",
      ],
    },
    {
      id: "jp1",
      name: "Poulet teriyaki maison",
      type: RecipeType.VIANDE,
      durationMinutes: 25,
      difficulty: "Facile",
      ingredients: [
        { name: "Blancs de poulet", quantity: "500 g", category: "" },
        { name: "Sauce soja", quantity: "6 càs", category: "" },
        { name: "Mirin (ou miel + vinaigre)", quantity: "3 càs", category: "" },
        { name: "Sucre", quantity: "1 càs", category: "" },
        { name: "Huile", quantity: "1 càs", category: "" },
      ],
      steps: [
        "Couper le poulet en morceaux réguliers.",
        "Mélanger soja, mirin et sucre.",
        "Chauffer l’huile à feu moyen.",
        "Cuire le poulet 5–6 min jusqu’à doré.",
        "Verser la sauce.",
        "Réduire 4–6 min jusqu’à nappant.",
        "Ajuster avec un peu d’eau si trop épais.",
        "Servir avec riz.",
      ],
    },
    {
      id: "jp2",
      name: "Donburi bœuf (gyudon)",
      type: RecipeType.VIANDE,
      durationMinutes: 20,
      difficulty: "Facile",
      ingredients: [
        { name: "Bœuf émincé", quantity: "400 g", category: "" },
        { name: "Oignon", quantity: "1 gros", category: "" },
        { name: "Sauce soja", quantity: "5 càs", category: "" },
        { name: "Mirin", quantity: "3 càs", category: "" },
        { name: "Sucre", quantity: "1 càs", category: "" },
        { name: "Eau", quantity: "10 cl", category: "" },
      ],
      steps: [
        "Émincer l’oignon.",
        "Mettre oignon, eau, soja, mirin et sucre à feu moyen.",
        "Frémir 5 min.",
        "Ajouter le bœuf.",
        "Cuire 5–7 min.",
        "Sauce légèrement réduite.",
        "Servir sur riz avec un peu de jus.",
      ],
    },
    {
      id: "jp3",
      name: "Omelette japonaise (tamagoyaki)",
      type: RecipeType.VEGE,
      durationMinutes: 15,
      difficulty: "Facile",
      ingredients: [
        { name: "Œufs", quantity: "6", category: "" },
        { name: "Sucre", quantity: "1 càs", category: "" },
        { name: "Sauce soja", quantity: "1 càs", category: "" },
        { name: "Eau", quantity: "1 càs", category: "" },
        { name: "Huile", quantity: "1 càs", category: "" },
      ],
      steps: [
        "Battre œufs, sucre, soja et eau.",
        "Chauffer poêle à feu doux.",
        "Verser fine couche.",
        "Rouler quand presque prise.",
        "Répéter jusqu’à épuisement.",
        "Cuire sans coloration.",
        "Ajuster sucre ou soja en finition.",
        "Servir avec riz.",
      ],
    },
    {
      id: "jp4",
      name: "Soba soja & légumes",
      type: RecipeType.VEGE,
      durationMinutes: 20,
      difficulty: "Facile",
      ingredients: [
        { name: "Soba", quantity: "300 g", category: "" },
        { name: "Carotte", quantity: "1", category: "" },
        { name: "Courgette", quantity: "1", category: "" },
        { name: "Sauce soja", quantity: "4 càs", category: "" },
        { name: "Huile", quantity: "1 càs", category: "" },
        { name: "Huile de sésame", quantity: "1 càs", category: "" },
        { name: "Eau", quantity: "1 càs", category: "" },
      ],
      steps: [
        "Cuire les soba et rincer à froid.",
        "Couper légumes finement.",
        "Chauffer huile à feu moyen-vif.",
        "Cuire légumes 3–4 min.",
        "Ajouter soba, soja, huile de sésame et eau.",
        "Mélanger 2 min.",
        "Servir chaud.",
      ],
    },
    {
      id: "jp5",
      name: "Saumon laqué soja–miel",
      type: RecipeType.POISSON,
      durationMinutes: 20,
      difficulty: "Facile",
      ingredients: [
        { name: "Saumon", quantity: "3 pavés", category: "" },
        { name: "Sauce soja", quantity: "4 càs", category: "" },
        { name: "Miel", quantity: "1 càs", category: "" },
        { name: "Huile", quantity: "1 càs", category: "" },
      ],
      steps: [
        "Mélanger soja et miel.",
        "Chauffer huile à feu moyen.",
        "Cuire saumon 3–4 min côté peau.",
        "Retourner, ajouter sauce.",
        "Réduire 2–3 min sans surcuire.",
        "Servir laqué avec riz.",
      ],
    },
    {
      id: "jp6",
      name: "Riz sauté japonais aux œufs",
      type: RecipeType.VEGE,
      durationMinutes: 20,
      difficulty: "Facile",
      ingredients: [
        { name: "Riz cuit froid", quantity: "300 g", category: "" },
        { name: "Œufs", quantity: "3", category: "" },
        { name: "Sauce soja", quantity: "2 càs", category: "" },
        { name: "Huile", quantity: "1 càs", category: "" },
        { name: "Huile de sésame", quantity: "1 càs", category: "" },
      ],
      steps: [
        "Chauffer huile à feu moyen-vif.",
        "Chauffer riz 2–3 min.",
        "Pousser sur le côté.",
        "Brouiller œufs 1–2 min.",
        "Mélanger.",
        "Ajouter soja et huile de sésame.",
        "Servir chaud.",
      ],
    },
    {
      id: "jp7",
      name: "Poulet pané japonais (katsu)",
      type: RecipeType.VIANDE,
      durationMinutes: 25,
      difficulty: "Facile",
      ingredients: [
        { name: "Escalopes de poulet", quantity: "3", category: "" },
        { name: "Œufs", quantity: "2", category: "" },
        { name: "Farine", quantity: "60 g", category: "" },
        { name: "Panko", quantity: "120 g", category: "" },
        { name: "Huile", quantity: "4 càs", category: "" },
        { name: "Sel", quantity: "", category: "" },
        { name: "Poivre", quantity: "", category: "" },
      ],
      steps: [
        "Aplatir et assaisonner le poulet.",
        "Paner farine, œuf, panko.",
        "Chauffer huile à feu moyen.",
        "Cuire 4–5 min par face.",
        "Égoutter.",
        "Servir avec riz.",
        "Sauce optionnelle : ketchup + soja.",
      ],
    },
    {
      id: "jp8",
      name: "Curry japonais express",
      type: RecipeType.VIANDE,
      durationMinutes: 30,
      difficulty: "Facile",
      ingredients: [
        { name: "Poulet", quantity: "400 g", category: "" },
        { name: "Oignon", quantity: "1", category: "" },
        { name: "Pommes de terre chair ferme", quantity: "2", category: "" },
        { name: "Carotte", quantity: "1", category: "" },
        { name: "Curry japonais", quantity: "100 g", category: "" },
        { name: "Eau", quantity: "60 cl", category: "" },
        { name: "Huile", quantity: "1 càs", category: "" },
      ],
      steps: [
        "Couper viande et légumes.",
        "Cuire oignon 5 min.",
        "Dorer viande 5 min.",
        "Ajouter légumes et eau.",
        "Mijoter 15 min.",
        "Hors feu ajouter curry.",
        "Réchauffer doucement.",
        "Servir avec riz.",
      ],
    },
    {
      id: "jp9",
      name: "Porc au gingembre (shōgayaki)",
      type: RecipeType.VIANDE,
      durationMinutes: 20,
      difficulty: "Facile",
      ingredients: [
        { name: "Porc émincé", quantity: "400 g", category: "" },
        { name: "Gingembre râpé", quantity: "1 càs", category: "" },
        { name: "Sauce soja", quantity: "4 càs", category: "" },
        { name: "Sucre", quantity: "1 càs", category: "" },
        { name: "Huile", quantity: "1 càs", category: "" },
        { name: "Eau", quantity: "5 cl", category: "" },
      ],
      steps: [
        "Chauffer huile à feu moyen-vif.",
        "Cuire porc 4–5 min.",
        "Ajouter gingembre, soja, sucre et eau.",
        "Réduire 3–4 min.",
        "Ajuster avec eau si trop salé.",
        "Servir avec riz.",
      ],
    },
    {
      id: "jp10",
      name: "Soupe miso simple",
      type: RecipeType.VEGE,
      durationMinutes: 15,
      difficulty: "Facile",
      ingredients: [
        { name: "Eau", quantity: "1 L", category: "" },
        { name: "Pâte miso", quantity: "2 càs", category: "" },
        { name: "Tofu", quantity: "150 g", category: "" },
        { name: "Algues (optionnel)", quantity: "", category: "" },
      ],
      steps: [
        "Chauffer l’eau sans bouillir.",
        "Délayer le miso à part.",
        "Ajouter au feu doux.",
        "Ajouter tofu et algues.",
        "Chauffer 2–3 min.",
        "Servir chaud.",
      ],
    },
    {
      id: "mx1",
      name: "Tacos de bœuf haché épicé",
      type: RecipeType.VIANDE,
      durationMinutes: 25,
      difficulty: "Facile",
      ingredients: [
        { name: "Bœuf haché", quantity: "400 g", category: "" },
        { name: "Oignon", quantity: "1", category: "" },
        { name: "Huile", quantity: "1 càs", category: "" },
        { name: "Paprika", quantity: "1 càc", category: "" },
        { name: "Cumin", quantity: "1 càc", category: "" },
        { name: "Sel", quantity: "", category: "" },
        { name: "Tortillas", quantity: "8", category: "" },
      ],
      steps: [
        "Émincer l’oignon.",
        "Chauffer l’huile à feu moyen.",
        "Cuire l’oignon 3 min.",
        "Ajouter le bœuf, cuire 6–8 min.",
        "Ajouter paprika, cumin et sel.",
        "Mélanger 2 min.",
        "Réchauffer les tortillas.",
        "Garnir et servir avec crudités fraîches.",
      ],
    },
    {
      id: "mx2",
      name: "Quesadillas poulet & fromage",
      type: RecipeType.VIANDE,
      durationMinutes: 20,
      difficulty: "Facile",
      ingredients: [
        { name: "Poulet", quantity: "300 g", category: "" },
        { name: "Fromage râpé", quantity: "150 g", category: "" },
        { name: "Tortillas", quantity: "8", category: "" },
        { name: "Huile", quantity: "1 càs", category: "" },
        { name: "Sel", quantity: "", category: "" },
        { name: "Paprika", quantity: "", category: "" },
      ],
      steps: [
        "Couper le poulet en dés.",
        "Chauffer l’huile à feu moyen.",
        "Cuire le poulet 6–8 min.",
        "Ajouter paprika et sel.",
        "Garnir les tortillas de poulet et fromage.",
        "Cuire 2–3 min par face.",
        "Couper et servir avec salade.",
      ],
    },
    {
      id: "mx3",
      name: "Chili con carne rapide",
      type: RecipeType.VIANDE,
      durationMinutes: 30,
      difficulty: "Facile",
      ingredients: [
        { name: "Bœuf haché", quantity: "400 g", category: "" },
        { name: "Haricots rouges", quantity: "400 g", category: "" },
        { name: "Tomates", quantity: "1 boîte", category: "" },
        { name: "Oignon", quantity: "1", category: "" },
        { name: "Cumin", quantity: "1 càc", category: "" },
        { name: "Paprika fumé", quantity: "1 càc", category: "" },
        { name: "Huile", quantity: "1 càs", category: "" },
        { name: "Sel", quantity: "", category: "" },
      ],
      steps: [
        "Émincer l’oignon.",
        "Chauffer l’huile.",
        "Cuire l’oignon 3 min.",
        "Ajouter bœuf 6–8 min.",
        "Ajouter tomates, haricots et épices.",
        "Mijoter 15 min.",
        "Servir avec riz.",
      ],
    },
    {
      id: "mx4",
      name: "Fajitas de poulet aux poivrons",
      type: RecipeType.VIANDE,
      durationMinutes: 25,
      difficulty: "Facile",
      ingredients: [
        { name: "Poulet", quantity: "400 g", category: "" },
        { name: "Poivrons", quantity: "2", category: "" },
        { name: "Oignon", quantity: "1", category: "" },
        { name: "Paprika fumé", quantity: "1 càc", category: "" },
        { name: "Cumin", quantity: "1 càc", category: "" },
        { name: "Huile", quantity: "1 càs", category: "" },
        { name: "Sel", quantity: "", category: "" },
      ],
      steps: [
        "Couper poulet et légumes en lanières.",
        "Chauffer l’huile à feu moyen-vif.",
        "Cuire le poulet 5 min.",
        "Ajouter légumes et épices.",
        "Cuire 7–8 min.",
        "Servir avec tortillas.",
      ],
    },
    {
      id: "mx5",
      name: "Enchiladas au bœuf",
      type: RecipeType.VIANDE,
      durationMinutes: 30,
      difficulty: "Facile",
      ingredients: [
        { name: "Bœuf haché", quantity: "400 g", category: "" },
        { name: "Tortillas", quantity: "6", category: "" },
        { name: "Tomates", quantity: "1 boîte", category: "" },
        { name: "Fromage râpé", quantity: "100 g", category: "" },
        { name: "Cumin", quantity: "1 càc", category: "" },
        { name: "Huile", quantity: "1 càs", category: "" },
        { name: "Sel", quantity: "", category: "" },
      ],
      steps: [
        "Cuire le bœuf dans l’huile 6–8 min.",
        "Ajouter tomates, cumin et sel.",
        "Mijoter 5 min.",
        "Garnir les tortillas.",
        "Rouler et placer dans un plat.",
        "Ajouter fromage.",
        "Cuire 15 min à 180°C.",
        "Servir avec salade.",
      ],
    },
    {
      id: "mx6",
      name: "Riz mexicain à la tomate",
      type: RecipeType.VEGE,
      durationMinutes: 25,
      difficulty: "Facile",
      ingredients: [
        { name: "Riz long", quantity: "250 g", category: "" },
        { name: "Tomates", quantity: "1 boîte", category: "" },
        { name: "Eau", quantity: "50 cl", category: "" },
        { name: "Oignon", quantity: "1", category: "" },
        { name: "Paprika", quantity: "1 càc", category: "" },
        { name: "Huile", quantity: "1 càs", category: "" },
        { name: "Sel", quantity: "", category: "" },
      ],
      steps: [
        "Cuire l’oignon 3 min.",
        "Ajouter riz, remuer 1 min.",
        "Ajouter tomates, eau, paprika.",
        "Cuire couvert 18 min.",
        "Repos 5 min.",
        "Servir en accompagnement.",
      ],
    },
    {
      id: "mx7",
      name: "Tacos végétariens haricots & maïs",
      type: RecipeType.VEGE,
      durationMinutes: 20,
      difficulty: "Facile",
      ingredients: [
        { name: "Haricots rouges", quantity: "400 g", category: "" },
        { name: "Maïs", quantity: "150 g", category: "" },
        { name: "Cumin", quantity: "1 càc", category: "" },
        { name: "Huile", quantity: "1 càs", category: "" },
        { name: "Sel", quantity: "", category: "" },
        { name: "Tortillas", quantity: "8", category: "" },
      ],
      steps: [
        "Chauffer l’huile.",
        "Ajouter haricots et maïs.",
        "Ajouter cumin et sel.",
        "Chauffer 6–8 min.",
        "Réchauffer tortillas.",
        "Garnir.",
        "Ajouter citron ou tomate fraîche.",
      ],
    },
    {
      id: "mx8",
      name: "Poêlée de porc mexicaine",
      type: RecipeType.VIANDE,
      durationMinutes: 25,
      difficulty: "Facile",
      ingredients: [
        { name: "Porc émincé", quantity: "400 g", category: "" },
        { name: "Oignon", quantity: "1", category: "" },
        { name: "Poivron", quantity: "1", category: "" },
        { name: "Cumin", quantity: "1 càc", category: "" },
        { name: "Huile", quantity: "1 càs", category: "" },
        { name: "Sel", quantity: "", category: "" },
      ],
      steps: [
        "Chauffer l’huile.",
        "Cuire le porc 6–8 min.",
        "Ajouter oignon, poivron et cumin.",
        "Cuire 5–6 min.",
        "Servir avec riz ou tortillas.",
      ],
    },
    {
      id: "mx9",
      name: "Nachos maison",
      type: RecipeType.VEGE,
      durationMinutes: 15,
      difficulty: "Facile",
      ingredients: [
        { name: "Chips de maïs", quantity: "200 g", category: "" },
        { name: "Fromage râpé", quantity: "150 g", category: "" },
        { name: "Haricots rouges", quantity: "200 g", category: "" },
      ],
      steps: [
        "Préchauffer le four à 180°C.",
        "Répartir chips dans un plat.",
        "Ajouter haricots et fromage.",
        "Cuire 10 min.",
        "Servir comme repas léger.",
      ],
    },
    {
      id: "mx10",
      name: "Omelette mexicaine douce",
      type: RecipeType.VEGE,
      durationMinutes: 20,
      difficulty: "Facile",
      ingredients: [
        { name: "Œufs", quantity: "6", category: "" },
        { name: "Poivron", quantity: "1", category: "" },
        { name: "Fromage râpé", quantity: "50 g", category: "" },
        { name: "Paprika", quantity: "1 càc", category: "" },
        { name: "Huile", quantity: "1 càs", category: "" },
        { name: "Sel", quantity: "", category: "" },
      ],
      steps: [
        "Cuire le poivron 5 min.",
        "Battre œufs avec paprika et sel.",
        "Ajouter fromage.",
        "Verser dans la poêle.",
        "Cuire 10 min à feu doux.",
        "Servir avec salade ou riz.",
      ],
    },
    {
      id: "th1",
      name: "Poulet sauté au basilic thaï",
      type: RecipeType.VIANDE,
      durationMinutes: 20,
      difficulty: "Facile",
      ingredients: [
        { name: "Blanc de poulet", quantity: "400 g", category: "" },
        { name: "Ail", quantity: "2 gousses", category: "" },
        { name: "Piment doux", quantity: "1 petit", category: "" },
        { name: "Sauce soja", quantity: "3 càs", category: "" },
        { name: "Sauce huître", quantity: "1 càs", category: "" },
        { name: "Huile", quantity: "1 càs", category: "" },
        { name: "Basilic", quantity: "", category: "" },
      ],
      steps: [
        "Hacher ail et piment.",
        "Chauffer l’huile à feu moyen-vif.",
        "Cuire ail et piment 30 s sans coloration.",
        "Ajouter le poulet, cuire 5–6 min.",
        "Ajouter sauces et une pincée de sucre.",
        "Mélanger 1 min.",
        "Ajouter le basilic hors feu.",
        "Servir avec riz.",
      ],
    },
    {
      id: "th2",
      name: "Curry vert de poulet express",
      type: RecipeType.VIANDE,
      durationMinutes: 30,
      difficulty: "Facile",
      ingredients: [
        { name: "Blanc de poulet", quantity: "400 g", category: "" },
        { name: "Pâte curry vert", quantity: "2 càs", category: "" },
        { name: "Lait de coco", quantity: "40 cl", category: "" },
        { name: "Courgette", quantity: "1", category: "" },
        { name: "Huile", quantity: "1 càs", category: "" },
        { name: "Sauce soja", quantity: "1 càs", category: "" },
      ],
      steps: [
        "Couper le poulet.",
        "Chauffer l’huile à feu moyen.",
        "Ajouter la pâte de curry 1 min.",
        "Ajouter le poulet 3 min.",
        "Ajouter lait de coco et sauce soja.",
        "Ajouter la courgette.",
        "Mijoter 15 min.",
        "Servir avec riz jasmin.",
      ],
    },
    {
      id: "th3",
      name: "Pad thaï simplifié au poulet",
      type: RecipeType.VIANDE,
      durationMinutes: 30,
      difficulty: "Facile",
      ingredients: [
        { name: "Nouilles de riz", quantity: "300 g", category: "" },
        { name: "Poulet", quantity: "300 g", category: "" },
        { name: "Œufs", quantity: "2", category: "" },
        { name: "Sauce soja", quantity: "3 càs", category: "" },
        { name: "Sucre", quantity: "1 càs", category: "" },
        { name: "Huile", quantity: "1 càs", category: "" },
        { name: "Citron vert", quantity: "", category: "" },
      ],
      steps: [
        "Tremper les nouilles 8–10 min, égoutter.",
        "Cuire le poulet 4–5 min à feu moyen-vif.",
        "Pousser sur le côté.",
        "Ajouter les œufs, remuer jusqu’à pris sans coloration.",
        "Ajouter nouilles, soja et sucre.",
        "Mélanger 3–4 min.",
        "Ajouter quelques gouttes de citron vert.",
        "Servir bien chaud.",
      ],
    },
    {
      id: "th4",
      name: "Soupe coco citronnelle",
      type: RecipeType.VIANDE,
      durationMinutes: 25,
      difficulty: "Facile",
      ingredients: [
        { name: "Poulet", quantity: "300 g", category: "" },
        { name: "Lait de coco", quantity: "40 cl", category: "" },
        { name: "Eau", quantity: "40 cl", category: "" },
        { name: "Citronnelle", quantity: "1", category: "" },
        { name: "Sauce soja", quantity: "2 càs", category: "" },
        { name: "Gingembre", quantity: "", category: "" },
      ],
      steps: [
        "Chauffer eau, coco et citronnelle sans bouillir.",
        "Ajouter le poulet.",
        "Cuire 8–10 min à feu doux.",
        "Ajouter sauce soja et gingembre.",
        "Servir chaud.",
      ],
    },
    {
      id: "th5",
      name: "Riz sauté thaï aux œufs",
      type: RecipeType.VEGE,
      durationMinutes: 20,
      difficulty: "Facile",
      ingredients: [
        { name: "Riz cuit froid", quantity: "300 g", category: "" },
        { name: "Œufs", quantity: "3", category: "" },
        { name: "Sauce soja", quantity: "2 càs", category: "" },
        { name: "Huile", quantity: "1 càs", category: "" },
        { name: "Huile de sésame", quantity: "", category: "" },
      ],
      steps: [
        "Chauffer l’huile à feu moyen-vif.",
        "Ajouter le riz, chauffer 2–3 min.",
        "Pousser le riz sur le côté.",
        "Ajouter les œufs, remuer jusqu’à pris.",
        "Mélanger.",
        "Ajouter soja et huile de sésame.",
        "Mélanger 1 min.",
        "Servir.",
      ],
    },
    {
      id: "th6",
      name: "Bœuf sauté thaï au soja",
      type: RecipeType.VIANDE,
      durationMinutes: 20,
      difficulty: "Facile",
      ingredients: [
        { name: "Bœuf émincé", quantity: "400 g", category: "" },
        { name: "Oignon", quantity: "1", category: "" },
        { name: "Sauce soja", quantity: "3 càs", category: "" },
        { name: "Huile", quantity: "1 càs", category: "" },
        { name: "Gingembre", quantity: "", category: "" },
      ],
      steps: [
        "Chauffer l’huile à feu moyen-vif.",
        "Cuire le bœuf 4–5 min.",
        "Ajouter oignon et gingembre.",
        "Cuire 5 min.",
        "Ajouter sauce soja.",
        "Mélanger 1 min.",
        "Servir avec riz.",
      ],
    },
    {
      id: "th7",
      name: "Poulet coco-citron vert",
      type: RecipeType.VIANDE,
      durationMinutes: 25,
      difficulty: "Facile",
      ingredients: [
        { name: "Poulet", quantity: "400 g", category: "" },
        { name: "Lait de coco", quantity: "40 cl", category: "" },
        { name: "Citron vert", quantity: "1", category: "" },
        { name: "Huile", quantity: "1 càs", category: "" },
        { name: "Sauce soja", quantity: "2 càs", category: "" },
      ],
      steps: [
        "Cuire le poulet 5 min.",
        "Ajouter coco, zeste et jus.",
        "Ajouter sauce soja.",
        "Mijoter 15 min.",
        "Servir avec riz.",
      ],
    },
    {
      id: "th8",
      name: "Nouilles thaï aux légumes",
      type: RecipeType.VEGE,
      durationMinutes: 20,
      difficulty: "Facile",
      ingredients: [
        { name: "Nouilles de riz", quantity: "300 g", category: "" },
        { name: "Carotte", quantity: "1", category: "" },
        { name: "Courgette", quantity: "1", category: "" },
        { name: "Sauce soja", quantity: "3 càs", category: "" },
        { name: "Huile", quantity: "1 càs", category: "" },
        { name: "Ail", quantity: "", category: "" },
      ],
      steps: [
        "Tremper les nouilles 10 min.",
        "Cuire les légumes avec ail 4–5 min.",
        "Ajouter nouilles et sauce soja.",
        "Mélanger 3 min.",
        "Servir chaud.",
      ],
    },
    {
      id: "th9",
      name: "Porc sauté thaï au basilic",
      type: RecipeType.VIANDE,
      durationMinutes: 20,
      difficulty: "Facile",
      ingredients: [
        { name: "Porc", quantity: "400 g", category: "" },
        { name: "Ail", quantity: "2 gousses", category: "" },
        { name: "Basilic", quantity: "", category: "" },
        { name: "Sauce soja", quantity: "3 càs", category: "" },
        { name: "Huile", quantity: "1 càs", category: "" },
      ],
      steps: [
        "Cuire l’ail 30 s.",
        "Ajouter le porc 5–6 min.",
        "Ajouter sauce soja.",
        "Mélanger 1 min.",
        "Ajouter basilic hors feu.",
        "Servir avec riz.",
      ],
    },
    {
      id: "th10",
      name: "Omelette thaï douce",
      type: RecipeType.VEGE,
      durationMinutes: 20,
      difficulty: "Facile",
      ingredients: [
        { name: "Œufs", quantity: "6", category: "" },
        { name: "Sauce soja", quantity: "2 càs", category: "" },
        { name: "Huile", quantity: "1 càs", category: "" },
        { name: "Poivre", quantity: "", category: "" },
      ],
      steps: [
        "Battre les œufs avec sauce soja.",
        "Chauffer l’huile à feu moyen.",
        "Verser les œufs.",
        "Cuire 8–10 min à feu doux.",
        "Servir avec riz.",
      ],
    },
    {
      id: "in1",
      name: "Poulet tikka masala simplifié",
      type: RecipeType.VIANDE,
      durationMinutes: 30,
      difficulty: "Facile",
      ingredients: [
        { name: "Blanc de poulet", quantity: "400 g", category: "" },
        { name: "Oignon", quantity: "1", category: "" },
        { name: "Crème", quantity: "20 cl", category: "" },
        { name: "Tomates concassées", quantity: "1 boîte", category: "" },
        { name: "Garam masala", quantity: "2 càc", category: "" },
        { name: "Paprika fumé", quantity: "1 càc", category: "" },
        { name: "Huile", quantity: "1 càs", category: "" },
        { name: "Sel", quantity: "", category: "" },
      ],
      steps: [
        "Couper le poulet.",
        "Émincer l’oignon.",
        "Chauffer l’huile à feu moyen.",
        "Cuire l’oignon 5 min.",
        "Ajouter poulet, cuire 5 min.",
        "Ajouter tomates, épices et sucre, mélanger 30 s.",
        "Mijoter 15 min à feu doux.",
        "Ajouter la crème, sauce nappante.",
        "Servir avec riz basmati.",
      ],
    },
    {
      id: "in2",
      name: "Curry de pois chiches express",
      type: RecipeType.VEGE,
      durationMinutes: 25,
      difficulty: "Facile",
      ingredients: [
        { name: "Pois chiches cuits", quantity: "500 g", category: "" },
        { name: "Oignon", quantity: "1", category: "" },
        { name: "Tomates concassées", quantity: "1 boîte", category: "" },
        { name: "Curry doux", quantity: "2 càc", category: "" },
        { name: "Huile", quantity: "1 càs", category: "" },
        { name: "Sel", quantity: "", category: "" },
      ],
      steps: [
        "Émincer l’oignon.",
        "Chauffer l’huile à feu moyen.",
        "Cuire l’oignon 5 min.",
        "Ajouter curry, mélanger 30 s.",
        "Ajouter tomates et pois chiches.",
        "Écraser 2–3 pois chiches.",
        "Mijoter 15 min.",
        "Servir avec riz.",
      ],
    },
    {
      id: "in3",
      name: "Dahl de lentilles corail",
      type: RecipeType.VEGE,
      durationMinutes: 30,
      difficulty: "Facile",
      ingredients: [
        { name: "Lentilles corail", quantity: "250 g", category: "" },
        { name: "Oignon", quantity: "1", category: "" },
        { name: "Ail", quantity: "1 gousse", category: "" },
        { name: "Curry doux", quantity: "1 càc", category: "" },
        { name: "Eau", quantity: "60 cl", category: "" },
        { name: "Huile", quantity: "1 càs", category: "" },
        { name: "Sel", quantity: "", category: "" },
        { name: "Citron", quantity: "", category: "" },
      ],
      steps: [
        "Rincer les lentilles.",
        "Émincer oignon, hacher ail.",
        "Chauffer l’huile à feu moyen.",
        "Cuire oignon et ail 3 min.",
        "Ajouter curry et lentilles.",
        "Ajouter l’eau.",
        "Cuire 20 min en remuant 1–2 fois.",
        "Ajouter citron.",
        "Servir avec riz.",
      ],
    },
    {
      id: "in4",
      name: "Poulet curry coco",
      type: RecipeType.VIANDE,
      durationMinutes: 30,
      difficulty: "Facile",
      ingredients: [
        { name: "Blanc de poulet", quantity: "400 g", category: "" },
        { name: "Lait de coco", quantity: "40 cl", category: "" },
        { name: "Oignon", quantity: "1", category: "" },
        { name: "Curry doux", quantity: "2 càc", category: "" },
        { name: "Cumin", quantity: "1 càc", category: "" },
        { name: "Huile", quantity: "1 càs", category: "" },
        { name: "Sel", quantity: "", category: "" },
      ],
      steps: [
        "Couper le poulet.",
        "Émincer l’oignon.",
        "Chauffer l’huile à feu moyen.",
        "Cuire l’oignon 5 min.",
        "Ajouter poulet et curry, mélanger 30 s.",
        "Ajouter coco.",
        "Mijoter 15 min.",
        "Servir avec riz basmati.",
      ],
    },
    {
      id: "in5",
      name: "Bœuf aux épices douces",
      type: RecipeType.VIANDE,
      durationMinutes: 30,
      difficulty: "Facile",
      ingredients: [
        { name: "Bœuf émincé", quantity: "400 g", category: "" },
        { name: "Oignon", quantity: "1", category: "" },
        { name: "Cumin", quantity: "1 càc", category: "" },
        { name: "Paprika", quantity: "1 càc", category: "" },
        { name: "Garam masala", quantity: "1 càc", category: "" },
        { name: "Huile", quantity: "1 càs", category: "" },
        { name: "Sel", quantity: "", category: "" },
      ],
      steps: [
        "Émincer l’oignon.",
        "Chauffer l’huile à feu moyen-vif.",
        "Cuire le bœuf 4–5 min.",
        "Ajouter oignon et épices.",
        "Cuire 5–6 min.",
        "Servir avec riz.",
      ],
    },
    {
      id: "in6",
      name: "Riz indien parfumé",
      type: RecipeType.VEGE,
      durationMinutes: 20,
      difficulty: "Facile",
      ingredients: [
        { name: "Riz basmati", quantity: "300 g", category: "" },
        { name: "Eau", quantity: "60 cl", category: "" },
        { name: "Feuille de laurier", quantity: "1", category: "" },
        { name: "Sel", quantity: "", category: "" },
      ],
      steps: [
        "Rincer le riz.",
        "Mettre riz, eau, sel et laurier.",
        "Porter à ébullition.",
        "Couvrir et cuire 12 min à feu doux.",
        "Repos 5 min.",
        "Servir en accompagnement.",
      ],
    },
    {
      id: "in7",
      name: "Omelette indienne douce",
      type: RecipeType.VEGE,
      durationMinutes: 20,
      difficulty: "Facile",
      ingredients: [
        { name: "Œufs", quantity: "6", category: "" },
        { name: "Oignon", quantity: "1", category: "" },
        { name: "Curry doux", quantity: "1 càc", category: "" },
        { name: "Huile", quantity: "1 càs", category: "" },
        { name: "Sel", quantity: "", category: "" },
      ],
      steps: [
        "Émincer l’oignon.",
        "Battre œufs avec curry et sel.",
        "Chauffer l’huile à feu moyen.",
        "Cuire l’oignon 3 min.",
        "Ajouter œufs.",
        "Cuire 8–10 min jusqu’à prise moelleuse.",
        "Servir avec riz.",
      ],
    },
    {
      id: "in8",
      name: "Poulet tandoori poêle",
      type: RecipeType.VIANDE,
      durationMinutes: 25,
      difficulty: "Facile",
      ingredients: [
        { name: "Blanc de poulet", quantity: "400 g", category: "" },
        { name: "1 yaourt nature", quantity: "", category: "" },
        { name: "Épices tandoori", quantity: "2 càc", category: "" },
        { name: "Huile", quantity: "1 càs", category: "" },
        { name: "Sel", quantity: "", category: "" },
      ],
      steps: [
        "Mélanger yaourt, épices et sel.",
        "Enrober le poulet.",
        "Chauffer l’huile à feu moyen-vif.",
        "Cuire le poulet 10–12 min sans brûler.",
        "Servir avec riz ou crudités.",
      ],
    },
    {
      id: "in9",
      name: "Riz sauté indien aux légumes",
      type: RecipeType.VEGE,
      durationMinutes: 20,
      difficulty: "Facile",
      ingredients: [
        { name: "Riz cuit", quantity: "300 g", category: "" },
        { name: "Carotte", quantity: "1", category: "" },
        { name: "Courgette", quantity: "1", category: "" },
        { name: "Curry doux", quantity: "1 càc", category: "" },
        { name: "Huile", quantity: "1 càs", category: "" },
        { name: "Sel", quantity: "", category: "" },
      ],
      steps: [
        "Couper légumes en dés.",
        "Chauffer l’huile.",
        "Cuire légumes 5 min.",
        "Ajouter riz et curry.",
        "Mélanger 3–4 min.",
        "Servir chaud.",
      ],
    },
    {
      id: "in10",
      name: "Lentilles coco express",
      type: RecipeType.VEGE,
      durationMinutes: 25,
      difficulty: "Facile",
      ingredients: [
        { name: "Lentilles corail", quantity: "250 g", category: "" },
        { name: "Lait de coco", quantity: "40 cl", category: "" },
        { name: "Eau", quantity: "40 cl", category: "" },
        { name: "Curry doux", quantity: "1 càc", category: "" },
        { name: "Huile", quantity: "1 càs", category: "" },
        { name: "Sel", quantity: "", category: "" },
      ],
      steps: [
        "Rincer les lentilles.",
        "Chauffer l’huile à feu moyen.",
        "Ajouter curry 30 s.",
        "Ajouter lentilles, eau et coco.",
        "Cuire 20 min jusqu’à fondant.",
        "Servir avec riz.",
      ],
    },
    {
      id: "ch1",
      name: "Poulet sauté soja & gingembre",
      type: RecipeType.VIANDE,
      durationMinutes: 20,
      difficulty: "Facile",
      ingredients: [
        { name: "Blanc de poulet", quantity: "400 g", category: "" },
        { name: "Oignon", quantity: "1", category: "" },
        { name: "Gingembre râpé", quantity: "1 càs", category: "" },
        { name: "Sauce soja", quantity: "4 càs", category: "" },
        { name: "Sucre", quantity: "0,5 càc", category: "" },
        { name: "Huile", quantity: "1 càs", category: "" },
      ],
      steps: [
        "Couper le poulet en lamelles.",
        "Émincer l’oignon.",
        "Chauffer l’huile à feu moyen-vif.",
        "Cuire le poulet 5–6 min.",
        "Ajouter oignon et gingembre.",
        "Cuire 3–4 min.",
        "Ajouter soja et sucre ensemble.",
        "Mélanger 1 min.",
        "Servir avec riz.",
      ],
    },
    {
      id: "ch2",
      name: "Bœuf sauté aux oignons (cantonnais)",
      type: RecipeType.VIANDE,
      durationMinutes: 20,
      difficulty: "Facile",
      ingredients: [
        { name: "Bœuf émincé", quantity: "400 g", category: "" },
        { name: "Oignons", quantity: "2", category: "" },
        { name: "Sauce soja", quantity: "4 càs", category: "" },
        { name: "Eau", quantity: "2 càs", category: "" },
        { name: "Huile", quantity: "1 càs", category: "" },
      ],
      steps: [
        "Émincer les oignons.",
        "Chauffer l’huile à feu vif.",
        "Saisir le bœuf 3–4 min.",
        "Ajouter les oignons.",
        "Cuire 4–5 min.",
        "Ajouter soja et eau.",
        "Mélanger 1 min.",
        "Servir avec riz.",
      ],
    },
    {
      id: "ch3",
      name: "Riz cantonais simple",
      type: RecipeType.VIANDE,
      durationMinutes: 20,
      difficulty: "Facile",
      ingredients: [
        { name: "Riz cuit froid", quantity: "300 g", category: "" },
        { name: "Œufs", quantity: "3", category: "" },
        { name: "Jambon", quantity: "150 g", category: "" },
        { name: "Petits pois", quantity: "100 g", category: "" },
        { name: "Sauce soja", quantity: "3 càs", category: "" },
        { name: "Huile", quantity: "1 càs", category: "" },
      ],
      steps: [
        "Chauffer l’huile à feu moyen-vif.",
        "Ajouter le riz, chauffer 2–3 min.",
        "Pousser le riz sur le côté.",
        "Ajouter les œufs, cuire jusqu’à pris mais moelleux.",
        "Ajouter jambon et petits pois.",
        "Mélanger 2–3 min.",
        "Ajouter la sauce soja.",
        "Mélanger 1 min.",
        "Servir immédiatement.",
      ],
    },
    {
      id: "ch4",
      name: "Nouilles sautées au poulet",
      type: RecipeType.VIANDE,
      durationMinutes: 25,
      difficulty: "Facile",
      ingredients: [
        { name: "Nouilles chinoises", quantity: "300 g", category: "" },
        { name: "Poulet", quantity: "300 g", category: "" },
        { name: "Carotte", quantity: "1", category: "" },
        { name: "Sauce soja", quantity: "4 càs", category: "" },
        { name: "Huile", quantity: "1 càs", category: "" },
      ],
      steps: [
        "Cuire les nouilles, égoutter.",
        "Couper poulet et carotte en lamelles.",
        "Chauffer l’huile à feu moyen-vif.",
        "Cuire le poulet 5 min.",
        "Ajouter la carotte.",
        "Cuire 3–4 min.",
        "Ajouter nouilles et soja.",
        "Ajouter 1–2 càs d’eau si sec.",
        "Mélanger 2–3 min.",
        "Servir chaud.",
      ],
    },
    {
      id: "ch5",
      name: "Porc caramélisé express",
      type: RecipeType.VIANDE,
      durationMinutes: 25,
      difficulty: "Facile",
      ingredients: [
        { name: "Porc émincé", quantity: "400 g", category: "" },
        { name: "Sauce soja", quantity: "3 càs", category: "" },
        { name: "Miel", quantity: "1 càs", category: "" },
        { name: "Huile", quantity: "1 càs", category: "" },
      ],
      steps: [
        "Chauffer l’huile à feu moyen-vif.",
        "Cuire le porc 6–7 min jusqu’à doré.",
        "Ajouter soja et miel.",
        "Mélanger 2–3 min jusqu’à nappant.",
        "Servir avec riz.",
      ],
    },
    {
      id: "ch6",
      name: "Poulet citron doux",
      type: RecipeType.VIANDE,
      durationMinutes: 25,
      difficulty: "Facile",
      ingredients: [
        { name: "Poulet", quantity: "400 g", category: "" },
        { name: "Citron (jus)", quantity: "1", category: "" },
        { name: "Sauce soja", quantity: "3 càs", category: "" },
        { name: "Sucre", quantity: "1 càs", category: "" },
        { name: "Huile", quantity: "1 càs", category: "" },
      ],
      steps: [
        "Couper le poulet.",
        "Chauffer l’huile à feu moyen-vif.",
        "Cuire le poulet 6–7 min.",
        "Ajouter citron et soja.",
        "Ajouter le sucre progressivement.",
        "Mélanger 2–3 min.",
        "Servir avec riz.",
      ],
    },
    {
      id: "ch7",
      name: "Légumes sautés sauce soja",
      type: RecipeType.VEGE,
      durationMinutes: 20,
      difficulty: "Facile",
      ingredients: [
        { name: "Brocoli", quantity: "1", category: "" },
        { name: "Carottes", quantity: "2", category: "" },
        { name: "Sauce soja", quantity: "4 càs", category: "" },
        { name: "Huile", quantity: "1 càs", category: "" },
      ],
      steps: [
        "Couper les légumes.",
        "Chauffer l’huile à feu moyen-vif.",
        "Cuire les légumes 6–7 min jusqu’à croquants.",
        "Ajouter la sauce soja.",
        "Mélanger 1 min.",
        "Servir avec riz ou nouilles.",
      ],
    },
    {
      id: "ch8",
      name: "Bœuf aux légumes croquants",
      type: RecipeType.VIANDE,
      durationMinutes: 25,
      difficulty: "Facile",
      ingredients: [
        { name: "Bœuf", quantity: "400 g", category: "" },
        { name: "Poivron", quantity: "1", category: "" },
        { name: "Courgette", quantity: "1", category: "" },
        { name: "Sauce soja", quantity: "4 càs", category: "" },
        { name: "Huile", quantity: "1 càs", category: "" },
        { name: "Huile de sésame", quantity: "", category: "" },
      ],
      steps: [
        "Couper les légumes en lamelles.",
        "Chauffer l’huile à feu vif.",
        "Cuire le bœuf 3–4 min.",
        "Ajouter les légumes.",
        "Cuire 4–5 min.",
        "Ajouter la sauce soja.",
        "Mélanger 1 min.",
        "Ajouter l’huile de sésame hors feu.",
        "Servir avec riz.",
      ],
    },
    {
      id: "ch9",
      name: "Omelette chinoise aux légumes",
      type: RecipeType.VEGE,
      durationMinutes: 20,
      difficulty: "Facile",
      ingredients: [
        { name: "Œufs", quantity: "6", category: "" },
        { name: "Carotte", quantity: "1", category: "" },
        { name: "Sauce soja", quantity: "2 càs", category: "" },
        { name: "Huile", quantity: "1 càs", category: "" },
        { name: "Poivre", quantity: "", category: "" },
      ],
      steps: [
        "Râper la carotte.",
        "Battre les œufs avec soja.",
        "Chauffer l’huile à feu moyen.",
        "Cuire la carotte 2 min.",
        "Ajouter les œufs.",
        "Cuire 8–10 min jusqu’à prise moelleuse.",
        "Poivrer et servir avec riz.",
      ],
    },
    {
      id: "ch10",
      name: "Soupe chinoise poulet & nouilles",
      type: RecipeType.VIANDE,
      durationMinutes: 25,
      difficulty: "Facile",
      ingredients: [
        { name: "Poulet", quantity: "300 g", category: "" },
        { name: "Nouilles", quantity: "80 g", category: "" },
        { name: "Cube bouillon", quantity: "1", category: "" },
        { name: "Eau", quantity: "80 cl", category: "" },
        { name: "Sauce soja", quantity: "2 càs", category: "" },
      ],
      steps: [
        "Porter eau et bouillon à frémissement.",
        "Ajouter le poulet en lamelles.",
        "Cuire 5 min.",
        "Ajouter les nouilles.",
        "Cuire 5 min.",
        "Ajouter la sauce soja.",
        "Servir bien chaud.",
      ],
    },
    {
      id: "ko1",
      name: "Bœuf bulgogi simplifié",
      type: RecipeType.VIANDE,
      durationMinutes: 25,
      difficulty: "Facile",
      ingredients: [
        { name: "Bœuf émincé", quantity: "400 g", category: "" },
        { name: "Oignon", quantity: "1", category: "" },
        { name: "Sauce soja", quantity: "3 càs", category: "" },
        { name: "Sucre", quantity: "1 càs", category: "" },
        { name: "Huile", quantity: "1 càs", category: "" },
        { name: "Ail", quantity: "1 gousse", category: "" },
        { name: "Huile de sésame", quantity: "", category: "" },
      ],
      steps: [
        "Émincer l’oignon, hacher l’ail.",
        "Chauffer l’huile à feu moyen-vif.",
        "Cuire le bœuf 4–5 min.",
        "Ajouter oignon et ail.",
        "Cuire 3–4 min.",
        "Ajouter soja et sucre.",
        "Mélanger 1–2 min.",
        "Ajouter huile de sésame hors feu.",
        "Servir avec riz.",
      ],
    },
    {
      id: "ko2",
      name: "Poulet coréen doux au gochujang",
      type: RecipeType.VIANDE,
      durationMinutes: 25,
      difficulty: "Facile",
      ingredients: [
        { name: "Poulet", quantity: "400 g", category: "" },
        { name: "Gochujang", quantity: "1 càs", category: "" },
        { name: "Sauce soja", quantity: "3 càs", category: "" },
        { name: "Miel", quantity: "1 càs", category: "" },
        { name: "Huile", quantity: "1 càs", category: "" },
      ],
      steps: [
        "Couper le poulet.",
        "Chauffer l’huile à feu moyen.",
        "Cuire le poulet 5–6 min.",
        "Ajouter gochujang, soja et miel.",
        "Ajouter 1 càs d’eau si trop épais.",
        "Mélanger 2–3 min.",
        "Servir avec riz.",
      ],
    },
    {
      id: "ko3",
      name: "Riz sauté coréen aux œufs",
      type: RecipeType.VEGE,
      durationMinutes: 20,
      difficulty: "Facile",
      ingredients: [
        { name: "Riz cuit froid", quantity: "300 g", category: "" },
        { name: "Œufs", quantity: "3", category: "" },
        { name: "Sauce soja", quantity: "2 càs", category: "" },
        { name: "Huile", quantity: "1 càs", category: "" },
        { name: "Huile de sésame", quantity: "", category: "" },
      ],
      steps: [
        "Chauffer l’huile à feu moyen-vif.",
        "Ajouter le riz, chauffer 2–3 min.",
        "Pousser le riz sur le côté.",
        "Ajouter les œufs, cuire jusqu’à pris mais moelleux.",
        "Mélanger riz et œufs.",
        "Ajouter soja et huile de sésame.",
        "Mélanger 1 min.",
        "Servir immédiatement.",
      ],
    },
    {
      id: "ko4",
      name: "Nouilles coréennes sautées au bœuf",
      type: RecipeType.VIANDE,
      durationMinutes: 25,
      difficulty: "Facile",
      ingredients: [
        { name: "Nouilles", quantity: "300 g", category: "" },
        { name: "Bœuf", quantity: "300 g", category: "" },
        { name: "Carotte", quantity: "1", category: "" },
        { name: "Sauce soja", quantity: "3 càs", category: "" },
        { name: "Huile", quantity: "1 càs", category: "" },
      ],
      steps: [
        "Cuire les nouilles, égoutter.",
        "Couper bœuf et carotte en lamelles.",
        "Chauffer l’huile à feu moyen-vif.",
        "Cuire le bœuf 4–5 min.",
        "Ajouter la carotte.",
        "Cuire 3–4 min.",
        "Ajouter nouilles et soja.",
        "Ajouter 1–2 càs d’eau si sec.",
        "Mélanger 2–3 min.",
        "Servir chaud.",
      ],
    },
    {
      id: "ko5",
      name: "Porc sauté coréen doux",
      type: RecipeType.VIANDE,
      durationMinutes: 25,
      difficulty: "Facile",
      ingredients: [
        { name: "Porc", quantity: "400 g", category: "" },
        { name: "Gochujang", quantity: "1 càs", category: "" },
        { name: "Sauce soja", quantity: "3 càs", category: "" },
        { name: "Sucre", quantity: "1 càs", category: "" },
        { name: "Huile", quantity: "1 càs", category: "" },
      ],
      steps: [
        "Chauffer l’huile à feu moyen-vif.",
        "Cuire le porc 6–7 min jusqu’à doré.",
        "Ajouter gochujang, soja et sucre.",
        "Mélanger 2–3 min.",
        "Servir avec riz.",
      ],
    },
    {
      id: "ko6",
      name: "Poulet ail & miel",
      type: RecipeType.VIANDE,
      durationMinutes: 25,
      difficulty: "Facile",
      ingredients: [
        { name: "Poulet", quantity: "400 g", category: "" },
        { name: "Ail", quantity: "2 gousses", category: "" },
        { name: "Miel", quantity: "2 càs", category: "" },
        { name: "Sauce soja", quantity: "3 càs", category: "" },
        { name: "Huile", quantity: "1 càs", category: "" },
        { name: "Huile de sésame", quantity: "", category: "" },
      ],
      steps: [
        "Hacher l’ail.",
        "Chauffer l’huile à feu moyen.",
        "Cuire le poulet 5–6 min.",
        "Ajouter ail, miel et soja.",
        "Mélanger 2–3 min.",
        "Ajouter huile de sésame hors feu.",
        "Servir avec riz.",
      ],
    },
    {
      id: "ko7",
      name: "Omelette coréenne aux légumes",
      type: RecipeType.VEGE,
      durationMinutes: 20,
      difficulty: "Facile",
      ingredients: [
        { name: "Œufs", quantity: "6", category: "" },
        { name: "Carotte", quantity: "1", category: "" },
        { name: "Sauce soja", quantity: "2 càs", category: "" },
        { name: "Huile", quantity: "1 càs", category: "" },
        { name: "Poivre", quantity: "", category: "" },
      ],
      steps: [
        "Râper la carotte.",
        "Battre les œufs avec soja.",
        "Chauffer l’huile à feu moyen.",
        "Cuire la carotte 2 min.",
        "Ajouter les œufs.",
        "Cuire 8–10 min jusqu’à prise moelleuse.",
        "Poivrer et servir avec riz.",
      ],
    },
    {
      id: "ko8",
      name: "Bœuf coréen aux légumes croquants",
      type: RecipeType.VIANDE,
      durationMinutes: 25,
      difficulty: "Facile",
      ingredients: [
        { name: "Bœuf", quantity: "400 g", category: "" },
        { name: "Poivron", quantity: "1", category: "" },
        { name: "Courgette", quantity: "1", category: "" },
        { name: "Sauce soja", quantity: "3 càs", category: "" },
        { name: "Huile", quantity: "1 càs", category: "" },
        { name: "Huile de sésame", quantity: "", category: "" },
      ],
      steps: [
        "Couper légumes en lamelles.",
        "Chauffer l’huile à feu vif.",
        "Cuire le bœuf 3–4 min.",
        "Ajouter les légumes.",
        "Cuire 4–5 min.",
        "Ajouter la sauce soja.",
        "Mélanger 1 min.",
        "Ajouter huile de sésame hors feu.",
        "Servir avec riz.",
      ],
    },
    {
      id: "ko9",
      name: "Soupe coréenne poulet & nouilles",
      type: RecipeType.VIANDE,
      durationMinutes: 25,
      difficulty: "Facile",
      ingredients: [
        { name: "Poulet", quantity: "300 g", category: "" },
        { name: "Nouilles", quantity: "80 g", category: "" },
        { name: "Cube bouillon", quantity: "1", category: "" },
        { name: "Eau", quantity: "80 cl", category: "" },
        { name: "Sauce soja", quantity: "2 càs", category: "" },
      ],
      steps: [
        "Porter eau et bouillon à frémissement.",
        "Ajouter le poulet en lamelles.",
        "Cuire 5 min.",
        "Ajouter les nouilles.",
        "Cuire 5 min.",
        "Ajouter la sauce soja.",
        "Servir bien chaud.",
      ],
    },
    {
      id: "ko10",
      name: "Riz coréen sauté au sésame",
      type: RecipeType.VEGE,
      durationMinutes: 20,
      difficulty: "Facile",
      ingredients: [
        { name: "Riz cuit froid", quantity: "300 g", category: "" },
        { name: "Sauce soja", quantity: "3 càs", category: "" },
        { name: "Huile", quantity: "1 càs", category: "" },
        { name: "Graines de sésame", quantity: "", category: "" },
        { name: "Huile de sésame", quantity: "", category: "" },
      ],
      steps: [
        "Chauffer l’huile à feu moyen-vif.",
        "Ajouter le riz, chauffer 3 min.",
        "Ajouter la sauce soja.",
        "Mélanger 1–2 min.",
        "Ajouter graines et huile de sésame.",
        "Servir immédiatement.",
      ],
    },
    {
      id: "md1",
      name: "Poulet citron–origan & pommes de terre (four)",
      type: RecipeType.VIANDE,
      durationMinutes: 45,
      difficulty: "Facile",
      ingredients: [
        { name: "Hauts de cuisse de poulet (ou filets)", quantity: "600 g", category: "" },
        { name: "Pommes de terre chair ferme", quantity: "600 g", category: "" },
        { name: "Citron (jus + zeste)", quantity: "1", category: "" },
        { name: "Ail", quantity: "2 gousses", category: "" },
        { name: "Huile d’olive", quantity: "2 càs", category: "" },
        { name: "Origan", quantity: "1 càc", category: "" },
        { name: "Sel, poivre", quantity: "", category: "" },
      ],
      steps: [
        "Préchauffer le four à 220°C.",
        "Couper les pommes de terre chair ferme en quartiers.",
        "Mélanger pommes de terre, huile, ail, origan, sel.",
        "Ajouter le poulet, zeste et jus de citron.",
        "Enfourner 35–40 min, jusqu’à poulet doré.",
        "Servir avec salade verte (optionnel).",
      ],
    },
    {
      id: "md2",
      name: "Pois chiches à la tomate, épinards & feta (express)",
      type: RecipeType.VEGE,
      durationMinutes: 25,
      difficulty: "Facile",
      ingredients: [
        { name: "Pois chiches cuits (égouttés)", quantity: "500 g", category: "" },
        { name: "Tomates concassées", quantity: "1 boîte", category: "" },
        { name: "Épinards", quantity: "150 g", category: "" },
        { name: "Feta", quantity: "120 g", category: "" },
        { name: "Oignon", quantity: "1", category: "" },
        { name: "Huile d’olive", quantity: "1 càs", category: "" },
        { name: "Paprika doux", quantity: "1 càc", category: "" },
        { name: "Sel, poivre", quantity: "", category: "" },
      ],
      steps: [
        "Émincer l’oignon.",
        "Chauffer l’huile à feu moyen.",
        "Cuire l’oignon 4 min.",
        "Ajouter paprika, mélanger 30 s.",
        "Ajouter tomates et pois chiches.",
        "Mijoter 10 min.",
        "Ajouter épinards 2–3 min.",
        "Ajouter feta émiettée hors feu.",
        "Servir avec pain ou riz (optionnel).",
      ],
    },
    {
      id: "md3",
      name: "Saumon au zaatar & yaourt citron (poêle)",
      type: RecipeType.POISSON,
      durationMinutes: 25,
      difficulty: "Facile",
      ingredients: [
        { name: "Pavés de saumon", quantity: "450 g", category: "" },
        { name: "Yaourt grec", quantity: "2 càs", category: "" },
        { name: "Citron (jus)", quantity: "1", category: "" },
        { name: "Zaatar", quantity: "1 càc", category: "" },
        { name: "Huile d’olive", quantity: "1 càs", category: "" },
        { name: "Sel, poivre", quantity: "", category: "" },
      ],
      steps: [
        "Mélanger yaourt, citron, sel.",
        "Assaisonner le saumon avec zaatar, sel.",
        "Chauffer l’huile à feu moyen-vif.",
        "Cuire le saumon 3–4 min par face.",
        "Servir avec le yaourt citron.",
        "Servir avec légumes vapeur ou salade (optionnel).",
      ],
    },
    {
      id: "md4",
      name: "Pâtes tomate–thon–câpres (15 min)",
      type: RecipeType.POISSON,
      durationMinutes: 20,
      difficulty: "Facile",
      ingredients: [
        { name: "Pâtes", quantity: "300 g", category: "" },
        { name: "Thon (160–200 g égoutté)", quantity: "1 boîte", category: "" },
        { name: "Tomates concassées", quantity: "1 boîte", category: "" },
        { name: "Câpres", quantity: "1 càs", category: "" },
        { name: "Huile d’olive", quantity: "2 càs", category: "" },
        { name: "Ail", quantity: "1 gousse", category: "" },
        { name: "Sel, poivre", quantity: "", category: "" },
      ],
      steps: [
        "Cuire les pâtes al dente, égoutter.",
        "Chauffer l’huile à feu moyen.",
        "Cuire l’ail 30 s sans brunir.",
        "Ajouter tomates, mijoter 6–7 min.",
        "Ajouter thon et câpres.",
        "Mélanger 1–2 min.",
        "Mélanger avec les pâtes.",
        "Servir avec salade (optionnel).",
      ],
    },
    {
      id: "md5",
      name: "Boulettes d’agneau cumin–menthe (poêle)",
      type: RecipeType.VIANDE,
      durationMinutes: 30,
      difficulty: "Facile",
      ingredients: [
        { name: "Agneau haché", quantity: "450 g", category: "" },
        { name: "Oignon", quantity: "1", category: "" },
        { name: "Cumin", quantity: "1 càc", category: "" },
        { name: "Paprika", quantity: "1 càc", category: "" },
        { name: "Menthe", quantity: "1 poignée", category: "" },
        { name: "Huile d’olive", quantity: "1 càs", category: "" },
        { name: "Sel, poivre", quantity: "", category: "" },
      ],
      steps: [
        "Émincer très fin l’oignon, hacher la menthe.",
        "Mélanger agneau, oignon, épices, sel.",
        "Former 12 boulettes.",
        "Chauffer l’huile à feu moyen.",
        "Cuire 8–10 min en retournant.",
        "Servir avec yaourt nature et crudités (optionnel).",
      ],
    },
    {
      id: "md6",
      name: "Aubergines rôties tahini–citron (four)",
      type: RecipeType.VEGE,
      durationMinutes: 40,
      difficulty: "Facile",
      ingredients: [
        { name: "Aubergines", quantity: "2", category: "" },
        { name: "Tahini", quantity: "3 càs", category: "" },
        { name: "Citron (jus)", quantity: "1", category: "" },
        { name: "Ail", quantity: "1 gousse", category: "" },
        { name: "Huile d’olive", quantity: "2 càs", category: "" },
        { name: "Sel, poivre", quantity: "", category: "" },
      ],
      steps: [
        "Préchauffer le four à 220°C.",
        "Couper les aubergines en deux.",
        "Quadriller la chair, saler.",
        "Arroser d’huile.",
        "Rôtir 30–35 min jusqu’à fondant.",
        "Mélanger tahini, citron, ail, sel.",
        "Napper et servir.",
        "Servir avec pain ou riz (optionnel).",
      ],
    },
    {
      id: "md7",
      name: "Poulet paprika fumé & poivrons (one-pan)",
      type: RecipeType.VIANDE,
      durationMinutes: 30,
      difficulty: "Facile",
      ingredients: [
        { name: "Blanc de poulet", quantity: "500 g", category: "" },
        { name: "Poivrons", quantity: "2", category: "" },
        { name: "Oignon", quantity: "1", category: "" },
        { name: "Paprika fumé", quantity: "1 càc", category: "" },
        { name: "Huile d’olive", quantity: "2 càs", category: "" },
        { name: "Sel, poivre", quantity: "", category: "" },
      ],
      steps: [
        "Couper poulet en lanières.",
        "Couper poivrons et oignon en lamelles.",
        "Chauffer l’huile à feu moyen-vif.",
        "Cuire le poulet 5–6 min.",
        "Ajouter légumes et paprika.",
        "Cuire 8–10 min.",
        "Ajuster sel.",
        "Servir avec riz ou pommes de terre (optionnel).",
      ],
    },
    {
      id: "md8",
      name: "Salade grecque complète (version dîner)",
      type: RecipeType.VEGE,
      durationMinutes: 20,
      difficulty: "Facile",
      ingredients: [
        { name: "Tomates", quantity: "3", category: "" },
        { name: "Concombre", quantity: "1", category: "" },
        { name: "Oignon rouge", quantity: "1", category: "" },
        { name: "Feta", quantity: "150 g", category: "" },
        { name: "Olives", quantity: "80 g", category: "" },
        { name: "Huile d’olive", quantity: "2 càs", category: "" },
        { name: "Jus de citron", quantity: "1 càs", category: "" },
        { name: "Sel, poivre", quantity: "", category: "" },
      ],
      steps: [
        "Couper tomates et concombre en dés.",
        "Émincer l’oignon rouge.",
        "Mélanger légumes, olives.",
        "Ajouter feta en cubes.",
        "Assaisonner huile, citron, sel.",
        "Mélanger.",
        "Servir avec pain (optionnel).",
      ],
    },
    {
      id: "md9",
      name: "Crevettes ail–citron & persil (poêle)",
      type: RecipeType.VEGE,
      durationMinutes: 20,
      difficulty: "Facile",
      ingredients: [
        { name: "Crevettes décortiquées", quantity: "450 g", category: "" },
        { name: "Ail", quantity: "2 gousses", category: "" },
        { name: "Citron (jus)", quantity: "1", category: "" },
        { name: "Persil", quantity: "1 poignée", category: "" },
        { name: "Huile d’olive", quantity: "2 càs", category: "" },
        { name: "Sel, poivre", quantity: "", category: "" },
      ],
      steps: [
        "Hacher l’ail et le persil.",
        "Chauffer l’huile à feu moyen-vif.",
        "Cuire l’ail 30 s.",
        "Ajouter crevettes, cuire 3–4 min.",
        "Ajouter citron et persil.",
        "Mélanger 30 s.",
        "Servir avec riz ou pâtes (optionnel).",
      ],
    },
    {
      id: "md10",
      name: "Shakshuka express (œufs tomate–poivron)",
      type: RecipeType.VEGE,
      durationMinutes: 25,
      difficulty: "Facile",
      ingredients: [
        { name: "Œufs", quantity: "6", category: "" },
        { name: "Tomates concassées", quantity: "1 boîte", category: "" },
        { name: "Poivron", quantity: "1", category: "" },
        { name: "Oignon", quantity: "1", category: "" },
        { name: "Paprika", quantity: "1 càc", category: "" },
        { name: "Huile d’olive", quantity: "2 càs", category: "" },
        { name: "Sel, poivre", quantity: "", category: "" },
      ],
      steps: [
        "Émincer oignon, couper poivron en dés.",
        "Chauffer l’huile à feu moyen.",
        "Cuire oignon et poivron 6–7 min.",
        "Ajouter tomates et paprika.",
        "Mijoter 8–10 min.",
        "Faire 6 creux, casser les œufs.",
        "Cuire 6–8 min jusqu’à blancs pris.",
        "Servir avec pain (optionnel).",
      ],
    },
    {
      id: "sp1",
      name: "Poulet citron & légumes verts",
      type: RecipeType.VIANDE,
      durationMinutes: 25,
      difficulty: "Facile",
      ingredients: [
        { name: "Blanc de poulet", quantity: "400 g", category: "" },
        { name: "Haricots verts", quantity: "200 g", category: "" },
        { name: "Courgette", quantity: "1", category: "" },
        { name: "Citron (jus)", quantity: "1", category: "" },
        { name: "Huile d’olive", quantity: "2 càs", category: "" },
        { name: "Sel, poivre", quantity: "", category: "" },
      ],
      steps: [
        "Couper le poulet en lanières.",
        "Couper la courgette.",
        "Chauffer l’huile à feu moyen-vif.",
        "Cuire le poulet 5–6 min.",
        "Ajouter courgette et haricots.",
        "Cuire 6–7 min.",
        "Ajouter citron.",
        "Mélanger 30 s.",
        "Servir tel quel ou avec riz.",
      ],
    },
    {
      id: "sp2",
      name: "Saumon poêlé & sauce yaourt citron",
      type: RecipeType.POISSON,
      durationMinutes: 20,
      difficulty: "Facile",
      ingredients: [
        { name: "Saumon", quantity: "450 g", category: "" },
        { name: "Yaourt grec", quantity: "1", category: "" },
        { name: "Citron (jus)", quantity: "1", category: "" },
        { name: "Huile d’olive", quantity: "1 càs", category: "" },
        { name: "Sel, poivre", quantity: "", category: "" },
      ],
      steps: [
        "Mélanger yaourt, citron.",
        "Chauffer l’huile à feu moyen-vif.",
        "Cuire le saumon 3–4 min par face.",
        "Saler, poivrer.",
        "Servir nappé de sauce.",
        "Accompagner de légumes ou salade.",
      ],
    },
    {
      id: "sp3",
      name: "Omelette asperges & feta",
      type: RecipeType.VEGE,
      durationMinutes: 20,
      difficulty: "Facile",
      ingredients: [
        { name: "Œufs", quantity: "6", category: "" },
        { name: "Asperges vertes", quantity: "200 g", category: "" },
        { name: "Feta", quantity: "120 g", category: "" },
        { name: "Huile d’olive", quantity: "1 càs", category: "" },
        { name: "Sel, poivre", quantity: "", category: "" },
      ],
      steps: [
        "Couper les asperges.",
        "Chauffer l’huile à feu moyen.",
        "Cuire asperges 4–5 min.",
        "Battre les œufs.",
        "Ajouter œufs et feta.",
        "Cuire 8–10 min à feu doux.",
        "Servir avec salade.",
      ],
    },
    {
      id: "sp4",
      name: "Pâtes courgette, citron & parmesan",
      type: RecipeType.VEGE,
      durationMinutes: 25,
      difficulty: "Facile",
      ingredients: [
        { name: "Pâtes", quantity: "300 g", category: "" },
        { name: "Courgettes", quantity: "2", category: "" },
        { name: "Citron (zeste + jus)", quantity: "1", category: "" },
        { name: "Parmesan", quantity: "60 g", category: "" },
        { name: "Huile d’olive", quantity: "2 càs", category: "" },
        { name: "Sel, poivre", quantity: "", category: "" },
      ],
      steps: [
        "Cuire pâtes al dente.",
        "Couper courgettes.",
        "Chauffer l’huile.",
        "Cuire courgettes 6–7 min.",
        "Ajouter pâtes, citron, parmesan.",
        "Mélanger 1–2 min.",
        "Servir.",
      ],
    },
    {
      id: "sp5",
      name: "Bœuf & petits pois à la menthe",
      type: RecipeType.VIANDE,
      durationMinutes: 25,
      difficulty: "Facile",
      ingredients: [
        { name: "Bœuf émincé", quantity: "400 g", category: "" },
        { name: "Petits pois", quantity: "200 g", category: "" },
        { name: "Menthe", quantity: "", category: "" },
        { name: "Huile d’olive", quantity: "1 càs", category: "" },
        { name: "Sel, poivre", quantity: "", category: "" },
      ],
      steps: [
        "Chauffer l’huile.",
        "Cuire bœuf 4–5 min.",
        "Ajouter petits pois.",
        "Cuire 4–5 min.",
        "Ajouter menthe.",
        "Mélanger 30 s.",
        "Servir avec riz.",
      ],
    },
    {
      id: "sp6",
      name: "Pois chiches tomate & épinards",
      type: RecipeType.VEGE,
      durationMinutes: 25,
      difficulty: "Facile",
      ingredients: [
        { name: "Pois chiches", quantity: "500 g", category: "" },
        { name: "Tomates concassées", quantity: "1 boîte", category: "" },
        { name: "Épinards", quantity: "150 g", category: "" },
        { name: "Oignon", quantity: "1", category: "" },
        { name: "Huile d’olive", quantity: "1 càs", category: "" },
        { name: "Sel, poivre", quantity: "", category: "" },
      ],
      steps: [
        "Émincer l’oignon.",
        "Chauffer l’huile.",
        "Cuire l’oignon 4–5 min.",
        "Ajouter tomates et pois chiches.",
        "Mijoter 10 min.",
        "Ajouter épinards 2–3 min.",
        "Servir avec pain ou riz.",
      ],
    },
    {
      id: "sp7",
      name: "Dinde citron & herbes",
      type: RecipeType.VIANDE,
      durationMinutes: 20,
      difficulty: "Facile",
      ingredients: [
        { name: "Filets de dinde", quantity: "450 g", category: "" },
        { name: "Citron (jus)", quantity: "1", category: "" },
        { name: "Herbes de Provence", quantity: "", category: "" },
        { name: "Huile d’olive", quantity: "1 càs", category: "" },
        { name: "Sel, poivre", quantity: "", category: "" },
      ],
      steps: [
        "Chauffer l’huile.",
        "Cuire la dinde 4–5 min par face.",
        "Ajouter citron et herbes.",
        "Mélanger 30 s.",
        "Servir avec légumes.",
      ],
    },
    {
      id: "sp8",
      name: "Riz sauté printanier",
      type: RecipeType.VEGE,
      durationMinutes: 20,
      difficulty: "Facile",
      ingredients: [
        { name: "Riz cuit", quantity: "300 g", category: "" },
        { name: "Carotte", quantity: "1", category: "" },
        { name: "Courgette", quantity: "1", category: "" },
        { name: "Œufs", quantity: "2", category: "" },
        { name: "Huile", quantity: "1 càs", category: "" },
        { name: "Sel, poivre", quantity: "", category: "" },
      ],
      steps: [
        "Couper légumes en dés.",
        "Chauffer l’huile.",
        "Cuire légumes 5–6 min.",
        "Ajouter riz.",
        "Mélanger 2–3 min.",
        "Ajouter œufs battus.",
        "Cuire jusqu’à pris.",
        "Servir.",
      ],
    },
    {
      id: "sp9",
      name: "Poisson blanc vapeur citron",
      type: RecipeType.POISSON,
      durationMinutes: 20,
      difficulty: "Facile",
      ingredients: [
        { name: "Poisson blanc", quantity: "450 g", category: "" },
        { name: "Citron (jus)", quantity: "1", category: "" },
        { name: "Huile d’olive", quantity: "1 càs", category: "" },
        { name: "Sel, poivre", quantity: "", category: "" },
      ],
      steps: [
        "Cuire le poisson vapeur 8–10 min.",
        "Mélanger citron et huile.",
        "Napper le poisson.",
        "Servir avec légumes.",
      ],
    },
    {
      id: "sp10",
      name: "Shakshuka verte épinards",
      type: RecipeType.VEGE,
      durationMinutes: 25,
      difficulty: "Facile",
      ingredients: [
        { name: "Œufs", quantity: "6", category: "" },
        { name: "Épinards", quantity: "200 g", category: "" },
        { name: "Oignon", quantity: "1", category: "" },
        { name: "Cumin", quantity: "1 càc", category: "" },
        { name: "Huile d’olive", quantity: "2 càs", category: "" },
        { name: "Sel, poivre", quantity: "", category: "" },
      ],
      steps: [
        "Émincer l’oignon.",
        "Chauffer l’huile.",
        "Cuire l’oignon 4–5 min.",
        "Ajouter épinards et cumin.",
        "Cuire 3–4 min.",
        "Ajouter œufs.",
        "Cuire 6–8 min.",
        "Servir avec pain.",
      ],
    },
    {
      id: "se1",
      name: "Poulet grillé citron & herbes",
      type: RecipeType.VIANDE,
      durationMinutes: 25,
      difficulty: "Facile",
      ingredients: [
        { name: "Blanc de poulet", quantity: "450 g", category: "" },
        { name: "Citron (jus)", quantity: "1", category: "" },
        { name: "Herbes de Provence", quantity: "", category: "" },
        { name: "Huile d’olive", quantity: "2 càs", category: "" },
        { name: "Sel, poivre", quantity: "", category: "" },
      ],
      steps: [
        "Chauffer l’huile à feu moyen-vif.",
        "Cuire le poulet 5–6 min par face.",
        "Ajouter citron et herbes.",
        "Mélanger 30 s.",
        "Servir avec salade ou riz.",
      ],
    },
    {
      id: "se2",
      name: "Salade de pâtes thon & tomates",
      type: RecipeType.POISSON,
      durationMinutes: 20,
      difficulty: "Facile",
      ingredients: [
        { name: "Pâtes", quantity: "300 g", category: "" },
        { name: "Thon", quantity: "1 boîte", category: "" },
        { name: "Tomates cerises", quantity: "250 g", category: "" },
        { name: "Huile d’olive", quantity: "2 càs", category: "" },
        { name: "Sel, poivre", quantity: "", category: "" },
      ],
      steps: [
        "Cuire pâtes, refroidir.",
        "Couper tomates.",
        "Mélanger pâtes, thon et tomates.",
        "Ajouter huile, sel, poivre.",
        "Servir frais.",
      ],
    },
    {
      id: "se3",
      name: "Poivrons farcis express (four)",
      type: RecipeType.VIANDE,
      durationMinutes: 40,
      difficulty: "Facile",
      ingredients: [
        { name: "Poivrons", quantity: "3", category: "" },
        { name: "Bœuf haché", quantity: "400 g", category: "" },
        { name: "Oignon", quantity: "1", category: "" },
        { name: "Huile d’olive", quantity: "2 càs", category: "" },
        { name: "Sel, poivre", quantity: "", category: "" },
      ],
      steps: [
        "Préchauffer four à 200°C.",
        "Couper poivrons.",
        "Mélanger bœuf et oignon.",
        "Farcir les poivrons.",
        "Enfourner 30–35 min.",
        "Servir avec salade.",
      ],
    },
    {
      id: "se4",
      name: "Saumon grillé & salade concombre",
      type: RecipeType.POISSON,
      durationMinutes: 20,
      difficulty: "Facile",
      ingredients: [
        { name: "Saumon", quantity: "450 g", category: "" },
        { name: "Concombre", quantity: "1", category: "" },
        { name: "Jus de citron", quantity: "1 càs", category: "" },
        { name: "Huile d’olive", quantity: "1 càs", category: "" },
        { name: "Sel, poivre", quantity: "", category: "" },
      ],
      steps: [
        "Cuire saumon 3–4 min par face.",
        "Couper concombre.",
        "Assaisonner citron et huile.",
        "Servir ensemble.",
      ],
    },
    {
      id: "se5",
      name: "Omelette estivale courgette & fromage",
      type: RecipeType.VEGE,
      durationMinutes: 20,
      difficulty: "Facile",
      ingredients: [
        { name: "Œufs", quantity: "6", category: "" },
        { name: "Courgette", quantity: "1", category: "" },
        { name: "Fromage râpé", quantity: "100 g", category: "" },
        { name: "Huile", quantity: "1 càs", category: "" },
        { name: "Sel, poivre", quantity: "", category: "" },
      ],
      steps: [
        "Couper courgette.",
        "Chauffer huile.",
        "Cuire courgette 4–5 min.",
        "Ajouter œufs battus et fromage.",
        "Cuire 8–10 min.",
        "Servir avec salade.",
      ],
    },
    {
      id: "se6",
      name: "Boulettes de bœuf & sauce tomate légère",
      type: RecipeType.VIANDE,
      durationMinutes: 30,
      difficulty: "Facile",
      ingredients: [
        { name: "Bœuf haché", quantity: "450 g", category: "" },
        { name: "Tomates concassées", quantity: "1 boîte", category: "" },
        { name: "Oignon", quantity: "1", category: "" },
        { name: "Huile d’olive", quantity: "1 càs", category: "" },
        { name: "Sel, poivre", quantity: "", category: "" },
      ],
      steps: [
        "Former boulettes.",
        "Chauffer huile.",
        "Dorer boulettes 6–7 min.",
        "Ajouter oignon et tomates.",
        "Mijoter 15 min.",
        "Servir avec pâtes ou riz.",
      ],
    },
    {
      id: "se7",
      name: "Crevettes citron & persil",
      type: RecipeType.VEGE,
      durationMinutes: 20,
      difficulty: "Facile",
      ingredients: [
        { name: "Crevettes décortiquées", quantity: "450 g", category: "" },
        { name: "Citron (jus)", quantity: "1", category: "" },
        { name: "Persil", quantity: "", category: "" },
        { name: "Huile d’olive", quantity: "2 càs", category: "" },
        { name: "Sel, poivre", quantity: "", category: "" },
      ],
      steps: [
        "Chauffer huile.",
        "Cuire crevettes 3–4 min.",
        "Ajouter citron et persil.",
        "Mélanger 30 s.",
        "Servir avec riz ou salade.",
      ],
    },
    {
      id: "se8",
      name: "Riz sauté estival aux légumes",
      type: RecipeType.VEGE,
      durationMinutes: 20,
      difficulty: "Facile",
      ingredients: [
        { name: "Riz cuit", quantity: "300 g", category: "" },
        { name: "Poivron", quantity: "1", category: "" },
        { name: "Courgette", quantity: "1", category: "" },
        { name: "Huile", quantity: "1 càs", category: "" },
        { name: "Sel, poivre", quantity: "", category: "" },
      ],
      steps: [
        "Couper légumes.",
        "Chauffer huile.",
        "Cuire légumes 5–6 min.",
        "Ajouter riz.",
        "Mélanger 2–3 min.",
        "Servir.",
      ],
    },
    {
      id: "se9",
      name: "Wraps poulet froid & crudités",
      type: RecipeType.VIANDE,
      durationMinutes: 20,
      difficulty: "Facile",
      ingredients: [
        { name: "Poulet cuit", quantity: "400 g", category: "" },
        { name: "Tortillas", quantity: "4", category: "" },
        { name: "Salade", quantity: "", category: "" },
        { name: "Tomates", quantity: "", category: "" },
        { name: "Sauce yaourt", quantity: "", category: "" },
      ],
      steps: [
        "Émincer poulet.",
        "Garnir tortillas.",
        "Ajouter crudités et sauce.",
        "Rouler.",
        "Servir frais.",
      ],
    },
    {
      id: "se10",
      name: "Salade grecque complète",
      type: RecipeType.VEGE,
      durationMinutes: 20,
      difficulty: "Facile",
      ingredients: [
        { name: "Tomates", quantity: "3", category: "" },
        { name: "Concombre", quantity: "1", category: "" },
        { name: "Oignon rouge", quantity: "1", category: "" },
        { name: "Feta", quantity: "150 g", category: "" },
        { name: "Olives", quantity: "", category: "" },
        { name: "Huile d’olive", quantity: "2 càs", category: "" },
        { name: "Sel, poivre", quantity: "", category: "" },
      ],
      steps: [
        "Couper légumes.",
        "Ajouter feta et olives.",
        "Assaisonner huile.",
        "Mélanger.",
        "Servir avec pain.",
      ],
    },
    {
      id: "sa1",
      name: "Poulet rôti miel & moutarde (four)",
      type: RecipeType.VIANDE,
      durationMinutes: 45,
      difficulty: "Facile",
      ingredients: [
        { name: "Poulet (cuisses ou filets)", quantity: "600 g", category: "" },
        { name: "Moutarde", quantity: "2 càs", category: "" },
        { name: "Miel", quantity: "1 càs", category: "" },
        { name: "Huile d’olive", quantity: "2 càs", category: "" },
        { name: "Sel, poivre", quantity: "", category: "" },
      ],
      steps: [
        "Préchauffer le four à 210°C.",
        "Mélanger moutarde, miel et huile.",
        "Badigeonner le poulet.",
        "Enfourner 35–40 min jusqu’à doré.",
        "Servir avec légumes rôtis (optionnel).",
      ],
    },
    {
      id: "sa2",
      name: "Bœuf sauté champignons & oignons",
      type: RecipeType.VIANDE,
      durationMinutes: 30,
      difficulty: "Facile",
      ingredients: [
        { name: "Bœuf émincé", quantity: "450 g", category: "" },
        { name: "Champignons", quantity: "250 g", category: "" },
        { name: "Oignon", quantity: "1", category: "" },
        { name: "Huile", quantity: "1 càs", category: "" },
        { name: "Sel, poivre", quantity: "", category: "" },
      ],
      steps: [
        "Émincer oignon et champignons.",
        "Chauffer l’huile à feu moyen-vif.",
        "Cuire le bœuf 4–5 min.",
        "Ajouter oignon et champignons.",
        "Cuire 6–7 min.",
        "Servir avec riz ou pâtes (optionnel).",
      ],
    },
    {
      id: "sa3",
      name: "Pâtes crème légère & champignons",
      type: RecipeType.VEGE,
      durationMinutes: 25,
      difficulty: "Facile",
      ingredients: [
        { name: "Pâtes", quantity: "300 g", category: "" },
        { name: "Champignons", quantity: "250 g", category: "" },
        { name: "Crème légère", quantity: "20 cl", category: "" },
        { name: "Ail", quantity: "1 gousse", category: "" },
        { name: "Huile", quantity: "1 càs", category: "" },
        { name: "Sel, poivre", quantity: "", category: "" },
      ],
      steps: [
        "Cuire les pâtes al dente.",
        "Émincer champignons et ail.",
        "Chauffer l’huile.",
        "Cuire champignons 5–6 min.",
        "Ajouter ail 30 s.",
        "Ajouter crème.",
        "Mélanger avec pâtes.",
        "Servir.",
      ],
    },
    {
      id: "sa4",
      name: "Saucisses & purée maison express",
      type: RecipeType.VIANDE,
      durationMinutes: 30,
      difficulty: "Facile",
      ingredients: [
        { name: "Saucisses", quantity: "6", category: "" },
        { name: "Pommes de terre farineuses", quantity: "600 g", category: "" },
        { name: "Lait", quantity: "20 cl", category: "" },
        { name: "Beurre", quantity: "30 g", category: "" },
        { name: "Sel, poivre", quantity: "", category: "" },
      ],
      steps: [
        "Cuire pommes de terre 20 min.",
        "Cuire saucisses à la poêle 12–15 min.",
        "Écraser pommes de terre.",
        "Ajouter lait chaud et beurre.",
        "Saler, poivrer.",
        "Servir.",
      ],
    },
    {
      id: "sa5",
      name: "Poêlée de porc aux pommes",
      type: RecipeType.VIANDE,
      durationMinutes: 25,
      difficulty: "Facile",
      ingredients: [
        { name: "Porc émincé", quantity: "450 g", category: "" },
        { name: "Pommes", quantity: "2", category: "" },
        { name: "Oignon", quantity: "1", category: "" },
        { name: "Huile", quantity: "1 càs", category: "" },
        { name: "Sel, poivre", quantity: "", category: "" },
      ],
      steps: [
        "Émincer porc et oignon.",
        "Chauffer l’huile.",
        "Cuire porc 5–6 min.",
        "Ajouter oignon et pommes.",
        "Cuire 6–7 min.",
        "Servir avec riz (optionnel).",
      ],
    },
    {
      id: "sa6",
      name: "Soupe de lentilles & carottes",
      type: RecipeType.VEGE,
      durationMinutes: 35,
      difficulty: "Facile",
      ingredients: [
        { name: "Lentilles vertes", quantity: "200 g", category: "" },
        { name: "Carottes", quantity: "3", category: "" },
        { name: "Oignon", quantity: "1", category: "" },
        { name: "Bouillon", quantity: "1 cube", category: "" },
        { name: "Eau", quantity: "1 L", category: "" },
        { name: "Sel, poivre", quantity: "", category: "" },
      ],
      steps: [
        "Émincer légumes.",
        "Mettre tous les ingrédients en casserole.",
        "Porter à ébullition.",
        "Mijoter 30 min.",
        "Servir chaud.",
      ],
    },
    {
      id: "sa7",
      name: "Omelette pommes de terre & fromage",
      type: RecipeType.VEGE,
      durationMinutes: 25,
      difficulty: "Facile",
      ingredients: [
        { name: "Œufs", quantity: "6", category: "" },
        { name: "Pommes de terre chair ferme", quantity: "400 g", category: "" },
        { name: "Fromage râpé", quantity: "120 g", category: "" },
        { name: "Huile", quantity: "1 càs", category: "" },
        { name: "Sel, poivre", quantity: "", category: "" },
      ],
      steps: [
        "Cuire pommes de terre en dés 10 min.",
        "Chauffer l’huile.",
        "Ajouter pommes de terre.",
        "Verser œufs battus.",
        "Ajouter fromage.",
        "Cuire 8–10 min.",
        "Servir avec salade.",
      ],
    },
    {
      id: "sa8",
      name: "Poulet mijoté tomates & olives",
      type: RecipeType.VIANDE,
      durationMinutes: 35,
      difficulty: "Facile",
      ingredients: [
        { name: "Poulet", quantity: "600 g", category: "" },
        { name: "Tomates concassées", quantity: "1 boîte", category: "" },
        { name: "Olives", quantity: "80 g", category: "" },
        { name: "Oignon", quantity: "1", category: "" },
        { name: "Huile", quantity: "1 càs", category: "" },
        { name: "Sel, poivre", quantity: "", category: "" },
      ],
      steps: [
        "Chauffer l’huile.",
        "Dorer le poulet 5 min.",
        "Ajouter oignon et tomates.",
        "Mijoter 25 min.",
        "Ajouter olives.",
        "Servir avec riz (optionnel).",
      ],
    },
    {
      id: "sa9",
      name: "Riz sauté d’automne aux légumes",
      type: RecipeType.VEGE,
      durationMinutes: 25,
      difficulty: "Facile",
      ingredients: [
        { name: "Riz cuit", quantity: "300 g", category: "" },
        { name: "Carotte", quantity: "1", category: "" },
        { name: "Courgette", quantity: "1", category: "" },
        { name: "Huile", quantity: "1 càs", category: "" },
        { name: "Sel, poivre", quantity: "", category: "" },
      ],
      steps: [
        "Couper légumes.",
        "Chauffer l’huile.",
        "Cuire légumes 6–7 min.",
        "Ajouter riz.",
        "Mélanger 2–3 min.",
        "Servir.",
      ],
    },
    {
      id: "sa10",
      name: "Gratin de courge & fromage",
      type: RecipeType.VEGE,
      durationMinutes: 45,
      difficulty: "Facile",
      ingredients: [
        { name: "Courge (butternut)", quantity: "800 g", category: "" },
        { name: "Fromage râpé", quantity: "120 g", category: "" },
        { name: "Crème", quantity: "20 cl", category: "" },
        { name: "Sel, poivre", quantity: "", category: "" },
      ],
      steps: [
        "Préchauffer le four à 200°C.",
        "Couper la courge en dés.",
        "Mélanger avec crème et sel.",
        "Mettre dans un plat.",
        "Ajouter fromage.",
        "Enfourner 35–40 min.",
        "Servir avec salade (optionnel).",
      ],
    },
    {
      id: "sh1",
      name: "Bœuf bourguignon express",
      type: RecipeType.VIANDE,
      durationMinutes: 60,
      difficulty: "Facile",
      ingredients: [
        { name: "Bœuf à braiser", quantity: "600 g", category: "" },
        { name: "Carottes", quantity: "2", category: "" },
        { name: "Oignon", quantity: "1", category: "" },
        { name: "Vin rouge", quantity: "20 cl", category: "" },
        { name: "Bouillon", quantity: "30 cl", category: "" },
        { name: "Huile", quantity: "1 càs", category: "" },
        { name: "Sel, poivre", quantity: "", category: "" },
      ],
      steps: [
        "Couper bœuf et légumes.",
        "Chauffer l’huile à feu vif.",
        "Dorer le bœuf 5 min.",
        "Ajouter oignon et carottes 3 min.",
        "Ajouter vin et bouillon.",
        "Mijoter à feu doux 45 min.",
        "Servir avec pommes de terre.",
      ],
    },
    {
      id: "sh2",
      name: "Poulet coco & légumes d’hiver",
      type: RecipeType.VIANDE,
      durationMinutes: 40,
      difficulty: "Facile",
      ingredients: [
        { name: "Poulet", quantity: "600 g", category: "" },
        { name: "Lait de coco", quantity: "20 cl", category: "" },
        { name: "Carottes", quantity: "2", category: "" },
        { name: "Poireau", quantity: "1", category: "" },
        { name: "Huile", quantity: "1 càs", category: "" },
        { name: "Sel, poivre", quantity: "", category: "" },
      ],
      steps: [
        "Couper poulet et légumes.",
        "Chauffer l’huile à feu moyen.",
        "Dorer le poulet 5 min.",
        "Ajouter légumes 5 min.",
        "Ajouter lait de coco.",
        "Mijoter 25 min.",
        "Servir avec riz.",
      ],
    },
    {
      id: "sh3",
      name: "Soupe de légumes racines maison",
      type: RecipeType.VEGE,
      durationMinutes: 45,
      difficulty: "Facile",
      ingredients: [
        { name: "Carottes", quantity: "3", category: "" },
        { name: "Pommes de terre farineuses", quantity: "2", category: "" },
        { name: "Poireau", quantity: "1", category: "" },
        { name: "Bouillon", quantity: "1 L", category: "" },
        { name: "Sel, poivre", quantity: "", category: "" },
      ],
      steps: [
        "Éplucher et couper légumes.",
        "Mettre dans casserole.",
        "Ajouter bouillon.",
        "Cuire 30–35 min.",
        "Mixer.",
        "Servir chaud.",
      ],
    },
    {
      id: "sh4",
      name: "Gratin dauphinois simplifié",
      type: RecipeType.VEGE,
      durationMinutes: 60,
      difficulty: "Facile",
      ingredients: [
        { name: "Pommes de terre farineuses", quantity: "1 kg", category: "" },
        { name: "Crème", quantity: "40 cl", category: "" },
        { name: "Ail", quantity: "1 gousse", category: "" },
        { name: "Sel, poivre", quantity: "", category: "" },
      ],
      steps: [
        "Préchauffer four à 180°C.",
        "Couper pommes de terre fines.",
        "Frotter plat avec ail.",
        "Disposer pommes de terre.",
        "Verser crème.",
        "Cuire 50–55 min.",
        "Servir avec salade.",
      ],
    },
    {
      id: "sh5",
      name: "Saucisses lentilles express",
      type: RecipeType.VIANDE,
      durationMinutes: 45,
      difficulty: "Facile",
      ingredients: [
        { name: "Saucisses", quantity: "6", category: "" },
        { name: "Lentilles vertes", quantity: "200 g", category: "" },
        { name: "Carotte", quantity: "1", category: "" },
        { name: "Oignon", quantity: "1", category: "" },
        { name: "Eau", quantity: "1 L", category: "" },
        { name: "Sel, poivre", quantity: "", category: "" },
      ],
      steps: [
        "Émincer légumes.",
        "Mettre lentilles et légumes dans casserole.",
        "Ajouter eau.",
        "Cuire 30 min.",
        "Cuire saucisses à la poêle.",
        "Servir ensemble.",
      ],
    },
    {
      id: "sh6",
      name: "Pâtes crémeuses jambon & champignons",
      type: RecipeType.VIANDE,
      durationMinutes: 30,
      difficulty: "Facile",
      ingredients: [
        { name: "Pâtes", quantity: "300 g", category: "" },
        { name: "Jambon", quantity: "150 g", category: "" },
        { name: "Champignons", quantity: "250 g", category: "" },
        { name: "Crème", quantity: "20 cl", category: "" },
        { name: "Sel, poivre", quantity: "", category: "" },
      ],
      steps: [
        "Cuire pâtes.",
        "Émincer champignons et jambon.",
        "Cuire champignons 5 min.",
        "Ajouter jambon et crème.",
        "Mélanger avec pâtes.",
        "Servir.",
      ],
    },
    {
      id: "sh7",
      name: "Poêlée de porc aux pommes de terre",
      type: RecipeType.VIANDE,
      durationMinutes: 35,
      difficulty: "Facile",
      ingredients: [
        { name: "Porc", quantity: "450 g", category: "" },
        { name: "Pommes de terre chair ferme", quantity: "600 g", category: "" },
        { name: "Oignon", quantity: "1", category: "" },
        { name: "Huile", quantity: "1 càs", category: "" },
        { name: "Sel, poivre", quantity: "", category: "" },
      ],
      steps: [
        "Cuire pommes de terre en dés 10 min.",
        "Chauffer huile.",
        "Cuire porc 5–6 min.",
        "Ajouter oignon et pommes de terre.",
        "Cuire 8–10 min.",
        "Servir.",
      ],
    },
    {
      id: "sh8",
      name: "Chili doux maison",
      type: RecipeType.VIANDE,
      durationMinutes: 40,
      difficulty: "Facile",
      ingredients: [
        { name: "Bœuf haché", quantity: "400 g", category: "" },
        { name: "Haricots rouges", quantity: "1 boîte", category: "" },
        { name: "Tomates concassées", quantity: "1 boîte", category: "" },
        { name: "Oignon", quantity: "1", category: "" },
        { name: "Huile", quantity: "1 càs", category: "" },
        { name: "Sel, paprika", quantity: "", category: "" },
      ],
      steps: [
        "Émincer oignon.",
        "Chauffer huile.",
        "Cuire bœuf 5 min.",
        "Ajouter tomates et haricots.",
        "Mijoter 30 min.",
        "Servir avec riz.",
      ],
    },
    {
      id: "sh9",
      name: "Omelette pommes de terre & oignons",
      type: RecipeType.VEGE,
      durationMinutes: 30,
      difficulty: "Facile",
      ingredients: [
        { name: "Œufs", quantity: "6", category: "" },
        { name: "Pommes de terre chair ferme", quantity: "600 g", category: "" },
        { name: "Oignon", quantity: "1", category: "" },
        { name: "Huile", quantity: "1 càs", category: "" },
        { name: "Sel, poivre", quantity: "", category: "" },
      ],
      steps: [
        "Cuire pommes de terre en lamelles 10 min.",
        "Chauffer huile.",
        "Cuire oignon 4 min.",
        "Ajouter pommes de terre.",
        "Verser œufs battus.",
        "Cuire 10 min.",
        "Servir chaud.",
      ],
    },
    {
      id: "sh10",
      name: "Parmentier bœuf & purée maison",
      type: RecipeType.VIANDE,
      durationMinutes: 60,
      difficulty: "Facile",
      ingredients: [
        { name: "Bœuf haché", quantity: "500 g", category: "" },
        { name: "Pommes de terre farineuses", quantity: "800 g", category: "" },
        { name: "Lait", quantity: "20 cl", category: "" },
        { name: "Beurre", quantity: "30 g", category: "" },
        { name: "Sel, poivre", quantity: "", category: "" },
      ],
      steps: [
        "Cuire pommes de terre 20 min.",
        "Écraser avec lait et beurre.",
        "Cuire bœuf 8–10 min.",
        "Monter le parmentier.",
        "Gratiner 20 min à 200°C.",
        "Servir.",
      ],
    },
    {
      id: "mi1",
      name: "Filets de perche",
      type: RecipeType.POISSON,
      durationMinutes: 10,
      difficulty: "Très facile",
      ingredients: [
        { name: "Filets perches", quantity: "", category: "" },
        { name: "Sel, poivre, un peu de farine", quantity: "", category: "" },
      ],
      steps: [
        "Laver et sécher les filets, les passer dans la farine",
        "Rôtir à feu moyen dans une poêle avec un peu d'huile et beurre, côté peau d'abord, 2 ou 3 min,",
        "les retourner et laisser encore 1 - 2 min. Arroser de jus de citron (facultatif)",
      ],
    },
    {
      id: "mi2",
      name: "Röstis",
      type: RecipeType.VEGE,
      durationMinutes: 35,
      difficulty: "Facile",
      ingredients: [
        { name: "Pommes de terre à röstis", quantity: "", category: "" },
        { name: "Sel, poivre", quantity: "", category: "" },
        { name: "Oignon émincé, lardons", quantity: "", category: "" },
      ],
      steps: [
        "Râper les pommes de terre crues dans un saladier, ajouter sel et poivre et autres ingrédients, mélanger",
        "Dans une poêle mettre un peu d'huile, chauffer sans faire fumer, ajouter les pommes de terre",
        "Répartir sur tout le fond, aplatir avec la spatule, laisser rôtir feu moyen durant 10 min,",
        "retourner la galette au moyen d'une assiette plate posée dessus",
        "Si besoin remettre un peu d'huile et cuire l'autre face durant 10 min, selon l'épaisseur de la galette.",
      ],
    },
    {
      id: "mi3",
      name: "Boulettes de viande",
      type: RecipeType.VIANDE,
      durationMinutes: 35,
      difficulty: "Facile",
      ingredients: [
        { name: "Mélange boeuf/porc haché", quantity: "", category: "" },
        { name: "oeuf", quantity: "1", category: "" },
        { name: "c.s moutarde", quantity: "1", category: "" },
        { name: "c.s huile", quantity: "1", category: "" },
        { name: "Oignon ou échalotte, persil haché", quantity: "", category: "" },
        { name: "Panko ou pain sec émietté", quantity: "", category: "" },
        { name: "Sel, poivre", quantity: "", category: "" },
      ],
      steps: [
        "Mélanger tous les ingrédients dans un saladier, si trop compact, ajouter un peu d'huile",
        "Former des boulettes un peu aplaties, les passer dans la farine",
        "Rôtir dans une poêle à feu moyen 5 min. de chaque côté jusqu'à coloration",
        "Ajouter un filet vin blanc ou eau, un peu de bouillon, baisser le feu, couvrir et laisser mijoter 10-15 min.",
      ],
    },
    {
      id: "mi4",
      name: "Poulet au paprika",
      type: RecipeType.VIANDE,
      durationMinutes: 30,
      difficulty: "Facile",
      ingredients: [
        { name: "Filets de poulet (petits)", quantity: "", category: "" },
        { name: "Tranches de lard à griller", quantity: "", category: "" },
        { name: "Huile olive", quantity: "", category: "" },
        { name: "Paprika doux en poudre", quantity: "", category: "" },
        { name: "Sel", quantity: "", category: "" },
        { name: "Concentré tomate", quantity: "", category: "" },
        { name: "vin blanc", quantity: "1 dl", category: "" },
        { name: "bouillon volaille", quantity: "1 dl", category: "" },
        { name: "demi-crème", quantity: "1 dl", category: "" },
        { name: "oignon émincé + thym", quantity: "1", category: "" },
      ],
      steps: [
        "Mélanger 1 c.s huile et 1 c.c paprika + 1 c.c sel",
        "Badigeonner les filets de poulet avec ce mélange",
        "Entourer chaque filet avec une tranche de lard",
        "Chauffer l'huile dans une poêle, saisir les filets 1 min, chaque côté, baisser le feu",
        "Poursuivre la cuisson 4 min. chaque côté, sortir de la poêle et garder à couvert",
        "Eponger la poêle avec papier ménage et remettre 1 c.s. huile à chauffer",
        "Faire revenir les oignons, ajouter 2 c.s. paprika et 1 c.s. concentré de tomate, brasser et faire cuire rapidement. Verser le vin, le bouillon et la crème, porter à ébullition, baisser le feu et laisser cuire encore 5 min., vérifier l'assaisonnement en sel",
        "Remettre les filets de poulet dans la sauce, le temps de les faire réchauffer, ajouter un peu de thym",
        "Servir avec des nouilles ou du riz",
      ],
    },
    {
      id: "mi5",
      name: "Gratin de poireaux - pommes de terre et jambon",
      type: RecipeType.VEGE,
      durationMinutes: 50,
      difficulty: "Facile",
      ingredients: [
        { name: "poireau", quantity: "500 gr", category: "" },
        { name: "terre fermes à la cuisson", quantity: "400 gr pommes", category: "" },
        { name: "jambon coupé en cubes", quantity: "200 gr", category: "" },
        { name: "gruyère râpé", quantity: "100 gr", category: "" },
        { name: "demi-crème", quantity: "2 dl", category: "" },
        { name: "Sel, poivre", quantity: "", category: "" },
      ],
      steps: [
        "Couper les poireaux en rondelles de 5 mm",
        "Couper les pommes de terre en 2 dans la longueur puis en tranches de 2 mm",
        "Faire cuire l'eau salée et mettre les pommes de terre durant 5 min, ajouter les poireaux et laisser cuire encore 5 min. Egoutter.",
        "Mettre dans un plat pour four, mélanger les légumes, les cubes de jambon et le fromage râpé",
        "Saler et poivrer la crème et verser par dessus, parsemer encore un peu de fromage râpé",
        "Faire gratiner 15-20 min, au four préchauffé à 200°",
      ],
    },
    {
      id: "mi6",
      name: "Gratin brocolis et pommes de terre",
      type: RecipeType.VEGE,
      durationMinutes: 45,
      difficulty: "Facile",
      ingredients: [
        { name: "brocolis frais ou surgelés", quantity: "600 gr", category: "" },
        { name: "terre chair ferme", quantity: "600 gr pommes", category: "" },
        { name: "fromage à raclette ou gruyère", quantity: "200 gr", category: "" },
        { name: "Sel, poivre", quantity: "", category: "" },
        { name: "crème entière sans lactose", quantity: "2 dl", category: "" },
        { name: "oeuf", quantity: "1", category: "" },
      ],
      steps: [
        "Couper les pommes de terre en cubes de 2 cm env. Mettre dans eau salée bouillante durant 5-6 min.",
        "Ajouter les brocolis et cuire encore 2-3 min. Egoutter.",
        "Mettre dans plat pour four. Incoporer le fromage coupé en dès, saler, poivrer.",
        "Préchauffer le four à 220°",
        "Mélanger la crème, l'oeuf, le sel, le poivre et verser sur les légumes",
        "Cuire au four env. 30-35 min.",
      ],
    },
    {
      id: "mi7",
      name: "Gratin de légumes",
      type: RecipeType.VEGE,
      durationMinutes: 30,
      difficulty: "Facile",
      ingredients: [
        { name: "légumes surgelés", quantity: "600 gr mélange", category: "" },
        { name: "terre à chair ferme", quantity: "600 gr pommes", category: "" },
        { name: "légumes", quantity: "1 litre bouillon", category: "" },
        { name: "demi-crème", quantity: "2 dl", category: "" },
        { name: "oeuf", quantity: "1", category: "" },
        { name: "gruyère râpé", quantity: "50 gr", category: "" },
        { name: "Sel, poivre, origan", quantity: "", category: "" },
      ],
      steps: [
        "Préchauffer le four à 200°",
        "Couper les pommes de terre en cubes de 1 cm env.",
        "Porter le bouillon à ébullition, y plonger les légumes surgelés puis les pommes de terre, cuire 10 min, env.",
        "Prélever 1 dl de bouillon de cuisson",
        "Egoutter les légumes et mettre dans un plat pour four.",
        "Mélanger la crème, l'oeuf, le fromage, 1 dl de bouillon de légumes, saler, poivrer et ajouter l'origan",
        "Verser sur les légumes et mettre le plat au four durant 20 min. environ",
      ],
    },
    {
      id: "e1",
      name: "Roulade de sole au pesto",
      type: RecipeType.POISSON,
      durationMinutes: 15,
      difficulty: "Très facile",
      ingredients: [
        { name: "sole", quantity: "4 filets", category: "" },
        { name: "pesto vert", quantity: "4 c. à café", category: "" },
        { name: "citron", quantity: "1", category: "" },
        { name: "Sel", quantity: "", category: "" },
        { name: "Poivre", quantity: "", category: "" },
        { name: "Option : un filet d’huile d’olive", quantity: "", category: "" },
      ],
      steps: [
        "Préchauffer le four à 180°C.",
        "Saler et poivrer légèrement les filets de sole.",
        "Étaler 1 c. à café de pesto sur chaque filet.",
        "Rouler les filets et les disposer dans un plat.",
        "Arroser de jus de citron (et d’un filet d’huile d’olive si souhaité).",
        "Cuire 10–12 min, jusqu’à cuisson juste et fondante.",
      ],
    },
    {
      id: "e2",
      name: "Filets de poulet aux raisins, enrobés de jambon cru",
      type: RecipeType.VIANDE,
      durationMinutes: 30,
      difficulty: "Très facile",
      ingredients: [
        { name: "poulet", quantity: "4 filets", category: "" },
        { name: "jambon cru", quantity: "4 tranches", category: "" },
        { name: "raisins blancs", quantity: "300 g", category: "" },
        { name: "beurre", quantity: "20 g", category: "" },
        { name: "Poivre", quantity: "", category: "" },
      ],
      steps: [
        "Préchauffer le four à 180°C.",
        "Poivrer légèrement les filets de poulet.",
        "Enrouler chaque filet dans une tranche de jambon cru.",
        "Déposer dans un plat et ajouter le beurre en morceaux.",
        "Cuire 20 min.",
        "Ajouter les raisins autour et cuire encore 10 min, jusqu’à raisins fondants.",
      ],
    },
    {
      id: "e3",
      name: "Cabillaud tomate basilic",
      type: RecipeType.POISSON,
      durationMinutes: 20,
      difficulty: "Très facile",
      ingredients: [
        { name: "cabillaud", quantity: "4 filet", category: "" },
        { name: "tomates", quantity: "4", category: "" },
        { name: "basilic", quantity: "1 bouquet", category: "" },
        { name: "c. à soupe d’huile d’olive", quantity: "4", category: "" },
        { name: "Sel", quantity: "", category: "" },
        { name: "Poivre", quantity: "", category: "" },
      ],
      steps: [
        "Préchauffer le four à 180°C.",
        "Couper les tomates en morceaux, ciselé le basilic et mélanger avec 2 c. à soupe d'huile d'olive. Réserver.",
        "Déposer le cabillaud dans un plat.",
        "Arroser le reste d’huile d’olive.",
        "Cuire 15–18 min, puis servi avec la sauce réservée.",
      ],
    },
    {
      id: "e4",
      name: "Filet de poisson blanc à la tomate, thym & vin blanc (au four)",
      type: RecipeType.POISSON,
      durationMinutes: 20,
      difficulty: "Très facile",
      ingredients: [
        { name: "poisson blanc (cabillaud, colin, lieu…)", quantity: "4 filets", category: "" },
        { name: "tomates", quantity: "2", category: "" },
        { name: "vin blanc sec", quantity: "5 cl", category: "" },
        { name: "thym", quantity: "1–2 branches", category: "" },
        { name: "c. à soupe d’huile d’olive", quantity: "2", category: "" },
        { name: "Sel", quantity: "", category: "" },
        { name: "Poivre", quantity: "", category: "" },
      ],
      steps: [
        "Préchauffer le four à 180°C.",
        "Couper les tomates en morceaux.",
        "Déposer les filets de poisson dans un plat.",
        "Ajouter les tomates et le thym, saler et poivrer.",
        "Verser le vin blanc autour du poisson.",
        "Arroser d’huile d’olive.",
        "Cuire 15–18 min, jusqu’à poisson juste nacré.",
      ],
    },
];

  const recipeCategories = {
  "v1": "France",
  "v2": "France",
  "v3": "France",
  "v4": "Monde",
  "v5": "France",
  "v6": "France",
  "v7": "France",
  "v8": "Fusion France-Japon",
  "v9": "France",
  "v10": "France",
  "p1": "France",
  "p2": "France",
  "p3": "France",
  "p4": "France",
  "p5": "Fusion France-Japon",
  "p6": "France",
  "p7": "France",
  "p8": "France",
  "p9": "France",
  "p10": "France",
  "vg1": "France",
  "vg2": "France",
  "vg3": "Fusion",
  "vg4": "France",
  "vg5": "Monde",
  "vg6": "France",
  "vg7": "Monde",
  "vg8": "France",
  "vg9": "France",
  "vg10": "Mexique",
  "fm1": "Monde",
  "fm2": "Italie",
  "fm3": "France",
  "fm4": "Monde",
  "fm5": "France",
  "fm6": "Asie",
  "fm7": "France",
  "fm8": "Italie",
  "fm9": "France",
  "fm10": "Monde",
  "pa1": "Italie",
  "pa2": "Italie",
  "pa3": "France",
  "pa4": "Italie",
  "pa5": "Italie",
  "pa6": "France",
  "pa7": "France",
  "pa8": "France",
  "pa9": "France",
  "pa10": "Italie",
  "it1": "Italie",
  "it2": "Italie",
  "it3": "Italie",
  "it4": "Italie",
  "it5": "Italie",
  "it6": "Italie",
  "it7": "Italie",
  "it8": "Italie",
  "it9": "Italie",
  "it10": "Italie",
  "jp1": "Japon",
  "jp2": "Japon",
  "jp3": "Japon",
  "jp4": "Japon",
  "jp5": "Japon",
  "jp6": "Japon",
  "jp7": "Japon",
  "jp8": "Japon",
  "jp9": "Japon",
  "jp10": "Japon",
  "mx1": "Mexique",
  "mx2": "Mexique",
  "mx3": "Mexique",
  "mx4": "Mexique",
  "mx5": "Mexique",
  "mx6": "Mexique",
  "mx7": "Mexique",
  "mx8": "Mexique",
  "mx9": "Mexique",
  "mx10": "Mexique",
  "th1": "Thaïlande",
  "th2": "Thaïlande",
  "th3": "Thaïlande",
  "th4": "Thaïlande",
  "th5": "Thaïlande",
  "th6": "Thaïlande",
  "th7": "Thaïlande",
  "th8": "Thaïlande",
  "th9": "Thaïlande",
  "th10": "Thaïlande",
  "in1": "Inde",
  "in2": "Inde",
  "in3": "Inde",
  "in4": "Inde",
  "in5": "Inde",
  "in6": "Inde",
  "in7": "Inde",
  "in8": "Inde",
  "in9": "Inde",
  "in10": "Inde",
  "ch1": "Chine",
  "ch2": "Chine",
  "ch3": "Chine",
  "ch4": "Chine",
  "ch5": "Chine",
  "ch6": "Chine",
  "ch7": "Chine",
  "ch8": "Chine",
  "ch9": "Chine",
  "ch10": "Chine",
  "ko1": "Corée",
  "ko2": "Corée",
  "ko3": "Corée",
  "ko4": "Corée",
  "ko5": "Corée",
  "ko6": "Corée",
  "ko7": "Corée",
  "ko8": "Corée",
  "ko9": "Corée",
  "ko10": "Corée",
  "md1": "Méditerranée",
  "md2": "Méditerranée",
  "md3": "Méditerranée",
  "md4": "Méditerranée",
  "md5": "Méditerranée",
  "md6": "Méditerranée",
  "md7": "Méditerranée",
  "md8": "Méditerranée",
  "md9": "Méditerranée",
  "md10": "Méditerranée",
  "sp1": "Printemps",
  "sp2": "Printemps",
  "sp3": "Printemps",
  "sp4": "Printemps",
  "sp5": "Printemps",
  "sp6": "Printemps",
  "sp7": "Printemps",
  "sp8": "Printemps",
  "sp9": "Printemps",
  "sp10": "Printemps",
  "se1": "Été",
  "se2": "Été",
  "se3": "Été",
  "se4": "Été",
  "se5": "Été",
  "se6": "Été",
  "se7": "Été",
  "se8": "Été",
  "se9": "Été",
  "se10": "Été",
  "sa1": "Automne",
  "sa2": "Automne",
  "sa3": "Automne",
  "sa4": "Automne",
  "sa5": "Automne",
  "sa6": "Automne",
  "sa7": "Automne",
  "sa8": "Automne",
  "sa9": "Automne",
  "sa10": "Automne",
  "sh1": "Hiver",
  "sh2": "Hiver",
  "sh3": "Hiver",
  "sh4": "Hiver",
  "sh5": "Hiver",
  "sh6": "Hiver",
  "sh7": "Hiver",
  "sh8": "Hiver",
  "sh9": "Hiver",
  "sh10": "Hiver",
  "mi1": "Mimi's",
  "mi2": "Mimi's",
  "mi3": "Mimi's",
  "mi4": "Mimi's",
  "mi5": "Mimi's",
  "mi6": "Mimi's",
  "mi7": "Mimi's",
  "e1": "Easy",
  "e2": "Easy",
  "e3": "Easy",
  "e4": "Easy",
};


const recipeFamilies = {
  "v1": "Quotidien",
  "v2": "Quotidien",
  "v3": "Quotidien",
  "v4": "Quotidien",
  "v5": "Quotidien",
  "v6": "Quotidien",
  "v7": "Quotidien",
  "v8": "Quotidien",
  "v9": "Quotidien",
  "v10": "Quotidien",
  "p1": "Quotidien",
  "p2": "Quotidien",
  "p3": "Quotidien",
  "p4": "Quotidien",
  "p5": "Quotidien",
  "p6": "Quotidien",
  "p7": "Quotidien",
  "p8": "Quotidien",
  "p9": "Quotidien",
  "p10": "Quotidien",
  "vg1": "Quotidien",
  "vg2": "Quotidien",
  "vg3": "Quotidien",
  "vg4": "Quotidien",
  "vg5": "Quotidien",
  "vg6": "Quotidien",
  "vg7": "Quotidien",
  "vg8": "Quotidien",
  "vg9": "Quotidien",
  "vg10": "Quotidien",
  "fm1": "Quotidien",
  "fm2": "Quotidien",
  "fm3": "Quotidien",
  "fm4": "Quotidien",
  "fm5": "Quotidien",
  "fm6": "Quotidien",
  "fm7": "Quotidien",
  "fm8": "Quotidien",
  "fm9": "Quotidien",
  "fm10": "Quotidien",
  "pa1": "Quotidien",
  "pa2": "Quotidien",
  "pa3": "Quotidien",
  "pa4": "Quotidien",
  "pa5": "Quotidien",
  "pa6": "Quotidien",
  "pa7": "Quotidien",
  "pa8": "Quotidien",
  "pa9": "Quotidien",
  "pa10": "Quotidien",
  "it1": "Monde",
  "it2": "Monde",
  "it3": "Monde",
  "it4": "Monde",
  "it5": "Monde",
  "it6": "Monde",
  "it7": "Monde",
  "it8": "Monde",
  "it9": "Monde",
  "it10": "Monde",
  "jp1": "Monde",
  "jp2": "Monde",
  "jp3": "Monde",
  "jp4": "Monde",
  "jp5": "Monde",
  "jp6": "Monde",
  "jp7": "Monde",
  "jp8": "Monde",
  "jp9": "Monde",
  "jp10": "Monde",
  "mx1": "Monde",
  "mx2": "Monde",
  "mx3": "Monde",
  "mx4": "Monde",
  "mx5": "Monde",
  "mx6": "Monde",
  "mx7": "Monde",
  "mx8": "Monde",
  "mx9": "Monde",
  "mx10": "Monde",
  "th1": "Monde",
  "th2": "Monde",
  "th3": "Monde",
  "th4": "Monde",
  "th5": "Monde",
  "th6": "Monde",
  "th7": "Monde",
  "th8": "Monde",
  "th9": "Monde",
  "th10": "Monde",
  "in1": "Monde",
  "in2": "Monde",
  "in3": "Monde",
  "in4": "Monde",
  "in5": "Monde",
  "in6": "Monde",
  "in7": "Monde",
  "in8": "Monde",
  "in9": "Monde",
  "in10": "Monde",
  "ch1": "Monde",
  "ch2": "Monde",
  "ch3": "Monde",
  "ch4": "Monde",
  "ch5": "Monde",
  "ch6": "Monde",
  "ch7": "Monde",
  "ch8": "Monde",
  "ch9": "Monde",
  "ch10": "Monde",
  "ko1": "Monde",
  "ko2": "Monde",
  "ko3": "Monde",
  "ko4": "Monde",
  "ko5": "Monde",
  "ko6": "Monde",
  "ko7": "Monde",
  "ko8": "Monde",
  "ko9": "Monde",
  "ko10": "Monde",
  "md1": "Monde",
  "md2": "Monde",
  "md3": "Monde",
  "md4": "Monde",
  "md5": "Monde",
  "md6": "Monde",
  "md7": "Monde",
  "md8": "Monde",
  "md9": "Monde",
  "md10": "Monde",
  "sp1": "Saisons",
  "sp2": "Saisons",
  "sp3": "Saisons",
  "sp4": "Saisons",
  "sp5": "Saisons",
  "sp6": "Saisons",
  "sp7": "Saisons",
  "sp8": "Saisons",
  "sp9": "Saisons",
  "sp10": "Saisons",
  "se1": "Saisons",
  "se2": "Saisons",
  "se3": "Saisons",
  "se4": "Saisons",
  "se5": "Saisons",
  "se6": "Saisons",
  "se7": "Saisons",
  "se8": "Saisons",
  "se9": "Saisons",
  "se10": "Saisons",
  "sa1": "Saisons",
  "sa2": "Saisons",
  "sa3": "Saisons",
  "sa4": "Saisons",
  "sa5": "Saisons",
  "sa6": "Saisons",
  "sa7": "Saisons",
  "sa8": "Saisons",
  "sa9": "Saisons",
  "sa10": "Saisons",
  "sh1": "Saisons",
  "sh2": "Saisons",
  "sh3": "Saisons",
  "sh4": "Saisons",
  "sh5": "Saisons",
  "sh6": "Saisons",
  "sh7": "Saisons",
  "sh8": "Saisons",
  "sh9": "Saisons",
  "sh10": "Saisons",
  "mi1": "Quotidien",
  "mi2": "Quotidien",
  "mi3": "Quotidien",
  "mi4": "Quotidien",
  "mi5": "Quotidien",
  "mi6": "Quotidien",
  "mi7": "Quotidien",
  "e1": "Quotidien",
  "e2": "Quotidien",
  "e3": "Quotidien",
  "e4": "Quotidien",
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

function withFamily(recipe) {
  const fam = recipeFamilies[recipe.id];
  if (fam) {
    return { ...recipe, family: fam };
  }
  return recipe;
}

function getAllRecipes() {
  const base = baseRecipes.map(r => withFamily(withCategory(applyOverrides(r))));
  const custom = customRecipes.map(r => withFamily(withCategory(applyOverrides(r))));
  return base.concat(custom);
}

function getSubCategoriesForFamily(family) {
  const all = getAllRecipes();
  const set = new Set();
  all.forEach(r => {
    const fam = r.family || "Quotidien";
    if (fam === family && r.cuisineCategory) {
      set.add(r.cuisineCategory);
    }
  });
  return Array.from(set).sort();
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
    headerRow.className = "flex-between recipeHeaderRow";

    const title = document.createElement("h2");
    title.className = "recipeTitle";
    title.textContent = recipe.name;
    const leftGroup = document.createElement("div");
    leftGroup.className = "recipeHeaderLeft";
    leftGroup.style.display = "flex";
    leftGroup.style.alignItems = "center";
    leftGroup.appendChild(title);
    // Bouton "retour" dans l'onglet "Ce soir"
    if (options.showAnotherButton) {
      const btnBackRecipe = document.createElement("button");
      btnBackRecipe.className = "btn-back-recipe";
      btnBackRecipe.type = "button";
      btnBackRecipe.textContent = "←";
      btnBackRecipe.title = "Revenir à la recette précédente";
      btnBackRecipe.style.marginLeft = "10px";
      btnBackRecipe.style.padding = "6px 10px";
      btnBackRecipe.style.lineHeight = "1";
      btnBackRecipe.style.fontSize = "16px";
      btnBackRecipe.disabled = ceSoirHistory.length === 0;
      btnBackRecipe.onclick = () => {
        if (ceSoirHistory.length === 0) return;
        const prev = ceSoirHistory.pop();
        // Sync des filtres pour que les 2 selects reflètent bien la recette affichée
        currentCategoryFilter = prev.categoryFilter || "Quotidien";
        currentSubCategoryFilter = prev.subCategoryFilter || "";
        ceSoirCurrentRecipe = prev.recipe;
        ceSoirCurrentRecipeState = { categoryFilter: currentCategoryFilter, subCategoryFilter: currentSubCategoryFilter };
        renderRecipeDetail(prev.recipe, { showAnotherButton: true });
      };
      leftGroup.appendChild(btnBackRecipe);
    }

    headerRow.appendChild(leftGroup);

    // Barre de recherche (page "Ce soir") — option B : recherche dans toutes les recettes
    if (options.showAnotherButton) {
      const rightGroup = document.createElement("div");
      rightGroup.className = "searchWrap";

      const searchBox = document.createElement("div");
      searchBox.className = "searchBox";

      const searchIcon = document.createElement("span");
      searchIcon.className = "searchIcon";
      // Icône loupe (SVG inline)
      searchIcon.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M10 18a8 8 0 1 1 5.293-14.003A8 8 0 0 1 10 18Zm0-2a6 6 0 1 0-.001-12.001A6 6 0 0 0 10 16Zm10.707 5.293-5.02-5.02a1 1 0 1 0-1.414 1.414l5.02 5.02a1 1 0 0 0 1.414-1.414Z"/></svg>';

      const input = document.createElement("input");
      input.className = "searchInput";
      input.type = "search";
      input.inputMode = "search";
      input.autocomplete = "off";
      input.spellcheck = false;
      input.placeholder = "Rechercher…";

      const clearBtn = document.createElement("button");
      clearBtn.className = "searchClear";
      clearBtn.type = "button";
      clearBtn.textContent = "×";
      clearBtn.title = "Effacer";
      clearBtn.style.display = "none";

      const results = document.createElement("div");
      results.className = "searchResults";
      results.style.display = "none";

      function hideResults() {
        results.style.display = "none";
        results.innerHTML = "";
      }

      function renderResults(items) {
        results.innerHTML = "";
        if (!items.length) {
          const empty = document.createElement("div");
          empty.className = "searchResultEmpty";
          empty.textContent = "Aucun résultat";
          results.appendChild(empty);
          results.style.display = "block";
          return;
        }

        items.forEach((r) => {
          const btn = document.createElement("button");
          btn.type = "button";
          btn.className = "searchResultItem";

          const t = document.createElement("span");
          t.className = "srTitle";
          t.textContent = r.name || "";
          btn.appendChild(t);

          if (r.cuisineCategory) {
            const meta = document.createElement("span");
            meta.className = "srMeta";
            meta.textContent = r.cuisineCategory;
            btn.appendChild(meta);
          }

          btn.onclick = () => {
            // Ajoute la recette actuelle dans l'historique "Ce soir" avant d'ouvrir la sélection
            if (ceSoirCurrentRecipe) {
              ceSoirHistory.push({
                recipe: ceSoirCurrentRecipe,
                categoryFilter: ceSoirCurrentRecipeState.categoryFilter,
                subCategoryFilter: ceSoirCurrentRecipeState.subCategoryFilter
              });
            }
            ceSoirCurrentRecipe = r;

// Synchronise les selects (famille + sous-catégorie) avec la recette choisie (Option B : recherche globale)
currentCategoryFilter = (r.family || "Quotidien");
if (currentCategoryFilter === "Monde" || currentCategoryFilter === "Saisons") {
  currentSubCategoryFilter = (r.cuisineCategory || "");
} else {
  currentSubCategoryFilter = "";
}

ceSoirCurrentRecipeState = { categoryFilter: currentCategoryFilter, subCategoryFilter: currentSubCategoryFilter };
            renderRecipeDetail(r, { showAnotherButton: true });
          };
          results.appendChild(btn);
        });
        results.style.display = "block";
      }

      function computeMatches(q) {
        const all = getAllRecipes(); // option B : dans tout
        const query = q.toLowerCase();
        const scored = [];
        for (const r of all) {
          const name = (r.name || "").toLowerCase();
          if (!name) continue;
          if (name.includes(query)) {
            const starts = name.startsWith(query) ? 0 : 1;
            scored.push({ r, starts, name });
          }
        }
        scored.sort((a, b) => (a.starts - b.starts) || a.name.localeCompare(b.name, "fr", { sensitivity: "base" }));
        return scored.map(x => x.r);
      }

      input.addEventListener("input", () => {
        const q = (input.value || "").trim();
        clearBtn.style.display = q ? "inline-flex" : "none";
        if (!q) return hideResults();
        renderResults(computeMatches(q));
      });

      input.addEventListener("keydown", (e) => {
        if (e.key === "Escape") {
          input.blur();
          hideResults();
        } else if (e.key === "Enter") {
          const q = (input.value || "").trim();
          if (!q) return;
          const hits = computeMatches(q);
          if (hits.length) {
            const first = hits[0];
            if (ceSoirCurrentRecipe) {
              ceSoirHistory.push({
                recipe: ceSoirCurrentRecipe,
                categoryFilter: ceSoirCurrentRecipeState.categoryFilter,
                subCategoryFilter: ceSoirCurrentRecipeState.subCategoryFilter
              });
            }
            ceSoirCurrentRecipe = first;
            ceSoirCurrentRecipeState = { categoryFilter: currentCategoryFilter, subCategoryFilter: currentSubCategoryFilter };
            renderRecipeDetail(first, { showAnotherButton: true });
          }
        }
      });

      input.addEventListener("blur", () => {
        // Laisse le temps aux clics dans la liste de passer
        setTimeout(() => hideResults(), 150);
      });

      results.addEventListener("mousedown", (e) => {
        // Empêche le blur immédiat lors du clic dans les résultats
        e.preventDefault();
      });

      clearBtn.onclick = () => {
        input.value = "";
        clearBtn.style.display = "none";
        hideResults();
        input.focus();
      };

      // iOS/Safari: ne pas dépendre uniquement de :focus-within (transition parfois non déclenchée)
      const EXPANDED_CLASS = "is-expanded";
      const expandSearch = () => searchBox.classList.add(EXPANDED_CLASS);
      const collapseSearch = () => {
        if (!input.value.trim()) searchBox.classList.remove(EXPANDED_CLASS);
      };

      input.addEventListener("focus", expandSearch);
      input.addEventListener("input", expandSearch);

      // Petit délai pour permettre le tap sur un résultat avant de replier
      input.addEventListener("blur", () => setTimeout(collapseSearch, 150));

      // Tap/clic sur la barre (ou l'icône) => expand + focus (utile sur mobile)
      const focusFromContainer = (e) => {
        // évite de casser la sélection de texte dans l'input
        if (e.target === input) return;
        expandSearch();
        setTimeout(() => {
          try { input.focus({ preventScroll: true }); } catch { input.focus(); }
        }, 0);
      };
      searchBox.addEventListener("pointerdown", focusFromContainer, { passive: true });
      searchBox.addEventListener("touchstart", focusFromContainer, { passive: true });

      searchBox.appendChild(searchIcon);
      searchBox.appendChild(input);
      searchBox.appendChild(clearBtn);
      searchBox.appendChild(results);

      rightGroup.appendChild(searchBox);
      headerRow.appendChild(rightGroup);
    }

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
  anotherRow.className = "button-row button-row-ce-soir";

  const btnAnother = document.createElement("button");
  btnAnother.className = "primary";
  btnAnother.textContent = "Autre idée";
  btnAnother.onclick = renderRandomRecipe;
  anotherRow.appendChild(btnAnother);

  ensureCategoriesInitialized();

  const selectCategory = document.createElement("select");
  const selectSubCategory = document.createElement("select");
  selectSubCategory.style.width = "100%";

  // Remplit le select principal (famille)
  function refreshFamilyOptions() {
    selectCategory.innerHTML = "";
    allCategories.forEach(cat => {
      const opt = document.createElement("option");
      opt.value = cat;
      opt.textContent = cat;
      selectCategory.appendChild(opt);
    });
    selectCategory.value = currentCategoryFilter;
  }

  // Remplit le sous-select (pays ou saison) en fonction de la famille
  function refreshSubCategoryOptions() {
    const family = currentCategoryFilter;
    selectSubCategory.innerHTML = "";

    if (family === "Monde" || family === "Saisons") {
      const placeholder = document.createElement("option");
      placeholder.value = "";
      placeholder.textContent = family === "Monde" ? "Tous les pays" : "Toutes les saisons";
      selectSubCategory.appendChild(placeholder);

      const subs = getSubCategoriesForFamily(family);
      subs.forEach(sub => {
        const opt = document.createElement("option");
        opt.value = sub;
        opt.textContent = sub;
        selectSubCategory.appendChild(opt);
      });

      // Applique la valeur courante si encore valide
      selectSubCategory.value = currentSubCategoryFilter || "";
      selectSubCategory.style.display = "";
      selectSubCategory.style.gridRow = "2";
      selectSubCategory.style.gridColumn = "2";
    } else {
      // Famille Quotidien : pas de sous-filtre
      currentSubCategoryFilter = "";
      selectSubCategory.style.display = "none";
    }
  }

  refreshFamilyOptions();
  refreshSubCategoryOptions();

  selectCategory.onchange = () => {
    currentCategoryFilter = selectCategory.value;
    currentSubCategoryFilter = "";
    refreshSubCategoryOptions();
    // Affiche automatiquement une recette correspondant au filtre choisi
    renderRandomRecipe();
  };

  selectSubCategory.onchange = () => {
    currentSubCategoryFilter = selectSubCategory.value;
    // Affiche automatiquement une recette correspondant au sous-filtre choisi
    renderRandomRecipe();
  };

  anotherRow.appendChild(selectCategory);
  anotherRow.appendChild(selectSubCategory);

  const btnTransfer = document.createElement("button");
  btnTransfer.style.gridRow = "2";
  btnTransfer.style.gridColumn = "1";
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
    

    // --- PHOTO RECETTE (juste avant Ingrédients) ---
    if (recipe.photo) {
      const img = document.createElement("img");
      img.className = "recipe-photo";
      img.src = recipe.photo;
      img.alt = recipe.name ? `Photo: ${recipe.name}` : "Photo recette";
      img.loading = "lazy";
      img.decoding = "async";
      img.referrerPolicy = "no-referrer";
      img.onerror = () => { img.style.display = "none"; };
      card.appendChild(img);
    }

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

    // Empile la recette actuelle dans l'historique "Ce soir" avant d'en afficher une nouvelle
    if (ceSoirCurrentRecipe) {
      ceSoirHistory.push({
        recipe: ceSoirCurrentRecipe,
        categoryFilter: ceSoirCurrentRecipeState.categoryFilter,
        subCategoryFilter: ceSoirCurrentRecipeState.subCategoryFilter
      });
    }
    const all = getAllRecipes();
    const usable = all.filter(r => getRating(r.id) !== "aOublier");
    let source = usable.length > 0 ? usable : all;
    if (source.length === 0) {
      contentDiv.innerHTML = "<p>Aucune recette disponible.</p>";
      return;
    }

    // Filtre principal par famille (Quotidien / Monde / Saisons)
    if (currentCategoryFilter) {
      const filteredByFamily = source.filter(r => {
        const fam = r.family || "Quotidien";
        return fam === currentCategoryFilter;
      });
      if (filteredByFamily.length > 0) {
        source = filteredByFamily;
      }
    }

    // Sous-filtre par pays (Monde) ou saison (Saisons)
    if (currentSubCategoryFilter && (currentCategoryFilter === "Monde" || currentCategoryFilter === "Saisons")) {
      const filteredBySub = source.filter(r => r.cuisineCategory === currentSubCategoryFilter);
      if (filteredBySub.length > 0) {
        source = filteredBySub;
      }
    }

    const recipe = source[Math.floor(Math.random() * source.length)];

    ceSoirCurrentRecipe = recipe;
    ceSoirCurrentRecipeState = { categoryFilter: currentCategoryFilter, subCategoryFilter: currentSubCategoryFilter };
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

    buttonBar.appendChild(btnNewWeek);
    buttonBar.appendChild(btnList);
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

      // Drag & Drop (Option B) — allow moving recipes between days
      dRecipe.draggable = true;
      dRecipe.addEventListener("dragstart", (e) => {
        try {
          e.dataTransfer.setData("text/plain", String(index));
          e.dataTransfer.effectAllowed = "move";
        } catch (_) {}
      });


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

      // Drop zone handlers (swap recipes + included flags)
      row.addEventListener("dragover", (e) => {
        e.preventDefault(); // required for drop
        row.classList.add("drag-over");
      });
      row.addEventListener("dragenter", (e) => {
        e.preventDefault();
        row.classList.add("drag-over");
      });
      row.addEventListener("dragleave", (e) => {
        // only remove if leaving the row entirely
        if (!row.contains(e.relatedTarget)) row.classList.remove("drag-over");
      });
      row.addEventListener("drop", (e) => {
        e.preventDefault();
        row.classList.remove("drag-over");
        let fromIndex = null;
        try {
          fromIndex = parseInt(e.dataTransfer.getData("text/plain"), 10);
        } catch (_) {}
        if (Number.isNaN(fromIndex) || fromIndex === null) return;
        if (fromIndex === index) return;

        const tmpRecipe = currentWeekPlan[fromIndex];
        currentWeekPlan[fromIndex] = currentWeekPlan[index];
        currentWeekPlan[index] = tmpRecipe;

        const tmpInc = currentWeekIncluded[fromIndex];
        currentWeekIncluded[fromIndex] = currentWeekIncluded[index];
        currentWeekIncluded[index] = tmpInc;

        saveWeekState();
        renderWeek();
      });

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

    const btnForgotten = document.createElement("button");
    btnForgotten.textContent = "Recettes oubliées";
    btnForgotten.onclick = () => {
      renderForgottenRecipes();
    };

    footerButtons.appendChild(btnForgotten);
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

    // Catégorisation automatique des ingrédients pour la liste de courses.
    // L'Excel n'ayant pas de classification, on utilise des heuristiques basées sur le nom.
    function inferShoppingCategory(name) {
      const n = (name || "").toLowerCase();
      const has = (arr) => arr.some(w => n.includes(w));

      // Asie / exotique
      if (has(["sauce soja", "soja", "miso", "sésame", "sesame", "nouilles", "ramen", "udon", "gingembre", "wasabi", "nori", "curry", "coco", "citron vert", "coriandre"])) {
        return "Asie";
      }

      // Poisson / fruits de mer
      if (has(["saumon", "thon", "cabillaud", "colin", "lieu", "poisson", "sardine", "crevette", "moule", "palourde", "saint-jacques", "st-jacques", "calamar", "encornet"])) {
        return "Poisson";
      }

      // Viande / charcuterie
      if (has(["poulet", "boeuf", "bœuf", "porc", "veau", "agneau", "dinde", "lardon", "lardons", "jambon", "saucisse", "steak", "viande"])) {
        return "Viande";
      }

      // Crèmerie
      if (has(["lait", "crème", "creme", "beurre", "yaourt", "yogourt", "fromage", "feta", "mozz", "parmesan", "emmental", "gruy", "chèvre", "chevre", "oeuf", "œuf", "œufs", "oeufs"])) {
        return "Crèmerie";
      }

      // Légumes / fruits
      if (has(["salade", "tomate", "tomates", "oignon", "oignons", "ail", "carotte", "carottes", "courgette", "courgettes", "poivron", "poivrons", "concombre", "aubergine", "aubergines", "champignon", "champignons", "épinard", "epinard", "épinards", "epinards", "brocoli", "brocolis", "pomme de terre", "pommes de terre", "patate", "courge", "butternut", "haricot", "haricots", "lentille", "lentilles", "citron", "citrons"])) {
        return "Légumes";
      }

      // Frais (herbes, produits à prendre au frais)
      if (has(["basilic", "persil", "aneth", "thym", "ciboulette", "menthe"])) {
        return "Frais";
      }

      // Épicerie (sec / conserves)
      if (has(["riz", "pâte", "pates", "pâtes", "spaghetti", "penne", "coquillettes", "tortilla", "wrap", "chapelure", "huile", "vinaigre", "sel", "poivre", "sucre", "miel", "moutarde", "cumin", "paprika", "origan", "tomates concassées", "concassées", "boîte", "boite", "conserve", "olives", "pesto"])) {
        return "Epicerie";
      }

      return "Autre";
    }

    const preferredCategoryOrder = ["Crèmerie", "Frais", "Légumes", "Viande", "Poisson", "Asie", "Epicerie", "Autre"];

    currentWeekPlan.forEach((recipe, index) => {
      if (!recipe) return;
      if (!currentWeekIncluded[index]) return;
      (recipe.ingredients || []).forEach(ing => {
        const rawCat = (ing.category || "").trim();
        const cat = rawCat ? rawCat : inferShoppingCategory(ing.name);
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

    const categories = Object.keys(map).sort((a, b) => {
      const ia = preferredCategoryOrder.indexOf(a);
      const ib = preferredCategoryOrder.indexOf(b);
      const ra = ia === -1 ? 999 : ia;
      const rb = ib === -1 ? 999 : ib;
      if (ra !== rb) return ra - rb;
      return a.localeCompare(b, "fr", { sensitivity: "base" });
    });
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
