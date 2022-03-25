import recipesUI from "./components/recipesUI";
import { allRecipes } from "./http";

const search = () => {
  const input = document.querySelector("[name='q']");

  const removeDOMElements = (elements) => {
    elements.forEach((element) => element.remove());
  };

  /**
   * Renvoie un tableau de recettes correspondantes à la recherche saisie
   * @param {string} string
   */
  const recipeSearch = (string) => {
    const results = allRecipes.filter(
      (recipe) =>
        recipe.name.toLowerCase().includes(string) ||
        recipe.description.toLowerCase().includes(string) ||
        recipe.ingredients.some((ingredient) =>
          ingredient.ingredient.toLowerCase().includes(string)
        )
    );

    /*Actualisation de l'interfacce */
    recipesUI(results);

    /*Opérations sur les tags */
    /*TODO*/
  };

  /*Déclenche la recherche à partir de 3 chars saisis */
  const length = (e) => {
    const string = e.target.value.toLowerCase();
    const searchLength = string.length;
    const cards = document.querySelectorAll(".recettes article");
    if (searchLength > 2) {
      removeDOMElements(cards);
      recipeSearch(string);
    }
  };
  input.addEventListener("input", (e) => length(e));
};

export default search;
