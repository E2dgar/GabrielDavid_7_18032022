/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),
/* 2 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "initialState": () => (/* binding */ initialState),
/* harmony export */   "pushInArray": () => (/* binding */ pushInArray),
/* harmony export */   "replace": () => (/* binding */ replace)
/* harmony export */ });
/* harmony import */ var _components_filterSelect_selectUI__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3);
/* harmony import */ var _components_recipesUI__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(4);
/* harmony import */ var _http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(5);




const replace = (pattern, string) => string.replace(pattern, "");
/**
 *
 * @param {Array} array
 * @param {string} item
 */


const pushInArray = (array, item) => {
  if (!array.includes(item)) {
    array.push(item);
  }
};

const initialState = () => {
  (0,_components_filterSelect_selectUI__WEBPACK_IMPORTED_MODULE_0__["default"])([{
    name: "ingredients",
    list: (0,_http__WEBPACK_IMPORTED_MODULE_2__.findIngredients)(_http__WEBPACK_IMPORTED_MODULE_2__.allRecipes)
  }, {
    name: "appareils",
    list: (0,_http__WEBPACK_IMPORTED_MODULE_2__.findAppliances)(_http__WEBPACK_IMPORTED_MODULE_2__.allRecipes)
  }, {
    name: "ustensiles",
    list: (0,_http__WEBPACK_IMPORTED_MODULE_2__.findUstensils)(_http__WEBPACK_IMPORTED_MODULE_2__.allRecipes)
  }]);
  (0,_components_recipesUI__WEBPACK_IMPORTED_MODULE_1__["default"])();
};



/***/ }),
/* 3 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const selectUI = options => {
  const optionsLi = document.querySelectorAll("[role='option']");

  if (optionsLi.length > 0) {
    optionsLi.forEach(option => option.remove());
  }

  let optionsCount = 0;
  options.forEach(option => {
    let targetedList = document.querySelector(`.${option.name}-list`);
    option.list.forEach(element => {
      optionsCount++;
      let optionLi = document.createElement("li");
      optionLi.setAttribute("id", option.name + "-" + optionsCount);
      optionLi.setAttribute("role", "option");
      optionLi.setAttribute("tabindex", 0);
      optionLi.textContent = element;
      targetedList.append(optionLi);
    });
  });
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (selectUI);

/***/ }),
/* 4 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _http__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5);


const refreshUiRecipes = searchedRecipes => {
  document.querySelectorAll("article").forEach(article => article.remove());
  const data = searchedRecipes ?? _http__WEBPACK_IMPORTED_MODULE_0__.allRecipes;
  const noResultsElement = document.querySelector(".no-results");

  if (data.length === 0) {
    if (noResultsElement) {
      return;
    } else {
      const noResults = document.createElement("p");
      noResults.className = "no-results";
      noResults.textContent = "Aucune recette pour cette recherche";
      document.querySelector(".recettes").append(noResults);
      return;
    }
  }

  if (noResultsElement) {
    noResultsElement.remove();
  }

  const createCard = recipe => {
    const article = document.createElement("article");
    const img = document.createElement("div");
    img.className = "img-container";
    const title = document.createElement("h2");
    title.textContent = recipe.name;
    const recipeTime = document.createElement("span");
    recipeTime.textContent = recipe.time + " min";
    title.append(recipeTime);
    const details = document.createElement("div");
    details.className = "details";
    const ingredientsWrapper = document.createElement("div");
    ingredientsWrapper.className = "ingredients-wrapper";
    recipe.ingredients.forEach(ingredient => ingredientsWrapper.append(createIngredient(ingredient)));
    const description = document.createElement("div");
    description.className = "description";
    description.textContent = recipe.description;
    details.append(ingredientsWrapper, description);
    article.append(img, title, details);
    document.querySelector(".recettes").append(article);
  };

  const createIngredient = element => {
    const DOMElement = document.createElement("p");
    DOMElement.className = "ingredient";
    DOMElement.textContent = element.ingredient + ": ";
    const quantity = document.createElement("span");

    if (element.unit) {
      let unit = "&nbsp;" + element.unit;

      if (element.unit === "ml" || element.unit === "cl") {
        unit = element.unit;
      }

      quantity.innerHTML = `${element.quantity + unit}`;
    } else {
      quantity.textContent = element.quantity;
    }

    DOMElement.append(quantity);
    return DOMElement;
  };

  data.forEach(recipe => createCard(recipe));
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (refreshUiRecipes);

/***/ }),
/* 5 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "allRecipes": () => (/* binding */ allRecipes),
/* harmony export */   "findAppliances": () => (/* binding */ findAppliances),
/* harmony export */   "findIngredients": () => (/* binding */ findIngredients),
/* harmony export */   "findTagInIngredients": () => (/* binding */ findTagInIngredients),
/* harmony export */   "findUstensils": () => (/* binding */ findUstensils)
/* harmony export */ });
/* harmony import */ var _data_recipes__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6);
/* harmony import */ var _Models_Recipe__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(7);
/* harmony import */ var _services__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(2);



const allRecipes = [];
_data_recipes__WEBPACK_IMPORTED_MODULE_0__["default"].forEach(recipe => allRecipes.push(new _Models_Recipe__WEBPACK_IMPORTED_MODULE_1__["default"](recipe)));

const findIngredients = recipes => {
  let ingredients = [];
  recipes.forEach(recipe => {
    recipe.ingredients.forEach(ingredient => {
      (0,_services__WEBPACK_IMPORTED_MODULE_2__.pushInArray)(ingredients, ingredient.ingredient.toLowerCase());
    });
  });
  return ingredients;
};

const findUstensils = recipes => {
  let ustensils = [];
  recipes.forEach(recipe => {
    recipe.ustensils.forEach(ustensil => {
      let cleanUstensil = ustensil.toLowerCase().replace(/\s\([0-99]\)/, "");
      (0,_services__WEBPACK_IMPORTED_MODULE_2__.pushInArray)(ustensils, cleanUstensil);
    });
  });
  return ustensils;
};

const findAppliances = recipes => {
  let appliances = [];
  recipes.forEach(recipe => {
    let cleanAppliance = recipe.appliance.toLowerCase().replace(".", "");
    (0,_services__WEBPACK_IMPORTED_MODULE_2__.pushInArray)(appliances, cleanAppliance);
  });
  return appliances;
};

const findTagInIngredients = (recipes, tag) => {
  let ingredients = [];
  recipes.forEach(recipe => {
    recipe.ingredients.forEach(ingredient => {
      if (ingredient.ingredient.toLowerCase().includes(tag)) {
        (0,_services__WEBPACK_IMPORTED_MODULE_2__.pushInArray)(ingredients, ingredient.ingredient.toLowerCase());
      }
    });
  });
  return ingredients;
};



