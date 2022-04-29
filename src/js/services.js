import { createSelects } from "./components/filterSelect/updateSelect";
import refreshUiRecipes from "./components/recipesUI";
import { allRecipes } from "./http";

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

/*Au chargement rempli les select avec les données initiales */
const initialState = () => {
  createSelects(allRecipes);

  refreshUiRecipes();
};

export { arrayNoDuplicates, initialState };
