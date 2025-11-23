window.addEventListener("DOMContentLoaded", () => {
  // ---------- TYPES & DONNÉES ----------

  const RecipeType = {
    VIANDE: "viande",
    POISSON: "poisson",
    VEGE: "vegetarien"
  };

  const DAYS = ["Lundi","Mardi","Mercredi","Jeudi","Vendredi","Samedi","Dimanche"];

  const baseRecipes = [
    {
      id: "poulet-carottes",
      name: "Poulet rôti et carottes",
      type: RecipeType.VIANDE,
      durationMinutes: 40,
      difficulty: "Très facile",
      ingredients: [
        { name: "Blanc de poulet", quantity: "600 g", category: "Viande" },
        { name: "Carottes", quantity: "600 g", category: "Légumes" },
        { name: "Pommes de terre", quantity: "600 g", category: "Légumes" },
        { name: "Huile d’olive", quantity: "2 càs", category: "Épicerie" },
        { name: "Sel", quantity: "à volonté", category: "Épicerie" },
        { name: "Poivre", quantity: "à volonté", category: "Épicerie" }
      ],
      steps: [
        "Préchauffe le four à 200°C.",
        "Épluche et coupe les carottes et pommes de terre.",
        "Mets poulet et légumes sur une plaque avec l’huile, le sel et le poivre.",
        "Enfourne 30 à 40 minutes en mélangeant une fois."
      ]
    },
    {
      id: "poisson-brocolis",
      name: "Poisson au four et brocolis",
      type: RecipeType.POISSON,
      durationMinutes: 30,
      difficulty: "Facile",
      ingredients: [
        { name: "Filets de poisson blanc", quantity: "600 g", category: "Poisson" },
        { name: "Brocolis", quantity: "1 tête", category: "Légumes" },
        { name: "Citron", quantity: "1", category: "Frais" },
        { name: "Huile d’olive", quantity: "1 càs", category: "Épicerie" },
        { name: "Sel", quantity: "à volonté", category: "Épicerie" },
        { name: "Poivre", quantity: "à volonté", category: "Épicerie" }
      ],
      steps: [
        "Préchauffe le four à 180°C.",
        "Place le poisson et le brocolis dans un plat.",
        "Arrose d’huile, sale et poivre.",
        "Cuis 20 minutes puis ajoute le jus de citron."
      ]
    },
    {
      id: "pates-bolo",
      name: "Pâtes bolognaise simplifiées",
      type: RecipeType.VIANDE,
      durationMinutes: 30,
      difficulty: "Très facile",
      ingredients: [
        { name: "Pâtes", quantity: "400 g", category: "Épicerie" },
        { name: "Viande hachée", quantity: "400 g", category: "Viande" },
        { name: "Sauce tomate", quantity: "500 ml", category: "Épicerie" },
        { name: "Oignon", quantity: "1", category: "Légumes" }
      ],
      steps: [
        "Fais cuire les pâtes dans une grande casserole d’eau salée.",
        "Fais revenir l’oignon puis la viande.",
        "Ajoute la sauce tomate, assaisonne et laisse mijoter 10 minutes.",
        "Mélange avec les pâtes."
      ]
    },
    {
      id: "curry-legumes",
      name: "Curry de légumes et riz",
      type: RecipeType.VEGE,
      durationMinutes: 35,
      difficulty: "Facile",
      ingredients: [
        { name: "Riz", quantity: "300 g", category: "Épicerie" },
        { name: "Carottes", quantity: "3", category: "Légumes" },
        { name: "Courgettes", quantity: "2", category: "Légumes" },
        { name: "Pois chiches (boîte)", quantity: "1", category: "Épicerie" },
        { name: "Lait de coco", quantity: "400 ml", category: "Épicerie" },
        { name: "Pâte de curry doux", quantity: "1 càs", category: "Épicerie" }
      ],
      steps: [
        "Fais cuire le riz.",
        "Coupe les légumes en dés.",
        "Fais revenir les légumes, ajoute curry, lait de coco et pois chiches.",
        "Laisse mijoter 15 minutes."
      ]
    },
    {
      id: "tacos-maison",
      name: "Tacos maison rapide",
      type: RecipeType.VIANDE,
      durationMinutes: 25,
      difficulty: "Facile",
      ingredients: [
        { name: "Tortillas", quantity: "8", category: "Épicerie" },
        { name: "Blanc de poulet", quantity: "400 g", category: "Viande" },
        { name: "Poivron", quantity: "1", category: "Légumes" },
        { name: "Salade verte", quantity: "quelques feuilles", category: "Légumes" }
      ],
      steps: [
        "Coupe le poulet et le poivron en lamelles, fais-les revenir.",
        "Réchauffe les tortillas.",
        "Garnis avec poulet, poivron, salade et sauce de ton choix."
      ]
    },
    {
      id: "omelette-fromage",
      name: "Omelette au fromage",
      type: RecipeType.VEGE,
      durationMinutes: 10,
      difficulty: "Très facile",
      ingredients: [
        { name: "Œufs", quantity: "4", category: "Frais" },
        { name: "Fromage râpé", quantity: "60 g", category: "Frais" },
        { name: "Beurre ou huile", quantity: "1 càs", category: "Épicerie" }
      ],
      steps: [
        "Bats les œufs dans un bol.",
        "Fais chauffer la poêle avec un peu de matière grasse.",
        "Verse les œufs, ajoute le fromage, laisse cuire à feu doux.",
        "Plie l’omelette et sers."
      ]
    },
    {
      id: "pates-pesto",
      name: "Pâtes au pesto",
      type: RecipeType.VEGE,
      durationMinutes: 12,
      difficulty: "Très facile",
      ingredients: [
        { name: "Pâtes", quantity: "400 g", category: "Épicerie" },
        { name: "Pesto", quantity: "4 càs", category: "Épicerie" }
      ],
      steps: [
        "Fais cuire les pâtes.",
        "Mélange avec le pesto, ajoute un peu d’eau de cuisson si besoin.",
        "Sers avec du parmesan si tu veux."
      ]
    },
    {
      id: "croque-monsieur",
      name: "Croque-monsieur express",
      type: RecipeType.VIANDE,
      durationMinutes: 10,
      difficulty: "Très facile",
      ingredients: [
        { name: "Pain de mie", quantity: "8 tranches", category: "Épicerie" },
        { name: "Jambon", quantity: "4 tranches", category: "Charcuterie" },
        { name: "Fromage", quantity: "4 tranches", category: "Frais" }
      ],
      steps: [
        "Assemble pain, jambon, fromage.",
        "Fais griller au four, à la poêle ou dans un appareil à croque.",
        "Sers chaud."
      ]
    },
    {
      id: "wraps-jambon",
      name: "Wraps jambon crudités",
      type: RecipeType.VIANDE,
      durationMinutes: 8,
      difficulty: "Très facile",
      ingredients: [
        { name: "Tortillas de blé", quantity: "4", category: "Épicerie" },
        { name: "Jambon", quantity: "4 tranches", category: "Charcuterie" },
        { name: "Salade verte", quantity: "quelques feuilles", category: "Légumes" },
        { name: "Tomate ou concombre", quantity: "1", category: "Légumes" }
      ],
      steps: [
        "Étale un peu de sauce sur la tortilla.",
        "Ajoute jambon et crudités.",
        "Roule serré, coupe en deux et sers."
      ]
    },
    {
      id: "salade-thon-mais",
      name: "Salade thon maïs",
      type: RecipeType.POISSON,
      durationMinutes: 7,
      difficulty: "Très facile",
      ingredients: [
        { name: "Thon en boîte", quantity: "1 petite boîte", category: "Poisson" },
        { name: "Maïs en boîte", quantity: "1 petite boîte", category: "Légumes" },
        { name: "Salade verte", quantity: "1 poignée", category: "Légumes" }
      ],
      steps: [
        "Égoutte le thon et le maïs.",
        "Mélange avec la salade et la sauce.",
        "Sers avec du pain."
      ]
    },
    {
      id: "riz-saute-legumes",
      name: "Riz sauté aux légumes",
      type: RecipeType.VEGE,
      durationMinutes: 15,
      difficulty: "Facile",
      ingredients: [
        { name: "Riz cuit", quantity: "400 g", category: "Épicerie" },
        { name: "Légumes surgelés", quantity: "300 g", category: "Légumes" }
      ],
      steps: [
        "Fais revenir les légumes dans une poêle.",
        "Ajoute le riz cuit, assaisonne et mélange bien."
      ]
    },
    {
      id: "saucisses-puree",
      name: "Saucisses et purée",
      type: RecipeType.VIANDE,
      durationMinutes: 20,
      difficulty: "Très facile",
      ingredients: [
        { name: "Saucisses", quantity: "4", category: "Viande" },
        { name: "Flocons de purée", quantity: "1 sachet", category: "Épicerie" }
      ],
      steps: [
        "Fais cuire les saucisses.",
        "Prépare la purée selon le paquet.",
        "Sers ensemble."
      ]
    },
    {
      id: "poisson-pane-petits-pois",
      name: "Poisson pané et petits pois",
      type: RecipeType.POISSON,
      durationMinutes: 18,
      difficulty: "Très facile",
      ingredients: [
        { name: "Poisson pané", quantity: "4 pièces", category: "Poisson" },
        { name: "Petits pois surgelés", quantity: "300 g", category: "Légumes" }
      ],
      steps: [
        "Fais cuire le poisson pané.",
        "Fais chauffer les petits pois.",
        "Sers ensemble."
      ]
    },
    {
      id: "gnocchis-tomate",
      name: "Gnocchis à la tomate",
      type: RecipeType.VEGE,
      durationMinutes: 12,
      difficulty: "Très facile",
      ingredients: [
        { name: "Gnocchis", quantity: "500 g", category: "Épicerie" },
        { name: "Sauce tomate", quantity: "300 ml", category: "Épicerie" }
      ],
      steps: [
        "Fais cuire ou dorer les gnocchis.",
        "Ajoute la sauce tomate, laisse réchauffer.",
        "Sers avec un peu de fromage."
      ]
    },
    {
      id: "quiche-lorraine",
      name: "Quiche lorraine rapide",
      type: RecipeType.VIANDE,
      durationMinutes: 35,
      difficulty: "Facile",
      ingredients: [
        { name: "Pâte brisée", quantity: "1", category: "Épicerie" },
        { name: "Lardons", quantity: "150 g", category: "Charcuterie" },
        { name: "Œufs", quantity: "3", category: "Frais" },
        { name: "Crème ou lait", quantity: "200 ml", category: "Frais" }
      ],
      steps: [
        "Préchauffe le four à 180°C.",
        "Dispose la pâte, ajoute lardons et appareil œufs + crème.",
        "Enfourne environ 30 minutes."
      ]
    },
    {
      id: "gratin-pates",
      name: "Gratin de pâtes express",
      type: RecipeType.VEGE,
      durationMinutes: 20,
      difficulty: "Très facile",
      ingredients: [
        { name: "Pâtes cuites", quantity: "400 g", category: "Épicerie" },
        { name: "Crème ou lait", quantity: "150 ml", category: "Frais" },
        { name: "Fromage râpé", quantity: "80 g", category: "Frais" }
      ],
      steps: [
        "Mélange les pâtes, la crème et une partie du fromage.",
        "Verse dans un plat, ajoute le reste du fromage.",
        "Gratine 10 minutes."
      ]
    },
    {
      id: "nouilles-poulet",
      name: "Nouilles sautées au poulet",
      type: RecipeType.VIANDE,
      durationMinutes: 18,
      difficulty: "Facile",
      ingredients: [
        { name: "Nouilles", quantity: "300 g", category: "Épicerie" },
        { name: "Blanc de poulet", quantity: "300 g", category: "Viande" },
        { name: "Légumes (carottes, poivron…)", quantity: "200 g", category: "Légumes" }
      ],
      steps: [
        "Fais cuire les nouilles.",
        "Fais revenir le poulet et les légumes.",
        "Ajoute les nouilles, assaisonne et sers."
      ]
    },
    {
      id: "lentilles-corail",
      name: "Lentilles corail au coco",
      type: RecipeType.VEGE,
      durationMinutes: 20,
      difficulty: "Facile",
      ingredients: [
        { name: "Lentilles corail", quantity: "200 g", category: "Épicerie" },
        { name: "Lait de coco", quantity: "200 ml", category: "Épicerie" }
      ],
      steps: [
        "Rince les lentilles et couvre-les d’eau.",
        "Fais cuire 10 à 15 minutes.",
        "Ajoute le lait de coco et assaisonne."
      ]
    },
    {
      id: "steak-haricots",
      name: "Steak haché et haricots verts",
      type: RecipeType.VIANDE,
      durationMinutes: 14,
      difficulty: "Très facile",
      ingredients: [
        { name: "Steaks hachés", quantity: "2 à 4", category: "Viande" },
        { name: "Haricots verts surgelés", quantity: "300 g", category: "Légumes" }
      ],
      steps: [
        "Fais cuire les steaks à la poêle.",
        "Fais cuire les haricots verts à la vapeur ou à l’eau.",
        "Sers ensemble."
      ]
    },
    {
      id: "pizza-maison",
      name: "Pizza maison simple",
      type: RecipeType.VEGE,
      durationMinutes: 20,
      difficulty: "Facile",
      ingredients: [
        { name: "Pâte à pizza", quantity: "1", category: "Épicerie" },
        { name: "Sauce tomate", quantity: "200 ml", category: "Épicerie" },
        { name: "Fromage râpé", quantity: "100 g", category: "Frais" }
      ],
      steps: [
        "Préchauffe le four à 220°C.",
        "Garnis la pâte de sauce tomate et fromage.",
        "Ajoute éventuellement jambon ou légumes.",
        "Enfourne 10 à 12 minutes."
      ]
    }
  ];

  // ---------- PERSISTANCE ----------

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

  // ---------- LOGIQUE SEMAINE ----------

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
    all.forEach(r => {
      byId[r.id] = r;
    });
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

  // ---------- AFFICHAGE ----------

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

    // Bouton de retour contextuel
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
    tagInfo.textContent = recipe.durationMinutes + " min • " + recipe.difficulty;

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

    // Notation + autre idée
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

    // Ingrédients
    const ingTitle = document.createElement("div");
    ingTitle.className = "section-title";
    ingTitle.textContent = "Ingrédients";
    card.appendChild(ingTitle);

    const ingList = document.createElement("ul");
    recipe.ingredients.forEach(ing => {
      const li = document.createElement("li");
      const qty = ing.quantity ? ing.quantity + " " : "";
      li.textContent = qty + ing.name;
      ingList.appendChild(li);
    });
    card.appendChild(ingList);

    // Étapes
    const stepsTitle = document.createElement("div");
    stepsTitle.className = "section-title";
    stepsTitle.textContent = "Étapes";
    card.appendChild(stepsTitle);

    const stepsList = document.createElement("ol");
    recipe.steps.forEach(step => {
      const li = document.createElement("li");
      li.textContent = step;
      li.style.marginBottom = "0.3rem";
      stepsList.appendChild(li);
    });
    card.appendChild(stepsList);

    // Bouton Modifier
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
        // v7 : on ne remplace QUE les jours décochés
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

    const map = {}; // { category: { name: qty } }

    currentWeekPlan.forEach((recipe, index) => {
      if (!recipe) return;
      if (!currentWeekIncluded[index]) return;
      recipe.ingredients.forEach(ing => {
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
    subtitle.textContent = "Recettes marquées 'À oublier' (tu peux les récupérer si besoin).";
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
      msg.textContent = "Aucune recette marquée 'À oublier' pour l’instant.";
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
    info.textContent = "Format simple : pense à un repas de soir de semaine réaliste.";
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
    inputDur.value = String(recipe.durationMinutes || 30);
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
      return `${qty} - ${name} - ${cat}`.trim();
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

      // Mettre à jour le planning courant si la recette y apparaît
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

  // ---------- BOUTONS GLOBAUX ----------

  document.getElementById("btn-random").onclick = renderRandomRecipe;
  document.getElementById("btn-planning").onclick = renderWeek;

  // Vue par défaut : une recette aléatoire
  renderRandomRecipe();
});
