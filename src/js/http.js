import recipes from "./data/recipes";
import Recipe from "./Models/Recipe";
import { arrayNoDuplicates } from "./services";

const allRecipes = [];
recipes.forEach((recipe) => allRecipes.push(new Recipe(recipe)));

/*Renvoi un tableau sans doublon de tous les ingredients des recettes passées en argument*/
const findIngredients = (recipes) => {
  let ingredients = [];
  recipes.forEach((recipe) => {
    recipe.ingredients.forEach((ingredient) => {
      arrayNoDuplicates(ingredients, ingredient.ingredient.toLowerCase());
    });
  });
  return ingredients;
};

/*Renvoi un tableau sans doublon de tous les ustensiles des recettes passées en argument*/
const findUstensils = (recipes) => {
  let ustensiles = [];
  recipes.forEach((recipe) => {
    recipe.ustensiles.forEach((ustensile) => {
      let cleanUstensile = ustensile.toLowerCase().replace(/\s\([0-99]\)/, "");
      arrayNoDuplicates(ustensiles, cleanUstensile);
    });
  });
  return ustensiles;
};

/*Renvoi un tableau sans doublon de tous les appareils des recttes passées en argument*/
const findAppliances = (recipes) => {
  let appareils = [];
  recipes.forEach((recipe) => {
    let cleanAppareil = recipe.appareils.toLowerCase().replace(".", "");
    arrayNoDuplicates(appareils, cleanAppareil);
  });
  return appareils;
};

/**
 *  Pour chaque select, renvoi un tableau des tags présent dans les recettes
 * @param {Array} recipes
 * @param {string} tag
 * @param {string} location
 * @returns
 */
const findTagIn = (recipes, tag, location) => {
  let tags = [];
  recipes.forEach((recipe) => {
    switch (location) {
      case "ingredients":
        recipe.ingredients.forEach((ingredient) => {
          if (ingredient.ingredient.toLowerCase().includes(tag)) {
            arrayNoDuplicates(tags, ingredient.ingredient.toLowerCase());
          }
        });
        break;
      case "ustensiles":
        recipe.ustensiles.forEach((ustensile) => {
          if (ustensile.toLowerCase().includes(tag)) {
            arrayNoDuplicates(tags, ustensile.toLowerCase());
          }
        });
        break;
      case "appareils":
        recipe.appareils.split().forEach((appareil) => {
          if (appareil.toLowerCase().includes(tag)) {
            arrayNoDuplicates(tags, appareil.toLowerCase());
          }
        });
        break;
    }
  });
  return tags;
};

export {
  allRecipes,
  findIngredients,
  findUstensils,
  findAppliances,
  findTagIn,
};
