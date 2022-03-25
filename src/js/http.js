import recipes from "./data/recipes";
import Recipe from "./Models/Recipe";
import { pushInArray } from "./services";

const allRecipes = [];
recipes.forEach((recipe) => allRecipes.push(new Recipe(recipe)));

const ingredients = [];
allRecipes.forEach((recipe) => {
  recipe.ingredients.forEach((ingredient) => {
    pushInArray(ingredients, ingredient.ingredient.toLowerCase());
  });
});

const ustensils = [];
allRecipes.forEach((recipe) => {
  recipe.ustensils.forEach((ustensil) => {
    let cleanUstensil = ustensil.toLowerCase().replace(/\s\([0-99]\)/, "");
    pushInArray(ustensils, cleanUstensil);
  });
});

const appliance = [];
allRecipes.forEach((recipe) => {
  let cleanAppliance = recipe.appliance.toLowerCase().replace(".", "");
  pushInArray(appliance, cleanAppliance);
});

export { allRecipes, ingredients, ustensils, appliance };
