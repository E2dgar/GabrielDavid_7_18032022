import recipes from "./data/recipes";

const ingredients = [];

recipes.forEach((recipe) => {
  recipe.ingredients.forEach((ingredient) => {
    let cleanIngredient = ingredient.ingredient.toLowerCase();
    if (!ingredients.includes(cleanIngredient)) {
      ingredients.push(cleanIngredient);
    }
  });
});

const ustensils = [];

recipes.forEach((recipe) => {
  recipe.ustensils.forEach((ustensil) => {
    let cleanUstensil = ustensil.toLowerCase().replace(/\s\([0-99]\)/, "");
    if (!ustensils.includes(cleanUstensil)) {
      ustensils.push(cleanUstensil);
    }
  });
});

const appliance = [];

recipes.forEach((recipe) => {
  let cleanAppliance = recipe.appliance.toLowerCase().replace(".", "");
  if (!appliance.includes(cleanAppliance)) {
    appliance.push(cleanAppliance);
  }
});

export { ingredients, ustensils, appliance };