/***/ }),
/* 6 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const recipes = [{
  id: 1,
  name: "Limonade de Coco",
  servings: 1,
  ingredients: [{
    ingredient: "Lait de coco",
    quantity: 400,
    unit: "ml"
  }, {
    ingredient: "Jus de citron",
    quantity: 2
  }, {
    ingredient: "Crème de coco",
    quantity: 2,
    unit: "cuillères à soupe"
  }, {
    ingredient: "Sucre",
    quantity: 30,
    unit: "grammes"
  }, {
    ingredient: "Glaçons"
  }],
  time: 10,
  description: "Mettre les glaçons à votre goût dans le blender, ajouter le lait, la crème de coco, le jus de 2 citrons et le sucre. Mixer jusqu'à avoir la consistence désirée",
  appliance: "Blender",
  ustensils: ["cuillère à Soupe", "verres", "presse citron"]
}, {
  id: 2,
  name: "Poisson Cru à la tahitienne",
  servings: 2,
  ingredients: [{
    ingredient: "Thon Rouge (ou blanc)",
    quantity: 200,
    unit: "grammes"
  }, {
    ingredient: "Concombre",
    quantity: 1
  }, {
    ingredient: "Tomate",
    quantity: 2
  }, {
    ingredient: "Carotte",
    quantity: 1
  }, {
    ingredient: "Citron Vert",
    quantity: 5
  }, {
    ingredient: "Lait de Coco",
    quantity: 100,
    unit: "ml"
  }],
  time: 60,
  description: "Découper le thon en dés, mettre dans un plat et recouvrir de jus de citron vert (mieux vaut prendre un plat large et peu profond). Laisser reposer au réfrigérateur au moins 2 heures. (Si possible faites-le le soir pour le lendemain. Après avoir laissé mariner le poisson, coupez le concombre en fines rondelles sans la peau et les tomates en prenant soin de retirer les pépins. Rayer la carotte. Ajouter les légumes au poissons avec le citron cette fois ci dans un Saladier. Ajouter le lait de coco. Pour ajouter un peu plus de saveur vous pouver ajouter 1 à 2 cuillères à soupe de Crème de coco",
  appliance: "Saladier",
  ustensils: ["presse citron"]
}, {
  id: 3,
  name: "Poulet coco réunionnais",
  servings: 4,
  ingredients: [{
    ingredient: "Poulet",
    quantity: 1
  }, {
    ingredient: "Lait de coco",
    quantity: 400,
    unit: "ml"
  }, {
    ingredient: "Coulis de tomate",
    quantity: 25,
    unit: "cl"
  }, {
    ingredient: "Oignon",
    quantity: 1
  }, {
    ingredient: "Poivron rouge",
    quantity: 1
  }, {
    ingredient: "Huile d'olive",
    quantity: 1,
    unit: "cuillères à soupe"
  }],
  time: 80,
  description: "Découper le poulet en morceaux, les faire dorer dans une cocotte avec de l'huile d'olive. Salez et poivrez. Une fois doré, laisser cuire en ajoutant de l'eau. Au bout de 30 minutes, ajouter le coulis de tomate, le lait de coco ainsi que le poivron et l'oignon découpés en morceaux. Laisser cuisiner 30 minutes de plus. Servir avec du riz",
  appliance: "Cocotte",
  ustensils: ["couteau"]
}, {
  id: 4,
  name: "Salade de riz",
  servings: 4,
  ingredients: [{
    ingredient: "Riz blanc",
    quantity: 500,
    unit: "grammes"
  }, {
    ingredient: "Thon en miettes",
    quantity: 200,
    unit: "grammes"
  }, {
    ingredient: "Tomate",
    quantity: 2
  }, {
    ingredient: "Oeuf dur",
    quantity: 2
  }, {
    ingredient: "Maïs",
    quantity: 300,
    unit: "grammes"
  }, {
    ingredient: "Vinaigrette",
    quantity: 5,
    unit: "cl"
  }],
  time: 50,
  description: "Faire cuire le riz. Une fois le riz cuit, le laisser refroidir. Couper les oeufs dur en quarts ou en lamelle au choix, coupez le tomates en dés, ajouter au riz les oeufs, les tomates, le poisson, le maïs et la vinaigrette. Ajouter au gout de chacun des corniches, olives etc..",
  appliance: "Cuiseur de riz",
  ustensils: ["saladier", "passoire"]
}, {
  id: 5,
  name: "Tarte au thon",
  servings: 4,
  ingredients: [{
    ingredient: "Pâte feuilletée",
    quantity: 1
  }, {
    ingredient: "Thon en miettes",
    quantity: 130,
    unit: "grammes"
  }, {
    ingredient: "Tomate",
    quantity: 2
  }, {
    ingredient: "Crème fraiche",
    quantity: 2,
    unit: "cuillères à soupe"
  }, {
    ingredient: "gruyère râpé",
    quantity: 100,
    unit: "grammes"
  }, {
    ingredient: "Moutarde de Dijon",
    quantity: 1,
    unite: "cuillères à soupe"
  }],
  time: 45,
  description: "Etaler la pâte feuilleté aux dimensions du moule, étaler la moutarde sur la pâte feuilleté, ajouter le thon. Découper les tomates en rondelles et les poser sur le poisson, ajouter un peu de crème fraiche sur toute la tarte et recouvrez de gruyère râpé. Cuire au four 30 minutes",
  appliance: "Four",
  ustensils: ["moule à tarte", "râpe à fromage", "couteau"]
}, {
  id: 6,
  name: "Tarte aux pommes",
  servings: 6,
  ingredients: [{
    ingredient: "Pâte brisée",
    quantity: 1
  }, {
    ingredient: "Pomme",
    quantity: 3
  }, {
    ingredient: "Oeuf",
    quantity: "2"
  }, {
    ingredient: "Crème fraiche",
    quantity: 25,
    unit: "cl"
  }, {
    ingredient: "Sucre en Poudre",
    quantity: 100,
    unit: "grammes"
  }, {
    ingredient: "Sucre vanillé",
    quantity: 1,
    unit: "sachets"
  }],
  time: 50,
  description: "Commencez par mélanger les oeufs le sucre et le sucre vanillé dans un saladier, découper les pommes en tranches, ajouter la crème fraiche aux oeufs. Une fois que tout est pret, étalez la tarte dans le moule. N'oubliez pas de piquer le fond avec une fourchette avant depositionner les pommes sur la tarte. Finallement verser la préparation à base d'oeufs et de crême fraiche. Laisser cuire au four pendant 30 minutes",
  appliance: "Four",
  ustensils: ["moule à tarte", "saladier", "fourchette"]
}, {
  id: 7,
  name: "Tartelettes au chocolat et aux fraises",
  servings: 6,
  ingredients: [{
    ingredient: "Pâte sablée",
    quantity: 1
  }, {
    ingredient: "Chocolat au lait",
    quantity: 300,
    unit: "grammes"
  }, {
    ingredient: "Crème liquide",
    quantity: 80,
    unit: "cl"
  }, {
    ingredient: "Beurre",
    quantity: "30",
    unit: "grammes"
  }, {
    ingredient: "Fraise",
    quantity: 6
  }],
  time: 50,
  description: "Etaler la pate dans les moules à tartelette. Faire cuire la pate 30 minutes. Découper le chocolat en morceau et le faire chauffer, y ajouter la crême liquide, ajouter le beurre et remuer jusqu'à avoir une pâte homogène. Verser la pate sur les tartelettes. Couper les fraises en 2 et les positionner sur ",
  appliance: "Four",
  ustensils: ["moule à tartelettes (6)", "casserole"]
}, {
  id: 8,
  name: "Brownie",
  servings: 10,
  ingredients: [{
    ingredient: "Noix",
    quantity: "180",
    unit: "grammes"
  }, {
    ingredient: "Chocolat noir",
    quantity: 150,
    unit: "grammes"
  }, {
    ingredient: "Beurre",
    quantity: 120,
    unit: "grammes"
  }, {
    ingredient: "Oeuf",
    quantity: 2
  }, {
    ingredient: "Sucre en Poudre",
    quantity: "110",
    unit: "grammes"
  }, {
    ingredient: "farine",
    quantity: 90,
    unit: "grammes"
  }],
  time: 60,
  description: "Hachez les noix grossièrement. Faire fondre le chocolat avec le beurre. Mélanger les oeuf et le sucre et mélanger au chocolat. Ajouter la farine. Mélanger afin d'avoir quelque chose d'homogène puis incorporer les noix. Verser la préparation dans un moule de préférence rectangulaire. Cuire 2O à 25 minutes à 180°. Sortez du four et attendez quelques minutes pour démouler. Servir avec une boule de glace pour plus de gourmandise.",
  appliance: "Four",
  ustensils: ["moule à gateaux", "casserole"]
}, {
  id: 9,
  name: "Salade Méditerannéene fraiche au chèvre",
  servings: 4,
  ingredients: [{
    ingredient: "Concombre",
    quantity: 1
  }, {
    ingredient: "Olives"
  }, {
    ingredient: "Fromage de chèvre",
    quantity: 150,
    unit: "grammes"
  }, {
    ingredient: "Vinaigre Balsamic"
  }, {
    ingredient: "Huile d'olive"
  }, {
    ingredient: "Basilic"
  }],
  time: 15,
  description: "Peler le concombre le couper 2, retirer les pépins. Couper les olives en morceaux, ainsi que le fromage de chèvre. Ajouter le basilic ainsi que le vinaigre balsamic et l'huile d'olives à votre gout.",
  appliance: "Saladier",
  ustensils: ["cuillère en bois", "couteau"]
}, {
  id: 10,
  name: "Tartiflette",
  servings: 4,
  ingredients: [{
    ingredient: "Roblochon",
    quantity: "1"
  }, {
    ingredient: "Pommes de terre",
    quantity: 4.5,
    unit: "kg"
  }, {
    ingredient: "Jambon fumé",
    quantity: 2,
    unit: "tranches"
  }, {
    ingredient: "Oignon",
    quantity: 300,
    unit: "grammes"
  }, {
    ingredient: "Vin blanc sec",
    quantity: 30,
    unit: "cl"
  }],
  time: 60,
  description: "Commencer par cuire les pommes de terre dans l'eau bouillante. Puis epluchez les et coupez les en rondelles. Emincer les oignons puis les faire dorer dans du beurre. Ajouter le jambon fumé coupé en en morceaux ainsi que les pommes de terres. Salez, poivrez à votre gout ( et celui de vos convives ) Laissez cuisiner durant environ 10 minutes puis ajouter le vin blanc. Après 5 minutes, mettre le tout dans un plat à gratin. Coupez le rebelochon, soit en tranches, soit le couper en 2 dans le sens de l'épaisseur et recouvrir les pommes de terre. Cuire au four (environ 220°) durant 25 minutes. C'est prêt !",
  appliance: "Four",
  ustensils: ["plat à gratin", "couteau", "Économe"]
}, {
  id: 11,
  name: "Salade tomate, mozzarella et pommes",
  servings: 4,
  ingredients: [{
    ingredient: "Tomates cerises",
    quantity: 250,
    unit: "grammes"
  }, {
    ingredient: "Mozzarella",
    quantity: 150,
    unit: "grammes"
  }, {
    ingredient: "Jambon de parme",
    quantity: 4,
    unit: "tranches"
  }, {
    ingredient: "Pommes",
    quantity: 1
  }, {
    ingredient: "Salade Verte",
    quantity: 1
  }, {
    ingredient: "Vinaigrette",
    quantity: 5,
    unit: "cl"
  }],
  time: 10,
  description: "Commencer par couper les feuilles de salade, ajouter les tomates cerises et le fromage découpé en cubes ou en boules avec la cuillère à melon. Découper le jambon de parme en fines lamelles. Ajouter la pomme elle aussi découpée en petit morceaux. Assaisonnez à votre gout. ",
  appliance: "Saladier",
  ustensils: ["couteau", "cuillère à melon"]
}, {
  id: 12,
  name: "Compote pomme rhubarbe",
  servings: 4,
  ingredients: [{
    ingredient: "Rhubarbe",
    quantity: 160,
    unit: "grammes"
  }, {
    ingredient: "Pommes",
    quantity: 8
  }, {
    ingredient: "Sucre vanillé",
    quantity: 6,
    unit: "sachets"
  }, {
    ingredient: "Eau",
    quantity: "0.5",
    unit: "tasses"
  }],
  time: 40,
  description: "Éplucher les fruits et les couper en morceaux, les mettre dans une casserole en ajoutant l'eau et le sucre vanillé. Laisser cuire 15 minutes en remuant régulièrement.",
  appliance: "Casserole",
  ustensils: ["couteau", "économe"]
}, {
  id: 13,
  name: "Salade mâchée de patates",
  servings: 2,
  ingredients: [{
    ingredient: "Mâche",
    quantity: 60,
    unit: "grammes"
  }, {
    ingredient: "Pommes de terre",
    quantity: 200,
    unit: "grammes"
  }, {
    ingredient: "Échalote",
    quantity: 2
  }, {
    ingredient: "Vinaigre de cidre",
    quantity: 1,
    unit: "cuillère à soupe"
  }, {
    ingredient: "huile d'olive",
    quantity: 2,
    unit: "cuillère à soupe"
  }],
  time: 40,
  description: "Cuire les pommes de terre environ 30 minutes. Découper les échalottes finement. Durant la cuisson des pommes de terre. Préparez la vinaigrette avec l'huile d'olive et le vinaigre de cidre. Salez poivrez à discrétion. Dans un saladier, mettre le mâche. Ajouter",
  appliance: "Casserole",
  ustensils: ["couteau", "saladier", "cuillère en bois"]
}, {
  id: 14,
  name: "Galette Bretonne Saucisse et Fromage à raclette",
  servings: 2,
  ingredients: [{
    ingredient: "Saucisse bretonne ou de toulouse",
    quantity: 2
  }, {
    ingredient: "Farine de blé noir",
    quantity: 130,
    unit: "grammes"
  }, {
    ingredient: "Oeuf",
    quantity: 1
  }, {
    ingredient: "Fromage à raclette",
    quantity: 300,
    unit: "grammes"
  }, {
    ingredient: "Oignon",
    quantity: 1
  }, {
    ingredient: "Beurre",
    quantity: 75,
    unit: "grammes"
  }],
  time: 100,
  description: "Mélanger la farine et les oeufs, faire fondre 25 grammes de beurre et ajouter à la pâte. Ajouter du sel. Laisser reposer 1 heure. Faire les galettes et laisser refroidire. Faire chauffer les saucisses avec du beurre et l'oignon. Enrouler les saucisses dans les crêpes avec une partie du fromage. Mettre le reste du fromage à raclette par dessus les crêpes. Passer four pendant 20 minutes",
  appliance: "Four",
  ustensils: ["poelle à frire", "couteau"]
}, {
  id: 15,
  name: "Crêpes Chocolat Banane",
  servings: 10,
  ingredients: [{
    ingredient: "Oeuf",
    quantity: 3
  }, {
    ingredient: "Farine",
    quantity: 250,
    unit: "grammes"
  }, {
    ingredient: "Lait",
    quantity: 600,
    unit: "ml"
  }, {
    ingredient: "Beurre salé",
    quantity: 30,
    unit: "grammes"
  }, {
    ingredient: "Chocolat au lait",
    quantity: 100,
    unit: "grammes"
  }, {
    ingredient: "Banane",
    quantity: 4
  }],
  time: 60,
  description: "Mélangez dans un saladier, la farine, les oeufs, et le lait. Battez jusqu'à avoir une masse homogène. Pendant ce temps faites fondre le beurre et ajoutez en une partie à la pâte à crêpes. Faire fondre le chocolat ( avec le reste du beurre salé ). Lorsque vous chauffez les crêpes. Ajouter le chocolat fondu et les bananes coupées en rondelles. Ajoutez une touche de chantilly pour les gourmands",
  appliance: "Poële à crêpe",
  ustensils: ["saladier", "louche", "cuillère en bois"]
}, {
  id: 16,
  name: "Gratin de pâtes à la tomate",
  servings: 2,
  ingredients: [{
    ingredient: "Tomate",
    quantity: 500,
    unit: "grammes"
  }, {
    ingredient: "Mozzarella",
    quantity: 250,
    unit: "grammes"
  }, {
    ingredient: "Pennes",
    quantity: 500,
    unit: "grammes"
  }, {
    ingredient: "Basilic",
    quantity: 1,
    unit: "tiges"
  }, {
    ingredient: "huile d'olives",
    quantity: 2,
    unit: "cuillère à soupe"
  }],
  time: 45,
  description: "Faire cuire les pâtes si vous n'avez pas de pennes des coquillettes peuvent faire l'affaire. Découper les tomates en petits morceaux, soit en tranches soit en dés. Coupez le basilic en petites morceaux et mélangez le aux tomates.  Coupez la mozzarella en tranche. Préchauffez le four à 200°. Alternez entre couches de pattes et couches de tomates, terminez par une couche de pates et recouvrir du fromage. Laisser au four 30 minutes et régalez vous ! Une recette simple qui fera plaisir au petits comme aux grands.",
  appliance: "Four",
  ustensils: ["plat à gratin", "couteau", "râpe à fromage"]
}, {
  id: 17,
  name: "Smoothie à la fraise",
  servings: 6,
  ingredients: [{
    ingredient: "Fraise",
    quantity: 500,
    unit: "grammes"
  }, {
    ingredient: "Pastèque",
    quantity: 0.5
  }, {
    ingredient: "Jus de citron",
    quantity: 1,
    unit: "cuillères à soupe"
  }, {
    ingredient: "Glaçons",
    quantity: 8
  }, {
    ingredient: "Menthe"
  }],
  time: 15,
  description: "Coupez les fraises en morceaux, découpez la chaire de la pastèque en retirant les pépins. Mettre le tout dans le blender. Ajouter un cuillière à soupe de juste de citron ainsi que les glaçons. Ajoutez quelques fueilles de menthe pour plus de fraicheur. Mixez le tout. Servir et déguster.",
  appliance: "Blender",
  ustensils: ["verres", "couteau", "presse citron"]
}, {
  id: 18,
  name: "Smoothie ananas et vanille",
  servings: 5,
  ingredients: [{
    ingredient: "Ananas",
    quantity: 1
  }, {
    ingredient: "Glace à la vanille",
    quantity: 500,
    unit: "ml"
  }, {
    ingredient: "Lait",
    quantity: 50,
    unit: "cl"
  }],
  time: 10,
  description: "Séparez 1/5ème d'Ananas ( une belle tranche qui servira pour la décoration des verres ), mettre le reste coupé en cubes au blender, ajouter la glace à la vanille et le lait. Mixez. Servir et décorer avec l'ananas restant. C'est prêt",
  appliance: "Blender",
  ustensils: ["verres", "couteau"]
}, {
  id: 19,
  name: "Shake Banane Kiwi",
  servings: 4,
  ingredients: [{
    ingredient: "Kiwi",
    quantity: 4
  }, {
    ingredient: "Citron",
    quantity: 1
  }, {
    ingredient: "Lait",
    quantity: 1,
    unit: "litres"
  }, {
    ingredient: "Sucre glace",
    quantity: 30,
    unit: "grammes"
  }, {
    ingredient: "Banane",
    quantity: 1
  }],
  time: 0,
  description: "Coupez les fruits en morceaux, ajouter le jus de citron et le lait ainsi que le sucre glace. Mixez. Ajoutez des glaçons si le lait n'a pas été mis au frais.",
  appliance: "Blender",
  ustensils: ["couteau", "verres", "presse citron"]
}, {
  id: 20,
  name: "Pates Carbonara",
  servings: 5,
  ingredients: [{
    ingredient: "Tagliatelles",
    quantity: 500,
    unit: "grammes"
  }, {
    ingredient: "Lardons",
    quantity: 150,
    unit: "grammes"
  }, {
    ingredient: "Crème fraiche",
    quantity: 200,
    unit: "grammes"
  }, {
    ingredient: "Parmesan",
    quantity: 100,
    unit: "grammes"
  }, {
    ingredient: "huile d'olive",
    quantity: 1,
    unit: "cuillères à soupe"
  }],
  time: 30,
  description: "Faire cuire les pates comme indiqué sur le paquet. Dorer les lardons dans une sauteuse avec l'huile d'olive. Ajouter la crême fraiche et baisser le feu au minimum. Quand les Tagliatelles sont prêtes les mettre dans la sauteuse et bien mélanger le tout en ajoutant le jaune d'oeuf. Servir et ajouter le parmesan râpé.",
  appliance: "Sauteuse",
  ustensils: ["râpe à fromage", "cuillère en bois"]
}, {
  id: 21,
  name: "Spaghettis à la bolognaise",
  servings: 4,
  ingredients: [{
    ingredient: "Spaghettis",
    quantity: 400,
    unit: "grammes"
  }, {
    ingredient: "Oignon",
    quantity: 2
  }, {
    ingredient: "Coulis de tomate",
    quantity: 300,
    unit: "grammes"
  }, {
    ingredient: "Viande hachée 1% de matière grasse",
    quantity: 400,
    unit: "grammes"
  }, {
    ingredient: "Vin rouge",
    quantity: 20,
    unit: "cl"
  }, {
    ingredient: "Crème Fraiche",
    quantity: 1,
    unit: "cuillères à soupe"
  }],
  time: 30,
  description: "Cuisiner la viande hachée dans une poelle à frire. Dans une autre faire cuire les oignons découpés en fins dés avec un peu de beurre. Ajouter du vin rouge. Mélanger les oigons avec la viande hachée. Faire cuire les pates le temps indiqué sur le paquet. Ajouter le coulis de tomates à la viande hachée. Une fois que les pates sont cuites, ajouter la crème fraiche à la viande hachée. Serivir.",
  appliance: "Casserole.",
  ustensils: ["Cuillère en bois", "louche", "couteau"]
}, {
  id: 22,
  name: "Fondant au chocolat",
  servings: 4,
  ingredients: [{
    ingredient: "Beurre",
    quantity: 160,
    unit: "grammes"
  }, {
    ingredient: "Chocolat noir",
    quantity: 200,
    unit: "grammes"
  }, {
    ingredient: "Farine",
    quantity: 50,
    unit: "grammes"
  }, {
    ingredient: "Oeuf",
    quantity: 4
  }, {
    ingredient: "Sucre",
    quantity: 150,
    unit: "grammes"
  }],
  time: 30,
  description: "Faire fondre le chocolat et le beurre au bain marie. Dans un saladier battre les oeufs avec le sucre jusqu'à obtenir une texture de type mousse. Ajouter la farine ainsi que le mélange de beurre et chocolat fondu. Beurrez le moule à gateaux. Mettre au four préchauffé à 200° puis faites chauffer pendant 15 minutes. C'est prêt. Servir avec une boule de glace ou une crême dessert.",
  appliance: "Four",
  ustensils: ["moule à gateaux", "fouet", "casserole"]
}, {
  id: 23,
  name: "Quiche lorraine",
  servings: 4,
  ingredients: [{
    ingredient: "Pâte brisée",
    quantity: 200,
    unit: "grammes"
  }, {
    ingredient: "Lardons",
    quantity: 200,
    unit: "grammes"
  }, {
    ingredient: "Beurre",
    quantity: 30,
    unit: "grammes"
  }, {
    ingredient: "Oeuf",
    quantity: 3
  }, {
    ingredient: "Crème Fraîche",
    quantity: 20,
    unit: "cl"
  }, {
    ingredient: "Lait",
    quantity: 20,
    unit: "cl"
  }],
  time: 60,
  description: "Etaler la pate dans un moule et la piquer.Parsemer de beurre. Faire chauffer les lardon dans une poêle. Battre les oeufs en ajoutant la crème fraîche et le lait. Finalement ajouter les lardons, salez poivrez à votre gout. Verser l'ensemble sur la pâte. Cuire environ 50 minutes.",
  appliance: "Four",
  ustensils: ["moule à gateaux", "rouleau à patisserie", "fouet"]
}, {
  id: 24,
  name: "Salade de pâtes",
  servings: 4,
  ingredients: [{
    ingredient: "Thon en miettes",
    quantity: 160,
    unit: "grammes"
  }, {
    ingredient: "Maïs",
    quantity: 60,
    unit: "grammes"
  }, {
    ingredient: "Tomate",
    quantity: 1
  }, {
    ingredient: "Concombre",
    quantity: 0.5
  }, {
    ingredient: "Macaronis",
    quantity: 300,
    unit: "grammes"
  }, {
    ingredient: "Mayonnaise",
    quantity: 2,
    unit: "cuillères à soupe"
  }],
  time: 40,
  description: "Découper le concombre et les tomates en dés, les mettre dans un saladier avec le mais et les miettes de poisson, ajouter les pates. Ajouter la mayonnaise. Mélanger le tout et servir frais.",
  appliance: "Saladier",
  ustensils: ["couteau", "cuillère en bois"]
}, {
  id: 25,
  name: "Cookies",
  servings: 4,
  ingredients: [{
    ingredient: "Sucre",
    quantity: 100,
    unit: "grammes"
  }, {
    ingredient: "Beurre",
    quantity: 100,
    unit: "grammes"
  }, {
    ingredient: "Farine",
    quantity: 100,
    unit: "grammes"
  }, {
    ingredient: "Chocolat noir en pepites",
    quantity: 100,
    unit: "grammes"
  }, {
    ingredient: "Oeuf",
    quantity: 1
  }],
  time: 30,
  description: "Faire fondre le beurre et le mélanger avec le sucre. Finalement ajouter l'oeuf. Ajouter la farine tout en mélangeant peu pa peu pour avoir une masse sans grumaux. Ajouter les pépites de chocolat. Faire, une plaque de cuisson de petites boules pour les cookies. Mettre au four à 180° pour 10 minutes.",
  appliance: "Four",
  ustensils: ["fouet", "saladier", "plaque de cuisson"]
}, {
  id: 26,
  name: "Soupe de tomates",
  servings: 2,
  ingredients: [{
    ingredient: "Tomate",
    quantity: 6
  }, {
    ingredient: "Pommes de terre",
    quantity: 1
  }, {
    ingredient: "Huile d'olives"
  }, {
    ingredient: "Oignon",
    quantity: 1
  }, {
    ingredient: "Ail",
    quantity: 1,
    unit: "gousses"
  }],
  time: 25,
  description: "Verser de l'huile dans une cocotte minute couper les légumes et les verser dans l'huile chaude. Laisser cuire et remuer pendant 10 minutes. Passer aux mixer. Servir.",
  appliance: "Mixer",
  ustensils: ["cocotte minute", "couteau"]
}, {
  id: 27,
  name: "Soupe à l'oseille",
  servings: 4,
  ingredients: [{
    ingredient: "Oseille",
    quantity: 2
  }, {
    ingredient: "Oeuf",
    quantity: 1
  }, {
    ingredient: "Crème fraîche",
    quantity: 4,
    unit: "cuillère à soupe"
  }, {
    ingredient: "Vermicelles",
    quantity: 1,
    unit: "verres"
  }, {
    ingredient: "Beurre salé",
    quantity: 50,
    unit: "grammes"
  }],
  time: 15,
  description: "Faire fondre l'oseille avec du beurre demi sel, ajouter un litre d'eau. Ajouter les vermicelles. Laisser cuire. une foit prêt, sortir du feu et après 5 minutes ajouter le jaune d'oeuf et la crême fraîche",
  appliance: "Casserole",
  ustensils: ["couteau", "cuillère en bois"]
}, {
  id: 28,
  name: "Soupe de poireaux",
  servings: 4,
  ingredients: [{
    ingredient: "Poireau",
    quantity: 3
  }, {
    ingredient: "Pommes de terre",
    quantity: 400,
    unit: "grammes"
  }, {
    ingredient: "Oseille",
    quantity: 75,
    unit: "grammes"
  }, {
    ingredient: "Beurre",
    quantity: 50,
    unit: "grammes"
  }, {
    ingredient: "Crême fraîche",
    quantity: 10,
    unit: "cl"
  }],
  time: 80,
  description: "Emincer les blanc de poireaux et les faire chauffer dans 25 grammes de beurre. AJouter les pommes de terres coupées en morceaux. Ajouter l'eau et laisser mijoter pour 45 minutes. Chauffer l'oseille avec le beurre restant puis incorporer le tout. Mixez. Ajoutez la crème. Bon appetit.",
  appliance: "Mixer",
  ustensils: ["casserole", "couteau"]
}, {
  id: 29,
  name: "Houmous Express",
  servings: 2,
  ingredients: [{
    ingredient: "Pois chiches",
    quantity: 1,
    unit: "boites"
  }, {
    ingredient: "Ail",
    quantity: 1,
    unit: "gousses"
  }, {
    ingredient: "Citron",
    quantity: 2
  }, {
    ingredient: "Huile d'olive"
  }, {
    ingredient: "Paprika"
  }],
  time: 30,
  description: "Prendre les pois chiches, les mettre dans le mixer avec de l'huile d'olive, ajouter le jus des 2 citrons et du paprika selon le gout.",
  appliance: "Mixer",
  ustensils: ["cuillère en bois", "presse citron"]
}, {
  id: 30,
  name: "Purée de pois cassés",
  servings: 4,
  ingredients: [{
    ingredient: "Pois Cassé",
    quantity: 500,
    unit: "grammes"
  }, {
    ingredient: "Oignon",
    quantity: 1
  }, {
    ingredient: "Ail",
    quantity: 2,
    unit: "gousses"
  }],
  time: 60,
  description: "Mettre tous les ingrédients dans une cocotte. ajouter de l'eau pour recouvrir l'ensemble et laisser cuirre à petit feur pour 1 heure. Passer au mixer. Salez, poivrez. C'est prêt",
  appliance: "Mixer",
  ustensils: ["casserole", "cuillère en bois"]
}, {
  id: 31,
  name: "Jardinière de légumes",
  servings: 4,
  ingredients: [{
    ingredient: "Carotte",
    quantity: 2
  }, {
    ingredient: "Pommes de terre",
    quantity: 2
  }, {
    ingredient: "Haricots verts",
    quantity: 150,
    unit: "grammes"
  }, {
    ingredient: "Petits poids",
    quantity: 100,
    unit: "grammes"
  }, {
    ingredient: "Lardons",
    quantity: 150,
    unit: "grammes"
  }],
  time: 60,
  description: "Découper en cubes les carottes et pommes de terre. Faire revenir dans du beurre. Ajouter les lardons, une fois les lardons dorés, ajouter un grand verre d'eau. Ajouter les petit poids et les haricots verts ( tous deux pré cuits ). Ajouter Sel, poivre, thyms et laurier",
  appliance: "Poële",
  ustensils: ["Couteau", "économe"]
}, {
  id: 32,
  name: "Croque Monsieur à la dinde",
  servings: 4,
  ingredients: [{
    ingredient: "Pain de mie",
    quantity: 8,
    unit: "tranches"
  }, {
    ingredient: "Blanc de dinde",
    quantity: 4,
    unit: "tranches"
  }, {
    ingredient: "Emmental",
    quantity: 8,
    unit: "tranches"
  }, {
    ingredient: "Gruyère",
    quantity: 100,
    unit: "grammes"
  }, {
    ingredient: "Lait",
    quantity: 5,
    unit: "cl"
  }, {
    ingredient: "Noix de muscade",
    quantity: 1,
    unit: "pincées"
  }],
  time: 20,
  description: "Beurrer les tranches de pain, ajouter entre 2 tranches de pain de mie 1 tranche d'émental, une de blanc de dinde, et une autre d'emmental. Dans un récipient, mélanger le gruyère rappé avec le lait et la noix de muscade. Mettre sur les croque monsieux. Placer au four durnat 10 minutes.",
  appliance: "Four",
  ustensils: ["râpe à fromage", "cuillère à Soupe", "couteau"]
}, {
  id: 33,
  name: "Sandwich au saumon fumé",
  servings: 4,
  ingredients: [{
    ingredient: "Pain de mie",
    quantity: 8,
    unit: "tranches"
  }, {
    ingredient: "Saumon Fumé",
    quantity: 4,
    unit: "tranches"
  }, {
    ingredient: "Feuilles de laitue",
    quantity: 4
  }, {
    ingredient: "Fromage blanc",
    quantity: 4,
    unit: "cuillères à soupe"
  }, {
    ingredient: "Jus de citron",
    quantity: 1,
    unit: "cuillères à soupe"
  }],
  time: 5,
  description: "Mélanger le fromage blanc avec le citron. Ajouter un peu de sel et poivre à votre gout. Faire dorer le pain de mie. Puis étaler le mélange. Ajouter une feuille de salade puis le saumon fumé. C'est prêt.",
  appliance: "Four",
  ustensils: ["couteau", "cuillère en bois"]
}, {
  id: 34,
  name: "Purée de patate douce",
  servings: 4,
  ingredients: [{
    ingredient: "Patate douce",
    quantity: 800,
    unit: "grammes"
  }, {
    ingredient: "Crème fraîche",
    quantity: 20,
    unit: "cl"
  }, {
    ingredient: "Huile d'olive"
  }, {
    ingredient: "Orange",
    quantity: 1
  }],
  time: 25,
  description: "Eplucher les patates douces et coupez les en morceaux. Les faire cuire durant 20 minute dans une casserole d'eau bouillante. Passer au mixer en ajoutant la crème et l'huile d'olive à son gout. Salez, poivrez. Pressez l'orange et ajouter le jus à l'ensemble. Servir.",
  appliance: "Mixer",
  ustensils: ["couteau", "économe", "cuillère en bois"]
}, {
  id: 35,
  name: "Purée de carottes",
  servings: 2,
  ingredients: [{
    ingredient: "Carotte",
    quantity: 6
  }, {
    ingredient: "Pommes de terre",
    quantity: 1
  }, {
    ingredient: "Beurre",
    quantity: 20,
    unit: "grammes"
  }, {
    ingredient: "Crème fraîche",
    quantity: 2,
    unit: "cuillères à soupe"
  }, {
    ingredient: "Cumin",
    quantity: 1,
    unit: "cuillères à café"
  }, {
    ingredient: "Noix de muscade",
    quantity: 1,
    unit: "pincées"
  }],
  time: 25,
  description: "Éplucher les légumes, les couper en morceaux et les mettre à cuire dans une cocotte minute environ 15 minutes. Mixer en ajoutant le beurre, la crème. Ajouter le cumun et la noix de muscade.",
  appliance: "Mixer",
  ustensils: ["cocotte minute", "couteau", "cuillère en bois"]
}, {
  id: 36,
  name: "Lasagne Courgettes et Chèvre",
  servings: 2,
  ingredients: [{
    ingredient: "Courgette",
    quantity: 2
  }, {
    ingredient: "Fromage de chèvre",
    quantity: 4
  }, {
    ingredient: "Lait",
    quantity: 25,
    unit: "cl"
  }, {
    ingredient: "Lasagnes",
    quantity: 5,
    unit: "feuilles"
  }, {
    ingredient: "Gruyère",
    quantity: 40,
    unit: "grammes"
  }, {
    ingredient: "Maïzena",
    quantity: 1,
    unit: "cuillères à soupe"
  }],
  time: 35,
  description: "Raper les courgette et les faire revenir durant 15 minutes. Ajouter les fromages de chèvre frais. Préparer la béchamelle avec le lait et la maizena. Salez poivrez, ajouter de la noix de muscade selon les gouts. Dans un plat, mettre un peu de sauces au fond, puis des lasagnes, puis des courgettes etc... terminer par de la sauces et ajouter le gruiyère. Passer au four à 180° durant 20 à 25 minutes.",
  appliance: "Four",
  ustensils: ["plat à gratin", "râpe à fromage", "fouet"]
}, {
  id: 37,
  name: "Courgettes farcies au boeuf",
  servings: 2,
  ingredients: [{
    ingredient: "Courgette",
    quantity: 2
  }, {
    ingredient: "Viande hachée",
    quantity: 600,
    unit: "grammes"
  }, {
    ingredient: "Huile d'olives",
    quantity: 25,
    unit: "cl"
  }, {
    ingredient: "Oignon",
    quantity: 1
  }, {
    ingredient: "Coulis de tomates",
    quantity: 20,
    unit: "cl"
  }, {
    ingredient: "Gruyère",
    quantity: 50,
    unit: "grammes"
  }],
  time: 60,
  description: "Couper les courgettes dans le sens de la longueur. Vider les courgette dans un saladier. Réserver.Faire revenir la chair des courgettes dans 25cl d'huile d'olive. Ajouter l'oignon puis la viande hachée. Mettre la farce dans les courgettes. Ajouter le coulis de tomates. Mettre au four pendant 30 minutes. Avant la fin de la cuisson ajouter le fromage rapé",
  appliance: "Four",
  ustensils: ["couteau", "cuillère en bois", "Poelle à frire"]
}, {
  id: 38,
  name: "Pain Perdu",
  servings: 4,
  ingredients: [{
    ingredient: "Pain",
    quantity: 6,
    unit: "tranches"
  }, {
    ingredient: "Lait",
    quantity: 25,
    unit: "cl"
  }, {
    ingredient: "Oeuf",
    quantity: 3
  }, {
    ingredient: "Sucre roux",
    quantity: 75,
    unit: "grammes"
  }],
  time: 20,
  description: "Fouettez les oeufs, le sucre et le lait. tremper les tranches de pain. Le cuire au four pendant environ 10 minutes à 180°. Servir",
  appliance: "Four",
  ustensils: ["fouet", "bol", "Cuillère à Soupe"]
}, {
  id: 39,
  name: "Crumble aux pommes",
  servings: 40,
  ingredients: [{
    ingredient: "Pomme",
    quantity: 2
  }, {
    ingredient: "Farine",
    quantity: 100,
    unit: "grammes"
  }, {
    ingredient: "Beurre",
    quantity: 50,
    unit: "grammes"
  }, {
    ingredient: "Sucre roux",
    quantity: 80,
    unit: "grammes"
  }],
  time: 40,
  description: "Découper les pommes en dé. Mélanger dans un saladier la farine, le sucre et le beurre. Bien mélanger. Beurrer le moule et ajouter les pommes. Par dessus placez la pate que vous avez obtenu. Cuire 20 minutes au four",
  appliance: "Four",
  ustensils: ["saladier", "couteau", "fouet"]
}, {
  id: 40,
  name: "Limonade",
  servings: 4,
  ingredients: [{
    ingredient: "Eau",
    quantity: 1,
    unit: "Litres"
  }, {
    ingredient: "Citron Vert",
    quantity: 3
  }, {
    ingredient: "Sucre en poudre",
    quantity: 4,
    unit: "cuillères à café"
  }, {
    ingredient: "Bicarbonate",
    quantity: 1,
    unit: "cuillères à café"
  }],
  time: 10,
  description: "Dans un saladier mettre l'eau, le jus des cirtons et le sucre. Bien mélanger. Ajouter le bicarbonate. Servir. Ajouter des glaçon et une feuille de menthe pour la déco.",
  appliance: "Saladier",
  ustensils: ["cuillère en bois"]
}, {
  id: 41,
  name: "Mousse au chocolat",
  servings: 4,
  ingredients: [{
    ingredient: "Oeuf",
    quantity: 3
  }, {
    ingredient: "Chocolat noir",
    quantity: 100,
    unit: "grammes"
  }, {
    ingredient: "Sucre vanillé",
    quantity: 1,
    unit: "sachets"
  }],
  time: 20,
  description: "Séparer les blancs d'oeufs. Faire fondre le chocolat au bain marie. Ajouter les jaunes et le sucre au chocolat hors du feu. Battre les blancs en neige. Ajouter les blancs au mélange de chocolat. Mélangez délicatement avec une spatule. Servir dans un plat ou dans des verres. Mettre au frais",
  appliance: "Casserole",
  ustensils: ["fouet", "spatule", "verres"]
}, {
  id: 42,
  name: "Charlotte au poires",
  servings: 3,
  ingredients: [{
    ingredient: "Chocolat",
    quantity: 200,
    unit: "grammes"
  }, {
    ingredient: "Oeuf",
    quantity: 3
  }, {
    ingredient: "Poires au jus",
    quantity: 0.5,
    unit: "boites"
  }, {
    ingredient: "Boudoirs",
    quantity: 15
  }],
  time: 60,
  description: "Commencez par préparer la mousse au chocolat au moins 2 heures avant. Quand la mousse est prête et a reposée. Alors mouiller les boudoirs dans le jus des poires. Disposer. Alterner : mousse au chocolat, boudoirs et poires. Mettre au frais.",
  appliance: "Moule à charlotte",
  ustensils: ["saladier", "couteau", "fouet"]
}, {
  id: 43,
  name: "Tarte au citron",
  servings: 6,
  ingredients: [{
    ingredient: "Pâte brisée",
    quantity: 200,
    unit: "grammes"
  }, {
    ingredient: "Sucre",
    quantity: 150,
    unit: "grammes"
  }, {
    ingredient: "Beurre fondu",
    quantity: 100,
    unit: "grammes"
  }, {
    ingredient: "Oeuf",
    quantity: 3
  }, {
    ingredient: "Citron"
  }],
  time: 50,
  description: "Préchauffez le fours à 200°. Etaler la pate. La mettre dans un moule. Battre les oeufs avec le sucre. Ajouter le jus de citron et le beurre. Verser le tout sur la pate. Au four 30 minutes. Bon appetit ",
  appliance: "Four",
  ustensils: ["rouleau à patisserie", "moule à tarte", "presse citron"]
}, {
  id: 44,
  name: "Crème déssert au chocolat",
  servings: 6,
  ingredients: [{
    ingredient: "Lait",
    quantity: 1,
    unit: "litres"
  }, {
    ingredient: "Chocolat",
    quantity: 200,
    unit: "grammes"
  }, {
    ingredient: "Sucre",
    quantity: 100,
    unit: "grammes"
  }, {
    ingredient: "Beurre",
    quantity: 50,
    unit: "grammes"
  }, {
    ingredient: "farine",
    quantity: 40,
    unit: "grammes"
  }],
  time: 15,
  description: "Mélanger la farine et le beurre fondu en ajoutant le lait peu à peu. Ajouter du sucre après la cuisson. Bien mélanger. Ajouter le chocolat en morceaux et laisser chauffer 8 minutes en mélangeant avec une cuillère en bois. Mettre dans des verres",
  appliance: "Casserole",
  ustensils: ["cuillère en bois"]
}, {
  id: 45,
  name: "Crème patissière",
  servings: 8,
  ingredients: [{
    ingredient: "Lait",
    quantity: 50,
    unit: "cl"
  }, {
    ingredient: "Oeuf",
    quantity: 2
  }, {
    ingredient: "Farine",
    quantity: 30,
    unit: "grammes"
  }, {
    ingredient: "Sucre",
    quantity: 80,
    unit: "grammes"
  }],
  time: 30,
  description: "Faire bouillir le lait ( on peut y ajouter de l'essence de vanille. Battre les oeufs et le sucre, ajouter la farine puis finalement ajouter le lait chaud. Remettre à feu doux pour faire épaissir en remuant pendant 5 à 10 minutes.",
  appliance: "Casserole",
  ustensils: ["fouet", "saladier"]
}, {
  id: 46,
  name: "Far breton",
  servings: 6,
  ingredients: [{
    ingredient: "Farine",
    quantity: 250,
    unit: "grammes"
  }, {
    ingredient: "Sucre",
    quantity: 150,
    unit: "grammes"
  }, {
    ingredient: "Sucre vanillé",
    quantity: 1,
    unit: "sachets"
  }, {
    ingredient: "Oeuf",
    quantity: 4
  }, {
    ingredient: "Lait",
    quantity: 1,
    unit: "litre"
  }, {
    ingredient: "Pruneaux",
    quantity: 100,
    unit: "grammes"
  }],
  time: 60,
  description: "Mélanger la farine avec le sucre et les oeufs en ajoutant du sucre vanillé. Ajouter le lait petit à petit. Ajouter un petit vers de rhum. Verser la masse dans un plat beurré y placer les pruneaux et faire cuire à 200° pendant 45 minutes",
  appliance: "Four",
  ustensils: ["fouet", "moule", "verres"]
}, {
  id: 47,
  name: "Mousse au citron",
  servings: 6,
  ingredients: [{
    ingredient: "Jus de citron",
    quantity: 100,
    unit: "grammes"
  }, {
    ingredient: "Mascarpone",
    quantity: 250,
    unit: "grammes"
  }, {
    ingredient: "Sucre",
    quantity: 100,
    unit: "grammes"
  }, {
    ingredient: "Crème Fraîche",
    quantity: 20,
    unit: "cl"
  }],
  time: 5,
  description: "Mélanger le jus de citron avec le sucre et la mascarpone. Ajouter la crème fraiche. Mélanger le tout et mettre au congélateur pendant 1 heure. Servir",
  appliance: "Saladier",
  ustensils: ["fouet", "verres", "cuillère en bois"]
}, {
  id: 48,
  name: "Pizza",
  servings: 4,
  ingredients: [{
    ingredient: "Pâte à pizza",
    quantity: 1
  }, {
    ingredient: "Tomates pelées",
    quantity: 1,
    unit: "boites"
  }, {
    ingredient: "Lardons",
    quantity: 1,
    unit: "barquettes"
  }, {
    ingredient: "Champignons de paris",
    quantity: 1,
    unit: "boites"
  }, {
    ingredient: "Gruyère",
    quantity: 200,
    unit: "grammes"
  }],
  time: 40,
  description: "Étaler la pate a pizza. Ecraser les tomates pelées, les étaler sur la pâte, ajouter les lardons et les champignons. Ajouter le gruyère eet passer au four à 220° durant 20 minutes",
  appliance: "Four",
  ustensils: ["rouleau à patisserie", "râpe à fromage", "couteau"]
}, {
  id: 49,
  name: "Smoothie tropical",
  servings: 4,
  ingredients: [{
    ingredient: "Bananes",
    quantity: 2
  }, {
    ingredient: "Kiwis",
    quantity: 3
  }, {
    ingredient: "Mangue",
    quantity: 1
  }, {
    ingredient: "Ananas",
    quantity: 4,
    unit: "tranches"
  }, {
    ingredient: "Miel",
    quantity: 2,
    unit: "cuillères à soupe"
  }],
  time: 0,
  description: "Découper les fruits. Le passer au blender jusqu'à obtenir une texture liquide. Mettre au frais. Servir",
  appliance: "Blender",
  ustensils: ["couteau", "verres"]
}, {
  id: 50,
  name: "Frangipane",
  servings: 2,
  ingredients: [{
    ingredient: "Pâte feuilletée",
    quantity: 400,
    unit: "grammes"
  }, {
    ingredient: "Oeuf",
    quantity: 6
  }, {
    ingredient: "Poudre d'amendes",
    quantity: 500,
    unit: "grammes"
  }, {
    ingredient: "Beurre",
    quantity: 500,
    unit: "grammes"
  }, {
    ingredient: "Sucre glace",
    quantity: 500,
    unit: "grammes"
  }],
  time: 60,
  description: "Préparer la frangipane : Mélanger le sucre la poudre d'amander, le beurre et les oeufs. Etaler la moitier de la pate feuilleté et mettre dans un moule à tarte. Garnir de frangipane et recouvrir du reste de pate feuilletée. Mettre au four 30 minutes",
  appliance: "Four",
  ustensils: ["rouleau à patisserie", "fouet"]
}];
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (recipes);

/***/ }),
/* 7 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
class Recipe {
  constructor(data) {
    this.id = data.id;
    this.name = data.name;
    this.time = data.time;
    this.ingredients = data.ingredients;
    this.appliance = data.appliance;
    this.ustensils = data.ustensils;
    this.description = data.description;
  }

  get searchInIngredients() {
    return [...this.ingredients.map(i => i.ingredient)].join().toLowerCase();
  }

  get searchInUstensils() {
    return [this.ustensils].toLowerCase();
  }

  get searchInAppliance() {
    return [this.appliance].toLowerCase();
  }

  get initialSearch() {
    return [this.name, this.description, this.searchInIngredients].join().toLowerCase();
  }

  containsText(text, location) {
    return location.includes(text);
  }

}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Recipe);

/***/ }),
/* 8 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const select = options => {
  const buttons = document.querySelectorAll(".list-button");
  const closeButtons = document.querySelectorAll(".close");
  const inputsCombo = document.querySelectorAll(".combo-lists input");
  /*const options = document.querySelectorAll('[role=option]')*/

  /**
   * Set focus on an item. Class focus on item & aria-activedescendant on listbox
   * @param {object} item
   */

  /*const focusItem = (item) => {
    let focusedItem = document.querySelector('.focused')
    if(focusedItem){
      focusedItem.classList.remove('focused')
    }
     item.classList.add('focused')
    listbox.setAttribute('aria-activedescendant', item.id)
  }*/

  /**
   * Select a item and hide listbox
   */

  /* const selectItem = () => {
    let focusedItem = document.querySelector('.focused')
    button.textContent = focusedItem.textContent
    hideList()
  }*/

  /**
   * Add listener on keyboard
   */

  /* const keyEventsListener = () => {
    listbox.addEventListener('keydown', keyEvents)
  }*/

  /* Add listener on focus list to trigger listener on keyboad */

  /*listbox.addEventListener('focus', keyEventsListener)*/

  /**
   * Execute functions depending on keys pressed
   * @param event
   */

  /*const keyEvents = e => {
    e.preventDefault()
     if(e.code === 'Enter' || e.code === 'Space'){
      selectItem()
    }
  }*/

  /**
   * Show the list of options
   */

  const showList = (mainWrapper, listWrapper, button, list) => {
    if (document.querySelector(".show")) {
      hiddenListActions();
    }

    mainWrapper.classList.add("show");
    listWrapper.classList.remove("hidden");
    button.setAttribute("aria-expanded", true);
  };

  buttons.forEach(button => {
    const mainWrapper = document.querySelector(`.combo-${button.getAttribute("aria-haspopup").replace("-list", "")}`);
    const listWrapper = document.querySelector(`.${button.getAttribute("aria-haspopup")}-wrapper`);
    const list = document.querySelector(`.${button.getAttribute("aria-haspopup")}`);
    button.addEventListener("click", () => {
      showList(mainWrapper, listWrapper, button, list);
    });
  });
  /**
   * Hide the list of options and trigger medias sort
   */

  const hiddenListActions = () => {
    document.querySelector(".show .combo-list").classList.add("hidden");
    document.querySelector(".show .list-wrapper").classList.add("hidden");
    document.querySelector(".show .list-button").removeAttribute("aria-expanded");
    document.querySelector(".show").classList.remove("show");
    /* document
      .querySelectorAll(".combo-lists input")
      .forEach((input) => (input.value = ""));*/
  };

  const hideList = e => {
    if (!document.querySelector(".show") || e.target.closest("div")?.classList.contains("combo-box") || e.target.closest("div")?.classList.contains("list-wrapper")) {
      return;
    }

    hiddenListActions();
  };

  document.addEventListener("click", e => hideList(e));
  closeButtons.forEach(button => button.addEventListener("click", hiddenListActions));
  inputsCombo.forEach(input => {
    input.addEventListener("keydown", e => {
      if (e.code === "Enter") {
        hiddenListActions();
      }
    });
  });
  /* Focus item and select on mouse click    */

  /*const clickItem = e => {
    focusItem(e)
    selectItem()
  }*/

  /*Add listeners on options */

  /* options.forEach(option =>  option.addEventListener("click", e => clickItem(e.target)))
  options.forEach(option =>  option.addEventListener("keydown", e => {
   if(e.code === 'Enter'){
      clickItem(option)
   }
  }))*/
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (select);

