import refreshUiRecipes from "./components/recipesUI";
import { allRecipes } from "./http";
import { initialState } from "./services";
import domBuilder from "./domBuilder";

const mainSearch = () => {
  const input = document.querySelector("[name='q']");

  /**
   * @param {Array} searchedText
   */
  const searchAndUpdateResult = (searchedText) => {
    /**
     * Return an Array of recipes containing searched term(s)
     * @param {Array} searchTextArray
     * @returns {Array} results
     */

    let searchIn = allRecipes;

    const findRecipes = (searchedText) => {
      for (let i = 0; i < searchedText.length; i++) {
        for (let j = 0; j < searchIn.length + 1; j++) {
          if (searchIn[j].name.includes(searchedText)) {
            output.push(searchIn[j]);
          } else if (searchIn[j].description.includes(searchedText)) {
            output.push(searchIn[j]);
          } else if (
            [...searchIn[j].ingredients.map((ing) => ing.ingredient)].includes(
              searchedText
            )
          ) {
            output.push(searchIn[j]);
          }

          searchIn = output;
        }
      }
      return searchIn;
    };

    /*Actualisation de l'interfacce */
    refreshUiRecipes(findRecipes(searchedText));
  };

  /*La recherche ne se déclenche qu'à partir de 3 chars saisis */
  const canSearch = (searchedText) => {
    return searchedText.length > 2;
  };

  /*Réinitialisation des résultats quand on efface les termes de recherche */
  const reset = (searchedText) => {
    return searchedText[0] === "";
  };

  const onSearch = (e) => {
    /*La recherche est un tableau de termes pour prendre en compte plusieurs mot et boucler dessus */
    const searchedText = e.target.value.toLowerCase().split(" ");

    if (canSearch(searchedText[0])) {
      domBuilder.removeElements(document.querySelectorAll(".recettes article"));
      searchAndUpdateResult(searchedText);
    }

    if (reset(searchedText)) {
      initialState();
    }
  };

  input.addEventListener("input", (e) => onSearch(e));
};

export default mainSearch;