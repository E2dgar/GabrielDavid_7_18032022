import refreshUiRecipes from "./components/recipesUI";
import {
  allRecipes,
  findIngredients,
  findAppliances,
  findUstensils,
} from "./http";
import selectUI from "./components/filterSelect/selectUI";

const search = () => {
  const input = document.querySelector("[name='q']");

  const removeDOMElements = (elements) => {
    elements.forEach((element) => element.remove());
  };

  /**
   * Renvoie un tableau de recettes correspondantes à la recherche saisie
   * @param {string} searchedText
   */
  const searchAndUpdateResult = (searchedText) => {
    const results = allRecipes.filter((recipe) =>
      recipe.containsText(searchedText)
    );

    /*Actualisation de l'interfacce */
    refreshUiRecipes(results);

    /*Actualisation des tags */
    selectUI([
      {
        name: "ingredients",
        list: findIngredients(results),
      },
      {
        name: "appareils",
        list: findAppliances(results),
      },
      {
        name: "ustensiles",
        list: findUstensils(results),
      },
    ]);
    /*TODO*/
  };

  /*Remove recipes from UI */
  const cleanCurrentResult = () => {
    removeDOMElements(document.querySelectorAll(".recettes article"));
  };

  /*La recherche ne se déclenche qu'à partir de 3 chars saisis */
  const canSearch = (searchedText) => {
    return searchedText.length > 2;
  };

  const onSearch = (e) => {
    const searchedText = e.target.value.toLowerCase();
    if (canSearch(searchedText)) {
      cleanCurrentResult();
      searchAndUpdateResult(searchedText);
    }
  };

  input.addEventListener("input", (e) => onSearch(e));
};

export default search;
