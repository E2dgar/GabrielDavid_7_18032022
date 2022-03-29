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
  let ustensils = [];
  recipes.forEach((recipe) => {
    recipe.ustensils.forEach((ustensil) => {
      let cleanUstensil = ustensil.toLowerCase().replace(/\s\([0-99]\)/, "");
      pushInArray(ustensils, cleanUstensil);
    });
  });
  return ustensils;
};

const findAppliances = (recipes) => {
  let appliances = [];
  recipes.forEach((recipe) => {
    let cleanAppliance = recipe.appliance.toLowerCase().replace(".", "");
    pushInArray(appliances, cleanAppliance);
  });
  return appliances;
};

export { allRecipes, findIngredients, findUstensils, findAppliances };