/***/ }),
/* 9 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _components_recipesUI__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4);
/* harmony import */ var _http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5);
/* harmony import */ var _components_filterSelect_selectUI__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(3);
/* harmony import */ var _components_tag__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(10);
/* harmony import */ var _services__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(2);






const search = () => {
  const input = document.querySelector("[name='q']");
  let results = [];

  const removeDOMElements = elements => {
    elements.forEach(element => element.remove());
  };
  /**
   * @param {string} searchedText
   */


  const searchAndUpdateResult = (searchedText, resultsFromTag, selectListFromTag) => {
    results = resultsFromTag ? resultsFromTag : _http__WEBPACK_IMPORTED_MODULE_1__.allRecipes.filter(recipe => recipe.containsText(searchedText, recipe.initialSearch));
    /* If tags */

    /* TODO */

    /*Actualisation de l'interfacce */

    (0,_components_recipesUI__WEBPACK_IMPORTED_MODULE_0__["default"])(results);
    /*Actualisation des tags */

    (0,_components_filterSelect_selectUI__WEBPACK_IMPORTED_MODULE_2__["default"])([{
      name: "ingredients",
      list: selectListFromTag ?? (0,_http__WEBPACK_IMPORTED_MODULE_1__.findIngredients)(results)
    }, {
      name: "appareils",
      list: (0,_http__WEBPACK_IMPORTED_MODULE_1__.findAppliances)(results)
    }, {
      name: "ustensiles",
      list: (0,_http__WEBPACK_IMPORTED_MODULE_1__.findUstensils)(results)
    }]);
    /*TODO*/
  };
  /*Remove recipes from UI */


  const cleanCurrentResult = () => {
    removeDOMElements(document.querySelectorAll(".recettes article"));
  };
  /*La recherche ne se déclenche qu'à partir de 3 chars saisis */


  const canSearch = searchedText => {
    return searchedText.length > 2;
  };

  const reset = searchedText => {
    return !searchedText;
  };

  const onSearch = e => {
    const searchedText = e.target.value.toLowerCase();

    if (canSearch(searchedText)) {
      cleanCurrentResult();
      searchAndUpdateResult(searchedText);
    }

    if (reset(searchedText)) {
      (0,_services__WEBPACK_IMPORTED_MODULE_4__.initialState)();
    }
  };

  input.addEventListener("input", e => onSearch(e));
  const tagsInput = [document.querySelector("[name='ingredients']"), document.querySelector("[name='ustensiles']"), document.querySelector("[name='appareils']")];

  const onTagsSearch = e => {
    const searchedText = e.target.value.toLowerCase();
    const select = e.target.getAttribute("name");
    results = results.length > 0 ? results : _http__WEBPACK_IMPORTED_MODULE_1__.allRecipes;
    const resultsFromTag = results.filter(recipe => recipe.containsText(searchedText, recipe.searchInIngredients));
    /*Refresh liste en fonction de tag */

    /*TODO*/

    searchAndUpdateResult(searchedText, resultsFromTag, (0,_http__WEBPACK_IMPORTED_MODULE_1__.findTagInIngredients)(resultsFromTag, searchedText));
  };

  const onEnterTag = (e, input) => {
    if (e.code === "Enter") {
      (0,_components_tag__WEBPACK_IMPORTED_MODULE_3__["default"])(input.value, input.getAttribute("name"));
    }
  };

  tagsInput.forEach(tagInput => {
    tagInput.addEventListener("input", e => onTagsSearch(e)), tagInput.addEventListener("keydown", e => onEnterTag(e, tagInput));
  });
  /**On close tag */
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (search);

/***/ }),
/* 10 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const createTag = (textTag, tagType) => {
  console.log("text", tagType);
  const tagsContainer = document.querySelector(".tags");
  const box = document.createElement("div");
  box.className = `tag ${tagType}-tag`;
  const content = document.createElement("span");
  content.textContent = textTag;
  const closeTag = document.createElement("button");
  closeTag.className = "close-tag";
  box.append(content, closeTag);
  tagsContainer.append(box);
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (createTag);

/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _scss_main_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var _services__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2);
/* harmony import */ var _components_filterSelect_select__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(8);
/* harmony import */ var _search__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(9);




(0,_services__WEBPACK_IMPORTED_MODULE_1__.initialState)();
(0,_components_filterSelect_select__WEBPACK_IMPORTED_MODULE_2__["default"])();
(0,_search__WEBPACK_IMPORTED_MODULE_3__["default"])();
})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map