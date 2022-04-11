import selectUI from "./components/filterSelect/selectUI";
import recipesUI from "./components/recipesUI";
import {
  allRecipes,
  findIngredients,
  findUstensils,
  findAppliances,
} from "./http";

/**
 * Push in array only if it does not already exist
 * @param {Array} array
 * @param {string} item
 */
const arrayNoDuplicates = (array, item) => {
  if (!array.includes(item)) {
    array.push(item);
  }
};

const initialState = () => {
  selectUI([
    {
      name: "ingredients",
      list: findIngredients(allRecipes),
    },
    {
      name: "appareils",
      list: findAppliances(allRecipes),
    },
    {
      name: "ustensiles",
      list: findUstensils(allRecipes),
    },
  ]);

  recipesUI();
};

export { arrayNoDuplicates, initialState };
