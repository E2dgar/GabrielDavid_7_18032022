import recipes from "./data/recipes";
import Recipe from "./Models/Recipe";
import { pushInArray } from "./services";

const allRecipes = [];
recipes.forEach((recipe) => allRecipes.push(new Recipe(recipe)));

const findIngredients = (recipes) => {
  let ingredients = [];
  recipes.forEach((recipe) => {
    recipe.ingredients.forEach((ingredient) => {
      pushInArray(ingredients, ingredient.ingredient.toLowerCase());
    });
  });
  return ingredients;
};

const findUstensils = (recipes) => {
  let ustensiles = [];
  recipes.forEach((recipe) => {
    recipe.ustensiles.forEach((ustensile) => {
      let cleanUstensile = ustensile.toLowerCase().replace(/\s\([0-99]\)/, "");
      pushInArray(ustensiles, cleanUstensile);
    });
  });
  return ustensiles;
};

const findAppliances = (recipes) => {
  let appareils = [];
  recipes.forEach((recipe) => {
    let cleanAppareil = recipe.appareils.toLowerCase().replace(".", "");
    pushInArray(appareils, cleanAppareil);
  });
  return appareils;
};

const findTagIn = (recipes, tag, location) => {
  let tags = [];
  recipes.forEach((recipe) => {
    switch (location) {
      case "ingredients":
        recipe.ingredients.forEach((ingredient) => {
          if (ingredient.ingredient.toLowerCase().includes(tag)) {
            pushInArray(tags, ingredient.ingredient.toLowerCase());
          }
        });
        break;
      case "ustensiles":
        recipe.ustensiles.forEach((ustensile) => {
          if (ustensile.toLowerCase().includes(tag)) {
            pushInArray(tags, ustensile.toLowerCase());
          }
        });
        break;
      case "appareils":
        recipe.appareils.forEach((appareil) => {
          if (appareil.toLowerCase().includes(tag)) {
            pushInArray(tags, appareil.toLowerCase());
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
